/**
 * Created by admin on 2016/12/20.
 */
//准备数据源
var sysApprovalAct = 'sys/sysExamineAppOpption/',
    sysApprovalSearchAct = makeAct(sysApprovalAct + 'query'),//查询-----审批意见设置
    sysApprovalUpdAct = makeAct(sysApprovalAct + 'upd'),//更新-----审批意见设置
    sysApprovalAddAct = makeAct(sysApprovalAct + 'add'),//新增-----审批意见设置
    sysApprovalDelAct = makeAct(sysApprovalAct + 'del'),//删除-----审批意见设置
    sysApprovalDelBatchAct = makeAct(sysApprovalAct + 'delBatch'),//批量删除-----审批意见设置
    sysApprovalTreeAct = makeAct(sysApprovalAct + 'queryExamineAppOpptionTree');//左侧树-----审批意见设置
var sysOrganizationAct = 'sys/sysOrganization/';//查询信息
sysGetOrganAct = makeAct(sysOrganizationAct + 'getOrgan'),//根据单位代码或单位id查询单位信息----保管单位设置
    sysQueryOrganAct = makeAct(sysOrganizationAct + 'queryOrgan'),//单位树----保管单位设置
    updSysOrganizationAct = makeAct(sysOrganizationAct +'upd'),//修改基本信息和接口信息----保管单位设置
    updSysKeepUnitSetAct = makeAct('sys/sysKeepUnitSet/upd'),//修改业务信息----保管单位设置
    updInterfaceAct = makeAct('sys/sysUnitInterfaceSet/updateSysUnitInterfaceSetByOrganId'),//根据单位id修改接口信息----保管单位设置
    addSysOrganizationAct = makeAct(sysOrganizationAct +'add'),//新增基本信息----保管单位设置
    addSysKeepUnitSetAct = makeAct('sys/sysKeepUnitSet/add'),//新增业务信息----保管单位设置
    addBatchInterfaceAct = makeAct('sys/sysUnitInterfaceSet/addBatch'),//批量新增接口信息----保管单位设置
    delLogicSysOrganizationAct = makeAct(sysOrganizationAct + 'delLogic'),//逻辑删除----保管单位设置
    querySysDictTreeAct = makeAct('sys/sysDict/querySysDictTree'),
    interFaceDictAct = makeAct('sys/sysDict/tree/JKLXDM');
var sysLogAct = 'sys/sysLog/',
    journalQueryAct = makeAct(sysLogAct + 'query'),//查询-----日志管理
    journalDelAct = makeAct(sysLogAct + 'del');//物理删除单条数据-----日志管理
var sysBarcodePrintSetAct = 'sys/sysBarcodePrintSet/',//物证条码信息-----物证条码打印设置
    printSysQueryAct = makeAct(sysBarcodePrintSetAct + 'query'),//分页查询-----物证条码打印设置
    printDeleteSingleAct = makeAct(sysBarcodePrintSetAct + 'delLogic'),//删除单条数据----物证条码打印设置
    printTmlxAct = makeAct('sys/sysDict/tree/TMLXDM'),//条码类型-----物证条码打印设置
    updSysBarcodePrintSetAct = makeAct(sysBarcodePrintSetAct + 'upd'),//修改数据-----物证条码打印设置
    addSysBarcodePrintSetAct = makeAct(sysBarcodePrintSetAct + 'add'),//新增数据----物证条码打印设置
    delBatchSysBarcodePrintSetAct = makeAct(sysBarcodePrintSetAct + 'delBatch');//批量删除----物证条码打印设置
var dictAct = 'sys/sysDict/';
dictionaryQueryAct = makeAct(dictAct + 'query'),//分页查询----数据字典设置
    dictionaryDelAct = makeAct(dictAct + 'del'),//根据id删除数据（物理删除）----数据字典设置
    dictionaryDelBatchAct = makeAct(dictAct + 'delBatch'),//批量删除(物理删除)----数据字典设置
    dictionarySysDictTreeAct = makeAct(dictAct + 'querySysDictTree'),//查询字典项树形结构----数据字典设置
    dictionaryAddAct = makeAct(dictAct + 'add'),//新增数据----数据字典设置
    dictionaryUpdAct = makeAct(dictAct + 'upd');//根据id修改数据----数据字典设置
var sysRoleAct = 'sys/sysRole/',//角色基本信息----角色设置
    sysRoleQueryAct = makeAct(sysRoleAct + 'query'),//分页查询----角色设置
    sysRoleDelAct = makeAct(sysRoleAct + 'del'),//单条数据删除----角色设置
    sysRoleMenuResourceTreeAct = makeAct('sys/sysMenuResource/queryMenuResourceTree'),//角色菜单权限树----角色设置
    sysRoleBusProPerAct = makeAct('sys/sysDict/tree/WZYWLCDM'),//业务流程权限----角色设置
    sysRoleJsmcdmrAct = makeAct('sys/sysDict/tree/JSMCDM'),//角色名称代码字典----角色设置
    sysRoleUpd = makeAct(sysRoleAct + 'upd'),//修改角色基本信息----角色设置
    sysRoleAdd = makeAct(sysRoleAct + 'add'),//新增角色基本信息----角色设置
    addPermissionRoleAct = makeAct(sysRoleAct + 'addPermissionRole'),//修改角色权限----角色设置
    sysRoleDelBatchAct = makeAct(sysRoleAct + 'deleteLogicBatchRole');//批量删除角色信息(逻辑删除)----角色设置
var sqdwUnitTreeAct = makeAct('sys/sysOrganization/queryOrganTree'),//单位树查询-----申请单位设置
    sqdwQueryTreeMsgAct = makeAct('sys/sysOrganization'),//根据树id查询基本信息-----申请单位设置
    sqdwDeleteTreeNodeAct = makeAct('sys/sysOrganization/delLogic'),//根据树id删除树节点-----申请单位设置
    sqdwAllUnitMsgAct = makeAct('sys/sysOrganization/queryOrgan'),//所有单位信息列表-----申请单位设置
    sqdwUpdateMsgAct = makeAct('sys/sysOrganization/upd'),//根据id修改数据-----申请单位设置
    sqdwAddUnitTreeAct = makeAct('sys/sysOrganization/add');//新增申请单位-----申请单位设置
var equipmentQueryTableAct = makeAct('sys/sysEquipment/query'),//查询table列表
    equipmentQueryTreeNodeAct = makeAct('sys/sysEquipment/queryEquipmentTrue'),//查询树列表
    equipmentQueryTreeDeviceAct = makeAct('sys/sysEquipment'),//根据树id查询基本信息
    equipmentDeleteTableDataAct = makeAct('sys/sysEquipment/delLogic'),//根据id删除数据
    equipmentBatchDeleteTableAct = makeAct('sys/sysEquipment/deleteLogicBatch'),//批量删除设备信息
    equipmentAddTableDataAct = makeAct('sys/sysEquipment/add'),//新增设备信息数据
    equipmentUpdateTableDataAct = makeAct('sys/sysEquipment/upd'),//修改设备信息
    equipmentPersonPrintAct = makeAct('sys/sysUser/queryRFIDUser'),//所有关联了RFID打印机的用户
    equipmentEvidenceMsgAct = makeAct('sys/sysDict/tree/WZGLXDM'),//查询物证柜列表
    equipmentQueryDeviceListAct = makeAct('sys/sysEquipment/querySysDictListByCondition');//查询设备类型列表
var queryEviDataAct = makeAct('sys/sysProofRoom/query'),//点击树节点查找物证室/物证柜数据----物证库管理
    queryCabDataAct = makeAct('sys/sysProofArk/query'),//点击查询条件查询物证柜数据----物证库管理
    proofRoomTypeAct = makeAct('sys/sysDict/tree/WZQSLXDM'),//物证室类型字典----物证库管理
    proofArkTypeAct = makeAct('sys/sysDict/tree/WZGLXDM'),//物证柜类型字典----物证库管理
    proofArkColAct = makeAct('sys/sysDict/tree/WZGLLXDM'),//列类型字典----物证库管理
    proofArkKnobAct = makeAct('sys/sysDict/tree/WZGJLXDM'),//节类型字典----物证库管理
    proofRoomQueryAct = makeAct('sys/sysProofRoom'),//根据id查询物证室数据----物证库管理
    proofArkQueryAct = makeAct('sys/sysProofArk'),//根据id查询物证柜数据----物证库管理
    proofRoomAddAct = makeAct('sys/sysProofRoom/add'),//新增物证室----物证库管理
    proofArkAddAct = makeAct('sys/sysProofArk/addProofArkInfo'),//新增物证柜----物证库管理
    proofRoomUpdAct = makeAct('sys/sysProofRoom/upd'),//修改物证室----物证库管理
    proofArkUpdIdAct = makeAct('sys/sysProofArk/intoUpdateProofArkInfoById'),//根据id进入物证柜----物证库管理
    proofArkUpdAct = makeAct('sys/sysProofArk/updateProofArkInfoById'),//修改物证柜----物证库管理
    proofRoomDelAct = makeAct('sys/sysProofRoom/delLogic'),//删除物证室----物证库管理
    proofActDelAct = makeAct('sys/sysProofArk/delProofArkInfoById'),//删除物证柜----物证库管理
    proofRoomDelBatchAct = makeAct('sys/sysProofRoom/delBatch'),//批量删除物证室----物证库管理
    proofActDelBatchAct = makeAct('sys/sysProofArk/delBatch'),//批量删除物证柜----物证库管理
    queryTreeDataAct = makeAct('sys/sysProofRoom/queryProofRoomTree');//查找物证室树型结构----物证库管理
var querySysParameterAct = makeAct('sys/sysParameter/query'),//通用设置数据查询----通用设置
    updateSysParameterAct = makeAct('sys/sysParameter/updateByKey');//根据id修改数据----通用设置
var locationTreeAct = makeAct('sys/sysProofArkColumn/queryProofArkTree'),//物证柜列树形结构----位置管理
    locationDataAct = makeAct('sys/sysProofLocation/queryProofLocation');//位置信息----位置管理
var numRuleQueryTableAct = makeAct('sys/sysProofNumEncodingRules/query'),//分页查询----编号规则设置
    numRuleDeleteSingleAct = makeAct('sys/sysProofNumEncodingRules/delLogic'),//删除单条数据----编号规则设置
    numRuleDelBatchAct = makeAct('sys/sysProofNumEncodingRules/delBatch'),//批量删除----编号规则设置
    numRuleUpdAct = makeAct('sys/sysProofNumEncodingRules/upd'),//修改----编号规则设置
    numRuleAddAct = makeAct('sys/sysProofNumEncodingRules/add'),//新增----编号规则设置
    numRuleUnitTreeAct = makeAct('sys/sysOrganization/queryOrganTree'),//单位树查询----编号规则设置
    numRuleAct = makeAct('sys/sysDict/tree/BHGZDM'),//编号规则字典----编号规则设置
    valRuleAct = makeAct('sys/sysDict/tree/RQGSDM');//取值规则字典----编号规则设置
var templateSysadd = makeAct('sys/sysBookTemplate/add'),//新增----模板设置
    templateSysupd = makeAct('sys/sysBookTemplate/upd'),//修改----模板设置
    templateQueryAct = makeAct('sys/sysBookTemplate/query'),//分页查询----模板设置
    templateDeleteSingleAct = makeAct('sys/sysBookTemplate/delLogic'),//删除单条数据----模板设置
    templateDictquery = makeAct('sys/sysDict/tree/WZMBLXDM'),//字典查询----模板设置
    templateQueryOrganAct = makeAct('sys/sysOrganization/queryOrgan');//单位树接口----模板设置
var managementSysModuleAct = makeAct('sys/sysUser/query',''),//分页查询----用户管理
    managementSysUserAddAct = makeAct('sys/sysUser/add',''),//新增----用户管理
    managementSysUserEditAct = makeAct('sys/sysUser/upd',''),//修改用户信息----用户管理
    managementSysUserDeleteAct = makeAct('sys/sysUser/delLogic',''),//删除----用户管理
    sysUserDleteBatchAct = makeAct('sys/sysUser/deleteLogicBatch',''),//批量删除----用户管理
    managementSysqxjs = makeAct('sys/sysRole/queryRole');//权限角色----用户管理
var moduleAction = makeAct('sys/sysMenuResource/queryMenuResourceTree'),//系统模块参数管理
    moduleViewAction = makeAct('sys/sysMenuResource'),//---系统模块参数管理
    moduleDelAction = makeAct('sys/sysMenuResource/del'),//---系统模块参数管理
    moduleEditAction = makeAct('sys/sysMenuResource/upd'),//---系统模块参数管理
    moduleAddAction = makeAct('sys/sysMenuResource/add');//---系统模块参数管理


// typeof $script=='function' && $script(getDistPath()+'js/filter.js');//引入$filter

//filter.js内容
$filter('istg',function(){
    if(this.valueOf() == '1'){
        return 'checked';
    }else{
        return '';
    }
});

$filter('isbtg',function(){
    if(this.valueOf() == '0'){
        return 'checked';
    }else{
        return '';
    }
});
//变量长度
$filter('asLength',function(){
    return this.valueOf().toString().length
});
//0:不通过   1:通过
$filter('asAcross', function () {
    if(this==1){
        return '通过';
    }else{
        return '不通过'
    }
});
//保管受理
$filter('bgsl', function(item){
    if(this.valueOf() == '1001'){
        return 'selected';
    }else{
        return '';
    }
});
//借出受理
$filter('jcsl', function(item){
    if(this.valueOf() == '1002'){
        return 'selected';
    }else{
        return '';
    }
});
//温度上下限
$filter('temperatureBound',function(item){
    var temperatureUpperLimit = item.temperatureUpperLimit?item.temperatureUpperLimit:'不详';
    var temperatureLowerLimit = item.temperatureLowerLimit?item.temperatureLowerLimit:'不详';
    return temperatureUpperLimit+' / '+temperatureLowerLimit;
});
//湿度上下限
$filter('humidityBound',function(item){
    var humidityUpperLimit = item.humidityUpperLimit?item.humidityUpperLimit:'不详';
    var humidityLowerLimit = item.humidityLowerLimit?item.humidityLowerLimit:'不详';
    return humidityUpperLimit+' / '+humidityLowerLimit;
});



//规则扩展
$.extend($.fn.validatebox.defaults.rules, {
    //列数范围
    colNumRange: {
        validator: function (val) {
            if(parseInt(val)>0 && parseInt(val)<=30){
                return true;
            }else{
                return false;
            }
        },
        message: '列数要在1-30之间'
    },
    //节数范围
    pitchNumRange: {
        validator: function (val) {
            if(parseInt(val)>0 && parseInt(val)<=20){
                return true;
            }else{
                return false;
            }
        },
        message: '节数要在1-20之间'
    },
    zeroToTwo: {
        validator: function (val) {
            if(parseInt(val)>=0 && parseInt(val)<=2){
                return true;
            }else{
                return false;
            }
        },
        message: '箱数只能在0-2之间'
    },
    //长度为12
    lengthTwelve:{
        validator: function (val) {
            if(val.length==12){
                return true;
            }else{
                return false;
            }
        },
        message: '长度为12'
    }
});

// tab页面切换
$('li[tab-direct]').on('click',function(){
    var selector=$(this).attr('tab-direct');
    $('.tab-block').addClass('hide').removeClass('show');
    $(selector).removeClass('hide').addClass('show');
    $(this).addClass('active').siblings('li').removeClass('active');
});

//active 切换
$('u').on('click',function () {
    $(this).addClass('query-block-active').siblings('u').removeClass('query-block-active');
});
//去掉空格
function trimAll(selector) {
    $(selector+' input,'+selector+' textarea').each(function (i,el) {
        var value = $(el).val();
        $(el).val(value.trim());
    });
}
//公共tree查询函数
function cmQueryTreeFn(fn){
    //点击tree搜索申请单位
    $('.result-left').on('click','.ico-search',function(){
        fn();
    });
    //敲击回车键搜索申请单位
    $('.result-left').on('keydown','.in-search',function(e){
        if(e.keyCode == 13){
            fn();
        }
    });
    //点击清除查询信息
    $('.result-left').on('click','.icon-remove-sign',function(){
        $('.result-left').find('.in-search').val('');
    });
}

//公共tree查询函数2 用户页面用到
function cmQueryTreeFn2(fn){
    //点击tree搜索申请单位
    $('#folder').on('click','.ico-search',function(){
        fn();
    });
    //敲击回车键搜索申请单位
    $('#folder').on('keydown','.in-search',function(e){
        if(e.keyCode == 13){
            fn();
        }
    });
    //点击清除查询信息
    $('#folder').on('click','.icon-remove-sign',function(){
        $('#folder').find('.in-search').val('');
    });
}

//节点点击事件之前,总根节点不能点击
function bgdwZTreeBeforeClick(treeId, treeNode, clickFlag){
    if(treeNode.organName=='保管单位'){
        return false;
    }
}

//保管单位下拉框
function allBgdwUnitMsg(data, saveEle){
    $post(sysQueryOrganAct,{'officeType':'2'},function(saveRes){
        //var $saveEle = $('#basic-information-id').find('.prevBgdw');//保管单位
        saveRes.data.each(function(item){
            if(data.organId == item.id) {
                saveEle.append('<option selected value="' + item.id + '">' + item.organName + '</option>');
            }else{
                saveEle.append('<option value="' + item.id + '">' + item.organName + '</option>');
            }
        });
    });
}

//加载申请单位树  treeObj:树对象, selectedNode:选中的节点, ifFirstNode:是否查询第一个节点, ifSearchSelectedNode:是否查询选中节点
//zTreeOnDblClick:节点双击事件
function initSqdwTree(id, zTreeOnClick, ifFirstNode, ifSearchSelectedNode,zTreeOnDblClick) {
    $post(sqdwUnitTreeAct,
        {   "organName":$.trim($('#folder').find('.in-search').val()), //单位信息主键名称,可为空
            officeType: '1'
        }, function (res) {
            if (res.flag == 1) {
                var data = res.data;
                var setting = {
                    view: {
                        selectedMulti: false,//不能多选
                        txtSelectedEnable: true,//允许选择节点的文本
                        dblClickExpand: false//双击不改变节点的展开状态
                    },
                    data: {
                        key: {
                            children: "childrenNode",
                            name: "nodeText"
                        }
                    },
                    callback: {
                        onClick: zTreeOnClick,
                        onDblClick:zTreeOnDblClick
                    }
                };
                var treeNode = {id:"",nodeText: "申请单位", childrenNode: data};
                $('#bgdw-tree').ztree(setting, treeNode);
                var treeObj = $.fn.zTree.getZTreeObj("bgdw-tree");
                treeObj.expandAll(true);

                //查询第一个节点
                if(ifFirstNode && treeObj.getNodes().length>0) {
                    //进入页面，默认查询第一个节点的数据,此处第一个是保管单位，为全部数据，先查询保管单位的子节点
                    var selectedNodesNew = treeObj.transformToArray(treeObj.getNodes())[1];
                    treeObj.selectNode(selectedNodesNew);
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodesNew);//调用点击事件
                }else if(ifSearchSelectedNode){
                    //选中的节点
                    var selectedNodeNew = treeObj.getNodeByParam("id", id, null);
                    //节点不存在，则选中第一个节点
                    if(selectedNodeNew == null){
                        selectedNodeNew = treeObj.getNodes()[1];
                    }
                    treeObj.selectNode(selectedNodeNew);
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
                }
            }
        });
}

//批量勾选的id数组
function batchIdArr(id){
    var dataObj = [];
    if($('#'+id).find('>.all-fix-wrap>.col-fix-wrap').length>0){
        $('#'+id).find('>.all-fix-wrap>.col-fix-wrap>table>tbody>tr').each(function(){
            var $ele = $(this).children('td:eq(0)').children('input');
            if($ele.is(':checked')){
                dataObj.push({'id':$ele.attr('tr-param')});
            }
        });
    }else{
        $('#'+id).find('>tbody>tr').each(function(){
            var $ele = $(this).children('td:eq(0)').children('input');
            if($ele.is(':checked')){
                dataObj.push({'id':$ele.attr('tr-param')});
            }
        });
    }
    return dataObj;
}
//加载保管单位树  treeObj:树对象, selectedNode:选中的节点, ifFirstNode:是否查询第一个节点, ifSearchSelectedNode:是否查询选中节点
//zTreeOnDblClick:节点双击事件
function initBgdwTree(id, zTreeOnClick, ifFirstNode, ifSearchSelectedNode,zTreeOnDblClick) {
    $post(sysQueryOrganAct,{
        "organName":$.trim($('#folder').find('.in-search').val()), //单位信息主键名称,可为空
        "officeType": '2'
    }, function (res) {
        if (res.flag == 1) {
            var data = res.data;
            var setting = {
                view: {
                    selectedMulti: false,//不能多选
                    txtSelectedEnable: true,//允许选择节点的文本
                    dblClickExpand: false//双击不改变节点的展开状态
                },
                data: {
                    key: {
                        children: "childrenNode",
                        name: "organName"
                    }
                },
                callback: {
                    onClick: zTreeOnClick,
                    onDblClick:zTreeOnDblClick
                }
            };
            var treeNode = {id:"",organName: "保管单位", childrenNode: data};
            $('#bgdw-tree').ztree(setting, treeNode);
            var treeObj = $.fn.zTree.getZTreeObj("bgdw-tree");
            treeObj.expandAll(true);

            //查询第一个节点
            if(ifFirstNode && treeObj.getNodes().length>0) {
                //进入页面，默认查询第一个节点的数据,此处第一个是保管单位，为全部数据，先查询保管单位的子节点
                var selectedNodesNew = treeObj.transformToArray(treeObj.getNodes())[1];
                treeObj.selectNode(selectedNodesNew);
                treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodesNew);//调用点击事件
            }else if(ifSearchSelectedNode){
                //选中的节点
                var selectedNodeNew = treeObj.getNodeByParam("id", id, null);
                //节点不存在，则选中第一个节点
                if(selectedNodeNew == null){
                    selectedNodeNew = treeObj.getNodes()[1];
                }
                treeObj.selectNode(selectedNodeNew);
                treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
            }
        }
    },false);
}


