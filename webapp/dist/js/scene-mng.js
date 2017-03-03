/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-现场管理模块
 */
setSubPrj('xk');
/*现场查询action*/
var sceneQueryAct = makeAct('sceneCollecting/sceneInvestigation/query', ''), //列表查询
    sceneAddAttentionAct = makeAct('sceneCollecting/sceneFollow/add', ''), //关注
    sceneDelAttentionAct = makeAct('sceneCollecting/sceneFollow/del', ''), //取消关注
    sceneDelAct = makeAct('sceneCollecting/sceneInvestigation/delAllLogic', ''),//删除/批量删除
    sceneExportAct = makeAct('sceneCollecting/sceneInvestigation/export',''),//excel导出
    sceneSetEditAct = makeAct('sceneCollecting/sceneInvestigationStatus/updateModify', ''), //设为可修改
    scenePersonAct = makeAct('sys/sysUser/queryAll', ''),//查询勘验检查人员 输入框查询
    sceneTabStatAct = makeAct('sceneCollecting/sceneInvestigation/queryCount', ''), //现场查询tab统计
    sceneFaqhAct = makeAct('sys/sysOrganization/dict_unit'), //查询发案区划字典
    sceneKyrAct = makeAct('sceneCollecting/investigatorHistory/queryAll', ''),//查询勘验人
    sceneTreeUserAct = makeAct('sys/sysUser/queryTreeUser');

/*资料制作action*/
var docMakeListAct = makeAct('sceneCollecting/sceneInvestigation/query'),//结果列表查询action
    docMakeDoAct = makeAct('sceneCollecting/sceneInfoWord/createInvestigationNote');//制作笔录action

