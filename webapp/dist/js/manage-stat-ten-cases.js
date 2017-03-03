/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-管理统计模块
 */
setSubPrj('xk');

/*十类案件统计action*/
var tenCasesQueryAct = makeAct('statistics/tenSceneInputAmount/query'), //统计
    tenCasesExportAct = makeAct('statistics/tenSceneInputAmount/export'), //导出
    tenCasesFaqhAct = makeAct('sys/sysOrganization/dict_unit'); //查询发案区划字典

/*十类案件统计模块*/
function tenCaseFn(){
    importing('dict', 'saved-condition.js', function(scope){

        var columns = [
            {title:'序号',                 map:'$rownum',                  cls:'mem4'},
            {title:'上级单位',             map:'parentUnitName',           cls:'mem10'},
            {title:'统计单位',             map:'unitName',                 cls:'mem10'},
            {title:'杀人',                 map:'killCount.toString',       cls:'mem4'},
            {title:'伤害',                 map:'injureCount.toString',     cls:'mem4'},
            {title:'强奸',                 map:'rapeCount.toString',       cls:'mem4'},
            {title:'绑架',                 map:'kidnapCount.toString',     cls:'mem4'},
            {title:'抢劫',                 map:'robCount.toString',        cls:'mem4'},
            {title:'放火',                 map:'fireCount.toString',       cls:'mem4'},
            {title:'爆炸',                 map:'bombCount.toString',       cls:'mem4'},
            {title:'劫持',                 map:'hijackCount.toString',     cls:'mem4'},
            {title:'投毒',                 map:'poisoningCount.toString',  cls:'mem4'},
            {title:'入室盗窃',             map:'stealCount.toString',      cls:'mem4'},
            {title:'其他命案',             map:'otherCount.toString',      cls:'mem4'},
            {title:'破坏(危害)公共安全', map:'destroyCount.toString',    cls:'mem8'}
        ];

        var $qb = $('.query-block');

        $('.dict').dict();

        //scope绑定
        scope.bind('listData', '#stat-ten-cases-tb');

        //table初始化
        $('#stat-ten-cases-tb').table({
            cols:columns
        });

        //初始化 发案区划 自定义字典
        function getFaqhDict(){
            $get(tenCasesFaqhAct, {}, function(res){
                $('#query-dict-tjdw').dict(res.data);
            }, false, false);
        }

        //定时器
        function timing(){
            var timer = setInterval(function(){
                if($('.unready').length == 0){
                    clearInterval(timer);
                    saveCondition(true, '.cq-condition', '.al-save-condition', '3', queryForTenCasesStat);
                    queryForTenCasesStat();
                }
            }, 20);
        }

        //结果列表查询
        function queryForTenCasesStat(saveQueryObj){
            if(!saveQueryObj) {
                saveQueryObj = {queryStr: {}};
            }else{
                saveQueryObj = saveQueryObj.queryStr;
            }
            var tjsj = $('#query-filterDate').val();
            $post(tenCasesQueryAct, $.extend({
                dateType:$('[name="dateType"]').val(),
                filterDateFrom: tjsj ? tjsj.split(',')[0] : null,
                filterDateTo: tjsj ? tjsj.split(',')[1] : null,
                unit:$('#query-tjdw').val(),
                isSameMonInvAndInp:$('[name="isSameMonInvAndInp"]').val(),
                isIncludeLowerLevel:$('[name="isIncludeLowerLevel"]').val()
            }, saveQueryObj.queryStr), function(res){
                var data = res.data;
                var hj = data.TenSceneInputTotal;
                var hjObj = {};
                hjObj.parentUnitName = '合计';
                hjObj.unitName = '--';
                hjObj.killCount = hj.killTotal;
                hjObj.injureCount = hj.injureTotal;
                hjObj.rapeCount = hj.rapeTotal;
                hjObj.kidnapCount = hj.kidnapTotal;
                hjObj.robCount = hj.robTotal;
                hjObj.fireCount = hj.fireTotal;
                hjObj.bombCount = hj.bombTotal;
                hjObj.hijackCount = hj.hijackTotal;
                hjObj.stealCount = hj.stealTotal;
                hjObj.destroyCount = hj.destroyTotal;
                hjObj.poisoningCount = hj.poisoningTotal;
                hjObj.otherCount = hj.otherTotal;
                data.TenSceneInputAmount.push(hjObj);

                scope.set('listData', data.TenSceneInputAmount);
            });
        }

        timing();
        getFaqhDict();

        //查询区域点击事件
        $('.query-block-tabs').on('click', 'u', function(){
            $(this).addClass('active').siblings('u').removeClass('active');
        }).on('x-query', function(){
            queryForTenCasesStat();
        }).on('x-reset', function(){
            //重置
            $qb.find(':text').val('');//所有输入框清空
            $qb.find('[data-chval]').val('').attr('data-chval', '不限');//字典隐藏域清空
            $('.x-select').trigger('x-default');//inline-select清空
            $qb.find(':radio').parent('div').find('input:first').prop('checked', true);//单选字典默认选中第一个
            //已选条件修改
            saveCondition(false, '.cq-condition', '.al-save-condition', '3');
        });

        //结果列表点击事件
        $('#stat-ten-cases-q-r').on('click', '.cm-excel-btn', function(){
            var tjsj = $('#query-filterDate').val();
            $post(tenCasesExportAct, {
                dateType:$('#query-sjlx').children('.active').attr('val'),
                filterDateFrom: tjsj ? tjsj.split(',')[0] : null,
                filterDateTo: tjsj ? tjsj.split(',')[1] : null,
                unit:$('#query-tjdw').val(),
                isSameMonInvAndInp:$('#query-xj').children('.active').attr('val'),
                isIncludeLowerLevel:$('#query-dylr').children('.active').attr('val')
            }, function(res){
                location.href = top.sysParams.fileServerPath+res.data.filePath+'?attname=十类案件录入数统计.xls';
            });
        });
    });
}