//审批意见设置 sys-approval-opinion-set.html
function sysApprovalOpinionSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        var treeObj;//树对象
        var selectedNode;//选中的节点
        //准备配置项
        var approvalcols=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs'},
            {title:'保管单位',  map:'organName',        cls:'cell-m'},
            {title:'业务流程节点',  map:'businessProcessNodeName',      cls:'cell-m'},
            {title:'意见分类',  map:'opinionType.asAcross',    cls:'cell-m tcenter'},
            {title:'意见内容',  map:'opinionContent', cls:'cell-l'},
            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-s tcenter'}
        ];
        var setting = {
            view: {
                selectedMulti: false,
                txtSelectedEnable: true
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };

        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic" param="{id}" title="删除" name="{name}"></a><br>';
            return html.format({
                id:this.valueOf(),
                name:item.organName
            })
        });

        $('#approval-tb').on('click','#into-edit',function(){
            //弹出编辑框
            intoApprovalEdit(this.getAttribute('param'));
        }).on('click','#delete-single',function(){
            //删除单条数据
            deleteForApproval(this.getAttribute('param'),this.getAttribute('name'));
        });

        //注册查询按钮
        $('.approval-search').on('click',function(){
            searchForApproval();
        });

        //注册重置按钮
        $('.approval-reset').on('click',function(){
            resetQuery();
        });

        //注册弹出新增框按钮
        $('.cm-add-btn').on('click', function (){
            intoApprovalAdd();
        });

        //注册批量删除按钮
        $('#approval-result').on('click','.cm-remove-btn',function (){
            deleteBatchForApproval();
        });

        //注册保存按钮
        $('#basic-information-id').on('click','.approval-save',function(){
            saveForApproval(this.getAttribute('param'));
        });

        //注册取消按钮
        $('#basic-information-id').on('click','.approval-cancel',function(){
            window.editApprovalWin.window('close');
        });

        //发动
        searchOpptionTree(true);//查询树和第一个节点
        cmQueryTreeFn(searchOpptionTreeFun);//根据条件查询节点树
        //allBgdwUnitMsg('',$('#bgdw-query'));//查询单位

        //查询审批意见
        function searchForApproval(queryString,isChild){
            $('#approval-result').pagingList({
                action:sysApprovalSearchAct,
                jsonObj:queryString,
                callback:function(data){
                    if(isChild){//点击的是子元素
                        $('#approval-result').find('.cm-add-btn').hide();
                    }else{//点击的父元素申请单位
                        $('#approval-result').find('.cm-add-btn').show();
                    }
                    $('#approval-tb').table({
                        data:data,
                        cols:approvalcols,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }

        //重置查询条件
        function resetQuery(){
            $('#bgdw-query option:selected').val('');
            $('#bus-pro-node-query').find('u').removeClass('query-block-active');
            $($('#bus-pro-node-query').find('u')[0]).addClass('query-block-active');
        }

        //进入审批意见编辑
        function intoApprovalEdit(id){
            $get(makeAct(sysApprovalAct +id),{},function(msg){
                window.editApprovalWin = $open('#editor', {width: 800,height:400, title: '编辑'});
                $template('#basic-information-id',msg.data);
                //allBgdwUnitMsg(msg.data,$('#basic-information-id').find('.prevBgdw'));
            });
        }

        //删除单条数据
        function deleteForApproval(id,name){
            $confirm('确定删除'+name+'?',function (del) {
                if(del){
                    $post(sysApprovalDelAct,{id:id},function(msg){
                        if(msg.flag==1){
                            toast('删除成功');
                            //查询选中的节点
                            searchOpptionTree(false,true,selectedNode.id);
                        }
                    });
                }
            });

        }

        //进入意见审批新增页面
        function intoApprovalAdd(){
            var organId = '';
            if(selectedNode.length == 0){
                toast('请在左侧选择单位');
                return;
            }else{
                //如果是子节点，则取父节点的id;父节点取本身id
                if(selectedNode.isParent){
                    organId = selectedNode.id;
                }else{
                    organId = selectedNode.getParentNode().id;
                }
            }
            var emptyData = {organId:organId,organName:selectedNode.nodeText,businessProcessNode:'',opinionType:'1',opinionContent:''};
            window.editApprovalWin = $open('#editor', {width: 800,height:400, title: '新增'});
            $template('#basic-information-id',emptyData);
            //allBgdwUnitMsg(emptyData,$('#basic-information-id').find('.prevBgdw'));
        }

        //批量删除数据
        function deleteBatchForApproval(){
            var dataObj = batchIdArr('approval-result');//勾选的id数组
            if(dataObj == 0){
                toast("请选择要删除的数据");
            }else {
                $confirm('确定删除?',function (del) {
                    if (del) {
                        $post(sysApprovalDelBatchAct, dataObj, function (msg) {
                            if (msg.flag == 1) {
                                toast('批量删除成功');
                                //重新加载树
                                searchOpptionTree(false, true, selectedNode.id);
                            }
                        })
                    }
                });
            }
        }

        //保存
        function saveForApproval(id){
            var act = '';
            if(id != ''){
                act = sysApprovalUpdAct;//id不为空，则为修改
            }else{
                act = sysApprovalAddAct; //id为空，为新增
            }
            var organId = $.trim($('#basic-information-id').find('span[name="organName"]').attr('organIdValue'));
            $post(act,{
                id:id,
                organId:organId,
                businessProcessNode:$('#bus-pro-node option:selected').val(),
                opinionType:$("input[name='opinion-type']:checked").val(),
                opinionContent:$.trim($("#opinionContent-tp").val())
            },function(msg){
                if(msg.flag==1){
                    toast('保存成功');
                    window.editApprovalWin.window('close');
                    if(id != ''){
                        //id不为空，则为修改 重新加载树
                        searchOpptionTree(false,true,selectedNode.id);
                    }else{
                        //id为空，为新增 重新加载树
                        searchOpptionTree(false,true,organId);
                    }

                }
            });
        }

        //查询单位树 ifSearchFirstNode:查询第一个节点   ifSearchSelectedNode：查询选中的节点  id：查询选中的节点的id
        function searchOpptionTree(ifSearchFirstNode,ifSearchSelectedNode,id){
            $post(sysApprovalTreeAct,{
                "organName":$.trim($('.result-left').find('.in-search').val())
            },function(res){
//                if(res.data.length==0){
//                    return false;
//                }else{
                $('#opption-tree').ztree(setting,res.data);
                treeObj = $.fn.zTree.getZTreeObj("opption-tree");
                if(res.data.length!=0) {
                    treeObj.expandAll(true);
                    //查询第一个节点数据
                    if (ifSearchFirstNode && treeObj.getNodes().length > 0) {
                        //第一个节点
                        var selectedNodeNew = treeObj.getNodes()[0];
                        treeObj.selectNode(selectedNodeNew);
                        treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
                    } else if (ifSearchSelectedNode) {
                        //选中的节点
                        var selectedNodeNew = treeObj.getNodeByParam("id", id, null);
                        //节点不存在，则选中第一个节点
                        if (selectedNodeNew == null) {
                            selectedNodeNew = treeObj.getNodes()[0];
                        }
                        treeObj.selectNode(selectedNodeNew);
                        treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
                    }
                }
//                }
            });
        }

        //用于查询节点树
        function searchOpptionTreeFun(){
            searchOpptionTree(true);
        }


        //点击节点事件：查询分页数据
        function zTreeOnClick(event, treeId, treeNode){
            selectedNode = treeNode;
            ztreeOnClickDetail(treeNode);
        }

        //查询第一个节点的信息
        function queryFirstNode(){
            //拿到所有节点
            var nodes = treeObj.getNodes();
            if(nodes.length > 0){
                var queryString = {organId:nodes[0].organId};
                searchForApproval(queryString);
            }
        }

        //不同的节点，传入不同的参数查询
        function ztreeOnClickDetail(treeNode){
            //父节点用单位id查询
            if(treeNode.isParent){
                searchForApproval({organId:treeNode.id});
            }else{
                //子节点，用节点id查询
                searchForApproval({id:treeNode.id},true);
            }
        }

    });
}

//保管单位设置 sys-bgdw-set.html
function sysBgdwSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        var regionalismAct = '';//区划字典
        var treeObj = [];//树对象
        var areaMapTreeObj = [];//区划关联地图树对象
        var selectedNode = [];//选中的节点
        var zxsDict = ['11','12','31','50'];//直辖市单位

        var areaMapSetting = {
            view: {
                selectedMulti: false,//不能多选
                txtSelectedEnable: true,//允许选择节点的文本
                dblClickExpand: false//双击不改变节点的展开状态
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            callback: {
                onDblClick: areaMapZTreeOnDblClick
            }
        };

        var emptyData = {
            "id": "",
            "organParentId": "",
            "organParentName":"",
            "organName": "",
            "shortenedName": "",
            "paperPrefix": "",
            "countyRegionalism": "",
            "cityRegionalism": "",
            "provinceRegionalism": "",
            "organAdress": "",
            "organTel": "",
            "organSort": "1",
            "openFlag": "",
            "officeType": "",
            "delFlag": "",
            "createTime": "",
            "organCode": "",
            "organStorageId": "",
            "sysUnitinterfaceList":[],
            "sysKeepUnitSet":{
                "id": "",
                "organId": "",
                "keepAppCommitment": "",
                "keepAppFormPrintFlag": "0",
                "keepAppInvalidDay": "1",
                "keepAppDueToDay": "1",
                "approvalProcessFillFlag": "0",
                "applicationNumber": "1",
                "confirmationNumber": "1",
                "showSceneFlag": "0",
                "showKeepUnitNameFlag": "0",
                "showProofArearoomNameFlag": "0",
                "showSectionFlag": "0",
                "showLayerFlag": "0",
                "delFlag": "0",
            }
        };

        $filter('checkZero',function(){
            if(this=='0'){
                return 'checked';
            }
        });
        $filter('checkOne',function(){
            if(this=='1'){
                return 'checked';
            }
        });
        $filter('checkTwo',function(){
            if(this=='2'){
                return 'checked';
            }
        });

        //加号单击事件
        $('#bgdw-info').on('click','.icon-plus',function(){
            var nextVal = $(this).prev().val();
            if(nextVal!=''){
                $(this).prev().val(parseInt(nextVal)+1);
            }
        });

        //减号单击事件
        $('#bgdw-info').on('click','.icon-minus',function(){
            var nextVal = $(this).next().val();
            if(nextVal!='' && nextVal!='1'){
                $(this).next().val(parseInt(nextVal)-1);
            }
        });

        //保存
        $('#save-btn').on('click',function(){
            bgdwSave();
        });

        //添加保管单位
        $('#add-org').on('click',function(){
            //tab页切到第一个
            switchFirstTab();
            //全部区划关联地图/上级保管单位
            allUnitMsg('');
            //基本信息和业务设置
            $template('#bgdw-info',emptyData);
            //查询接口设置
            $get(interFaceDictAct,{},function(dictRes){
                $template('#interface-info',dictRes.data);
            });
            $('#save-btn').attr('operaType','add');
        });

        //删除数据
        $('#del-org').on('click',function(){
            //有选择的节点
            if(selectedNode != null){
                delLogicSysOrganization(selectedNode.id);
            }else{
                toast('请选择需要删除的节点');
            }
        });

        //点击展开区划关联地图
        $('#bgdw-info').on('click','#drop-down-box',function(){
            window.areaMapWin = $open('#area-map',{width: 400,height:500, title: '选择区划'});
        });

        //点击单位的保存,取消，选择空值按钮
        $('#area-map').on('click','.basic-btn',function(){
            areaMapTreeObj = $.fn.zTree.getZTreeObj("area-map-tree");
            //保存
            if(areaMapTreeObj.getSelectedNodes().length == 0){
                toast('请先选择区划，再保存');
            }else{
                //给文本框赋值
                setAreaMapName(areaMapTreeObj.getSelectedNodes()[0]);
            }
        }).on('click','.call-off',function(){
            //取消
            closeareaMapWin();
        }).on('click','.empty-btn',function(){
            //选择空值
            setAreaMapName('');
        });

        //初始化区划关联地图树
        init();

        function initBgdwTreeFun(){
            initBgdwTree(selectedNode.id,zTreeOnClick,true);
        }

        //节点点击事件
        function zTreeOnClick(event, treeId, treeNode) {
            //显示接口设置
            if(treeNode.organName=='保管单位'){
                toast('该节点不存在基本信息').warn();
                return false;
            }
            selectedNode = treeNode;
            querySysOrganization({id:treeNode.id});
            //保存按钮设置为修改
            $('#save-btn').attr('operaType','upd');
        }

        //区划关联地图节点双击事件
        function areaMapZTreeOnDblClick(event, treeId, treeNode) {
            setAreaMapName(treeNode);
        }
        //查询
        function querySysOrganization(queryString){

            //查询结果
            $post(sysGetOrganAct,queryString,function(res){
                if(res.flag == '1'){
                    //基本信息和业务设置
                    $template('#bgdw-info',res.data);
                    //查询接口设置
                    $get(interFaceDictAct,{},function(dictRes){
                        if(dictRes.data!=null&&dictRes.data!=''){
                            //遍历接口类型，添加 地址：
                            for(var i=0;i<dictRes.data.length;i++){
                                dictRes.data[i].dictValue+="地址：";
                            }
                        }
                        $template('#interface-info',dictRes.data);
                        //为对应的接口地址添加值
                        res.data.sysUnitinterfaceList.each(function(item){
                            $('#interface-info').find("span[dictkey='"+item.interfaceTypeName +"']").next().val(item.interfaceUrl);
                        })
                    });
                    //tab页切到第一个
                    switchFirstTab();
                    //全部区划关联地图/上级保管单位
                    allUnitMsg(res.data);
                }
            });
        }

        //保存
        function bgdwSave(){
            var operateType = $('#save-btn').attr('operaType');//操作类型，添加为add 修改为upd
            //判断规则
            $('#bgdw-info').find('.validate').validatebox();
            if($('#bgdw-info').find('.validatebox-invalid').length>0){
                return false;
            }
            var saveData = '';//基本信息和接口信息
            var saveBusData = '';//业务信息
            var saveInterFaceData = '';//接口信息

            //基本信息
            $('#basic-information').find('input[type=text]').each(function(){
                if($(this).attr('name') != 'regionalism') {//区划关联地图不取值
                    saveData += '"' + $(this).attr('name') + '":"' + $(this).val() + '",';
                }
            });
            if(saveData.length > 0){
                saveData.substr(0,saveData.length-1);
            }

            //区划关联地图
            var regionalism = $('#bgdw-info').find('input[name="regionalism"]');
            saveData += '"provinceRegionalism":"'+regionalism.attr('provinceRegionalism')+'",';
            saveData += '"cityRegionalism":"'+regionalism.attr('cityRegionalism')+'",';
            saveData += '"countyRegionalism":"'+regionalism.attr('countyRegionalism')+'",';
            //上级保管单位
            saveData += '"organParentId":"'+$('.prevBgdw').val()+'"';

            saveData = '{' + saveData + '}';

            //业务信息
            $('#business-set input[type=text]').each(function(){
                saveBusData += '"' + $(this).attr('name') + '":"' + $(this).val() + '",';
            });
            $('#business-set input[type=radio]').each(function(){
                if($(this).prop('checked')==true){
                    saveBusData +=  '"' + $(this).attr('name') + '":"' + $(this).val() + '",';
                }
            });
            $('#business-set input[type=checkbox]').each(function(){
                saveBusData += '"' + $(this).attr('name') + '":';
                if($(this).prop('checked')==true){
                    saveBusData += '"1",';
                }else{
                    saveBusData += '"0",';
                }
            });
            //截取最后一个逗号
            if(saveBusData.length>0){
                saveBusData = saveBusData.substr(0,saveBusData.length-1);
            }
            saveBusData = '{' + saveBusData + '}';

            //接口信息
            if(operateType=='add'){
                saveInterFaceData += '[';
                $('#interface-set').find('input[name="interfaceUrl"]').each(function () {
                    saveInterFaceData += '{"interfaceTypeName":"'+
                        $(this).prev().attr('dictkey') + '","interfaceUrl":"'+ $(this).val()+'"},'
                });
            }else {
                saveInterFaceData += '{"id":"' + selectedNode.id +'","sysUnitinterfaceList":[';
                $('#interface-set').find('input[name="interfaceUrl"]').each(function () {
                    saveInterFaceData += '{"interfaceTypeName":"' + $(this).prev().attr('dictkey') +
                        '","interfaceUrl":"' + $(this).val() + '"},';
                });
            }
            //去除最后一个逗号
            if($('#interface-set').find('input[name="interfaceUrl"]').length > 0){
                saveInterFaceData = saveInterFaceData.substr(0,saveInterFaceData.length-1);
            }
            if(operateType=='add') {
                saveInterFaceData += ']';
            }else{
                saveInterFaceData += ']}';
            }
            var sysOrganizationAct = '';
            var sysKeepUnitSetAct = '';
            var sysInterfaceAct = '';
            if(operateType == 'add'){
                //新增基本信息
                sysOrganizationAct = addSysOrganizationAct;
                sysKeepUnitSetAct = addSysKeepUnitSetAct;
                sysInterfaceAct = addBatchInterfaceAct;
                $('#save-btn').attr('operaType','upd');
            }else {
                //修改基本信息
                sysOrganizationAct = updSysOrganizationAct;
                sysKeepUnitSetAct = updSysKeepUnitSetAct;
                sysInterfaceAct = updInterfaceAct;
            }
            //新增或修改基本信息
            $post(sysOrganizationAct, saveData, function (res) {
                if (res.flag == 1) {
                    //新增或修改业务信息
                    var saveBusDataJson = str2obj(saveBusData);
                    var saveInterfaceJson = str2obj(saveInterFaceData);
                    //新增时，单位id通过修改基本信息后返回
                    if(operateType == 'add') {
                        saveBusDataJson.organId = res.data.id;
                        //给接口数据的每项添加单位id
                        for(var i=0;i<saveInterfaceJson.length;i++){
                            saveInterfaceJson[i]["organId"] = res.data.id;
                        }
                    }
                    //业务设置和接口设置
                    $.when($post(sysKeepUnitSetAct, saveBusDataJson),$post(sysInterfaceAct,saveInterfaceJson)).then(function(kusRes,ifRes){
                        if(kusRes[0].flag==1 && ifRes[0].flag==1){
                            toast('保存成功');
                            //重新加载树
                            initBgdwTree(saveBusDataJson.organId,zTreeOnClick,false,true);
                        }
                    });
                }
            });
        }

        //逻辑删除保管单位
        function delLogicSysOrganization(id){
            $post(delLogicSysOrganizationAct,{"id":id},function(res){
                if(res.flag==1){
                    toast('删除成功');
                    //重新加载树
                    initBgdwTree('',zTreeOnClick,true);
                }
            });
        }

        //切换到第一个tab页
        function switchFirstTab(){
            $('#interface-set').removeClass("show").hide();
            $('#basic-info-tab').children().each(function(i){
                $(this).removeClass('active');
                if(i==0){
                    $(this).addClass('active');
                }
            });
        }

        //上级保管单位
        function allUnitMsg(data){
            $post(sysQueryOrganAct,{'officeType':'2'},function(saveRes){
                var $saveEle = $('#basic-information').find('.prevBgdw');//上级保管单位
                saveRes.data.each(function(item){
                    if(data !='' && data.organParentId == item.id) {
                        $saveEle.append('<option selected value="' + item.id + '">' + item.organName + '</option>');
                    }else{
                        $saveEle.append('<option value="' + item.id + '">' + item.organName + '</option>');
                    }
                });
            });
        }

        //初始化
        function init(){
            //区划关联地图 三级树
            $post(querySysDictTreeAct,{rootKey:"XZQHDM"},function(res){
                if(res.flag == 1){
                    $('#area-map-tree').ztree(areaMapSetting, res.data);
                    //展开行政区划节点
                    areaMapTreeObj = $.fn.zTree.getZTreeObj("area-map-tree");
                    var nodes = areaMapTreeObj.getNodes();
                    areaMapTreeObj.expandNode(nodes[0], true, false, false);
                }
                //初始化左侧树
                initBgdwTree(selectedNode.id,zTreeOnClick,true);
                //点击tree搜索单位
                cmQueryTreeFn(initBgdwTreeFun);
            });
        }

        //把选中的区划，赋值给文本框
        function setAreaMapName(treeNode){
            var regionalism = $('#bgdw-info').find('input[name="regionalism"]');
            var regionalismValue = '';//区划名称
            var ifZxs = false;
            regionalism.attr('countyRegionalism','');
            regionalism.attr('cityRegionalism', '');
            regionalism.attr('provinceRegionalism', '');

            if(treeNode != ''){
                if (treeNode.nodeCode.lastIndexOf('0000') == '2') { //选中的节点是省级或直辖市
                    regionalism.attr('provinceRegionalism', treeNode.nodeCode);
                    regionalismValue = treeNode.nodeText;
                } else if (treeNode.nodeCode.lastIndexOf('00') == '4') { //选中的节点是市级
                    //市级区划
                    regionalism.attr('cityRegionalism', treeNode.nodeCode);
                    regionalism.attr('provinceRegionalism', treeNode.getParentNode().nodeCode);
                    regionalismValue = treeNode.getParentNode().nodeText + treeNode.nodeText;
                } else {
                    //区级区划
                    regionalism.attr('countyRegionalism', treeNode.nodeCode);
                    regionalism.attr('cityRegionalism', treeNode.getParentNode().nodeCode);
                    regionalism.attr('provinceRegionalism', treeNode.getParentNode().getParentNode().nodeCode);
                    regionalismValue = treeNode.getParentNode().getParentNode().nodeText + treeNode.getParentNode().nodeText
                        + treeNode.nodeText;

                }
            }
            regionalism.val(regionalismValue);
            closeareaMapWin();
        }

        //关闭区划关联地图弹窗
        function closeareaMapWin(){
            window.areaMapWin.window('close');
        }

        //取得最上级父节点
        function getParentNode(treeNode){
            while(treeNode.getParentNode() != null){
                treeNode = treeNode.getParentNode();
            }
            return treeNode;
        }

    })
}

//日志管理 sys-journal-management.html
function sysJournalManagement(){
    setSubPrj('wz');
    importing('bootstrap-css','datepicker',function () {
        $('.cm-input-time').datepicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});

        //预定义filter
        $filter('asEditDelBtn',function(item){
            var html =  '<a id="delBtn" class="icon-trash trash icon-pic" param="{id}" title="删除"></a>';
            return html.format({
                id:this.valueOf()
            })
        });

        //准备配置项
        var logcols=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs tcenter'},
            {title:'操作时间',  map:'operateTime.dateFormat',      cls:'cell-m tcenter'},
            {title:'操作人',  map:'operateUser',    cls:'cell-m tcenter'},
            {title:'操作描述',  map:'operateDesc', cls:'cell-m'},
            {title:'IP地址',  map:'operateUserIp', cls:'cell-m'}
//            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-m tcenter'}
        ];

        $filter('dateFormat',function(){
            return new Date(this.valueOf()).format('yyyy-MM-dd hh:mm');
        })


        //发动
        querySyslog();

        //查询按钮
        $('#query-btn').on('click',function(){
            querySyslog();
        });
        //重置按钮
        $('#reset-btn').on('click',function(){
            resetQuery();
        });

        //删除单条数据按钮按钮
        $('#log-tb').on('click','#delBtn',function(){
            deleteLog(this.getAttribute('param'));
        });

        //查询日志
        function querySyslog(){
            var operateTime = $('input[name="operate-time"]').val();
            if(operateTime != ''){
                operateTime = new Date(operateTime).format('yyyy/MM/dd hh:mm:ss');
            }
            $('#log-result').pagingList({
                action:journalQueryAct,
                jsonObj:{
                    "operateUser": $.trim($('input[name="operate-user"]').val()),
                    "operateDateTime":operateTime,
                    "operateDesc":$.trim($('input[name="operate-desc"]').val()),
                },
                callback:function(data){
                    $('#log-tb').table({
                        data:data,
                        cols:logcols,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true
                    });
                }
            });
        }

        //重置
        function resetQuery(){
            $('input[name="operate-user"]').val('');
            $('input[name="operate-time"]').val('');
            $('input[name="operate-desc"]').val('');
        }

        //删除单条数据
        function deleteLog(id){
            $confirm('确定删除吗？',function (del) {
                if(del){
                    $post(makeAct(journalDelAct), {id: id}, function (msg) {
                        if (msg.flag == 1) {
                            toast('删除成功');
                            querySyslog();
                        }
                    });
                }
            });
        }

    })
}