/* 现场查询模块 */
function sceneQueryFn(){
    importing('dict','saved-condition.js',function(scope){

        log($('.all-fix-wrap').length)
        var columns = [
            {title:'序号',       map:'rowNum',                          cls:'mem6 check-it'},
            {title:'现场勘验号', map:'investigationNo.querySceneKLink', cls:'mem20 nowrap td-left'},
            {title:'案件关联',   map:'caseNo.querySceneIfExist',        cls:'mem6 pr over-v'},
            {title:'警情关联',   map:'alarmNo.querySceneIfExist',       cls:'mem6 pr over-v'},
            {title:'勘验时间',   map:'investigationDateFrom.asCnTime',  cls:'mem14'},
            {title:'勘验单位',   map:'organName',                       cls:'mem18 td-left'},
            {title:'案件类别',   map:'caseType',                        cls:'mem10 td-left'},
            {title:'发案地点',   map:'caseLocation',                    cls:'mem22 td-left'},
            {title:'勘验人',     map:'sceneInvestigator',               cls:'mem16 td-left'},
            {title:'现场图',     map:'scenePicture',                    cls:'mem6'},
            {title:'操作',       map:'opt',                             cls:'mem12 opt td-left',  filter:'querySceneOpt'}
        ];

        //声明主要元素,并scope绑定
        var $tab = $('#scene-tab-stat').bind2(scope,'statData');
        var $qb = $('.query-block').bind2(scope,'queryData');
        var $qr = $('#scene-query-result');
        var $tb = $('#scene-table').bind2(scope,'listData');

        //table初始化
        $tb.table({
            cols:columns,
            fixCols:{left:2, right:1},
            helper:function(item){
                item._trChecked = !!top.registry.xcgl.checkScene[item.rowNum]
            },
            allowHTML:true,
            check:'id'
        });

        //当前用户角色判断
        var roles = top.roles.select('o=>o.roleEnName'), role = '';
        if(roles.indexOf('sysManager') > -1){
            role = 'sysManager'; //管理员
            $('.batch-set-edit').removeClass('hideplus');
        }else if(roles.indexOf('investigator') > -1){
            role = 'investigator'; //勘察员
        }

        //判断是否存在案件和警情编号
        $filter('querySceneIfExist', function(){
            var value = this.valueOf();
            if(value){
                return '<span class="icon-ok-sign number-exist"></span>'+$('#q-r-no-detail').text().format(this.valueOf());
            }else{
                return '--';
            }
        });

        //返回操作列
        $filter('querySceneOpt', function(item){
            return $compile('#q-r-table-opt', item, function(utem){
                if(utem.followId){ //已关注
                    utem.gzClass = 'icon-star2';utem.gzTitle = '取消关注';
                }else{ //未关注
                    utem.gzClass = 'icon-star2-empty';utem.gzTitle = '关注';
                }
                //复勘操作 iterationNo 有值：已复勘 没值：可复勘
                if(utem.iterationNo==''){
                    utem.allowIteration = '_iteration';
                }

                //勘察员
                if(role == 'investigator'){
                    //对于 未提交&&自己录入 可以删除
                    if(utem.saveFlag == '0' && top.currentUser.userId == utem.createUserId){
                        utem.allowDel = '_del';
                    }
                    //是否可以修改 现场的勘验人和录入人可以对该现场进行修改。
                    if(top.currentUser.userId == utem.createUserId
                        || (utem.investigationtorId && utem.investigationtorId.indexOf(top.currentUser.userId) > -1)){
                        utem.allowEdit = '_modify';
                    }
                }
                //管理员
                if(role == 'sysManager'){
                    //都可以进行删除
                    utem.allowDel = '_del';
                    //都可以进行修改
                    utem.allowEdit = '_modify';
                    //已提交的现场 管理员 有设为可修改操作
                    utem.saveFlag == '1' ? utem.allowSetEdit = '_setEdit' : null;
                    //判断 是否可以做 设为可修改的操作 1：页面上操作是设为不可修改
                    utem.allowModify == '1' ? (utem.setClass = 'set-no-edit', utem.setEditTitle = '设为不可修改') : (utem.setClass = 'set-edit', utem.setEditTitle = '设为可修改');
                }
            });
        });

        //现场勘验号的链接
        $filter('querySceneKLink', function(item){
            return '<a class="into-xcky-view" kybh="{2}" data-casetype="{3}" data-casenature="{4}" href="javascript:void(0);">{0}<span class="fk {1}">复勘</span></a>'.format(this.valueOf(), item.iterationNo?'':'hide-plus', item.id, item.caseType, item.caseNature);
        });





        //修改侧边栏iconfont样式 TODO ?
        function changeSidebarStyle(pageNo) {
            top.rootMenu.find('li>a').removeClass('menu-open menu-open2');
            top.rootMenu.find('li').each(function () {
                if ($(this).attr('page-no') == pageNo) {
                    var a = $(this).children('a');
                    a.parents('.grade2,.grade3,#root-menu>li').each(function () {
                        $(this).children('a').eq(0).addClass('menu-open');
                    });
                    a[0].click();
                    a.addClass('menu-open menu-open2');
                }
            });
        }

        //定时器
        function timing(){
            var timer = setInterval(function(){
                if($('.unready').length == 0){
                    clearInterval(timer);
                    $('#query-kyjcry-dict').append($('#q-b-kyr-input-tp').html());
                    saveCondition(true, '.cq-condition', '.al-save-condition', '1', queryForScene);
                }
            }, 30);
        }

        //勘验检查人员常用项
        function getPersonDict(){
            var param = {duty: "0"};
            $post(sceneKyrAct, param, function (res) { //勘验人员字典
                var d = res.data.select('o => {dictValue: o.investigatorName, dictKey: o.investigatorId}');
                $post(sceneTreeUserAct, null, function (res) {
                    $('#query-kyjcry-dict').data('info', res.data).dict(res.data, d);
                }, false, false);
            }, false, false);

            //$post(sceneKyrAct, param,null,false,false)
            //.then(function(res){
            //    var d = res.data.select('o => {dictValue: o.investigatorName, dictKey: o.investigatorId}');
            //    return $post(sceneTreeUserAct,null,false,false);
            //})
            //.then(function(res){
            //    $('#query-kyjcry-dict').data('info', res.data).dict(res.data, d);
            //});
        }


        //判断是否全选
        function judgeCheckAll(){
            var $input = $('.native-fix-wrap .xtp-check-tr');
            var $checkAll = $('.xtp-check-tr-all');
            var flag = true;
            $input.each(function(i, item){
                if(flag){
                    //checkbox 是否勾选判断
                    var checked=top.registry.xcgl.checkScene[$(item).attr('tr-rownum')]; //console.info(checked)
                    flag = checked;
                }
            });
            $checkAll.prop('checked', flag);
            top.registry.xcgl.checkScene.length == 0 && $checkAll.prop('checked', false);
        }

        //tab统计
        function tabStat(){
            $post(sceneTabStatAct,null,function(res){
                scope.set('statData',res.data);
            },false,false);
        }

        //查询列表
        function queryForScene(saveQueryObj){
            if(!saveQueryObj) {
                saveQueryObj = {queryStr: {}};
            }else{
                saveQueryObj = saveQueryObj.queryStr;
            }
            top.registry.xcgl.checkScene=[];
            top.registry.xcgl.checkSceneIds=[];
            var currentPage;
            //从已保存条件中点击查询 重置当前页
            if(typeof saveQueryObj=='object'){
                currentPage=0;
            }
            //直接传入页码数字
            else if(typeof saveQueryObj=='number'){
                currentPage=saveQueryObj;
            }
            //默认查询后回到当前页
            else{
                currentPage=$qr.children('.paging').data('currentPage');
            }
            $qr.pagingList({
                action:sceneQueryAct,
                currentPage:currentPage,
//                pageOnce:10,
//                jsonObj:$.extend({
//                    sceneArea:$('[name="sceneArea"]').val(),//现场范围
//                    sceneStatus:$('[name="sceneStatus"]').val(),//现场状态
//                    investigationDateFrom:$kysj.val() ? $kysj.val().split(',')[0] : null,
//                    investigationDateTo:$kysj.val() ? $kysj.val().split(',')[1] : null,
//                    relateFlag: $('[name="relateFlag"]').val(),
//                    caseType:$('#query-ajlb').val(),//案件类别
//                    caseRegionalism:$('#query-faqh').val(),//发案区划
//                    sceneInvestigatorId:$('#query-kyjcry').val() || $('#query-kyjcry-input-hidden').val(),//勘验检查人员
//                    investigationNo:$('#query-kybh').val(),//勘验编号
//                    investigationPlace:$('#query-kydd').val(),//勘验地点
//                    caseNo:$('#query-ajbh').val(),//案件编号
//                    alarmNo:$('#query-jqbh').val(),//警情编号
//                    noteMadeFlag:$('[name="noteMadeFlag"]').val(),//是否制作笔录
//                    bsCollectFlag:$('[name="bsCollectFlag"]').val()//是否已采基站
//                }, saveQueryObj),
                jsonObj:$.extend(scope.get('queryData'),saveQueryObj),

                callback: function(data){
                    scope.set('listData', data);
                    judgeCheckAll();//判断全选是否勾上
                }
            });
        }

        //重置
        function resetForScene(){
            //清空查询内容
            $qb.find(':text').val('');//所有输入框清空
            $qb.find('[data-chval]').val('').attr('data-chval', '不限');//字典隐藏域清空
            $('.x-select').trigger('x-default');//inline-select清空
            $qb.find(':radio').parent('div').find('input:first').prop('checked', true);//单选字典默认选中第一个
            //已选条件修改
            saveCondition(false, '.cq-condition', '.al-save-condition', '1');
        }

        //删除/批量删除 arrId:[{id:''},{id:''}]
        function delScene(arrId){
            $post(sceneDelAct, arrId, function(){
                toast('删除成功！').ok();
                queryForScene();
            });
        }

        //设为可修改/批量设为可修改 //arrId:[{investigationId:'',allowModify:'1'},{investigationId:'',allowModify:'0'}]
        function setEditScene(arrId){
            return $post(sceneSetEditAct, arrId, function(res){});
        }

        timing();//定时器 初始化字典后执行的方法
        getPersonDict(); //初始化勘验人常用项
        //getFaqhDict();//初始化发案区划字典
        tabStat();//tab统计
        queryForScene();//列表查询

        //tab统计点击事件注册
        $('#scene-tab-stat').on('click', 'li', function(){
            //tabs切换
            var value = $(this).attr('val');

            $qb.find('input').val('');
            $qb.find('u').removeClass('active');
            $qb.find('.default').addClass('active');

            value != 'wgl' && $('#query-xczt').trigger('x-select',value);
            //未关联选项卡
            value == 'wgl' && $('#query-sfgl').trigger('x-select', '0');

            $qr.children('.paging').data('currentPage', 0);
            queryForScene();
            saveCondition(false, '.cq-condition', '.al-save-condition', '1');
        });
        //查询区域注册事件
        $('.query-block-tabs')
            .on('x-reset',resetForScene)
            .on('x-query',function () {
                queryForScene(0);
            })
            .on('keyup', '#query-kyjcry-input', function(){
                var value = $(this).val();
                var $ul = $(this).next('ul');
                $('#query-kyjcry-input-hidden').val('');//清空输入框对应的勘验检查人员id
                if(value.isEmpty()){
                    $ul.children('li').remove();
                }else{
                    $post(scenePersonAct,{trueName:value}, function(res){
                        if(res.data){
                            $ul.template(res);
                        }
                    }, false, false);
                }
            })
            .on('click', '.kyr-res li', function(){
            var $input = $(this).parent().prev(),
                $hidden = $('#query-kyjcry-input-hidden'),
                $ul = $(this).parent(),
                $dictInput = $('#query-kyjcry');
            $input.val($(this).text());
            $hidden.val($(this).attr('paramId'));
            //当勘验检查人员字典没有选择时，以输入框输入的为主
            if($dictInput.val().isEmpty()){
                $dictInput.val($(this).attr('paramId'));
                $dictInput.attr('data-chval',$(this).text());
            }
            $ul.children('li').remove();
        });

        //列表区域注册点击事件
        $qr.on('mouseover', '.number-exist', function(){
            $(this).next().show();
        }).on('mouseout', '.number-exist', function(){
            $(this).next().hide();
        }).on('click', '.into-xcky-view', function(){
            var investId = $(this).attr('kybh');
            var caseType = $(this).attr('data-casetype') || '';
            var caseNature = $(this).attr('data-casenature') || '';
            $append(getViewPath('scene-add.html?id={0}&searchflag=1'.format(investId),'./view/'),'现场详情');
        }).on('click', '.into-link', function(){
            //单条数据的关联
            //仅可以对未提交的现场进行关联操作 1:提交 0:暂存
            var saveFlag = $(this).attr('saveFlag'),
                investId = $(this).attr('paramId');
            if(saveFlag == '1'){
                toast(' 该现场已提交，不允许进行关联操作').css('width','300px').warn();
            }else{
                $append(getViewPath('pol-case-reuse.html?investId='+investId,'./view/'),'警情复用');
            }
        }).on('click', '.into-attention', function(){
            //单条数据的关注
            var $this = $(this);
            var investigationId = $this.attr('paramId');
            var attentionFlag = $this.attr('attentionFlag');
            if(attentionFlag){
                //已经关注，此操作取消关注
                $post(sceneDelAttentionAct,investigationId, function(res){
                    $this.attr('attentionFlag', '')
                        .prop('title', '关注')
                        .addClass('to-no-active');
                    toast('已取消关注', function(){
                        $this.removeClass('icon-star2 to-no-active')
                            .addClass('icon-star2-empty');
                    }, 1000).ok();
                }, true, false);
            }else{
                //没有关注，此操作添加关注
                $post(sceneAddAttentionAct,{investigationId:investigationId}, function(res){
                    $this.attr('attentionFlag', 'id')
                        .prop('title', '取消关注')
                        .addClass('to-active');
                    toast('已关注', function(){
                        $this.removeClass('icon-star2-empty to-active')
                            .addClass('icon-star2');
                    },1000).ok();
                }, true, false);
            }
        }).on('click', '.into-set-edit', function(){
            //设为可修改
            var $this = $(this);
            var investigationId = $(this).attr('paramId');
            var allowModify;
            if($this.hasClass('set-edit')){ //操作是设为可修改  之后改条数据可修改
                allowModify = '1';
            }else if($this.hasClass('set-no-edit')){ //操作是设为不可修改
                allowModify = '0';
            }
            setEditScene([{
                investigationId:investigationId,
                allowModify:allowModify
            }]).then(function(){
                toast('修改成功！').ok();
                if(allowModify == '1'){
                    $this.removeClass('set-edit')
                        .addClass('set-no-edit')
                        .attr('title','设为不可修改');
                }else if(allowModify == '0'){
                    $this.removeClass('set-no-edit')
                        .addClass('set-edit')
                        .attr('title','设为可修改');
                }
            });
        }).on('click', '.into-edit', function(){
//            toast('进入现场修改页面，开发中...').warn();
            var $this = $(this);
            var investId = $this.attr('paramid');
            var caseType = $this.attr('data-casetype');
            var caseNature = $this.attr('data-casenature');
            var investigationNo = $this.attr('investigationNo');
            $append(getViewPath('scene-add.html?id={0}&investigationNo={1}'.format(investId,investigationNo),'./view/'),investigationNo);
        }).on('click', '.into-iteration', function(){
            //复勘
            var investigationId = $(this).attr('paramId');
            var caseType = $(this).attr('data-casetype');
            var caseNature = $(this).attr('data-casenature');
            $append(getViewPath('scene-add.html?id={0}&iteration=1'.format(investigationId),'./view/'),'新增现场');
            /*$get(sceneIterationAct+'/'+investigationId, {}, function(res){
             var addScene = $append(getViewPath('scene-add.html?iteration=1','./view/'),'新增现场');
             var iframe = addScene[0].getElementsByTagName('iframe');
             iframe.onload = function(){
             var win = iframe[0].contentWindow;
             win.fillData(win.$('#add-scene-aqxx'),res.data);
             }
             });*/
        }).on('click', '.into-del', function(){
            //删除单条数据
            var id = $(this).attr('paramId');
            delScene([{id:id}]);
        }).on('click', '.into-add-scene', function(){
            changeSidebarStyle('add-scene');
        }).on('click', '.batch-set-edit', function(){
            var beforeArr = top.registry.xcgl.checkSceneIds.where('o=>o!=undefined');
            var arr = [];
            if(beforeArr.length == 0){
                toast(' 请选择要设为可修改的现场！').css('width', 280).warn();
            }else{
                arr = beforeArr.where('o=>o.saveFlag=="1"');
                if(arr.length == 0){
                    toast(' 所选现场未提交，请重新选择！').width(280).warn();
                }else if(arr.length == beforeArr.length){
                    setEditScene(arr.select('o=>{investigationId:o.id, allowModify:(o.allowModify == "0" ? "1" : "0")}'))
                        .then(function(){
                            toast('修改成功！').ok();
                            queryForScene();
                        });
                }else{
                    $confirm('所选现场有未提交现场，是否修改其他选中的现场？', function(bol){
                        if(bol){
                            setEditScene(arr.select('o=>{investigationId:o.id, allowModify:(o.allowModify == "0" ? "1" : "0")}'))
                                .then(function(){
                                    toast('修改成功！').ok();
                                    queryForScene();
                                });
                        }
                    });
                }
            }
        }).on('click', '.batch-del', function(){
            //批量删除
            var beforeDelArr = top.registry.xcgl.checkSceneIds.where('o=>o!=undefined');
            var delArr = [];

            if(beforeDelArr.length == 0){
                toast(' 请选择要删除的现场！').warn();
            }else{
                //勘察员 删除时 需要做判断
                if(role == 'investigator') {
                    //从勾选要删除的现场中，筛选出 未提交&&自己录入 的现场
                    delArr = beforeDelArr.where('o=>o.saveFlag=="0" && o.createUserId == "{0}"'.format(top.currentUser.userId));
                    if (delArr.length == 0) {
                        //没有 未提交&&自己录入的现场
                        toast(' 所选现场不允许删除，请重新选择').css('width', '290px').warn();
                    } else if (delArr.length == beforeDelArr.length) {
                        //都是 未提交&&自己录入的现场
                        delScene(delArr.select('o=>{id:o.id}'));
                    } else {
                        //部分是 未提交&&自己录入的现场
                        $confirm('所选现场有已提交现场，不允许删除，是否删除其他选中的现场？', function (bol) {
                            if (bol) {
                                delScene(delArr.select('o=>{id:o.id}'));
                            }
                        });
                    }
                }
                //管理员 都可以删除
                if(role == 'sysManager'){
                    $confirm('确定要删除所选现场吗？', function(bol){
                        if(bol){
                            delScene(beforeDelArr.select('o=>{id:o.id}'));
                        }
                    });
                }
            }
        }).on('click', '.export-excel', function(){
            var $form = $('#export-form');
            var tb = $('#scene-table');
            var kysj = $('#query-investigationDate').val(), //勘验时间
                person = $('#query-kyjcry').val(), //勘验检查人员
                colnames = tb.find('>thead>tr>th:visible').toArray().select('th => th.className.split(" ")[0].replace("xtp-scene-table-th-","")'); //列名
            $('.query-block').find('[data-name]').each(function(i, item){
                if(item.tagName == 'INPUT'){
                    $form.children('[name="{0}"]'.format($(item).data('name')))
                        .val($(item).val());
                }else if(item.tagName == 'SPAN'){
                    $form.children('[name="{0}"]'.format($(item).data('name')))
                        .val($(item).children('.active').attr('val'));
                }else if($(item).hasClass('dict')){
                    var $input = $('#'+$(this).attr('dict-id'));
                    $form.children('[name="{0}"]'.format($(item).data('name')))
                        .val($input.val());
                }
            });
            $form.children('[name="investigationDateFrom"]').val(kysj ? kysj.split(',')[0] : null);
            $form.children('[name="investigationDateTo"]').val(kysj ? kysj.split(',')[1] : null);
            $form.children('[name="sceneInvestigatorId"]').val(person ? person : $('#query-kyjcry-input-hidden').val());
            $form.children('[name="colName"]').val(colnames);

            $post(sceneExportAct, $form.serializeObject(), function(res){
                console.log(res)
                location.href = top.sysParams.fileServerPath+res.data.filePath;
//                location.href=res.data.filePath;
//                var len = res.data.filePath.split('/').length;
//                location.href = 'http://192.168.1.143:8888/xcky3/tempFile/'+res.data.filePath.split('/')[len-1];
            }, null, false);
//            $form.attr('action', action2link(sceneExportAct));
//            $form.submit();
        }).on('click', '.xtp-check-tr-all', function(){
            var checked=this.checked;
            $('#scene-table .xtp-check-tr').each(function(i,item){
                checkTrFn(checked,i,item);
            });
        }).on('click', '.xtp-check-tr', function(e){
            checkTrFn(this.checked,$(this).closest('tr').index(),this);
            judgeCheckAll();
        });

        function checkTrFn(checked,i,item){
            var rownum = $(item).attr('tr-rownum');

            if(checked){
                var rowid  = $(item).attr('tr-param');
                var theObj = $('#scene-table').data('current-data')[i]//.where('o => o.id=="{0}"'.format(rowid))[0];
                //warn(theObj==$(item).closest('tr').data('current-data'))
                top.registry.xcgl.checkScene[rownum] = true;

                top.registry.xcgl.checkSceneIds[rownum] = {
                    id: rowid,
                    saveFlag :theObj.saveFlag,
                    createUserId : theObj.createUserId,
                    allowModify : theObj.allowModify
                };
            }

            else{
                top.registry.xcgl.checkScene[rownum] = false;
                top.registry.xcgl.checkSceneIds[rownum] = undefined;
            }

        }
    });
}

