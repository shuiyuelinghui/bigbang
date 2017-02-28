typeof $style === 'function' && $style(getDistPath() + 'plugin/dict/dict.css');
/**
 * 字典配置
 */
window._dictConfig = {
    select: {name: 'select', baseUrl: '/sys/sysDict/single/'},
    tree: {name: 'tree', baseUrl: '/sys/sysDict/tree/'},
    checkbox: {name: 'checkbox', baseUrl: 'sys/sysDict/single/'},
	radio: {name: 'radio', baseUrl:  'sys/sysDict/single/'},
    commonUrl:makeAct('sceneCollecting/dictComm/queryAll'),
    dictRoot: 'dict-root',
    dictType: 'dict-type',
    returnValue: 'return-value',
    dictMultiple: 'dict-multiple',
    dictId: 'dict-id',
    dictName: 'dict-name',
    dictCommon:'dict-common',
    dictNum:'dict-num',
    dictDefault:'dict-default'
};

var zTreeObj;
var setting = {
    data: {
        key: {
            id: 'key',
            name: 'value'
        },
        simpleData: {
            enable: true,
            idKey: "key",
            pIdKey: "parentKey",
            rootPId: 0
        }
    },
    callback: {
        onDblClick: function (event, treeId, treeNode) { //鼠标双击选中
            if (currentDictConfig.treeLeaf && treeNode.isParent) {
                zTreeObj.expandNode(treeNode, true, false, true);
                return;
            }
            var key = treeNode.key;
            var value = treeNode.value;
            selectQueryDict(key, value);

        },
        onClick: function (event, treeId, treeNode) { //鼠标单击展开
            zTreeObj.expandNode(treeNode, true, false, true);
            if (currentDictConfig.treeLeaf && treeNode.isParent) {
                window.currentDictNode = null;
            } else {
                window.currentDictNode = treeNode;
            }
        }
    },
    view: {
        showIcon: false,
        dblClickExpand: false,
        addDiyDom: addDiyDom
    }
};
var gxsdmArr = [];

/**
 * 系统字典控件
 * @param customData 自定义数据
 */
$.fn.dict = function (customData,preData,cb) {
    //customData = eval('(' + customData + ')');
    if (typeof arguments[0] == 'function') {
        cb = arguments[0];
        customData = null;
    }
    if (arguments.length >1 && typeof arguments[1] == 'function') {
        cb = arguments[1];
        preData = null;
    }
    customData = customData == null ? customData : str2obj(customData);

    var _target = $(this);
    $.each(_target, function (i, o) {
        var target = $(o); //字典控件对象
        var root = target.attr(_dictConfig.dictRoot); //字典代码类型
        var type = target.attr(_dictConfig.dictType); //字典展示方式
        var name = target.attr(_dictConfig.dictName);
        var dictId = target.attr(_dictConfig.dictId);
        var isCommon = target.attr(_dictConfig.dictCommon);
        if (!name) {
            _target.html('请给定dict-name');
            return _target;
        }

        if (type) {
            if (!_dictConfig[type]) {
                //alert('dict-type指定有误');
                return _target;
            }
            if (!customData && !root) {
                //alert('请指定dict-root或自定义数据');
                return _target;
            }
            var remoteUrl = makeAct(_dictConfig[type].baseUrl + root); //服务端字典数据Url
            var dictData = customData;
            target.removeClass('cus-vl-invalid');
            if (!dictData) {
                dictData = localData.get(remoteUrl.slice(remoteUrl.indexOf('/api/'))); //自定义数据或本地存储数据
                target.removeClass('unready');
            }

            if (dictData != null) {

                if (('GXSDM' == root) || ('gxsdm' == root)) {
                    //gxsdmArr = dictData.where('o=>o.key == ' + top.userUnit);
                    //getGxsdm(dictData, top.userUnit);
                    dictData = top.GXSDM;
                }
                if(isCommon){//需要显示常用项
                    if(!dictId){
                        _target.html('请给定dict-id');
                        return _target;
                    }
                    $post(_dictConfig.commonUrl,'{"dictType":"{0}"}'.format(root),function (res) {
                        initDict(type, target, dictData,res.data);
                        typeof cb == 'function' && cb();
                    },false,function () {
                        target.removeClass('unready');
                    });
                }else if(preData){
                    initDict(type, target, dictData,preData);
                    target.removeClass('unready');
                    typeof cb == 'function' && cb();
                }else{
                    initDict(type, target,dictData); //初始化字典控件
                    target.removeClass('unready');
                    typeof cb == 'function' && cb();
                }
            } else {
                getDictDataFromRemote(remoteUrl, function (remoteData) {//服务端查询数据后初始化

                    if (('GXSDM' == root) || ('gxsdm' == root)) {
                        gxsdmArr = remoteData.where('o=>o.key == ' + top.userUnit);
                        getGxsdm(remoteData, top.userUnit);
                        remoteData = gxsdmArr;
                    }

                    if(isCommon){//需要显示常用项
                        if(!dictId){
                            _target.html('请给定dict-id');
                            return _target;
                        }
                        $post(_dictConfig.commonUrl,'{"dictType":"{0}"}'.format(root),function (res) {
                            initDict(type, target, remoteData,res.data,cb);
                            // typeof cb == 'function' && cb();
                        },false,function () {
                            target.removeClass('unready');
                        });
                    }else if(preData){
                        initDict(type, target, remoteData,preData);
                        target.removeClass('unready');
                        typeof cb == 'function' && cb();
                    }else{
                        initDict(type, target, remoteData);
                        target.removeClass('unready');
                        typeof cb == 'function' && cb();
                    }
                },function () {
                    target.removeClass('unready');
                });
            }
        }
    });
    return _target;
};

/**
 * 递归获取当前登录用户及下级单位
 * @param all
 * @param unit
 */
