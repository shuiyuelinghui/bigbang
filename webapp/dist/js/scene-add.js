//现勘-新增现场
setSubPrj('xk');
importing('dict','popover', 'slick','datepicker','mappicker','hsmap', 'jui',function () {
    var setCache = 60*1000;  //设置定时去缓存form表单的时间
    var fileUploadPath = top.sysParams.fileUploadPath; //'http://192.168.1.211:8888'; 图片上传地址
    var fileServerPath = top.sysParams.fileServerPath;  //图片访问地址
    var addScene = {};
    var alertWindow;
    window._kyry = [];
    var cyjzr;
    var iframeSetting = {
        trigger:'',
        multi:true,
        closeable:false,
        width:780,
        height:510,
        padding:false,
        type:'iframe',
        url:''
    };
    var $body = $(document.body);
    var getTextTpSourceAction = makeAct('sceneCollecting/textTemplate/queryListBy');
    var getTextTpCateAction = makeAct('sys/sysDict/single/WBMBLXDM');
    var getInputTpDataAction = makeAct('sceneCollecting/inputTemplate/getBase');
    var getCmDataAction = makeAct('sceneCollecting/dictComm/queryAll');
    var sceneInvestigator = [];
    var unitAct = makeAct('sys/sysOrganization/dict_unit'); //发案区划act
    var peopleTypeAct = makeAct('sys/sysDict/single/SARYLBDM');   //报案人||被害人act
    var kyryAct = makeAct('sceneCollecting/investigatorHistory/queryAll', '');  //勘验人员 、指挥人员 act
    var sltKyryAct = makeAct('sys/sysUser/queryTreeUser');  //已选择的勘验人员
    var dutyAct = makeAct('sys/sysDict/single/KYZZDM'); //责任list
    var fxyjAct = makeAct('/sys/sysDict/single/FXYJXMDM');  //分析意见list
    var gjlbAct = makeAct('/sys/sysDict/single/ZAGJLMDM');  //工具类别
    var gjlyAct = makeAct('/sys/sysDict/single/ZAGJLYDM');  //工具来源
    var stxxAct = makeAct('/sceneCollecting/dictComm/queryAll');    //尸体信息
    var queryTreeUserAct = makeAct('sys/sysUser/queryTreeUser');    //常用勘验人员

    var urlObj = queryParse();  //获取url上的参数  转换成对象
    var investigationId = urlObj.id;    //获取勘验id
    var timeout = 300;  //定时器时长


    $filter('getFullPath', function () {
        return fileServerPath+'/'+this.valueOf();
    });

    //字符串过长截取前后字符中间以省略号代替
    $filter('overStrEllipsis', function(){
        if(this.length >= 30) {
            return this.slice(0, 8) + '......' + this.slice(-8, this.length);
        } else {
            return this;
        }
    });

    //生成32位的id
    window.getGuid = function(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    };
    //出勘信息页面接口
    /*addScene.kyryPost = function () {
        var act = makeAct('sceneCollecting/investigatorHistory/queryAll', '');
        var param = {
            // "investigatorName": "",
            "duty":"1"
        };
        $post(act, param, function (data) {
            console.log(data);
        });
    }*/
    $.extend($.fn.validatebox.defaults.rules, {
        nDecimals: {
            validator: function (val) {
                return /^-?\d\d?(\.\d\d?)?$/.test(val);
            },
            message: '请输入-100到100以内的数字，可包括两位小数'
        },
        decimals: {
            validator: function (val) {
                return /^\d\d?(\.\d\d?)?$/.test(val);
            },
            message: '请输入0到100以内的数字，可包括两位小数'
        }
    });
    Object.prototype.extending('insideof',function(arr,e){
        return arr.indexOf(this.valueOf())>-1;
    });
    function isAt_or_notAt(bol,obj,e){
        var new_arr=[];
        var log_arr=[];
        var j=this.length;
        for(var i=0;i<j;i++){
            if(this[i].valueOf().insideof(obj,e)==bol){
                new_arr.push(this[i]);
                log_arr.push(i);
            }
        }
        new_arr.indexes=log_arr;
        return new_arr;
    }
    Array.prototype.notAt=function(obj,e){
        return isAt_or_notAt.call(this,false,obj,e)
    };
    Array.prototype.isAt=function(obj,e){
        return isAt_or_notAt.call(this,true,obj,e)
    };
    Array.prototype.xor=function(obj,e){
        return this.notAt(obj,e).concat(obj.notAt(this.valueOf(),e));
    };

    function toQueryScene() {
        //与导航条联动, 先看是否是导航下级菜单,寻找对应的侧边子菜单
        top.rootMenu.find('li>a').each(function () {
            $(this).removeClass('menu-open');
            $(this).parents('.grade2,.grade3').each(function () {
                $(this).children('a').eq(0).removeClass('menu-open menu-open2');
            });
        });
        top.rootMenu.find('li').each(function () {
            var $this = $(this);
            if ('query-scene' == $this.attr('page-no') || '现场查询' == $this.attr('title')) {
                var a = $(this).children('a').eq(0);
                a.parents('.grade2,#root-menu>li').each(function () {
                    $(this).children('a').eq(0).addClass('menu-open');
                });
                a[0].click();
                a.addClass('menu-open menu-open2');
            }
        });
    }

    //重新处理勘验人员，指挥人员数据
    addScene.updateSceneInvestigator = function (formdata) {
        var tmpArr = [];
        var arr = [];
        sceneInvestigator.each(function (item1) {
            var delflag = 1;
            formdata.sceneHandleInfo.sceneInvestigator.each(function (item2, i) {
                if(item1.investigatorId == item2.investigatorId) {
                    delflag = 0;
                    tmpArr.push({
                        "id": item1.id,
                        "investigatorId": item1.investigatorId,
                        "investigatorName": item1.investigatorName,
                        "duty": item2.duty
                    });
                    arr.push(i);
                }
            });
            if(delflag) {
                tmpArr.push({id: item1.id, deleteFlag: '1'});
            }
        });
        formdata.sceneHandleInfo.sceneInvestigator.each(function (item, i) {
            var index = arr.indexOf(i);
            if(index == -1) {
                tmpArr.push(item);
            }
        });
        return tmpArr;
    }
    //比较分析意见的选项，不同则返回不同的选项
    addScene.fxyjCompare = function (beforeData,afterData) {
        var sceneAnalysisItem = [];
        for(var i = 1; i <= 10; i++) {
            var beforeWhere = beforeData.sceneAnalysisSuggestion.sceneAnalysisItem.where('o => o.itemType=="{0}"'.format(i));
            var afterWhere = afterData.sceneAnalysisSuggestion.sceneAnalysisItem.where('o => o.itemType=="{0}"'.format(i));
            if(obj2str(beforeWhere) != obj2str(afterWhere)) {
                sceneAnalysisItem = sceneAnalysisItem.concat(afterWhere);
            }
        }
        return sceneAnalysisItem;
    }

    //字典验证
    $.fn.dictValidatebox = function() {
        this.each(function (i,ele) {
            var $ele = $(ele);
            $ele.children('input[type="hidden"]').val() || $ele.addClass('cus-vl-invalid');
        });
    };

    /*
     * 把查询的数据 渲染到页面上去
     * @param {jqueryDom} $ele jquery获取的dom
     * @param {object} data 数据
     * */
    window.fillData = function ($ele, data) {
        var bigField = $ele.attr('data-bigfield');
        data = data[bigField] || data['scenePicture'];
        if(data.id) {
            $ele.attr('data-id', data.id);
        }
        $ele.find('.form-field').each(function () {
            var $this = $(this);
            var tagName = $this.get(0).tagName;     //标签名
            var field = $this.attr('data-field');   //获取属性
            if(field!='bigfield' && !data[field]) {
                return true;
            }
            // var dictCode = $this.attr('data-dict') || ''; //字典代码 默认为空 （一般不存在）
            // var dictName = $this.find('.type-in-label-m').text().replace(':', '') || ''; //属性名称 默认为空
            if(tagName == 'INPUT') {    //如果含有form-field的标签是input
                $this.val(data[field]);
                return;    //跳出本次循环
            }
            if(tagName == 'DICT') {
                $this.dictSelect(data[field]);
                return;
            }
            if(tagName == "UL") {   //如果含有form-field的标签是ul
                //痕迹物证 field == sceneMaterialEvidence
                data[field].each(function (item, i) {
                    var obj = {
                        // order: i + 1,
                        uuid: item.id || getGuid(),
                        attachmentId: item.attachmentId,
                        module: item.category==1?1:'',
                        materialEvidenceName: item.materialEvidenceName
                    };
                    //指纹修改图obj
                    var modifyObj = {
                        uuid: 'edit-'+item.id,
                        modifyAttachmentId: item.modifyAttachmentId
                    };
                    var hjwzlxdm = {    //提取物证代码反解析
                        "1": "print",
                        "2": "foot",
                        "3": "tool",
                        "4": "gun",
                        "5": "special",
                        "6": "bio",
                        "7": "drug",
                        "8": "physic",
                        "9": "doc",
                        "10": "elec",
                        "11": "video",
                        "12": "others"
                    };
                    var li = $compile('#hjwz-li-tp', obj);
                    var $li = $(li).data('picInfo', item);

                    var $liClone = $(li).data('picInfo', item);
                    var $ul = $('.hjwz-pics[param="{0}"]'.format(hjwzlxdm[item.category])); //找到提取物证类别  相对应
                    var $em = $('.hjwz-tabs[param="hjwz"]>[param="{0}"]'.format(hjwzlxdm[item.category])).find('em');
                    //手印 && 手印有修改图
                    if(item.category == '1' && item.modifyAttachmentId){
                        $li.addClass('after-edit').append($compile(divHtml, modifyObj));
                        $liClone.addClass('after-edit').append($compile(divHtml, modifyObj));
                    }
                    $('#hjwz-all').append($li);
                    $ul.append($liClone);

                    var em = (+$em.text()) + 1;
                    $em.text(em);
                });
                //痕迹物证 全部数量
                $('.hjwz-tabs>[param="all"]').find('em').text(data[field].length);

                return;
            }
            if(tagName == 'DIV') {      //如果含有form-field的标签是div
                var $em = $this.find('em.form-txt');     //纯文本
                var $text = $this.find('input:text');   //文本输入框
                var $textarea = $this.find('textarea');     //大文本输入框
                var $ul = $this.find('ul');     //多选
                var $ulImg = $this.find('.ul-img');   //图片
                var $checkbox = $this.find('input:checkbox');//多选
                var $radio = $this.find('input:radio'); //单选
                var $hideInput = $this.find('input[type="hidden"]');   //隐藏input
                if($em.length) {       //存在纯文本时,跳出本次循环
                    $em.attr('data-val', data[field]);
                    $em.prop('title', data[field+'Cn'] || '');
                    $em.html(data[field+'Cn'] && data[field+'Cn'].overStrEllipsis() || '');
                    return;
                }
                if($text.length) {     //存在文本框时text,跳出本次循环
                    $text.val(data[field]);
                    return;
                }
                if($textarea.length) {     //存在大文本框时textarea,跳出本次循环
                    if(field == 'content') {    //field为勘验情况的 勘验检查情况
                        $this.attr('data-id', data['investNoteId']);
                    }
                    $textarea.val(data[field]);
                    return;
                }
                if($radio.length) {        //存在单选框时 radid,跳出本次循环
                    if(field == 'sceneAnalysisItem') {
                        var itemtype = $radio.closest('dict').attr('data-dictkey');
                        var tmpArr = data[field].where('o => o.itemType=="{0}"'.format(itemtype));
                        $this.find('dict').dictSelect(tmpArr[0].itemKey);
                        // $radio.filter('[value="{0}"]'.format(tmpArr[0].itemKey)).trigger('click');
                    }else if(field == 'caseRegionalism'){
                        $this.find('dict').dictSelect(localData.get('aqxx-case-regionalism').where('o=>o.key=="{0}"'.format(data[field])),true);
                    }else {
                        $this.find('dict').dictSelect(data[field]);
                        // $radio.filter('[value="{0}"]'.format(data[field])).trigger('click');
                    }
                    return;
                }
                if($checkbox.length) {     //存在多选框时 checkbox,跳出本次循环
                    if(field == 'sceneInvestigator') {
                        if($this.attr('data-duty') == '1') {    //指挥人员 渲染数据
                            var tmpArr = data[field].where('o => o.duty == "1"').select('o => {key: o.investigatorId, value: o.investigatorName}');
                        } else {    //勘验人员 渲染数据
                            var tmpArr = data[field].where('o => o.duty != "1"').select('o => {key: o.investigatorId, value: o.investigatorName}');
                        }
                        $checkbox.closest('dict').dictSelect(tmpArr, true);
                    } else if(field == 'sceneAnalysisItem') {   //分析意见字典 渲染
                        var itemtype = $checkbox.closest('dict').attr('data-dictkey');
                        var tmpArr = data[field].where('o => o.itemType=="{0}"'.format(itemtype)).select('o => o.key=o.itemKey,o');
                        $checkbox.closest('dict').dictSelect(tmpArr);
                    }
                    return;
                    
                    /*value = [];     //value类型改变成arr
                     $checkbox.filter(':checked').each(function () {  //字段为分析意见项目
                     value.push({
                     itemType: dictName,
                     itemDictType: dictCode,
                     itemKey: $(this).val()
                     });
                     });
                     return value;*/
                }
                if($ulImg.length) {     //为图片的时候
                    if(field == 'bigfield') {
                        if($this.attr('data-pictype') == '1' || $this.attr('data-pictype') == '2') {
                            var d = data.where('o => (o.pictureType == "1" || o.pictureType == "2")');
                        } else {
                            var d = data.where('o => o.pictureType=="{0}"'.format($this.attr('data-pictype')))
                        }
                        d.each(function (item) {
                            var liDIV = $compile('#add-scene-xctp-div', item);
                            var $liDIV = $(liDIV);
                            $liDIV.data('picInfo', item); //.previewBox();   //吧数据存储到div标签上
                            $this.find('.type-in-label-ms span').text(parseInt($this.find('.type-in-label-ms span').text()) + 1);
                            $ulImg.append($liDIV);
                        });
                        $ulImg.unslick().slick({
                            dots: true,
                            dotsClass: 'slick-pagination',
                            infinite: false,
                            arrows: true,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
                            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
                        });
                    }
                    return;
                }
                if($ul.length != 0) {
                    if(field == 'bigfield') {
                        // var $xct = $('#add-scene-xct-ul');
                        if(bigField == 'scenePicture') {    //现场图照片渲染
                            data.each(function (item) {
                                var li = $compile('#add-scene-xct-li', item);
                                var $li = $(li);
                                $li.data('picInfo', item);   //.previewBox();   //吧数据存储到li标签上
                                $ul.append($li);
                            });
                        } else if(bigField == 'sceneCollectedGoods') { //提取物品渲染
                            data.each(function (item) {
                                addScene.tqwpAdd(item);
                            });
                        }
                    }
                    return;
                }
            }
            if(tagName == 'TABLE') {    //如果含有form-field的标签是table
                if(field == 'sceneOffender') {
                    if($this.attr('data-index') == '1') {   //报案人/被害人 表格渲染数据
                        data[field].each(function (item) {
                            var $tr = $($compile('#bar-bhr-tr-tp',{id:item.id, arr:localData.get('aqxx-peopletype')}));
                            $tr.find('td').each(function () {
                                var key = $(this).attr('data-key');
                                $(this).children().val(item[key]);
                            });
                            $this.find('tbody').append($tr);
                        });
                    } else {    //见证人 表格渲染数据
                        data[field].each(function (item, i) {
                            item.index = i+1;
                            var $tr = $($compile('#kyqk-jzr-tr', item));
                            $tr.find('select').val(item.gender);
                            $this.find('tbody').append($tr);
                        });
                    }
                } else if(field == 'sceneInvestigator') {   //勘验人员
                    //勘验人员数组 表格
                    var tmpArr = data[field].where('o => o.duty != "1"');
                    //需要选中的勘验人员数
                    var sltArr = tmpArr.select('o => {key: o.investigatorId, value: o.investigatorName}');
                    $this.closest('div').prev().children('dict').dictSelect(sltArr, true);
                    $('#ckxx-kyryzz tbody').children().remove();
                    var arr = [];   //存储人员责任的key
                    var tepArr = [];    //存储template的数组
                    $('#ckxx-kyryzz').find('thead th').each(function () {
                        var key = $(this).attr('data-key');
                        if(key) {
                            tepArr.push({active: 0, key: key});
                            arr.push(key);
                        }
                    });
                    tmpArr.each(function (item) { //添加到table上的项
                        var tepArrClone = JSON.clone(tepArr);
                        var duty = item.duty.replace(/ /g, ''); //责任代码
                        var name = item.investigatorName; //勘验人员名字
                        duty.split(',').each(function (v) {
                            var index = arr.indexOf(v);
                            if(index != -1){
                                tepArrClone[index].active = 1;
                            }
                        });
                        var tr = $compile('#ckxx-kyryzz-tbody-tp', {id: item.investigatorId, name: name, arr: tepArrClone});
                        $('#ckxx-kyryzz tbody').append(tr);
                    });
                } else if(field == 'sceneLostGoods') {  //勘验情况-损失物品表格 渲染数据
                    data[field].each(function (item) {
                        var index = $('#kyqk-sswp tbody').find('tr:first td:first').text();
                        index = index? parseInt(index)+1: 1;
                        var $tr = $($compile('#kyqk-sswp-tr', {index: index, id:item.id||''}));
                        $tr.find('td').each(function () {
                            var key = $(this).attr('data-key');
                            $(this).children('input').val(item[key]);
                        });
                        $('#kyqk-sswp tbody').append($tr);
                    });
                } else if(field == 'sceneCrimeTools') {     //作案工具
                    data[field].each(function (item) {
                        var $tbody =  $('[data-field="sceneCrimeTools"] tbody');
                        var index = $tbody.find('tr:first td:first').text() || 1;
                        var obj = {
                            id:item.id,
                            index: index,
                            gjlb: localData.get('fxyj-gjlb'),
                            gjly: localData.get('fxyj-gjly')
                        };
                        var $tr = $($compile('#fxyj-zagj-tr', obj));
                        $tr.find('td').each(function () {
                            var key = $(this).attr('data-key');
                            $(this).children().val(item[key]);
                        });
                        $tbody.append($tr);
                    });
                } else if(field == 'cameraInfo') {  //摄像头打点
                    $('#dzwz-camera-table').data('tableData', data[field]);
                    data[field].each(function (item, i) {
                        var obj = {
                            $rownum: i+1,
                            cameraTypeDict: item.cameraTypeCn,
                            longitude: item.longitude,
                            latitude: item.latitude,
                            cameraOrientationDict: item.cameraOrientationCn,
                            uuid: item.id,
                            attachmentId: item.attachmentId,
                            cameraName: item.cameraName,
                        };
                        cameraInfo.push(obj);
                        var tr = $compile('#hjwz-camera-tbody-tp', obj);
                        $('#dzwz-camera-table tbody').append(tr);
                    });
                    //摄像头打点em数量修改
                    $('.hjwz-tabs[param="dzwz"]').children('[param="camera"]').find('em').text(data[field].length);
                    //摄像头打点 页面table初始化
                    $('#camera-result-tb').children('tbody').template(cameraInfo);
                } else if(field == 'baseStationInfo'){ //基站 WiFi
                    var jz = [], wifi = [];
                    data[field].each(function(item ,i){
                        var obj = {
                            id:item.id,
                            category: item.category,
                            fileName: item.fileName
                        };
                        if(obj.fileName.indexOf('WIFI') > -1){
                            //wifi
                            wifi.push(obj);
                        }else{
                            //基站
                            if(obj.fileName == 'data.xml'){
                                //静态
                                obj.fileTypeTxt = '静态';
                            }else{
                                //动态
                                obj.fileTypeTxt = '动态';
                            }
                            jz.push(obj);
                        }
                    });

                    //tableData
                    $('#dzwz-jz-table').data('tableData', jz);
                    $('#dzwz-wifi-table').data('tableData', wifi);
                    //table template
                    $('#dzwz-jz-table').children('tbody').template(jz);
                    $('#dzwz-wifi-table').children('tbody').template(wifi);
                    //em 数量更新
                    $('.hjwz-tabs[param="dzwz"]').children('[param="jz"]').find('em').text(jz.length);
                    $('.hjwz-tabs[param="dzwz"]').children('[param="wifi"]').find('em').text(wifi.length);
                } else if(field == 'bigfield') {    //大模块 尸体信息
                    data.each(function (item) {
                        var $tbody = $('#add-scene-stxx tbody');
                        var index = $tbody.find('tr:first td:first').text() || 1;
                        var obj = {
                            index: index,
                            name: item.name,
                            sex: item.sex.asSex()
                        };
                        var tr = $compile('#add-scene-stxx-tr', obj);
                        var $tr = $(tr).data('trData', item);
                        $tbody.append($tr);
                    });
                }
            }
        });
    };

    //获取现场图新增信息
    window.getxctinfo = function ($ele) {
        var obj = {category: "1"};   //需要提交表单的对象
        $ele.find('.form-field').each(function () {
            var field = $(this).attr('data-field');
            var value = getFormVal($(this));
            obj[field] = value;
        });
        obj.pictureTypeDict = 'XCTZLDM';
        obj.description = '';
        return obj;
    }
    //获取现场照片新增信息
    window.getxczpinfo = function ($ele) {
        var obj = {category: "2"};   //需要提交表单的对象
        $ele.find('.form-field').each(function () {
            var field = $(this).attr('data-field');
            var value = getFormVal($(this));
            if(field == 'pictureType') {
                obj.pictureTypeCn = $(this).find('input[type="hidden"]').attr('data-chval');
            }
            obj[field] = value;
        });
        obj.pictureTypeDict = 'XCZPZLDM';
        return obj;
    }
    // 事件注册
    addScene.regEvent = function () {
        //编辑页面--右上角编辑按钮
        $('body').on('click', '.mcb-header .edit', function () {
            var $this = $(this);
            $this.closest('.mcb-header').next().find('.over-div').hide();
            $this.hide();
            $this.next('.save').show();
            var $mainContentBlock = $this.closest('.main-content-block');
            if($mainContentBlock.attr('data-bigfield') == 'sceneAnalysisSuggestion') {
                var obj = addScene.getFormAll($mainContentBlock);
                $mainContentBlock.data('info', obj);
            }
        });
        //编辑页面--右上角保存按钮
        $('body').on('click', '.mcb-header .save', function () {
            var $this = $(this);
            var $mainContentBlock = $this.closest('.main-content-block');
            var param = addScene.getFormAll($mainContentBlock);
            var module = $mainContentBlock.attr('data-bigfield');
            /*var category = 1;
            if(module == 'scenePhoto') {
                category = 2;
            }*/
            if(module == 'sceneHandleInfo') {
                var tmpArr = addScene.updateSceneInvestigator(param);
                param.sceneHandleInfo.sceneInvestigator = tmpArr;
            } else if(module == 'scenePhoto') {
                module = 'scenePicture';
                param[module] = param['scenePhoto'];
                delete param.scenePhoto;
            } else if(module == 'sceneAnalysisSuggestion') {
                var beforeData = $mainContentBlock.data('info');
                var afterData = addScene.getFormAll($mainContentBlock);
                var sceneAnalysisItem = addScene.fxyjCompare(beforeData, afterData);
                param.sceneAnalysisSuggestion.sceneAnalysisItem = sceneAnalysisItem;
            }
            var obj = {
                sceneInvestigationDispatch: 'dispatch',
                sceneHandleInfo: 'outInvestigation',
                sceneCondition: 'condition',
                scenePicture: 'picture',
                // scenePhoto: 'picture',
                materialEvidence: 'materialEvidence',
                sceneCollectedGoods: 'collectedGoods',
                sceneInvestigation: 'investigation',
                sceneAnalysisSuggestion: 'analysisSuggestion',
                sceneBodyBasic: 'bodyBasics',
            };
            investigationId && (param[module].investigationId = investigationId);
            var act = makeAct('sceneCollecting/sceneInfo/{0}/upd'.format(obj[module]));
            $post(act, param, function () {
                toast('修改成功');
                if(module == 'sceneHandleInfo') {
                    var act = makeAct('sceneCollecting/sceneInfo/outInvestigation');
                    $get(act+'/'+investigationId, {}, function (res) {
                        var obj = res.data;
                        sceneInvestigator = obj.sceneHandleInfo.sceneInvestigator;
                    },false);
                }
                /*var act = makeAct('sceneCollecting/sceneInfo/{0}/{1}'.format(obj[module], investigationId));
                if(module == 'scenePicture') {
                    act = makeAct('sceneCollecting/sceneInfo/{0}/{1}/{2}'.format(obj[module], investigationId, category));
                }
                $get(act, {}, function (res) {
                    var obj = res.data;
                    obj.sceneInvestigationDispatch && (obj.sceneInvestigationDispatch.caseTypeCn = decodeURIComponent(urlObj.caseType));
                    obj.sceneInvestigationDispatch && (obj.sceneInvestigationDispatch.caseNatureCn = decodeURIComponent(urlObj.caseNature));
                    $mainContentBlock.attr('data-pid', obj.id);
                    fillData($mainContentBlock, obj);
                },false);*/

                $this.closest('.mcb-header').next().children('.over-div').show();
                $this.hide();
                $this.prev('.edit').show();
            });
        });
        /*---------------------------出勘信息事件注册 start---------------------------------*/
        //指挥人员点击事件
        $('.main-content').on('click', '#add-scene-ckxx #ckxx-zhry li', function () {
            var $this = $(this);
            $this.toggleClass('active');
        });
        //勘验人员点击事件 写在字典的回调里面
        //勘验人员责任表格的点击事件
        $('.main-content').on('click', '#add-scene-ckxx #ckxx-kyryzz tr td', function () {
            var $this = $(this);
            var $index = $this.index();
            var $zhukanIndex = $('#ckxx-kyryzz th').filter('[data-key="2"]').index();   //主堪的列的index
            var $fukanIndex = $('#ckxx-kyryzz th').filter('[data-key="11"]').index();   //辅勘的列的index
            var maxLength = $('#ckxx-kyryzz th').length;
            if($index==0 || $index==maxLength) return;
            if($('#ckxx-kyryzz th').eq($index).attr('data-key') == 2) { //2代表主堪
                if(!$this.find('span').hasClass('active')) {
                    $('#ckxx-kyryzz tbody tr').find('td:eq({0})'.format($index)).children().removeClass('active');
                    $this.closest('tr').find('td:eq({0})'.format($fukanIndex)).children().removeClass('active');
                    $this.find('span').addClass('active');
                } else {
                    $this.find('span').removeClass('active');
                }
            } else if($('#ckxx-kyryzz th').eq($index).attr('data-key') == 11) {  //11代表辅勘
                if(!$this.find('span').hasClass('active')) {
                    $this.closest('tr').find('td:eq({0})'.format($zhukanIndex)).children().removeClass('active');
                    $this.find('span').addClass('active');
                } else {
                    $this.find('span').removeClass('active');
                }
            } else {
                $this.find('span').toggleClass('active');
            }
        });
        //勘验人员责任表格的删除x
        $('.main-content').on('click', '#add-scene-ckxx #ckxx-kyryzz .icon-remove', function () {
            var $this = $(this);
            var $tr = $this.closest('tr');
            var $hiddenInput = $('#kyry-dict').find('input[type="hidden"]');
            var id = $tr.attr('data-key');
            var $selectCheckbox = $('#kyry-dict').find('input:checkbox[value="{0}"]'.format(id));   //对应被选中的人员checkbox
            if($selectCheckbox.length > 0) {
                var $selectId = $('#kyry-dict').find('label[for="{0}"]'.format($selectCheckbox.prop('id')));
                $selectId.trigger('click');
            } else {
                var name = $tr.find('td:eq(0)').text();
                var idArr = $hiddenInput.val().split(',');
                var nameArr = $hiddenInput.attr('data-chval').split(',');
                idArr.splice(idArr.indexOf(id), 1);
                nameArr.splice(nameArr.indexOf(name), 1);
                $hiddenInput.val(idArr.join(','));
                $hiddenInput.attr('data-chval', idArr.join(','));
            }
        });
        //指挥人员配置常用项
        $('.main-content').on('click', '#add-scene-ckxx .zxry-setting', function () {
            var $this = $(this);
            $this.webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?type=zhry&dictTitle=指挥人员&linkId='+$this.attr('id')}));
        });
        //勘验人员配置常用项
        $('.main-content').on('click', '#add-scene-ckxx .kyry-setting',function () {
            var $this = $(this);
            $this.webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?type=kcz&dictTitle=勘验人员&linkId='+$this.attr('id')}));
            // $(this).webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?dictType='+dictRoot}));
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------现场条件事件注册 start---------------------------------*/
        $('.main-content').on('click', '#add-scene-xctj .type-in-group ul li', function () {
            var $this = $(this);
            $this.toggleClass('active');
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------现场图事件注册 start---------------------------------*/
        //新增现场图+
        $('.main-content').on('click', '#add-scene-xct .add-pic', function (e) {
            var picLength = $('#add-scene-xct-ul').find('li').length;
            $('#xct-add').find('input:text').val('');    //清空文本框内的数据
            $('#xct-add').find('.xh input').val(picLength);
            $('#xct-add').find('input:radio').eq(0).prop('checked', true);
            // $('#xct-add').find('input[type="hidden"]').val('').attr('data-chval','');
            $('#xct-add').attr('data-flag', 'add');
            // $('#xct-add').removeAttr('data-index');
            alertWindow = $open('#xct-add', {title: '现场图新增', width: 800});
        });
        //现场图新增/修改页面的上传
        $('body').on('change', '#xct-add #xct-add-pic', function () {
            var _this = this;
            // var file = this.files[0];
            var $this = $(this);
            addScene.uploadImg(_this, function (res) {
                res.data && $this.prevAll('input:text').val(res.data.fileNameRemote);
                _this.outerHTML=_this.outerHTML;
            });
        });
        //现场图新增/修改页面 保存
        $('body').on('click', '#xct-add .save', function (e, isClose) {
            var $this = $(this);
            var flag = $('#xct-add').attr('data-flag'); //flag: add  ||  edit
            var obj = getxctinfo($this.closest('.mcb-form'));
            $('.xct-add-validate').validatebox();
            if($('.validatebox-invalid').length){
                return false;
            }
            obj.pictureTypeCn = $('#xct-add #pictureType').attr('data-chval');
            /*{category: "1"};   //需要提交表单的对象
            $this.closest('.mcb-form').find('.form-field').each(function () {
                var field = $(this).attr('data-field');
                var value = getFormVal($(this));
                obj[field] = value;
            });
            obj.pictureType = 'XCTZLDM';
            obj.description = '';*/
            obj.id = $('#xct-add').attr('data-id') || '';
            var li = $compile('#add-scene-xct-li', obj);
            var $li = $(li);
            delete obj.name;
            investigationId && (obj.investigationId=investigationId);
            $li.data('picInfo', obj);   //吧数据存储到li标签上
            if(flag == 'add') {         //新增的情况
                $li.find('img').previewBox();
                $('#add-scene-xct-ul li').eq(0).after($li);
            } else if(flag == 'edit') {     //编辑的情况
                var index = parseInt($('#xct-add').find('.xh input').val());
                $('#add-scene-xct-ul li').eq(index).before($li);
                $('#add-scene-xct-ul li').eq(index+1).remove();
            }
            if(isClose != 'notClose') {
                alertWindow.$close();
            }
            removeMd5Input();
        });
        //现场图 图片上面的编辑按钮
        $('.main-content').on('click', '#add-scene-xct .icon-edit', function () {
            var $this = $(this);
            var index = $this.closest('li').index();
            var data = $this.closest('li').data('picInfo');
            $('#xct-add').attr('data-id', data.id||'');
            $('#xct-add').attr('data-flag', 'edit');
            $('#xct-add').find('.xh input').val(index);
            $("#xct-add .form-field").each(function () {
                var $this = $(this);
                var key = $this.attr('data-field');
                $this.find('input:text').eq(0).val(data[key] || '');
                $this.find('textarea').val(data[key] || '');
                $this.find('dict').dictSelect(data[key]);
                $this.find('input[type="hidden"]').val(data[key]||'');
            });
            alertWindow = $open('#xct-add', {title: '现场图修改', width: 800});
        });
        //现场图新增/修改页面  保存并新增
        $('body').on('click', '#xct-add .save-add', function () {
            $(this).prevAll('.save').trigger('click', 'notClose');
            var picLength = $('#add-scene-xct-ul').find('li').length;
            $('#xct-add').find('input:text').val('');
            $('#xct-add').find('.xh input').val(picLength);
            $('#xct-add').find('input:radio').eq(0).trigger('click');
        });
        //现场图新增/修改页面  取消
        $('body').on('click', '#xct-add .cancel', function () {
            alertWindow.$close();
            removeMd5Input();
        });
        //现场图删除
        $('.main-content').on('click', '#add-scene-xct .icon-remove', function () {
            var $this = $(this);
            //存储需要删除的id到UL的delId上
            var $li = $this.closest('li');
            var $ul = $this.closest('ul')
            var id = $li.data('picInfo').id;
            $ul.data('delId') || $ul.data('delId', []);
            var delId = $ul.data('delId');
            id && delId.push(id);
            $ul.data('delId', delId);
            $li.remove();
        });
        //现场图更多
        $('.main-content').on('click', '#add-scene-xct .pic-more', function () {
            $(this).closest('.mcb-form').find('ul').removeClass('h180');
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------现场照片事件注册 start---------------------------------*/
        //现场图片的新增 +按钮
        $('.main-content').on('click', '#add-scene-xczp .add-pic', function () {
            var $this = $(this);
            var picLength = $(this).closest('.form-field').find('.ul-img .slick-slide').filter(':not(".slick-list")').length;
            var type = $this.closest('.form-field').attr('data-pictype');
            $('#xctp-add').removeAttr('data-id');
            $('#xctp-add').find('.xh input').val(picLength+1);
            $('#xctp-add').find('input:text').val('');
            $('#xctp-add').attr('data-flag', 'add');
            $('#xctp-add').find('input:radio[value="{0}"]'.format(type)).eq(0).trigger('click')
            alertWindow = $open('#xctp-add', {title: '现场照片新增', width: 800});
        });
        //现场图片上传
        $('body').on('change', '#xctp-add #xczp-add-pic', function () {
            var _this = this;
            // var file = this.files[0];
            var $this = $(this);
            addScene.uploadImg(_this, function (res) {
                res.data && $this.prevAll('input:text').val(res.data.fileNameRemote);
                _this.outerHTML=_this.outerHTML;
            });
        });
        //现场图片的 保存
        $('body').on('click', '#xctp-add .save', function (e, isClose) {
            var $this = $(this);
            var flag = $('#xctp-add').attr('data-flag'); //flag: add  ||  edit
            var obj = getxczpinfo($this.closest('.mcb-form'))/*{category: "2"};   //需要提交表单的对象
            $this.closest('.mcb-form').find('.form-field').each(function () {
                var field = $(this).attr('data-field');
                var value = getFormVal($(this));
                if(field == 'pictureType') {
                    obj.pictureTypeCn = $(this).find('input[type="hidden"]').attr('data-chval');
                }
                obj[field] = value;
            });
            obj.pictureTypeDict = 'XCZPZLDM';*/
            obj.id = $('#xctp-add').attr('data-id')||'';
            var liDIV = $compile('#add-scene-xctp-div', obj);
            var $liDIV = $(liDIV);
            investigationId && (obj.investigationId=investigationId);
            $liDIV.data('picInfo', obj);   //吧数据存储到li标签上
            var type = obj.pictureType;
            if(type == 2) {
                type=1; //方位和概貌都为1
            }
            var $ulImg = $('#add-scene-xczp').find('.form-field[data-pictype="{0}"]'.format(type)).find('.ul-img');
            if(flag == 'add') {         //新增的情况
                //$liDIV.find('img').previewBox();
                $ulImg.prepend($liDIV);
                var num = $ulImg.closest('.form-field').find('.type-in-label-ms span').text();
                $ulImg.closest('.form-field').find('.type-in-label-ms span').text(parseInt(num)+1);
                $ulImg.unslick().slick({
                    dots: true,
                    dotsClass: 'slick-pagination',
                    infinite: false,
                    arrows: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
                    nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
                });
            } else if(flag == 'edit') {     //编辑的情况
                var $xctpAdd = $('#xctp-add');
                var $editdiv = $xctpAdd.data('pic');
                var editdivinfo = $editdiv.data('picInfo');
                var oldType = editdivinfo.pictureType;  //图片未改变类型的type
                $.extend(editdivinfo, obj);
                var type = editdivinfo.pictureType; //图片改变类型的type
                type=="2" ? type=="1":type;
                $editdiv.data('picInfo', editdivinfo);  //更新原来的数据
                var $slickTrack = $('#add-scene-xczp').find('[data-pictype="{0}"] .slick-track'.format(type))
                $slickTrack.prepend($editdiv);
                $('#add-scene-xczp').find('.ul-img').unslick().slick({
                    dots: true,
                    dotsClass: 'slick-pagination',
                    infinite: false,
                    arrows: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
                    nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
                });
                var $span = $('#add-scene-xczp').find('[data-pictype="{0}"] .type-in-label-ms span'.format(type));
                $span.text(parseInt($span.text()) + 1);
                oldType=="2" ? oldType=="1":oldType;
                var $spanOld = $('#add-scene-xczp').find('[data-pictype="{0}"] .type-in-label-ms span'.format(oldType));
                $spanOld.text(parseInt($spanOld.text()) - 1);
                // console.log();
                // var index = parseInt($('#xct-add').find('.xh input').val());
                // $('#add-scene-xct-ul li').eq(index).before($li);
                // $('#add-scene-xct-ul li').eq(index+1).remove();
            }
            if(isClose != 'notClose') {
                alertWindow.$close();
            }
            removeMd5Input();
        });
        //现场图片的 保存并新增
        $('body').on('click', '#xctp-add .save-add', function () {
            $('#xctp-add .save').trigger('click', 'notClose');
            $('#xctp-add').find('input:text, textarea').val('');
            var type = $('#xctp-add').find('dict input[type="hidden"]').val();
            var num = $('#add-scene-xczp').find('.form-field[data-pictype="{0}"]'.format(type)).find('.slick-slide').filter(':not(".slick-list")').length;
            $('#xctp-add').find('.xh input').val(num + 1);
        });
        //现场图片的 取消
        $('body').on('click', '#xctp-add .cancel', function () {
            alertWindow.$close();
            removeMd5Input();
        });
        //现场图片修改
        $('.main-content').on('click', '#add-scene-xczp .pic-edit', function () {
            var $this = $(this);
            var $slick = $this.closest('.slick-slide');
            var data = $slick.data('picInfo');
            var index = $slick.index();
            var $xctpAdd = $('#xctp-add');
            $xctpAdd.data('pic', $slick);
            $xctpAdd.attr('data-id', data.id);
            $xctpAdd.attr('data-flag', 'edit');
            $xctpAdd.find('.xh input').val(index+1);
            $xctpAdd.find('.form-field[data-field="attachmentId"] input:text').val(data.attachmentId);
            $xctpAdd.find('.form-field[data-field="pictureType"] dict').dictSelect(data.pictureType);
            $xctpAdd.find('.form-field[data-field="description"] input:text').val(data.description);
            alertWindow = $open('#xctp-add', {title: '现场照片修改', width: 800});
        });
        //现场图片删除
        $('.main-content').on('click', '#add-scene-xczp .pic-remove', function () {
            var $this = $(this);
            //存储需要删除的id到UL的delId上
            var $lidiv = $this.closest('.slick-slide');
            var $uldiv = $this.closest('.ul-img')
            var id = $lidiv.data('picInfo').id;
            $uldiv.data('delId') || $uldiv.data('delId', []);
            var delId = $uldiv.data('delId');
            id && delId.push(id);
            $uldiv.data('delId', delId);
            var num = parseInt($this.closest('.form-field').find('.type-in-label-ms span').text())-1;
            $this.closest('.form-field').find('.type-in-label-ms span').text(num);
            $this.closest('.slick-slide').remove();
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------痕迹物证事件注册 start---------------------------------*/

        /*------------------------------ end ---------------------------------*/

        /*---------------------------提取物品事件注册 start---------------------------------*/
        //点击添加
        $('.main-content').on('click', '#add-scene-tqwp .add-pic', function () {
            var picLength = $('#add-scene-tqwp').find('li').length;
            $('#tqwp-add').find('input:text, textarea').val('');    //清空文本框内的数据
            $('#tqwp-add').find('.xh input').val(picLength);
            $('#tqwp-add').attr('data-flag', 'add');
            $('#tqwp-add').removeAttr('data-index');
            $('#tqwp-add').removeAttr('data-imgid');
            alertWindow = $open('#tqwp-add', {title: '添加提取物品', width: '60%'});
        });
        //点击删除
        $('.main-content').on('click', '#add-scene-tqwp .remove-pic', function () {
            $('#add-scene-tqwp').find('tbody tr input:checkbox').each(function () {
                var $tr = $(this).closest('tr')
                if(this.checked == true) {
                    var index = $tr.index();    //获取被选中那行的下标
                    $tr.remove();
                    $('#add-scene-tqwp').find('li').eq(index+1).remove();
                }
            });
            //表格序号重新排序
            $('#add-scene-tqwp').find('tbody tr').each(function (i) {
                $(this).find('td').eq(1).html(i+1);
            });
        });
        //表格头上面的checkbox
        $('.main-content').on('change', '#add-scene-tqwp thead input:checkbox', function () {
            var pthis = this.checked;
            $(this).closest('table').find('tbody input:checkbox').each(function () {
                this.checked = pthis;
            });
        });
        //表格 tbody上面的checkbox
        $('.main-content').on('change', '#add-scene-tqwp tbody input:checkbox', function () {
            var flag = 0;   //为选中条数
            var $this = $(this);
            var $checkbox = $this.closest('tbody').find('input:checkbox');  //tbody上的所有checkbox
            var theadCheckbox = $this.closest('table').find('thead input:checkbox').get(0); //thead上的checkbox
            var length = $checkbox.length;
            $checkbox.each(function () {
                if(this.checked == true) {
                    flag += 1;
                }
            });
            if(length == flag) {
                theadCheckbox.checked = true;
            } else {
                theadCheckbox.checked = false;
            }
        });
        //添加/修改弹出框中的多选框
        $('body').on('click', '#tqwp-add ul li', function () {
            $(this).toggleClass('active');
        });
        //添加弹出框中的上传图片
        $('body').on('change', '#tqwp-add #tqwp-add-pic', function () {
            var _this = this;
            // var file = this.files[0];
            var $this = $(this);
            addScene.uploadImg(_this, function (res) {
                res.data && $this.prevAll('input:text').val(res.data.fileNameRemote);
                _this.outerHTML=_this.outerHTML;
            });
        });
        //添加/修改弹出框的 取消按钮
        $('body').on('click', '#tqwp-add .cancel', function () {
            alertWindow.$close();
            removeMd5Input();
        });
        //添加/修改弹出框的 保存按钮
        $('body').on('click', '#tqwp-add .save', function (e, isClose) {
            var $this = $(this);
            var flag = $('#tqwp-add').attr('data-flag'); //flag: add  ||  edit
            if(flag == 'add') {         //新增的情况
                var obj = {};   //需要提交表单的对象
                $this.closest('.mcb-form').find('.form-field').each(function () {
                    var $text = $(this).find('input:text');
                    // var $hidden = $(this).find('input[type="hidden"]');
                    var $textarea = $(this).find('textarea');
                    var $ul = $(this).find('ul');
                    var field = $(this).attr('data-field');
                    if($ul.length != 0) {
                        obj[field] = [];
                        $ul.find('li.active').each(function () {
                            obj[field] = obj[field].concat({collectedType: "2",collectedPersonId: $(this).attr('data-key'),collectedPerson: $(this).text()})
                        });
                    } else if($text.length != 0 || $textarea.length != 0){
                        obj[field] = $text.val() || $textarea.val();
                    }
                    if(field == 'fileMd5') {
                        obj[field] = $(this).val();
                    }
                });
                obj.id = $('#tqwp-add').attr('data-id') || '';
                addScene.tqwpAdd(obj);
                /*var obj = {};   //需要提交表单的对象
                 $this.closest('.mcb-form').find('.form-field').each(function () {
                 var $text = $(this).find('input:text');
                 var $textarea = $(this).find('textarea');
                 var $ul = $(this).find('ul');
                 var field = $(this).attr('data-field');
                 if($ul.length != 0) {
                 obj[field] = [];
                 $ul.find('li.active').each(function () {
                 obj[field] = obj[field].concat({collectedType: 2,collectedPersonId: $(this).attr('data-key'),collectedPerson: $(this).text()})
                 });
                 } else {
                 obj[field] = $text.val() || $textarea.val();
                 }
                 });
                 var data = str2obj(obj2str(obj));   //复制对象
                 var tqr = [];
                 data.imgid = 'img'+new Date().getTime();
                 data.sceneCollectedPerson.each(function (item) {
                 tqr.push(item.collectedPerson);
                 });
                 data.tqr = tqr.join('、');
                 var li = $compile($('#add-scene-tqwp-img').html(), data);
                 var $li = $(li);
                 $li.find('img').data('picInfo', obj);   //吧数据存储到img标签上
                 $('#add-scene-tqwp ul').append($li);
                 data.index = $('#add-scene-tqwp ul li').length - 1;
                 var tr = $compile($('#add-scene-tqwp-tr').html(), data);
                 $('#add-scene-tqwp tbody').append(tr);*/
            } else if(flag == 'edit') {     //编辑的情况
                var imgid = $('#tqwp-add').attr('data-imgid');  //图片数据id
                var index = parseInt($('#tqwp-add').attr('data-index'));   //获取编辑图片的下标
                var obj = {};   //需要提交表单的对象
                $this.closest('.mcb-form').find('.form-field').each(function () {
                    var $text = $(this).find('input:text');
                    // var $hidden = $(this).find('input[type="hidden"]');
                    var $textarea = $(this).find('textarea');
                    var $ul = $(this).find('ul');
                    var field = $(this).attr('data-field');
                    if($ul.length != 0) {
                        obj[field] = [];
                        $ul.find('li.active').each(function () {
                            obj[field] = obj[field].concat({collectedType: "2",collectedPersonId: $(this).attr('data-key'),collectedPerson: $(this).text()})
                        });
                    } else if($text.length != 0 || $textarea.length != 0){
                        obj[field] = $text.val() || $textarea.val();
                    }
                    if(field == 'fileMd5') {
                        obj[field] = $(this).val();
                    }
                });
                var tqr = [];   //提取人
                obj.sceneCollectedPerson.each(function (item) {
                    tqr.push(item.collectedPerson);
                });
                var $editLi = $('#add-scene-tqwp').find('li[data-imgid="{0}"]'.format(imgid));
                var $editTr = $('#add-scene-tqwp').find('tbody tr[data-imgid="{0}"]'.format(imgid));
                obj.id = $('#tqwp-add').attr('data-id') || '';
                $editLi.data('picInfo', obj);   //li标签上面的data重新赋值
                $editLi.find('p').text(obj.name);   //该图片的name重新渲染
                $editTr.find('td').eq(2).html(obj.name); //图片在表格内对应的那条数据进行重新渲染
                $editTr.find('td').eq(3).html(obj.collectedPosition);
                $editTr.find('td').eq(4).html(obj.amount);
                $editTr.find('td').eq(5).html(tqr.join('、'));
                $editTr.find('td').eq(6).html(obj.collectedTime);
            }
            if(isClose != 'notClose') {
                alertWindow.$close();
            }
            removeMd5Input();
        });
        //添加/修改弹出框的 保存并新增按钮
        $('body').on('click', '#tqwp-add .save-add', function () {
            $(this).prevAll('.save').trigger('click', 'notClose');
            $('#tqwp-add').find('input:text, textarea').val('');
            $('#tqwp-add').find('li').removeClass('active');
        });
        //图片上的删除
        $('.main-content').on('click', '#add-scene-tqwp li .icon-remove', function () {
            var $this = $(this);
            //存储需要删除的id到UL的delId上
            var $li = $this.closest('li');
            var $ul = $this.closest('ul')
            var id = $li.data('picInfo').id;
            $ul.data('delId') || $ul.data('delId', []);
            var delId = $ul.data('delId');
            id && delId.push(id);
            $ul.data('delId', delId);
            var index = $li.index()-1;
            $li.remove();
            $('#add-scene-tqwp').find('tbody tr').eq(index).remove();
            $('#add-scene-tqwp').find('tbody tr').each(function (i) {    //使表格的序号 重新排序
                $(this).find('td:nth-child(2)').html(i+1);
            });
        });
        //表格中的删除
        $('.main-content').on('click', '#add-scene-tqwp tbody tr .icon-remove', function () {
            var $this = $(this);
            var $tr = $this.closest('tr');
            var index = $tr.index()+1;
            $tr.remove();
            $('#add-scene-tqwp').find('tbody tr').each(function (i) {    //使表格的序号 重新排序
                $(this).find('td:nth-child(2)').html(i+1);
            });
            $('#add-scene-tqwp').find('li').eq(index).remove();
        });
        //图片上的编辑
        $('.main-content').on('click', '#add-scene-tqwp li .icon-edit', function () {
            var $this = $(this);
            var index = $this.closest('li').index();  //编辑的图片下标
            var imgid = $this.closest('li').attr('data-imgid');
            var data = $this.closest('li').data('picInfo');
            $('#tqwp-add').attr('data-id', data.id||'');
            $('#tqwp-add').attr('data-imgid', imgid);
            $('#tqwp-add .xh input:text').val(index);
            $("#tqwp-add .form-field").each(function () {
                var $this = $(this);
                var key = $this.attr('data-field');
                $this.find('input').eq(0).val(data[key] || '');
                $this.find('textarea').val(data[key] || '');
            });
            $("#tqwp-add .form-field li").removeClass('active');    //先清除所有选中
            data.sceneCollectedPerson.each(function (item) {
                $("#tqwp-add .form-field").find('li[data-key="{0}"]'.format(item.collectedPersonId)).addClass('active');
            });
            $('#tqwp-add').attr('data-flag', 'edit');
            $('#tqwp-add').attr('data-index', index);
            alertWindow = $open('#tqwp-add',{title: '修改提取物品', width: '60%'});
        });
        //表格上的编辑
        $('.main-content').on('click', '#add-scene-tqwp tbody tr .icon-edit', function () {
            // var index = $(this).closest('tr').index();
            var imgid = $(this).closest('tr').attr('data-imgid');
            $('#add-scene-tqwp').find('li[data-imgid="{0}"]'.format(imgid)).find('.icon-edit').trigger('click');
        });
        //更多
        $('.main-content').on('click', '#add-scene-xct .pic-more', function () {
            $(this).closest('.mcb-form').find('ul').removeClass('h180');
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------勘验情况事件注册 start---------------------------------*/
        //损失物品的添加
        $('.main-content').on('click', '#add-scene-kyqk .kyqk-sswp-add', function () {
            var $this = $(this);
            var $tbody = $this.nextAll('table').find('tbody');
            var lastIndex = parseInt($tbody.find('tr:last td:first').text());
            var tr = $compile($('#kyqk-sswp-tr').html(), {index: lastIndex ? lastIndex + 1 : 1});
            $tbody.append(tr);
        });
        //损失物品总价值计算
        $('.main-content').on('blur', '#add-scene-kyqk #kyqk-sswp .lost-price', function() {
            var $tr = $(this).closest('tbody').find('tr');
            var sum = 0;
            $tr.each(function () {
                sum += parseFloat($(this).find('.lost-price').val());
            });
            $(this).closest('table').find('tfoot input').val(sum);
        });
        //损失物品/见证人 的删除 x
        $('.main-content').on('click', '#add-scene-kyqk .icon-remove, .remove-people', function () {
            var $this = $(this);
            //存储需要删除的id到table的delId上
            var $tr = $this.closest('tr');
            var id = $tr.attr('data-id');
            $this.closest('table').data('delId') || $this.closest('table').data('delId', []);
            var delId = $this.closest('table').data('delId');
            id && delId.push(id);
            $this.closest('table').data('delId', delId);
            if($this.hasClass('icon-remove')) {
                var value = $tr.find('td:eq(4) input').val();
                var $input = $this.closest('table').find('tfoot input');
                $input.val(parseInt($input.val())-parseInt(value));
            }
            var $nextTr = $tr.nextAll('tr');
            $this.closest('tr').remove();
            if($nextTr.length > 0) {    //删除的tr后面所以的tr的序号减一
                $nextTr.each(function () {
                    $(this).find('td:first').html(parseInt($(this).find('td:first').text()) - 1);
                });
            }
        });
        //查看笔录
        function checkRecord() {
            var investigationId = $('#add-scene-kyqk').attr('data-id');
            var downloadRecordAction = makeAct('sceneCollecting/sceneInfoWord/investigationNoteDownLoad/{0}'.format(investigationId));
            var createRecordAction = makeAct('sceneCollecting/sceneInfoWord/createInvestigationNote/{0}'.format(investigationId));
            $get(downloadRecordAction,{},function (res) {
                log(res)
            },true,function (res) {
                if(!res.flag){
                    $confirm('笔录不存在，是否要生成笔录？',function (bol) {
                        if(bol){
                            $get(createRecordAction,{},function () {
                                toast('笔录生成成功！').ok();
                            });
                        }else{
                            hideLoading();
                        }
                    });
                }
            });
        }
        $('.main-content').on('click','#kyqk-check-record',checkRecord);
        //勘验情况见证人添加
        $('.main-content').on('click', '#add-scene-kyqk .kyqk-jzr-add', function (e, object) {
            var $this = $(this);
            var $tbody = $this.closest('a').nextAll('table').find('tbody');
            var lastIndex = parseInt($tbody.find('tr:last td:first').text());
            var obj = {
                type: '3',
                birthday: '',
                gender: 1,
                name: '',
                organization: '',
            };
            obj = object || obj;
            investigationId && (obj.investigationId = investigationId);
            obj.index = lastIndex ? lastIndex + 1 : 1;
            var tr = $compile($('#kyqk-jzr-tr').html(), obj);
            var $tr = $(tr);
            $tr.find('select').val(obj.gender);
            $tr.find('.cm-input-date').datepicker({dateFmt:"yyyy-MM-dd"});
            $tbody.append($tr);
        });
        //常用见证人的点击弹出框配置
        var settings = {
            trigger:'',
            title:'',
            width:359,
            multi:true,
            closeable:false,
            style:'',
            padding:true,
            toggle: true
        };
        //常用见证人的点击
        $('.main-content').on('click', '#add-scene-kyqk-jzr', function (e) {
            // e.stopPropagation();
            var act = makeAct('/sceneCollecting/witnessHistory/queryAll');
            $post(act, {}, function (res) {         //见证人
                // var con = $('#add-scene-kyqk-jzr-ul').html();
                var templateHtml = $compile('#add-scene-kyqk-jzr-ul', {arr: res.data});
                settings.content = templateHtml;
                cyjzr = res.data;
                $('#add-scene-kyqk-jzr').webuiPopover('destroy').webuiPopover(settings);
            }, false);
            $(this).webuiPopover('destroy').webuiPopover($.extend({},settings));
        });
        $('body').on('click','#close-cm-person',function () {
            $(this).closest('.webui-popover').remove();
        });
        function seekTreeData() {
            var dataArr = cyjzr.where('o=>o.name.match(/.*?{0}.*?/g)'.format($('#scub-seek').val()));
            var templateHtml = $compile('#add-scene-kyqk-jzr-li', dataArr);
            $('#cyjzr-ztree').html(templateHtml);
        }
        $('body').on('click','.scub-ztree-search .icon-seek',function () {//点击搜索按钮
            seekTreeData();
        }).on('keyup','.scub-ztree-search #scub-seek',function () {//输入触发搜索
            seekTreeData();
        });
        //添加到常用见证人
        $('.main-content').on('click', '#add-scene-kyqk .add-people', function () {
            var $tr = $(this).closest('tr');
            var obj = {
                name: $tr.find('td').eq(1).find('input').val(),
                gender: $tr.find('td').eq(2).find('select').val(),
                birthday: $tr.find('td').eq(3).find('input').val(),
                organization: $tr.find('td').eq(4).find('input').val(),
                phone: '',
                address: '',
                nativePlace: '',
                idCardNo: ''
            };
            $confirm('是添加到常用见证人 '+obj.name, function (bol) {
                if(bol) {
                    var act = makeAct('sceneCollecting/witnessHistory/add');
                    $post(act, obj, function (res) {
                        if(res.flag) toast('添加成功');
                    });
                }
            });
        });
        //常用见证人 弹出框 添加
        $('body').on('click', '#cyjzr-ztree .icon-ok', function () {
            var $li = $(this).closest('li');
            var id = $li.attr('data-id');
            var tjzr = cyjzr.where('o => o.id=="{0}"'.format(id));
            // console.log(tjzr);
            $('#add-scene-kyqk .kyqk-jzr-add').trigger('click', tjzr[0]);
        });
        //常用见证人 弹出框 删除
        $('body').on('click', '#cyjzr-ztree .icon-remove', function () {
            $('.webui-popover').addClass('z-index1');
            var $li = $(this).closest('li');
            var id = $li.attr('data-id');
            var name = $li.text();
            $confirm('是否删除常用见证人'+name, function (bol) {
                if(bol) {
                    var act = makeAct('sceneCollecting/witnessHistory/del');
                    $post(act, {id: id}, function (res) {
                        if(res.flag) toast('删除成功');
                        $li.remove();
                    });
                }
                $('.webui-popover').removeClass('z-index1');
            });
        });
        //无见证人 点击
        $('.main-content').on('click', '#add-scene-kyqk #add-scene-kyqk-wjzr', function () {
            $('.form-field[data-field="witnessRemark"]').toggleClass('hide');
        });
        //常用见证人弹出框隐藏
        /*$('.body-agent').on('click', function () {
             $('.webui-popover').remove();
         }).on('click', '.webui-popover', function (e) {
             e.stopPropagation();
         });*/
        /*------------------------------ end ---------------------------------*/

        /*---------------------------分析意见事件注册 start---------------------------------*/
        //常用配置
        $('.main-content').on('click', '#fxyj-setting', function () {
            // console.log(fxyjxm.html());
            // var select = $('#fxyj-usual-setting').html();
            $('#accb-sel').template({arr: localData.get('fxyj-dictkey')});
            $open('#analysis-cmuse-choose-block',{width:400,title:'请选择配置项'});
            // var html = $compile('#fxyj-usual-setting', {arr: localData.get('fxyj-dictkey')});
            // $confirm(html, function (isyes) {
            //     if(isyes) {
            //         var dictKey = $('#fxyj-usual-select').val();
            //         var dm = $('#add-scene-fxyj').find('dict[data-key="{0}"]'.format(dictKey)).attr('dict-root');   //字典代码
            //         //todo
            //         //按钮id   #fxyj-setting
            //     }
            // });
            // var select = $('#fxyj-usual-select').val();
        });
        $('#accb-confirm-btn').on('click',function () {
            var $fxyj = $('#add-scene-fxyj');
            var $usSelVal = $('#fxyj-usual-select').val();
            var $dict = $fxyj.find('[data-dictkey="{0}"]'.format($usSelVal));
            var dictRoot = $dict.attr('dict-root');
            var dictTitle = $dict.prevAll('span').html().replace(/.*?\/\w+>|[:\s]/g,'');
            $('#analysis-cmuse-choose-block').$close();
            $('#fxyj-setting').webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?dictType={0}&linkId={1}&dictTitle={2}&isAnalysis={3}'.format(dictRoot,'fxyj-setting',dictTitle,true)}));

        });
        $('#accb-cancel-btn').on('click',function () {
            $('#analysis-cmuse-choose-block').$close();
        });
        //作案工具的添加
        $('.main-content').on('click', '#add-scene-fxyj .fxyj-zagj-add', function () {
            var $this = $(this);
            var $tbody = $this.nextAll('table').find('tbody');
            var lastIndex = parseInt($tbody.find('tr:last td:first').text());
            var obj = {
                id: '',
                index: lastIndex ? lastIndex + 1 : 1,
                gjlb: localData.get('fxyj-gjlb'),
                gjly: localData.get('fxyj-gjly')
            };
            var tr = $compile($('#fxyj-zagj-tr').html(), obj);
            $tbody.append(tr);
        });
        //作案工具的删除 x
        $('.main-content').on('click', '#add-scene-fxyj .icon-remove', function () {
            var $this = $(this);
            var $tr = $this.closest('tr');
            //存储需要删除的id到table的delId上
            var $tr = $this.closest('tr');
            var id = $tr.attr('data-id');
            $this.closest('table').data('delId') || $this.closest('table').data('delId', []);
            var delId = $this.closest('table').data('delId');
            id && delId.push(id);
            $this.closest('table').data('delId', delId);
            var $nextTr = $tr.nextAll('tr');
            $this.closest('tr').remove();
            if($nextTr.length > 0) {    //删除的tr后面所以的tr的序号减一
                $nextTr.each(function () {
                    $(this).find('td:first').html(parseInt($(this).find('td:first').text()) - 1);
                });
            }
        });
        //关于现场保留、现场复勘、尸体处理等意见
        $('.main-content').on('click', '#add-scene-fxyj #fxyj-xcclyj input', function () {
            var $this = $(this);
            var text = $this.next('label').text();
            $this.closest('dict').nextAll('div').find('textarea').val(text);
        });
        //关于侦查方向与范围、侦破措施及途径等意见 & 关于技术防范对策
        $('.main-content').on('click', '#add-scene-fxyj #fxyj-zcfxyfw label, #fxyj-jsffdc label', function () {
            var $this = $(this);
            // var $checkbox = $this.prev('input');
            // if($checkbox[0].checked == true) return;
            var text = $this.text();
            var checkboxIsSlt = $this.prev();
            var $textarea = $this.closest('dict').nextAll('div').find('textarea');
            if(!checkboxIsSlt.prop('checked')) {
                if($textarea.val().indexOf(text) == -1) {
                    if(!$textarea.val()) $textarea.val(text + ' ');
                    else $textarea.val($textarea.val() + text+' ');
                }
            } else {
                $textarea.val($textarea.val().replace(text+' ', ''));
            }
        });
        /*------------------------------ end ---------------------------------*/

        /*---------------------------尸体信息事件注册 start---------------------------------*/
        //尸体信息的添加
        $('.main-content').on('click', '#add-scene-stxx .stxx-form > b', function () {
            $('#stxx-add').find('input:text').val('');  //清空文本框
            $('#stxx-add .form-field').each(function () { //radio默认选中第一项
                var $radio = $(this).find('input:radio');
                if($radio.length > 0) {
                    $radio[0].checked = true;
                }
            });
            $('#stxx-add').attr('data-flag', 'add');
            $('#stxx-add').removeAttr('data-index');
            alertWindow = $open('#stxx-add', {title: '添加尸体信息', width: '60%'});
        });
        //尸体信息保存
        $('body').on('click', '#stxx-add .save', function (e, isClose) {
            var flag = $('#stxx-add').attr('data-flag'); //flag: add  ||  edit
            var stxx = {};
            $('#stxx-add').find('.form-field').each(function () {
                var $this = $(this);
                var field = $this.attr('data-field');
                var val = $this.find('input:text').val() || $this.find('input[type="hidden"]').val() || $this.val();
                stxx[field] = val || '';
            });
            stxx.id = $('#stxx-add').attr('data-id') || '';
            investigationId && (stxx.investigationId = investigationId);
            var stxxClone = JSON.clone(stxx);
            stxxClone.sex = stxxClone.sex.asSex();
            if(flag == 'add') {
                stxxClone.index = $('#add-scene-stxx tbody tr').length+1;
                var tr = $compile($('#add-scene-stxx-tr').html(), stxxClone);
                var $tr = $(tr).data('trData', stxx);
                $('#add-scene-stxx tbody').append($tr);
            } else if(flag == 'edit') {
                var index = parseInt($('#stxx-add').attr('data-index'));
                var $tr = $('#add-scene-stxx').find('tbody tr').eq(index);
                $tr.data('trData', stxx);
                $tr.find('td').eq(1).html(stxxClone.name);
                $tr.find('td').eq(2).html(stxxClone.sex);
            }
            if(isClose != 'notClose') {
                alertWindow.$close();
            }
            removeMd5Input();
        });
        //尸体信息保存并新增
        $('body').on('click', '#stxx-add .save-and-add', function () {
            $(this).prevAll('.save').trigger('click', 'notClose');
            $('#stxx-add').find('input:text').val('');  //清空文本框
            $('#stxx-add .form-field').each(function () {   //radio默认选中第一项
                var $radio = $(this).find('input:radio');
                if($radio.length > 0) {
                    $radio[0].checked = true;
                }
            });
        });
        //尸体信息 取消
        $('body').on('click', '#stxx-add .cancel', function () {
            alertWindow.$close();
            removeMd5Input();
        });
        //尸体信息 弹出框中的上传图片
        $('body').on('change', '#stxx-add #stxx-add-pic', function () {
            var _this = this;
            // var file = this.files[0];
            var $this = $(this);
            addScene.uploadImg(_this, function (res) {
                res.data && $this.prevAll('input:text').val(res.data.fileNameRemote);
                _this.outerHTML=_this.outerHTML;
            });
        });
        //尸体信息弹出框是否无名尸体显示/隐藏 姓名文本框
        $('body').on('change', '#stxx-sfwm input:radio', function () {
            var $dict = $(this).closest('dict');
            var $hidden = $dict.children('input[type="hidden"]');
            if($hidden.val() == '0') {
                $dict.nextAll().hide();
            } else {
                $dict.nextAll().show();
            }
        });
        //尸体信息 表格 编辑
        $('.main-content').on('click', '#add-scene-stxx .icon-edit', function () {
            var $this = $(this);
            var $tr = $this.closest('tr');
            var info = $tr.data('trData');
            var index = $tr.index();
            $('#stxx-add').attr('data-id', info.id || '');
            $('#stxx-add').attr('data-flag', 'edit');
            $('#stxx-add').attr('data-index', index);
            $('#stxx-add').find('.form-field').each(function () {
                var key = $(this).attr('data-field');
                var arr = info[key] ? info[key].split(',') : '';
                if(arr.length == 1 && arr[0] == '') {
                    arr = '';
                }
                $(this).find('dict').length!=0 && $(this).find('dict').dictSelect(arr);
                $(this).find('input:text')!=0 && $(this).find('input:text').val(info[key]||'');
                $(this).val(info[key]||'');
            });
            alertWindow = $open('#stxx-add',{title: '修改尸体信息', width: '60%'});
        });
        //尸体信息 表格 删除
        $('.main-content').on('click', '#add-scene-stxx .icon-remove', function () {
            var $this = $(this);
            var $tr = $this.closest('tr');
            //存储需要删除的id到table的delId上
            var $tr = $this.closest('tr');
            var id = $tr.attr('data-id');
            $this.closest('table').data('delId') || $this.closest('table').data('delId', []);
            var delId = $this.closest('table').data('delId');
            id && delId.push(id);
            $this.closest('table').data('delId', delId);
            $(this).closest('tr').remove();
            $('#add-scene-stxx').find('tbody tr').each(function (i) {
                $(this).find('td:first').html(i+1);
            });
        });
        //添加尸体信息 配置常用项
        $('.stxx-add-deploy').on('click',function () {
            var $this = $(this);
            var dictRoot = $this.prev('[dict-root]').attr('dict-root');
            var dictTitle = $this.prevAll('span').html().replace(/.*?\/\w+>|[:\s]/g,'');
            $this.webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?dictType={0}&linkId={1}&dictTitle={2}'.format(dictRoot,$this.attr('id'),dictTitle)}));
        });
        /*------------------------------ end ---------------------------------*/

        //右边导航栏暂存按钮
        $('.body-agent').on('click', '.form-box .add-scene-save', function () {
            var form = addScene.getFormAll();
            var tpId = $(this).closest('.form-box').data('tpId');
            form.sceneInvestigation.templateId = tpId;
            var okArr = addScene.verification();
            if(okArr.indexOf(0) == -1) {
                form.completeFlag = "1";
            } else {
                form.completeFlag = "0";
            }
            $('.main-nav').find('li').each(function (i) {
                if(okArr[i] == 1) {
                    $(this).find('.nav-mark').removeClass('icon-warning-sign').addClass('icon-ok');
                } else {
                    $(this).find('.nav-mark').removeClass('icon-ok').addClass('icon-warning-sign');
                }
            });
            var tmpArr = addScene.updateSceneInvestigator(form);
            form.sceneHandleInfo.sceneInvestigator = tmpArr;
            if(investigationId && !$('#add-scene-fxyj').data('info')) {
                form.sceneAnalysisSuggestion.sceneAnalysisItem = [];
            } else if(investigationId && $('#add-scene-fxyj').data('info')) {
                var beforeData = $('#add-scene-fxyj').data('info');
                var sceneAnalysisItem = addScene.fxyjCompare(beforeData, form);
                form.sceneAnalysisSuggestion.sceneAnalysisItem = sceneAnalysisItem;
            }
            var act = makeAct('sceneCollecting/sceneInfo/save');
            $post(act, form, function (res) {
                toast('保存成功',function () {
                    toQueryScene();//暂存后跳转到现场查询页面
                });
                
            });
        });
        //右边导航栏提交按钮
        $('.body-agent').on('click', '.form-box .add-scene-sub', function () {
            $('[data-options="required:true"],.validate').validatebox();
            $('.dict-validate').dictValidatebox();
            //验证所有必填项是否有填  若某大块存在必填项未填  则导航条对应的li标签后面添加 叹号这个类
            if ($('.body-agent .validatebox-invalid').length || $('.cus-vl-invalid').length) {
                $('.validatebox-invalid,.cus-vl-invalid').each(function () {
                    var index = $(this).closest('.main-content-block').index();
                    var liIndexI = $('.main-nav').find('li').eq(index).find('.nav-mark');
                    if(!liIndexI.hasClass('icon-warning-sign')) {
                        liIndexI.addClass('icon-warning-sign');
                    }
                });
                return;
            }
            //已经全部填写必填项 则导航条所有的li标签后面添加 勾这个类
            $('.main-nav').find('li .nav-mark').removeClass('icon-warning-sign').addClass('icon-ok');
            var form = addScene.getFormAll();
            var tpId = $(this).closest('.form-box').data('tpId');
            form.sceneInvestigation.templateId = tpId;
            var tmpArr = addScene.updateSceneInvestigator(form);
            form.sceneHandleInfo.sceneInvestigator = tmpArr;
            if(investigationId && !$('#add-scene-fxyj').data('info')) {
                form.sceneAnalysisSuggestion.sceneAnalysisItem = [];
            } else if(investigationId && $('#add-scene-fxyj').data('info')) {
                var beforeData = $('#add-scene-fxyj').data('info');
                var sceneAnalysisItem = addScene.fxyjCompare(beforeData, form);
                form.sceneAnalysisSuggestion.sceneAnalysisItem = sceneAnalysisItem;
            }
            var act = makeAct('sceneCollecting/sceneInfo/summit');
            $post(act, form, function (res) {
                toast('提交成功',function () {
                    toQueryScene();//提交后跳转到现场查询页面
                });
            });
        });
    };
    //图片上传方法
    window.uploadFile = addScene.uploadImg = function (fileDom, cb, isbatch) {
        // 图片检测
        // var files = $('.img-up-file')[0].files;
        /*if (!files.length) {
         return false;
         } else if (files.length > 3) {
         alert('最多上传3张图片');
         return false;
         }
         for (var i = 0; i < files.length; i++) {
         //alert(files[i].size)
         if (files[i].size > 200 * 1024) {
         alert('单张图片大小不能超过200k,请压缩后重新上传');
         return false;
         }
         }*/
        var fileList = fileDom.files;
        if(fileList.length == 0) {
            return false;
        }
        //图片在浏览器上显示 并添加到上传数据对象
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            //类型检测
            if (file.type.indexOf('image') === -1) {
                alert("您上传的文件存在除图片以外的文件！");
                return false;
            }
            //大小限制
            if (file.size > 5 * 1024 * 1024) {
                $alert('单张图片大小超过5M， 上传速度将过慢，请压缩后重新上传');
                break;
            }
            // h5表单多文件上传
            var data = new FormData();
            data.append('file', file);
            $.ajax({
                url: fileUploadPath,
                // url:  'http://192.168.1.211:5555/fdfs/api/file/upload',
                type: 'POST',
                data: data,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.flag == 1) {
                        //图片上传之后所生成的md5串，存储到input[type="hidden"]上
                        if(!isbatch) {
                            if($(fileDom).prev().prop('type') == 'hidden') {
                                $(fileDom).prev().remove();
                            } else {
                                var html = '<input type="hidden" class="form-field" data-field="fileMd5" value="{0}"/>'.format(res.data.md5);
                                $(fileDom).after(html);
                            }
                        }
                        (typeof cb == 'function') && cb(res);
                        // res.data//回传过来的img-src地址数组
                    } else {
                        console.info(res);
                    }
                }
            });
        }
    };
    addScene.createMd5 = function ($img) {

    }

    /*
     * 获取单一表单的值
     * @param {object} $ele jquery选择dom对象
     * @param needCh 是否需要中文返回值
     * */
    window.getFormVal = function ($ele,needCh) {
        var value='';
        var tagName = $ele.get(0).tagName;     //标签名
        var field = $ele.attr('data-field');   //获取属性
        var dictCode = $ele.attr('data-dict') || ''; //字典代码 默认为空 （一般不存在）
        var dictKey = $ele.find('dict').attr('data-dictkey') || '';     //分析意见中的dict-key 默认为空
        var dictName = $ele.find('.type-in-label-m').text().match(/[\u4e00-\u9fa5]+/) || ''; //属性名称 默认为空
        if(tagName == 'INPUT') {    //如果含有form-field的标签是input
            value = $ele.val();
            return value;    //跳出本次循环
        }
        if(tagName == 'DICT') {
            var $hideInput = $ele.find('input[type="hidden"]');
            if($ele.attr('dict-type')== 'radio') {
                value = $hideInput.val();
                if(needCh){
                    return $hideInput.data('chval');
                }else{
                    return value;
                }
            }
        }
        if(tagName == "UL") {   //如果含有form-field的标签是ul
            value = [];     //value类型改变成arr
            if($ele.data('delId')) {
                $ele.data('delId').each(function (item) {
                    value.push({id: item, deleteFlag: '1', investigationId: investigationId});
                });
            }
            $ele.find('li').each(function () {
                value.push($(this).data('picInfo'));
            });
            return value;
        }
        if(tagName == 'DIV') {      //如果含有form-field的标签是div
            var $em = $ele.find('em.form-txt');     //纯文本
            var $text = $ele.find('input:text');   //文本输入框
            var $textarea = $ele.find('textarea');     //大文本输入框
            var $ul = $ele.find('ul');     //多选
            var $ulImg = $ele.find('.ul-img')   //图片
            var $checkbox = $ele.find('input:checkbox');//多选
            var $radio = $ele.find('input:radio'); //单选
            var $hideInput = $ele.find('dict input[type="hidden"]');   //隐藏input
            if($em.length) {       //存在纯文本时,跳出本次循环
                value = $em.attr('data-val');
                if(needCh){
                    return $em.prop('title');
                }else{
                    return value;
                }
            }
            if($text.length) {     //存在文本框时text,跳出本次循环
                value = $text.val();
                return value;
            }
            if($textarea.length) {     //存在大文本框时textarea,跳出本次循环
                value = $textarea.val();
                return value;
            }
            if($radio.length) {        //存在单选框时 radid,跳出本次循环
                // value = $radio.filter(':checked').val();
                if(field == 'sceneAnalysisItem') {  //分析意见中的radio
                    value = [{
                        itemType: dictKey,
                        itemDictType: dictCode,
                        itemKey: $radio.filter(':checked').val()
                    }];
                    investigationId && (value[0].investigationId = investigationId);
                } else {
                    value = $hideInput.length>0 ? $hideInput.val() : $radio.filter(':checked').val();
                }
                if(needCh){
                    return $hideInput.data('chval');
                }else{
                    return value;
                }
            }
            if($checkbox.length) {     //存在多选框时 checkbox,跳出本次循环
                value = [];     //value类型改变成arr
                var key = $hideInput.val();
                var keyCH = $hideInput.attr('data-chval');
                if(key) {
                    if(field=='sceneInvestigator') {    //字段为指挥人员
                        var id = $ele.data('id') || '';
                        key.split(',').each(function (item, i) {
                            value.push({
                                id: id,
                                investigatorName: keyCH.split(',')[i],
                                investigatorId: item,
                                duty: "1"
                            });
                        });
                    } else if(field=='sceneAnalysisItem') {     //字段为分析意见项目
                        key.split(',').each(function (item, i) {
                            value.push({
                                // id: id,
                                investigationId: investigationId || '',
                                itemType: dictKey,
                                itemDictType: dictCode,
                                itemKey: item
                            });
                        });
                    }
                }
                if(needCh){
                    return $hideInput.data('chval');
                }else{
                    return value;
                }
            }
            if($ulImg.length) {     //为图片的时候
                value = [];     //value类型改变成arr
                if($ulImg.data('delId')) {
                    $ulImg.data('delId').each(function (item) {
                        value.push({id: item, deleteFlag: '1', investigationId: investigationId});
                    });
                }
                $ulImg.find('img').closest('div').each(function () {
                    value.push($(this).data('picInfo'));
                });
                return value;
            }
            if($ul.length != 0) {
                value = [];     //value类型改变成arr
                if($ul.data('delId')) {
                    $ul.data('delId').each(function (item) {
                        value.push({id: item, deleteFlag: '1', investigationId: investigationId});
                    });
                }
                $ul.find('li').each(function () {  //为图片的时候
                    if($(this).data('picInfo')) {
                        var info = $(this).data('picInfo');
                        investigationId && (info.investigationId = investigationId);
                        value.push(info);
                    }
                });
                return value;
            }
        }
        if(tagName == 'TABLE') {    //如果含有form-field的标签是table
            value = [];     //value类型改变成arr
            if($ele.data('delId')) {
                $ele.data('delId').each(function (item) {
                    value.push({id: item, deleteFlag: '1', investigationId: investigationId});
                });
            }
            if($ele.data('tableData')) {    //table中存在为tableData的数据的时候
                if(field=='baseStationInfo' && investigationId) {
                    value = value.concat($ele.data('tableData').where('o => !o.id'));
                } else {
                    value = value.concat($ele.data('tableData'));
                }
            } else {
                var $tr = $ele.find('tbody tr');
                if($tr.data('trData')) {        //tr中存在为trData的数据的时候
                    value = value.concat($tr.data('trData'));
                } else {
                    $tr.each(function () {
                        var $that = $(this);
                        var id = $that.data('id')||'';
                        if(field == 'sceneInvestigator') {   //field为勘验人员的时候
                            var tmpDuty = [];   //勘验人员的责任 临时数组
                            $that.find('span.active').each(function () {
                                tmpDuty.push($(this).attr('data-key'));
                            });
                            var obj = {
                                id: id,
                                investigatorName: $that.find('td:eq(0)').text(),
                                investigatorId: $that.attr('data-key'),
                                duty: tmpDuty.join(',')
                            };
                            value.push(obj);
                        } else {    //普通表格
                            var tmpObj = {};    //临时对象 用来存储每条数据
                            $that.find('td[data-key]').each(function () {
                                var $td = $(this);
                                var $chdr = $td.children();
                                var chLen = $chdr.length;
                                tmpObj[$td.attr('data-key')] = chLen?$chdr.val():$td.html();
                            });
                            investigationId && (tmpObj.investigationId = investigationId);
                            tmpObj.id = id;
                            value.push(tmpObj);
                        }
                    });
                }
            }
        }
        return value;
    };
    /*
     * 获取单一表单的值
     * @param {object} $ele jquery选择dom对象
     *
     * return {Array}
     * */
    addScene.verification = function ($ele) {
        $ele = $ele ||  $('.main-content-block');
        //验证是否全部已填
        var okArr = [];
        $ele.each(function () {
            var $this = $(this);
            var bol = 1;
            var index = $this.index();
            $this.find('[data-options="required:true"]').each(function () {
                if($(this).val().trim() == '') {
                    bol = 0
                    return false;
                }
            });
            $this.find('.dict-validate').each(function(){
                var hidVal = $(this).find('input[type="hidden"]').val();
                if(hidVal == '') {
                    bol = 0;
                    return false;
                }
            });
            okArr.push(bol);
        });
        return okArr;
    }
    //表单信息获取
    addScene.getFormAll = function ($ele) {
        var formAll = {};
        $ele = $ele || $('.main-content-block');
        $ele.each(function () {
            var $this = $(this);
            var bigField = $this.attr('data-bigfield');
            var id = $this.attr('data-id');
            var obj = {};
            $this.find('.form-field').each(function () {
                var $this = $(this);
                var field = $this.attr('data-field');   //获取属性
                // var dictCode = $this.attr('data-dict') || ''; //字典代码 默认为空 （一般不存在）
                // var dictName = $this.find('.type-in-label-m').text().replace(':', '') || ''; //属性名称 默认为空
                // var isArr = $this.attr('data-isarr')? []:'';     //判断该属性是否是arr，默认是string
                // var inobj = $this.attr('data-inobj');     //判断该属性是否在该属性里面
                if(!field) return true;//如果字段不存在，跳出本次循环
                var value = getFormVal($this);     //value默认为字符串
                if(field == 'bigfield') {   //如果大模块上 直接为数组的时候
                    if(!(obj instanceof Array)) {
                        obj = value;
                    } else {
                        obj = obj.concat(value);
                    }
                    return true;
                }
                if(!obj[field]) {   //如果obj中不存在这个key，则做赋值操作
                    obj[field] = value;
                } else {    //如果obj中存在这个key，则做数组拼接操作(分析意见 走这个逻辑)
                    obj[field] = obj[field].concat(value);
                }
                if($this.attr('data-field') == 'content' && $this.attr('data-id')) {    //勘验情况的勘验检查情况大文本
                    obj.investNoteId = $this.attr('data-id');
                }
            });
            var objType = obj instanceof Array;
            if(!objType) {
                obj.id = id || '';
            }
            formAll[bigField] = obj;
        });
        return formAll;
    };
    //定时缓存表单数据方法
    addScene.setCache = function (setCache) {
        setTimeout(function () {
            var form = addScene.getFormAll();
            var act = makeAct('sceneCollecting/sceneInfo/saveToCache');
            form.sceneInvestigationDispatch.caseTypeCn = $('[data-field="caseType"]').find('.form-txt').prop('title');
            form.sceneInvestigationDispatch.caseNatureCn = $('[data-field="caseNature"]').find('.form-txt').prop('title');
            $post(act, {inputContent: obj2str(form)}, function () {}, false);
            setTimeout(arguments.callee, setCache);
        }, setCache);
    }
    //查询现场信息 并做 渲染
    addScene.searchFill = function (urlObj) {
        var investigationId = urlObj.id;
        //案情信息查询
        var act = makeAct('sceneCollecting/sceneInfo/dispatch');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            // obj.sceneInvestigationDispatch.caseTypeCn = decodeURIComponent(urlObj.caseType);
            // obj.sceneInvestigationDispatch.caseNatureCn = decodeURIComponent(urlObj.caseNature);
            $('#add-scene-aqxx').attr('data-pid', obj.id);
            fillData($('#add-scene-aqxx'), obj);
        },false);
        //出勘信息查询
        var act = makeAct('sceneCollecting/sceneInfo/outInvestigation');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            sceneInvestigator = obj.sceneHandleInfo.sceneInvestigator;
            $('#add-scene-ckxx').attr('data-pid', obj.id);
            fillData($('#add-scene-ckxx'), obj);
        },false);
        //现场条件查询
        var act = makeAct('sceneCollecting/sceneInfo/condition');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            $('#add-scene-xctj').attr('data-pid', obj.id);
            fillData($('#add-scene-xctj'), obj);
        },false);
        //现场图查询
        var act = makeAct('sceneCollecting/sceneInfo/picture');
        $get(act+'/'+investigationId+'/1', {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            fillData($('#add-scene-xct'), obj);
        },false);
        //现场照片查询
        $get(act+'/'+investigationId+'/2', {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            fillData($('#add-scene-xczp'), obj);
        },false);
        //痕迹物证查询
        var act = makeAct('sceneCollecting/sceneInfo/materialEvidence');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            fillData($('#add-scene-hjwz'), obj);
        },false);
        //提取物品查询
        var act = makeAct('sceneCollecting/sceneInfo/collectedGoods');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            fillData($('#add-scene-tqwp'), obj);
        },false);
        //勘验情况查询
        var act = makeAct('sceneCollecting/sceneInfo/investigation');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            $('#add-scene-kyqk').attr('data-pid', obj.id);
            fillData($('#add-scene-kyqk'), obj);
        },false);
        //分析意见查询
        var act = makeAct('sceneCollecting/sceneInfo/analysisSuggestion');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            $('#add-scene-fxyj').attr('data-pid', obj.id);
            fillData($('#add-scene-fxyj'), obj);
        },false);
        //尸体信息查询
        var act = makeAct('sceneCollecting/sceneInfo/bodyBasic');
        $get(act+'/'+investigationId, {}, function (res) {
        // $get(act, null, function (res) {
            var obj = res.data;
            fillData($('#add-scene-stxx'), obj);
        },false);
    }

    //不同的情况进入不同的页面   编辑或者查看或者新增
    if(urlObj.searchflag == 1) {        //现场查询
        $('input,select').addClass('border-hide');
        $('.mcb-header b').addClass('hide-plus');
        $('.main-nav .form-box').hide();
        $('#add-scene-xct').find('ul li:first').remove();   //现场图的加
        $('#add-scene-xczp').find('.add-pic').remove(); //现场照片的加
        $('#add-scene-hjwz').find('ul .add').remove(); //现场照片的加
        $('#add-scene-tqwp').find('ul li:first').remove();  //提取物品的加
    } else {
        $('input,select').removeClass('border-hide');
    }
    if(urlObj.solrUrl) {
        config.restfuls[0] = urlObj.solrUrl;  //重定义url
        config.exToken = '82996edc6c36f5d9182d64a89ee31152';
    }
    if(investigationId) {
        $('.mcb-header b.edit').show();
        $('.mcb-form .over-div').show();
        // $('input').prop('disabled', 'disabled');
        // $('textarea').prop('disabled', 'disabled');
        getInputTpData('','','','',function() {
            getInputTpDataCb();
            setTimeout(function () {
                var investigationNo = '';
                console.log($('.unready').length);
                if($('.unready').length != 0) {
                    setTimeout(arguments.callee, timeout);
                } else {
                    //现场查询 复勘
                    if(urlObj.iteration){
                        var act = makeAct('sceneCollecting/sceneInfo/dispatch');
                        $get(act+'/'+investigationId, {}, function (res) {
                            // $get(act, null, function (res) {
                            var obj = res.data;
                            obj.sceneInvestigationDispatch.caseTypeCn = decodeURIComponent(urlObj.caseType);
                            obj.sceneInvestigationDispatch.caseNatureCn = decodeURIComponent(urlObj.caseNature);
                            $('#add-scene-aqxx').attr('data-pid', obj.id);
                            fillData($('#add-scene-aqxx'), obj);
                        },false);
                    }else {
                        investigationNo = queryParse().investigationNo;
                        $('#investigation-no').text(investigationNo);
                        addScene.searchFill(urlObj);
                    }
                }
            }, timeout);
            //显示查看需要展示的内容
            $('.hide-if-not-check').removeClass('hide-if-not-check');
        });
    } else {
        var act = makeAct('sceneCollecting/sceneInfo/getFromCache');
        $post(act, {}).always(function (res) {
            if (res.data) {
                $confirm('上一次新增现场还未填完，是否继续？', function (isyes) {
                    if (isyes) {
                        getInputTpData('', '', '', '', function () {
                            //初始化案件类别、案件性质字典
                            // $('#ectb-case-type-dict').dict(function () {
                            //     getCaseNatureByCaseType($('#ectb-case-type').val(), function (data) {
                            //         $('#ectb-case-nature-dict').dict(null, data);
                            //     });
                            // });
                            getInputTpDataCb();
                            setTimeout(function () {
                                console.log($('.unready').length);
                                if ($('.unready').length != 0) {
                                    setTimeout(arguments.callee, timeout);
                                } else {
                                    var form = str2obj(res.data);
                                    $('.main-content-block').each(function () {
                                        var module = $(this).attr('data-bigfield');
                                        fillData($(this), form);
                                    });
                                    addScene.setCache(setCache);
                                    // addScene.searchFill(urlObj);
                                }
                            }, timeout);
                        });
                    } else {
                        init();
                    }
                });
            } else {
                init();
            }
            $('.mcb-header b').not('.edit, .save').show();
        });
    }

    /*//出勘信息字典初始化
    addScene.ckxxDictInit = function () {
        var act = makeAct('sceneCollecting/investigatorHistory/queryAll', '');
        var param = {"duty":"1"};
        $post(act, param, function (res) {  //指挥人员字典
            $('#ckxx-zhry').template(res.data);
        }, false);
        param = {duty: "0"};
        $post(act, param, function (res) { //勘验人员字典
            $('#ckxx-kyry').template(res.data);
        }, false);

        act = makeAct('sys/sysDict/single/KYZZDM', '');
        $get(act, null, function (res) {    //勘验人员责任list
            var th = '<th>人员</th>';
            res.data && res.data.each(function (o) {
                if(o.key != '1')
                    th += '<th data-key="{0}">{1}</th>'.format(o.key, o.value);
            });
            th += '<th>编辑</th>';
            $('#ckxx-kyryzz').find('thead tr').html(th);
        }, false);
    };
    //分析意见字典初始化
    addScene.fxyjDictInit = function () {
        //工具类别
        var act = makeAct('/sys/sysDict/single/ZAGJLMDM');
        $get(act, null, function (res) {
            localData.set('fxyj-gjlb', res.data);
        }, false);
        //工具来源
        act = makeAct('/sys/sysDict/single/ZAGJLYDM');
        $get(act, null, function (res) {
            localData.set('fxyj-gjly', res.data);
        }, false);
    };*/
    //尸体信息字典初始化
    /*addScene.stxxDictInit = function () {
        var act = makeAct('/sceneCollecting/dictComm/queryAll');
        var liArr;
        //体表特殊标记
        $post(act, {dictType: 'TBTSBJDM'}, function (res) {
            liArr = [];
            res.data && res.data.each(function (item) {
                liArr.push('<li data-key="{0}">{1}</li>'.format(item.dictKey, item.dictValue));
            })
            $('#stxx-tbbj').html(liArr.join(''));
        }, false);
        //致死原因
        $post(act, {dictType: 'ZSYYFLDM'}, function (res) {
            liArr = [];
            res.data && res.data.each(function (item) {
                liArr.push('<li data-key="{0}">{1}</li>'.format(item.dictKey, item.dictValue));
            })
            $('#stxx-zsyy').html(liArr.join(''));
        }, false);
    };*/
    //字典初始化
    addScene.dictInit = function () {
        $('.dict').dict();
        //案情信息 发案区划
        $get(unitAct,{},function (res) {
            localData.set('aqxx-case-regionalism', res.data);
            $('#aqxx-case-regionalism-dict').dict(res.data)
        });

        //案情信息 报案人||被害人
        $get(peopleTypeAct, null, function (res) {
            localData.set('aqxx-peopletype', res.data.where('o => o.key!="3"'));
        });
        //出勘信息 ---------------------------------------------------
        var param = {"duty":"1"};
        $post(kyryAct, param, function (res) {  //指挥人员字典
            // $('#ckxx-zhry').template(res.data);
            var d = res.data.select('o => {dictValue: o.investigatorName, dictKey: o.investigatorId}');
            $post(sltKyryAct, {}, function (res1) {
                $('#zhry-dict').data('info', res1.data);
                $('#zhry-dict').dict(res1.data, d);
            }, false);
        }, false);
        param = {duty: "0"};
        $post(kyryAct, param, function (res) { //勘验人员字典
            _kyry = res.data;
            var d = res.data.select('o => {dictValue: o.investigatorName, dictKey: o.investigatorId}');
            $post(queryTreeUserAct, {}, function (res1) {
                $('#kyry-dict').data('info', res1.data);
                $('#kyry-dict').dict(res1.data, d, function () {
                    //勘验人员字典回调函数 注册事件
                    $('.main-content').off('change').on('change', '#add-scene-ckxx #kyry-dict input:checkbox', function () {
                        var $this = $(this);
                        var id = $this.val();
                        if($this.prop('checked') == false) {  //如果已经存在该勘验人员，则删除该人员
                            $('#ckxx-kyryzz').find('tbody tr[data-key="{0}"]'.format(id)).remove();
                            return;
                        }
                        var hiddenInput = $this.closest('dict').find('input[type="hidden"]').val();
                        var idArr = hiddenInput?hiddenInput.split(','):[];  //获取选择后所有人的id（存在input:hidden上的）
                        var selectedValArr = [];    //存储已选择勘验人员名字
                        $('#ckxx-kyryzz').find('tbody tr').each(function () {
                            selectedValArr.push($(this).attr('data-key'));
                        });
                        var xArr = idArr.xor(selectedValArr);   //差集内容
                        var arr = [];   //存储人员责任的key
                        var tepArr = [];    //存储template的数组
                        $('#ckxx-kyryzz').find('thead th').each(function () {
                            var key = $(this).attr('data-key');
                            if(key) {
                                tepArr.push({active: 0, key: key});
                                arr.push(key);
                            }
                        });
                        if(idArr.length > selectedValArr.length) {  //li选择的比table上已选择的多
                            xArr.each(function (id) { //添加到table上的项
                                var selected = _kyry.where('o => o.investigatorId=="{0}"'.format(id));
                                if(selected.length == 0) {selected.push({
                                    "investigatorName": $this.next().text(),
                                    "investigatorId": id,
                                    "duty": ""
                                })}
                                var duty = selected[0].duty; //责任代码
                                var name = selected[0].investigatorName; //勘验人员名字
                                duty.split(',').each(function (v) {
                                    var index = arr.indexOf(v);
                                    if(index != -1){
                                        tepArr[index].active = 1;
                                    }
                                });
                                var tr = $compile('#ckxx-kyryzz-tbody-tp', {id: id, name: name, arr: tepArr});
                                $('#ckxx-kyryzz tbody').append(tr);
                            });
                        } else {    //li选择的比table上已选择的少
                            xArr.each(function (id) { //删除table上没有被选中的项
                                $('#ckxx-kyryzz').find('tbody tr[data-key="{0}"]'.format(id)).remove();
                            });
                        }

                        //提取物品的新增操作里面的提取人 做相应的渲染
                        var tqr = [];
                        $('#ckxx-kyryzz tbody tr').each(function () {
                            tqr.push({key: $(this).attr('data-key'), val: $(this).find('td:first').text()});
                        });
                        $('.tqr-info-fill').html($compile('<li data-key="{key}">{val}</li>', tqr));
                    });
                    if(!investigationId) {
                        window.defaultSel();
                    }
                });
            }, false);
        }, false);

        $get(dutyAct, null, function (res) {    //勘验人员责任list
            var th = '<th>人员</th>';
            res.data && res.data.each(function (o) {
                if(o.key != '1')
                    th += '<th data-key="{0}">{1}</th>'.format(o.key, o.value);
            });
            th += '<th>编辑</th>';
            $('#ckxx-kyryzz').find('thead tr').html(th);
        }, false);
        // -----------------------------------------------------------

        //分析意见  ----------------------------------------------------
        $get(fxyjAct, null, function (res) {
            $('#add-scene-fxyj').find('.type-in-label-m').each(function () {
                var data = res.data.where('o=>o.key != 11');    //除去案件性质这个item
                localData.set('fxyj-dictkey', data);
                var $this = $(this);
                var text = $this.text().match(/[\u4e00-\u9fa5]+/) && $this.text().match(/[\u4e00-\u9fa5]+/)[0];
                res.data.each(function (item) {
                    if(item.value == text) {
                        $this.next('dict').attr('data-dictkey', item.key);
                    }
                });
            });
        }, false);
        //工具类别
        $get(gjlbAct, null, function (res) {
            localData.set('fxyj-gjlb', res.data);
        }, false);
        //工具来源
        $get(gjlyAct, null, function (res) {
            localData.set('fxyj-gjly', res.data);
        }, false);
        // -----------------------------------------------------------

        // 尸体信息 ----------------------------------------------------
        var liArr;
        //体表特殊标记
        $post(stxxAct, {dictType: 'TBTSBJDM'}, function (res) {
            liArr = [];
            res.data && res.data.each(function (item) {
                liArr.push('<li data-key="{0}">{1}</li>'.format(item.dictKey, item.dictValue));
            })
            $('#stxx-tbbj').html(liArr.join(''));
        }, false);
        //致死原因
        $post(stxxAct, {dictType: 'ZSYYFLDM'}, function (res) {
            liArr = [];
            res.data && res.data.each(function (item) {
                liArr.push('<li data-key="{0}">{1}</li>'.format(item.dictKey, item.dictValue));
            })
            $('#stxx-zsyy').html(liArr.join(''));
        }, false);
        //-------------------------------------------------------------
    }

    //勘验人员默认选中
    window.defaultSel = function () {
        var needSel = _kyry.where('o=>o.isOpen=="1"');
        needSel.each(function (item) {
            $('#kyry-dict').find('input:checkbox[value="{0}"]'.format(item.investigatorId)).trigger('click');
        });
    }
    //提取物品新增方法
    addScene.tqwpAdd = function(obj) {
        var data = str2obj(obj2str(obj));   //复制对象
        var tqr = [];
        data.imgid = 'img'+new Date().getTime();    //给图片赋予唯一标识
        // data.pictureId = top.sysParams.fileServerPath+'/'+data.pictureId;
        data.sceneCollectedPerson.each(function (item) {
            tqr.push(item.collectedPerson);
        });
        data.tqr = tqr.join('、');
        var li = $compile('#add-scene-tqwp-img', data);
        var $li = $(li);
        $li.data('picInfo', obj);   //吧数据存储到li标签上
        $('#add-scene-tqwp ul').append($li);
        data.index = $('#add-scene-tqwp ul li').length - 1;
        var tr = $compile($('#add-scene-tqwp-tr').html(), data);
        $('#add-scene-tqwp tbody').append(tr);
        removeMd5Input();
    };

    //保存或者取消后删除图片的MD5隐藏input
    function removeMd5Input() {
        $('body').find('input[type="file"]').next('input[type="hidden"]').remove();
    }


    //页面初始化方法
    addScene.init = function () {
        addScene.regEvent();    //事件初始化
    }
    addScene.init();

    /*-------------------jia jia lao shi start--------------------------------*/
    var liHtml = $('#hjwz-li-tp').html(); //原图li模板
    var divHtml = $('#hjwz-div-tp').html(); //修改图div模板
    var sContentHtml = $('#hjwz-map-s-content-tp').html(); //摄像头打点 标注点基础信息

    //现场痕迹物证类别代码
    var xchjwzlbDM = [
        {'key':'print', 'value':'1'},
        {'key':'foot', 'value':'2'},
        {'key':'tool', 'value':'3'},
        {'key':'gun', 'value':'4'},
        {'key':'special', 'value':'5'},
        {'key':'bio', 'value':'6'},
        {'key':'drug', 'value':'7'},
        {'key':'physic', 'value':'8'},
        {'key':'doc', 'value':'9'},
        {'key':'elec', 'value':'10'},
        {'key':'video', 'value':'11'},
        {'key':'others', 'value':'12'},
        {'key':'jz', 'value':'13'},
        {'key':'camera', 'value':'14'},
        {'key':'wifi', 'value':'15'}
    ];
    /*var xchjwzlbDM = [
        {'key':'print', 'value':'1'},
        {'key':'foot', 'value':'2'},
        {'key':'bio', 'value':'3'},
        {'key':'tool', 'value':'4'},
        {'key':'gun', 'value':'5'},
        {'key':'drug', 'value':'6'},
        {'key':'physic', 'value':'7'},
        {'key':'doc', 'value':'8'},
        {'key':'elec', 'value':'9'},
        {'key':'video', 'value':'10'}
    ];*/

    var cameraInfo = [];//存放摄像头打点信息
    var map, cameraMarkers = [];

    // $('.dict').dict();

    //图片上传
    function picUpload(selector, input){
        var formdata = new FormData();
        formdata.append('myfile', input.files[0]);
        $.ajax({
            url: "http://192.168.1.211:53000/api/file/upload",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data)
                if(data.flag == '1') {
                    $(selector).val('http://192.168.1.211:53000/api/file/download/' + data.fileId + '?preview=true')
                }
            },
            error: function () {
                alert("上传失败！");
            }
        });
    }
    //获取图片唯一ID
    function getPicGuid(type){
        return (type+(((1+Math.random())*0x1000)|0));
    }
    //获取新增内容
    window.getHjwzBlockObject = function (selector, ch_dict){
        var obj = {}, t_obj = {};
        $(selector).find('input').each(function(){
            if(this.type == 'radio' && this.checked){
                obj[this.name] = this.value;
                if(ch_dict){
                    obj[this.name+'Dict'] = $(this).next().text();
                }else{
                    obj[this.name+'Dict'] = $(this).closest('[dict-root]').attr('dict-root');
                }
                // obj[this.name+'Dict'] = $(this).next().text();
            }else if(this.type == 'checkbox' && this.checked){
                obj[this.name] = this.value;
            }else if(this.type == 'text'){
                obj[this.name] = this.value;
            } else if(this.className == 'form-field') {
                obj.fileMd5 = this.value;
            }
        });

        //提取人
        obj.sceneCollectedPerson = [];
        $(selector).find('.tqr-info-fill li').each(function(){
            if($(this).hasClass('active')){
                t_obj = {};
                t_obj.collectedType = '1';//痕迹物证
                t_obj.collectedPersonId = $(this).data('key');
                t_obj.collectedPerson = $(this).text();
                investigationId && (t_obj.investigationId = investigationId);
                obj.sceneCollectedPerson.push(t_obj);
            }
        });
        console.log(obj);
        return obj;
    };
    //初始化痕迹物证模块
    function initHjwz(){
        var initDragbar = $('#hjwz-all');
        initDragbar.sortable({
            revert:true
        });
    }
    //新增弹窗input初始化
    function initAddInput(type, $div, order){
        $div.find(':text').val('');//清空之前的数据
        $div.find(':checkbox,:radio').prop('checked', false);
        $div.find('.tqr-info-fill li').removeClass('active');
        $div.find('.validatebox-invalid').removeClass('validatebox-invalid');
        $div.find('#{0}-no'.format(type)).val(order+1);
        $div.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        $div.find('.tqwp-info').addClass('hide');
        $div.children('p').find('b[id^="add-{0}-"]'.format(type)).removeClass('hideplus');
        $div.children('p').find('b[id^="edit-{0}-"]'.format(type)).addClass('hideplus');
    }
    //修改弹窗input赋值
    function initEditInput(type, $div, data, order, uuid){
    // window.initEditInput = function(type, $div, data, order, uuid){
        $div.find('.tqr-info-fill li').removeClass('active');
        //操作按钮显示与否
        $div.children('p').find('b[id^="add-{0}-"]'.format(type)).addClass('hideplus');
        $div.children('p').find('b[id^="edit-{0}-"]'.format(type)).removeClass('hideplus');
        //template要修改的内容
        $div.template(data);
        //uuid赋值
        $div.find('[uuid]').attr('uuid', uuid);
        //序号赋值
        $div.find('[name="order"]').val(order);
        //template后，提取时间datepicker初始化
        $div.find('.cm-input-date').datepicker();
        //template后，树形字典重新初始化
        $div.find('[dict-type="tree"]').dict(null, function(){
            //枪弹种类赋值
            $div.find('input[name="bulletType"]').val(data.bulletType);
            $div.find('input[name="bulletType_displayValue"]').val(data.bulletType_displayValue);
        });
        //字典radio选中判断
        $div.find('[dict-name="materialEvidenceType"]').children('input[value="{0}"]'.format(data.materialEvidenceType)).prop('checked', true);
        $div.find('[dict-name="collectionMode"]').children('input[value="{0}"]'.format(data.collectionMode)).prop('checked', true);
        $div.find('[dict-name="bulletModel"]').children('input[value="{0}"]'.format(data.bulletModel)).prop('checked', true);
        //checkbox选中判断
        if(data.storageFlag == '1'){$('input[name="storageFlag"]').prop('checked', true);}
        if(data.collectedFlag == '1'){$('input[name="collectedFlag"]').prop('checked', true);}
        //提取人选中判断
        data.sceneCollectedPerson.each(function(item){
            $div.find('.tqr-info-fill li[data-key="{0}"]'.format(item.collectedPersonId)).addClass('active');
        });
    }
    //弹窗保存 @type add or edit @module 痕迹物证子类
    function saveOpt(type, module){
        var $allUl = $('#hjwz-all');
        var $div = $('#hjwz-'+module+'-block'),
            $ul = $('#hjwz-'+module),
            $titleUl = $('.hjwz-tabs[param="hjwz"]');
        var saveObj = {category:xchjwzlbDM.where('o=>o.key=="{0}"'.format(module))[0].value};
        var dataObj = {};//data('picInfo', dataObj);
        //必填项验证
        $div.find('.validate').validatebox();
        if($div.find('.validatebox-invalid').length > 0){
            return false;
        }
        //获取输入内容的json对象
        saveObj = $.extend(saveObj, getHjwzBlockObject('#hjwz-'+module+'-block'));
        investigationId && (saveObj.investigationId = investigationId);
        // saveObj.attachmentId = saveObj.pictureId;//痕迹图片路径（文件服务器返回给前端）
        //判断 是否包含实体提取物品 是否勾选。
        //勾选，则需要向提取物品中添加信息。
        if(saveObj.collectedFlag == '1'){
            var tqwpObj = {};
            tqwpObj.name = saveObj.tqwpName;
            tqwpObj.materialEvidenceFlag = '1';
            tqwpObj.amount = saveObj.tqwpAmount;
            tqwpObj.collectedPosition = saveObj.leftPosition;
            tqwpObj.collectedMethod = saveObj.collectionMode;
            tqwpObj.collectedTime = saveObj.collectedTime;
            tqwpObj.pictureId = saveObj.attachmentId;
            // tqwpObj.attachmentId = saveObj.attachmentId;
            tqwpObj.category = saveObj.category;
            tqwpObj.materialEvidenceType = saveObj.tqwpType;
            tqwpObj.materialEvidenceTypeDict = saveObj.tqwpTypeDict;
            tqwpObj.sceneCollectedPerson = str2obj(obj2str(saveObj.sceneCollectedPerson));
            //调用提取物品的新增方法
            addScene.tqwpAdd(tqwpObj);
        }
        if(type == 'add'){
            dataObj = str2obj(obj2str(saveObj));
            dataObj.id = '';

            saveObj.uuid = getPicGuid(module);
            //手印的图片，移上去需要显示编辑图片按钮，其他的不需要显示
            if(module == 'print'){saveObj.module = 'print';}
            //新增保存时需要append一个新的图片
            var t_html = $compile(liHtml, saveObj);
            $ul.append(t_html);
            $allUl.append(t_html);

            delete dataObj['order'];
            delete dataObj['uuid'];
            delete dataObj['tqwpName'];
            delete dataObj['tqwpAmount'];
            delete dataObj['tqwpProp'];
            delete dataObj['tqwpType'];
            delete dataObj['tqwpTypeDict'];

            //将照片的基础信息存放在li上
            $ul.children('li:last').data('picInfo', dataObj);
            $allUl.children('li:last').data('picInfo', dataObj);
            
            //如果是指纹保存，并且存在缩略图
            if(module == 'print' && saveObj.modifyAttachmentId){
                saveObj.uuid = 'edit-' + saveObj.uuid;
                saveObj.module = '';
                $ul.children('li:last').addClass('after-edit').append($compile(divHtml, saveObj));
                $allUl.children('li:last').addClass('after-edit').append($compile(divHtml, saveObj));
            }

            //更新数量
            $titleUl.children('li[param="{0}"]'.format(module)).find('em').text($ul.children('li').length - 1);
            $titleUl.children('li[param="all"]').find('em').text($allUl.children('li').length);
        }else if(type == 'edit'){
            saveObj.uuid = $div.find('[uuid]').attr('uuid');

            dataObj = str2obj(obj2str(saveObj));
            dataObj.id = '';
            dataObj.pictureId = '';
            delete dataObj['order'];
            delete dataObj['uuid'];
            delete dataObj['tqwpName'];
            delete dataObj['tqwpAmount'];
            delete dataObj['tqwpProp'];
            delete dataObj['tqwpType'];
            delete dataObj['tqwpTypeDict'];

            $ul.find('img[paramId="{0}"]'.format(saveObj.uuid))
                .prop('src', fileServerPath+saveObj.attachmentId)
                .parent().find('.name').text(saveObj.materialEvidenceName)
                .closest('li').data('picInfo', dataObj);

            $allUl.find('img[paramId="{0}"]'.format(saveObj.uuid))
                .prop('src', fileServerPath+saveObj.attachmentId)
                .parent().find('.name').text(saveObj.materialEvidenceName)
                .closest('li').data('picInfo', dataObj);

            //如果是指纹保存，并且存在缩略图
            if(module == 'print' && saveObj.modifyAttachmentId){
                var tli = $ul.find('img[paramId="{0}"]'.format(saveObj.uuid)).closest('li');
                var tallli = $allUl.find('img[paramId="{0}"]'.format(saveObj.uuid)).closest('li');
                var tlen = tli.children('.pic-detail').length;
                if(tlen == 1){
                    //修改前 该照片没有缩略图
                    tli.addClass('after-edit').append($compile(divHtml, saveObj));
                    tallli.addClass('after-edit').append($compile(divHtml, saveObj));
                }else if(tlen == 2){
                    //修改前 该照片存在缩略图
                    tli.find('img:last').attr('src', fileServerPath+saveObj.modifyAttachmentId);
                    tallli.find('img:last').attr('src', fileServerPath+saveObj.modifyAttachmentId);
                }
            }
        }
        $div.$close();
        removeMd5Input();
    }

    //进入新增指纹页面
    function intoAddPrint(){
        var $div = $('#hjwz-print-block');
        var order = $('#hjwz-print').children('li').length - 1;//存放指纹以保存的图片的数量

        initAddInput('print', $div, order);

        $open('#hjwz-print-block', {width: 1000, title:'添加手印痕迹'});
    }
    //进入新增足迹页面
    function intoAddFoot(){
        var $div = $('#hjwz-foot-block');
        var order = $('#hjwz-foot').children('li').length - 1;

        initAddInput('foot', $div, order);
        $open('#hjwz-foot-block', {width: 1000, title:'添加足迹痕迹'});
    }
    //进入新增生物页面
    function intoAddBio(){
        var $div = $('#hjwz-bio-block');
        var order = $('#hjwz-bio').children('li').length - 1;//存放指纹以保存的图片的数量

        initAddInput('bio', $div, order);
        $open('#hjwz-bio-block', {width: 1000, title:'添加生物痕迹'});
    }
    //进入新增工具页面
    function intoAddTool(){
        var $div = $('#hjwz-tool-block');
        var order = $('#hjwz-tool').children('li').length - 1;
        initAddInput('tool', $div, order);
        $open('#hjwz-tool-block', {width: 1000, title:'添加工具痕迹'});
    }
    //进入新增枪弹页面
    function intoAddGun(){
        var $div = $('#hjwz-gun-block');
        var order = $('#hjwz-gun').children('li').length - 1;
        initAddInput('gun', $div, order);
        $open('#hjwz-gun-block', {width: 1000, title:'添加枪弹痕迹'});
    }
    //进入新增特殊页面
    function intoAddSpecial(){
        var $div = $('#hjwz-special-block');
        var order = $('#hjwz-special').children('li').length - 1;
        initAddInput('special', $div, order);
        $open('#hjwz-special-block', {width: 1000, title:'添加特殊痕迹'});
    }
    //进入新增毒化页面
    function intoAddDrug(){
        var $div = $('#hjwz-drug-block');
        var order = $('#hjwz-drug').children('li').length - 1;
        initAddInput('drug', $div, order);
        $open('#hjwz-drug-block', {width: 1000, title:'添加毒化痕迹'});
    }
    //进入新增理化页面
    function intoAddPhysic(){
        var $div = $('#hjwz-physic-block');
        var order = $('#hjwz-physic').children('li').length - 1;
        initAddInput('physic', $div, order);
        $open('#hjwz-physic-block', {width: 1000, title:'添加理化痕迹'});
    }
    //进入新增文检页面
    function intoAddDoc(){
        var $div = $('#hjwz-doc-block');
        var order = $('#hjwz-doc').children('li').length - 1;
        initAddInput('doc', $div, order);
        $open('#hjwz-doc-block', {width: 1000, title:'添加文检痕迹'});
    }
    //进入新增电子页面
    function intoAddElec(){
        var $div = $('#hjwz-elec-block');
        var order = $('#hjwz-elec').children('li').length - 1;
        initAddInput('elec', $div, order);
        $open('#hjwz-elec-block', {width: 1000, title:'添加电子痕迹'});
    }
    //进入新增视频页面
    function intoAddVideo(){
        var $div = $('#hjwz-video-block');
        var order = $('#hjwz-video').children('li').length - 1;
        initAddInput('video', $div, order);
        $open('#hjwz-video-block', {width: 1000, title:'添加视频痕迹'});
    }
    //进入新增其他页面
    function intoAddOthers(){
        var $div = $('#hjwz-others-block');
        var order = $('#hjwz-others').children('li').length - 1;
        initAddInput('others', $div, order);
        $open('#hjwz-others-block', {width: 1000, title:'添加其他痕迹'});
    }
    //进入新增摄像头打点页面
    function intoAddCamera(){
        // cameraInfo = $('#dzwz-camera-table').data('tableData') || [];
        $('#hjwz-camera-block>.camera-result-list').removeClass('-right350');
        $open('#hjwz-camera-block', {width:'max', height:'max', title:'摄像头打点', onClose: function(){
            var tb = $('#dzwz-camera-table');
            //更新数量
            $('.hjwz-tabs[param="dzwz"]').children('[param="camera"]').find('em').text(cameraInfo.length);
            //将新增的数据template到摄像头结果列表上
            tb.children('tbody').template(cameraInfo);
            //将数据存放在摄像头的table上
            tb.data('tableData', cameraInfo.select('o => {investigationId:o.investigationId,cameraName:o.cameraName, cameraType:o.cameraType, cameraOrientation:o.cameraOrientation, longitude:o.longitude, latitude:o.latitude,attachmentId:o.attachmentId}'));
            //注册查看图片
            tb.find('.dzwz-into-view-pic').previewBox('picSrc');
        }});
        $('#map-getpoint-camera').css({width:'100%', height:'100%'});
        initHsMap(function(){
            var casePoints=[];
            var caseMarkers=[];
            var currentCasePoint;

            //部署地配置
            var bsdMapCityArr=["厦门", "118.08", "24.49"];//localData.get('sysParams')['defaultMapCity'].split(',');info([bsdMapCityArr,convert2bdPP({lat:bsdMapCityArr[1],lng:bsdMapCityArr[2]})]);
            var bsdMapCityName=bsdMapCityArr[0];
            var bsdMapCenter={lng:+bsdMapCityArr[1], lat:+bsdMapCityArr[2]};//
            var bsdMapDefaultZoom=+(bsdMapCityArr[3]||12);
            //坐标对象
            //var pp = {lng:117.28, lat:31.86};
            //创建Map实例
            map = new BMap.Map('map-getpoint-camera',window.config.defaultZoomSetting||{minZoom:12,maxZoom:18});
            //点实例
            var point = new BMapPoint(bsdMapCenter);
            //标注点实例
            //var marker=addMarker(point);
            //圆实例, 标注圆
            //var circle = new BMap.Circle(point,5000,{fillColor:'blue', strokeWeight: 1 ,fillOpacity: 0.1, strokeOpacity: 0.1});
            //map.addOverlay(circle);
            //信息框实例
            //var sContent=byid('map-info-window').innerHTML;
            //var infoWindow = new BMap.InfoWindow(sContent,{width:400,marginLeft:100});//, title : '案件详情'});  // 创建信息窗口对象
            //设置中心点和缩放级别
            map.centerAndZoom(point, bsdMapDefaultZoom);
            //允许地图类型选择
            // map.addControl(new BMap.MapTypeControl());
            //当前城市
            map.setCurrentCity(bsdMapCityName);
            //滚轮缩放
            map.enableScrollWheelZoom(true);
            // map.setDefaultCursor("url('C:/Users/Administrator/Desktop/cur/光标/Altr_Fsh.cur')");
            // map.setDefaultCursor('Crosshair');
            // map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));

            //单击获取点击的经纬度
            map.addEventListener('click',function(e){
                var $addCamera = $('#hjwz-add-camera');
                //清空input的值
                $addCamera.find('input:text').val('');
                $addCamera.find('.validatebox-invalid').removeClass('validatebox-invalid');
                //设置默认选中值
                $addCamera.find('[dict-type="radio"]').find('input:first').prop('checked', true);
                $addCamera.find('#camera-lng').val(e.point.lng);
                $addCamera.find('#camera-lat').val(e.point.lat);
                $open('#hjwz-add-camera', {width:500, title:'新增摄像头'});
            });
        });
    }
    //新增摄像头保存
    function saveCamera(){
        var $div = $('#hjwz-add-camera'),
            $tb = $('#camera-result-tb');

        //必填项判断
        $div.find('.validate').validatebox();
        if($div.find('.validatebox-invalid').length > 0){
            return false;
        }

        var obj = getHjwzBlockObject('#hjwz-add-camera', true);
        obj.uuid = getPicGuid('camera');
        investigationId && (obj.investigationId = investigationId);
        cameraInfo.push(obj);
        $tb.children('tbody').template(cameraInfo);

        $div.$close();

        //设置标注点为摄像头图片
        var cameraIcon = new BMap.Icon('../img/icon/on-camera.png', new BMap.Size(32,32));
        //设置中心点
        var new_point = new BMap.Point(obj.longitude, obj.latitude);
        //创建标注
        var marker = new BMap.Marker(new_point,{icon:cameraIcon});
        var infoWindow = new BMap.InfoWindow($compile(sContentHtml, obj));
        marker.addEventListener('click', function(){
            this.openInfoWindow(infoWindow);
            event.stopPropagation();
        });
        cameraMarkers.push(marker);
        // 将标注添加到地图中
        map.addOverlay(marker);
        map.panTo(new_point);
        removeMd5Input();
        // var len = $('#hjwz-camera-block .show-map-point').length;
        // $($('#hjwz-camera-block .show-map-point')[len - 1]).click();
    }
    //接收勘测通返回信息 获取exe传给页面的数据
    function receiveKctFilePath(filePath){
        /*var filePath3 = '[' +
            '{"fileNameLocal":"data.xml","fileNameRemote":"M00/00/0B/NJCDKBCJDBJC.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-0.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-1.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-2.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-3.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-4.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-5.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-6.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"K3502000000002017010026_bl-7.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},' +
            '{"fileNameLocal":"WIFI-K3502000000002017010026_bl-8.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false},'  +
            '{"fileNameLocal":"WIFI-K3502000000002017010026_bl-9.xml","fileNameRemote":"M00/00/0B/123456789.xml","isImage":false}'  +
            ']';*/
        var pathStr  = require('querystring').parse(filePath).result;
        // pathStr = filePath3;
        if(!pathStr){
            return;
        }
        var pathArray = str2obj(pathStr);
        var fileArray = [];
        pathArray.forEach(function (o, index) {
            var obj = {
                fileName: o.fileNameLocal,
                filePath: o.fileNameRemote,
                fileType: top.getKctFileType(o.fileNameLocal)
            };
            fileArray.push(obj);
        });
        if(!fileArray){
            $alert('没有文件导入');
            return;
        }
        //新增现场中基站和WiFi table数据显示
        var jzdata = fileArray.where('o=>o.fileType=="0"||o.fileType=="1"'),
            wifidata = fileArray.where('o=>o.fileType=="2"');
        $('#dzwz-jz-table>tbody').template(jzdata, function(item, i){
            if(item.fileType == '0'){
                item.fileTypeTxt = '动态';
            }else if(item.fileType == '1'){
                item.fileTypeTxt = '静态';
            }
        });
        $('#dzwz-wifi-table>tbody').template(wifidata);

        //将数量放在对应标签上
        $('.hjwz-tabs[param="dzwz"]').children('[param="jz"]').find('em').text(jzdata.length);
        $('.hjwz-tabs[param="dzwz"]').children('[param="wifi"]').find('em').text(wifidata.length);
        //将数据存放在table上
        $('#dzwz-jz-table').data('tableData', jzdata.select('o=>{category:"01",fileName:o.fileName,fileServerPath:o.filePath}'));
        $('#dzwz-wifi-table').data('tableData', wifidata.select('o=>{category:"01",fileName:o.fileName,fileServerPath:o.filePath}'));
        fileArray = null;
    }

    initHjwz();

    //痕迹物证块事件注册
    $('.main-content').on('click', '#add-scene-hjwz .hjwz-tabs>li', function(){
        //点击样式修改
        $(this).addClass('active').siblings('li').removeClass('active');

        var pTitle = $(this).parent().attr('param'), //获取点击块的title hjwz or dzwz
            theParam = $(this).attr('param'); //获取所属类型
        var dragBar = $('#{0}-{1}'.format(pTitle,theParam));//获取拖拽图片所在区域

        //内容区域的显示、隐藏
        dragBar.removeClass('hider').siblings().addClass('hider');

        if(pTitle == 'hjwz'){
            //图片拖拽初始化
            dragBar.sortable({
                items: "li:not(.add)",
                revert: true
            });
        }
    }).on('mouseenter', '#add-scene-hjwz .pic-detail', function(){
        $(this).find('.opt').fadeIn();
    }).on('mouseleave', '#add-scene-hjwz .pic-detail', function(){
        $(this).find('.opt').fadeOut();
    }).on('click', '.print-edit-pic', function(){
        // toast('调用指纹处理软件').warn();
        var data = $.extend({}, $(this).closest('li').data('picInfo'));
        var paramid = $(this).closest('.pic-detail').children('img').attr('paramId');
        var $li = $('.hjwz-content').find('img[paramId="{0}"]'.format(paramid)).closest('li');
        var type; // 掌纹处理 调用exe时，手印类型传PT参数  其他传LT
        if(data.materialEvidenceType && data.materialEvidenceType == '1103'){
            type = 'PT';
        }else{
            type = 'LT';
        }
        if(($li.children('.pic-detail').length / $li.length) == 1) {
            //调用下载服务器文件 到 本地路径
            top.downloadFilePlugin(data.attachmentId, function(resfilePath){
                //获取本地路径 调用指纹处理软件
                top.runPrintImgPlugin(type, resfilePath, function(filePath) {
                    var resStr = top.require('querystring').parse(filePath).result;
                    if (!resStr) {
                        return;
                    }
                    var resArr = str2obj(resStr);
                    resArr.each(function (o, i) {
                        if (o.fileNameLocal.indexOf('_preview') > -1) {
                            //如果是缩略图
                            data.uuid = getPicGuid('edit-print');
                            data.modifyAttachmentId = o.fileNameRemote;
                            $li.addClass('after-edit').append($compile(divHtml, data));
                        } else {
                            //如果是raw文件
                            data.rawAttachmentId = o.fileNameRemote;
                            //modifyFileMd5
                            data.modifyFileMd5 = o.md5;
                        }
                    });
                    delete data['uuid'];
                    $li.data('picInfo',data);
                });
            });
        }else{
            top.downloadFilePlugin(data.attachmentId, function(resfilePath){
                top.runPrintImgPlugin(type, resfilePath, function(filePath) {
                    var resStr = top.require('querystring').parse(filePath).result;
                    if (!resStr) {
                        return;
                    }
                    var resArr = str2obj(resStr);
                    resArr.each(function (o, i) {
                        if (o.fileNameLocal.indexOf('_preview') > -1) {
                            //如果是缩略图
                            data.modifyAttachmentId = o.fileNameRemote;
                        } else {
                            //如果是raw文件
                            data.rawAttachmentId = o.fileNameRemote;
                            //modifyFileMd5
                            data.modifyFileMd5 = o.md5;
                        }
                    });
                    $li.find('img:last').attr('src', fileServerPath+data.modifyAttachmentId);
                    $li.data('picInfo', data);
                });
            });
        }
    }).on('click', '.into-edit', function(){
        var data = $(this).closest('li').data('picInfo');//存放在li上
        var ulParam = $(this).closest('ul').attr('param');//获取修改的类型
        var order = $('#hjwz-'+ulParam+'>li:not(.add)').index($(this).closest('li')) + 1;
        var editType = ulParam == 'all' ? xchjwzlbDM.where('o=>o.value=="{0}"'.format(data.category))[0].key : ulParam;
        var uuid = $(this).closest('.pic-detail').children('img').attr('paramId');

        initEditInput(editType, $('#hjwz-'+editType+'-block'), data, order, uuid);
        if(editType == 'print'){
            $open('#hjwz-print-block', {width: 1000, title:'修改手印痕迹'});
        }else if(editType == 'foot'){
            $open('#hjwz-foot-block', {width: 1000, title:'修改足迹痕迹'});
        }else if(editType == 'bio'){
            $open('#hjwz-bio-block', {width: 1000, title:'修改DNA痕迹'});
        }else if(editType == 'tool'){
            $open('#hjwz-tool-block', {width: 1000, title:'修改工具痕迹'});
        }else if(editType == 'gun'){
            $open('#hjwz-gun-block', {width: 1000, title:'修改枪弹痕迹'});
        }else if(editType == 'special'){
            $open('#hjwz-special-block', {width: 1000, title:'修改特殊痕迹'});
        }else if(editType == 'drug'){
            $open('#hjwz-drug-block', {width: 1000, title:'修改毒化痕迹'});
        }else if(editType == 'physic'){
            $open('#hjwz-physic-block', {width: 1000, title:'修改理化痕迹'});
        }else if(editType == 'doc'){
            $open('#hjwz-doc-block', {width: 1000, title:'修改文检痕迹'});
        }else if(editType == 'elec'){
            $open('#hjwz-elec-block', {width: 1000, title:'修改电子痕迹'});
        }else if(editType == 'video'){
            $open('#hjwz-video-block', {width: 1000, title:'修改视频痕迹'});
        }else if(editType == 'others'){
            $open('#hjwz-others-block', {width: 1000, title:'修改其他痕迹'});
        }
    }).on('click', '.into-del', function(){
        var len = $(this).closest('li').children('.pic-detail').length;
        var uuid = $(this).closest('.pic-detail').find('img').attr('paramId');
        var $li = $('.hjwz-content').find('img[paramId="{0}"]'.format(uuid)).closest('li');
        var allEm = $('.hjwz-tabs[param="hjwz"]').children('[param="all"]').find('em'),
            theEm = '';
        var data = $li.data('picInfo'), $ul = $('#hjwz-all');
        $ul.data('delId') ? null : $ul.data('delId', []);
        $li.parent().each(function(i, item){
            if($(item).attr('param')!='all'){
                theEm = $('.hjwz-tabs[param="hjwz"]').children('[param="'+$(item).attr('param')+'"]').find('em');
            }
        });
        if(len > 1){
            //存在修改图
            if(uuid.indexOf('edit-') > -1){
                //删除的是修改图
                $li.removeClass('after-edit');
                $li.find('img[paramId="{0}"]'.format(uuid)).closest('.pic-detail').remove();
            }else{
                //删除的是原图，修改图一起删除
                if(data.id){
                    // $ul.data('delId', $ul.data('delId').push(data.id));
                    $ul.data('delId').push(data.id)
                }
                $li.remove();
                allEm.text(parseInt(allEm.text()) - 1);
                theEm.text(parseInt(theEm.text()) - 1);
            }
        }else{
            //只要原图
            if(data.id){
                // $ul.data('delId', $ul.data('delId').push(data.id));
                $ul.data('delId').push(data.id)
            }
            $li.remove();
            allEm.text(parseInt(allEm.text()) - 1);
            theEm.text(parseInt(theEm.text()) - 1);
        }
    }).on('click', '#add-scene-hjwz .into-add-print', function(){
        intoAddPrint();
    }).on('click', '#add-scene-hjwz .into-add-foot', function(){
        intoAddFoot();
    }).on('click', '#add-scene-hjwz .into-add-bio', function(){
        intoAddBio();
    }).on('click', '#add-scene-hjwz .into-add-tool', function(){
        intoAddTool();
    }).on('click', '#add-scene-hjwz .into-add-gun', function(){
        intoAddGun();
    }).on('click', '#add-scene-hjwz .into-add-special', function(){
        intoAddSpecial();
    }).on('click', '#add-scene-hjwz .into-add-drug', function(){
        intoAddDrug();
    }).on('click', '#add-scene-hjwz .into-add-physic', function(){
        intoAddPhysic();
    }).on('click', '#add-scene-hjwz .into-add-doc', function(){
        intoAddDoc();
    }).on('click', '#add-scene-hjwz .into-add-elec', function(){
        intoAddElec();
    }).on('click', '#add-scene-hjwz .into-add-video', function(){
        intoAddVideo();
    }).on('click', '#add-scene-hjwz .into-add-others', function(){
        intoAddOthers();
    }).on('click', '#add-scene-hjwz .into-add-camera', function(){
        intoAddCamera();
    }).on('click', '#add-scene-hjwz .dzwz-into-map', function(){
        //摄像头 进入地图
        intoAddCamera();
    }).on('click', '#add-scene-hjwz .dzwz-into-add-pic', function(){
        //摄像头 导入图片
        var $input = $(this).children('input');
        var uuid = $(this).attr('uuid');
        $input.on('change', function() {
            addScene.uploadImg($input.get(0), function(res){
                var tb = $('#dzwz-camera-table');
                cameraInfo.where('o=>o.uuid=="{0}"'.format(uuid))[0].attachmentId = res.data.fileNameRemote;
                tb.children('tbody').template(cameraInfo);
                tb.data('tableData', cameraInfo.select('o => {cameraName:o.cameraName, cameraType:o.cameraType, cameraOrientation:o.cameraOrientation, longitude:o.longitude, latitude:o.latitude,attachmentId:o.attachmentId}'));
                //注册查看图片
                tb.find('.dzwz-into-view-pic').previewBox('picSrc');
            });
        });
    }).on('click', '#add-scene-hjwz .into-add-jz', function(){
        top.runKctPlugin(receiveKctFilePath);
    }).on('click', '.into-jz-view', function(){
        var hjwzJzDetailAct = makeAct('sceneCollecting/basestationInfo/queryAll');

        var $qb = $('#hjwz-jz-detail-block');
        var attachmentId = $(this).attr('attachmentId'),
            fileName = $(this).attr('fileName');

        if(attachmentId) {
            $post(hjwzJzDetailAct, {
                investigationId: investigationId,
                attachmentId: attachmentId,
                fileName: fileName
            }, function (res) {
                if (fileName == 'data.xml') {
                    //静态
                    $qb.children('ul').show();
                    $qb.children('.jz-tbs').show();
                    $qb.children('#jz-dynamic').hide();
                    var titles = [];
                    res.data.each(function (item, i) {
                        titles.push(item.name);
                    });
                    $qb.children('.jz-static').template(titles);
                    $qb.children('.jz-tbs').template(res);

                    $qb.children('ul').children('li:first').addClass('active');
                    $qb.children('.jz-tbs').children('table:first').show();
                } else {
                    //动态
                    $qb.children('ul').hide();
                    $qb.children('.jz-tbs').hide();
                    $qb.children('#jz-dynamic').show().children('tbody').template(res.data);
                }
                $open('#hjwz-jz-detail-block', {width: 800, title: '基站详细信息'});
            });
        }else{
            toast(' 该基站还未入库，不能进行查看').width(300).warn();
        }

    }).on('click', '#add-scene-hjwz .into-dzwz-jz-del', function(){
        var $tb = $('#dzwz-jz-table');
        var _index = $(this).closest('tr').index($tb.children('tbody').children('tr'));
        var id = $(this).attr('paramid');
        var data = $tb.data('tableData');
        //修改删除
        $tb.data('delId') ? null : $tb.data('delId', []);
        id && $tb.data('delId').push(id);

        data.splice(_index, 1);
        $tb.data('tableData', data);
        //数量修改
        $('.hjwz-tabs[param="dzwz"]').children('[param="jz"]').find('em').text(data.length);
        //table remove tr
        $(this).parent().parent().remove();//remove tr
    }).on('click', '#add-scene-hjwz .into-add-wifi', function(){
        top.runKctPlugin(receiveKctFilePath);
    }).on('click', '#add-scene-hjwz .into-dzwz-wifi-del', function(){
        var $tb = $('#dzwz-wifi-table');
        var _index = $(this).closest('tr').index($tb.children('tbody').children('tr'));
        var id = $(this).attr('paramid');
        var data = $tb.data('tableData');
        //修改删除
        $tb.data('delId') ? null : $tb.data('delId', []);
        id && $tb.data('delId').push(id);

        data.splice(_index, 1);
        $tb.data('tableData', data);
        //数量修改
        $('.hjwz-tabs[param="dzwz"]').children('[param="wifi"]').find('em').text(data.length);
        //table remove tr
        $(this).parent().parent().remove();//remove tr
    });

    //勘验人点击事件
    $('.hjwz-open-block').on('click', '.tqr-info-fill li', function(){
        var $this = $(this);
        if($this.hasClass('active')){
            $this.removeClass('active');
        }else{
            $this.addClass('active');
        }
    });

    //新增指纹事件注册
    $('#hjwz-print-block').on('click', '#print-cancel', function(){
        var $div = $('#hjwz-print-block');
        $div.$close();
        removeMd5Input();
    }).on('click', '#add-print-save', function(){
        saveOpt('add', 'print')
    }).on('click', '#add-print-save2', function(){
        var bol = saveOpt('add', 'print');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddPrint();}
    }).on('change','#print-pic-file', function(){
        addScene.uploadImg(byid('print-pic-file'), function(res){
            $('#print-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#print-handle', function(){
        if($('#print-pic-src').val() == ''){
            toast('请先上传照片').warn();
            return false;
        }
        var type = 'LT'; // 掌纹处理 调用exe时，手印类型传PT参数  其他传LT
        $('#add-print-type').val() == '1103' ? type = 'PT' : type = 'LT';
        top.downloadFilePlugin($('#print-pic-src').val(), function(resfilePath){
            top.runPrintImgPlugin(type, resfilePath, function(filePath){
                var resStr = top.require('querystring').parse(filePath).result;
                if(!resStr){
                    return;
                }
                var resArr = str2obj(resStr);
                resArr.each(function(o, i){
                    if(o.fileNameLocal.indexOf('_preview') > -1){
                        //如果是缩略图
                        $('#hjwz-print-block').children('input[name="modifyAttachmentId"]').val(o.fileNameRemote);
                    }else{
                        //如果是raw文件
                        $('#hjwz-print-block').children('input[name="rawAttachmentId"]').val(o.fileNameRemote);
                        //modifyFileMd5
                        $('#hjwz-print-block').children('input[name="modifyFileMd5"]').val(o.modifyFileMd5);
                    }
                });
            });
        });
    }).on('click', '#edit-print-save', function(){
        saveOpt('edit', 'print')
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //足迹弹窗注册事件
    $('#hjwz-foot-block').on('click', '#foot-cancel', function(){
        $('#hjwz-foot-block').$close();
        removeMd5Input();
    }).on('click', '#add-foot-save', function(){
        saveOpt('add', 'foot');
    }).on('click', '#add-foot-save2', function(){
        var bol = saveOpt('add', 'foot');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddFoot();}
    }).on('change', '#foot-pic-file', function(){
        addScene.uploadImg(byid('foot-pic-file'), function(res){
            $('#foot-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-foot-save', function(){
        saveOpt('edit', 'foot');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //生物弹窗注册事件
    $('#hjwz-bio-block').on('click', '#bio-cancel', function(){
        $('#hjwz-bio-block').$close();
        removeMd5Input();
    }).on('click', '#add-bio-save', function(){
        saveOpt('add', 'bio');
    }).on('click', '#add-bio-save2', function(){
        var bol = saveOpt('add', 'bio');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddBio();}
    }).on('change', '#bio-pic-file', function(){
        addScene.uploadImg(byid('bio-pic-file'), function(res){
            $('#bio-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-bio-save', function(){
        saveOpt('edit', 'bio');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //工具弹窗注册事件
    $('#hjwz-tool-block').on('click', '#tool-cancel', function(){
        $('#hjwz-tool-block').$close();
        removeMd5Input();
    }).on('click', '#add-tool-save', function(){
        saveOpt('add', 'tool');
    }).on('click', '#add-tool-save2', function(){
        var bol = saveOpt(add, 'tool');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddTool();}
    }).on('change', '#tool-pic-file', function(){
        addScene.uploadImg(byid('tool-pic-file'), function(res){
            $('#tool-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-tool-save', function(){
        saveOpt('edit', 'tool');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //枪弹弹窗注册事件
    $('#hjwz-gun-block').on('click', '#gun-cancel', function(){
        $('#hjwz-gun-block').$close();
        removeMd5Input();
    }).on('click', '#add-gun-save', function(){
        saveOpt('add', 'gun');
    }).on('click', '#add-gun-save2', function(){
        var bol = saveOpt('add', 'gun');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddGun();}
    }).on('change', '#gun-pic-file', function(){
        addScene.uploadImg(byid('gun-pic-file'), function(res){
            $('#gun-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-gun-save', function(){
        saveOpt('edit', 'gun');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //特殊弹窗注册事件
    $('#hjwz-special-block').on('click', '#special-cancel', function(){
        $('#hjwz-special-block').$close();
        removeMd5Input();
    }).on('click', '#add-special-save', function(){
        saveOpt('add', 'special');
    }).on('click', '#add-special-save2', function(){
        var bol = saveOpt('add', 'special');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddSpecial();}
    }).on('change', '#special-pic-file', function(){
        addScene.uploadImg(byid('special-pic-file'), function(res){
            $('#special-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-special-save', function(){
        saveOpt('edit', 'special');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //毒化弹窗注册事件
    $('#hjwz-drug-block').on('click', '#drug-cancel', function(){
        $('#hjwz-drug-block').$close();
        removeMd5Input();
    }).on('click', '#add-drug-save', function(){
        saveOpt('add', 'drug');
    }).on('click', '#add-drug-save2', function(){
        var bol = saveOpt('add', 'drug');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddDrug();}
    }).on('change', '#drug-pic-file', function(){
        addScene.uploadImg(byid('drug-pic-file'), function(res){
            $('#drug-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-drug-save', function(){
        saveOpt('edit', 'drug');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //理化弹窗注册事件
    $('#hjwz-physic-block').on('click', '#physic-cancel', function(){
        $('#hjwz-physic-block').$close();
        removeMd5Input();
    }).on('click', '#add-physic-save', function(){
        saveOpt('add', 'physic');
    }).on('click', '#add-physic-save2', function(){
        var bol = saveOpt('add', 'physic');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddPhysic();}
    }).on('change', '#physic-pic-file', function(){
        addScene.uploadImg(byid('physic-pic-file'), function(res){
            $('#physic-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-physic-save', function(){
        saveOpt('edit', 'physic');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //文检弹窗注册事件
    $('#hjwz-doc-block').on('click', '#doc-cancel', function(){
        $('#hjwz-doc-block').$close();
        removeMd5Input();
    }).on('click', '#add-doc-save', function(){
        saveOpt('add', 'doc');
    }).on('click', '#add-doc-save2', function(){
        var bol = saveOpt('add', 'doc');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddDoc();}
    }).on('change', '#doc-pic-file', function(){
        addScene.uploadImg(byid('doc-pic-file'), function(res){
            $('#doc-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-doc-save', function(){
        saveOpt('edit', 'doc');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //电子弹窗注册事件
    $('#hjwz-elec-block').on('click', '#elec-cancel', function(){
        $('#hjwz-elec-block').$close();
        removeMd5Input();
    }).on('click', '#add-elec-save', function(){
        saveOpt('add', 'elec');
    }).on('click', '#add-elec-save2', function(){
        var bol = saveOpt('add', 'elec');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddElec();}
    }).on('change', '#elec-pic-file', function(){
        addScene.uploadImg(byid('elec-pic-file'), function(res){
            $('#elec-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-elec-save', function(){
        saveOpt('edit', 'elec');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //视频弹窗注册事件
    $('#hjwz-video-block').on('click', '#video-cancel', function(){
        $('#hjwz-video-block').$close();
        removeMd5Input();
    }).on('click', '#add-video-save', function(){
        saveOpt('add', 'video');
    }).on('click', '#add-video-save2', function(){
        var bol = saveOpt('add', 'video');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddVideo();}
    }).on('change', '#video-pic-file', function(){
        addScene.uploadImg(byid('video-pic-file'), function(res){
            $('#video-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-video-save', function(){
        saveOpt('edit', 'video');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //其他弹窗注册事件
    $('#hjwz-others-block').on('click', '#others-cancel', function(){
        $('#hjwz-others-block').$close();
        removeMd5Input();
    }).on('click', '#add-others-save', function(){
        saveOpt('add', 'others');
    }).on('click', '#add-others-save2', function(){
        var bol = saveOpt('add', 'others');
        //新增验证不通过，会return false；当验证通过时，不会返回任何内容
        if(bol == undefined){intoAddOthers();}
    }).on('change', '#others-pic-file', function(){
        addScene.uploadImg(byid('others-pic-file'), function(res){
            $('#others-pic-src').val(res.data.fileNameRemote);
        });
    }).on('click', '#edit-others-save', function(){
        saveOpt('edit', 'others');
    }).on('click', '.take-goods-flag', function(){
        var checked = $(this).prop('checked');
        var $tqwpInfo = $(this).parent().next('.tqwp-info');
        if(checked){
            $tqwpInfo.removeClass('hide');
        }else{
            $tqwpInfo.addClass('hide');
            $tqwpInfo.find(':text').val('');
            $tqwpInfo.find('div[dict-type="radio"]').find('input:first').prop('checked', true);
        }
    });

    //摄像头打点弹窗注册事件
    $('#hjwz-camera-block').on('click', 'u', function(){
        $(this).addClass('active').siblings('u').removeClass('active');
    }).on('click', '.del-camera', function(){
        var uuid = $(this).attr('uuid');
        var index = cameraInfo.select('o => o.uuid').indexOf(uuid);
        var _index = $(this).closest('tr').index();
        if(index > -1){
            //删除摄像头时，需要判断有没有id 有ID表示需要从后台进行删除
            $('#dzwz-camera-table').data('delId') ? null : [];
            var tobj = cameraInfo.where('o => o.uuid == "{0}"'.format(uuid))[0];
            var tid = tobj.id;
            if(tid){
                $('#dzwz-camera-table').data('delId').push(tid);
            }
            cameraInfo.splice(index, 1);
            $('#camera-result-tb').children('tbody').template(cameraInfo);
            //判断地图上是否存在删除的标注点 如果存在需要删除
            var allOverlay = map.getOverlays();
            var tflag = true;
            allOverlay.forEach(function(item){
                if(tflag
                    && item.toString() == '[object Marker]'
                    && tobj.longitude == item.getPosition().lng
                    && tobj.latitude == item.getPosition().lat){
                    //在地图中删除该标注点
                    map.removeOverlay(item);
                    tflag = false;
                }
            });

            cameraMarkers.splice(_index, 1);
        }
    }).on('click', '.show-map-point', function(){
        //点击摄像头名称，在地图中显示标注点
        var uuid = $(this).attr('uuid'), lng = $(this).attr('lng'), lat = $(this).attr('lat');
        //设置标注点为摄像头图片
        // var cameraIcon = new BMap.Icon('../img/icon/on-camera.png', new BMap.Size(32,32));
        //设置中心点
        // var new_point = new BMap.Point(lng, lat);
        //创建标注
        // var marker = new BMap.Marker(new_point,{icon:cameraIcon});
        // 创建信息窗口对象
        var infoWindow = new BMap.InfoWindow($compile(sContentHtml, cameraInfo.where('o=>o.uuid=="{0}"'.format(uuid))));
        // 将标注添加到地图中
        // map.addOverlay(marker);
        // map.panTo(new_point);
        // marker.addEventListener('click', function(){
        //     this.openInfoWindow(infoWindow);
        //     event.stopPropagation();
        // });

        var _index = $(this).closest('tr').index();
        cameraMarkers[_index].openInfoWindow(infoWindow);
        //将地图移到指定点
        map.panTo(new BMap.Point(lng, lat));

    }).on('click', '.zoom-in:not(.disabled)', function(){
        var zoom = map.getZoom();
        $('.map-opt-btn').removeClass('disabled');
        map.setZoom(zoom + 1);
        if(zoom + 1 == 18){
            $(this).addClass('disabled');
        }
    }).on('click', '.zoom-out:not(.disabled)', function(){
        var zoom = map.getZoom();
        $('.map-opt-btn').removeClass('disabled');
        map.setZoom(zoom - 1);
        if(zoom - 1 == 12){
            $(this).addClass('disabled');
        }
    }).on('click', '#menu-opt', function(){
        $('#hjwz-camera-block>.camera-result-list').toggleClass('-right350');
    });

    //摄像头打点新增弹窗
    $('#hjwz-add-camera').on('click', '#camera-cancel', function () {
        removeMd5Input();
    }).on('click', '#add-camera-save', function(){
        saveCamera();
    }).on('change', '#camera-pic-file', function(){
        addScene.uploadImg(byid('camera-pic-file'), function(res){
            $('#camera-pic-src').val(res.data.fileNameRemote);
        })
    });

    //基站详情页面点击事件
    $('#hjwz-jz-detail-block').on('click', '.cm-close-btn', function(){
        $('#hjwz-jz-detail-block').$close();
    }).on('click', '.jz-static>li', function(){
        var param = $(this).attr('param');
        $(this).addClass('active').siblings('li').removeClass('active');
        $('#hjwz-jz-detail-block>.jz-tbs>table[param="{0}"]'.format(param)).show().siblings('table').hide();
    });
    /*end*/

    /*---------------xiong mao lao shi-------------------------*/
    //案件性质根据案件类别联动
    window.getCaseNatureByCaseType = function(caseType,cb) {
        $post(getCmDataAction,{"dictType":"AJXZDM","caseType":caseType},function (res) {
            typeof cb == 'function' && cb(res.data);
        },false);
    };
    function init() {
        $('#ectb-case-type-dict').dict(function () {
            getCaseNatureByCaseType($('#ectb-case-type').val(),function (data) {
                $('#ectb-case-nature-dict').dict(null,data);
            });
        });
        $('#edit-case-type-block').$open({width:800,title:'新建现场'});
//            getInputTpData(function () {
//                $('.dict').dict();
//                $('.cm-input-date').datepicker();
//                $('.map-btn').mappicker(function(data){
//                    byid('lng-ipt').value=data.lng;
//                    byid('lat-ipt').value=data.lat;
//                });
//                getTextTpSource();
//            });
    }

    //获取录入项配置数据
    function getInputTpData(caseTypeVal,caseTypeChVal,caseNatureVal,caseNatureChVal,cb){
        typeof caseTypeVal == 'function' && (cb = caseTypeVal);
        typeof caseTypeChVal == 'function' && (cb = caseTypeChVal);
        $post(getInputTpDataAction,caseTypeVal,function (res) {
            var data = res.data;
            var content = str2obj(data.content).select(function (o) {
                o[o.lable]=o.isOpen;
                o[o.lable+"m"]=o.must;
                return o;
            });
            // 正确实例 'o => o[o.lable]=o.isOpen,o[o.lable+"m"]=o.must,o');
            // 错误实例 {[o.lable]:o.isOpen,[o.lable+"m"]:o.must}');
            var contentObj = {};
            content.each(function (item) {
                contentObj = $.extend(contentObj,item);
            });
            contentObj.caseTypeKey = caseTypeVal || '';
            contentObj.caseTypeValue = caseTypeChVal || '';
            contentObj.caseNatureKey = caseNatureVal || '';
            contentObj.caseNatureValue = caseNatureChVal || '';
            $('.main-content').template(contentObj);
            $('.form-box').data('tpId',data.id);
            typeof cb == 'function' && cb();
        },false);
    }
    function getInputTpDataCb() {
        //初始化案件类别、案件性质字典
        $('#ectb-case-type-dict').dict(function () {
            getCaseNatureByCaseType($('#ectb-case-type').val(),function (data) {
                $('#ectb-case-nature-dict').dict(null,data);
                $('.cus-vl-invalid').removeClass('cus-vl-invalid');
            });
        });
        addScene.dictInit();    //字典初始化
        $('.cm-input-date').datepicker();

        $('.map-btn').mappicker(function(data){
            byid('lng-ipt').value=data.lng;
            byid('lat-ipt').value=data.lat;
        });
        getTextTpSource();
    }
    //获取文本模板数据
    function getTextTpSource(caseType) {
        $post(getTextTpSourceAction,{"caseType": caseType || ''},function(res){
            var $tpWrap = $('.tp-wrap.scene-text-tp');
            var tpData = res.data;

            $get(getTextTpCateAction,{},function (cateRes) {
                $tpWrap.each(function(i,el){
                    var $el = $(el);
                    var textTpCateArr = [];
                    var tempArr = [];
                    var textTpTypeName = $el.prev('span').html().replace(/.*?\/\w+>|[:\s]/g,'');
                    textTpCateArr = cateRes.data.select('o=>{key:o.key,value:o.value}');
                    tempArr = textTpCateArr.where('o=>o.value=="{0}"'.format(textTpTypeName));
                    tempArr.length && (tempArr = tpData.where('o=>o.templateType=="{0}"'.format(tempArr[0].key)));
                    tempArr.length && $el.children('.tp-header').template({data:tempArr});//.find('.icon-file-alt:first-child').trigger('click');
                });
            },false);

        },false);
    }

    //导航随锚点滚动
    $(window).scroll(function () {
        var scrollTop = $body.scrollTop();
        $('.main-content-block').each(function (i,ele) {
            var $ele = $(ele);
            var posi = $ele.offset().top-scrollTop;
            if(posi<=200 && posi>=0){
                $('a[href="#{0}"]'.format($ele.prop('id'))).click();
            }
        });
        if(scrollTop+window.height>=$body.height()){
            $('a[href="#add-scene-stxx"]').click();
        }
    });
    //导航点击效果
    $('.main-nav').on('click','li',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
   /* //报案人||被害人 类型字典
    var sceneOffenderType = $('<dict dict-root="SARYLBDM" empty="false" dict-type="select" dict-name="sceneOffenderType" class="unready dict"></dict>').dict();
*/
    //案情信息点击事件
    $('.main-content').on('click','#aqxx-ajlb',function () {//点击案件类别编辑  ,.main-content
        $confirm('修改案件类别需同步修改案件性质，并且会清空案件类别、案件性质相关的模板生成信息。<br><br>确定要修改么？',function (bol) {
            if(bol){
                $('#edit-case-type-block').$open({width:800,title:'新建现场'});
            }
        }).width(400);
    }).on('click','#aqxx-ajxz',function () {//点击案件性质编辑
        $confirm('修改案件性质会清空案件性质相关的模板生成信息。<br><br>确定要修改么？',function (bol) {
            if(bol){
                var $em = $('#aqxx-ajxz').prev('em');
                var val = $em.attr('data-val');
                var valCh = $em.html();
                val && $('[dict-root="AJXZDM"]').dictSelect(val.split(','));
                $('#edit-case-nature-block').data('keyVal', {valStr:val,valChStr: valCh}).$open({width:800,title:'案件性质'});
            }
        });
    }).on('click','label[for="aqxx-zpfs-dh"]',function () {//点击指派方式电话
        var $zpbgdw = $('#aqxx-zpbgdw');
        $zpbgdw.val('110指挥中心').next('u.options').children('u:first-child').addClass('active').siblings().removeClass('active');
    }).on('click','label[for="aqxx-zpfs-bg"]',function () {//点击指派方式报告

        var $zpbgdw = $('#aqxx-zpbgdw');
        $zpbgdw.val('{0}110值班室'.format('')).next('u.options').children('u:nth-child(2)').addClass('active').siblings().removeClass('active');//TODO:当前用户单位

    }).on('click','#aqxx-zpbgdw+u.options>u',function () {//点击指派/报告单位的赋值选项卡

        var $this = $(this);

        $('#aqxx-zpbgdw').val($this.addClass('active').html());
        $this.siblings().removeClass('active');

    }).on('click','.tp-wrap.scene-text-tp .icon-trash',function () {//点击模板清空按钮

        var $this = $(this);

        $this.parent().next('textarea').val('');
        $this.prev('.current-tp').html('未使用模板');
        $this.parent().find('.icon-file-alt').removeClass('active');

    }).on('click','.tp-wrap.scene-text-tp .icon-file-alt',function () {
        var $this = $(this);
        var $thisP = $this.parent();
        var tpContent = $this.attr('tpcontent');
        tpContent && (tpContent = tpContent.replace(/\$#.*?#\$/g,function (match) {
            var dataField = /\$#(.*?)#\$/.exec(match)[1];
            var fieldVal = getFormVal($('.main-content').find('[data-field="{0}"]'.format(dataField)),true);

            fieldVal = typeof fieldVal=='object' ? fieldVal.where('o=>o.name!=undefined').select('o=>o.name').join(','):fieldVal;

            return fieldVal || '';
        }));
        $this.addClass('active').siblings().removeClass('active');
        $thisP.parent().siblings('textarea').val(tpContent);
        $thisP.siblings('.current-tp').html($this.attr('tpname'));
    }).on('click','#add-scene-aqxx .remove-tr',function () {
        var $this = $(this);
        var id = $this.closest('tr').attr('data-id');
        $this.closest('table').data('delId') || $this.closest('table').data('delId', []);
        var delId = $this.closest('table').data('delId');
        id && delId.push(id);
        $this.closest('table').data('delId', delId);
        $this.parent().parent().remove();
    }).on('click','.ajxx-add-tr',function () {

        $(this).next('table').children('tbody').append($compile('#bar-bhr-tr-tp',{arr:localData.get('aqxx-peopletype')}));
    }).on('click','.next-page-btn',function () {

        $(this).closest('.main-content-block').next('.main-content-block')[0].scrollIntoView();
    }).on('blur','[data-options="required:true"]',function () {
        // $(this).validatebox();
    }).on('click','#aqxx-pol-case-reuse',function () {
        //aqxx-alarm-no aqxx-case-no aqxx-case-location aqxx-alarm-receiver
        // $confirm('是否复用执法办案系统信息？',function (bol) {
            var alarmNo = '',caseNo = '',caseLocation = '',alarmReceiver = '',src='';
            // if(bol){
                alarmNo = $('#aqxx-alarm-no').val();
                caseNo = $('#aqxx-case-no').val();
                caseLocation = $('#aqxx-case-location').val();
                alarmReceiver = $('#aqxx-alarm-receiver').val();
                src = 'pol-case-reuse.html?alarmNo={0}&caseNo={1}&caseLocation={2}&alarmReceiver={3}'.format(alarmNo,caseNo,caseLocation,alarmReceiver);
                $append(getViewPath(src,'./view/'),'警情复用',true);
        //     }
        // });
    }).on('click','.minus-num',function () {
        var $this = $(this);
        var $input = $this.next('input');
        var val = parseInt($input.val());

        !isNaN(val) && val>0 && $input.val(val-1);
        $input.val() == '0' && $this.addClass('silver');
    }).on('click','.plus-num',function () {
        var $this = $(this);
        var $input = $this.prev('input');
        var val = parseInt($input.val());

        !isNaN(val) && $input.val(val+1);
        $input.val() == '1' && $this.prevAll('.minus-num').removeClass('silver');
    });
    $body.on('x-change',function (e,selector,val) {
        var $ele = typeof selector == 'string' ? $(selector) : selector;
//            var operation = '';
//            $ele.each(function (i,el) {
//                val = el.tagName == 'EM'?el.innerHTML:val;
//                operation = val?'removeClass':'addClass';
//                $(el)[operation]('cus-vl-invalid');
//            });
        var operation = val?'removeClass':'addClass';
        $ele[operation]('cus-vl-invalid');
        if($ele.attr('id')=='ectb-case-type-dict'){
            getCaseNatureByCaseType($('#ectb-case-type').val(),function (data) {
                $('#ectb-case-nature-dict').dict(null,data);
            });
        }
    });
    //案件类别
    //确定
    $('#edit-case-type-block').on('click','#ectb-confirm-btn',function () {
        var $caseType = $('#ectb-case-type');
        var $caseNature = $('#ectb-case-nature');
        var caseTypeVal = $caseType.val();
        var caseTypeChVal = $caseType.attr('data-chval');
        var caseNatureVal = $caseNature.val();
        var caseNatureChVal = $caseNature.attr('data-chval');

        // $('#aqxx-ajlb').prev('em').attr('data-val',caseTypeVal).html(caseTypeChVal);
        // $('#aqxx-ajxz').prev('em').attr('data-val',caseNatureVal).html(caseNatureChVal);

        getInputTpData(caseTypeVal,caseTypeChVal,caseNatureVal,caseNatureChVal,getInputTpDataCb);
        addScene.setCache(setCache);
//            $body.trigger('x-change',[$('#aqxx-ajlb,#aqxx-ajxz').prev('em')]);
        $('#edit-case-type-block').$close();
    }).on('click','#ectb-cancel-btn',function () {
        //取消
        $('#edit-case-type-block').$close();
    });
    //案件性质
    //确定
    $('#edit-case-nature-block').on('click','#ecnb-confirm-btn',function () {
        var $caseNature = $('#ecnb-case-nature');
        var $ajxz = $('#aqxx-ajxz');
        var $ajxzSpan = $ajxz.closest('.cus-vl-invalid');

        $ajxz.prev('em').prop('title', $caseNature.attr('data-chval')).attr('data-val',$caseNature.val()).html($caseNature.attr('data-chval').overStrEllipsis());
        $caseNature.val()?$ajxzSpan.removeClass('cus-vl-invalid'):$ajxzSpan.addClass('cus-vl-invalid');
        $('#edit-case-nature-block').$close();
    }).on('click','#ecnb-cancel-btn',function () {
        //取消
        var $em = $('#ecnb-case-nature');
        var $ele = $('#edit-case-nature-block');
        var keyVal = $ele.data('keyVal');
        var val = keyVal.valStr;
        var valCh = keyVal.valChStr;
        $em.val(val);
        $em.attr('data-chval', valCh);
        $ele.$close();
    });
    //案情信息配置常用项
    $('.main-content').on('click','.aqxx-common-use',function () {
        var $this = $(this);
        openCommonUseWin($this);
    });
    $('#edit-case-type-block').on('click','.ectb-set-common-use',function () {
        var $this = $(this),paramObj = {};
        $this.attr('root')=='AJXZ' && (paramObj.caseType = $('#ectb-case-type').val());
        paramObj.type = 'recommend';
        openCommonUseWin($this,paramObj);
    });
    $('#edit-case-nature-block').on('click','.ecnb-set-common-use',function () {
        var $this = $(this),paramObj = {};
        paramObj.caseType = $('#aqxx-ajlb-em').attr('data-val');
        paramObj.type = 'recommend';
        openCommonUseWin($this,paramObj);
    });
    function openCommonUseWin(linkObj,paramObj) {
        var dictRoot = linkObj.prev('[dict-root]').attr('dict-root');
        var dictTitle = linkObj.prevAll('span').html().replace(/.*?\/\w+>|[:\s]/g,'');

        paramObj = paramObj || {};

        $('.transparent-mask').removeClass('hider');
        linkObj.webuiPopover('destroy').webuiPopover($.extend(iframeSetting,{url:getSrcPath('set-common-use.html')+'?dictType={0}&linkId={1}&dictTitle={2}&type={3}&caseType={4}'.format(dictRoot,linkObj.attr('id'),dictTitle,paramObj.type,paramObj.caseType)}));
    }

    /*原add-scene-batch-import.js */
    //存放轮播图片数组
    var nodes = {
        'fwt': [],
        'pmt': [],
        'gmfwzp': [],
        'zdbwzp': [],
        'xmzp': [],
        'print': [],
        'foot':[],
        'bio':[],
        'tool':[],
        'video':[],
        'gun':[],
        'drug':[],
        'physic':[],
        'doc':[],
        'elec':[],
        'qtxct': []
    };
    //现场痕迹物证类别代码
    var xchjwzlbDM = [
        {'key':'print', 'value':'1'},
        {'key':'foot', 'value':'2'},
        {'key':'tool', 'value':'3'},
        {'key':'gun', 'value':'4'},
        {'key':'bio', 'value':'6'},
        {'key':'drug', 'value':'7'},
        {'key':'physic', 'value':'8'},
        {'key':'doc', 'value':'9'},
        {'key':'elec', 'value':'10'},
        {'key':'video', 'value':'11'}
    ];
    //进入批量修改的类型
    var batchEditType = '';


    /**
     *
     * @param fileList
     * @param type
     * @param cb
     * @returns {boolean}
     */
    var doDropUp = function(file,type){
        var $this = $(this);
        // var fileLists = fileList.files
        // var formdata = new FormData();
        //检测是否是拖拽文件到页面的操作
        // if(fileList.length == 0) {
        //     return false;
        // }
        //图片在浏览器上显示 并添加到上传数据对象
        // for (var i = 0; i < fileList.length; i++) {
        //     var file = fileList[i];
        //     //类型检测
        //     if(file.type.indexOf('image') === -1){
        //         alert("您拖的文件存在除图片以外的文件！");
        //         return false;
        //     }
        //     //大小限制
        //     if (file.size > 5*1024*1024) {
        //         $alert('单张图片大小超过5M， 上传速度将过慢，请压缩后重新上传');
        //         break;
        //     }
        window.uploadFile(file, function(res){
            // var t_src = top.sysParams.fileServerPath+'/'+res.data.fileNameRemote;
            var obj = {
                'batchImportId':getGuid(),
                'type':type,
                'attachmentId':res.data.fileNameRemote,
                'src':top.sysParams.fileServerPath+'/'+res.data.fileNameRemote,
                'md5': res.data.md5 || ''
            };
            if(type=='fwt') {
                obj.category = '1';
                obj.pictureType = '1082';   //地图方位示意图的代码
                obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                obj.description = '';
            } else if(type == 'pmt') {
                obj.category = '1';
                obj.pictureType = '2010';   //平面比例图的代码
                obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                obj.description = '';
            } else if(type=='gmfwzp') {
                obj.category = '2';
                obj.pictureType = '1';   //概貌&方位的代码
                obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                obj.description = '';
            } else if(type=='zdbwzp') {
                obj.category = '2';
                obj.pictureType = '3';   //重点部位的代码
                obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                obj.description = '';
            } else if(type=='xmzp') {
                obj.category = '2';
                obj.pictureType = '4';   //细目的代码
                obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                obj.description = '';
            } else if(type=='qtxct') {
                obj.category = '1';
                obj.pictureType = '';   //代码
                obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                obj.description = '';
            }
            nodes[type].push(obj);
            if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type=='qtxct'){
                //显示在其他区域
                var tnodes = [];
                tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'],nodes['qtxct']);
                slick($this, tnodes, 4);
            }else {
                slick($this, nodes[type]);
            }
        }, true);
        /*formdata.append('myfile', file);
         $.ajax({
         url: "http://192.168.1.211:53000/api/file/upload",
         type: "POST",
         data: formdata,
         contentType: false,
         processData: false,
         success: function (data) {
         console.log(data);
         var t_src = 'http://192.168.1.211:53000/api/file/download/'+data.fileId+'?preview=true';
         nodes[type].push({
         'batchImportId':getGuid(),
         'type':type,
         'attachmentId':t_src
         });
         if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec'){
         //显示在其他区域
         var tnodes = [];
         tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec']);
         slick($this, tnodes, 4);
         }else {
         slick($this, nodes[type]);
         }
         },
         error: function () {
         alert("上传失败！");
         }
         });*/
        // }
    };
    /**
     *
     * @param $box 存放轮播图片的box
     * @param arr 轮播图片的arr
     * @param number 每次轮播的图片数量
     */
    function slick($box, arr, number){
        $box.unslick();
        $box.template(arr).slick({
            dots: true,
            dotsClass: 'slick-pagination',
            arrows: true,
            slidesToShow: number || 2,
            slidesToScroll: number || 2,
            prevArrow: '<span class="ss-prev .fa icon-chevron-left fs24"></span>',
            nextArrow: '<span class="ss-next .fa icon-chevron-right fs24"></span>'
        });
        //对应区域数量修改
        $box.closest('.drag-box').children('h5').find('em').text(arr.length);
    }
    //进入批量导入页面
    function intoBatchImport(){
        //需要先清空
        nodes = {
            'fwt': [],
            'pmt': [],
            'gmfwzp': [],
            'zdbwzp': [],
            'xmzp': [],
            'print': [],
            'foot':[],
            'bio':[],
            'tool':[],
            'video':[],
            'gun':[],
            'drug':[],
            'physic':[],
            'doc':[],
            'elec':[],
            'qtxct':[]
        };
        //删除所有active class
        $('#batch-import-block>div>.drag-box').removeClass('active');
        $('#batch-import-block>div>.drag-other-area>.other').hide();
        //遍历新增现场页面中已有的图片 显示在批量导入页面 存放在nodes数组中

        $('#add-scene-xct-ul').find('li:nth-child(n+2)').each(function(i, item){
            var t_data = $(item).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            if(t_data.pictureType == '1082') {    //地图方位示意图
                nodes['fwt'].push(t_data);
            } else if(t_data.pictureType == '2010') { //平面图
                nodes['pmt'].push(t_data);
            } else {
                nodes['qtxct'].push(t_data);
            }
        });
        $('.form-field[data-pictype="1"] .ul-img .slick-slide').each(function () {  //概貌&方位渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['gmfwzp'].push(t_data);
        });
        $('.form-field[data-pictype="3"] .ul-img .slick-slide').each(function () {  //重点部位渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['zdbwzp'].push(t_data);
        });
        $('.form-field[data-pictype="4"] .ul-img .slick-slide').each(function () {  //细目渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['xmzp'].push(t_data);
        });
        slick($('#fwt-import-box'), nodes['fwt']);
        slick($('#pmt-import-box'), nodes['pmt']);
        slick($('#gmfwzp-import-box'), nodes['gmfwzp']);
        slick($('#zdbwzp-import-box'), nodes['zdbwzp']);
        slick($('#xmzp-import-box'), nodes['xmzp']);

        throughPic('#hjwz-print', 'print');
        throughPic('#hjwz-foot', 'foot');
        throughPic('#hjwz-bio', 'bio');
        throughPic('#hjwz-tool', 'tool');
        throughPic('#hjwz-video', 'video');
        throughPic('#hjwz-gun', 'gun');
        throughPic('#hjwz-drug', 'drug');
        throughPic('#hjwz-physic', 'physic');
        throughPic('#hjwz-doc', 'doc');
        throughPic('#hjwz-elec', 'elec');
        //打开批量导入页面
        $open('#batch-import-block', {width:'1030px', title:'批量添加'});
    }
    //进入批量导入页面后，遍历新增页面上各模块已经新增的图片
    function throughPic(selector, type){
        var $printBox = $('#print-import-box'),
            $footBox = $('#foot-import-box'),
            $bioBox = $('#bio-import-box'),
            $toolBox = $('#tool-import-box'),
            $videoBox = $('#video-import-box'),
            $otherBox = $('#other-import-box');
        $(selector).find('li:not(.add)').each(function(i, item){
            var t_data = $(item).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes[type].push(t_data);
        });
        type == 'print' && slick($printBox, nodes[type]);
        type == 'foot' && slick($footBox, nodes[type]);
        type == 'bio' && slick($bioBox, nodes[type]);
        type == 'tool' && slick($toolBox, nodes[type]);
        type == 'video' && slick($videoBox, nodes[type]);
        if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type == 'qtxct'){
            var tnodes = [];
            tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'], nodes['qtxct']);
            slick($otherBox,tnodes, 4);
        }
    }
    //批量导入确定 痕迹物证保存
    function hjwzSaveOpt(){
        var $titleUl = $('.hjwz-tabs[param="hjwz"]'),
            $allUl = $('#hjwz-all'),
            liHtml = $('#hjwz-li-tp').html();

        for(var key in nodes){
            if(key=='fwt'||key=='gmfwzp'||key=='zdbwzp'||key=='pmt'||key=='xmzp'||key=='qtxct') {
                continue;
            }
            var $ul = $('#hjwz-'+key);
            nodes[key].each(function(item, i){
                //存在batchImportId 表示是此次批量导入的照片
                if(item.batchImportId) {
                    item.uuid = item.batchImportId;
                    item.module = item.type == 'print' ? '1' : '';

                    //图片存放的data需要这么多的属性
                    var hjwzSaveObj = {
                        category:'',
                        attachmentId:'',
                        materialEvidenceName:'',
                        materialEvidenceTypeDict:'',
                        materialEvidenceType:'',
                        materialEvidenceCode:'',
                        materialEvidenceJudgement:'',
                        leftPosition:'',
                        collectionModeDict:'',
                        collectionMode:'',
                        collectedTime:'',
                        feature:'',
                        bulletModel:'',
                        bulletType:'',
                        storageFlag:'',
                        storageStatus:'',
                        collectedFlag:'',
                        sceneCollectedPerson:[]
                    };
                    var tobj = str2obj(obj2str(nodes[key][i]));
                    delete tobj['uuid'];
                    delete tobj['batchImportId'];
                    delete tobj['module'];
                    delete tobj['type'];
                    delete tobj['src'];
                    $.extend(hjwzSaveObj, tobj);
                    hjwzSaveObj.category = xchjwzlbDM.where('o=>o.key=="{0}"'.format(key))[0].value;//痕迹物证图片类型
                    hjwzSaveObj.attachmentId = item.attachmentId;//图片上传服务器后的绝对路径，后台后来改成需要传attachmentId

                    //compile html
                    $ul.append($compile(liHtml, item));
                    $allUl.append($compile(liHtml, item));
                    $titleUl.find('li[param="{0}"]'.format(key)).find('em').text($ul.children('li').length - 1);

                    //data
                    $ul.find('img[paramId="{0}"]'.format(item.batchImportId)).closest('li').data('picInfo', hjwzSaveObj);
                    $allUl.find('img[paramId="{0}"]'.format(item.batchImportId)).closest('li').data('picInfo', hjwzSaveObj);
                }
            });
            $titleUl.children('li[param="all"]').find('em').text($allUl.children('li').length);
        }
    }
    //批量导入确定 现场图保存
    function xctSaveOpt() {
        var $xctUl = $('#add-scene-xct-ul');
        appendxtc($xctUl, nodes['fwt']);
        appendxtc($xctUl, nodes['pmt']);
        appendxtc($xctUl, nodes['qtxct']);
    }
    function appendxtc($ele, data) {
        data.each(function (item) {
            var $li = $($compile('#add-scene-xct-li', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $li.data('picInfo', item);
            $ele.append($li);
        });
    }
    //批量导入确定 现场照片保存
    function xczpSaveOpt() {
        var $gmfwzpUlImg = $('.form-field[data-pictype="1"]').find('.ul-img').unslick();
        var $zdbwzpUlImg = $('.form-field[data-pictype="3"]').find('.ul-img').unslick();
        var $xmzpUlImg = $('.form-field[data-pictype="4"]').find('.ul-img').unslick();
        var $liDiv;
        nodes['gmfwzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $gmfwzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="1"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        nodes['zdbwzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $zdbwzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="3"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        nodes['xmzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $xmzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="4"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        $gmfwzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
        $zdbwzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
        $xmzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
    }
    //痕迹物证修改初始化赋值
    function batchHjwzInitEditInput(type, $div, data){
        //移除必填项不合格验证
        $div.find('.validatebox-invalid').removeClass('validatebox-invalid');
        //输入框赋值
        $div.find('[name="materialEvidenceName"]').val(data.materialEvidenceName);//物证名称
        $div.find('[name="leftPosition"]').val(data.leftPosition);//遗留部位
        $div.find('[name="collectedTime"]').val(data.collectedTime);//提取时间
        $div.find('[name="feature"]').val(data.feature);//基本特征
        $div.find('[name="collectionModeDict"]').val(data.collectionModeDict);//提取方法输入框
        //字典radio选中判断
        $div.find('[dict-name="materialEvidenceType"]').children('input[value="{0}"]'.format(data.materialEvidenceType)).prop('checked', true);
        $div.find('[dict-name="collectionMode"]').children('input[value="{0}"]'.format(data.collectionMode)).prop('checked', true);
        $div.find('[dict-name="bulletModel"]').children('input[value="{0}"]'.format(data.bulletModel)).prop('checked', true);
        //checkbox选中判断
        if(data.storageFlag == '1'){$('input[name="storageFlag"]').prop('checked', true);}
        if(data.collectedFlag == '1'){$('input[name="collectedFlag"]').prop('checked', true);}
        //提取人选中判断
        data.sceneCollectedPerson && data.sceneCollectedPerson.each(function(item){
            $div.find('.tqr-info-fill li[data-key="{0}"]'.format(item.collectedPersonId)).addClass('active');
        });
    }
    //对批量修改 的文本内容进行html初始化
    function cloneContent(cloneSelector, batchId){
        var $picInfo = $('#batch-edit-block>.pic-info');

        var divContent = $(cloneSelector).clone();
        $(divContent).find(':text').val('');
        $(divContent).find(':checkbox').prop('checked', false);
        $(divContent).find('.tqr-info-fill li').removeClass('active');

        //文本内容赋值
        $picInfo.html(divContent);

        //对单选字典进行重新定义
        $picInfo.find('[dict-type]').dict(function(){
            //痕迹物证输入框初始化
            batchHjwzInitEditInput(batchEditType, $picInfo,nodes[batchEditType].where('o=>o.batchImportId=="{0}"'.format(batchId))[0]);
            //TODO 其他照片输入框初始化
            var data = nodes[batchEditType].where('o=>o.batchImportId=="{0}"'.format(batchId))[0];
            data.pictureType && $picInfo.find('dict').dictSelect(data.pictureType);
            $picInfo.find('input:text').val(data.description);
        });
    }

    //重新渲染方位图 平面图 概貌&方位 重点部位 细目 图
    function repeatRender() {
        if(batchEditType == 'fwt' || batchEditType == 'pmt') {  //方位图和平面图的重新渲染（主要用于修改类型的情况下）
            nodes['fwt'].each(function (item, i) {
                if(item.pictureType == "2010") {
                    nodes['pmt'].push(item);
                    nodes['fwt'].splice(i, 1);
                }
            });
            nodes['pmt'].each(function (item, i) {
                if(item.pictureType == "1082") {
                    nodes['fwt'].push(item);
                    nodes['pmt'].splice(i, 1);
                }
            });
            slick($('#fwt-import-box'), nodes['fwt']);
            slick($('#pmt-import-box'), nodes['pmt']);
        } else if(batchEditType == 'gmfwzp' || batchEditType == 'zdbwzp' || batchEditType == 'xmzp') {
            nodes['gmfwzp'].each(function (item, i) {
                if(item.pictureType == "3") {
                    nodes['zdbwzp'].push(item);
                    nodes['gmfwzp'].splice(i, 1);
                } else if(item.pictureType == "4") {
                    nodes['xmzp'].push(item);
                    nodes['gmfwzp'].splice(i, 1);
                }
            });
            nodes['zdbwzp'].each(function (item, i) {
                if(item.pictureType == "1" || item.pictureType == "2") {
                    nodes['gmfwzp'].push(item);
                    nodes['zdbwzp'].splice(i, 1);
                } else if(item.pictureType == "4") {
                    nodes['xmzp'].push(item);
                    nodes['zdbwzp'].splice(i, 1);
                }
            });
            nodes['xmzp'].each(function (item, i) {
                if(item.pictureType == "1" || item.pictureType == "2") {
                    nodes['gmfwzp'].push(item);
                    nodes['xmzp'].splice(i, 1);
                } else if(item.pictureType == "3") {
                    nodes['zdbwzp'].push(item);
                    nodes['xmzp'].splice(i, 1);
                }
            });
            slick($('#gmfwzp-import-box'), nodes['gmfwzp']);
            slick($('#zdbwzp-import-box'), nodes['zdbwzp']);
            slick($('#xmzp-import-box'), nodes['xmzp']);
        }
    }

    //事件注册
    $('.main-content').on('click', '.into-batch-import', function(){
        intoBatchImport();
    });

    //阻止浏览器默认行为
    $(document).on({
        dragleave:function(e){		//拖离
            e.preventDefault();
        },
        drop:function(e){			//拖后放
            e.preventDefault();
        },
        dragenter:function(e){		//拖进
            e.preventDefault();
        },
        dragover:function(e){		//拖来拖去
            e.preventDefault();
        }
    });

    $('#batch-import-block').on('dragenter', '.drag-area', function(e){
        e.preventDefault();
    }).on('drop', '.drag-area', function(e){
        e.preventDefault();

        var fileList = e.originalEvent.dataTransfer;
        var param;
        var $storage;
        if($(this).hasClass('drag-box')){
            $storage = $(this).children('.storage-area');
            param = $storage.attr('param');
        }else{
            //其他 区域内容图片的拖拽
            $storage = $(this).closest('.drag-box').children('.storage-area');
            param = $(this).attr('param');
            if(this.tagName == 'U'){
                $(this).removeClass('drag');
                $(this).closest('.other').hide();
            }
        }
        doDropUp.apply($storage, [fileList, param]);

    }).on('dragover', '.drag-area', function(e){
        e.preventDefault();

        var $dragBox = $(this).closest('.drag-box');
        $dragBox.addClass('active').siblings('.drag-box').removeClass('active');

        if(this.tagName == 'U'){
            $(this).addClass('drag').siblings('u').removeClass('drag');
        }
        if(!$dragBox.hasClass('drag-other-area')){
            $('.drag-other-area').children('.other').hide();
        }
    }).on('dragleave', '.drag-area', function(e){
        e.preventDefault();
    }).on('dragenter', '.drag-other-area', function(){
        $(this).children('.other').show();
    }).on('click', '.del-import-pic', function(){
        //只有新拖入的图片才可以删除
        var $box = $(this).closest('.storage-area');
        var batchImportId = $(this).attr('paramId'),
            type = $(this).attr('paramType');
        nodes[type].each(function(o, i){
            if(o.batchImportId == batchImportId){
                nodes[type].splice(i,1);
                return false;
            }
        });
        //删除一张图片之后，需要重新slick一下
        if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type=='qtxct'){
            var tnodes = [];
            tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'],nodes['qtxct']);
            slick($box, tnodes, 4);
        }else {
            slick($box, nodes[type]);
        }
    }).on('click', '#batch-import-ok', function(){
        //点击确定，将新拖入的图片保存到对应的区域
        hjwzSaveOpt();  //痕迹物证的相关保存
        xctSaveOpt();   //现场图保存
        xczpSaveOpt();   //现场照片保存
        $('#batch-import-block').$close();
    }).on('click', '#batch-import-close', function(){
        $('#batch-import-block').$close();
    }).on('click', '.into-batch-edit', function(){
        var param = $(this).attr('param'),
            $box = $('#batch-edit-block>.pic-box'),
            $info = $('#batch-edit-block>.pic-info');
        var batchArr = nodes[param].where('o=>o.batchImportId');

        batchEditType = param;//进入批量修改的照片类型
        if(batchArr.length == '0'){
            toast(' 本次没有上传该类型的照片，请先上传照片').width(340).warn();
        }else {
            //进入批量修改页面
            $open('#batch-edit-block', {width: 800, title: '批量修改', onClose: function () {
                repeatRender();
            }});

            //照片重新slick
            $box.unslick();
            slick($box, batchArr, 4);
            //文本内容清空
            $info.html('');
            //进入默认点击第一张图片
            $box.find('.slick-slide:not(.slick-cloned):first').click();
        }
    });

    $('#batch-edit-block').on('click', '.slick-slide', function(){
        //修改页面点击图片 填写文本信息
        //当前照片样式修改
        $(this).addClass('active').siblings('.slick-slide').removeClass('active');

        var batchId = $(this).attr('paramId'),//获取图片对应的id
            type = $(this).attr('paramType'),//获取图片对应的类型
            cloneSelector = ''; //需要clone的html选择器

        if(type == 'print'){
            cloneSelector = '#hjwz-print-block>.batch-clone';
        }else if(type == 'foot'){
            cloneSelector = '#hjwz-foot-block>.batch-clone';
        }else if(type == 'bio'){
            cloneSelector = '#hjwz-bio-block>.batch-clone';
        }else if(type == 'tool'){
            cloneSelector = '#hjwz-tool-block>.batch-clone';
        }else if(type == 'video'){
            cloneSelector = '#hjwz-video-block>.batch-clone';
        }else if(type == 'fwt' || type == 'pmt') {
            cloneSelector = '#xct-add .batch-clone';
        }else if(type == 'gmfwzp' || type == 'zdbwzp' || type == 'xmzp') {
            cloneSelector = '#xctp-add .batch-clone';
        }
        cloneContent(cloneSelector, batchId);
    }).on('click', '#save-batch-edit', function(){
        //必填项验证
        var $block = $('#batch-edit-block');
        $block.find('.validate').validatebox();
        if($block.find('.validatebox-invalid').length > 0){
            return false;
        }
        //修改页面 修改图片文本信息后保存
        var saveObj;
        if(batchEditType == 'fwt' || batchEditType == 'pmt') {
            saveObj = getxctinfo($('#batch-edit-block>.pic-info'));
        } else if(batchEditType == 'gmfwzp' || batchEditType == 'zdbwzp' || batchEditType == 'xmzp') {
            saveObj = getxczpinfo($('#batch-edit-block>.pic-info'));
        } else {
            saveObj = getHjwzBlockObject($('#batch-edit-block>.pic-info'));
        }
        var batchId = $('#batch-edit-block>.pic-box').find('.slick-slide.active').attr('paramId');
        nodes[batchEditType].each(function(o,i){
            if(o.batchImportId == batchId){
                $.extend(nodes[batchEditType][i], saveObj);
            }
        });
        toast('保存成功！').ok();
    }).on('click', '#close-batch-edit', function(){
        //修改页面关闭按钮
        repeatRender();
        $('#batch-edit-block').$close();
    }).on('click', '.tqr-info-fill>li', function(){
        //提取人的点击事件
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
    /*end */
});
/*
importing('slick',function(){

    //存放轮播图片数组
    var nodes = {
        'fwt': [],
        'pmt': [],
        'gmfwzp': [],
        'zdbwzp': [],
        'xmzp': [],
        'print': [],
        'foot':[],
        'bio':[],
        'tool':[],
        'video':[],
        'gun':[],
        'drug':[],
        'physic':[],
        'doc':[],
        'elec':[],
        'qtxct': []
    };
    //现场痕迹物证类别代码
    var xchjwzlbDM = [
        {'key':'print', 'value':'1'},
        {'key':'foot', 'value':'2'},
        {'key':'tool', 'value':'3'},
        {'key':'gun', 'value':'4'},
        {'key':'bio', 'value':'6'},
        {'key':'drug', 'value':'7'},
        {'key':'physic', 'value':'8'},
        {'key':'doc', 'value':'9'},
        {'key':'elec', 'value':'10'},
        {'key':'video', 'value':'11'}
    ];
    //进入批量修改的类型
    var batchEditType = '';


    /!**
     *
     * @param fileList
     * @param type
     * @param cb
     * @returns {boolean}
     *!/
    var doDropUp = function(file,type){
        var $this = $(this);
        // var fileLists = fileList.files
        // var formdata = new FormData();
        //检测是否是拖拽文件到页面的操作
        // if(fileList.length == 0) {
        //     return false;
        // }
        //图片在浏览器上显示 并添加到上传数据对象
        // for (var i = 0; i < fileList.length; i++) {
        //     var file = fileList[i];
        //     //类型检测
        //     if(file.type.indexOf('image') === -1){
        //         alert("您拖的文件存在除图片以外的文件！");
        //         return false;
        //     }
        //     //大小限制
        //     if (file.size > 5*1024*1024) {
        //         $alert('单张图片大小超过5M， 上传速度将过慢，请压缩后重新上传');
        //         break;
        //     }
            window.uploadFile(file, function(res){
                // var t_src = top.sysParams.fileServerPath+'/'+res.data.fileNameRemote;
                var obj = {
                    'batchImportId':getGuid(),
                    'type':type,
                    'attachmentId':res.data.fileNameRemote,
                    'src':top.sysParams.fileServerPath+'/'+res.data.fileNameRemote,
                    'md5': res.data.md5
                };
                if(type=='fwt') {
                    obj.category = '1';
                    obj.pictureType = '1082';   //地图方位示意图的代码
                    obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                    obj.description = '';
                } else if(type == 'pmt') {
                    obj.category = '1';
                    obj.pictureType = '2010';   //平面比例图的代码
                    obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                    obj.description = '';
                } else if(type=='gmfwzp') {
                    obj.category = '2';
                    obj.pictureType = '1';   //概貌&方位的代码
                    obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                    obj.description = '';
                } else if(type=='zdbwzp') {
                    obj.category = '2';
                    obj.pictureType = '3';   //重点部位的代码
                    obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                    obj.description = '';
                } else if(type=='xmzp') {
                    obj.category = '2';
                    obj.pictureType = '4';   //细目的代码
                    obj.pictureTypeDict = 'XCZPZLDM';    //为现场照片的字典
                    obj.description = '';
                } else if(type=='qtxct') {
                    obj.category = '1';
                    obj.pictureType = '';   //代码
                    obj.pictureTypeDict = 'XCTZLDM';    //为现场图的字典
                    obj.description = '';
                }
                nodes[type].push(obj);
                if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type=='qtxct'){
                    //显示在其他区域
                    var tnodes = [];
                    tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'],nodes['qtxct']);
                    slick($this, tnodes, 4);
                }else {
                    slick($this, nodes[type]);
                }
            }, true);
            /!*formdata.append('myfile', file);
             $.ajax({
             url: "http://192.168.1.211:53000/api/file/upload",
             type: "POST",
             data: formdata,
             contentType: false,
             processData: false,
             success: function (data) {
             console.log(data);
             var t_src = 'http://192.168.1.211:53000/api/file/download/'+data.fileId+'?preview=true';
             nodes[type].push({
             'batchImportId':getGuid(),
             'type':type,
             'attachmentId':t_src
             });
             if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec'){
             //显示在其他区域
             var tnodes = [];
             tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec']);
             slick($this, tnodes, 4);
             }else {
             slick($this, nodes[type]);
             }
             },
             error: function () {
             alert("上传失败！");
             }
             });*!/
        // }
    };
    /!**
     *
     * @param $box 存放轮播图片的box
     * @param arr 轮播图片的arr
     * @param number 每次轮播的图片数量
     *!/
    function slick($box, arr, number){
        $box.unslick();
        $box.template(arr).slick({
            dots: true,
            dotsClass: 'slick-pagination',
            arrows: true,
            slidesToShow: number || 2,
            slidesToScroll: number || 2,
            prevArrow: '<span class="ss-prev .fa icon-chevron-left fs24"></span>',
            nextArrow: '<span class="ss-next .fa icon-chevron-right fs24"></span>'
        });
        //对应区域数量修改
        $box.closest('.drag-box').children('h5').find('em').text(arr.length);
    }
    //进入批量导入页面
    function intoBatchImport(){
        //需要先清空
        nodes = {
            'fwt': [],
            'pmt': [],
            'gmfwzp': [],
            'zdbwzp': [],
            'xmzp': [],
            'print': [],
            'foot':[],
            'bio':[],
            'tool':[],
            'video':[],
            'gun':[],
            'drug':[],
            'physic':[],
            'doc':[],
            'elec':[],
            'qtxct':[]
        };
        //删除所有active class
        $('#batch-import-block>div>.drag-box').removeClass('active');
        $('#batch-import-block>div>.drag-other-area>.other').hide();
        //遍历新增现场页面中已有的图片 显示在批量导入页面 存放在nodes数组中

        $('#add-scene-xct-ul').find('li:nth-child(n+2)').each(function(i, item){
            var t_data = $(item).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            if(t_data.pictureType == '1082') {    //地图方位示意图
                nodes['fwt'].push(t_data);
            } else if(t_data.pictureType == '2010') { //平面图
                nodes['pmt'].push(t_data);
            } else {
                nodes['qtxct'].push(t_data);
            }
        });
        $('.form-field[data-pictype="1"] .ul-img .slick-slide').each(function () {  //概貌&方位渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['gmfwzp'].push(t_data);
        });
        $('.form-field[data-pictype="3"] .ul-img .slick-slide').each(function () {  //重点部位渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['zdbwzp'].push(t_data);
        });
        $('.form-field[data-pictype="4"] .ul-img .slick-slide').each(function () {  //细目渲染
            var t_data = $(this).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes['xmzp'].push(t_data);
        });
        slick($('#fwt-import-box'), nodes['fwt']);
        slick($('#pmt-import-box'), nodes['pmt']);
        slick($('#gmfwzp-import-box'), nodes['gmfwzp']);
        slick($('#zdbwzp-import-box'), nodes['zdbwzp']);
        slick($('#xmzp-import-box'), nodes['xmzp']);

        throughPic('#hjwz-print', 'print');
        throughPic('#hjwz-foot', 'foot');
        throughPic('#hjwz-bio', 'bio');
        throughPic('#hjwz-tool', 'tool');
        throughPic('#hjwz-video', 'video');
        throughPic('#hjwz-gun', 'gun');
        throughPic('#hjwz-drug', 'drug');
        throughPic('#hjwz-physic', 'physic');
        throughPic('#hjwz-doc', 'doc');
        throughPic('#hjwz-elec', 'elec');
        //打开批量导入页面
        $open('#batch-import-block', {width:'1030px', title:'批量添加'});
    }
    //进入批量导入页面后，遍历新增页面上各模块已经新增的图片
    function throughPic(selector, type){
        var $printBox = $('#print-import-box'),
            $footBox = $('#foot-import-box'),
            $bioBox = $('#bio-import-box'),
            $toolBox = $('#tool-import-box'),
            $videoBox = $('#video-import-box'),
            $otherBox = $('#other-import-box');
        $(selector).find('li:not(.add)').each(function(i, item){
            var t_data = $(item).data('picInfo');
            t_data.src = top.sysParams.fileServerPath + t_data.attachmentId;
            nodes[type].push(t_data);
        });
        type == 'print' && slick($printBox, nodes[type]);
        type == 'foot' && slick($footBox, nodes[type]);
        type == 'bio' && slick($bioBox, nodes[type]);
        type == 'tool' && slick($toolBox, nodes[type]);
        type == 'video' && slick($videoBox, nodes[type]);
        if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type == 'qtxct'){
            var tnodes = [];
            tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'], nodes['qtxct']);
            slick($otherBox,tnodes, 4);
        }
    }
    //批量导入确定 痕迹物证保存
    function hjwzSaveOpt(){
        var $titleUl = $('.hjwz-tabs[param="hjwz"]'),
            $allUl = $('#hjwz-all'),
            liHtml = $('#hjwz-li-tp').html();

        for(var key in nodes){
            if(key=='fwt'||key=='gmfwzp'||key=='zdbwzp'||key=='pmt'||key=='xmzp'||key=='qtxct') {
                continue;
            }
            var $ul = $('#hjwz-'+key);
            nodes[key].each(function(item, i){
                //存在batchImportId 表示是此次批量导入的照片
                if(item.batchImportId) {
                    item.uuid = item.batchImportId;
                    item.module = item.type == 'print' ? '1' : '';

                    //图片存放的data需要这么多的属性
                    var hjwzSaveObj = {
                        category:'',
                        attachmentId:'',
                        materialEvidenceName:'',
                        materialEvidenceTypeDict:'',
                        materialEvidenceType:'',
                        materialEvidenceCode:'',
                        materialEvidenceJudgement:'',
                        leftPosition:'',
                        collectionModeDict:'',
                        collectionMode:'',
                        collectedTime:'',
                        feature:'',
                        bulletModel:'',
                        bulletType:'',
                        storageFlag:'',
                        storageStatus:'',
                        collectedFlag:'',
                        sceneCollectedPerson:[]
                    };
                    var tobj = str2obj(obj2str(nodes[key][i]));
                    delete tobj['uuid'];
                    delete tobj['batchImportId'];
                    delete tobj['module'];
                    delete tobj['type'];
                    delete tobj['src'];
                    $.extend(hjwzSaveObj, tobj);
                    hjwzSaveObj.category = xchjwzlbDM.where('o=>o.key=="{0}"'.format(key))[0].value;//痕迹物证图片类型
                    hjwzSaveObj.attachmentId = item.attachmentId;//图片上传服务器后的绝对路径，后台后来改成需要传attachmentId

                    //compile html
                    $ul.append($compile(liHtml, item));
                    $allUl.append($compile(liHtml, item));
                    $titleUl.find('li[param="{0}"]'.format(key)).find('em').text($ul.children('li').length - 1);

                    //data
                    $ul.find('img[paramId="{0}"]'.format(item.batchImportId)).closest('li').data('picInfo', hjwzSaveObj);
                    $allUl.find('img[paramId="{0}"]'.format(item.batchImportId)).closest('li').data('picInfo', hjwzSaveObj);
                }
            });
            $titleUl.children('li[param="all"]').find('em').text($allUl.children('li').length);
        }
    }
    //批量导入确定 现场图保存
    function xctSaveOpt() {
        var $xctUl = $('#add-scene-xct-ul');
        appendxtc($xctUl, nodes['fwt']);
        appendxtc($xctUl, nodes['pmt']);
        appendxtc($xctUl, nodes['qtxct']);
    }
    function appendxtc($ele, data) {
        data.each(function (item) {
            var $li = $($compile('#add-scene-xct-li', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $li.data('picInfo', item);
            $ele.append($li);
        });
    }
    //批量导入确定 现场照片保存
    function xczpSaveOpt() {
        var $gmfwzpUlImg = $('.form-field[data-pictype="1"]').find('.ul-img').unslick();
        var $zdbwzpUlImg = $('.form-field[data-pictype="3"]').find('.ul-img').unslick();
        var $xmzpUlImg = $('.form-field[data-pictype="4"]').find('.ul-img').unslick();
        var $liDiv;
        nodes['gmfwzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $gmfwzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="1"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        nodes['zdbwzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $zdbwzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="3"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        nodes['xmzp'].each(function (item) {
            $liDiv = $($compile('#add-scene-xctp-div', item));
            delete item.src;
            delete item.batchImportId;
            delete item.type;
            $liDiv.data('picInfo', item);
            $xmzpUlImg.append($liDiv);
            var $span = $('.form-field[data-pictype="4"] .type-in-label-ms span');
            $span.text(parseInt($span.text()) + 1);
        });
        $gmfwzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
        $zdbwzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
        $xmzpUlImg.slick({
            dots: true,
            dotsClass: 'slick-pagination',
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<span class="pic-lr pic-l"><i class="icon-chevron-left"></i></span>',
            nextArrow: '<span class="pic-lr pic-r"><i class="icon-chevron-right"></i></span>'
        });
    }
    //痕迹物证修改初始化赋值
    function batchHjwzInitEditInput(type, $div, data){
        //移除必填项不合格验证
        $div.find('.validatebox-invalid').removeClass('validatebox-invalid');
        //输入框赋值
        $div.find('[name="materialEvidenceName"]').val(data.materialEvidenceName);//物证名称
        $div.find('[name="leftPosition"]').val(data.leftPosition);//遗留部位
        $div.find('[name="collectedTime"]').val(data.collectedTime);//提取时间
        $div.find('[name="feature"]').val(data.feature);//基本特征
        $div.find('[name="collectionModeDict"]').val(data.collectionModeDict);//提取方法输入框
        //字典radio选中判断
        $div.find('[dict-name="materialEvidenceType"]').children('input[value="{0}"]'.format(data.materialEvidenceType)).prop('checked', true);
        $div.find('[dict-name="collectionMode"]').children('input[value="{0}"]'.format(data.collectionMode)).prop('checked', true);
        $div.find('[dict-name="bulletModel"]').children('input[value="{0}"]'.format(data.bulletModel)).prop('checked', true);
        //checkbox选中判断
        if(data.storageFlag == '1'){$('input[name="storageFlag"]').prop('checked', true);}
        if(data.collectedFlag == '1'){$('input[name="collectedFlag"]').prop('checked', true);}
        //提取人选中判断
        data.sceneCollectedPerson && data.sceneCollectedPerson.each(function(item){
            $div.find('.tqr-info-fill li[data-key="{0}"]'.format(item.collectedPersonId)).addClass('active');
        });
    }
    //对批量修改 的文本内容进行html初始化
    function cloneContent(cloneSelector, batchId){
        var $picInfo = $('#batch-edit-block>.pic-info');

        var divContent = $(cloneSelector).clone();
        $(divContent).find(':text').val('');
        $(divContent).find(':checkbox').prop('checked', false);
        $(divContent).find('.tqr-info-fill li').removeClass('active');

        //文本内容赋值
        $picInfo.html(divContent);

        //对单选字典进行重新定义
        $picInfo.find('[dict-type]').dict(function(){
            //痕迹物证输入框初始化
            batchHjwzInitEditInput(batchEditType, $picInfo,nodes[batchEditType].where('o=>o.batchImportId=="{0}"'.format(batchId))[0]);
            //TODO 其他照片输入框初始化
            var data = nodes[batchEditType].where('o=>o.batchImportId=="{0}"'.format(batchId))[0];
            data.pictureType && $picInfo.find('dict').dictSelect(data.pictureType);
            $picInfo.find('input:text').val(data.description);
        });
    }

    //重新渲染方位图 平面图 概貌&方位 重点部位 细目 图
    function repeatRender() {
        if(batchEditType == 'fwt' || batchEditType == 'pmt') {  //方位图和平面图的重新渲染（主要用于修改类型的情况下）
            nodes['fwt'].each(function (item, i) {
                if(item.pictureType == "2010") {
                    nodes['pmt'].push(item);
                    nodes['fwt'].splice(i, 1);
                }
            });
            nodes['pmt'].each(function (item, i) {
                if(item.pictureType == "1082") {
                    nodes['fwt'].push(item);
                    nodes['pmt'].splice(i, 1);
                }
            });
            slick($('#fwt-import-box'), nodes['fwt']);
            slick($('#pmt-import-box'), nodes['pmt']);
        } else if(batchEditType == 'gmfwzp' || batchEditType == 'zdbwzp' || batchEditType == 'xmzp') {
            nodes['gmfwzp'].each(function (item, i) {
                if(item.pictureType == "3") {
                    nodes['zdbwzp'].push(item);
                    nodes['gmfwzp'].splice(i, 1);
                } else if(item.pictureType == "4") {
                    nodes['xmzp'].push(item);
                    nodes['gmfwzp'].splice(i, 1);
                }
            });
            nodes['zdbwzp'].each(function (item, i) {
                if(item.pictureType == "1" || item.pictureType == "2") {
                    nodes['gmfwzp'].push(item);
                    nodes['zdbwzp'].splice(i, 1);
                } else if(item.pictureType == "4") {
                    nodes['xmzp'].push(item);
                    nodes['zdbwzp'].splice(i, 1);
                }
            });
            nodes['xmzp'].each(function (item, i) {
                if(item.pictureType == "1" || item.pictureType == "2") {
                    nodes['gmfwzp'].push(item);
                    nodes['xmzp'].splice(i, 1);
                } else if(item.pictureType == "3") {
                    nodes['zdbwzp'].push(item);
                    nodes['xmzp'].splice(i, 1);
                }
            });
            slick($('#gmfwzp-import-box'), nodes['gmfwzp']);
            slick($('#zdbwzp-import-box'), nodes['zdbwzp']);
            slick($('#xmzp-import-box'), nodes['xmzp']);
        }
    }

    //事件注册
    $('.main-content').on('click', '.into-batch-import', function(){
        intoBatchImport();
    });

    //阻止浏览器默认行为
    $(document).on({
        dragleave:function(e){		//拖离
            e.preventDefault();
        },
        drop:function(e){			//拖后放
            e.preventDefault();
        },
        dragenter:function(e){		//拖进
            e.preventDefault();
        },
        dragover:function(e){		//拖来拖去
            e.preventDefault();
        }
    });

    $('#batch-import-block').on('dragenter', '.drag-area', function(e){
        e.preventDefault();
    }).on('drop', '.drag-area', function(e){
        e.preventDefault();

        var fileList = e.originalEvent.dataTransfer;
        var param;
        var $storage;
        if($(this).hasClass('drag-box')){
            $storage = $(this).children('.storage-area');
            param = $storage.attr('param');
        }else{
            //其他 区域内容图片的拖拽
            $storage = $(this).closest('.drag-box').children('.storage-area');
            param = $(this).attr('param');
            if(this.tagName == 'U'){
                $(this).removeClass('drag');
                $(this).closest('.other').hide();
            }
        }
        doDropUp.apply($storage, [fileList, param]);

    }).on('dragover', '.drag-area', function(e){
        e.preventDefault();

        var $dragBox = $(this).closest('.drag-box');
        $dragBox.addClass('active').siblings('.drag-box').removeClass('active');

        if(this.tagName == 'U'){
            $(this).addClass('drag').siblings('u').removeClass('drag');
        }
        if(!$dragBox.hasClass('drag-other-area')){
            $('.drag-other-area').children('.other').hide();
        }
    }).on('dragleave', '.drag-area', function(e){
        e.preventDefault();
    }).on('dragenter', '.drag-other-area', function(){
        $(this).children('.other').show();
    }).on('click', '.del-import-pic', function(){
        //只有新拖入的图片才可以删除
        var $box = $(this).closest('.storage-area');
        var batchImportId = $(this).attr('paramId'),
            type = $(this).attr('paramType');
        nodes[type].each(function(o, i){
            if(o.batchImportId == batchImportId){
                nodes[type].splice(i,1);
                return false;
            }
        });
        //删除一张图片之后，需要重新slick一下
        if(type == 'gun' || type == 'drug' || type == 'physic' || type =='doc' || type == 'elec' || type=='qtxct'){
            var tnodes = [];
            tnodes = tnodes.concat(nodes['gun'],nodes['drug'],nodes['physic'],nodes['doc'],nodes['elec'],nodes['qtxct']);
            slick($box, tnodes, 4);
        }else {
            slick($box, nodes[type]);
        }
    }).on('click', '#batch-import-ok', function(){
        //点击确定，将新拖入的图片保存到对应的区域
        hjwzSaveOpt();  //痕迹物证的相关保存
        xctSaveOpt();   //现场图保存
        xczpSaveOpt();   //现场照片保存
        $('#batch-import-block').$close();
    }).on('click', '#batch-import-close', function(){
        $('#batch-import-block').$close();
    }).on('click', '.into-batch-edit', function(){
        var param = $(this).attr('param'),
            $box = $('#batch-edit-block>.pic-box'),
            $info = $('#batch-edit-block>.pic-info');
        var batchArr = nodes[param].where('o=>o.batchImportId');

        batchEditType = param;//进入批量修改的照片类型
        if(batchArr.length == '0'){
            toast(' 本次没有上传该类型的照片，请先上传照片').width(340).warn();
        }else {
            //进入批量修改页面
            $open('#batch-edit-block', {width: 800, title: '批量修改', onClose: function () {
                repeatRender();
            }});

            //照片重新slick
            $box.unslick();
            slick($box, batchArr, 4);
            //文本内容清空
            $info.html('');
            //进入默认点击第一张图片
            $box.find('.slick-slide:not(.slick-cloned):first').click();
        }
    });

    $('#batch-edit-block').on('click', '.slick-slide', function(){
        //修改页面点击图片 填写文本信息
        //当前照片样式修改
        $(this).addClass('active').siblings('.slick-slide').removeClass('active');

        var batchId = $(this).attr('paramId'),//获取图片对应的id
            type = $(this).attr('paramType'),//获取图片对应的类型
            cloneSelector = ''; //需要clone的html选择器

        if(type == 'print'){
            cloneSelector = '#hjwz-print-block>.batch-clone';
        }else if(type == 'foot'){
            cloneSelector = '#hjwz-foot-block>.batch-clone';
        }else if(type == 'bio'){
            cloneSelector = '#hjwz-bio-block>.batch-clone';
        }else if(type == 'tool'){
            cloneSelector = '#hjwz-tool-block>.batch-clone';
        }else if(type == 'video'){
            cloneSelector = '#hjwz-video-block>.batch-clone';
        }else if(type == 'fwt' || type == 'pmt') {
            cloneSelector = '#xct-add .batch-clone';
        }else if(type == 'gmfwzp' || type == 'zdbwzp' || type == 'xmzp') {
            cloneSelector = '#xctp-add .batch-clone';
        }
        cloneContent(cloneSelector, batchId);
    }).on('click', '#save-batch-edit', function(){
        //必填项验证
        var $block = $('#batch-edit-block');
        $block.find('.validate').validatebox();
        if($block.find('.validatebox-invalid').length > 0){
            return false;
        }
        //修改页面 修改图片文本信息后保存
        var saveObj;
        if(batchEditType == 'fwt' || batchEditType == 'pmt') {
            saveObj = getxctinfo($('#batch-edit-block>.pic-info'));
        } else if(batchEditType == 'gmfwzp' || batchEditType == 'zdbwzp' || batchEditType == 'xmzp') {
            saveObj = getxczpinfo($('#batch-edit-block>.pic-info'));
        } else {
            saveObj = getHjwzBlockObject($('#batch-edit-block>.pic-info'));
        }
        var batchId = $('#batch-edit-block>.pic-box').find('.slick-slide.active').attr('paramId');
        nodes[batchEditType].each(function(o,i){
            if(o.batchImportId == batchId){
                $.extend(nodes[batchEditType][i], saveObj);
            }
        });
        toast('保存成功！').ok();
    }).on('click', '#close-batch-edit', function(){
        //修改页面关闭按钮
        repeatRender();
        $('#batch-edit-block').$close();
    }).on('click', '.tqr-info-fill>li', function(){
        //提取人的点击事件
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
});*/