/* 资料制作模块 */
function docMakeFn(){
    importing('dict', function(scope){

        var columns = [
            {title:'序号',     map:'rowNum',                         cls:'mem6 th-center pl10'},
            {title:'现勘编号', map:'investigationNo.docMakeCaseNo',  cls:'mem16 td-left'},
            {title:'案件编号', map:'caseNo.docMakeCaseNo',           cls:'mem16 td-left'},
            {title:'案件类别', map:'caseType',                       cls:'mem8'},
            {title:'发案区划', map:'caseRegionalism',                cls:'mem16'},
            {title:'勘验时间', map:'investigationDateFrom.asCnTime', cls:'mem14'},
            {title:'勘验地点', map:'investigationPlace',             cls:'mem18'},
            {title:'勘验人',   map:'sceneInvestigator',              cls:'mem10'},
            {title:'勘验笔录', map:'noteMadeFlag.docMakeWd',         cls:'mem10'},
            {title:'操作',     map:'opt.docMakeOpt',                 cls:'mem4'}
        ];

        var $qr = $('#doc-make-query-result');
        var $qb = $('.query-block');

        $('.dict').dict();
        //初始化 发案区划 自定义字典
        function getFaqhDict(){
            $get(sceneFaqhAct, null, function(res){
                $('#query-dict-faqh').dict(res.data);
            }, false, false);
        }

        $filter('docMakeCaseNo', function(item){
            var value = this.valueOf();
            return value||'--';
        });
        $filter('docMakeWd', function(){
            var value = this.valueOf();
            if(value == '0'){
                return '未制作';
            }else if(value == '1'){
                return '<img width="30px" src="../img/icon/wd.png"/>';
            }
        });
        $filter('docMakeOpt', function(item){
            return $compile($('#doc-make-table-opt').html(), item, function(){
                if(item.noteMadeFlag == '0'){
                    //未制作 显示制作操作
                    item._doBtn = '_do';
                }else if(item.noteMadeFlag == '1'){
                    //已制作 显示下载按钮
                    item._download = '_download';
                }
            });
        });

        //scope绑定
        scope.bind('listData', '#doc-make-tb');

        //定义结果列表table
        $('#doc-make-tb').table({
            cols:columns,
            fixCols:{left:2, right:1},
            allowHTML:true
        });

        //结果列表查询
        function queryForList(saveQueryObj){
            var kysj = $('#query-investigationDate').val();
            $qr.pagingList({
                action:docMakeListAct,
                currentPage:$qr.children('.paging').data('currentPage'),
                jsonObj:$.extend({
                    sceneArea: $('[name="sceneArea"]').val(),
                    investigationNo: $('#query-kybh').val(),
                    noteMadeFlag: $('[name="noteMadeFlag"]').val(),
                    caseRegionalism: $('#query-faqh').val(),
                    caseType: $('#query-ajlb').val(),
                    investigationDateFrom:kysj ? kysj.split(',')[0] : null,
                    investigationDateTo:kysj ? kysj.split(',')[1] : null,
                    investigationPlace: $('#query-kydd').val()
                },saveQueryObj),
                callback:function(data){
                    scope.set('listData', data);
                }
            });
        }

        //重置
        function resetForDocMake(){
            //清空查询内容
            $qb.find(':text').val('');//输入框清空
            $qb.find('[data-chval]').val('').attr('data-chval', '不限');//字典隐藏域清空
            $qb.find(':radio').parent('div').find('input:first').prop('checked', true);//单选字典默认选中第一个
            $('.x-select').trigger('x-default');//inline-select清空
        }

        getFaqhDict();
        queryForList();

        //查询区域点击事件
        $('.query-block-tabs').on('click', 'u', function(){
            $(this).addClass('active').siblings('u').removeClass('active');
        }).on('x-query', function(){
            $qr.children('.paging').data('currentPage', 0);
            queryForList();
        }).on('x-reset', function(){
            //重置
            resetForDocMake();
        });

        //结果列表点击事件
        $qr.on('click', '.into-make', function(){
            var investigationId = $(this).attr('investigationId');
            $get(docMakeDoAct+'/'+investigationId, null, function(){
                queryForList();
                toast('制作笔录成功！').ok();
            });
        }).on('click', '.into-download', function(){
            var filepath = $(this).attr('filepath'),
                investigationNo = $(this).attr('investigationNo');
            location.href = top.sysParams.fileServerPath+filepath+'?attname=现场勘验笔录（'+investigationNo+'）.doc';
        });
    });
}