function getGxsdm(all, unit) {
    var arr = all.where('o=>o.parentKey == ' + unit);
    gxsdmArr = gxsdmArr.concat(arr);
    arr.length && arr.each(function (item) {
        getGxsdm(all, item.key);
    });
}

$.fn.resetDict = function () {
    var the = (this.parent().length > 0 && this.parent()[0].hasAttribute('dict-type')) ? this.parent() : this;
    // var bf_id = the.attr('bf-id');
    // var bf_name = the.attr('bf-name');
    // the.empty();
    // if(bf_id) the.attr('id',bf_id);
    // if(bf_name) the.attr('name',bf_name);
    return the;
};
/**
 * 初始化字典
 * @param type 字典展示类型
 * @param target 字典对象
 * @param dictData 字典数据
 */
function initDict(type, target, dictData,cmUseData,cb) {
    if (type === _dictConfig.select.name) {
        initSelectDict(target, dictData);//初始化下拉字典
    } else if (type == _dictConfig.tree.name) {
        initTreeDict(target, dictData,cmUseData,cb);  //初始化树形字典
    } else if (type == _dictConfig.checkbox.name) {
        initCheckboxDict(target, dictData); //初始化多选框字典
    } else if(type == _dictConfig.radio.name) {
        initRadioDict(target, dictData); //初始化单选框字典
    }
}

/**
 * 字典初始化值
 * @param initValue 初始化值
 */
$.fn.dictSelect = function (initValue,isCustom) {
    if(!initValue || (initValue instanceof Array && !initValue.length)){
        this.children('input').first().prop('checked',false).trigger('change');
        return this;
    }
    var _target = this;
    $.each(_target, function (i, o) {
        var $o = $(o);
        //链式调用时o代表字典根(<dict></dict>)对象
        var type = $o.attr(_dictConfig.dictType) || $o.parent().attr(_dictConfig.dictType);
        var root = $o.attr(_dictConfig.dictRoot) || $o.parent().attr(_dictConfig.dictRoot);
        var name = $o.attr(_dictConfig.dictName) || $o.parent().attr(_dictConfig.dictName);
        //字典是否返回中文值
        var returnValue = $o.attr(_dictConfig.returnValue) || $o.parent().attr(_dictConfig.returnValue);
        returnValue = returnValue === 'true' ? true : false;
        //字典是否多选
        var multiple = $o.attr(_dictConfig.dictMultiple) || $o.parent().attr(_dictConfig.dictMultiple);
        multiple = multiple === 'true' ? true : false;
        // var _value = returnValue ? 'value' : 'key';
        var dictValue = '';
        var initValueArr = [];
        var insertArr = [];
        var cmInputHTML = '<input name="{0}" id="{forId}"  type="{type}" class="dict-{type}" value="{key}" checked><label for="{forId}">{value}</label>'.format(name);
        var addHTML = '';
        var $moreBtn = $o.children('.dict-tree-more-btn');
        var hasMoreBtn = $moreBtn.length;

        var isChecked = false;
        var mulIsChecked = false;

        // if(name=='pictureType2'){
        //     debugger
        // }

        function insertCheckbox(list,key) {
            var forId = '';
            list.each(function (dict,i) {
                forId = name + (Date.now() + i);
                addHTML = cmInputHTML.format({
                    forId: forId,
                    key: key || dict.key,
                    value: dict.value,
                    type:'checkbox'
                });
                hasMoreBtn?$moreBtn.before(addHTML):$o.append(addHTML);
                $('#'+forId).prop('checked',true).trigger('change').data('dict-info',dict);
            });
        }
        function insertRadio(dict) {
            dict = dict instanceof Array ? dict[0]:dict;
            if(!dict.value){
                return false;
            }
            var forId = name + (Date.now() + 1);
            addHTML = cmInputHTML.format({
                forId: forId,
                key: dict.key,
                value: dict.value,
                type:'radio'
            });
            hasMoreBtn?$moreBtn.before(addHTML):$o.append(addHTML);
            $('#'+forId).prop('checked',true).trigger('change');
        }

        if (type === _dictConfig.select.name) {
            if ($o.find('option[value="' + initValue + '"]').length > 0) {//下拉select
                //初始化下拉字典的值
                if (o.nodeName == 'SELECT') {
                    o.value = initValue;
                } else {
                    $o.find('select')[0].value = initValue;
                }
            }
            //$o.find('option[value="'+initValue+'"]').attr('selected', true);
        } else if (type === _dictConfig.tree.name) {//树形

            if (multiple) {
                $o.children('input:checkbox').prop('checked',false).trigger('change');

                initValueArr = typeOf(initValue) == 'array'? initValue : initValue.split(',');
                initValueArr.each(function (el,j) {
                    mulIsChecked = false;

                    $o.children('input:checkbox').each(function (i, ele) {
                        var key = typeof el=='object'?el.key:el;
                        var $ele = $(ele);
                        if ($ele.val() == key) {
                            $ele.data('dict-info',el).prop('checked', true).trigger('change');
                            // ele.click();
                            mulIsChecked = true;
                        }
                    });
                    if (!mulIsChecked) {
                        typeof el=='object' ? insertArr.push(el.key) : insertArr.push(el);
                    }
                });
                if(insertArr.length){
                    isCustom?insertCheckbox(insertArr):getDictListByKeys(root, insertArr.join('&'), function (list) {
                        insertCheckbox(list);
                    });
                }
            } else {
                initValue = typeOf(initValue) == 'array' ? initValue[0] : initValue;
                $o.children('input:radio').each(function (i, ele) {
                    var $ele = $(ele);
                    if ($ele.val() == initValue) {
                        $ele.prop('checked', true).trigger('change');
                        // ele.click();
                        isChecked = true;
                        return false;
                    }
                });
                if (!isChecked) {
                    isCustom ? insertRadio(initValue) : getDictByKey(root, initValue, function (dict) {
                        insertRadio(dict,initValue);
                    });
                }
            }
            // if (root === 'custom') {
            //     toast('自定义数据树形字典初始化值暂未开发').warn();
            // } else {
            //     if (returnValue) {
            //         initTreeDictValue($o, initValue, initValue);
            //     } else {
            //         if (multiple) {
            //             getDictListByKeys(root, initValue, function (list) {
            //                 if (list.length > 0) {
            //                     var values = '';
            //                     $.each(list, function (i, dict) {
            //                         values += dict.value + '、';
            //                     });
            //                     if (values.indexOf('、') > -1) {
            //                         values = values.substring(0, values.length - 1);
            //                     }
            //                     initTreeDictValue($o, initValue, values);
            //                 }
            //             });
            //         } else {
            //             getDictByKey(root, initValue, function (dict) {
            //                 if (dict) {
            //                     initTreeDictValue($o, initValue, dict.value);
            //                 }
            //             });
            //         }
            //     }
            // }
        } else if (type === _dictConfig.checkbox.name) {//多选
            $o.children('input:checkbox').first().prop('checked',false).trigger('change');
            var initValueArray = initValue.split(',');
            $.each(initValueArray, function (i, v) {
                $o.children('input[value="' + v + '"]').prop("checked", true).trigger('change');
            });

        } else if(type === _dictConfig.radio.name){//单选
            $o.children('input[value="' + initValue + '"]').prop("checked", true).trigger('change');
        }
    });
}

