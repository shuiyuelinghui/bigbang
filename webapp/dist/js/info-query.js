/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-信息查询模块
 */
//全文检索
setSubPrj('xk');
function infoFulltextSearch() {

    importing('popover','saved-condition.js','previewPro',function () {
        /*----------------------------变量声明------------------------------*/
        var addrAct = makeAct('sceneQuery/queryFullText/queryHead');
        var cityAct = makeAct('sceneQuery/queryFullText/queryHeadNum');
        var listAct = makeAct('sceneQuery/queryFullText/query');
        var picInfoAct = makeAct('sceneQuery/queryFullText/queryPhotoView');

        var $body = $(document.body);
        var $searchBox = $('#fts-input-box');
        var $queryResContent = $('#fts-qr-content');
        var $picUl = $('#fts-pic-ul');
        var $nationAddr = $('#nation-addr');
        var $qb = $('.query-block');

        var cityDestroy;
        var nationAddr = localData.get('ifts-nation-addr');
        var onlyNum = false;

        /*----------------------------方法定义------------------------------*/
        $filter('hump2dash',function () {
            return this.toString().replace(/[A-Z]/g,hump2dashRep);
        });
        function init() {
            var $nationAddrStpHid = $nationAddr.children('span.xtp-hide');
            //获取全国地址
            nationAddr ? $nationAddrStpHid.template(nationAddr) : $post(addrAct,{},function (res) {
                nationAddr = res.data;
                localData.set('ifts-nation-addr',nationAddr);
                $nationAddrStpHid.template(nationAddr);
            },false);
        }
        //加载查询结果
        function loadSearchResult(data) {
            $queryResContent.template(data,true);
        }
        //加载分组条件
//        function loadQueryData(exRes) {
//            var options = $('.query-block-row').find('.option');
//            var queryCons = exRes.myGroupFacetField;
////            var $investDate = $('#invest-date');
//            var $options = options.filter(function (i) {return i>0;});
//            options.each(function (i,ele) {
//                var $ele = $(ele);
//                var name = $ele.attr('data-name');
//                var filterData = [];
//
//                if(name){
//                    filterData = queryCons.where('o=>o.name.toLowerCase()=="{0}"'.format(name.hump2dash().toLowerCase()));
//                    filterData.length && $ele.html($compile('<u>{facet} <em>( {values.toString} )</em> </u>',filterData[0].list));
//                }
//            });
//
//            $options.children('.query-block-init').length || $options.prepend('<u class="active query-block-init">不限</u>');
//        }
        //加载分组条件
        function loadQueryData(exRes) {
            var options = $('.query-block-row').find('.option');
            var queryCons = exRes.myGroupFacetField;
//            var $investDate = $('#invest-date');
            var $options = options.filter(function (i) {return i>0;});
            options.each(function (i,ele) {
                var $ele = $(ele);
                var name = $ele.attr('data-name');
                var filterData = [];

                if(name){
                    //为Sting增加了判断大小写忽略相等的方法,lowEqual这个方法名可以理解记忆为小写相等或低严格级别的相等
                    filterData = queryCons.where( 'o=> o.name.lowEqual(this)', name.hump2dash() );
                    if(filterData.length && !onlyNum){
                        $ele.html($compile('<u>{facet} <em>( {values.toString} )</em> </u>',filterData[0].list));
                    }
                    if(filterData.length && onlyNum){
                        $ele.children('u').each(function () {
                            var facet = $(this).html().match(/\S+/)[0];
                            var num = filterData[0].list.where('o=> o.facet==this',facet);//数组系列方法中,可以用this指向比较参数.
                            num.length > 0 && $(this).children('em').html('( ' + num[0].values + ' )');
                        });
                    }
                }
            });

            !onlyNum && ($options.children('.query-block-init').length || $options.prepend('<u class="active query-block-init">不限</u>'));
        }
        //加载分组条件的数量
//        function loadQueryNum(exRes) {
//            var options = $('.query-block-row').find('.option');
//            var queryCons = exRes.myGroupFacetField;
////            var $investDate = $('#invest-date');
//            var $options = options.filter(function (i) {return i>0;});
//            options.each(function (i,ele) {
//                var $ele = $(ele);
//                var name = $ele.attr('data-name');
//                var filterData = [];
//
//                if(name){
//                    filterData = queryCons.where('o=>o.name.toLowerCase()=="{0}"'.format(name.hump2dash().toLowerCase()));
//                    if(filterData.length) {
////                        $ele.html($compile('<u>{facet} <em>( {values.toString} )</em> </u>',filterData[0].list));
//                        $ele.children('u').each(function () {
//                            var facet = $(this).html().match(/\S+/)[0];
//                            var num = filterData[0].list.where('o=>o.facet == "{0}"'.format(facet));
//                            num.length > 0 && $(this).children('em').html('( ' + num[0].values + ' )');
//                        });
//                    }
//                }
//            });
//        }
        //注册一次保存筛选条件方法
        saveCondition(true, '.ifs-cq-condition', '.al-save-condition', '4',queryClick);
        $('.cm-selected-condition .active-search-list').before('<ul class="active-city-list"></ul>');

        //查询
        function queryClick(queryObj, resetQc) {
//            $('#ifs-query-content')
            var queryContent = $searchBox.val();//查询内容
            var $nationQueryActive = $nationAddr.find('.active');
            var $cityActive = $nationAddr.find('.city-active');
            var solrAddr = $nationQueryActive.data('addr') || '';
            var isOtherProv = $nationQueryActive.text()!='本地' ? '2' : '1';//'1':本地 '2':跨省
            var checkCode = $nationQueryActive.data('child-options') ? $nationQueryActive.data('child-options').select('o=>o.code').join(',') :'';//$cityActive.length ? $cityActive.children('u').data('child-options').select('o=>o.code').join(',') : '';
            var $facetActive = $('.query-block-row:gt(0)').find('.active');
            var facet = '';
            var jsonObj;
//            var useExtraCb = (typeof queryObj == 'boolean') ? queryObj : true;

            $facetActive.each(function (i,ele) {
                var $ele = $(ele);
                $ele.hasClass('query-block-init') || $ele.hasClass('query-block-init1') || (facet += '&{0}:{1}'.format($ele.parent().data('name').hump2dash().toUpperCase(),$ele.html().replace(/<.*?\/\w+>/g,'').trim()));
            });

            if(queryObj) {
                var facet1 = '';
                var queryContent1;
                var isOtherProv1;
                var solrAddr1 = queryObj.queryStr.nationAddr;
                var checkCode1 = '';
                queryObj.config.each(function (item) {
                    var title = item.title || '';
                    var content = item.content || '';
                    if(title.indexOf('全文检索') != -1) {
                        queryContent1 = content;
                    }
                    if(title.indexOf('全国地址') != -1) {
                        content == '本地' ? (isOtherProv1=1):(isOtherProv1=2);
                    }
                    if(title.indexOf('勘验时间') != -1) {
                        facet1 += '&INVESTIGATION_DATE:'+content;
                    }
                    if(title.indexOf('案件类别') != -1) {
                        facet1 += '&CASE_TYPE_FACET:'+content;
                    }
                    if(title.indexOf('发案区划') != -1) {
                        facet1 += '&CASE_REGIONALISM_FACET:'+content;
                    }
                    if(title.indexOf('录入单位') != -1) {
                        facet1 += '&ORGAN_NAME_FACET:'+content;
                    }
                });
                jsonObj = {
                    "facetQuery":facet1,
                    "facetQueryItems":"",
                    "queryItem":queryContent1,
                    "isOtherProvinces":isOtherProv1,
                    "solrCheckAdress":solrAddr1,
                    "checkCode":checkCode1
                };
            } else {
                jsonObj = {
                    "facetQuery":facet,
                    "facetQueryItems":"",
                    "queryItem":queryContent,
                    "isOtherProvinces":isOtherProv,
                    "solrCheckAdress":solrAddr,
                    "checkCode":checkCode
                };
            }

            onlyNum = !!resetQc ? false : true;

            $('#fts-query-result').pagingList({
                action:listAct,
                jsonObj: jsonObj,
                callback:loadSearchResult,
                extraCb: loadQueryData//useExtraCb && loadQueryData//!!resetQc ? loadQueryData : loadQueryNum
            });
            $('.fts-title').slideUp();
            $('.result-page-content').removeClass('hider');
        }
        //点击查询条件选项执行函数
        function queryConditionClick() {
            var $this = $(this);
            if($this.hasClass('fts-province-disabled') && $this.text() != '本地'){
                return false;
            }
            if($this.parents('#nation-addr').length != 0) {
                $('.cm-selected-condition .active-city-list').html('');
                $this.closest('.option').find('u').data('child-options', []);
            }

            if($this.text() == '本地'){
                $this.closest('.option').find('u').not(this).removeClass('active');
                $this.addClass('active');
//                return false;
            }else {
                $this.closest('.option').find('u').not(this).removeClass('active');
                $this.addClass('active').parent('.fts-province-wrap').toggleClass('province-active')//.end().closet('.option').find('u').not(this).removeClass('active');
//                !$this.hasClass('active') && $this.closest('.option').find('.query-block-init').addClass('active');
            }
            queryClick(false);
        }
        //点击地市执行函数
        function cityChoose() {
            var $this = $(this);
            var $cityActive = $nationAddr.find('.city-active');
            //city-amount
            $post(cityAct, {
                "queryItem": $searchBox.val(),
                "solrCheckAdress": $nationAddr.find('.active').data('addr'),
                "checkCode": $cityActive.length ? $cityActive.children('u').data('child-options').select('o=>o.code').join(',') : ''
            }, function (res) {
                $this.children('.city-amount').html('({0})'.format(res.data));
            });
            $this.toggleClass('active').children('u').toggleClass('hider');
            $this.is(':first-child') && $this.siblings().removeClass('active').children('u').addClass('hider');
            $this.is(':not(:first-child)') && $this.siblings(':first-child').removeClass('active').children().addClass('hider');
        }
        //显示地市弹窗
        function showCityPopover($this,cityArr) {
            var btnWrap = '<p class="fts-city-btn-wrap"><b class="cm-reset-btn fts-city-cancel-btn"></b><b class="cm-query-btn fts-city-confirm-btn"></b></p>';
            var largeContent = '<div class="fts-city-wrap">{0}<em>(可多选)</em>{1}</div>'.format($compile('<a data-code="{key}">{value}<u class="city-amount hider"></u></a>',cityArr),btnWrap),
                largeSettings = {
                    trigger:'',
                    multi:true,
                    closeable:false,
                    padding:true,
                    content:largeContent,
                    width:600
                };

            removePopover();
            $this.webuiPopover('destroy').webuiPopover(largeSettings);
        }
        //鼠标移入省份执行函数
        function provinceEnter() {
//            log('enter')
            var $this = $(this);
            //没有solr地址时不展示弹窗
            if($this.hasClass('fts-province-disabled')){
                return false;
            }

            var checkCode = $this.attr('data-code');
//            var param = {
//                "queryItem":$searchBox.val(),
//                "solrCheckAdress":$this.attr('data-addr'),
//                "checkCode":checkCode
//            };
//            var cityArr = localData.get('fts-text-search-'+checkCode);
            var cityArr = nationAddr.where('o=>o.unitCode=="{0}"'.format(checkCode))[0].cityList;

            //显示地市弹窗,地市数据没缓存时异步获取
            showCityPopover($this,cityArr);

            //选中的地市加上active
            if($this.parent().hasClass('city-active')){
                $this.data('child-options').each(function (item) {
                    $('.fts-city-wrap').children('a').each(function (i,ele) {
                        var $ele = $(ele);
                        $ele.data('code')==item.code && $ele.addClass('active').children('u').html(item.amount).removeClass('hider');
                    });
                });
            }

            //点击地市弹窗确定按钮
            $('.fts-city-confirm-btn').on('click',function () {
                var $activeCity = $('.fts-city-wrap>a.active');
                if(!$activeCity.length){
                    toast('请选择地市!').warn();
                    return false;
                }
                var activeCites = [];
                var citesCode = [];

                $activeCity.each(function (i,ele) {
                    activeCites.push({"code":$(ele).data('code'),"amount":$(ele).children().html(),"value":$(ele).html().replace(/<.*?\/.*?>/g,'').trim()});
                    citesCode.push($(ele).data('code'));
                });

                $this.closest('.option').find('u').removeClass('active');
                //绑定地市数据到省份
                $this.data('child-options',activeCites).attr('val',activeCites.select('o=>o.code').join(',')).addClass('active')
                    .parent().addClass('city-active').removeClass('province-active')
                    .siblings().removeClass('city-active province-active');

                //地级市的已选择条件添加
                $('.active-city-list').html($compile('#fts-city-li', activeCites));
                $('.active-search-list li').eq(0).hide().find('span').attr('val', citesCode.join(','));
                queryClick();
                if($activeCity.text().indexOf('全部') != -1) {
                    $this.trigger('click');
                }
                removePopover();
            });
            //查询条件->全国地址 选择地市
            $body.off('click', '.fts-city-wrap>a');
            $body.on('click','.fts-city-wrap>a',function () {
                var $that = $(this);
                var $cityActive = $nationAddr.find('.city-active');
                //city-amount
                $post(cityAct, {
                    "queryItem": $searchBox.val(),
                    "solrCheckAdress": $this.data('addr') || '',
                    "checkCode": $that.data('code') || ''
                }, function (res) {
                    $that.children('.city-amount').html('({0})'.format(res.data));
                });
                $that.toggleClass('active').children('u').toggleClass('hider');
                $that.is(':first-child') && $that.siblings().removeClass('active').children('u').addClass('hider');
                $that.is(':not(:first-child)') && $that.siblings(':first-child').removeClass('active').children().addClass('hider');
                if($that.parent().children('.active').length == 0) {
                    $that.parent().find(':first').addClass('active');
                }
            });
            //点击地市弹窗取消按钮
            $('.fts-city-cancel-btn').on('click',removePopover);
        }
        //鼠标离开省份执行函数
        function provinceLeave() {
//            log('leave')
            var $this = $(this);
            cityDestroy = setTimeout(function () {
                $this.webuiPopover('destroy');
            },300);
        }
        function clearCityTimer() {
//            log('clear timer')
            clearTimeout(cityDestroy);
        }
        function removePopover() {
            $('.webui-popover').remove();
        }
        //查看现场
        function checkScene() {
            var $this = $(this);
            $this.hasClass('fts-qr-title-link') ? $this : $this.prev().prev();
            var investId = $this.attr('investId');
            var caseType = $this.attr('caseType');
            var caseNature = $this.attr('caseNature');
            var investigationNo = $this.attr('investNo');
            var solrUrl = $('.fts-province-wrap.province-active,.fts-province-wrap.city-active').children().attr('data-url') || '';
            $append(getViewPath('scene-add.html?id={0}&searchflag=1&solrUrl={1}&&investigationNo={2}'.format(investId,solrUrl,investigationNo),'./view/'),investigationNo);
        }
        function hump2dashRep(match) {
            return '_'+match.toLowerCase();
        }

        /*----------------------------事件注册------------------------------*/
        //搜索框 焦点离开的时候吧数据更新到查询条件的隐藏域中
        $('#fts-input-box').on('blur', function () {
            var val = $(this).val();
            $('#queryItem').val(val);
        });
        //搜索框 点击查询按钮
        $('.fts-query-btn').on('click',function (e) {
            //判断查询点击是不是第一次点击
            if(!$(this).attr('data-notfirst')) {    //第一次点击
                queryClick(null,true);
                $(this).attr('data-notfirst', 1)
            } else {    //第二次或者第二次以上
                queryClick();
            }
        });
        //查询条件->全国地址 鼠标移入省份
        $nationAddr.on('mouseenter','.fts-province',provinceEnter)
            .on('mouseleave','.fts-province',provinceLeave);
        //查询条件->全国地址 鼠标移入地市选择弹窗
        $body.on('mouseenter','.webui-popover,.webui-popover-content',clearCityTimer)
            .on('mouseleave','.webui-popover-content',removePopover);
        //查询条件 点击查询条件选项
        $('.query-block').find('.option').on('click','u',queryConditionClick);

        //查询结果 查看现场
        $queryResContent.on('click','.fts-qr-title-link',checkScene).on('click','.fts-qr-text-link',checkScene)
        //查询结果 查看物证
            .on('click','.fts-qr-text-link-wrap>a',function () {
                var $this = $(this);
                var investId = $this.parent().attr('investId');
                var url = $('#nation-addr').find('u.active').data('url') + '/xcky3/api/sceneQuery/queryFullText/queryPhotoView';    //不把这个放到最前面是因为这边需要不同查询做不同的url请求
                $post(url,{
                    "investigationId":investId,
                    "type":$this.attr('type') || '',
                    "category":$this.attr('category') || ''
                },function (res) {
                    var data = res.data;
                    var thisText = $this.text();
                    var isScenePic = thisText.indexOf('现场')>-1 ? true : false;
                    var conHtml = isScenePic ? $('#fts-scene-pic-tp').text().trim() : $('#fts-evidence-tp').text().trim();

                    $picUl.template(data.list,function (item) {
                        item.fileServerAddr = data.fileServerAddr;
                    });
                    $('.fts-img-link').each(function (i,ele) {
                        var $ele = $(ele);
                        var dataArr = $picUl.data('current-data').where('o=>o.id=="{0}"'.format($ele.data('id')));
                        var title = $ele.children('img').attr('alt');
//                      var pictureTypeCn = $ele.data('pictype');
//                      var feature = $ele.data('desc');
                        //查看物证图片
                        $ele.children('img').previewPro(title,$compile(conHtml,dataArr));
                    });
                    $('.xcky-num').children('a').text($this.parent().prevAll('.fts-qr-text-link').text());
                });

                $open('#fts-pic-ul',{width:900});
            });
        //查询结果 查看物证 点击K号查看现场
        $picUl.on('click','.xcky-num>a',function(){checkScene.apply($('.fts-qr-title-link'))});
        //查询结果 查看物证->查看图片
//        $picUl.on('click','.fts-img-link',function () {
//            var $this = $(this);
//            var title = $this.children('img').attr('alt');
//
//        });
        //地级市已选条件的删除
        $('.ifs-cq-condition').on('click', '.cm-selected-condition .active-city-list em', function () {
            var $this = $(this);
            var $address = $('#nation-addr').find('u.active')
            var cityId = $this.prevAll('u').attr('data-cityid');
            var oldSlted = $address.data('child-options');
            var newSlted = oldSlted && oldSlted.where('o=>o.code != {0}'.format(cityId));
            //删除已选条件中的对应地级市code
            var $span = $('.cm-selected-condition .active-search-list li').eq(0).find('span');
            var val = [];
            $this.closest('ul').children().not($this.parent()).each(function () {
                var $that = $(this);
                val.push($that.children('u').data('cityid'));
            });
            $span.attr('val', val.join(','));
            $address.attr('val', val.join(','));
//            var cites = $span.attr('val') || '';
//            var citesArr = cites.split(',');
//            citesArr.splice(citesArr.indexOf(cityId), 1);
//            $span.attr('val', citesArr.join(','));
            $address.data('child-options', newSlted);
            if(newSlted.length == 0) {  //如果地级市一个都未选择，则选中省
                $address.removeClass('active').trigger('click');
            }
            $this.parent('li').remove();
        });
        //普通条件的删除 额外效果（删除不是第一项的时候，则默认选中本地或者不限）
        $('.ifs-cq-condition').on('click', '.cm-selected-condition .active-search-list em', function () {
            var $this = $(this);
            var type = $this.prevAll('u').text();
            $qb.find('.query-block-row').not(':first').each(function () {
                var $that = $(this);
                if($that.find('.qc-label-xs').text() == type) {
                    $that.find('.option u:first').trigger('click');
                }
            });
        });


        /*----------------------------方法调用------------------------------*/
        init();
    });
}