//物证条码打印设置 sys-Physical-evidence-print-set.html
function sysEvidencePrintSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        //预定义filter   <a class=" icon-circle-arrow-down down-icon"></a><a class=" icon-circle-arrow-up up-icon"></a>
        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic mr5" param="{id}" title="删除"></a>' +
                '<a id="down-icon" class="icon-circle-arrow-down down-icon mr5" param="{id}" title="展开"></a>' +
                '<a id="up-icon" class="icon-circle-arrow-up up-icon" param="{id}" title="收起"></a>';
            return html.format({
                id:this.valueOf()
            })
        });

        $filter('asOpenFlag',function(){
            if(this.valueOf() == '1'){
                return '启用';
            }else{
                return '未启用';
            }
        });

        //条码类型
        $filter('asTmlx',function(){
            getTmlx(this.valueOf());
        });

        //是否显示条码值（0不显示1显示）
        $filter('ifShowFlag',function(){
            if(this.valueOf() == 1){
                return 'checked';
            }else{
                return '';
            }
        });

        //准备数据源

        var treeObj = [];//树对象
        var selectedNode = [];//选中的节点

        //准备配置项
        var columns=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs tcenter'},
            {title:'类型',  map:'barCodePrintTypeName',        cls:'cell-m tcenter'},
            {title:'左边距',  map:'leftMargin',      cls:'cell-m tcenter'},
            {title:'上边距',  map:'topMargin',    cls:'cell-m tcenter'},
            {title:'状态',  map:'openFlag.asOpenFlag',    cls:'cell-m tcenter'},
            {title:'备注',  map:'reamrk',    cls:'cell-m'},
            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-m tcenter'}
        ];

//        //查询按钮
//        $('#bgdw-query').on('click',function(){
//            query({});
//        });
//
//        //重置按钮
//        $('#bgdw-reset').on('click',function(){
//            $("input[name='organId']").val('');
//        });

        $('#evidence-tb').on('click','#into-edit',function(){
            //选中第一个tab
            switchFirstTab();
            //修改按钮，进入编辑页面
            intoEdit(this.getAttribute('param'));
        }).on('click','#delete-single',function(){
            //删除按钮
            deleteSingle(this.getAttribute('param'));
        });

        //新增按钮
        //注册弹出新增框按钮
        $('.cm-add-btn').on('click', function (){
            //选中第一个tab
            switchFirstTab();
            //进入新增页面
            intoAdd();
        });

        //注册批量删除按钮
        $('.cm-remove-btn').on('click', function (){
            deleteBatch();
        });

        //保存按钮
        $('#edit-evidence').on('click','#save-btn',function(){
            var editId = $('input[name="id"]').val();
            //editId为空：新增。 不为空：把偶从你
            save(editId);
        });

        //取消按钮
        $('#edit-evidence').on('click','#cancel-btn',function(){
            closeEvidenceWin();
        });

        //初始化树,并查询第一个节点
        initBgdwTree(selectedNode.id,zTreeOnClick,true);
        //点击tree搜索申请单位
        cmQueryTreeFn(initBgdwTreeFun);

        function initBgdwTreeFun(){
            initBgdwTree(selectedNode.id,zTreeOnClick,true);
        }

        //节点点击事件
        function zTreeOnClick(event, treeId, treeNode) {
            selectedNode = treeNode;
            query({organId:treeNode.id});
        }

        //分页查询
        function query(queryString){
            $('#evidence-result').pagingList({
                action:printSysQueryAct,
                jsonObj: queryString,
                callback:function(data){
                    $('#evidence-tb').table({
                        data:data,
                        cols:columns,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }

        //进入编辑页面
        function intoEdit(id){
            $get(makeAct(sysBarcodePrintSetAct+id),{},function(res){
                if(res.flag==1){
                    $template('#edit-evidence',res.data);
                    window.evidenceWin = $open('#edit-page', {width: 800,height:400, title: '编辑'});
                    $('#edit-evidence').find('select[column="openFlag"]').val(res.data.openFlag);
                }
            });
        }

        //进入新增页面
        function intoAdd(){
            var emptyData = {aaa:''};
            $template('#edit-evidence',emptyData);
            window.evidenceWin = $open('#edit-page', {width: 800,height:400, title: '编辑'});
        }

        //关闭弹窗
        function closeEvidenceWin(){
            window.evidenceWin.window('close');
        }

        //删除单条数据
        function deleteSingle(id){
            $confirm('确定删除吗？',function (del) {
                if(del){
                    $post(printDeleteSingleAct,{id:id},function(res){
                        if(res.flag==1){
                            toast('删除成功');
                            //重载树，查询选中节点
                            initBgdwTree(selectedNode.id,zTreeOnClick,false,true);
                        }
                    });
                }
            });
        }

        //查询条码类型
        function getTmlx(barcodeType){
            $get(printTmlxAct,{},function(res){
                var tmlxSelect = $('#edit-evidence').find('.barcode-type');
                res.data.each(function(item){
                    if(barcodeType == item.dictKey) {
                        tmlxSelect.append('<option selected value="' + item.dictKey + '">' + item.dictValue + '</option>');
                    }else{
                        tmlxSelect.append('<option value="' + item.dictKey + '">' + item.dictValue + '</option>');
                    }
                });
            });
        }

        //保存
        function save(editId){
            var act = '';
            var jsonStr = {};
            if(editId != ''){
                act = updSysBarcodePrintSetAct;//保存
            }else{
                act = addSysBarcodePrintSetAct;//新增
            }
            $('#edit-evidence').find('input[type="text"]').each(function(){
                jsonStr[$(this).attr('name')] = $(this).val();
            });
            $('#edit-evidence').find('select').each(function(){
                jsonStr[$(this).attr('column')] = $(this).find('option:selected').val();
            });
            $('#edit-evidence').find('input[type="checkbox"]').each(function(){
                if($(this).prop('checked')==true){
                    jsonStr[$(this).attr('name')] = 1;
                }else{
                    jsonStr[$(this).attr('name')] = 0;
                }
            });
            $('#edit-evidence').find('textarea').each(function(){
                jsonStr[$(this).attr('name')] = $(this).val();
            });

            //新增时，判断是否选择了单位节点
            if(editId == '' && selectedNode.length==0){
                toast('请在左侧选择单位');
                return;
            }else{
                jsonStr.organId = selectedNode.id;
            }
            $post(act,jsonStr,function(res){
                if(res.flag==1){
                    toast('保存成功');
                    window.evidenceWin.window('close');
                    treeObj = $.fn.zTree.getZTreeObj("bgdw-tree");
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNode);//调用点击事件
                }
            });
        }

        //批量删除数据
        function deleteBatch(){
            var delBatchId = $('#evidence-tb>tbody').children('tr:has(":checked.stp-check-tr")').toArray().select( 't => {id: $(t).find("a[param]").attr("param") }');
            if(delBatchId == ''){
                toast("请选择要删除的数据");

            }else {
                $post(delBatchSysBarcodePrintSetAct, delBatchId, function (msg) {
                    if (msg.flag == 1) {
                        toast('批量删除成功');
                        //重新加载树
                        initBgdwTree(selectedNode.id,zTreeOnClick,false,true);
                    }
                })
            }
        }

        //弹出修改或新增框时，选中第一个tab
        function switchFirstTab(){
            $('#edit-page').find('li').removeClass('active');
            $($('#edit-page').find('li')[0]).addClass('active').click();
        }
    })
}

//数据字典设置 sys-num-dictionary-set.html
function sysNumDictionarySet(){
    setSubPrj('wz');
    importing('ztree',function(){
        var treeObj,selectedNode;//树对象，选中的节点
        //准备配置项
        var dictcols=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs'},
            {title:'字典名称',  map:'dictValue',        cls:'cell-m'},
            {title:'上级目录',  map:'parentValue',      cls:'cell-m'},
            {title:'字典代码',  map:'dictKey',    cls:'cell-m'},
            {title:'状态',  map:'openFlag.asEnable', cls:'cell-m'},
            {title:'顺序',  map:'dictSort', cls:'cell-m'},
            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-s tcenter'}
        ];

        var settingDict = {
            view: {
                selectedMulti: false,
                txtSelectedEnable: true
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };

        //预定义filter
        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic" param="{id}" name="{dictValue}" title="删除"></a><br>';
            return html.format({
                id:this.valueOf(),
                name:item.organName
            })
        });

        $('#dict-result').on('click','#delete-single',function(){
            //逻辑删除单条
            del(this.getAttribute('param'),this.getAttribute('name'));
        }).on('click','.cm-remove-btn',function(){
            //批量物理删除
            delBatch();
        }).on('click','#into-edit',function(){
            //弹出修改框
            intoDictEdit(this.getAttribute('param'));
        }).on('click','.cm-add-btn',function(){
            //弹出新增框
            intoDictAdd(this.getAttribute('param'));
        });

        $('#editor').on('click','.call-off',function(){
            //取消
            window.editDictWin.window('close');
        }).on('click','.basic-btn',function(){
            if($(this).attr('tType')){
                //同级保存
                save(true);
            }else{
                //保存
                save();
            }

        });
        //新增最外层同级节点
        $('.treeTableType').on('click','.icon-plus',function(){
            window.editDictWin = $open('#editor', {width: 800,height:400, title: '新增'});
            $('#editor').find('input:not(:radio)').val('');
            $('#editor').find('[name="rootKey"]').prop('readonly',false).removeClass('gray-input');
            $('#editor').find(":radio").eq(0).prop('checked',true);
            $('#editor').find('.basic-btn').attr('tType','sLevel')
        });

        //查询树第一个节点信息
        searchSysDictTree(true);
        cmQueryTreeFn(searchDictTreeFun);//根据条件查询节点树

        //分页查询
        function query(jsonStr){
            $('#dict-result').pagingList({
                action:dictionaryQueryAct,
                jsonObj:jsonStr,
                callback:function(data){
                    $('#dict-tb').table({
                        data:data,
                        cols:dictcols,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }

        //逻辑删除单条
        function del(id,name){
            $confirm('确定删除'+name+'?',function (del) {
                if(del){
                    $post(dictionaryDelAct,{id:id},function(msg){
                        if(msg.flag==1){
                            toast('删除成功');
                            searchSysDictTree(false, true, selectedNode.id);
                        }
                    });
                }
            });
        }

        //批量物理删除
        function delBatch(){
            var dataObj = batchIdArr('dict-result');//勾选的id数组
            if(dataObj == 0){
                toast("请选择要删除的数据");
            }else {
                $confirm('确定删除?',function (del) {
                    if(del){
                        $post(dictionaryDelBatchAct, dataObj, function (msg) {
                            if (msg.flag == 1) {
                                toast('批量删除成功');
                                searchSysDictTree(false, true, selectedNode.id);
                            }
                        })
                    }
                });
            }
        }

        //用于查询节点树
        function searchDictTreeFun(){
            searchSysDictTree(true);
        }

        //查询字典项树形结构 ifSearchFirstNode:查询第一个节点   ifSearchSelectedNode：查询选中的节点  id：查询选中的节点的id
        function searchSysDictTree(ifSearchFirstNode,ifSearchSelectedNode,id){
            $post(dictionarySysDictTreeAct,{
                "dictValue":$.trim($('.result-left').find('.in-search').val())
            },function(res){
                $('#dict-tree').ztree(settingDict,res.data);
                treeObj = $.fn.zTree.getZTreeObj("dict-tree");
                //treeObj.expandAll(true);
                //查询第一个节点数据
                if(ifSearchFirstNode && treeObj.getNodes().length>0){
                    //第一个节点
                    var selectedNodeNew = treeObj.getNodes()[0];
                    treeObj.selectNode(selectedNodeNew);
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
                }else if(ifSearchSelectedNode){
                    //选中的节点
                    var selectedNodeNew = treeObj.getNodeByParam("id", id, null);
                    //节点不存在，则选中第一个节点
                    if(selectedNodeNew == null){
                        selectedNodeNew = treeObj.getNodes()[0];
                    }
                    treeObj.selectNode(selectedNodeNew);
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, selectedNodeNew);//调用点击事件
                    treeObj.expandNode(selectedNodeNew, true, false, true);//展开节点
                }
            });
        }

        //点击节点事件：查询分页数据
        function zTreeOnClick(event, treeId, treeNode){
            selectedNode = treeNode;
            var jsonStr = {dictKey:treeNode.nodeCode,rootKey:treeNode.nodeRootCode,delFlag:'0'}
            query(jsonStr);
        }

        //进入字典编辑
        function intoDictEdit(id){
            $get(makeAct(dictAct +id),{},function(msg){
                window.editDictWin = $open('#editor', {width: 800,height:400, title: '编辑'});
                $template('#editor',msg.data);
                //是否启用
                if(msg.data.openFlag == '1'){
                    $('input[name="openFlag"]:eq(0)').attr("checked",'checked');
                }else{
                    $('input[name="openFlag"]:eq(1)').attr("checked",'checked');
                }
            });
        }

        //进入字典新增
        function intoDictAdd(){
            window.editDictWin = $open('#editor', {width: 800,height:400, title: '编辑'});
            //清空
            $('#editor').find('input').each(function(){
                if($(this).prop('type')=='text'){
                    $(this).val('');
                }else if($(this).prop('type')=='radio'){
                    $(this).parent().find('input:eq(0)').prop('checked','checked');
                }
            })
            //上级目录为左侧树选中的节点
            $('#editor').find('input[name="parentKey"]').val(selectedNode.nodeCode);
            //字典类型为左侧树选中的节点的字典类型
            $('#editor').find('input[name="rootKey"]').val(selectedNode.nodeRootCode);
            //字典级别为左侧树选中的节点的字典级别+1
            $('#editor').find('input[name="dictLevel"]').val(parseInt(selectedNode.nodeLevel)+1);
            $('#editor').find('.basic-btn').attr('tType','');
        }

        //保存
        function save(sLevel){
            var saveData={};
            var acr = '';
            var selectNodeId = '';//重新加载树后选中的节点
            $('#editor').find('input').each(function(){
                if($(this).prop('type')=='text'){
                    saveData[$(this).prop('name')] = $(this).val();
                }else if($(this).prop('type')=='radio'){
                    if($(this).prop('checked') == true) {
                        saveData[$(this).prop('name')] = $(this).val();
                    }
                }
            });
            saveData["delFlag"] = '0';
            //id存在则为修改，不存在则为新增
            if(saveData['id'] != ''){
                act = dictionaryUpdAct;//修改
            }else{
                act = dictionaryAddAct;//新增
            }
            if(sLevel){//如果这个是新增同级节点
                saveData.dictLevel = 1;

            }
            $('#editor').find('.add-valid').validatebox();
            if($('#editor').find(".validatebox-invalid").length>0){
                return;
            }
            $post(act,saveData,function(res){
                if(res.flag == 1){
                    toast('保存成功');
                    //id存在则为修改，不存在则为新增
                    if(saveData['id'] != ''){
                        selectNodeId = selectedNode.id;//修改为选中节点的id
                    }else{
                        selectNodeId = res.data.id;//新增为新增的id
                    }
                    searchSysDictTree(false, true, selectNodeId);
                    window.editDictWin.window('close');
                }
            });
        }

    })
}

//角色设置 sys-role-set.html
function sysRoleSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        //预定义filter
        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic" param="{id}" title="删除"></a>';
            return html.format({
                id:this.valueOf()
            })
        });

        //准备配置项
        var columns=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs'},
            {title:'角色名称',  map:'roleName',        cls:'cell-m'},
            {title:'角色描述',  map:'roleDesc',      cls:'cell-m'},
            {title:'角色状态',  map:'openFlag.asEnable',    cls:'cell-m tcenter'},
            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-m tcenter'}
        ];

        //初始化角色名称下拉框，并查询
        roleNameDict();


        //查询按钮
        $('.demand-btn').find('.query-btn').on('click',function(){
            query();
        });

        //查询按钮
        $('.demand-btn').find('.reset-btn').on('click',function(){
            reset();
        });

        //权限右移
        $('.ion.icon-arrow-right').on('click',function(){
            //左边的div
            var selectDivLeft = $($(this).parent().find('div')[0]);
            //右边的div
            var selectDivRight = $($(this).parent().find('div')[1]);
            //选中的p标签
            var selectP = selectDivLeft.find('p.active');
            $(selectP).remove();
            selectP.removeClass('active');
            selectDivRight.append(selectP);
        });

        //权限左移
        $('.ion.icon-arrow-left').on('click',function(){
            //左边的div
            var selectDivLeft = $($(this).parent().find('div')[0]);
            //右边的div
            var selectDivRight = $($(this).parent().find('div')[1]);
            //选中的p标签
            var selectP = selectDivRight.find('p.active');
            $(selectP).remove();
            selectP.removeClass('active');
            selectDivLeft.append(selectP);
        });

        $('#editor').find('.call-off').on('click',function(){
            window.roleWin.window('close');
        });

        //批量删除
        $('.cm-remove-btn').on('click', function (){
            deleteBatchForRole();
        });

        //弹出新增框
        $('.cm-add-btn').on('click', function (){
            intoRoleAdd();
        });

        $('#role-tb').on('click','#into-edit',function(){
            //弹出修改框
            intoRoleEdit(this.getAttribute('param'));
        }).on('click','#delete-single',function(){
            //删除单条数据
            deleteForRole(this.getAttribute('param'));
        });

        //修改角色保存
        $('.basic-btn').on('click',function(){
            upd();
            window.roleWin.window('close');
        });

        //分页查询
        function query(){
            $('#role-result').pagingList({
                action:sysRoleQueryAct,
                jsonObj:{
                    roleName:$('#role-name-query option:selected').val(),
                    roleDesc:$('.query-block.cq-condition').find('input[name="roleDescQuery"]').val()
                },
                callback:function(data){
                    $('#role-tb').table({
                        data:data,
                        cols:columns,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }

        //重置
        function reset(){
            $('#role-name-query option:first').prop("selected", 'selected');
            $('.query-block.cq-condition').find('input[name="roleDescQuery"]').val('');
        }

        //弹出角色新增框
        function intoRoleAdd(id){
            //选中第一个tab
            switchFirstTab();
            //清空数据
            $('#basic-information').find('input[name="id"]').val('');
            $("[name='roleDesc']").val('');
            $('#interface-set').find('.bus-permissions').empty();
            $('#index-parts').find('.bus-permissions').empty();

            //角色名称下拉框
            jsmcSelect('');
            //查询用户没有的业务流程权限
            searchAllBusProPer([]);
            //查询角色菜单权限树
            queryModuleTree([]);
            window.roleWin = $open('#editor', {width: 800,height:400, title: '新增'});
        }

        //弹出角色修改框
        function intoRoleEdit(id){
            //选中第一个tab
            switchFirstTab();
            var roleMenuArr = [];//角色菜单权限
            var busProArr = new Array();//业务流程权限
            var homePart = new Array();//首页部件权限
            //基本信息
            $get(makeAct(sysRoleAct+id),{},function(res){
                var data = res.data;
                $('#basic-information').find('input[name="id"]').val(data.id);
                $("[name='roleDesc']").val(data.roleDesc);
                var sysRolePermisList = data.sysRolePermisList;
                $('#interface-set').find('.bus-permissions').empty();
                $('#index-parts').find('.bus-permissions').empty();

                //角色名称下拉框
                jsmcSelect(data.roleName);
                //分类角色不同的权限，放到不同的数组中
                for(var i=0;i<sysRolePermisList.length;i++){
                    //权限分类
                    var permissionType = sysRolePermisList[i].permissionType;
                    var permissionId = '';
                    if(permissionType == '0'){
                        roleMenuArr.push(sysRolePermisList[i].permissionId);
                    }else if(permissionType=='1' || permissionType=='2'){
                        if(permissionType == '1'){
                            permissionId = 'interface-set';
                            busProArr.push(sysRolePermisList[i].permissionId);
                        }else{
                            permissionId = 'index-parts';
                            homePart.push(sysRolePermisList[i].permissionId);
                        }
                        $('#'+permissionId).find('.bus-permissions').append('<p permissionId="' + sysRolePermisList[i].permissionId
                            + '">' + sysRolePermisList[i].permissionName + '</p>')
                    }
                }
                //查询用户没有的业务流程权限
                searchAllBusProPer(busProArr);
                //查询角色菜单权限树
                queryModuleTree(roleMenuArr);
            });

            window.roleWin = $open('#editor', {width: 800,height:400, title: '编辑'});
        }


        //删除单个角色
        function deleteForRole(id){
            $confirm('确定删除吗？',function (del) {
                if(del){
                    $post(sysRoleDelAct,{id:id},function(msg){
                        if(msg.flag=='1'){
                            toast("删除成功");
                            query();
                        }
                    });
                }
            });

        }

        //批量删除
        function deleteBatchForRole(){
            var delBatchId = $('#role-tb>tbody').children('tr:has(":checked.stp-check-tr")').toArray().select( 't => {id: $(t).find("a[param]").attr("param") }');
            if(delBatchId == ''){
                toast('请选择要删除的数据');
            }else {
                $confirm('确定删除吗？', function (del) {
                    if (del) {

                        $post(sysRoleDelBatchAct, delBatchId, function (res) {
                            if (res.flag == 1) {
                                toast('批量删除成功');
                                query();
                            }
                        });
                    }
                });
            }
        }

        //查询角色菜单权限树
        function queryModuleTree(roleMenuArr){
            $post(sysRoleMenuResourceTreeAct,{},function(res){
                var data = res.data;
                var settingModuleTree = {
                    check:{
                        enable: true
                    },
                    data:{
                        key:{
                            name:"resourceName"
                        },
                        simpleData: {
                            enable: true,
                            idKey: "resourceId",
                            pIdKey: "superId"
                        }
                    }
                };
                zTreeObj = $('#module-tree').ztree(settingModuleTree, data);
                var treeObj = $.fn.zTree.getZTreeObj("module-tree");
                treeObj.expandAll(true);

                //遍历树，有权限且不是父节点的勾选
                var nodes = treeObj.transformToArray(treeObj.getNodes());
                for (var i = 0; i < nodes.length; i++) {
                    if(roleMenuArr.indexOf(nodes[i].resourceId) >= 0 && !nodes[i].isParent){
                        treeObj.checkNode(treeObj.getNodeByParam("resourceId", nodes[i].resourceId, null), true, true);
                    }
                }
            });
        }

        //权限点击高亮
        $('.process-permissions').on('click','p',function(){
            //取消别的选项的高亮
            $('.process-permissions').find('p').removeClass('active');
            //高亮当前选项
            $(this).addClass('active');
        });

        //查询用户没有的业务流程权限
        function searchAllBusProPer(busProArr){
            $('#interface-set').find('.all-bus-permission').empty();
            $get(sysRoleBusProPerAct,{},function(res){
                if(res.flag == 1){
                    res.data.each(function(item){
                        if(busProArr.indexOf(item.id) < 0) {
                            $('#interface-set').find('.all-bus-permission').append('<p permissionId="' + item.id
                                + '">' + item.dictValue + '</p>');
                        }
                    });
                }
            });
        }

        //修改角色
        function upd(){
            var roleData = {openFlag:1};//角色信息
            var roleMenuArr = [];//角色菜单权限
            var busProArr = new Array();//业务流程权限
            var homePartArr = new Array();//首页部件权限
            var roleId = '';
            var act = '';//修改或新增用户
            //角色基本信息
            $('#basic-information').find('input,textarea,select').each(function(){
                roleData[$(this).attr('name')] = $(this).val();
                if($(this).attr('name') == 'id'){
                    roleId =$(this).val();
                }
            });
            //角色菜单权限
            var treeObj = $.fn.zTree.getZTreeObj("module-tree");
            var nodes = treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
                roleMenuArr.push(nodes[i].resourceId);
            }
            //业务流程权限
            $('#interface-set').find('.bus-permissions').find('p').each(function(){
                busProArr.push($(this).attr('permissionId'));
            });
            //首页部件权限
            $('#index-parts').find('.bus-permissions').find('p').each(function(){
                homePartArr.push($(this).attr('permissionId'));
            });
            if(roleId == ''){
                act = sysRoleAdd;
            }else{
                act = sysRoleUpd;
            }
            //修改角色基本信息
            $post(act,roleData,function(res){
                if(res.flag == 1){
                    //新增角色返回角色id
                    if(roleId == ''){
                        roleId = res.data.id;
                    }
                    //修改角色菜单权限
                    updPermission({id:roleId,permissionIds:roleMenuArr,permissionType:0});
                    //修改业务流程权限
                    updPermission({id:roleId,permissionIds:busProArr,permissionType:1});
                    //修改首页部件权限
                    updPermission({id:roleId,permissionIds:homePartArr,permissionType:2});
                    //重新查询
                    query();
                }
            });
        }

        //修改权限信息
        function updPermission(jsonStr){
            $post(addPermissionRoleAct,jsonStr,function(res){});
        }

        //弹出修改或新增框时，选中第一个tab
        function switchFirstTab(){
            $('#editor').find('li').removeClass('active');
            $($('#editor').find('li')[0]).addClass('active').click();
        }

        //角色名称下拉框
        function jsmcSelect(roleName){
            //查询角色名称字典
            $get(sysRoleJsmcdmrAct,{},function(jsmcRes){
                if(jsmcRes.flag == 1){
                    var $jsmc = $('#editor').find('select[name="roleName"]');
                    $jsmc.empty();//清空
                    jsmcRes.data.each(function(item){
                        if(roleName !='' && roleName == item.dictValue) {
                            $jsmc.append('<option selected value="' + item.dictValue + '">' + item.dictValue + '</option>');
                        }else{
                            $jsmc.append('<option value="' + item.dictValue + '">' + item.dictValue + '</option>');
                        }
                    });
                }
            });
        }

        function roleNameDict(){
            $get(sysRoleJsmcdmrAct,{},function(res){
                if(res.flag==1){
                    var $roleName = $('#role-name-query');
                    $roleName.empty();//清空
                    $roleName.append('<option value="">不限</option>');
                    res.data.each(function(item){
                        $roleName.append('<option value="' + item.dictValue + '">' + item.dictValue + '</option>');
                    });
                    query();
                }
            });
        }
    })
}

//申请单位 sys-sqdw-set.html
function sysSqdwSet(){
    setSubPrj('wz');
    importing('ztree',function () {
        var nodes = [],zTreeObj,treeObj,cliNodeId,isAddNode,selectedNode;//ztree数据
        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    cliNodeId = treeObj.getSelectedNodes()[0].id;
                    $('.content-folder').find('.ico-remove').attr('tName',treeNode.nodeText);
                    loadTreeInfo(treeNode,treeNode.id);
                }
            }
        };

        //查询ztree申请单位列表
        function queryApplyUnit(isInit){
            $post(sqdwUnitTreeAct,{
                "organName":$.trim($('.result-left').find('.in-search').val()), //单位信息主键ID,可为空
                "officeType":"1" //单位类别（1申请单位，2，保管单位），不可为空
            },function(res){
                var data = {nodeText:'申请单位',childrenNode:res.data};
                zTreeObj = $('#approval-tree').ztree(setting,data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                if(isInit){//true:表示是否是初始化加载tree
                    treeObj.selectNode(treeObj.getNodes()[0].childrenNode[0]);
                    loadTreeInfo(null,treeObj.getNodes()[0].childrenNode[0].id);
                }
            })
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id){
            var nodesObj = treeNode;
            var cliNodeAct = id ? sqdwQueryTreeMsgAct+'/'+id : sqdwQueryTreeMsgAct;
            if(id){
                $get(cliNodeAct,{},function(res){
                    if(res.data.sysUnitinterfaceList.length==0){
                        res.data.sysUnitinterfaceList.push({interfaceTypeName:"现勘系统数据接口地址"},{interfaceTypeName:"现勘系统页面接口地址"})
                    }
                    allUnitMsg(res.data);
                })
            }else{
                toast('该节点不存在基本信息').warn();
            }
        }
        //全部申请单位/保管单位
        function allUnitMsg(data){
            var applyorganCode = data.organParentId ? data.organParentId : '';//上级申请单位id
            var saveorganCode = data.organStorageId;//所属保管单位id
            var dataId = data.id;//基本数据的id
            $('#basic-information').template(data);
            $('#basic-information').find('.basic-btn').attr('dataid',dataId);//把单位id赋值到保存按钮上
            $.when($post(sqdwAllUnitMsgAct,{'officeType':'1'}),$post(sqdwAllUnitMsgAct,{'officeType':'2'})).then(function(applyRes,saveRes){
                var $applyEle = $('#basic-information').find('.prevApplyUnit');//申请单位
                var $saveEle = $('#basic-information').find('.belongs-save');//保管单位
                applyRes[0].data.each(function(item){
                    $applyEle.append('<option value="'+item.id+'">'+item.organName+'</option>')
                });
                saveRes[0].data.each(function(item){
                    $saveEle.append('<option value="'+item.id+'">'+item.organName+'</option>')
                });
                $applyEle.val(applyorganCode);
                $saveEle.val(saveorganCode);
            });
        }
        //获取基本信息请求体数据对象
        function getDataObj(){
            var obj = {};
            obj.sysUnitinterfaceList = [];
            $('#basic-information').find('input,select').each(function(i,item){
                var $ele = $(item);
                var placeName = $ele.prev().html().replace(/：$/,'');
                if(item.name=='interfaceUrl'){
                    obj.sysUnitinterfaceList.push({interfaceUrl:item.value,interfaceTypeName:placeName})
                }else{
                    obj[item.name] = $ele.val();
                }
            });
            obj.openFlag = 1;//是否开放（0未开放，1已开放)
            obj.officeType = 1;//单位类别（1申请单位，2，保管单位，）
            obj.delFlag = 0;//删除标记（0未删除，1已删除）
            return obj;
        }

        //点击重置按钮
        $('.cq-condition').on('click','.reset-btn',function(){

        });
        //点击添加树节点基本信息
        $('.content-folder').on('click','.ico-add',function(){
            var newData = [{organSort:1,sysUnitinterfaceList:[{interfaceTypeName:"现勘系统数据接口地址"},{interfaceTypeName:"现勘系统页面接口地址"}]}];
            isAddNode = true;//是否是添加申请单位标识符
            treeObj.cancelSelectedNode();
            allUnitMsg(newData);
        });
        //点击删除树节点
        $('.content-folder').on('click','.ico-remove',function(){
            if(cliNodeId){//true:表示已选一个树节点
                $confirm('确定删除'+$(this).attr('tName')+'?',function (del) {
                    if(del){
                        $post(sqdwDeleteTreeNodeAct,{id:cliNodeId},function(res){
                            toast('删除成功').ok();
                            cliNodeId = '';
                            treeObj.cancelSelectedNode();
                            queryApplyUnit();
                        });
                    }
                });
            }else{
                toast('没有选中要删除的申请单位').err();
            }
        });
        //点击基本信息中增加顺序
        $('#basic-information').on('click','.plus-btn',function(){
            var num = $(this).prev().val();
            num++;
            $(this).prev().val(num);
        });
        //点击基本信息中减少顺序
        $('#basic-information').on('click','.icon-minus',function(){
            var num = $(this).next().val();
            if(num<=1){
                return;
            }
            num--;
            $(this).next().val(num);
        });
        //点击保存修改的基本信息
        $('#basic-information').on('click','.basic-btn',function(){
            $('#basic-information').find('.validate').validatebox();
            if($('#basic-information').find('.validatebox-invalid').length>0){
                return;
            }

            var dataObj = getDataObj();
            dataObj.id = $(this).attr('dataid');

            if(isAddNode){//新增申请单位
                $post(sqdwAddUnitTreeAct,dataObj,function(res){
                    toast('新增成功').ok();
                    isAddNode = false;
                    $('#basic-information').find('.basic-btn').attr('dataid',res.data.id);
                    queryApplyUnit()
                },true)
            }else{//修改申请单位
                $post(sqdwUpdateMsgAct,dataObj,function(res){
                    toast('修改成功').ok();
                    queryApplyUnit()
                },true)
            }
        });

        //执行ztree查询
        queryApplyUnit(true);
        //点击tree搜索申请单位
        cmQueryTreeFn(queryApplyUnit)

    })
}