/**
 * 初始化树形字典值
 * @param target 字典控件对象
 * @param key 字典key
 * @param value 字典value
 */
function initTreeDictValue(target, key, value) {
    if (!target.attr(_dictConfig.dictType)) {
        target = target.parent();
    }
    target.find('input[type="hidden"]').val(key);
    target.find('input[type="text"]').val(value);
}


/**
 * 初始化下拉字典
 * @param target
 * @param data
 */
function initSelectDict(target, data) {
    var config = getConfigForDict(target, _dictConfig.select.name);
    config.items = data;
    var emptyOption = config.notEmpty ? '' : '<option value=""></option>';
    var _value = config.returnValue ? '{value}' : '{key}';
    var template = '<select name="{dictName}" id="{dictId}" class="common-select{validate}" {dataOptions}>{0}{{items:#<option value="{1}">{value}</option>#}}</select>'.format(emptyOption, _value);
    target.html($compile(template, config));
}

/**
 * 取得字典配置信息
 * @param target
 * @param type
 */
function getConfigForDict(target, type) {
    var target_id = target.attr('id') || 'id_' + Math.floor(Math.random() * 100000);
    var dict_id = target.attr(_dictConfig.dictId) || 'id_' + Math.floor(Math.random() * 100000);
    var dict_name = target.attr(_dictConfig.dictName);

    var notEmpty = target.attr('empty')!=='true' ? true : false;
    var returnValue = target.attr(_dictConfig.returnValue) === 'true' ? true : false;
    var multiple = target.attr(_dictConfig.dictMultiple) === 'true' ? true : false;
    var dictRoot = target.attr(_dictConfig.dictRoot);
    var dictNum = target.attr(_dictConfig.dictNum);
    var dictDefault = target.attr(_dictConfig.dictDefault);

    var validate = target.hasClass('validate') ? ' validate' : '';
    target.removeClass('validate');
    var dataOptions = target.attr('data-options') == undefined ? '' : 'data-options="' + target.attr('data-options') + '"';
    target.removeAttr('data-options');

    //树型字典弹窗位置
    var treeX = target.attr('tree-x');
    var treeY = target.attr('tree-y');

    var treeLeaf = target.attr('tree-leaf') === 'true' ? true : false;

    return {
        id: target_id,
        dictId: dict_id,
        dictName: dict_name,
        dictRoot: dictRoot,
        dictNum:dictNum,
        dictDefault:dictDefault,
        returnValue: returnValue,
        multiple: multiple,
        notEmpty: notEmpty,
        validate: validate,
        dataOptions: dataOptions,
        treeX: treeX,
        treeY: treeY,
        treeLeaf: treeLeaf
    };
}

function setHidVal(target,multiple) {//设置隐藏域的值

    var $hid = target.children('input[type="hidden"]');
    var $checkedRadio = target.children('input:radio:checked');
    var hidVal = []//$hid.val();
    var hidChVal = []//$hid.attr('data-chval');
    var radioCheckVal = '';
    target.children('input:checkbox:checked').each(function (i,ele) {
        var $this = $(this);
        var $thisVal = $this.val();
        var $thisChVal = $this.next('label').html();
        var $thisChecked = $this.prop('checked');
        if($thisChecked) {
            hidVal.push($thisVal);
            hidChVal.push($thisChVal);
        }
        //old version
        /*var $ele = $(ele);
        var $eleVal = $ele.val();
        var $eleChVal = $ele.next('label').html();
        var $thisChecked = $ele.prop('checked');
        var hidValArr = hidVal ? hidVal.split(',') : [];
        var hidChValArr = hidChVal ? hidChVal.split(',') : [];
        var $eleIndex = hidVal.indexOf($eleVal);
        var $eleChIndex = hidChVal.indexOf($eleChVal);
        if($thisChecked && $eleIndex<0){//当前复选框选中，且没有存入隐藏域中(key)
            hidValArr.push($eleVal);
            hidVal = hidValArr.join(',');
        }else if(!$thisChecked && $eleIndex>-1){//当前复选框没选，且存在隐藏域中(key)
            hidVal = hidVal.replace($eleVal,'').replace(/^,|,$|/g,'').replace(/,+/g,',');
        }
        if($thisChecked && $eleChIndex<0){//当前复选框选中，且没有存入隐藏域中(value)
            hidChValArr.push($eleChVal);
            hidChVal = hidChValArr.join(',');
        }else if(!$thisChecked && $eleChIndex>-1){//当前复选框没选，且存在隐藏域中(value)
            hidChVal = hidChVal.replace($eleChVal,'').replace(/^,|,$|/g,'').replace(/,+/g,',');
        }*/
    });
    if(!multiple){
        radioCheckVal = $checkedRadio.val();
        hidVal = radioCheckVal;
        hidChVal = $checkedRadio.next('label').html();
    }else {
        hidVal.join(',');
        hidChVal.join(',');
    }
    $hid.val(hidVal);
    $hid.attr('data-chval',hidChVal);
    return [hidVal,hidChVal];
}