//警情复用
function polCaseReuse() {
    importing('dict','datepicker','daterangepicker',function () {
        var getListDataAction = makeAct('sceneCollecting/alarmInfo/query');
        var connectAlarmSceneAction = makeAct('sceneCollecting/alarmInfo/connectAlarmScene');

        var $qr = $('#pc-reuse-query-result');
        var $qb = $('.query-block');
        var $tb = $('#pc-reuse-table');

        var investId = queryParse().investId;//勘验ID
        var columns = [
            {title:'序号',            map:'rowNum',          cls:'cell-xs'},
            {title:'警情编号',        map:'alarmNo',          cls:'mem18'},
            {title:'案件编号',        map:'caseNo',           cls:'mem18'},
            {title:'发案地所辖派出所', map:'alarmNo.ifExist',  cls:'mem12'},
            {title:'案件类别',        map:'caseTypeCn',        cls:'mem10'},
            {title:'接警人',          map:'alarmReceiver',    cls:'mem8'},
            {title:'接警时间',        map:'alarmTime.asCnTime',        cls:'mem8'},
            {title:'发案时间',        map:'crimeTimeBegin.asCnTime',   cls:'mem8'},
            {title:'发案地点',        map:'caseLocation',     cls:'mem16'},
            {title:'简要案情',        map:'caseBrief',        cls:'mem22'},
            {title:'操作',            map:'id.asReuseBtn',    cls:'mem4'}
        ];

        function init() {
            var alarmNo = queryParse().alarmNo || '',//接警编号
                caseNo = queryParse().caseNo || '',//案件编号
                caseLocation = decodeURIComponent(queryParse().caseLocation).asUndefined() || '',//发案地点
                alarmReceiver = decodeURIComponent(queryParse().alarmReceiver).asUndefined() || '';//接收人

            //aqxx-alarm-no aqxx-case-no aqxx-case-location aqxx-alarm-receiver
            $('#aqxx-alarm-no').val(alarmNo);
            $('#aqxx-case-no').val(caseNo);
            $('#aqxx-case-location').val(caseLocation);
            $('#aqxx-alarm-receiver').val(alarmReceiver);
            $('.cm-input-time').datepicker({dateFmt:"yyyy-MM-dd"});
            $('.cm-input-range-time').daterangepicker();
            $('.dict').dict();
            loadListData();
//            saveCondition('.cq-condition', '.al-save-condition');
        }
        //加载列表数据
        function loadListData() {
            var queryObj = getQueryObj();
            $qr.pagingList({
                action:getListDataAction,
                currentPage: $qr.children('.paging').data('currentPage'),
                jsonObj:queryObj,
                callback:loadListDataCb
            });
        }
        //加载列表数据回调
        function loadListDataCb(data) {
            $tb.table({
                data:data,
                cols:columns,
                fixCols:{left:3, right:1},
                allowHTML:true
            });
        }
        //获取查询条件json对象
        function getQueryObj() {
            var queryObj = {};

            $qb.find('input').each(function (i,el) {
                var $el = $(el);
                var name = $el.attr('name');
                queryObj[name] = $el.val().trim();
                if(name == 'crimeTime'){
                    var crimeTimeArr = queryObj.crimeTime.split(',');
//                    queryObj.crimeTimeBegin = crimeTimeArr[0]?crimeTimeArr[0].asCnTime():'';
//                    queryObj.crimeTimeEnd = crimeTimeArr[1]?crimeTimeArr[1].asCnTime():'';
                    queryObj.crimeTimeBegin = crimeTimeArr[0];
                    queryObj.crimeTimeEnd = crimeTimeArr[1];
                }
//                if(name == 'alarmTime'){
//                    queryObj.alarmTime = queryObj.alarmTime?queryObj.alarmTime.asCnTime():'';
//                }

            });
            return queryObj;
        }
        //关联(现场查询)
        function relateWithScene(pcId) {
            $post(connectAlarmSceneAction,{
                "id": pcId,
                "investigationId": investId
            },function() {
                toast('关联成功！').ok();
                $opener.queryForScene();
                $opener.$select();
            });
        }
        //查询
        function queryFn() {
            $qr.children('.paging').data('currentPage',0);
            loadListData();
        }
        //重置
        function resetFn() {
            $qb.find('input:text').val('');
            $qb.find('.dict').children().first().trigger('click');
        }

        //转换操作列
        $filter('asReuseBtn',function (item,i) {
            return $('#pc-reuse-table-opt').html().format({id:this.valueOf()});
        });
        $qb.on('x-query',queryFn).on('x-reset',resetFn);
        //复用
        $tb.on('click','.pc-reuse-link',function () {
            var $this = $(this),
                pcId = '';
            //关联
            if(investId){
                pcId = $this.attr('paramId');
                relateWithScene(pcId);
                //警情复用
            }else{
//                .closest('tr').index()
                var currentData = $tb.data('current-data');
                var data = currentData.length && currentData[$this.closest('tr').index()];
                var timeArr = ['alarmTime','crimeTimeBegin','crimeTimeEnd','dispatchTime'];
                timeArr.forEach(function (el,i) {
                    data[el] = data[el].asDate16();
                });
                log(data);
                $opener.fillData($opener.$('#add-scene-aqxx'),{sceneInvestigationDispatch:data});
                $opener.fillData($opener.$('#add-scene-ckxx'),{sceneHandleInfo:{"caseLon": data.caseLon,"caseLat": data.caseLat}});
                $opener.$select();
            }
        });

        init();
    });
}