//设备设置 sys-equipment-set.html
function sysEquipmentSet(){
    setSubPrj('wz');
    importing('ztree','bootstrap-js','datepicker',function () {
        var selectedNode,allUintData;//选中节点
        //准备配置项设备信息
        var modulecols=[
            {title:'序号',     map:'rowNum',      cls:'cell-xs'},
            {title:'设备名称',         map:'equipmentName',        cls:'cell-m'},
            {title:'设备类型',   map:'equimentTypeChinese',      cls:'cell-m'},
            {title:'设备编码', map:'equipmentCode',    cls:'cell-m'},
            {title:'所属单位',  map:'organName', cls:'cell-m'},
            {title:'所属物证室',  map:'proofRoomName', cls:'cell-m'},
            {title:'设备状态',      map:'onlineFlag.onlineState', cls:'cell-xs'},
            {title:'操作',      map:'id.asEditDelSortBtn', cls:'cell-xs tcenter'}
        ];

        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    selectedNode = treeObj.getSelectedNodes()[0];
                    loadTreeInfo(treeNode,treeNode.id,treeNode.type);
                }
            }
        };
        //在线状态
        $filter('onlineState',function(){
            return this.valueOf() == 1 ? '在线' : this.valueOf() == 0 ? '不在线' : '' ;
        });
        //添加修改和删除
        $filter('asEditDelSortBtn',function(item){
            var html = '<a class="icon-pencil mr5" param="{id}" type="{type}" name="{equipmentName}" orgid="{orgid}" roomid="{roomid}" title="修改"></a>'+
                '<a class="icon-trash trash mr5" param="{id}" name="{equipmentName}" title="删除"></a>';
            return html.format({
                id:this.valueOf(),
                equipmentName:item.equipmentName, //设备名称
                type:item.equipmentType,//设备类型
                orgid:item.organId,//单位id
                roomid:item.proofRoomId//物证室id
            })
        });
        //是否关联打印机
        $filter('isRelevancePrt',function(item){
            if(this.valueOf()==0){
                return '未关联';
            }else{
                return '关联';
            }
        });
        //字符串转数字
        $filter('asNumberType',function(){
            return +this.valueOf()
        });
        //查询table列表
        function queryTableList(type,id,len,datatype,act){
            var roomid,orgid,areaId,newData;
            if(type==1){//点击申请单位
                orgid = id+'123';//让其找不到
                roomid = '';
            }else if(type==1007){
                orgid = '';
                areaId = id;
            }else{
                orgid = '';
                roomid = id;
            }
            $('#module-result').pagingList({
                action:act?act:equipmentQueryTableAct,
                jsonObj:{
                    "queryType":type?type:'',//查询类型 1：点击单位，查询物证室信息   2：点击物证室，查询设备信息  其它：查询区域控制器下环控设备信息
                    "proofRoomId":roomid?roomid:'',//所属物证室id
                    "organId":orgid?orgid:'',//所属单位id
                    "equipmentParentId":areaId?areaId:'',//区域控制器id
                    "equipmentName":'',//设备名称
                    "equipmentType":''//设备类型
                },
                method:datatype?datatype:'post',
                callback:function(data){

                    if(type==1) {//点击申请单位
                        toast('该节点为单位信息节点,子节点不存在设备信息').warn().css('width',360);
                        $('.cm-remove-btn').hide();
//                        $('.cm-dropdown-btn').hide();
                        newData = [];
                    }else if(type==2&&len==0){//点击物证室且无子设备
                        toast('该物证室下无设备,请新增设备').warn().css('width',300);
                        $('.cm-remove-btn').hide();
//                        $('.cm-dropdown-btn').show();
                        newData = []
                    }else{//点击其他
                        newData = data;
                        $('.cm-remove-btn').show();
                    }
                    allUintData = newData;//把当前的列表值赋给它
                    $('#sys-devSetting-tb').table({
                        data:newData,
                        cols:modulecols,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }
        //查询ztree设备列表
        function queryTreeDeviceList(isInit){//true:表示是否是初始化加载tree
            $post(equipmentQueryTreeNodeAct,{
                "proofRoomName":$.trim($('.result-left').find('.in-search').val())//所属单位id
            },function(res){
                var initId,initType;
                zTreeObj = $('#approval-tree').ztree(setting,res.data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                initId = selectedNode ? selectedNode.id : treeObj.getNodes()[0].childrenNode[0].id;
                initType = selectedNode ? selectedNode.type : treeObj.getNodes()[0].childrenNode[0].type;
                if(!selectedNode){
                    if(treeObj.getNodes()[0].childrenNode.length>0){
                        treeObj.selectNode(treeObj.getNodes()[0].childrenNode[0]);//初始化赋
                    }else{
                        treeObj.selectNode(treeObj.getNodes()[0]);//初始化赋
                    }

                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                }
                loadTreeInfo([],initId,initType,isInit);
            },true)
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id,type,isInit){
            var nodesObj = treeNode;
            var cliNodeAct = id ? equipmentQueryTreeDeviceAct+'/'+id : equipmentQueryTreeDeviceAct;
            var len = nodesObj.childrenNode ? nodesObj.childrenNode.length : null;
            if((type==1007 && len==0) || (type !=1 && type !=2 && type!=1007)){
                queryTableList(type,id,len,"GET",cliNodeAct);
            }else{
                queryTableList(type,id,len);
            }
            queryDeviceList(type,isInit)
        }
        //查询设备类型类别
        function queryDeviceList(type,isInit){
            if(type==2){//点击物证室
                var orgpId1 = treeObj.getSelectedNodes()[0] ? treeObj.getSelectedNodes()[0].getParentNode().id : '',//物证室的单位id
                    roomId1 = treeObj.getSelectedNodes()[0] ? treeObj.getSelectedNodes()[0].id : '';//物证室的id
            }else if(type==1007){//点击区域控制器
                var orgpId2 = treeObj.getSelectedNodes()[0] ? treeObj.getSelectedNodes()[0].getParentNode().getParentNode().id : '',//区域控制器的单位id
                    roomId2 = treeObj.getSelectedNodes()[0] ? treeObj.getSelectedNodes()[0].getParentNode().id : '',//区域控制器的物证室id
                    equipId = treeObj.getSelectedNodes()[0] ? treeObj.getSelectedNodes()[0].id : '';//区域控制器的id
            }

            if(isInit){//假如是第一次加载
                orgpId1 = treeObj.getNodes()[0].childrenNode[0].getParentNode().id;//第一个物证室的单位id
                roomId1 = treeObj.getNodes()[0].childrenNode[0].id;//第一个物证室的id
            }

            $post(equipmentQueryDeviceListAct,{
                "rootKey":'YJSBLXDM',//字典根节点代码
                "type":type
            },function(res){
                if(res.data.length==0){
                    $('#add-dropdown-menu').parent().hide();
                }else{
                    $('#add-dropdown-menu').empty();
                    res.data.each(function(item){
                        if(type==2){
                            $('#add-dropdown-menu').append('<li type="'+item.dictKey+'" orgId="'+orgpId1+'" roomId="'+roomId1+'">'+item.dictValue+'</li>').parent().show();
                        }else if(type==1007){
                            $('#add-dropdown-menu').append('<li type="'+item.dictKey+'" orgId="'+orgpId2+'" roomId="'+roomId2+'" equipId="'+equipId+'">'+item.dictValue+'</li>').parent().show();
                        }

                    });
                }
            },true)
        }
        //获取基本信息请求体数据对象
        function getDataObj(id,type,orgid,roomid,equipId){
            var obj = {};
            obj.sysUserList = [];
            $('#'+id).find('input:not(:checkbox),select').each(function(i,item){
                var $ele = $(item);
                obj[item.name] = $.trim($ele.val());
            });
            //
            $('#'+id).find('.sysUserList').children('span').each(function(i,item){
                obj.sysUserList.push({id:$(item).attr('id')})
            });
            if($('#'+id).find('input[name="equipentSyncTime"]').length>0){
                var dt = new Date($('#'+id).find('input[name="equipentSyncTime"]').val());
                obj.equipentSyncTime = dt.format('yyyymmddhhmmss')
            }
            obj.equipmentType = type;//设备类型
            obj.organId = orgid;//单位id
            obj.proofRoomId = roomid;//物证室id
            obj.equipmentParentId = equipId;//区域控制器id,只对环控设备有效
            obj.delFlag = 0;//删除标记（0未删除，1已删除）
            console.log(obj)
            return obj;
        }




        //点击批量删除设备信息
        $('#module-result').on('click','.cm-remove-btn',function(){
            var dataObj = [];
            if($('#module-result').find('>.all-fix-wrap>.col-fix-wrap').length>0){
                $('#module-result').find('>.all-fix-wrap>.col-fix-wrap>table>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }else{
                $('#sys-devSetting-tb').find('>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }
            if(dataObj==0){
                toast('请选择要删除的设备').warn();
            }else{
                $post(equipmentBatchDeleteTableAct,dataObj,function(res){
                    toast('删除成功').ok();
                    queryTreeDeviceList();
                },true)
            }
        });
        //点击删除该条数据
        $('#sys-devSetting-tb').on('click','.icon-trash',function(){
            var $the = $(this);
            $confirm('确定删除'+$the.attr('name')+'这个设备吗？',function (del) {
                if(del){
                    $post(equipmentDeleteTableDataAct,{"id":$.trim($the.attr('param'))},function(res){
                        toast('删除成功',600).ok();
                        queryTreeDeviceList();
                    },true)
                }
            });
        });
        //点击新增设备
        $('#add-dropdown-menu').on('click','li',function(){
            var $the = $(this);
            var $id = $('.cm-addPage[type="'+$the.attr('type')+'"]').attr('id');
            var $attr = $('.cm-addPage[type="'+$the.attr('type')+'"]').attr('title');
            if($the.attr('type')==1009){//假如新增的设备为打印机
                $post(equipmentPersonPrintAct,{
                    "organizationId":$(this).attr('orgId')//单位id
                },function(res){
                    $('#sysUserListDetail').template(res.data);
                },true);
            }
            if($the.attr('type')==1008){//假如新增的设备为智能柜大屏终端
                $get(equipmentEvidenceMsgAct,{},function(res){
                    res.data.each(function(item){
                        $('#intelligenceCabinet-add').find('select[name="proofArkId"]').append('<option value="'+item.dictKey+'">'+item.dictValue+'</option>')
                    });
                })

            }
            //赋值单位id和物证室id
            $('#'+$id).find('.basic-btn,.saveAdd-btn,.call-off').attr('orgid',$the.attr('orgid')).attr('roomid',$the.attr('roomid')).attr('equipId',$the.attr('equipId'));
            //时间插件初始化
            $('.input-date').datepicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
            $open('#'+$id,{width:800,title:'新增'+$attr});
        });
        //点击保存新增设备
        $('.cm-addPage').on('click','.basic-btn',function(){
            var $the = $(this);
            var $id = $('.cm-addPage[type="'+$the.attr('type')+'"]').attr('id');
            var objData = getDataObj($id,$('#'+$id).attr('type'),$the.attr('orgid'),$the.attr('roomid'),$the.attr('equipId'));
            $('#'+$id).find('.validate').validatebox();
            if($('#'+$id).find('.validatebox-invalid').length>0){
                return;
            }
            $post(equipmentAddTableDataAct,objData,function(res){
                toast('保存成功').ok();
                $('#'+$id).find('input,select').val('');
                $('#'+$id).$close();
                queryTreeDeviceList()
            },true)
        });
        //点击保存并新增设备
        $('.cm-addPage').on('click','.saveAdd-btn',function(){
            var $the = $(this);
            var $id = $('.cm-addPage[type="'+$the.attr('type')+'"]').attr('id');
            var objData = getDataObj($id,$('#'+$id).attr('type'),$the.attr('orgid'),$the.attr('roomid'),$the.attr('equipId'));
            $post(equipmentAddTableDataAct,objData,function(res){
                toast('保存成功').ok();
                $('#'+$id).find('input,select').val('');
                queryTreeDeviceList()
            },true)
        });
        //点击取消新增设备
        $('.cm-addPage').on('click','.call-off',function(){
            var $the = $(this);
            var $id = $('.cm-addPage[type="'+$the.attr('type')+'"]').attr('id');
            $('#'+$id).$close();
        });
        //点击修改设备
        $('#module-result').on('click','.icon-pencil',function(){
            var $the = $(this);
            var data = allUintData.where('o=>o.id=="{0}"'.format($the.attr('param')));
            var $id = $('.cm-editPage[type="'+$the.attr('type')+'"]').attr('id');
            $('#'+$id).template(data);
            if($the.attr('type')==1009){//假如新增的设备为打印机
                $post(equipmentPersonPrintAct,{
                    "organizationId":$(this).attr('orgId')//单位id
                },function(res){
                    console.log(res)
                    var userData = res.data.where('o=>o.ifRFIDUser=="1"&&o.equipmentName=="{0}"'.format($the.attr('equipmentName')));
                    $('#sysUserListDetailUpd').template(res.data);
                    userData.each(function(item){
                        $('#sysUserListDetailUpd').prev().append('<span id="'+item.id+'">'+item.trueName+'</span>');
                        $('#sysUserListDetailUpd').find('input[id="'+item.id+'"]').prop('checked',true);
                    });
                },true);
            }
            if($the.attr('type')==1008){//假如新增的设备为智能柜大屏终端
                var time = data[0].equipentSyncTime;
                time = time.slice(0,4)+'-'+time.slice(4,6)+'-'+time.slice(6,8)+' '+time.slice(8,10)+':'+time.slice(10,12)+':'+time.slice(12);
                $('#'+$id).find('input[name="equipentSyncTime"]').val(time);
                $get(equipmentEvidenceMsgAct,{},function(res){res.data.each(function(item){
                    $('#intelligenceCabinet-edit').find('select[name="proofArkId"]').append('<option value="'+item.dictKey+'">'+item.dictValue+'</option>')
                });
                    $('#intelligenceCabinet-edit').find('select[name="proofArkId"]').val(data[0].proofArkId);
                })

            }
            //赋值单位id和物证室id
            $('#'+$id).find('.basic-btn,.saveAdd-btn,.call-off').attr('orgid',$the.attr('orgid')).attr('roomid',$the.attr('roomid')).attr('param',$the.attr('param'));
            //时间插件初始化
            $('.input-date').datepicker();
            $open('#'+$id,{width:800,title:'修改'+$('#'+$id).attr('title')})
        });
        //点击保存修改设备
        $('.cm-editPage').on('click','.basic-btn',function(){
            var $the = $(this);
            var $id = $('.cm-editPage[type="'+$the.attr('type')+'"]').attr('id');
            var objData = getDataObj($id,$('#'+$id).attr('type'),$the.attr('orgid'),$the.attr('roomid'),$the.attr('equipId'));
            $('#'+$id).find('.validate').validatebox();
            if($('#'+$id).find('.validatebox-invalid').length>0){
                return;
            }
            objData.id=$the.attr('param');//该设备id
            $post(equipmentUpdateTableDataAct,objData,function(res){
                toast('保存成功').ok();
                $('#'+$id).$close();
                queryTreeDeviceList()
            },true)
        });
        //点击取消修改设备
        $('.cm-editPage').on('click','.call-off',function(){
            var $the = $(this);
            var $id = $('.cm-editPage[type="'+$the.attr('type')+'"]').attr('id');
            $('#'+$id).$close();
        });
        //点击操作选中和取消人员
        $('.cm-addPage,.cm-editPage').on('click','.sysUserList span',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
            }
        });
        //获取该单位所有人员
        $('.rfidPrinter').on('click','.sysUserList',function(){
            if(!$(this).next().is(":hidden")){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
            }
            $(this).next().slideToggle();
        });
        //选择关联打印机的人员
        $('.rfidPrinter').on('click','.Using-personnel li input',function(){
            var $the = $(this);
            var perEle = $the.closest('ul').prev();
            var perId = $the.prop('id');
            var perName = $the.nextAll('.trueName').children('u').html();
            if($the.is(':checked')){
                perEle.append('<span id="'+perId+'">'+perName+'</span>');
            }else{
                perEle.find('span[id="'+perId+'"]').remove();
            }
        });



        //初始化执行树查询
        queryTreeDeviceList(true);
        //点击tree搜索申请单位
        cmQueryTreeFn(function(){
            $post(equipmentQueryTreeNodeAct,{
                "proofRoomName":$.trim($('.result-left').find('.in-search').val())//所属单位id
            },function(res){
                if(res.data.length==0){
                    toast('请输入正确的物证室名称').warn();
                    return false;
                }
                zTreeObj = $('#approval-tree').ztree(setting,res.data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0].childrenNode[0]);//初始化赋
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                }
            },true)
        });
    })
}

//物证库管理 sys-evidence-library-manage.html
function sysEvidenceLibraryManage(){
    setSubPrj('wz');
    importing('ztree',function() {
        var selectedNode,allUintData;//选中节点,所有的table数据
        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    selectedNode = treeObj.getSelectedNodes()[0];//赋值选中的节点
                    loadTreeInfo(treeNode,treeNode.id,treeNode.type);
                }
            }
        };
        //新增物证室数据
        var modulecolsEvi=[
            {title:'序号',     map:'rowNum',      cls:'cell-xs'},
            {title:'物证区/室名称',         map:'proofRoomName',        cls:'cell-m'},
            {title:'物证区/室类型',   map:'proofRoomTypeName',      cls:'cell-m tcenter'},
            {title:'所属单位', map:'organName',    cls:'cell-m'},
            {title:'温度上下限',  map:'id.temperatureBound', cls:'cell-s'},
            {title:'湿度上下限',  map:'id.humidityBound', cls:'cell-s'},
            {title:'备注',  map:'remark', cls:'cell-m'},
            {title:'操作',      map:'id.asEditDelSortBtn', cls:'cell-xs tcenter'}
        ];
        //新增物证柜数据
        var modulecolsCab=[
            {title:'序号',     map:'rowNum',      cls:'cell-xs'},
            {title:'物证柜名称',         map:'proofArkName',        cls:'cell-m'},
            {title:'物证柜类型',   map:'proofArkTypeName',      cls:'cell-m'},
            {title:'所属单位', map:'organName',    cls:'cell-m'},
            {title:'所属物证区/室',  map:'proofRoomName', cls:'cell-m'},
            {title:'操作',      map:'id.asEditDelSortBtn', cls:'cell-xs tcenter'}
        ];
        //添加修改和删除
        $filter('asEditDelSortBtn',function(item){
            var html = '<a class="icon-pencil mr5" param="{id}" arkType="{arkType}" roomType="{roomType}" roomId="{roomId}" orgId="{orgId}" name="{name}" title="修改"></a>'+
                '<a class="icon-trash trash mr5" param="{id}" arkType="{arkType}" roomType="{roomType}" name="{name}" title="删除"></a>';
            return html.format({
                id:this.valueOf(),
                roomId:item.proofRoomId,//物证室id
                orgId:item.organId,//单位id
                arkType:item.proofArkType,//物证柜类型
                roomType:item.proofRoomType,//物证室类型
                name:item.proofArkName?item.proofArkName:item.proofRoomName//物证室名称
            })
        });
        //查询table列表
        function queryTableList(act,datatype,type,id,len,orgId,roomId){
            var modulecols;
            if(type==1 || (type==2 && len==0)){//点击保管单位，或没有子元素的物证室
                modulecols = modulecolsEvi;
            }else{//点击物证柜
                modulecols = modulecolsCab;
                $('#module-result').find('.cm-add-btn').hide();
            }
            if(type==1 || type==2){//点击保管单位或物证室
                $('#module-result').find('.cm-add-btn').show();
            }
            $('#module-result').pagingList({
                action:act?act:queryEviDataAct,
                jsonObj:{
                    "queryType":type,//1:查询物证室信息，2:查询物证柜的信息
                    "id":$.trim(id),//物证室ID
                    "organId":orgId?$.trim(orgId):id//所属单位ID
                },
                method:datatype?datatype:'post',
                callback:function(data){
                    allUintData = data;
                    $('#module-result').find('.cm-add-btn').attr('type',type).attr('param',id).attr('orgId',orgId).attr('roomid',roomId);
                    $('#module-result').find('.cm-remove-btn').attr('type',type).attr('len',len);
                    $('#sys-evidence-tb').table({
                        data:data,
                        cols:modulecols,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }
        //查询ztree物证库列表
        function queryTreeEvidenceList(){
            $post(queryTreeDataAct,{
                "organName":$.trim($('.result-left').find('.in-search').val())//所属单位id
            },function(res){
                zTreeObj = $('#approval-tree').ztree(setting,res.data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                //选中节点的id
                initId = selectedNode ? selectedNode.id : treeObj.getNodes()[0].id;
                //选中节点的type
                initType = selectedNode ? selectedNode.type : treeObj.getNodes()[0].type;
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0]);//初始化赋
                    loadTreeInfo(treeObj.getNodes()[0],initId,initType);
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                    loadTreeInfo(selectedNode,initId,initType);
                }
            },true)
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id,type){
            var nodesObj = treeNode;
            var cliNodeAct,orgId,roomid;
            if(type!=1 && type!=2){//点击物证柜
                cliNodeAct = id ? proofArkQueryAct+'/'+id : proofArkQueryAct;
            }else{//点击申请单位或物证室
                cliNodeAct = id ? proofRoomQueryAct+'/'+id : proofRoomQueryAct;
            }
            var len = nodesObj.childrenNode ? nodesObj.childrenNode.length : 0;
            //单位id
            if(nodesObj.length==0){
                orgId=0;
            }else{
                orgId = nodesObj.getParentNode()?nodesObj.getParentNode().id:'';
            }
            if(type==1 || (type==2 && len>0)){//点击保管单位或有物证柜的物证室
                if(type==2&&len>0){
                    roomid = id;
                }else{
                    orgId = id;
                }
                queryTableList(null,null,type,id,len,orgId,roomid)
            }else if(type!=1 && type!=2){//点击物证柜
                orgId = nodesObj.getParentNode().getParentNode().id;//单位id
                queryTableList(cliNodeAct,'GET',type,id,len,orgId)
            }else if(type==2 && len==0){//点击没有物证柜的物证室
                roomid = id;
                id = '';
                queryTableList(cliNodeAct,'GET',type,id,len,orgId,roomid)
            }
        }
        //获取基本信息请求体数据对象
        function getDataObj(id){
            var obj = {};
            $('#'+id).find('input,select,textarea').each(function(i,item){
                var $ele = $(item);
                obj[item.name] = $.trim($ele.val());
            });
            obj.delFlag = 0;//删除标记（0未删除，1已删除）
            return obj;
        }
        //物证室类型
        function proofRoomType(cb){
            $get(proofRoomTypeAct,{},function(res){
                $('.query-block').find('select[name="proofRoomType"]').empty().append('<option></option>');
                res.data.each(function(item){
                    $('.query-block').find('select[name="proofRoomType"]').append('<option value="'+item.dictKey+'">'+item.dictValue+'</option>')
                });
                cb&&cb();
            });
        }
        //物证柜类型
        function proofArkType(){
            $get(proofArkTypeAct,{},function(res){
                $('.query-block').find('select[name="proofArkType"],select[name="arkType"]').empty().append('<option></option>');
                res.data.each(function(item){
                    var defultVal = item.dictDefaultValue ? item.dictDefaultValue : 2;
                    $('.query-block').find('select[name="proofArkType"],select[name="arkType"]').append('<option value="'+item.dictKey+'" val="'+defultVal+'" >'+item.dictValue+'</option>')
                })
            });
        }
        //物证柜列类型
        function proofArkColType(i,cb){
            $get(proofArkColAct,{},function(res){
                if(i){
                    $('#proofArkAdd .header-query').eq(i).find('select[name="type"]').empty();
                    res.data.each(function(item){
                        $('#proofArkAdd .header-query').eq(i).find('select[name="type"]').append('<option value="'+item.dictKey+'">'+item.dictValue+'</option>')
                    });
                }else{
                    $('#proofArkAdd .header-query').find('select[name="type"]').empty();
                    res.data.each(function(item){
                        $('#proofArkAdd .header-query').find('select[name="type"]').append('<option value="'+item.dictKey+'">'+item.dictValue+'</option>')
                    });
                }
                cb&&cb();
            });
        }
        //物证柜节类型
        function proofArkKnobType(i,cb){
            $get(proofArkKnobAct,{},function(res){
                if(i){
                    $('#proofArkMsglf'+(i+1)).find('select[name="type"]').empty().append('<option value="">常规</option>');
                    res.data.each(function(item){
                        $('#proofArkMsglf'+(i+1)).find('select[name="type"]').append('<option value="'+item.dictKey+'" >'+item.dictValue+'</option>')
                    });
                }else{
                    $('.proofArkMsglf').find('select[name="type"]').empty().append('<option value="">常规</option>');
                    res.data.each(function(item){
                        $('.proofArkMsglf').find('select[name="type"]').append('<option value="'+item.dictKey+'" >'+item.dictValue+'</option>')
                    });
                }
                cb&&cb();
            });
        }

        //点击查询按钮
        $('.cq-condition').on('click','.query-btn',function(){
            $('#module-result').pagingList({
                action:queryCabDataAct,
                jsonObj:{
                    "proofRoomType":$.trim($('.query-block').find('select[name="proofRoomType"]').val()),//物证室类型
                    "proofArkType":$.trim($('.query-block').find('select[name="proofArkType"]').val())//物证柜类型
                },
                callback:function(data){
                    allUintData = data;
                    $('#module-result').find('.cm-add-btn').hide();
                    //取消默认选择中的节点
                    treeObj.cancelSelectedNode(selectedNode);
                    $('#sys-evidence-tb').table({
                        data:data,
                        cols:modulecolsCab,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        });
        //点击重置按钮
        $('.cq-condition').on('click','.reset-btn',function(){
            $('.cq-condition').find('select').val('');
        });
        //点击新增物证室/物证柜页面----新增
        $('#module-result').on('click','.cm-add-btn',function(){
            var $id = $('.cm-addPage[type="'+$(this).attr('type')+'"]').attr('id');
            $('#'+$id).find('.basic-btn,.saveAdd-btn').attr('param',$(this).attr('param')).attr('roomid',$(this).attr('roomid')).attr('orgId',$(this).attr('orgId')).attr('type','add');
            $('#'+$id).find('input,select,textarea').val('');
            if($(this).attr('type')==1){//新增物证室
                $open('#'+$id,{width:800,title:'新增'+$('#'+$id).attr('title')})
            }else{//新增物证柜
                $('#proofArkAdd').find('#removeRoom').trigger('click');
                $('#createRoom').show();//显示生成按钮
                $open('#'+$id,{width:1170,title:'新增'+$('#'+$id).attr('title'),onClose:function(){
                    $('#proofArkAdd .createHeader').find('.validate').removeClass('validatebox-invalid');
                }})
            }
        });
        //点击保存新增物证室页面----新增---物证室
        $('#proofRoomAdd').on('click','.basic-btn',function(){
            //判断规则
            $('#proofRoomAdd').find('.validate').validatebox();
            if($('#proofRoomAdd').find('.validatebox-invalid').length>0){
                return false;
            }
            var dataObj = getDataObj('proofRoomAdd');
            dataObj.organId = $(this).attr('orgid');
            $post(proofRoomAddAct,dataObj,function(res){
                toast('保存成功').ok();
                $('#proofRoomAdd').$close();
                queryTreeEvidenceList()
            },true)
        });
        //点击保存并新增物证室页面----新增---物证室
        $('#proofRoomAdd').on('click','.saveAdd-btn',function(){
            var dataObj = getDataObj('proofRoomAdd');
            dataObj.organId = $(this).attr('orgid');
            $post(proofRoomAddAct,dataObj,function(res){
                toast('保存成功,请继续添加').ok();
                $('#proofRoomAdd').find('input,select,textarea').val('');
                queryTreeEvidenceList()
            },true)
        });
        //点击取消新增物证室页面----新增---物证室
        $('#proofRoomAdd').on('click','.call-off',function(){
            $('#proofRoomAdd').$close();
        });
        //点击修改物证室/物证柜页面----修改---物证室，物证柜
        $('#sys-evidence-tb').on('click','.icon-pencil',function(){
            var data = allUintData.where('o=>o.id=="{0}"'.format($(this).attr('param')));
            $('#proofRoomEdit').template(data);
            $('#proofRoomEdit').find('.basic-btn').attr('param',$(this).attr('param'));
            proofRoomType(function(){
                //赋值物证区室类型
                $('#proofRoomEdit').find('select[name="proofRoomType"]').val(data[0].proofRoomType)
            });
            if($(this).attr('roomtype')){//物证室页面
                $open('#proofRoomEdit',{width:800,title:'修改'+$(this).attr('name')})
            }else if($(this).attr('arktype')){//物证柜页面
                $('#createHeader').find('input,select').val('');//首先清空数据
                $('#proofArkAdd').find('.basic-btn').attr('param',$(this).attr('param')).attr('roomId',$(this).attr('roomId')).attr('orgId',$(this).attr('orgId')).attr('type','edit');
                $post(proofArkUpdIdAct,{id:$(this).attr('param')},function(res){
                    var dataObj = res.data;//整个物证柜数据
                    var colArr = dataObj.arkCoumnList;//所有的列
                    var proofArkVal = $('#proofArkAdd').find('select[name="arkType"]').val();
                    //列数组
                    var newColArr = new Array(colArr.length).join().split(',').select('o=>{}');
                    newColArr.each(function(item,i){//列名称
                        item.active = i==0? 'active' : '';
                        item.index = '{0}列'.format(i<9?('0'+(i+1)):(i+1));
                    });
                    //template头部
                    $('#createHeader').template(dataObj);
                    $('#createHeader').find('select[name="arkType"]').val(dataObj.arkType);
                    //template列名称
                    $('#rowNumberList').template(newColArr);
                    //物证柜列表详细信息template
                    $('#proofArkList').template(newColArr);
                    colArr.each(function(item,i){//每一列
                        var knobArr = item.sectionList;//一列中的所有节
                        var tierArr = [];
                        //节数组
                        //默认层数
                        var defaultVal = $('#proofArkAdd').find('select[name="arkType"]').children('[value="'+proofArkVal+'"]').attr('val');
                        //赋值列名称和列id
                        $('#proofArkList').children().eq(i).children('.header-query').find('input[name="name"]').val(item.name).attr('param',item.id);
                        knobArr[0].layerList.each(function(item,j){//每节中的所有层
                            tierArr.push({layerindex:item.name});
                        });
                        knobArr.each(function(item,j){//每一节循环
                            item.arkNum = item.layerList.length;//层数
                            item.boxTotal = item.layerList[0].boxList.length;//箱数
                            item.layerList.each(function(ele,k){//每一层循环
                                ele.boxTotalList = [{},{}];
                            })
                        });
                        //物证柜节template
                        $('#proofArkMsglf'+(i+1)).template(knobArr);
                        //节名称template
                        $('#knobName'+(i+1)).template(knobArr);
                        //层名称template
                        $('#layerName'+(i+1)).template(tierArr);
                        //物证柜层数template
                        $('#evidence-chest'+(i+1)).template(knobArr);
                        //赋值箱子数
                        $('#proofArkMsglf'+(i+1)).find('input[name="boxTotal"]').each(function(g,item2){
                            for(var k=0;k<$(item2).val();k++){
                                $('#evidence-chest'+(i+1)).children().eq(g).children().each(function(q,item3){
                                    $(item3).children().eq(k).children().append('<span class="box"></span><input type="text" class="title" value="A" />')
                                })
                            }
                        });
                        //赋值箱子id/name
                        knobArr.each(function(item,j){//每一节循环
                            item.layerList.each(function(ele,k){//每一层循环
                                ele.boxList.each(function(ele2,z){//每一个箱子循环
                                    //箱子的id
                                    $('#evidence-chest'+(i+1)).children().eq(j).children().eq(k).children().eq(z).children().attr('param',ele2.id);
                                    //箱子的名字
                                    $('#evidence-chest'+(i+1)).children().eq(j).children().eq(k).children().eq(z).find('.title').val(ele2.name);
                                });
                            })
                        });
                        //生成列类型
                        proofArkColType(i,function(){
                            //赋值列类型
                            $('#proofArkList').children().eq(i).children('.header-query').find('select[name="type"]').val(item.type);
                        });
                        //生成节类型
                        proofArkKnobType(i,function(){
                            item.sectionList.each(function(ele3,z){
                                //赋值节类型
                                $('#proofArkMsglf'+(i+1)).children().eq(z).find('select[name="type"]').val($.trim(ele3.type));
                            });
                        });
                    });
                    $width = ($('#proofArkAdd .evidence-chest').children().length * 150) / colArr.length + 44;
                    $('#proofArkAdd .wzg').css('width',$width)
                });
                $('#proofArkAdd').find('.evidenceMsg').show();//显示物证柜信息
                $('#proofArkAdd').find('.query-reset').show();//显示保存按钮
                $('#createRoom').hide();//隐藏生成按钮
                $('#removeRoom').hide();//隐藏销毁按钮
                $('#proofArkAdd .createHeader').find('input:not(:first)').addClass('noborder').prop('readonly',true);
                $('#proofArkAdd .createHeader').find('select').addClass('noborder').prop('disabled',true);
                $open('#proofArkAdd',{width:1170,title:'新增'+$('#proofArkAdd').attr('title'),onClose:function(){
                    $('#proofArkAdd .createHeader').find('.validate').removeClass('validatebox-invalid');
                }})
            }

        });
        //点击保存修改物证室页面----修改---物证室
        $('#proofRoomEdit').on('click','.basic-btn',function(){
            //判断规则
            $('#proofRoomEdit').find('.validate').validatebox();
            if($('#proofRoomEdit').find('.validatebox-invalid').length>0){
                return false;
            }
            var dataObj = getDataObj('proofRoomEdit');
            dataObj.id = $(this).attr('param');
            $post(proofRoomUpdAct,dataObj,function(res){
                toast('保存成功,请继续添加').ok();
                $('#proofRoomEdit').$close();
                queryTreeEvidenceList()
            },true)
        });
        //点击取消修改物证室页面----修改---物证室
        $('#proofRoomEdit').on('click','.call-off',function(){
            $('#proofRoomEdit').$close();
        });
        //点击创建物证柜----创建---物证柜
        $('#proofArkAdd').on('click','#createRoom',function(){
            //判断规则
            $('#proofArkAdd .createHeader').find('.validate').validatebox();
            if($('#proofArkAdd .createHeader').find('.validatebox-invalid').length>0){
                return false;
            }
            var proofArkVal = $('#proofArkAdd').find('select[name="arkType"]').val();
            //默认层数
            var defaultVal = $('#proofArkAdd').find('select[name="arkType"]').children('[value="'+proofArkVal+'"]').attr('val');
            //列数组
            var colArr = new Array(parseInt($('#proofArkAdd').find('input[name="arkColumnNo"]').val())).join().split(',').select('o=>{}');
            //节数组
            var knobArr = new Array(parseInt($('#proofArkAdd').find('input[name="arkSectionNo"]').val())).join().split(',').select('o=>{}');
            //层数组
            var tierArr = new Array(parseInt(defaultVal)).join().split(',').select('o=>{boxTotalList:[{},{}]}');
            //物证柜数组
            var proofArkArr = null,$width;

            //物证柜信息节点
            var roomEle = $('#proofArkAdd').find('>.query-block>.evidenceMsg');
            colArr.each(function(item,i){
                item.active = i==0? 'active' : '';
                item.index = '{0}列'.format(i<9?('0'+(i+1)):(i+1));
            });
            knobArr.each(function(item,i){
                item.name = '{0}节'.format(i<9?('0'+(i+1)):(i+1));
                item.arkNum = defaultVal;
                item.boxTotal = 0;
            });
            tierArr.each(function(item,i){
                var len = tierArr.length - i;
                item.layerindex = '{0}层'.format(len<10?('0'+len):len);
            });
            proofArkArr = str2obj(obj2str(knobArr));
            proofArkArr.each(function(item){
                item.layerList=tierArr;
            });

            $('#proofArkAdd').find('.query-reset').show();
            $('#proofArkAdd .createHeader').find('input:not(:first)').addClass('noborder').prop('readonly',true);
            $('#proofArkAdd .createHeader').find('select').addClass('noborder').prop('disabled',true);
            roomEle.show();
            $(this).addClass('hide').next().removeClass('hide');
            //物证柜列template
            $('#rowNumberList').template(colArr);
            //物证柜列表详细信息template
            $('#proofArkList').template(colArr);

            colArr.each(function(item,i){
                //物证柜节template
                $('#proofArkMsglf'+(i+1)).template(knobArr);
                //节名称template
                $('#knobName'+(i+1)).template(knobArr);
                //层名称template
                $('#layerName'+(i+1)).template(tierArr);
                //物证柜层数template
                $('#evidence-chest'+(i+1)).template(proofArkArr);
                proofArkColType();//生成列类型
                proofArkKnobType();//生成节类型
            });
            $width = ($('#proofArkAdd .evidence-chest').children().length * 150) / colArr.length + 44;
            $('#proofArkAdd .wzg').css('width',$width)
        });
        //点击保存新增/修改物证柜----新增、修改---物证柜
        $('#proofArkAdd').on('click','.basic-btn',function(){
            var action;//地址接口
            var dataObj = getDataObj('createHeader');//整个物证柜
            dataObj.arkCoumnList = [];//每一列
            dataObj.id=$(this).attr('param');//物证柜id
            dataObj.organId = $(this).attr('orgid');//所属单位id
            dataObj.roomId = $(this).attr('roomid');//物证室id
            $('#proofArkList').children().each(function(i,item){//每一列循环
                var col = {};//列对象
                col.sectionList = [];//一节
                $(item).children('.header-query').find('input,select').each(function(j,item2){
                    col[item2.name] = $.trim($(item2).val());
                });
                col.id = $(item).children('.header-query').find('input').attr('param');//列id
                col.no = (i+1);//列序号
                $(item).find('.proofArkMsglf tr').each(function(j,ele){//每一节循环
                    var knob={};//节对象
                    var dictVal = $.trim($(ele).find('input[name="type"]').val());
                    knob.layerList = [];//一层
                    knob.name = $(ele).find('input[name="name"]').val();//节名称
                    knob.type = $.trim($(ele).find('select[name="type"]').val());//节类型代码
                    knob.num = (j+1);//第几节
                    $(item).find('.evidence-chest').children().eq(j).children().each(function(z,ele3){//柜子的每一节的每一层循环
                        var map={};//层对象
                        var len = $(item).find('.evidence-chest').children().eq(j).children().length;//每一节的层数
                        var layerName = $(item).find('.layerName').children().eq(z).children('input').val();
                        var layerNum = len-z<9?('0'+(len-z)):(len-z);
                        map.boxList = [];//一个箱子
                        map.num = parseInt(layerNum);
                        map.id = $(ele3).attr('param');
                        map.name = layerName;
                        $(ele3).find('.box').each(function(p,ele4){//每一层的箱子
                            var box = {};//箱子对象
                            box.name = $(ele4).next().val();//箱子的名称
                            box.num = $(ele3).find('.box').length;//箱子的代码
                            box.id = $(ele4).parent().attr('param');//箱子的id
                            map.boxList.push(box);
                        });
                        knob.layerList.push(map);
                    });
                    col.sectionList.push(knob);
                });
                dataObj.arkCoumnList.push(col);
            });
            if($(this).attr('type')=='add'){//创建物证柜
                action = proofArkAddAct;
            }else if($(this).attr('type')=='edit'){//修改物证柜
                action = proofArkUpdAct;
            }
            $post(action,dataObj,function(res){
                toast('保存成功').ok();
                $('#proofArkAdd').$close();
                queryTreeEvidenceList();
            })
        });
        //点击销毁物证柜
        $('#proofArkAdd').on('click','#removeRoom',function(){
            //物证柜信息节点
            var roomEle = $('#proofArkAdd').find('>.query-block>.evidenceMsg');
            roomEle.hide();
            roomEle.prev().find('input,select').val('');
            $(this).addClass('hide').prev().removeClass('hide');
            $('#proofArkAdd').find('.query-reset').hide();
            $('#proofArkAdd .createHeader').find('input').removeClass('noborder').prop('readonly',false);
            $('#proofArkAdd .createHeader').find('select').removeClass('noborder').prop('disabled',false);
        });
        //table-left修改节名称
        $('#proofArkList').on('change','.proofArkMsglf .knobName-input',function(){
            var num = $(this).closest('tbody').attr('id').replace(/[^0-9]+/,'');
            //判断规则
            $('#proofArkMsglf'+num).find('.validate').validatebox();
            if($('#proofArkMsglf'+num).find('.validatebox-invalid').length>0){
                return false;
            }
            var $the = $(this);
            var $index = $the.closest('tr').index();
            var knobName = $the.val();
            $('#knobName'+num).children().children().eq($index).val(knobName);
        });
        //改变箱数生成箱子
        $('#proofArkList').on('change','.proofArkMsglf .boxNumber',function(){
            var num = $(this).closest('tbody').attr('id').replace(/[^0-9]+/,'');
            //判断规则
            $(this).validatebox();
            if($(this).hasClass('validatebox-invalid')){
                return false;
            }
            var $the = $(this);
            var $index = $the.closest('tr').index();
            var boxNum = $the.val();
            var boxArr = new Array(parseInt(boxNum)).join().split(',');
            if(boxNum==0 || boxNum==''){
                $('#evidence-chest'+num).children().eq($index).find('.box-wrapper').empty();
                return false;
            }
            $('#evidence-chest'+num).children().eq($index).find('.box-wrapper').empty();
            boxArr.each(function(ele,i){
                $('#evidence-chest'+num).children().eq($index).children('li').each(function(j,item){
                    $(item).children('.chest-wrapper').eq(i).children().append('<span class="box"></span><input type="text" class="title" value="A" />')
                })
            })
        });
        //点击取消新增物证柜页面
        $('#proofArkAdd').on('click','.call-off',function(){
            $('#proofArkAdd').$close();
            $('#proofArkAdd .createHeader').find('.validate').removeClass('validatebox-invalid');
        });
        //点击切换物证柜列
        $('#proofArkAdd').on('click','#rowNumberList li',function(){
            var $index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('#proofArkList').children().eq($index).show().siblings().hide();
        });
        //点击批量删除设备信息
        $('#module-result').on('click','.cm-remove-btn',function(){
            var dataObj = [],action;
            if($('#module-result').find('>.all-fix-wrap>.col-fix-wrap').length>0){
                $('#module-result').find('>.all-fix-wrap>.col-fix-wrap>table>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }else{
                $('#sys-evidence-tb').find('>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }
            if(dataObj==0){
                toast('请选择要删除的设备').warn();
            }else{
                if($(this).attr('type')==1||($(this).attr('type')==2&&$(this).attr('len')==0)){
                    action = proofRoomDelBatchAct;//物证室
                }else{
                    action = proofActDelBatchAct;//物证柜
                }
                $confirm('确定删除该物证室?',function (del) {
                    if(del){
                        $post(action,dataObj,function(res){
                            toast('删除成功').ok();
                            if(selectedNode){
                                selectedNode  = selectedNode.getParentNode()? selectedNode.getParentNode():selectedNode;
                            }
                            queryTreeEvidenceList();
                        },true)
                    }
                });

            }
        });
        //点击删除该条数据
        $('#sys-evidence-tb').on('click','.icon-trash',function(){
            var $the = $(this),act;
            if($the.attr('roomType')){//删除物证室
                act = proofRoomDelAct;
            }else if($the.attr('arkType')){//删除物证柜
                act = proofActDelAct;
            }
            $confirm('确定删除'+$the.attr('name')+'?',function (del) {
                if(del){
                    $post(act,{"id":$.trim($the.attr('param'))},function(res){
                        toast('删除成功',600).ok();
                        selectedNode  = selectedNode.getParentNode()? selectedNode.getParentNode():selectedNode;
                        queryTreeEvidenceList()
                    },true)
                }
            });
        });

        //初始化物证室和物证类型
        proofRoomType();
        proofArkType();
        //初始化加载树
        queryTreeEvidenceList();
        //点击tree搜索
        cmQueryTreeFn(function(){
            $post(queryTreeDataAct,{
                "proofRoomName":$.trim($('.result-left').find('.in-search').val())//所属单位id
            },function(res) {
                if(res.data.length==0){
                    toast('请输入正确的物证室名称').warn();
                    return false;
                }
                zTreeObj = $('#approval-tree').ztree(setting, res.data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0]);//初始化赋
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                }
            },true)
        });
    })
}

//通用设置 sys-common-set.html
function sysCommonSet(){
    setSubPrj('wz');
    importing('bootstrap-css',function () {
        //修改设置函数
        function updateSetFn($the){
            var dataObj = $the.data($the.attr('name'));
            if($the.attr('type')=='checkbox'){
                if($the.is(':checked')){//开
                    dataObj.value = 1;
                }else{//关
                    dataObj.value = 0;
                }
            }else if($the.attr('type')=='file'){
                dataObj = $('[name="systemFooterIconSet"]').data('systemFooterIconSet');
                dataObj.value = $('[name="systemFooterIconSet"]').val();
            }else{
                dataObj.value = $the.val();
            }
            $post(updateSysParameterAct,dataObj,function(res){
                toast('修改成功');
            })
        }

        //初始化通用设置页面数据
        $post(querySysParameterAct,{},function(res){
            var queryPageData = res.data;
            queryPageData.each(function(item){//登陆页面
                $('[name="'+item.key+'"]').data(item.key,item);
                if(item.key=='weChatSet' || item.key=='mobileApplicationDownload' || item.key=='applyForUserRegistration'){
                    if(item.value==1){
                        $('#common-set').find('[name="'+item.key+'"]').prop('checked',true);
                        return;
                    }
                }
                if(item.key=='systemFooterIconSet'){//系统页脚图标
                    var url = 'http://192.168.1.211:7777/'+ item.value;
                    $('#common-set').find('[name="'+item.key+'"]').val(item.value);
                    $('#sysIconImg').attr('src',url);
                    return;
                }
                if(item.key=='failureDataStateColor'||item.key=='dueDataStateColor'||item.key=='expectDataStateColor'||item.key=='emergencyCaseDataStateColor'){//数据状态颜色
                    $('#queryItemSet [name="'+item.key+'"]').css({'color':item.value,'borderColor':item.value}).attr('mType',item.value);
                    return;
                }
                $('#common-set').find('[name="'+item.key+'"]').val(item.value);
            });
        },true);

        //点击系统标题,系统页脚文字设置--$open
        $('#common-set').on('click','.textSet',function(){
            var data = $(this).data($(this).attr('name'));
            $('#sysTextDataSet').template(data);
            $open('#sysTextDataSet',{title:data.name,width:800,onClose:function(){
                $('#sysTextDataSet').removeClass('.validatebox-invalid');
            }});
        });
        //点击保存系统标题,系统页脚文字设置按钮
        $('.sysTextSet').on('click','.cm-save-btn',function(){
            var $this = $(this);
            var $val = $this.closest('.sysTextSet').find('[name="key"]').val();
            var dataObj = {};
            $('#sysTextDataSet').find('.validate').validatebox();
            if($('#sysTextDataSet').find('.validatebox-invalid').length>0){
                return;
            }
            $('#sysTextDataSet').find('input,select,textarea').each(function(i,item){
                dataObj[item.name] = $(item).val()
            });
            $post(updateSysParameterAct,dataObj,function(res){
                var $color = $.trim($this.closest('.sysTextSet').find('[name="value"]').val());
                toast('修改成功');
                $('#sysTextDataSet').find('.validate').removeClass('validatebox-invalid');
                if($val!='footerTextSystemSettings' && $val!='headlineSetsystem'){//数据状态
                    $('[name="'+$val+'"]').css({'color':$color,'borderColor':$color})
                }else{//系统标题，系统页脚
                    $('[name="'+$val+'"]').val($this.closest('.sysTextSet').find('[name="value"]').val());
                    $('[name="'+$val+'"]').prev().html($this.closest('.sysTextSet').find('[name="name"]').val()+'：');
                }
                $('#sysTextDataSet').$close();
            })
        });
        //点击关闭系统标题,系统页脚文字设置按钮
        $('.sysTextSet').on('click','.cm-close-btn',function(){
            var $id = $(this).closest('.sysTextSet').prop('id');
            $('#'+$id).find('.validate').removeClass('validatebox-invalid');
            $('#'+$id).$close();
        });
        //修改设置
        $('#common-set').on('change','.cmHandleSet',function(){
            updateSetFn($(this))
        });
        //清空系统日志
        $('#queryItemSet').on('click','.emptyLog',function(){
            var dataObj = $(this).prev().data($(this).prev().attr('name'));
            dataObj.value = $(this).prev().attr('mType');
//            $post(updateSysParameterAct,dataObj,function(res){
//                console.log(res)
//                toast('修改成功');
//            })
        });
        //清空缓存图片时间
        $('#queryItemSet').on('click','.immediatelyEmpty',function(){
            var dataObj = $(this).prevAll('.number-order').data($(this).prevAll('.number-order').attr('name'));
            dataObj.value = $(this).prevAll('.number-order').val();
            $post(updateSysParameterAct,dataObj,function(res){
                toast('修改成功');
            })
        });

        //系统页脚图标设置
        $('#loginPageSet').on('change','#fileChoose',function () {
            var data = new FormData();
            data.append('file', $('#fileChoose')[0].files[0]);
            $.ajax({
                url:'http://192.168.1.211:8888/fdfs/api/file/upload' ,
                type: 'POST',
                data: data,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend:showLoading,
                complete:hideLoading,
                success: function (res) {
                    var url = 'http://192.168.1.211:7777/'+ res.data.fileNameRemote;
                    $('#sysIconImg').attr('src',url);
                    $('[name="systemFooterIconSet"]').val(res.data.fileNameRemote)

                }
            });
        });
        //条数和时间的减少
        $('#queryItemSet').on('click','.icon-minus',function(){
            var data = $(this).next().val();
            var newData = data?parseInt($(this).next().val()):0;
            newData--;
            if(newData<0){
                newData=0;
            }
            $(this).next().val(newData);
            if($(this).next().hasClass('cmHandleSet')){
                updateSetFn($(this).next());
            }
        });
        //条数和时间的增加
        $('#queryItemSet').on('click','.icon-plus',function(){
            var data = $(this).prev().val();
            var newData = data?parseInt($(this).prev().val()):0;
            newData++;
            $(this).prev().val(newData);
            if($(this).prev().hasClass('cmHandleSet')){
                updateSetFn($(this).prev());
            }
        });
        //手动输入条数和时间
        $('#queryItemSet').on('change','.number-order',function(){
            $(this).validatebox();
            if($(this).hasClass('validatebox-invalid')){
                return;
            }
        })
        $('#sysIconImg').previewBox();
    })
}

//位置管理 sys-location-manage.html
function sysLocationManage(){
    setSubPrj('wz');
    importing('ztree','barCode',function () {
        var selectedNode,allUintData;//选中节点,所有的table数据
        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    console.log(treeNode)
                    selectedNode = treeObj.getSelectedNodes()[0];//赋值选中的节点
                    loadTreeInfo(treeNode,treeNode.id,treeNode.type);
                }
            }
        };
        function recursionDataFn(dataArr){
            for(var i=0;i<dataArr.length;i++){
                if(dataArr[i].type==4){
                    selectedNode = dataArr[i];
                    return;
                }
                if(typeOf(dataArr[i].childrenNode) == 'array'){
                    recursionDataFn(dataArr[i].childrenNode)
                }
            }
        }

        //查询ztree物证库列表
        function queryTreeEvidenceList(){
            $post(locationTreeAct,{},function(res){
                zTreeObj = $('#approval-tree').ztree(setting,res.data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                var data= treeObj.getNodes();
                recursionDataFn(data);
                //选中节点的id
                initId = selectedNode ? selectedNode.id : treeObj.getNodes()[0].id;
                //选中节点的type
                initType = selectedNode ? selectedNode.type : treeObj.getNodes()[0].type;
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0]);//初始化赋
                    loadTreeInfo(treeObj.getNodes()[0],initId,initType);
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                    loadTreeInfo(selectedNode,initId,initType);
                }
            },true)
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id,type){
            $post(locationDataAct,{
                "proofArkColumnId":id
            },function(res){
                if(type==4){//点击物证柜列
                    var data = res.data;
                    var num = data.select('o=>o.proofLocationCode');
                    var arr = [];
                    var layerList = [];//层数组
                    var maxNum = Math.max.apply(null,num);
                    maxNum = (''+maxNum).length == 12 ? maxNum+'' : '0'+maxNum;
                    var listMax = Number(maxNum.slice(6,8)),//列最大值
                        arr = new Array(listMax).join().split(',').select('o=>{}');
                    arr.each(function(item,i){
                        var boxList = [];//箱子数组
                        var layer = data.where('o=>Number(o.proofLocationCode.slice(6,8))=={0}'.format(i+1));
                        var layerMaxNum =Math.max.apply(null,layer.select('o=>o.proofLocationCode'));
                        layerMaxNum = (''+layerMaxNum).length == 12 ? layerMaxNum+'' : '0'+layerMaxNum;
                        var layerMax = Number(layerMaxNum.slice(8,10));
                        layerList = new Array(layerMax).join().split(',').select('o=>{}');
                        layerList.each(function(item2,j){
                            var box = layer.where('o=>Number(o.proofLocationCode.slice(8,10))=={0}'.format(j+1));
                            item2.boxList = box;
                        });
                        item.layerList = layerList;
                    });
                    $('#physicalEvidenceMsg').template(arr);
                    $('#physicalEvidenceMsg').find('img').each(function(i,item){
                        var $class = $(item).prop('class');
                        barcode('.'+$class, $(item).prop('class').replace('barcode',''), {
                            format:"CODE128",
                            displayValue:false,
                            fontSize:12,
                            width:1,
                            height:60
                        });
                    });
                }else{
                    toast('请点击正确的物证柜列');
                }
            },true)
        }

        //点击每个物证柜列信息
        $('#physicalEvidenceMsg').on('click','.msg',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            } else{
                $(this).addClass('active');
            }
        });

        //点击打印页面
        $('#location-manage').on('click','.icon-print',function(){
            $('#physicalEvidenceMsg').find('.msg.active').each(function(i,item){
                var code = $(item).children('img').prop('class').replace(/barcode/,'');
                var barName = $(item).children('p').html();
                location.href="liexplorer://ZDesigner GK888t (EPL)&code=^XA^CW0,E:SIMSUN.FNT^SEE:GB18030.DAT^CI28^FO250,50^A0,N,35,35^FD海鑫品控物证中心^FS^FO220,110^ACN,18,10^BY2,3,50^BCN,140,N,N,N,A^FD"+code+"^FS^FO250,250^A0,N,35,35^FD"+barName+"^FS^XZ";
            });

        });

        //点击全选按钮
        $('#location-manage').on('click','.check-all',function(){
            if($(this).is(":checked")){//选中
                $('#physicalEvidenceMsg').find(".msg").addClass("active");
                $(this).next().html('取消全选');
            }else{
                $('#physicalEvidenceMsg').find(".msg").removeClass("active");
                $(this).next().html('全选');
            }
        });
        queryTreeEvidenceList()
    })
}

//编号规则设置 sys-number-rules-set.html
function sysNumRuleSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        //预定义filter
        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic mr5" param="{id}" title="删除"></a>';
            return html.format({
                id:this.valueOf()
            })
        });
        var selectedNode,allUintData;//选中节点,所有的table数据
        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "nodeText"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    cliNodeId = treeObj.getSelectedNodes()[0].id;
                    selectedNode = treeObj.getSelectedNodes()[0];//赋值选中的节点
                    $('.content-folder').find('.ico-remove').attr('tName',treeNode.nodeText);
                    loadTreeInfo(treeNode,treeNode.id);
                }
            }
        };
        //准备配置项
        var modulecols=[
            {title:'序号',  map:'rowNum',      cls:'cell-xs'},
            {title:'编号规则大类',  map:'proofNumTypeValue', cls:'cell-m'},
            {title:'编号规则小类',  map:'proofNumSmallTypeValue', cls:'cell-m'},
            {title:'原值',  map:'proofNumValue',      cls:'cell-m'},
            {title:'取值规则',  map:'valueRuleChinese',    cls:'cell-m'},
            {title:'起始位置',  map:'stratPosition',    cls:'cell-m'},
            {title:'取值长度',  map:'valueLength',    cls:'cell-m'},
            {title:'结果值',  map:'resultValue',    cls:'cell-m'},
            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-s tcenter'}
        ];

        //查询table列表
        function queryTableList(orgId){
            $('#number-rules-result').pagingList({
                action:numRuleQueryTableAct,
                jsonObj:{
                    'organId':orgId //单位id
                },
                callback:function(data){
                    allUintData = data;
                    $('#number-rules-result').find('.cm-add-btn').attr('orgId',orgId);
                    $('#number-rules-tb').table({
                        data:data,
                        cols:modulecols,
                        cls:'tcenter',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }
        //查询ztree申请单位列表
        function queryApplyUnit(){
            $post(numRuleUnitTreeAct,{
                "organName":$.trim($('.result-left').find('.in-search').val()), //单位信息主键ID,可为空
                "officeType":"1" //单位类别（1申请单位，2，保管单位），不可为空
            },function(res){
                var data = {nodeText:'申请单位',childrenNode:res.data};
                zTreeObj = $('#approval-tree').ztree(setting,data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("approval-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                //选中节点的id
                initId = selectedNode ? selectedNode.id : treeObj.getNodes()[0].childrenNode[0].id;
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0].childrenNode[0]);//初始化赋
                    loadTreeInfo(treeObj.getNodes()[0].childrenNode[0],initId);
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                    loadTreeInfo(selectedNode,initId);
                }
            })
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id){
            queryTableList(id)
        }
        //编号规则大类函数
        function bigNumRuleFn(id,cb){
            $get(numRuleAct,{},function(res){
                var data = res.data.where('o=>o.parentKey=="1100000"');
                $('#'+id).template(data);
                cb&&cb(id);
            })
        }
        //编号规则小类函数
        function smallNumRuleFn(id,pId,cb){
            $get(numRuleAct,{},function(res){
                var pKey = $('#'+pId).val();
                var data = res.data.where('o=>o.parentKey=="'+pKey+'"');
                $('#'+id).template(data);
                if(pKey==1100200){//日期
                    valRuleFn('valueRule',function(){
                        $('#ruleNumberPage #valueRule').trigger('change');//触发取值规则改变
                    });
                    $('#ruleNumberPage').find('.cm-ok-btn').hide();
                    $('#valueRule').prop('disabled',false).show().siblings('.ruleOption').hide();
                }else if(pKey==1100300&&$('#'+id).val()==1100301){//数据项
                    $('#sjx-more').show().siblings('.ruleOption').hide();
                    $('#ruleNumberPage').find('.cm-ok-btn').show();
                    $('#ruleNumberPage').find('.basic-btn').hide();//隐藏保存按钮
                }else if(pKey==1100400){//流水号
                    $('#lsh-more').show().siblings('.ruleOption').hide();
                    $('#ruleNumberPage').find('.cm-ok-btn').show();
                    $('#ruleNumberPage').find('.basic-btn').hide();//隐藏保存按钮
                }else{//标识
                    $('#ruleNumberPage').find('.cm-ok-btn').hide();
                    $('#valueRule').prop('disabled',true).show().html('').siblings('.ruleOption').hide();
                    $('#ruleNumberPage #proofNumSmallType').trigger('change');
                }
                cb&&cb(pKey);
            })
        }
        //取值规则函数
        function valRuleFn(id,cb){
            $get(valRuleAct,{},function(res){
                $('#'+id).template(res.data);
                cb&&cb();
            })
        }

        //新增编号规则页面---新增
        $('#number-rules-result').on('click','.cm-add-btn',function(){
            $('#sjx-more').find('input:not(:radio)').val('1').first().val('0').end().eq(4).val('2');
            $('#lsh-more').find(':text').val('1').last().val('3');
            $('#ruleNumberPage').find('.cutOfRule,.valPosition,.rulePreview').hide().find('input').val('');
            $('#ruleNumberPage').find('.basic-btn').attr('orgId',$(this).attr('orgId')).attr('param','');//赋值单位id
            $('#ruleNumberPage').find('.basic-btn').hide();//隐藏保存按钮
            $open('#ruleNumberPage',{width:800,title:'新增编号规则'});
            bigNumRuleFn('proofNumType',function(id){
                smallNumRuleFn('proofNumSmallType',id)
            })
        });
        //保存编号规则页面---保存新增
        $('#ruleNumberPage').on('click','.basic-btn',function(){
            var dataObj = {},name;
            var act;//接口地址
            var sjxEle = $('#sjx-more').find(':radio:checked').nextAll('input');
            dataObj.organId = $(this).attr('orgId');//单位id
            dataObj.delFlag = 0;//删除标记   0未删除，1已删除
            $('#ruleNumberPage').find(':text:not([name="cutRule"]),select').each(function(i,item){
                dataObj[item.name] = $.trim($(item).val());
            });
            dataObj.cutFlag = $('#sjx-more').find(':radio:checked').attr('nType');//截取标识
            if(sjxEle.length>1){
                dataObj.cutRule = sjxEle[0].value+'-'+sjxEle[1].value;
            }else{
                dataObj.cutRule = sjxEle.val();
            }

            if($(this).attr('param')){//修改页面
                act = numRuleUpdAct;
                name = '修改成功';
                dataObj.id = $(this).attr('param');//页面id
            }else{
                act = numRuleAddAct;
                name = '新增成功';
            }
            $post(act,dataObj,function(res){
                toast(name).ok();
                queryApplyUnit();
                $('#ruleNumberPage').$close()
            })
        });
        //取消编号规则页面---取消新增
        $('#ruleNumberPage').on('click','.call-off',function(){
            $('#ruleNumberPage').$close();
        });
        //点击修改编号规则页面---修改
        $('#number-rules-tb').on('click','.icon-pencil',function(){
            var $data = allUintData.where('o=>o.id=="{0}"'.format($(this).attr('param')))[0];
            $open('#ruleNumberPage',{width:800,title:'修改编号规则'});
            $('#ruleNumberPage').find('.basic-btn').attr('orgId',$data.organId).attr('param',$data.id);//赋值单位id和主键id
            bigNumRuleFn('proofNumType',function(id){
                smallNumRuleFn('proofNumSmallType',id,function(){
                    var $type;
                    var stratPosition = $data.stratPosition == '-' ? '':$data.stratPosition;//起始位置值
                    var valueLength = $data.valueLength == '-' ? '':$data.valueLength;//取值长度值
                    $('#proofNumType').val($data.proofNumType);//赋编号规则大类代码
                    $('#ruleNumberPage #proofNumType').trigger('change',true);
                    $('#proofNumSmallType').val($data.proofNumSmallType);//赋编号规则小类代码
                    $('#ruleNumberPage #proofNumSmallType').trigger('change');
                    $('#valueRule').val($data.valueRule);//赋取值规则代码
                    $('#ruleNumberPage #valueRule').trigger('change');
                    $('#ruleNumberPage').find('[name="stratPosition"]').val(stratPosition);//赋起始位置值
                    $('#ruleNumberPage').find('[name="valueLength"]').val(valueLength);//赋取值长度值
                    $('#ruleNumberPage').find('[name="proofNumValue"]').val($data.proofNumValue);//赋原始值
                    $('#ruleNumberPage').find('[name="resultValue"]').val($data.resultValue);//赋结果值

                    $type = $('#proofNumType').val();
                    if($type==1100100 || $type==1100200){//标识或日期
                        $('#sjx-more').find('input:not(:radio)').val('1').first().val('0').end().eq(4).val('2');
                        $('#lsh-more').find(':text').val('1').last().val('3');
                        $('#ruleNumberPage').find('.cutOfRule,.valPosition').hide().find('input').val('');
                    }else{
                        $('#ruleNumberPage').find('.cutOfRule,.valPosition,.rulePreview').show();
                        if($type==1100300){//数据项
                            $('#sjx-more').find(':radio[nType="'+$data.cutFlag+'"]').prop('checked',true);//选择单选按钮
                            if($data.cutFlag==3){//截取之间
                                var betEle = $('#sjx-more').find(':radio[nType="3"]').nextAll('input');
                                betEle.eq(0).val($data.cutRule.replace(/-./,''));//第一个input
                                betEle.eq(1).val($data.cutRule.replace(/.-/,''));//第二个input
                            }else{
                                $('#sjx-more').find(':radio[nType="'+$data.cutFlag+'"]').nextAll('input').val($data.cutRule);
                            }
                        }else{//流水号
                            $('#ruleNumberPage').find('[name="intinalValue"]').val($data.intinalValue);//赋初始值
                            $('#ruleNumberPage').find('[name="incermentValue"]').val($data.incermentValue);//赋增量值
                            $('#ruleNumberPage').find('[name="maxValue"]').val($data.maxValue);//赋长度值
                        }
                    }

                })
            })
        });
        //点击批量删除编号规则页面---批量删除
        $('#number-rules-result').on('click','.cm-remove-btn',function(){
            var dataObj = [];
            if($('#number-rules-result').find('>.all-fix-wrap>.col-fix-wrap').length>0){
                $('#number-rules-result').find('>.all-fix-wrap>.col-fix-wrap>table>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }else{
                $('#number-rules-tb').find('>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }
            if(dataObj==0){
                toast('请选择要删除的设备').warn();
            }else{
                $post(numRuleDelBatchAct,dataObj,function(res){
                    toast('删除成功').ok();
                    queryApplyUnit();
                },true)
            }
        });
        //点击删除该条数据---删除
        $('#number-rules-tb').on('click','.icon-trash',function(){
            var $the = $(this);
            $confirm('确定删除个规则?',function (del) {
                if(del){
                    $post(numRuleDeleteSingleAct,{"id":$.trim($the.attr('param'))},function(res){
                        toast('删除成功',600).ok();
                        queryApplyUnit()
                    },true)
                }
            });
        });

        //编号规则大类改变
        $('#ruleNumberPage').on('change','#proofNumType',function(event,isUpdate){
            $('#sjx-more').find('input:not(:radio)').val('1').first().val('0').end().eq(4).val('2');
            $('#lsh-more').find(':text').val('1').last().val('3');
            $('#ruleNumberPage').find('.cutOfRule,.valPosition,.rulePreview').hide().find('input').val('');
            if(isUpdate){
                smallNumRuleFn('proofNumSmallType',$(this).prop('id'),function(){//假如为修改页面显示保存按钮
                    $('#ruleNumberPage').find('.basic-btn').show();//显示保存按钮
                })
            }else{
                smallNumRuleFn('proofNumSmallType',$(this).prop('id'))
            }

        });
        //编号规则小类改变
        $('#ruleNumberPage').on('change','#proofNumSmallType',function(){
            if($('#proofNumType').val()==1100100){//大类为标识(小类改变)
                $('#ruleNumberPage .cm-ok-btn').trigger('click');
            }else if($('#proofNumType').val()==1100300){//大类为数据项
                $('#sjx-more').find('input:not(:radio)').val('1').first().val('0').end().eq(4).val('2');
                $('#lsh-more').find(':text').val('1').last().val('3');
                $('#ruleNumberPage').find('.cutOfRule,.valPosition,.rulePreview').hide().find('input').val('');
                $('#ruleNumberPage').find('.basic-btn').hide();//隐藏保存按钮
                if($(this).val()==1100302){//小类为自定义取值规则
                    $('#valueRule').prop('disabled',true).show().siblings('.ruleOption').hide();
                }else if($(this).val()==1100301){//单位代码
                    $('#sjx-more').show().siblings('.ruleOption').hide();
                }
            }
        });
        //日期取值规则改变
        $('#ruleNumberPage').on('change','#valueRule',function(){
            if($('#proofNumType').val()==1100200){//大类为日期时
                $('#ruleNumberPage .cm-ok-btn').trigger('click');
            }
        });
        //数据项取值规则改变,流水号取值规则改变
        $('#ruleNumberPage').on('change','#sjx-more :radio,#lsh-more input',function(){
            $('#ruleNumberPage').find('.valPosition').hide().find('input').val('').eq(0).val('0');
            $('#ruleNumberPage').find('.rulePreview').hide().find('input').val('');
            $('#ruleNumberPage').find('.cutOfRule').hide();
        });
        //取值起始位置,取值长度改变
        $('#ruleNumberPage').on('change','[name="stratPosition"],[name="valueLength"]',function(){
            var $type = $('#proofNumType').val();//编号规则类型
            var $val = '';//预览值
            var proofNumValue = '';//原值
            var plaVal = $('#ruleNumberPage').find('[name="stratPosition"]').val();
            var lenVal = $('#ruleNumberPage').find('[name="valueLength"]').val();
            if($type==1100300){//数据项
                var $clsName = $('#sjx-more').find(':checked').closest('li').attr('class');
                var $claVal = parseInt($('#sjx-more').find(':checked').nextAll(':text').val());//第一个位数值
                var $claLstVal = parseInt($('#sjx-more').find(':checked').nextAll(':text').last().val());//第二个位数值
                for(var i=0;i<6;i++){
                    $val += Math.floor(Math.random()*10)
                }
                proofNumValue = $val;
                if($clsName == 'before'){//前截
                    $val = $val.slice(0,$claVal)
                }else if($clsName == 'after'){//后截
                    $val = $val.slice(0,-$claVal)
                }else if($clsName == 'between'){//之间
                    $val = $val.slice($claVal,$claLstVal)
                }

            }else{//流水号
                var lshNum = '';
                var initVal = parseInt($('#lsh-more').find('[name="intinalValue"]').val());//流水号初始值
                var incVal = parseInt($('#lsh-more').find('[name="incermentValue"]').val());//流水号增量
                var lshLen = parseInt($('#lsh-more').find('[name="maxValue"]').val());//流水号长度
                var initZeroLen = new Array(lshLen - initVal.asLength() + 1).join('0');//初始值zero长度
                var incZeroLen = new Array(lshLen - (initVal+incVal).asLength() + 1).join('0');//增长后zero长度
                proofNumValue = initZeroLen + initVal;//原值
                $val = incZeroLen + (initVal+incVal);//结果值
            }
            if(plaVal==''){//取值起始位置为空
                plaVal = 0;
            }
            if(lenVal==''){//取值长度为空
                $val = $val.substr(plaVal)
            }else{
                $val = $val.substr(plaVal,lenVal)
            }
            $('#ruleNumberPage').find('.basic-btn').show();//显示保存按钮
            $('#ruleNumberPage').find('.rulePreview').show().children('[name="proofNumValue"]').val(proofNumValue);//原值
            $('#ruleNumberPage').find('.rulePreview').show().children('[name="resultValue"]').val($val);//结果值
        });

        //编号规则确定按钮
        $('#ruleNumberPage').on('click','.cm-ok-btn',function(){
            var $type = $('#proofNumType').val();//编号规则类型
            var $val = '';
            var $originalVal = '';
            if($type==1100100 || $type==1100200){//标识,日期
                $('#ruleNumberPage').find('.rulePreview').show();
                if($type==1100100){//标识
                    $val = $('#proofNumSmallType').find('[value="'+$('#proofNumSmallType').val()+'"]').html();
                    $originalVal = $val;
                }else if($type==1100200){//日期
                    $originalVal = new Date().format();
                    $val = new Date().format($('#valueRule').find('[value="'+$('#valueRule').val()+'"]').html())
                }
                //显示保存按钮
                $('#ruleNumberPage').find('.basic-btn').show();//显示保存按钮
                $('#ruleNumberPage').find('.rulePreview').show().children('[name="proofNumValue"]').val($originalVal);//原值
                $('#ruleNumberPage').find('.rulePreview').children('[name="resultValue"]').val($val);//结果值
            }else{//流水号,数据项
                $('#ruleNumberPage').find('.cutOfRule,.valPosition').show();//显示
                $('#ruleNumberPage [name="stratPosition"]').val('0');//赋值取值起始位置
                $('#ruleNumberPage [name="stratPosition"]').trigger('change');//触发取值起始位置事件
            }


        });
        //点击取值新增
        $('#ruleNumberPage').on('click','.icon-plus',function(){
            var $val = parseInt($(this).prev().val());
            $val++;
            if($val>9999){
                $val = 9999;
            }
            $(this).prev().val($val);
            if($(this).closest('ul').prop('id')=='lsh-more'){//流水号
                $('#ruleNumberPage #lsh-more input').trigger('change');
            }
        });
        //点击取值减少
        $('#ruleNumberPage').on('click','.icon-minus',function(){
            var $val = parseInt($(this).next().val());
            $val--;
            if($val<1){
                $val = 1;
            }
            $(this).next().val($val);
            if($(this).closest('ul').prop('id')=='lsh-more'){//流水号
                $('#ruleNumberPage #lsh-more input').trigger('change');
            }
        });

        queryApplyUnit();
        //点击tree搜索申请单位
        cmQueryTreeFn(queryApplyUnit)


    })
}

//模板设置 sys-template-set.html
function sysTemplateSet(){
    setSubPrj('wz');
    importing('ztree',function(){
        //预定义filter
        $filter('asEditDelBtn',function(item){
            var html = '<a id="into-edit" class="icon-pencil mr5" param="{id}" title="修改"></a>'+
                '<a id="delete-single" class="icon-trash trash icon-pic mr5" param="{id}" orgId="{orgId}" title="删除"></a>'
//                    '<a id="down-icon" class="icon-circle-arrow-down down-icon mr5" param="{id}" title="展开"></a>' +
//                    '<a id="up-icon" class="icon-circle-arrow-up up-icon" param="{id}" title="收起"></a>';
//                    '<a id="pitch-on" class="icon-circle-blank " param="{id}" title="启用"></a>';
            return html.format({
                id:this.valueOf(),
                orgId:item.organizationId
            })
        });
        //添加展开图标
        $filter('setModulePage',function(item){
            var html = '<a class="show-module-page icon-plus mr5" dictKey="{dictKey}" orgId="{orgId}" title="展开"></a>';
            return html.format({
                dictKey:item.templateType,
                orgId:item.organizationId
            })
        });
        //是否开启模板
        $filter('isOpenModule',function(){
            if(this.valueOf()==0){
                return '禁用';
            }else{
                return '开启';
            }
        });
        var selectedNode,allUintData,allChildrenData;//选中节点,所有的table数据
        //配置树参数
        var setting = {
            check: {
                enable:false//是否显示checkbox
            },
            data: {
                key: {
                    children: "childrenNode",
                    name: "organName"
                }
            },
            view: {
                showIcon:true, //是否显示icon图标
                showTitle:false //是否显示节点上的title
            },
            callback:{
                onClick:function(event,treeId,treeNode){//treeId:对应 zTree 的treeId, treeNode:被点击的节点 JSON 数据对象
                    selectedNode = treeObj.getSelectedNodes()[0];//赋值选中的节点
                    loadTreeInfo(treeNode,treeNode.id,treeNode.organName);
                }
            }
        };
        //准备配置项
        var columns=[
            {title:'序号',  map:'rowNum',cls:'cell-xs tcenter'},
            {title:'子模板', map:'id.setModulePage',cls:'cell-xxs tcenter'},
            {title:'模板名称',  map:'templateName',cls:'cell-m'},
            {title:'模板类型',  map:'templateTypeName',cls:'cell-m'},
            {title:'所属单位',  map:'organName',cls:'cell-m tcebter'},
            {title:'顺序',  map:'templateSort',cls:'cell-m tcebter'}
//            {title:'操作',  map:'id.asEditDelBtn', cls:'cell-m tcenter'}
        ];
        var  configuration=[
            {title:'序号', map:'$rownum', cls:'cell-xs tcenter'},
            {title:'模板名称', map:'templateName', cls:'cell-m tcenter'},
            {title:'状态', map:'openFlag.isOpenModule',cls:'cell-m tcenter'},
            {title:'顺序', map:'templateSort',cls:'cell-m tcenter'},
            {title:'操作', map:'id.asEditDelBtn', cls:'cell-m tcenter'}
        ];

        //查询table列表
        function queryTableList(orgId,orgName){
            allUintData.each(function(item){
                item.organizationId = orgId;//单位id
                item.organName = orgName;//单位名称
            });
            $('#template-result').find('.total-count').html('5');
            $('#template-result').find('.cm-add-btn').attr('orgName',orgName).attr('orgId',orgId);//单位名称
            $('#template-tb').table({
                data:allUintData,
                cols:columns,
                cls:'tcenter',
                fixCols:{left:1,right:1},
                allowHTML:true
            });
        }
        //查询子模板table列表
        function queryChildrenTable(){
            $('#template-children-result').pagingList({
                action:templateQueryAct,
                jsonObj:{
                    'organizationId':$('#saveDataInp').attr('orgId') //单位id
                },
                callback:function(data){
                    var newData,len;
                    for(var i=0;i<data.length;i++){
                        if(data[i].where('o=>o.templateType=="{0}"'.format($('#saveDataInp').attr('dictKey'))).length>0){
                            newData = data[i];
                            break;
                        }
                    }
                    newData = newData ? newData : [];
                    allChildrenData = newData;
                    len = newData ? newData.length : 0;
                    $('#template-children-result').find('.total-count').hide().prev().show().html(len);
                    $('#template-children-tb').table({
                        data:newData,
                        cols:configuration,
                        cls:'tcenter',
                        fixCols:{left:1,right:1},
                        allowHTML:true
                    });
                }
            });
        }
        //查询ztree申请单位列表
        function queryApplyUnit(){
            $post(templateQueryOrganAct,{
                "organName":'', //单位信息主键ID,可为空
                "officeType":"2" //单位类别（1申请单位，2，保管单位），不可为空
            },function(res){
                var data = {organName:'保管单位',childrenNode:res.data};
                zTreeObj = $('#bgdw-tree').ztree(setting,data); //zTree初始化
                treeObj = $.fn.zTree.getZTreeObj("bgdw-tree"); //保存 zTree 初始化后得到的对象
                treeObj.expandAll(true);//展开全部节点
                //选中节点的id
                initId = selectedNode ? selectedNode.id : treeObj.getNodes()[0].childrenNode[0].id;
                organName = selectedNode ? selectedNode.organName : treeObj.getNodes()[0].childrenNode[0].organName;
                console.log(selectedNode)
                if(!selectedNode){
                    treeObj.selectNode(treeObj.getNodes()[0].childrenNode[0]);//初始化赋
                    loadTreeInfo(treeObj.getNodes()[0].childrenNode[0],initId,organName);
                }else{
                    treeObj.selectNode(selectedNode);//初始化赋
                    loadTreeInfo(selectedNode,initId,organName);
                }
            })
        }
        //点击树节点加载基本信息
        function loadTreeInfo(treeNode,id,organName){
            queryTableList(id,organName)
        }
        //模板类型函数
        function moduleFormFn(id,cb){
            $get(templateDictquery,{},function(res){
                $('#'+id).template(res.data);
                cb&&cb();
            })
        }

        //点击新增子模板页面
        $('#template-result').on('click','.cm-add-btn',function(){
            $('#editor').find('input').val('');
            $('#organ-name-span').val($(this).attr('orgName'));//单位名称赋值
            moduleFormFn('templateType');//模板类型
            $('#editor').find('.basic-btn').attr('orgId',$(this).attr('orgId')).attr('param','');//赋值单位id
            $open('#editor',{title:'新增模板',width:800,onClose:function(){
                $('#editor').find('.validate').removeClass('validatebox-invalid');
            }})
        });
        //点击保存新增子模板页面，点击保存子模板修改
        $('#editor').on('click','.basic-btn',function(){
            var $the = $(this);
            var dataObj={},act,name;
            $('#editor').find('.validate').validatebox();
            if($('#editor').find('.validatebox-invalid').length>0){
                return;
            }
            $('#editor').find(':text,select').each(function(i,item){
                dataObj[item.name] = $.trim(item.value);
            });
            dataObj.delFlag = 0;//删除标记（0未删除，1已删除）
            dataObj.organizationId = $the.attr('orgId');//单位id
            if($the.attr('param')){//修改
                act = templateSysupd;
                name = '修改成功';
                dataObj.id = $the.attr('param');//主键id
            }else{
                act = templateSysadd;
                name = '新增成功';
            }
            $post(act,dataObj,function(){
                toast(name);
                $('#editor').$close();
                $('#editor').find('.validate').removeClass('validatebox-invalid');
                if($the.attr('param')){
                    queryChildrenTable()
                }else{
                    queryApplyUnit();
                }
            })
        });
        //点击取消新增子模板页面
        $('#editor').on('click','.call-off',function(){
            $('#editor').$close();
            $('#editor').find('.validate').removeClass('validatebox-invalid');
        });

        //点击子模板页面
        $('#template-tb').on('click','.show-module-page',function(){
            var $the = $(this);
            $open('#template-children-result',{'title':'子模板页面',width:800});
            $('#saveDataInp').attr('orgId',$the.attr('orgId')).attr('param',$the.attr('param')).attr('dictKey',$the.attr('dictKey'));//单位id，模板类型
            queryChildrenTable()
        });
        //点击子模板修改
        $('#template-children-tb').on('click','.icon-pencil',function(){
            var data = allChildrenData.where('o=>o.id=="{0}"'.format($(this).attr('param')))[0];
            $('#editor').find('[name="templateName"]').val(data.templateName);//模板名称
            $('#editor').find('[name="organizationId"]').val(data.organName);//所属单位
            $('#editor').find('[name="openFlag"]').val(data.openFlag);//模板是否开启
            $('#editor').find('[name="templateSort"]').val(data.templateSort);//模板顺序
            moduleFormFn('templateType',function(){
                $('#templateType').val(data.templateType)
            });//模板类型
            $('#editor').find('.basic-btn').attr('orgId',data.organizationId).attr('param',data.id);//赋值单位id，主键id
            $open('#editor',{title:'修改模板',width:800,onClose:function(){
                $('#editor').find('.validate').removeClass('validatebox-invalid');
            }})
        });
        //删除子模板页面
        $('#template-children-tb').on('click','.icon-trash',function(){
            $post(templateDeleteSingleAct,{id:$(this).attr('param')},function(){
                toast('删除成功');
                queryChildrenTable()
            })
        });

        //构造父模板数据
        $get(templateDictquery,{},function(res){
            var dataArr = [];
            res.data.each(function(item,i){
                dataArr.push({'rowNum':(i+1),'templateName':item.dictValue,'templateTypeName':item.dictValue,'templateType':item.dictKey,'id':item.id,'templateSort':(i+1)})
            });
            allUintData = dataArr;
        });
        queryApplyUnit()


    })
}

//用户管理 sys-user-management.html
function sysUserManagement(){
    setSubPrj('wz');
    importing('ztree',function () {
        var userType = '2';//用户类别（保管用户2，1申请用户）
        var treeObj,sysModulData  = [];
        var selectedNode = [];
        var unitBoxId = '';//打开保管单位的id

        //准备配置项
        var modulecols=[
            {title:'序号',map:'rowNum', cls:'cell-xs tcenter'},
            {title:'姓名', map:'trueName', cls:'cell-s tcenter'},
            {title:'账号',map:'userName',cls:'cell-s tcenter'},
            {title:'警员编号',map:'policeNo',cls:'cell-m tcenter'},
            {title:'身份证号码',map:'idCardNo',cls:'cell-m tcenter'},
            {title:'保管单位',map:'organName',cls:'cell-l tcenter'},
            {title:'角色',map:'roleListNew',cls:'cell-l tcenter'},
            {title:'指纹',map:'fingerFlag.ifCollect',cls:'cell-s tcenter'},
            {title:'操作',map:'id.asEditDelBtn',cls:'cell-m tcenter'}
        ];
        var modulecols2 = [
            {title:'序号',map:'rowNum', cls:'cell-xs tcenter'},
            {title:'姓名', map:'trueName', cls:'cell-s tcenter'},
            {title:'账号',map:'userName',cls:'cell-s tcenter'},
            {title:'警员编号',map:'policeNo',cls:'cell-m tcenter'},
            {title:'身份证号码',map:'idCardNo',cls:'cell-m tcenter'},
            {title:'保管单位',map:'organName',cls:'cell-l tcenter'},
            {title:'指纹',map:'fingerFlag.ifCollect',cls:'cell-s tcenter'},
            {title:'操作',map:'id.asEditDelBtn',cls:'cell-m tcenter'}
        ];

        //添加修改和删除图标
        $filter('asEditDelBtn',function(item){
            var html = '<a class=" icon-pencil icon-pic mr5" param="{id}" title="编辑"> </a>'+
                '<a class=" icon-user icon-pic" param="{id}" title="头像"> </a>'+
                '<a class=" icon-trash trash icon-pic" param="{id}" name="{userName}" title="删除"> </a><br>';
            return html.format({
                id:this.valueOf(),
                moduleName:item.moduleName
            })
        });

        $filter('ifCollect',function(){
            if(this.valueOf()==0){
                return '未采集';
            }else{
                return '已采集';
            }
        });

        $post(managementSysqxjs,{},function(res){
            $('#bus-permissions,.all-bus-permission').html('');
            res.data.forEach(function(o){
                $('.all-bus-permission').append('<p roleId="' + o.id+ '">' + o.roleName + '</p>')
            });
        });



        //初始化数据
        function queryTableListSave(userType){
            $('#module-result-save').pagingList({
                action:managementSysModuleAct,
                jsonObj:{
                    "organizationId":$('#keep-user').find('input[name="organName"]').attr('organIdValue'),
                    "fingerFlag":$.trim($('.state').children('.query-block-active').attr('val')),
                    "trueName":$.trim($('#keep-user').find('input[name="pageName"]').val()),
                    "userName":$.trim($('#keep-user').find('input[name="userName"]').val()),
                    "policeNo":$.trim($('#keep-user').find('input[name="policeNo"]').val()),
                    "idCardNo":$.trim($('#keep-user').find('input[name="idCardNo"]').val()),

                    "userType":userType
                },
                callback:function(data){
                    sysModulData = data;
                    //角色名称
                    data.each(function(item){
                        var name='';
                        item.roleList.each(function(item2){
                            name+=item2.roleName+',';
                            item.roleListNew = name.replace(/,$/,'');
                        });
                    });
                    $('#sys-yhgl-tb-save').table({
                        data:data,
                        cols:userType==2?modulecols:modulecols2,
                        cls:'tleft',
                        fixCols:{left:1,right:1},
                        allowHTML:true,
                        check:'id'
                    });
                }
            });
        }

        //权限右移
        $('#win-keep-unit').on('click','.icon-arrow-right',function(){

            //左边的div
            var selectDivLeft = $($(this).parent().find('div')[0]);
            //右边的div
            var selectDivRight = $($(this).parent().find('div')[1]);
            //选中的p标签
            var selectP = selectDivLeft.find('p.active');
            $(selectP).remove();
            selectP.removeClass('active');
            selectDivRight.append(selectP);
        });

        //权限左移
        $('#win-keep-unit').on('click','.icon-arrow-left',function(){
            //左边的div
            var selectDivLeft = $($(this).parent().find('div')[0]);
            //右边的div
            var selectDivRight = $($(this).parent().find('div')[1]);
            //选中的p标签
            var selectP = selectDivRight.find('p.active');
            $(selectP).remove();
            selectP.removeClass('active');
            selectDivLeft.append(selectP);

        });

        //获取数据对象
        function getDataObj(id,type){
            var obj = {};
            obj.sysRoleList = [];
            $('#'+id).find('input,select,textarea,#bus-permissions p').each(function(i,item){
                var $ele = $(item);
                if($ele.parent().attr('id') == 'bus-permissions'){
                    obj.sysRoleList.push({id:$.trim($(item).attr('id'))})
                }else{
                    obj[item.name] = $.trim($ele.val());
                }
            });
            //单位id
            var $organId = $('#'+id).find('span[name="organizationId"]');
            if($organId.is(":hidden")){
                //新增的单位id
                obj["organizationId"]=$('#'+id).find('input[name="organName"]').attr('organIdValue');
            }else{
                //修改的单位id
                obj["organizationId"]=$('#'+id).find('span[name="organizationId"]').attr('organIdValue');
            }


            obj.userType=type;
            obj.openFlag = '1';
            obj.delFlag = '0';
            return obj;
        }

        //点击查询按钮
        $('#keep-user').on('click','.query-btn',function(){
            queryTableListSave(userType);
        });

        //点击重置按钮
        $('.cq-condition').on('click','.reset-btn',function(){
            $('.cq-condition').find('input').val('');
            $('.cq-condition').find('input').attr('organidvalue','');
            $('.state').children('.default').addClass('query-block-active').siblings().removeClass('query-block-active');
        });

        // tab页面切换
        $('li.tab-direct').on('click',function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            $('#keep-user').find('input[name="organName"]').val('');//清空查询条件中的单位名称
            $('#folder').find('.in-search').val('');//清空弹出单位树的查询框

            if($(this).index()==0){//保管用户
                $('#keep-user').find('span[name="bgdw"]').removeClass('hide');
                $('#keep-user').find('span[name="sqdw"]').addClass('hide');
                userType = '2';
                //初始化树
                initBgdwTree(selectedNode.id,zTreeOnClick,true,false,zTreeOnDblClick);
                //点击tree搜索单位
                cmQueryTreeFn2(initBgdwTreeFun);
            }else{//申请用户
                $('#keep-user').find('span[name="bgdw"]').addClass('hide');
                $('#keep-user').find('span[name="sqdw"]').removeClass('hide');
                userType = '1';
                //初始化树
                initSqdwTree(selectedNode.id,zTreeOnClick,true,false,zTreeOnDblClick);
                //点击tree搜索单位
                cmQueryTreeFn2(initSqdwTreeFun);
            }
            queryTableListSave(userType);
        });

        //点击取消按钮
        $('#win-apply-unit').on('click','.call-off',function () {
            $('#win-apply-unit').$close()
        }).on('click','.drop-down-box',function(){//点击下拉按钮
            unitBoxId = 'win-apply-unit';
            window.folderWin = $open('#folder',{width: 400,height:500, title: '选择单位'});
        });

        $('#win-keep-unit').on('click','.call-off',function () {
            $('#win-keep-unit').$close()
        }).on('click','.drop-down-box',function(){//点击下拉按钮
            unitBoxId = 'win-keep-unit';
            window.folderWin = $open('#folder',{width: 400,height:500, title: '选择单位'});
        });

        //删除单条数据
        $('#sys-yhgl-tb-save').on('click','.icon-trash',function(){
            var $the = $(this);
            $confirm('确定删除'+$the.attr('name')+'这个用户吗？',function (del) {
                if(del){
                    $post(managementSysUserDeleteAct,{"id":$.trim($the.attr('param'))},function(res){
                        toast('删除成功',600).ok();
                        queryTableListSave();
                    },true)
                }
            });
        });

        //批量删除数据
        $('#module-result-save').on('click','.cm-remove-btn',function(){
            deleteBatchForApproval();
        })
        function deleteBatchForApproval(){
            var dataObj = [],action;
            if($('#module-resule-save').find('>.all-fix-wrap>.col-fix-wrap').length>0){
                $('#sys-yhgl-tb-save').find('>.all-fix-wrap>.col-fix-wrap>table>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }else{
                $('#sys-yhgl-tb-save').find('>tbody>tr').each(function(){
                    var $ele = $(this).children('td:eq(0)').children('input');
                    if($ele.is(':checked')){
                        dataObj.push({'id':$ele.attr('tr-param')});
                    }
                });
            }
            if(dataObj == 0){
                toast("请选择要删除的数据").warn();
            }else {
                $confirm('确定删除?',function (del) {
                    if (del) {
                        $post(sysUserDleteBatchAct, dataObj, function (msg) {
                            if (msg.flag == 1) {
                                toast('批量删除成功').ok();
                                queryTableListSave(userType);//删除完再次查询 刷新页面tab列表
                            }
                        })
                    };
                });
            };
        };


        //弹出新增模块
        $('#keep-user').find('.cm-add-btn').on('click',function () {
//            if(selectedNode.length == 0 || selectedNode.nodeText=='申请单位' || selectedNode.organName=='保管单位'){
//                toast('请在查询条件的单位名称中，选择单位').warn();
//                return;
//            }
            var id = '';
            if(userType == '1'){
                id = 'win-apply-unit';//申请用户
            }else{
                id='win-keep-unit';//保管用户
            }
            //隐藏单位名称span，并显示单位名称文本框和下拉按钮
            $('#'+id).find('span[name="organizationId"]').hide();
            $('#'+id).find('input[name="organName"]').removeClass('hide');
            $('#'+id).find('.drop-down-box').removeClass('hide');

            var organ =  $('#'+id).find('span[name="organizationId"]');
            $('#'+id).find('input,select,textarea,img').val('');
            //新增时，清空保存按钮上的id
            $('#'+id).find('.basic-btn').attr('param','');
            if(userType == '1'){
                organ.text(selectedNode.nodeText);
            }else{
                organ.text(selectedNode.organName);
            }
            organ.attr('organIdValue',selectedNode.id);
            $open('#'+id,{width:800,title:'新增模块'});
            $('.process-permissions').on('click','p',function(){
                //取消别的选项的高亮
                $('.process-permissions').find('p').removeClass('active');
                //高亮当前选项
                $(this).addClass('active');
            });
            //allBgdwUnitMsg({organId:''},$('#'+id).find('.prevBgdw'));
        });

        //点击‘申请用户/保管单位’修改按钮，弹出修改窗
        $('#sys-yhgl-tb-save').on('click','.icon-pencil',function(){
            var data = sysModulData.where('o=>o.id=="{0}"'.format($(this).attr('param')));
            var id = '';
            if(userType==2){//保管单位修改
                id='win-keep-unit';//保管用户
            }else if(userType==1){//申请单位修改
                id = 'win-apply-unit';//申请用户
            }
            $("#"+id).template(data);
            //将用户id赋值到保存按钮上
            $("#"+id).find('.basic-btn').attr('param',$(this).attr('param'));

            //隐藏单位名称span，并显示单位名称文本框和下拉按钮
            $('#'+id).find('span[name="organizationId"]').show();
            $('#'+id).find('input[name="organName"]').addClass('hide');
            $('#'+id).find('.drop-down-box').addClass('hide');

            if(userType==2) {//保管单位修改
                $('#bus-permissions').html('');
                //权限角色
                data[0].roleList.each(function(item){
                    $('#bus-permissions').append('<p id="'+item.roleId+'">'+item.roleName+'</p>');
                });
                $post(managementSysqxjs,{},function(res){
                    var newData = res.data;
                    data[0].roleList.each(function(item){
                        newData = newData.where('o=>o.roleName!="{0}"'.format(item.roleName))
                    });
                    $('.all-bus-permission').html('');
                    newData.each(function(item){
                        //如果角色里面为0 就添加进去
                        $('.all-bus-permission').append('<p id="' + item.id+ '">' + item.roleName + '</p>');
                    });
                });
                //查询用户没有的角色权限
                $open('#'+id, {width: 800,height:400, title: '编辑保管用户'});
                $('.process-permissions').on('click','p',function(){
                    //取消别的选项的高亮
                    $('.process-permissions').find('p').removeClass('active');
                    //高亮当前选项
                    $(this).addClass('active');
                });
            }else{
                $open('#'+id, {width: 800,height:400, title: '编辑申请用户'});
            }


            //({organId:data[0].organizationId},$('#basic-information').find('.prevBgdw'));
        });

        //点击保存按钮
        $('.editor').on('click','.basic-btn',function () {
            var act = '';
            var id = $(this).closest('.editor').attr('id');
            var dataObj = getDataObj(id,$(this).attr('type'));
            $('.add-valid').validatebox();
            if ($('#'+id).find('.validatebox-invalid').length>0){
                return false;
            }
            dataObj.id = $(this).attr('param');
            if(dataObj.id == ''){
                //新增
                act = managementSysUserAddAct;
            }else{
                //修改
                act = managementSysUserEditAct;
            }
            $post(act,dataObj,function (res) {
                $('#'+id).$close();
                $('.add-valid').removeClass('validatebox-invalid');
                queryTableListSave(userType);
            },true)
        });

        //点击展开保管单位或申请单位
        $('.drop-down-box').on('click',function(){
            unitBoxId = 'keep-user';
            window.folderWin = $open('#folder',{width: 400,height:500, title: '选择单位'});
        });

        //点击单位的保存,取消，选择空值按钮
        $('#folder').on('click','.basic-btn',function(){
            treeObj = $.fn.zTree.getZTreeObj("bgdw-tree");
            //保存
            if(treeObj.getSelectedNodes().length == 0){
                toast('请先选择单位，再保存');
            }else{
                //给文本框赋值
                setOrganName(treeObj.getSelectedNodes()[0]);
            }
        }).on('click','.call-off',function(){
            //取消
            closeOrganWin();
        }).on('click','.empty-btn',function(){
            //选择空值
            setOrganName({id:'',organName:'',nodeText:''});
            selectedNode = [];
        });


        //初始化树
        initBgdwTree(selectedNode.id,zTreeOnClick,false,false,zTreeOnDblClick);
        //点击tree搜索单位
        cmQueryTreeFn2(initBgdwTreeFun);
        //初始化查询
        queryTableListSave(2);

        function initBgdwTreeFun(){
            initBgdwTree(selectedNode.id,zTreeOnClick,true,false,zTreeOnDblClick);
        }

        function initSqdwTreeFun(){
            initSqdwTree(selectedNode.id,zTreeOnClick,true,false,zTreeOnDblClick);
        }

        //节点点击事件
        function zTreeOnClick(event, treeId, treeNode) {
            //treeObj = $.fn.zTree.getZTreeObj(treeId);
            selectedNode = treeNode;
            //queryTableListSave(userType);
        }
        function zTreeOnDblClick(event, treeId, treeNode) {
            setOrganName(treeNode);
        }
        //把选中的单位，赋值给文本框
        function setOrganName(treeNode){
            var $obj;
            if(treeNode == null){
                return;
            }else if(treeNode.organName == '保管单位' || treeNode.nodeText == '申请单位'){
                toast('该节点不是单位，请选择具体单位').warn();
                return;
            }

            if(userType == '2'){
                //保管单位
                $('#'+unitBoxId).find('input[name="organName"]').val(treeNode.organName).attr('organIdValue',treeNode.id);
            }else{
                //申请单位
                $('#'+unitBoxId).find('input[name="organName"]').val(treeNode.nodeText).attr('organIdValue',treeNode.id);
            }
            closeOrganWin();
        }

        //关闭单位树弹窗
        function closeOrganWin(){
            window.folderWin.window('close');
        }

        //保管用户上传照片
        $('#win-keep-unit').on('change','#keep-f',function () {
            var data = new FormData();
            data.append('file', $('#keep-f')[0].files[0]);
            $.ajax({
                url:'http://192.168.1.211:8888/fdfs/api/file/upload' ,
                type: 'POST',
                data: data,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend:showLoading,
                complete:hideLoading,
                success: function (res) {
                    var url = 'http://192.168.1.211:7777/'+ res.data.fileNameRemote;
                    console.log(url);
                    $('#keep-img').attr('src',url);
                }
            });
        });

        //申请用户上传照片
        $('#win-apply-unit').on('change','#apply-f',function () {
            var data = new FormData();
            data.append('file', $('#apply-f')[0].files[0]);
            $.ajax({
                url:top.tmpUploadPath ,
                type: 'POST',
                data: data,
                async: false,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend:showLoading,
                complete:hideLoading,
                success: function (res) {
                    var url = top.tmpServerPath+ res.data.fileNameRemote;
                    console.log(url);
                    $('#apply-img').attr('src',url);
                }
            });
        });

        //警员号输入是否为六位
        $.extend($.fn.validatebox.defaults.rules, {
            sixjyh: {
                validator: function (val) {
                    return /^\d{6}$/.test(val);
                },
                message: '请输入6位警员号'
            }
        })

    })
}

//系统模块参数管理 sys-menu-manage.html
function sysMenuManagerHtml(){
    setSubPrj('wz');
    importing('ztree','dict',function () {
        var moduleInfo,
            moduleId,
            treeObj,
            setting = {
                check: {
                    enable: false			//启用复选框
                },
                data: {
                    simpleData: {
                        enable:"pid",		//扁平数据，pid表示父节点的ID
                        idKey:"id",
                        pIdKey:"pid"		//默认的pId改为pid，注意默认I为大写
                    }
                },
                view:{
                    showTitle: false, 	    //不显示提示信息
                    nameIsHTML: true,		//名字支持html代码
                    selectedMulti:false     //只能选中一个节点
                },
                callback:{
                    onClick:function(nodes, treeId, treeNode){
                        loadModuleInfo(treeNode);
                    }
                }
            };

        //初始化页面
        function initPageData(isFirst,delPid,editName) {
            $post(moduleAction,{},function (res) {
                var nodes = [];
                moduleInfo = res.data,
                    treeNode = {};
                for (var i = 0; i < moduleInfo.length; i++) {
                    if(moduleInfo[i].superId==null){
                        nodes.push({id:moduleInfo[i].resourceId,pid:0,name:moduleInfo[i].resourceName,sort:i});
                    }else{
                        nodes.push({id:moduleInfo[i].resourceId,pid:moduleInfo[i].superId,name:moduleInfo[i].resourceName,sort:i});
                    }
                }
                //$.ztree.init($('#module-tree'), setting, nodes);
                //treeObj = $.ztree.getZTreeObj('module-tree');

                //新api, 发动和获得树对象一步完成,调用逻辑更清晰
                treeObj =$('#module-tree').ztree( setting, nodes);
                //treeObj.expandAll(true);//默认展开全部节点
                if(isFirst){
                    loadModuleInfo(treeObj.getNodes()[0]);
                }
                if(delPid){
                    treeNode = treeObj.getNodeByParam('id',delPid);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                    treeObj.expandNode(treeNode);
                }
                if(editName){
                    treeNode = treeObj.getNodeByParam('name',editName);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                }
            });
        }
        //点击树节点加载数据
        function loadModuleInfo(treeNode){
            $get(moduleViewAction+"/"+treeNode.id,[],function(res){
                var data = res.data,
                    subRights = [];

                if(data==null){
                    $('#module-tip').show();
                    $('#module-content').hide();
                    return false;
                }
                $('#sub-rights-table').hide().find('tbody').html('');
                $template('#main-rights', data);
                moduleId = data.resourceId;
                $('#open-flag').dictSelect(data.visibleState);
                document.getElementById('open-flag').disabled="disabled";

                var children=data.children;
                if(children){
                    for (var i = 0; i < children.length; i++) {
                        subRights.push(str2obj('{"resourceName":"'+children[i].resourceName+'","url":"'+children[i].url+'"}'));
                    }
                }
                //加载子权限数据
                if(subRights.length>0){
                    $('#sub-rights-table').show();
                    $template('#sub-rights-table tbody',subRights);
                    clickToRemoveSubRights();
                    subRights = [];
                }
                $('#module-content table input,#module-content table select').addClass('no-edit').prop('readonly','readonly');

                //注册新增同级模块事件
                $('#add-same-btn').on('click',function () {
                    addModule(true);
                });
                //注册新增下级模块事件
                $('#add-lower-btn').on('click',function () {
                    addModule(false,treeNode.id);
                });
                //保存修改模块事件
                $('#save-add-btn').on('click',function () {
                    var paramsObj = {};
                    trimAll('#module-content');
                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }
                    paramsObj=$('#add-form').serializeObject();
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        paramsObj = $.extend(paramsObj,{visibleState:'1'});
                    }
                    if(paramsObj["descriptionArray"]){
                        var descriptionArray=paramsObj["descriptionArray"].split(",");
                        var resourceArray=paramsObj["resourceArray"].split(",");
                        var length=descriptionArray.length;
                        var children=[];
                        for(var i=0;i<length;i++){
                            var child = {"resourceName": descriptionArray[i], "url": resourceArray[i]};
                            children.push(child);
                        }
                        paramsObj.children=children;
                        delete paramsObj["descriptionArray"];
                        delete paramsObj["resourceArray"];
                    }

                    $post(moduleEditAction,obj2str(paramsObj),function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
                        initPageData(false,false,$('#title').val());
//                      loadModuleInfo(treeNode);
                    });

                });

                //保存新增模块事件
                $('#save-save-btn').on('click',function () {
                    var resourceStrVal,moduleNoVal;

                    trimAll('#module-content');

                    resourceStrVal = $('#resourceStr').val();
                    moduleNoVal = $('#moduleNo').val();
                    //模块代号或页面代号为空时，将另一个有值的代号赋值给它
                    if(moduleNoVal === ''){
                        $('#moduleNo').val(resourceStrVal);
                    }
                    if(resourceStrVal === ''){
                        $('#resourceStr').val(moduleNoVal);
                    }

                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }

                    var paramsObj=$('#add-form').serializeObject();
                    if(paramsObj["descriptionArray"]){
                        var descriptionArray=paramsObj["descriptionArray"].split(",");
                        var resourceArray=paramsObj["resourceArray"].split(",");
                        var length=descriptionArray.length;
                        var children=[];
                        for(var i=0;i<length;i++){
                            var child = {"resourceName": descriptionArray[i], "url": resourceArray[i]};
                            children.push(child);
                        }
                        paramsObj.children=children;
                        delete paramsObj["descriptionArray"];
                        delete paramsObj["resourceArray"];
                    }

                    $post(moduleAddAction,obj2str(paramsObj),function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
//                      loadModuleInfo(treeNode);
//                      treeObj.updateNode(treeNode);
                        initPageData(false,false,$('#title').val());
                    });
                });
                //绑定修改节点事件
                $('#edit-btn').on('click',function () {
                    var selector = '';
                    //首页的启用标志不可编辑
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        selector = '[name!="visibleState"]';
                    }else{
                        $('#open-flag').removeAttr("disabled");
                    }
                    $('#module-content table input[name!="moduleNo"],#module-content table select'+selector).removeClass('no-edit').removeAttr('readonly');//input加上边框
                    $('.load-module,.add-module').hide();
                    $('#sub-rights-table').show();
                    $('.edit-module').show();
                    //根节点模块代号可编辑
                    if(!treeNode.getParentNode()){
                        $('#moduleNo').removeClass('no-edit').removeAttr('readonly');//input加上边框
                    }
                    $('.c-mod').show();
                });
                //注册返回事件
                $('#save-return-btn').on('click',function () {
                    loadModuleInfo(treeNode);
                });

                $('#module-tip').hide();
                $('#module-content').show();
                $('.edit-module,.add-module').hide();
                $('.load-module').show();

                if(treeNode.isParent){
                    $('#delete-btn,.c-mod').hide();//有子节点的节点隐藏“删除节点”按钮
                    if(treeNode.children.length>1){//有一个以上子节点的显示默认进入
                        $('.default-into').show();
                        $('#url-col').removeAttr('colspan');
                    }else{
                        $('.default-into').hide();
                        $('#url-col').attr('colspan','3');
                    }
                    $('.p-mod').show();
                }else{
                    $('#delete-btn').show().on('click',function(){
                        deleteModuleInfo(moduleId,treeNode);
                    });
                    $('.c-mod').show();
                    $('.default-into,.p-mod').hide();
                    $('#url-col').attr('colspan','3');
                }
                $('#save-save-btn').hide();
            });
        }

        //删除节点
        function deleteModuleInfo(id,treeNode){
            $confirm('确认删除【'+treeNode.name+'】节点？',function(bol) {
                if (bol) {
                    $post(moduleDelAction,"{\"resourceId\":\""+id+"\"}",function (res) {
                        var msg = res.msg?res.msg:'删除成功！';
                        toast(msg,600).ok();
                        initPageData(false,treeNode.pid);
                        if(!treeNode.pid){
                            loadModuleInfo(treeObj.getNodes()[0]);
                        }
                    });
                }
            });
        }
        //点击删除一行子权限
        function clickToRemoveSubRights() {
            $('.sub-rights-remove').one('click',function () {
                $(this).parent().parent().remove();
            });
        }
        //新增同级或下级模块
        function addModule(sameLevel,pid) {
            $('#open-flag').removeAttr("disabled");
            $('.load-module,.edit-module').hide();
            $('.add-module').show();
            $('#module-content table input[name!="moduleNo"],#module-content table select').removeClass('no-edit').removeAttr('readonly').val('');//input加上边框，内容置空
            $('#sub-rights-table tbody').html('');//新增时移除子权限table里面的内容
            $('#sub-rights-table').show();

            if(!sameLevel){//新增下级模块时
                $('#parent-id').val(moduleId).attr("readonly","true").addClass('no-edit');
                $('#parent-id').parent().parent().show();
//              $('#moduleNo').addClass('no-edit').prop('readonly','readonly');
                $('.p-mod').hide();
            }else{//新增同级模块时
                $('#moduleNo').removeClass('no-edit').removeAttr('readonly').val('');
            }
            $('.c-mod').show();
            $('#save-add-btn').hide();
            $('#save-save-btn').show();
            $('#open-flag').dictSelect(1);
        }
        //扩展验证
        $.extend($.fn.validatebox.defaults.rules, {
            letter: {
                validator: function (val) {
                    return /^[\w|-]+$/.test(val);
                },
                message: '请输入字母、数字、中划线及下划线'
            },
            //验证汉字、英文、数字
            chEnName: {
                validator: function (value) {
                    return /^[\u0391-\uFFE5]+[a-z|A-Z|\d]*$/.test(value);
                },
                message: '请输入中文（后面可以包含英文或数字）'
            }
        });

        initPageData(true);
        $('#open-flag').dict();

        //注册点击添加子权限事件
        $('#sub-rights-plus').on('click',function () {
            $('#sub-rights-table tbody').append('<tr><td><span class="add-module edit-module orangered">★ </span>子权限描述：</td>'+
                '<td><input name="descriptionArray" type="text" class="common-input validate" data-options="required:true"></td>'+
                '<td><span class="add-module edit-module orangered">★ </span>子权限代号：</td>'+
                '<td><input name="resourceArray" type="text" class="common-input validate" data-options="required:true"><i class="icon-remove sub-rights-remove"></i></td></tr>');
            //绑定点击删除子权限事件
            clickToRemoveSubRights();
        });
    });
}