/*多选字典"不限"点击事件函数*/
function unlimitedClickFn() {
    var $this = $(this);
    $this.prop('checked') && ($this.siblings('input:checkbox').prop('checked',false) && $this.trigger('change'));
}

/*多选字典非"不限"点击事件函数*/
function notUnlimitedClickFn() {
    var $this = $(this);
    var isSomeOneChecked = false;
    var $unlimited = $this.siblings('input:checkbox').first();
    if($this.prop('checked')){
        $unlimited.prop('checked',false);
    }else{
        $unlimited.siblings('input:checkbox').each(function (i,ele) {
            $(ele).prop('checked') && (isSomeOneChecked = true);
        });
        isSomeOneChecked || $unlimited.prop('checked',true);
    }
    $this.trigger('change');
}

/**
 * 初始化树形字典
 * @param target
 * @param data
 */
// var initedTreeDict=false;
// var winScrollTop;
// var disabledScroll=function(){
//     //alert()
//     document.body.scrollTop=winScrollTop;
//     // event.preventDefault();
//     // event.stopPropagation();
//     // return false;
// };
// var disMouseWheel = function(event) {
//     event.preventDefault();
//     return false;
// };
function initTreeDict(target, data, cmUseData,cb) {
    // if(initedTreeDict){
    //   return false;
    // }
    // initedTreeDict=true;

    // var config = getConfigForDict(target, _dictConfig.radio.name);
    var $body = $(document.body);
	var config = getConfigForDict(target, _dictConfig.tree.name);
    var name = config.dictName;
    var _value = config.returnValue ? 'dictValue' : 'dictKey';
    var root = config.dictRoot;
    var dictNum = config.dictNum;
    var dictId = config.dictId;
    var multiple = config.multiple;
    var notEmpty = config.notEmpty;
    var dictDefault = config.dictDefault;
    var template = '';
    var checkedValue = '';
    var preTempArr = [];
    // var checkedArr = [];
    var dictChildren = '{{items:#<input name="{0}" id="{forId}" type="{2}" value="{{1}}" class="dict-{2}" checked{$index}{5}><label for="{forId}">{dictValue}</label>#}}{3}{4}';
    var moreBtn = '<a href="javascript:void(0);" class="dict-tree-more-btn">更多 <i class="icon-caret-down"></i></a>';
    var hiddenInput = '<input type="hidden" id="{dictId}" name="{dictName}" value="{items.0.{0}.toString}" data-chval="{items.0.dictValue}">';
    var hiddenInputNoVal = '<input type="hidden" id="{dictId}" name="{dictName}" value="" data-chval="">';
    var iframeSetting = {
        trigger:'',
        multi:true,
        closeable:false,
        width:355,
        height:480,
        padding:false,
        type:'iframe',
        url:''
    };

    function createTp(preData) {

        config.items = preData;

        if(!notEmpty){
            config.items.splice(0,0,{dictKey:'',dictValue:'不限'});
        }
        if(!preData.length){
            return moreBtn+hiddenInput.format(_value);
        }

        config.items.each(function (o,i) {
            o.forId = dictId+(Date.now()+i);
        });
        if(dictDefault !== 'false'){
            dictDefault = '';
        }else{
            dictDefault = 'no';
            hiddenInput = hiddenInputNoVal;
        }
        if(multiple){
            return dictChildren.format(name,_value,'checkbox',moreBtn,hiddenInput.format(_value),dictDefault);
        }else{
            return dictChildren.format(name,_value,'radio',moreBtn,hiddenInput.format(_value),dictDefault);
        }
    }

	if(cmUseData){
        template = createTp(cmUseData);
    }else if(dictNum){
        preTempArr = data.slice(0,dictNum).select('obj=>{dictKey:obj.key,dictValue:obj.value}');
        // data.slice(0,dictNum).select(function(obj){
        //     preTempArr.push({dictKey:obj.key,dictValue:obj.value})
        // });
        template = createTp(preTempArr);
    }else{
        template = '<input type="text" readonly="readonly" name="{dictName}_displayValue" id="{dictId}_displayValue" {dataOptions} class="common-input{validate}">\
                    <input type="hidden" name="{dictName}" id="{dictId}">\
                    <a href="#" id="{id}-tree-btn"><i class="icon-caret-down fs16"></i></a>';
    }
    target.html($compile(template, config));
    setHidVal(target,multiple);
    target.find('#{0}-tree-btn'.format(config.id)).on('click',function(e){
        //var x = config.treeX || e.pageX - 100;
        //var y = config.treeY || e.pageY - window.scrollTop - 10;//+15;
        //if (typeof x == 'string') x = Number(x);
        //if (typeof y == 'string') y = Number(y);
        //x + 550 > width && (x = width - 565);

        $('#dictFrame').remove();
        window.currentDictConfig = config;

        window.dictWin = $open(getDistPath()+'/plugin/dict/dict-tree.html',
            {
                title: '字典',
                width: 560,
                height: window.height-160,// - 40 - y,
                top: 50,//y,
                //left: x,
                mask: 'no-top',
                modal: false,
                onClose: function () {
                    $('#' + config.id + '_treeButton').off("click");
                    if ("iajlbDict" == config.dictId) {
                        $("span[name='filter3']").removeClass("filter_active");
                        $("#ajlb").val($('#' + config.dictId).val());
                    }
                    window.preQueryValue = '';
                }
            }, true, function () {
                if ($.ztree) {
                    initDictZtree(target, data);
                } else {
                    importing('ztree', function () {
                        initDictZtree(target, data);
                    });
                }
                commonRootKey = target.attr(_dictConfig.dictRoot);
                if (config.multiple) {
                    $('#multipleDiv').show();
                    $('#dictFrame .multiple').show();
                    $('#dictFrame .single').hide();
                    // commonMode = 1;
                } else {
                    $('#dictFrame .multiple').hide();
                    $('#dictFrame .single').show();
                    // commonMode = 1;
                }
                if (!config.dictRoot || config.dictRoot == 'custom') {
                    $('#dictQueryBtn').hide();
                    $('#commonDict').hide();
                } else {
                    searchCommonDictZtree(config.multiple); //初始化树形字典时，查询常用字典项，并初始化常用字典项ztree
                }
            });
        dictWin.parent().addClass('dict-window-wrap');
    });
    target.on('change','input:radio',function () {
        var $this = $(this);
        var hidVal = $this.val();
        var hidChVal = $this.next('label').html()
        $this.nextAll('input[type="hidden"]').val(hidVal).attr('data-chval',hidChVal);
        $body.trigger('x-change',['[dict-id="{0}"]'.format(dictId),hidVal,hidChVal]);
    });
    target.on('change','input:checkbox',function () {
        var valArr = setHidVal(target,multiple);
        $body.trigger('x-change',['[dict-id="{0}"]'.format(dictId),valArr[0],valArr[1]]);
    });
    if(target.children('label').first().text()=='不限'){
        target.children('input:checkbox').first().on('click',unlimitedClickFn);
        target.on('click','input:checkbox:nth-child(n+2)',notUnlimitedClickFn);//.siblings('input:checkbox').on('click',notUnlimitedClickFn);
    }
    target.data('customData',data);
    importing('popover',function () {
        // target.children('.dict-tree-more-btn').webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:'{0}?dictType={1}&checkedValue={2}'.format('../plugin/dict/dict-tree-xcky.html',root,checkedValue)}));
        target.on('click','.dict-tree-more-btn',function () {
            var $this=$(this);
            var $hidVal = target.children('input[type="hidden"]').val();
            iframeSetting=$.extend(iframeSetting,{url:'{0}?dictType={1}&dictId={2}&dictMulti={3}&checkedValue={4}'.format(getDistPath('plugin/dict/dict-tree-xcky.html'),root,target.attr('dict-id'),multiple,$hidVal)});
            // winScrollTop = scrollTop;
            // log(winScrollTop)
            // $(window).on('scroll',disabledScroll);
            // $(document).on('mousewheel',function(event) {
            //     return false;
            // });
            // document.addEventListener('mousewheel',disMouseWheel);
            $this.webuiPopover('destroy').webuiPopover(iframeSetting);
        });
        target.removeClass('unready');
        typeof cb=='function' && cb();
});
}