//简单查询
function infoSimpleQuery() {

    importing('daterangepicker', 'dict', 'jui', 'autocomplete','previewPro', function (scope) {

        //defined vars
        var usualAct = makeAct('sceneCollecting/queryHistory/query');   //查询 常用查询act
        var kyryAct = makeAct('sys/sysUser/queryTreeUser');     //勘验人员act
        var unitAct = makeAct('sys/sysOrganization/dict_unit');     //发案区划act
        var selectAct = makeAct('/sys/sysDict/single/XCHJWZLBDM');  //查询结果展现方式选择框act
        var searchAct = makeAct('sceneQuery/sceneSimpleQuery/query');   //查询act
        var saveUsualAct = makeAct('sceneCollecting/queryHistory/add'); //保存常用项act
        var delUsualAct = makeAct('sceneCollecting/queryHistory/del');  //删除常用项act
        var exportAct = makeAct('sceneQuery/sceneSimpleQuery/export');  //导出act

        var $qb=$('.query-block').bind2(scope,'queryData');
        var $qr=$('.query-result');
        var $tb=$('#res-table').bind2(scope,'listData');

        var usualSearchArr = [];
        var kyryArr = [];
        var queryCache; //查询的上一次缓存
        var exportSlt = [];
        var exportNum = 100;    //导出条数
        var fileServerPath = top.sysParams.fileServerPath;  //文件访问地址
        var columns = [
            {title:'序号',map:'rowNum',cls:'mem6'},
            {title:'勘验号',map:'investigationNo',cls:'mem12'},
            {title:'案件关联',map:'caseNo.querySceneIfExist',cls:'mem6 pr over-v'},
            {title:'警情关联',map:'alarmNo.querySceneIfExist',cls:'mem6 pr over-v'},
            {title:'案件类别',map:'caseTypeCn',cls:'mem8'},
            {title:'勘验时间', map:'investigationDateFrom',cls:'mem8'},
            {title:'勘验地点', map:'investigationPlace',cls:'mem6'},
            {title:'勘验人', map:'investigatorName',cls:'mem8'},
            {title:'发案区划', map:'caseRegionalismCn',cls:'mem14'},
            {title:'现场图',map:'scenePhotoAmount',cls:'mem8'},
            {title:'现场照片',map:'scenePictureAmount',cls:'mem8'},
            {title:'痕迹物证', map:'evidenceAmount',cls:'mem8'},
            {title:'视频', map:'videoEvidenceAmount',cls:'mem8'},
            {title:'提取物品', map:'collectedGoodsAmount',cls:'mem8'},

            {title:'案件性质',map:'caseNatureCn',cls:'mem6',customInit:false},
            {title:'勘验单位',map:'organName',cls:'mem6',customInit:false},
            {title:'勘验指挥人',map:'commandName',cls:'mem6',customInit:false},
            {title:'发案地点',map:'caseLocation',cls:'mem6',customInit:false},
            {title:'发案时间',map:'crimeTimeBegin',cls:'mem6',customInit:false},
            {title:'见证人',map:'witnessName',cls:'mem6',customInit:false},
            {title:'保护人',map:'protector',cls:'mem6',customInit:false},
            {title:'现场保护时间',map:'protectionDate',cls:'mem6',customInit:false},
            {title:'保护措施',map:'protectionMeasureCn',cls:'mem6',customInit:false},
            {title:'损失物品总价值',map:'lostTotalValue',cls:'mem6',customInit:false},
            {title:'受伤人数',map:'woundedAmount',cls:'mem6',customInit:false},
            {title:'死亡人数',map:'deadAmount',cls:'mem6',customInit:false},
            {title:'选择对象',map:'chooseObject',cls:'mem6',customInit:false},
            {title:'选择处所',map:'choosePlace',cls:'mem6',customInit:false},
            {title:'作案进出口',map:'crimeInOut',cls:'mem6',customInit:false},
            {title:'作案时机',map:'crimeTime',cls:'mem6',customInit:false},
            {title:'作案手段',map:'crimeType',cls:'mem6',customInit:false},
            {title:'侵入方式',map:'invasionType',cls:'mem6',customInit:false},
            {title:'作案过程',map:'commissionDesc',cls:'mem6',customInit:false},
            {title:'作案人特点',map:'criminalPoints',cls:'mem6',customInit:false},
            {title:'作案工具',map:'crimeTools',cls:'mem6',customInit:false},
            {title:'提交时间',map:'lastSubmitDatetime',cls:'mem6',customInit:false}
        ];



        //过滤器定义 判断是否存在案件和警情编号
        $filter('querySceneIfExist', function(){
            var val = this.valueOf();
            return val ? $compile('#q-r-no-detail',{value: val}) : '--';
        });
        $filter('getFullPath', function () {
            return fileServerPath+'/'+this.valueOf();
        });

        //查询与重置方法
        function queryFn(e,query){
            query = query || getScreenQuery();
            queryCache = query;
            $qr.pagingList({
                action:searchAct,
                // currentPage:$qr.children('.paging').data('currentPage'),
                jsonObj: query,
                callback: function(data){
                    if(!query.category) {
                        $('#pic-ul').hide();
                        scope.set('listData',data);
                    } else {
                        $('.all-fix-wrap').hide();
                        var $lis = $($compile('#pic-li', data));
                        $lis.each(function(i, v) {
                            var $this = $(this);
                            var obj = data[i] || {};
                            var fileName = obj.materialEvidenceName;
                            var bottomCon = $compile('#express-pic', obj);
                            $this.data('info', obj)
                                .find('img').previewPro(fileName, bottomCon);
                        });
                        $('#pic-ul').html($lis).show();
                    }
                }
            });
        }
        function resetFn(){
            $qb.find('input:text').val('');
            $qb.find('input[type="hidden"]').filter('[value!=""]').closest('dict').find('input[value=""]').trigger('click');
        }

        //注册事件与插件
        function regEvent() {

            //插件
            //$('.date-range-picker').daterangepicker({
            //    timePicker: true
            //});
            //$('.dict').dict();

            $tb.table({
                cols:columns,
                fixCols:{left:2},
                check:'id'
            });


            //注册查询重置事件
            $qb.on('x-reset',resetFn).on('x-query',queryFn); //把查询面板当作一个组件看待,交互并不关心具体的如何查询,只是触发对应查询事件


            //保存为常用查询点击
            $qb.on('click', '#scene-save-btn', function () {
                $open('#save-usual-search', {title: '保存为常用项', width: 350, height: 220});
            });
            //保存为常用查询-保存
            $('#save-usual-search').on('click', '.save', function () {
                // var queryContent = getScreenQuery();
                var act = makeAct('sceneCollecting/queryHistory/add');
                var queryContent = obj2str(getScreenQuery())
                var query = {
                    "queryType": "2",
                    "queryContent": queryContent,
                    "queryName": $('#save-usual-search').find('input[name="queryName"]').val(),
                    "remark": $('#save-usual-search').find('textarea[name="remark"]').val()
                };
                $post(act, query, function (res) {
                    toast('保存成功');
                    query.id=res.data.id;
                    var li = $compile('#usual-search-li', query);
                    usualSearchArr.unshift(query);
                    // $li.data('query', queryContent);
                    $('#usual-search').prepend(li);
                });
            });
            //保存为常用查询-取消
            $('#save-usual-search').on('click', '.cancel', function () {
                $('#save-usual-search').$close();
            });
            //常用查询的点击
            $('#usual-search').on('click', 'li span', function () {
                var $this = $(this);
                var id = $this.closest('li').attr('data-id');
                var query = str2obj(usualSearchArr.where('o=>o.id=="{0}"'.format(id))[0].queryContent);
                $qb.trigger('x-query', query);
            });
            //常用查询的删除
            $('#usual-search').on('click', '.icon-remove', function () {
                var $this = $(this);
                var $li = $this.closest('li');
                var id = $li.attr('data-id');
                $confirm('是否删除'+$li.find('span').text(), function (yes) {
                    if(yes) {
                        var act = makeAct('sceneCollecting/queryHistory/del');
                        $post(act, id, function () {
                            toast('删除成功');
                            usualSearchArr = usualSearchArr.where('o=>o.id!="{0}"'.format(id));
                            $li.remove();
                        });
                    }
                });
            });
            /*//勘验人员输入筛选人
             $('#investigator').on('keyup', function () {
             var val = $(this).val();
             var data = kyryArr.where('o=>o.value.match(/.*?{0}.*?/g)'.format(val));
             if(data.length > 0) {
             $('#kyry').show();
             }
             var liarr = $compile('#util-li', data);
             $('#kyry').html(liarr);
             }).on('blur', function () {
             $('#kyry').hide();
             });
             //勘验人员显示列表的点击
             $('#kyry').on('click', 'li', function () {
             $('#investigator').val($(this).text());
             $('#kyry').hide();
             });*/
            //结果展现方式的change
            $('#show-way').on('change', function () {
                var query = queryCache;
                var val = $(this).val();
                query.category = val;
                if(val) {
                    $('.ept-l,.ept-r').hide();
                } else {
                    $('.ept-l,.ept-r').show();
                }
                $qb.trigger('x-query', query);
            });
            //查询结果不是默认的时候点击勘验编号事件
            $('#pic-ul').on('click', 'a', function () {
                var $this = $(this);
                var investigationId = $this.attr('data-id');
                var caseType = $this.attr('data-caseTypeCn');
                var caseNature = $this.attr('data-caseNatureCn');
                $append(getViewPath('scene-add.html?id={0}&caseType={1}&caseNature={2}&searchflag=1'.format(investigationId,caseType,caseNature),'./view/'),'现场详情')
            });
            //导出右边的小箭头
            $('.title-r').on('click', '.ept-r', function (e) {
                e.stopPropagation();
                $(this).next().show();
            });
            $('.body-agent').on('click', function () {
                $('.setting-ept').hide();
            });
            //字典的点击事件
            $('.query-block-row').on('click', 'dict input:not([type="hidden"])', function () {
                var $this = $(this);
                var key = $this.val();      //字典代码
                var value = $this.next().text();    //字典代码对应的中文
                var root = $this.closest('dict').attr('dict-root');     //字典的root
                var obj = {
                    key: key,
                    value: value,
                    root: root
                };
                if($this.prop('checked')) {     //点击后选中的时候所做的操作
                    if(!key) {  //如果点击的是不限，就删除该字典的所有相关选项
                        $('#yxtj-ul li').each(function () {
                            var $that = $(this);
                            if($that.attr('data-root') == root) {
                                $that.remove();
                            }
                        });
                        return;
                    }
                    var li = $compile('#yxtj-li', obj);     //模板生成的li标签
                    if($this.filter(':checkbox').length!=0) {   //为多选框的时候
                        $('#yxtj-ul').append(li);
                    } else {        //为单选框的时候
                        // $('#yxtj-ul').find('li[data-root="{0}"]'.format(root)).remove()
                    }
                } else {    //点击后非选中的时候所做的操作
                    $('#yxtj-ul li').each(function () { //删除对应取消选中的项
                        var $that = $(this);
                        if($that.attr('data-root') == root && $that.attr('data-key') == key) {
                            $that.remove();
                            return false;
                        }
                    });
                }
            });
            //已选条件的x按钮
            $('#yxtj-ul').on('click', 'li em', function () {
                var $this = $(this);
                var $li = $this.closest('li');
                var root = $li.attr('data-root');
                var key = $li.attr('data-key');
                var $thatInput = $('[dict-root="{0}"]'.format(root)).find('input[value="{0}"]'.format(key))
                $thatInput.trigger('click');
                $li.remove();
            });
            //设置导出列的点击
            $('.setting-ept').on('click', function () {
                $open('#setting-opt', {width: 800, title:'设置导出项'});
                exportSlt = [];
                $('#setting-opt .input-group-addon').trigger('click');
            });
            //导出点击
            $('#export').on('click', function () {
                var query = getScreenQuery();
                var exports = localData.get('exportData').where('o=>o.checked==true').select('o=>o.f').join();
                var act = makeAct('sceneQuery/sceneSimpleQuery/export');
                query.colName = exports;
                query.begin = 0;
                query.end = exportNum;
                $post(act, query, function (res) {
                    window.open(fileServerPath + res.data.filePath);
                });
            });
            //导出项导出配置 搜索
            $('#setting-opt').on('click', '.input-group-addon', function () {
                var inputText = $(this).prev().val();
                var data = localData.get('exportData');
                data = data.where('o=> o.field.match(/.*?{0}.*?/g) || o.fieldPy.match(/.*?{0}.*?/g) '.format(inputText));
                var handleData = fixedExportData(data);
                var html = $compile('#export-div', handleData);
                $('#setting-opt-result').html(html);
            });
            $('#setting-opt').on('keyup', '.export-seach', function (e) {
                if(e.keyCode == '13') {
                    $('#setting-opt .input-group-addon').trigger('click');
                }
            });
            //导出项的选中
            $('#setting-opt').on('click', 'input:checkbox', function () {
                var checked = this.checked;
                var fieldPy = $(this).prop('id');
                exportSlt.push({fieldPy: fieldPy, checked: checked});
            });
            //设置导出界面的保存
            $('#setting-opt').on('click', '.save', function () {
                var exportData = localData.get('exportData');
                exportSlt.each(function (item) {
                    exportData.select('o=>(o.fieldPy=="{0}") && (o.checked={1})'.format(item.fieldPy, item.checked));
                });
                localData.set('exportData', exportData);
                $('#setting-opt').$close();
            });
            //设置导出界面的取消
            $('#setting-opt').on('click', '.cancel', function () {
                $('#setting-opt').$close();
            });

        }

        //导出项数据存储到localData
        function saveExportData() {
            var allItem = [
                {field:'勘验号',fieldPy:'kanyanhao',firstPy:'k',f:'investigationNo'},
                {field:'案件关联',fieldPy:'anjianguanlian',firstPy:'a',f:'caseNo'},
                {field:'警情关联',fieldPy:'jingqingguanlian',firstPy:'j',f:'alarmNo'},
                {field:'案件类别',fieldPy:'anjianleibie',firstPy:'a',f:'caseTypeCn'},
                {field:'勘验时间',fieldPy:'kanyanshijian',firstPy:'k',f:'investigationDateFrom'},
                {field:'勘验地点',fieldPy:'kanyandidian',firstPy:'k',f:'investigationPlace'},
                {field:'勘验人',fieldPy:'kanyanren',firstPy:'k',f:'investigatorName'},
                {field:'发案区划',fieldPy:'faanquhua',firstPy:'f',f:'caseRegionalismCn'},
                {field:'现场图',fieldPy:'xianchangtu',firstPy:'x',f:'scenePhotoAmount'},
                {field:'现场照片',fieldPy:'xianchangzhaop',firstPy:'x',f:'scenePictureAmount'},
                {field:'痕迹物证',fieldPy:'henjiwuzheng',firstPy:'h',f:'evidenceAmount'},
                {field:'视频',fieldPy:'shipin',firstPy:'s',f:'videoEvidenceAmount'},
                {field:'提取物品',fieldPy:'tiquwuping',firstPy:'t',f:'collectedGoodsAmount'},
                {field:'案件性质',fieldPy:'anjianxingzhi',firstPy:'a',f:'caseNatureCn'},
                {field:'勘验单位',fieldPy:'kanyandanwei',firstPy:'k',f:'organName'},
                {field:'勘验指挥人',fieldPy:'kanyanzhihuiren',firstPy:'k',f:'commandName'},
                {field:'发案地点',fieldPy:'faandidian',firstPy:'f',f:'caseLocation'},
                {field:'发案时间',fieldPy:'faanshijian',firstPy:'f',f:'crimeTimeBegin'},
                {field:'见证人',fieldPy:'jianzhengren',firstPy:'j',f:'witnessName'},
                {field:'保护人',fieldPy:'baohuren',firstPy:'b',f:'protector'},
                {field:'现场保护时间',fieldPy:'xiancbaohushijian',firstPy:'x',f:'protectionDate'},
                {field:'保护措施',fieldPy:'baohucuoshi',firstPy:'b',f:'protectionMeasureCn'},
                {field:'损失物品总价值',fieldPy:'sunshiwupingzongjiazhi',firstPy:'s',f:'lostTotalValue'},
                {field:'受伤人数',fieldPy:'shoushangrenshu',firstPy:'s',f:'woundedAmount'},
                {field:'死亡人数',fieldPy:'siwangrenshu',firstPy:'s',f:'deadAmount'},
                {field:'选择对象',fieldPy:'xuanzeduixiang',firstPy:'x',f:'chooseObject'},
                {field:'选择处所',fieldPy:'xuanzechusuo',firstPy:'x',f:'choosePlace'},
                {field:'作案进出口',fieldPy:'zuoanjinchukou',firstPy:'z',f:'crimeInOut'},
                {field:'作案时机',fieldPy:'zuoanshiji',firstPy:'z',f:'crimeTime'},
                {field:'作案手段',fieldPy:'zuoanshouduan',firstPy:'z',f:'crimeType'},
                {field:'侵入方式',fieldPy:'qinrufangshi',firstPy:'q',f:'invasionType'},
                {field:'作案过程',fieldPy:'zuoanguocheng',firstPy:'z',f:'commissionDesc'},
                {field:'作案人特点',fieldPy:'zuoanrentedian',firstPy:'z',f:'criminalPoints'},
                {field:'作案工具',fieldPy:'zuoangongju',firstPy:'z',f:'crimeTools'},
                {field:'提交时间',fieldPy:'tijiaoshijian',firstPy:'t',f:'lastSubmitDatetime'}
            ];
            localData.get('exportData') || localData.set('exportData', allItem);
        }

        //导出项数据结构整理
        function fixedExportData(allItem) {
            //重新排序，根据firstPy
            allItem.sort(function (a,b) {
                return a.firstPy.charCodeAt() - b.firstPy.charCodeAt();
            });
            var handleAllItem = [];
            var tmp = [];       //用来存储首字母的数组，下标与handleAllItem对应
            allItem.each(function (item,i) {
                item.firstPy = item.firstPy.upper();
                var index = tmp.indexOf(item.firstPy);
                if(index == -1) {       //如果该字段的首字母在handleAllItem中不存在的情况
                    var obj = {
                        firstPy: item.firstPy,
                        arr: [{field: item.field, fieldPy: item.fieldPy, f: item.f, checked: item.checked || false}]
                    };
                    tmp.push(item.firstPy);
                    handleAllItem.push(obj);
                } else {
                    var obj = {field: item.field, fieldPy: item.fieldPy, f: item.f, checked: item.checked || false};
                    handleAllItem[index].arr.push(obj);
                }
            });
            return handleAllItem;
        }

        //获取筛选条件的query
        function getScreenQuery() {
            //var query = {};
            ////[name=categry]结果展现方式不在qb, 在qr上
            //$qb.find(':input').add('[name=category]').each(function () {
            //    var $this = $(this);
            //    var name=$this.prop('name');
            //    var val= $this.attr('data-val') || $this.val();
            //
            //    //时间range切分
            //    if(name == 'createTime' || name == 'investigationDate' || name == 'lastSubmitDatetime') {
            //        var valArr = val.split(',');
            //        query[name+'Begin'] = valArr[0];
            //        query[name+'End'] = valArr[1] || '';
            //        return true;
            //    }
            //    else if(name == 'crimeTime' ) {
            //        var valArr = val.split(',');
            //        query[name+'BeginStr'] = valArr[0];
            //        query[name+'EndStr'] = valArr[1] || '';
            //        return true;
            //    }
            //    else{
            //        query[name] = val;
            //    }
            //});
            //return query;

            //var query=$qb.add('.new-color-bar').extract();
            var query=scope.get('queryData');
            console.info(query);
            return query;
        }

        function init() {

            //声明数据绑定
            //scope.bind('listData','#res-table');

            regEvent();

            saveExportData();

            //常用查询的li列表
            $post(usualAct, {queryType: "2"}, function (res) {
                res.data && (usualSearchArr = res.data);
                var arrLi = $compile('#usual-search-li', res.data);
                $('#usual-search').html(arrLi);
            },false);
            //勘验人员
            $post(kyryAct, null, function (res) {
                kyryArr = res.data.where('o=>o.personFlag==1');
                //勘验人员的自动检测
                $('#investigator').autocomplete(kyryArr, {
                    max: 100,    //列表里的条目数
                    minChars: 0,    //自动完成激活之前填入的最小字符
                    width: 148,     //提示的宽度，溢出隐藏
                    scrollHeight: 220,   //提示的高度，溢出显示滚动条
                    matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                    autoFill: false,    //自动填充
                    matchCase:false,	  //开启大小写敏感
                    delay:200,            //延时
                    mouseDownOnSelect:1,
                    formatItem: function(row, i, max) {
                        return  row.value;
                    },
                    formatMatch: function(row, i, max) {
                        return row.value;
                    },
                    formatResult: function(row) {
                        return row.value;
                    }
                }).result(function(event, row, formatted) {
                    $(this).attr('data-val', row.key);
                });
                $('#investigator').on('keyup', function () {
                    if(!$(this).val()) {
                        $(this).removeAttr('data-val');
                    }
                });
            }, false);
            //案情信息 发案区划
            //$get(unitAct,null,function (res) {
            //    $('#faqh').dict(res.data);
            //},false);
            //查询结果展现方式
            $get(selectAct, null, function (res) {
                var data = res.data.slice(0,11);
                var optionArr = $compile('#util-option', data);
                $('#show-way').append(optionArr);
            },false);

            //字典项加载完毕后启动查询
            var setTime = 200;
            setTimeout(function () {
                //console.log($('.unready').length);
                if($('.unready').length == 0) {
                    $qb.trigger('x-query');
                } else {
                    setTimeout(arguments.callee, setTime)
                }
            }, 360);//第一次启动时间没必要和每次间隔一致,有时候立即,有时候延时

        }

        init();

        /*for test
         <div id="test-form"  x-form>
         <span>现场勘验号：</span>
         <input x-name="kNo" type="text" class="cm-input">
         <span>案件编号：</span>
         <input x-name="aNo"  type="text" class="cm-input">
         </div>

         //x-form注入值
         $('#test-form').checkIn(data);  // {kNo: 123, aNo: 456, sDate:'2016-11', eDate:'2016-12'}
         //提取值
         $('#test-form').checkOut();
         */
        window.s=scope;

        /*
         //绑定
         /*s.bind('queryData','.query-block');
         //设置
         s.set('queryData',{kNo: 123, aNo: 456, sDate:'2016-11', eDate:'2016-12'});
         //提取
         s.get('queryData');
         //局部更新
         s.update('queryData',function(queryData){
         queryData.aNo=999
         });*/


        /*
         //绑定
         var xForm=s.bind('queryData',$qb);
         //设置
         xForm.set({kNo: 123, aNo: 456, sDate:'2016-11'});
         //提取
         xForm.get();
         //局部更新
         xForm.update(function(data){
         data.aNo=999
         });
         * */

        /*
         //绑定
         $qb.bind2(scope);
         //设置
         $qb.setData({kNo: 123, aNo: 456, sDate:'2016-11'});
         //提取
         $qb.getData();
         //局部更新
         xForm.update(function(data){
         data.aNo=999
         });
         * */
    });
}