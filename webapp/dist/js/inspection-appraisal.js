/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-检验鉴定模块
 */
//痕迹物证查询列表
function traceEvidenceQuery() {
    importing('dict',function (scope) {
        var listAct = makeAct('sceneQuery/sceneMaterialEvidence/query');

        var $qr = $('#teq-query-result');
        var $qb = $('.query-block');
        var $tb = $('#trace-evidence-table');
        var $tbb= $tb.children('tbody');

        //重置
        var resetTeq = function () {
            $qb.find('input:not(:checkbox,:radio)').val('');
            $qb.find('[dict-type]').dict();
        };
        //查询
        var queryTeq = function () {
            $qr.children('.paging').data('currentPage',0);
            loadListData();
        };

        function init() {
            var $inspectStatus = $('#inspect-status');
            $inspectStatus.dict(function () {
                $inspectStatus.dictSelect('0');
                loadListData();
            });
            $('.dict').dict();
//            saveCondition('.cq-condition', '.al-save-condition');
        }
        //加载列表数据
        function loadListData() {
            var queryObj = getQueryObj();
            $qr.pagingList({
                action:listAct,
                currentPage: $qr.children('.paging').data('currentPage'),
                jsonObj:queryObj,
                callback:loadListDataCb
            });
        }
        //加载列表数据回调
        function loadListDataCb(data) {
            //$tb.children('tbody').template(data);
            var jointData = [];
            data.each(function (item,j) {
                item.evidenceList.each(function (childItem,i) {
                    var itemObj = $.extend({},item,childItem);
                    j%2==0 && (itemObj.bg = 'no-bg');
                    i==0?jointData.push(itemObj):jointData.push($.extend(itemObj,{rowspan:''}))
                });
            });
            scope.set('listData',jointData);

//
//
//            data[i].name='hehe'
//
//            scope.update('listData',data=> data[i].type='hehe');
//
//
//
//            data.forEach(function(item){
//                item.rownum=''
//            });
//
//            scope.update('listData',function(item){
//                item.rownum=''
//            },true);

//            setTimeout(function(){
//                scope.update('listData',function(data){  data.name=234234 });
//            },900);
//
//            setTimeout(function(){
//                scope.update('listData',function(item){  item.rowNum='hehe' },true);
//            },1900);

        }
        //获取查询条件json对象
        function getQueryObj() {
            var queryObj = {};

            $qb.find('input').each(function (i,el) {
                var $el = $(el);
                var name = $el.attr('name') || $el.attr('data-name') ;
                var tempArr = [];
                queryObj[name] = $el.val().trim();
                if(name == 'crimeTime'){
                    tempArr = queryObj[name].split(',');
                    queryObj[name+'Begin'] = tempArr[0];
                    queryObj[name+'End'] = tempArr[1];
                }
                if(name=='investigationDate'){
                    tempArr = queryObj[name].split(',');
                    queryObj[name+'From'] = tempArr[0];
                    queryObj[name+'To'] = tempArr[1];
                }
//                if(name == 'alarmTime'){
//                    queryObj.alarmTime = queryObj.alarmTime?queryObj.alarmTime.asCnTime():'';
//                }

            });
            return queryObj;
        }

        $qb.on('x-query',queryTeq).on('x-reset',resetTeq);


        //送检
        $tb.on('click','.teq-inspect-link',function () {
            var $this = $(this);
            //TODO:调用实验室接口
            $alert('该功能正在开发中……');
        });

        scope.bind('listData',$tbb);

        init();
    });
}