/**
 * 初始化多选框字典
 * @param target
 * @param data
 */
function initCheckboxDict(target, data) {
    var config = getConfigForDict(target, _dictConfig.checkbox.name);
    var _value = config.returnValue ? 'value' : 'key';
    var name = config.dictName;
    var notEmpty = config.notEmpty;
    var multiple = config.multiple;
    var dictId = config.dictId;
    var dictDefault = config.dictDefault;
    var $body = $(document.body);

    config.items = data;

    if(!notEmpty){
        config.items.splice(0,0,{key:'',value:'不限'});
    }
    config.items.each(function (o,i) {
        o.forId = dictId+(Date.now()+i);
    });
    var hiddenInput = '<input type="hidden" id="{dictId}" name="{dictName}" value="{items.0.{0}.toString}" data-chval="{items.0.value}">'.format(_value);
    var dictChildren = '{{items:#<input name="{0}" id="{forId}" class="dict-checkbox" checked{$index}{4} type="{2}" value="{{1}}"/><label for="{forId}">{value}</label>#}}{3}';
    dictDefault = dictDefault !== 'false'?'':'no';
    var template = dictChildren.format(name,_value,'checkbox',hiddenInput,dictDefault);
    target.html($compile(template, config));
    setHidVal(target,true);
    target.children('input:checkbox').on('change',function () {
        var valArr = setHidVal(target,true);
        $body.trigger('x-change',['[dict-id="{0}"]'.format(dictId),valArr[0],valArr[1]]);
    });
}

/**
 * 初始化单选框字典
 * @param target
 * @param data
 */
function initRadioDict(target, data) {
    var config = getConfigForDict(target, _dictConfig.radio.name);
    var name = config.dictName;
    var notEmpty = config.notEmpty;
    var dictDefault = config.dictDefault;
    var $body = $(document.body);
    var dictId = config.dictId;
    config.items = data;

    if(!notEmpty){
        config.items.splice(0,0,{key:'',value:'不限'});
    }

    config.items.each(function (o, i) {
        o.forId = dictId+(Date.now()+i);
    });
    dictDefault = dictDefault !== 'false'?'':'no';
    var _value = config.returnValue ? 'value' : 'key';
    var hiddenInput = '<input type="hidden" id="{dictId}" name="{dictName}" value="{items.0.{0}.toString}" data-chval="{items.0.value}">'.format(_value);
    var template = '{{items:#<input name="' + name + '" id="{forId}"  type="radio" class="dict-radio" value="{' + _value + '}" checked{$index}'+dictDefault+'><label for="{forId}">{value}</label>#}}'+hiddenInput;

    target.html($compile(template, config));
    // target.find('input:radio:first').get(0).checked = true;
    target.children('input:radio').on('change',function () {
        var $this = $(this);
        var hidVal = $this.val();
        var hidChVal = $this.next('label').html();
        $this.nextAll('input[type="hidden"]').val(hidVal).attr('data-chval',hidChVal);
        $body.trigger('x-change',['[dict-id="{0}"]'.format(dictId),hidVal,hidChVal]);
    });
}


