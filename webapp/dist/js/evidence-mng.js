/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-物证管理模块
 */

/*提取物品查询列表action*/
var takeGoodsFaqhAct = makeAct('sys/sysOrganization/dict_unit'),//查询发案区划字典
    takeGoodsListAct = makeAct('sceneQuery/sceneCollectedGoods/query');//查询列表

/*提取物品查询模块*/
function takeGoodsFn(){
    importing('dict', 'saved-condition.js', function(scope){

        var $qr = $('#take-goods-r-q');
        var $qb = $('.query-block');
        var $tb = $('#take-goods-tb');

        $('.dict').dict();
        $tb.table({
            cols:[]
        });

        //定时器
        function timing(){
            var timer = setInterval(function(){
                if($('.unready').length == 0){
                    clearInterval(timer);
                    $('[dict-id="query-clzt"]').find('input[value="100000"]').click();
                    queryGoodsList();
                }
            }, 20);
        }
        //初始化 发案区划 自定义字典
        function getFaqhDict(){
            $get(takeGoodsFaqhAct, {}, function(res){
                $('#query-dict-faqh').dict(res.data);
            }, false, false);
        }
        //查询结果列表
        function queryGoodsList(){
            var kysj = $('#query-investigationDate').val(),
                fasj = $('#query-crimeTime').val();
            $qr.pagingList({
                action: takeGoodsListAct,
                currentPage: $qr.children('.paging').data('currentPage'),
                jsonObj:{
                    storageStatus:$('#query-clzt').val(),
                    caseType:$('#query-ajlb').val(),
                    caseRegionalism:$('#query-faqh').val(),
                    investigationPlace:$('#query-kydd').val(),
                    investigationDateFrom:kysj ? kysj.split(',')[0] : null,
                    investigationDateTo:kysj ? kysj.split(',')[1] : null,
                    crimeTimeBegin:fasj ? fasj.split(',')[0] : null,
                    crimeTimeEnd:fasj ? fasj.split(',')[1] : null,
                    investigationNo:$('#query-kybh').val()
                },
                callback: function(data){
                    var flatData = [];
                    data.each(function(item, i){
                        item.goodsList.each(function(o, j){
                            var obj = $.extend({}, item, o);
                            if(i % 2 == 0){obj.bg = '_bg';}
                            delete obj['goodsList'];
                            if(j == 0){
                                flatData.push(obj);
                            }else{
                                flatData.push($.extend(obj, {rowspan:0}));
                            }
                        });
                    });
                    $tb.children('tbody').template(flatData);
                    $tb.customCol('cs');
                }
            });
        }
        //查询区域重置
        function takeGoodsReset(){
            //清空查询内容
            $qb.find(':text').val('');//所有输入框清空
            $qb.find('[data-chval]').val('').attr('data-chval', '不限');//字典隐藏域清空
            $qb.find(':radio').parent('div').find('input:first').prop('checked', true);//单选字典默认选中第一个
        }
        function judgeOpts($this, str){
            var investigationId = $this.attr('investigationId');
            var $input = $('#take-goods-tb>tbody>tr>td').find('input[name="{0}"]:checked'.format(investigationId));
            var allArr = [], handleArr = [], tipSerialNo = [];
            $input.each(function(i, item){
                var dict = $(item).attr('storageStatusDict');
                var obj = {collectedGoodsId:$(item).attr('collectedGoodsId'), serialNo:$(item).attr('serialNo')};
                if(dict){
                    allArr.push(obj);
                    //待处理 已送检 已出库 可以进行入库、归还、丢弃操作
                    if(dict == '100000' || dict == '200000' || dict == '600000'){
                        handleArr.push(obj);
                    }else{
                        tipSerialNo.push($(item).attr('serialNo'));
                    }
                }
            });

            if(allArr.length == 0){
                toast(' 请先选择需要{0}的提取物品'.format(str)).width(280).warn();
            }else if(allArr.length == handleArr.length){
                //TODO
                toast(' 调用物证系统的{0}申请页面'.format(str)).warn();
            }else{
                $confirm('提取物品【{0}】不能进行{1}操作，点击确定继续对其他提取物品进行{1}操作'.format(tipSerialNo.join(), str), function(bol){
                    if(bol){
                        //TODO
                        toast(' 调用物证系统的{0}申请页面'.format(str)).warn();
                    }
                });
            }
        }

        getFaqhDict(); //初始化 发案区划 自定义字典
        timing(); //定时器

        //查询区域注册点击事件
        $('.query-block-tabs').on('click', 'u', function(){
            $(this).addClass('active').siblings('u').removeClass('active');
        }).on('x-query', function(){
            $qr.children('.paging').data('currentPage', 0);
            queryGoodsList();
        }).on('x-reset', function(){
            //重置
            takeGoodsReset();
        });

        //结果列表点击事件
        $qr.on('click', '.check-all', function(){
            var name = $(this).attr('name');
            $('#take-goods-tb>tbody').find('input[name="{0}"]'.format(name)).prop('checked', $(this).prop('checked'));
        }).on('click', '.into-sj', function(){
            toast('待设计...').warn();
        }).on('click', '.into-rk', function(){
            judgeOpts($(this), '入库');
        }).on('click', '.into-gh', function(){
            judgeOpts($(this), '归还');
        }).on('click', '.into-dq', function(){
            judgeOpts($(this), '丢弃');
        }).on('click', '.cm-send-btn', function(){
            toast('待设计...').warn();
        });
    });
}