/**
 * 字典Ztree初始化
 * @param target
 * @param data
 */
function initDictZtree(target, data) {
    zTreeObj = $.ztree.init($('#baseTree'), setting, data);
    var root = target.attr(_dictConfig.dictRoot);
    if (root && root.toUpperCase() === 'GXSDM1') {
        var nodes = zTreeObj.getNodes();
        zTreeObj.expandNode(nodes[0]);
    }
}


/**
 * 字典确认
 */
function treeDictOk() {
    var returnKey = '';
    var returnValue = '';
    if (currentDictConfig.multiple) {
        returnKey = $('#selectedKeys').val();
        returnValue = $('#selectedValues').text();
    } else {
        if (window.currentDictNode != undefined) {
            returnKey = window.currentDictNode.key;
            returnValue = window.currentDictNode.value
        }
    }
    if (currentDictConfig.returnValue) {
        returnKey = returnValue;
    }
    if (returnKey == '') {
        if (currentDictConfig.treeLeaf && !currentDictConfig.multiple) {
            toast('请选择叶子节点字典').warn();
        } else {
            toast('请选择字典').warn();
        }
        return;
    }
    $('#' + currentDictConfig.dictId).val(returnKey);
    $('#' + currentDictConfig.dictId + '_displayValue').val(returnValue);
    $('#' + currentDictConfig.dictId + '_displayValue').removeClass('validatebox-invalid');
    $('#' + currentDictConfig.dictId).trigger('x-change',[returnValue]);

    window.currentDictConfig = null;
    window.dictWin.$close();
    //window.dictWin.find('.panel-tool-close').click();

}

/**
 * 字典选择空值
 */
function treeDictEmpty() {
    $('#' + currentDictConfig.dictId).val('');
    $('#' + currentDictConfig.dictId + '_displayValue').val('');
    $('#' + currentDictConfig.dictId).trigger('x-change',['']);
    window.currentDictConfig = null;
    window.dictWin.$close();
    //window.dictWin.find('.panel-tool-close').click();
}

/**
 * 多选字典选择清空
 */
function clearMultipleDict() {
    $('#selectedValues').text('');
    $('#selectedValues').attr('title', '');
    $('#selectedKeys').val('');
}

function selectQueryDict(key, value) {
    if (currentDictConfig.multiple) {
        var oldValue = $('#selectedValues').text();
        var oldKey = $('#selectedKeys').val();
        if (oldKey.indexOf(key) == -1) {//&& oldValue.indexOf(value)==-1
            var newValue = "";
            var newKey = "";
            if (oldValue == "") {
                newValue = value;
            } else {
                newValue = oldValue + "、" + value;
            }
            if (oldKey == "") {
                newKey = key;
            } else {
                newKey = oldKey + "," + key;
            }
            jQuery("#selectedValues").text(newValue);
            jQuery("#selectedKeys").val(newKey);
        }
    } else {
        if (currentDictConfig.returnValue) {
            key = treeNode.value;
        }
        $('#' + currentDictConfig.dictId).val(key);
        $('#' + currentDictConfig.dictId + '_displayValue').val(value);
        $('#' + currentDictConfig.dictId + '_displayValue').removeClass('validatebox-invalid');
        $('#' + currentDictConfig.dictId).trigger('x-change',[value]);
        window.currentDictNode = null;
        window.currentDictConfig = null;
        window.dictWin.$close();
        //window.dictWin.find('.panel-tool-close').click();
    }
}

function showDictQuery() {
    $('#dictTreeDiv').hide();
    $('#dictQueryDiv').show();
    $('#dictQueryBtn').hide();
    $('#dictTreeBtn').show();
    $('#commonDict').hide();
    $('#rMenu').hide();
}

function showDictTree() {
    $('#dictTreeDiv').show();
    $('#dictQueryDiv').hide();
    $('#dictQueryBtn').show();
    $('#dictTreeBtn').hide();
    $('#commonDict').show();
    $('#rMenu').show();
}

var preQueryValue = "";
var condition = "";
var strType = "";
function queryDict(obj) {
    condition = obj.value;
    if ($.trim(condition) == preQueryValue) {
        return;
    }
    preQueryValue = condition;
    if (condition == "" || condition.length < 2) {
        return;
    } else {
        var regcode = /^[0-9]+$/;
        var regcodepy = /^[a-zA-Z]+$/;
        if (regcode.exec(condition)) {
            strType = "1";//代码
        } else if (regcodepy.exec(condition)) {
            strType = "2";//拼音
        } else {
            strType = "3";//中文
        }
    }
    $get(makeAct('dict/' + currentDictConfig.dictRoot + '/query/json'), {
        queryType: strType,
        queryString: encodeURI(condition)
    }, function (list) {
        list = list.data;
        var data = {dicts: list};
        $template('#dictQueryTb', data);
    }, false, true);

}

//==================字典数据Ajax-Begin===================
/**
 * 服务器查询字典数据
 * @param url 查询URL
 * @param target 字典对象
 * @param cb 回调
 */
function getDictDataFromRemote(url, cb, completeCb) {
    $get(url, null, function (remoteData) {
        remoteData = remoteData.data;
        if (remoteData != null && remoteData.length > 0) {
            //localData.set(url.slice(url.indexOf('/api/')), remoteData);
        }
        cb(remoteData);
    },false,completeCb);

}

/**
 * 根据key查询字典信息
 * @param root 字典代码类型
 * @param key 字典key
 * @param cb 回调
 */
function getDictByKey(root, key, cb) {
    if (root == null || key == null) return null;
    $get(makeAct('sys/sysDict/' + root + '/' + key), null, function (dict) {
        dict = dict.data;
        cb(dict);
    });
}

/**
 * 根据多个key查询字典信息
 * @param root 字典代码类型
 * @param keys 字典keys，使用英文逗号分隔
 * @param cb 回调
 */
function getDictListByKeys(root, keys, cb) {
    if (root == null || keys == null) return null;
    $get(makeAct('sys/sysDict/' + root + '/' + keys), null, function (list) {
        list = list.data;
        cb(list);
    });
}

//==================字典数据Ajax-End===================

//==================常用字典项-Begin===================

var rMenu = $('#rMenu');
var newCount = 1;//新建组名称后面额数字
var commonBaseTreeObj;
var commonRootKey;
var commonMode = 1; //1-管理模式 0-选择模式
var toastTime = 1500;
var currentEditNode;


var commonSetting = {
    data: {
        keep: {
            lefe: true,
            parent: true
        },
        simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'pId',
            rootPId: null
        }
    },
    callback: {
        beforeExpand: function (treeId, treeNode) {
            return true;
        },
        beforeRightClick: function (treeId, treeNode) {
            if (treeNode == null) {
                return false;
            } else {
                return true;
            }
        },
        onRightClick: function (event, treeId, treeNode) {//右键菜单
            if (commonMode == 1) {
                if (treeNode.isParent) {
                    $('#m_rename').show();
                } else {
                    $('#m_rename').hide();
                }
                showRMenu(treeNode, event.clientX, event.clientY);
            }
        },
        beforeClick: function (treeId, treeNode, clickFlag) {
            var nodes = commonBaseTreeObj.getSelectedNodes();
            if (nodes.length > 0 && nodes[0] == treeNode) {
                commonBaseTreeObj.cancelSelectedNode(treeNode);
            } else {
                commonBaseTreeObj.selectNode(treeNode);
            }
            return false;
        },
        beforeRename: function (treeId, treeNode, newName, isCancel) {
            newName = $.trim(newName);
            if (newName == '') {
                setTimeout(function () {
                    toast("组名称不能为空", toastTime).warn();
                }, 500);
                return false;
            }
            if (newName.length > 10) {
                setTimeout(function () {
                    toast("组名称长度请不要超过10个字", toastTime).warn();
                }, 500);
                return false;
            }
            var nodes = commonBaseTreeObj.getNodesByParam("name", newName, null);
            if (nodes != null && nodes.length > 0 && newName != treeNode.name) {
                setTimeout(function () {
                    toast("该组名已经存在", toastTime).warn();
                }, 500);
                return false;
            }
            return true;
        },
        onRename: function (event, treeId, treeNode, isCancel) {
            var newName = $.trim(treeNode.name);
            $get(makeAct('dict/update/rename'), {
                groupId: treeNode.id,
                groupName: encodeURI(newName)
            }, function (res) {

            }, false, false);
        },
        beforeDblClick: function (treeId, treeNode) {
            if (treeNode == null) {
                return false;
            } else {
                return true;
            }
        },
        onDblClick: function (event, treeId, treeNode) {
            if (!treeNode) return;
            //if(commonMode == '1'){
            //    toast("请退出管理模式后双击选择", 1500);
            //    return;
            //}
            if (treeNode.isParent) {
                var nodes = commonBaseTreeObj.getNodesByParam("pId", treeNode.id, null);
                // if(nodes.length > 1){
                //     toast("当前字典为单选字典，无法选择包含多个字典的组", toastTime).warn();
                //     return;
                // }
                if (nodes && nodes.length > 0) {
                    var newValue = "";
                    var newKey = "";
                    for (var i = 0; i < nodes.length; i++) {
                        if (newValue == "") {
                            newValue = nodes[i].value;
                        } else {
                            newValue += "、" + nodes[i].value;
                        }
                        if (newKey == "") {
                            newKey = nodes[i].key;
                        } else {
                            newKey += "," + nodes[i].key;
                        }
                    }
                    selectQueryDict(newKey, newValue);
                } else {
                    setTimeout(function () {
                        toast("该组下没有字典", toastTime).warn();
                    }, 500);
                    return;
                }
            } else {
                selectQueryDict(treeNode.key, treeNode.value);
            }
        }
    },
    view: {
        showLine: false,
        dblClickExpand: false,
        showIcon: true,
        showTitle: true,
        addDiyDom: addDiyDom
    },
    edit: {
        enable: false,
        showRemoveBtn: false,
        removeTitle: '移除',
        showRenameBtn: false,
        drag: {
            isCopy: false,
            isMove: false
        }
    }
};

/**
 * 查询常用字典
 * @param multiple 是否是多选字典的常用项 多选：true，单选：false
 */
function searchCommonDictZtree(multiple) {
    var commonData = [];
    $get(makeAct('dict/search/commonDict'), {root: commonRootKey}, function (res) {
        //多于同种类别的字典，单选时不显示组
        if (multiple) {
            commonData = res.data;
        } else {
            res.data.forEach(function (e) {
                if (e.isParent == 'false' && e.pId == null) {
                    commonData.push(e);
                }
            });
        }
        //初始化常用字典项ztree
        initCommonDictZtree(commonData);
    }, false, true);
}

/**
 * 常用项字典初始化
 * @param target
 * @param data
 */
function initCommonDictZtree(data) {
    commonBaseTreeObj = $.ztree.init($('#commonBaseTree'), commonSetting, data);
}

/**
 * 进入或离开常用项管理
 * @param type 1-管理模式 0-选择模式
 * @return
 */
function mgnCommDict(type) {
    if (type == 1) {
        commonMode = 1;
        jQuery('#opertionSpan').show();
        jQuery("#intoMgn").hide();
        jQuery("#outMgn").show();
    } else {
        commonMode = 0;
        jQuery('#opertionSpan').hide();
        jQuery("#intoMgn").show();
        jQuery("#outMgn").hide();
    }
}

//新建组
function addGroup() {
    var existFlag = true;
    var groupName = '';
    while (existFlag) {
        groupName = "新建组" + (newCount++);
        var nodes = commonBaseTreeObj.getNodesByParam("name", groupName, null);
        if (nodes == null || nodes.length == 0) {
            existFlag = false;
        }
    }
    var newNode = {id: newCount, pId: 0, open: false, isParent: true, name: groupName};
    $get(makeAct('dict/insert/group'), {
        rootKey: commonRootKey,
        groupName: encodeURI(groupName)
    }, function (res) {
        var id = res.data;
        newNode.id = id;
        var treeNode = commonBaseTreeObj.addNodes(null, newNode);
        var node = commonBaseTreeObj.getNodeByParam('id', id, null);
        var groupNodes = commonBaseTreeObj.getNodesByParam('isParent', true, null);
        var target = null;
        var location = '';
        //包含新增的组，长度小于2表示只有新增的组
        if (groupNodes.length < 2) {
            target = commonBaseTreeObj.getNodes()[0];
            location = 'prev';
        } else {
            target = groupNodes[groupNodes.length - 2];
            location = 'next';
        }
        commonBaseTreeObj.moveNode(target, node, location);
        commonBaseTreeObj.editName(node);
    }, false, false);
}

/**
 * 显示右键菜单
 */
function showRMenu(treeNode, x, y) {
    currentEditNode = treeNode;
    var dictFrame = $('#dictFrame');
    var t_x = x - dictFrame.parent().parent().offset().left + 20;
    var t_y = y - dictFrame.parent().parent().offset().top;
    $("#rMenu ul").show();
    $('#rMenu').css({
        "top": t_y + "px",
        "left": t_x + "px",
        "visibility": "visible"
    });
    $("body").bind("mousedown", onBodyMouseDown);
}

/**
 * 隐藏右键菜单
 */
function hideRMenu() {
    if ($('#rMenu')) $('#rMenu').css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
    currentEditNode = null;
}

/**
 * 点击空白处隐藏右键菜单
 */
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        $('#rMenu').css({"visibility": "hidden"});
        currentEditNode = null;
    }
}
//删除常用节点或分组
function deleteCommonNode() {
    if (currentEditNode) {
        // console.log(currentEditNode);
        $confirm('是否确认移除【' + currentEditNode.name + '】', function (bol) {
            if (bol) {
                $get(makeAct('dict/delete/commonDict'), {groupId: currentEditNode.id}, function (res) {
                    commonBaseTreeObj.removeNode(currentEditNode);
                    hideRMenu();
                }, false, false);
            } else {
                hideRMenu();
            }
        });
    }
}

//重命名
function renameNode() {
    if (currentEditNode.isParent && commonMode == 1) {
        commonBaseTreeObj.editName(currentEditNode);
        hideRMenu();
    }
}


//添加常用项
function addCommDict() {
    //var baseTreeObj = $.fn.zTree.getZTreeObj("baseTree");//字典树
    var selectNode = zTreeObj.getSelectedNodes();//选中的节点
    var groupNode = commonBaseTreeObj.getSelectedNodes();//选中的分组
    if (selectNode.length == 0) {
        setTimeout(function () {
            toast("请从左侧树形字典中选中要设置成常用项的节点", toastTime).warn();
        }, 500);
    } else {
        var key = selectNode[0].key;
        var name = selectNode[0].value;
        var parentNode = null;
        if (groupNode.length) {
            parentNode = groupNode[0];
            //取出选中的常用项分组
            if (!parentNode.isParent) {
                parentNode = groupNode[0].getParentNode();
            }
        }
        //判断要加入常用项的节点是否在当前分组中
        if (parentNode != null) {
            var nodes = commonBaseTreeObj.getNodesByParam("name", name, parentNode);
            if (nodes != null && nodes.length > 0) {
                setTimeout(function () {
                    toast("当前组中已经存在同名字典", toastTime).warn();
                }, 500);
                return;
            }
        } else {
            var rootNode = commonBaseTreeObj.getNodesByParam("pId", null);
            for (var i = 0; i < rootNode.length; i++) {
                if (!(rootNode[i].isParent) && rootNode[i].name == name) {
                    setTimeout(function () {
                        toast("常用项中已经存在同名字典", toastTime).warn();
                    }, 500);
                    return;
                }
            }
        }
        $get(makeAct('dict/insert/commonDict'), {
            rootKey: commonRootKey,
            dictKey: key,
            groupId: parentNode ? parentNode.id : ''
        }, function (res) {
            if (res.data == '' || res.data == 'null' || res.flag == 0) {
                setTimeout(function () {
                    toast("该字典已经存在常用项中", toastTime).warn();
                }, 500);
            } else {
                commonBaseTreeObj.addNodes(parentNode, {id: res.data, name: name, key: key, value: name});
            }
        }, false, false);
    }
}

//节点名太长用省略号替换
function addDiyDom(treeId, treeNode) {
    var spantxt = $("#" + treeNode.tId + "_span").html();
    if (spantxt.length > 13) {
        // spantxt=spantxt.substring(0,13)+"...";
        spantxt = spantxt.substring(0, 8) + "...." + spantxt.substring(spantxt.length - 5, spantxt.length);
        $("#" + treeNode.tId + "_span").html(spantxt);
    }
}


//==================常用字典项-end===================