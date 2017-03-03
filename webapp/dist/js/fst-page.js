importing('echarts3','currentDate',function(){
	$('.index-content .latest-information .title-list').on('click','li',function(){
		var $index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.latest-information .content-l .commonality').eq($index).show().siblings().hide();
		$('.latest-information .content-r .commonality').eq($index).show().siblings().hide();
	});

	$filter('isNotNull',function(){
		return this != '' && this != null && this != undefined;
	});
	$filter('isNull',function(){
		return this == ''|| this == null || this == undefined;
	});

	/*------------------------------------------------------------通知通告----------------------------------------------------*/
	var initPageNoticeDataAction = top.path+'/api/0/jsgl/notic/view/queryfst',
		intoMessageInfoAction = top.path+'/api/0/jsgl/notic/view/init',
		xtdhListAction = top.path + '/api/0/system/xtdh/list',
		personInfoAction = top.path+'/api/0/jsgl/technician/person_info',
		receiveNoticeAction = top.path+'/api/0/jsgl/notic/view/receive';
	var noticData ,unitName,unitNameId;

	$get(intoMessageInfoAction,{},function (res2) {
		if(res2.data!=null){
			unitName = res2.data.UNITNAME;
			unitNameId = res2.data.ID;
		}
		initPageNoticeData()
	})

	//查询
	window.initPageNoticeData = function initPageNoticeData(){
		if(typeof unitNameId != 'undefined') {
			$post(initPageNoticeDataAction, {receiveUnitName: unitNameId, begin: 0, end: 10}, function (res) {
				noticData = res.data;
				var signCount = 0;//签收总数
				var reciveCount = res.totalCount;//接收总数
				var feedbackCount = 0;//反馈总数
				$template('#notice-result .inform-list', noticData, function (item, i) {
					if (item.title != null) {
						if (item.title.length > 14) {
							item.titles = item.title;
						} else {
							item.titles = null;
						}
					}
					if (item.sendUnitName != null) {
						if (item.sendUnitName.length >= 10) {
							item.sendUnitNames = item.sendUnitName;
							item.sendUnitName_show = item.sendUnitName.substring(0, 10) + "...";
						} else {
							item.sendUnitName_show = item.sendUnitName;
							item.sendUnitNames = null;
						}
					}
					if (item.needFeedback == 0) {
						item.feedbackFlag_page = '否';
					} else {
						item.feedbackFlag_page = '是';
						if (item.signFlag == '' || item.signFlag == 0) {
							if (unitName == item.receiveUnitName) {
								item.editLimit = '1'
							}
						} else {
							if (unitName == item.receiveUnitName) {
								if (item.feedFlag == 0) {
									item.feedLimit = '1'
								}
							}
						}
						if (item.signFlag == '' || item.signFlag == 0) {
							if (unitName == item.receiveUnitName) {
								item.signFlag_page = '签收';
								item.showLimit = '1';
								signCount++;
							}
						} else {
							if (unitName == item.receiveUnitName) {
								if (item.feedFlag == 0) {
									item.signFlag_page = '反馈';
									feedbackCount++;
								} else {
									item.signFlag_page = '';
								}
							}
						}
					}
					item.createDatetime_show = item.createDatetime.substring(0, 10);
				});
				var count = [{
					reciveCount: reciveCount + '',
					feedbackCount: feedbackCount + '',
					signCount: signCount + ''
				}]
				$template('#notice-result .mail', count);
			});
		}
	}

	$post(xtdhListAction, {sortName: 'sort', sortOrder:'asc'}, function (res) {
		$('#system-navigation-list').template( res.data);//数据填充
		$('.xtdh-open').on('click', function () {
			var addr = $(this).attr('addr');
			var ifLogin = $(this).attr('ifLogin');
			var ifJh = $(this).attr('ifJh');
			var jhPara = $(this).attr('jhPara');
			var ifSfzh = $(this).attr('ifSfzh');
			var sfzhPara = $(this).attr('sfzhPara');
			if(addr.indexOf('http') == -1) {
				addr = 'http://'+addr;
			}
			if(ifLogin == '1' && top.currentUser.techId != null) {
				$post(personInfoAction,{id:top.currentUser.techId},function(res){
					var data = res.data;
					if(ifJh == '1') {
						addr = addr + '?' + jhPara + '='+ data.policeNo + (ifSfzh == '1' ? '&' + sfzhPara + '='+ data.idCardNo : '');
					} else {
						addr = addr + '?' + sfzhPara + '='+ data.idCardNo;
					}
					top.openIE(addr);
				},true);
			} else {
				top.openIE(addr);
			}
		});
	});

	//签收通知通告
	function receiveNotice(id,title){
		for(var i=0;i<noticData.length;i++){
			if(id==noticData[i].id&&(noticData[i].signFlag==''||noticData[i].signFlag==0)){
				$confirm('确定签收通知【'+title+'】吗？',function (del) {
					if(del){
						$get(receiveNoticeAction,{id:noticData[i].noticeId},function (res) {
							var msg = res.msg?res.msg:'签收成功！';
							toast(msg,600).ok();
							initPageNoticeData();
						});
					}
				});
				break;
			}else if(id==noticData[i].id&&(noticData[i].signFlag==1&&noticData[i].feedFlag==0)){
				var editWin=$open('jsgl-notice-view-feedback.html',{width:"70%", title:'通知通告反馈'},true,function (){
					window.feedNoticeInfo(id,noticData,editWin);
				})
				break;
			}
		}
	}

	function viewNoticeInfo(id){
		var editWin=$open('jsgl-notice-view-list.html',{width:"70%", title:'查看通知通告'},true,function (){
			window.initNoticeViewPagaData(id,noticData,editWin);
		})
	}

	$('#notice-result').on('click','.notice',function(){
		viewNoticeInfo(this.getAttribute('param'))
	}),$('#notice-result').on('click','.signfor',function(){
		receiveNotice(this.getAttribute('param'),this.getAttribute('paramTitle'))
	});

	$('#informNoticeBtn').on('click',function(){
		changeSidebarStyle('jsgl-notice-view');
	})
	/*----------------------------------------------------------通知通告end----------------------------------------------------*/



	/*------------------------------------------------------------我的应用----------------------------------------------------*/
	var allAppsUrl = top.path + '/api/1/app/myapps/allList';
	$post(allAppsUrl,{userid:top.currentUser.id},function(res){
		var appTypes = res.data.appTypes;
		var allApps = res.data.allApps.where('o=>o.fstpageAdded=="1"');
		appTypes.each(function(item){
			item.limit = top.ops[item.appEname];
			if(item.limit == 1){
				allApps.where('o=>o.appType=="{0}"'.format(item.appEname)).each(function(t){
					t.limit = top.ops[t.appEname];
				})
			}else{
				allApps.where('o=>o.appType=="{0}"'.format(item.appEname)).each(function(t){
					t.limit = 0;
				})
			}
		})
		$('#fst-myapps').template(allApps.where('o=>o.limit=="1"'));
	})
	$('#myAppsBtn').on('click',function(){
		changeSidebarStyle('workbench');
	})

	/*------------------------------------------------------------我的应用end----------------------------------------------------*/


	/*------------------------------------------------------------图表统计----------------------------------------------------*/
	var queryEChartAction = top.path+'/api/0/stat/sbtj/echarts';
	var montnData = [];
	var thisYearData = [];
	var lastYearData = [];
	var montnCnData = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	var montnNumData = [1,2,3,4,5,6,7,8,9,10,11,12];
	var thisYear ;
	var lastYear ;
	$get(queryEChartAction,{},function(res){
		for(var i=0;i<=res.data.month-1;i++){
			montnData[i] = montnCnData[i];
		}
		thisYear = res.data.year;//去年年份
		lastYear = res.data.year - 1;//今年年份
		if(res.data.thisYear!=null) {
			for (var i = 0; i <= res.data.month-1; i++) {
				if(typeof res.data.thisYear[i]!='undefined'){//拼接今年数据数组
					for(var j=0;j<= res.data.month-1;j++) {
						if ((thisYear + "-" + montnNumData[j]) == res.data.thisYear[i].fstDate ||
							(thisYear + "-0" + montnNumData[j]) == res.data.thisYear[i].fstDate) {
							thisYearData[j] = res.data.thisYear[i].fstData;
							break;
						}
					}
				}
				if(typeof res.data.lastYear[i]!='undefined') {//拼接去年数据数组
					for(var j=0;j<= res.data.month-1;j++){
						if ((lastYear + "-" + montnNumData[j]) == res.data.lastYear[i].fstDate ||
							(lastYear + "-0" + montnNumData[j]) == res.data.lastYear[i].fstDate) {
							lastYearData[j] = res.data.lastYear[i].fstData;
							type = false;
							break;
						}
					}
				}
			}
		}
		for(var i=0;i<=res.data.month-1;i++){
			if(lastYearData[i]==null||lastYearData[i]==''){
				lastYearData[i] = 0
			}
			if(thisYearData[i]==null||thisYearData[i]==''){
				thisYearData[i] = 0
			}
		}
		//注入数据到echarts2图表
		var fzData=[{name: "去年",type: "line",data: lastYearData },{name: "今年",type: "line",data: thisYearData}];
		var option = {
			title: {text: " ",x: "center"},
			tooltip: {trigger: "item",formatter: "{a} <br/>{b} : {c}"},
			legend: {x: 'center',data: ["去年", "今年"]},
			color:['green','#d9534e'],
			xAxis: {type: "category",name: "x",splitLine: {show: false},data: montnData},
			yAxis: {type: "value",name: "y"},
			calculable: true,
			toolbox: {show: true,feature: {mark: {show: true},dataView: {show: true,readOnly: true},restore: {show: true},saveAsImage: {show: false}}},
			series: fzData
		};
		var myChart = echarts.init(byid('chart-ajkytb'));
		window.onresize = myChart.resize;
		myChart.setOption(option);
	})


	/*----------------------------------------------------------图表统计end----------------------------------------------------*/

	/*----------------------------------------------------------发布信息图表统计----------------------------------------------------*/

	var kyzlEchartUrl = top.path +'/api/0/stat/sbtj/kyzl/echarts';
	$get(kyzlEchartUrl,{},function(res){
		var kyzlData =[{value:res.data.bhgxc,name:'不合格现场('+res.data.bhgxc+')'},{value:res.data.hgxc,name:'合格现场('+res.data.hgxc+')'},{value:res.data.zcxc,name:'暂存现场('+res.data.zcxc+')'}];
		var option = {
			title : {text: res.data.mainOrganName,x:'20%',y:'90%' },
			tooltip : {trigger: 'item', formatter: "{b}:{d}%"},
			legend: {orient: 'vertical',left:'left',top:'3%',data: ['不合格现场('+res.data.bhgxc+')','合格现场('+res.data.hgxc+')','暂存现场('+res.data.zcxc+')']},
			color:['#f0ad4e','#428bca','#d9534e'],
			series : [
				{
					type: 'pie',
					radius : '80%',
					center: ['52%', '50%'],
					label:{
						normal:{
							show:false
						}
					},
					labelLine:{
						normal:{
							show:false
						}
					},
					data:kyzlData
				}
			]
		};
		var myChart = echarts.init(byid('chart-kyzl'));
		window.onresize = myChart.resize;
		myChart.setOption(option);
		var pieApp={currentIndex:-1};
		pieApp.timeTicket = setInterval(function () {
			var dataLen = option.series[0].data.length;
			// 取消之前高亮的图形
			myChart.dispatchAction({
				type: 'downplay',
				seriesIndex: 0,
				dataIndex: pieApp.currentIndex
			});
			pieApp.currentIndex = (pieApp.currentIndex + 1) % dataLen;
			// 高亮当前图形
			myChart.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: pieApp.currentIndex
			});
			// 显示 tooltip
			myChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: pieApp.currentIndex
			});
		}, 1000);
	},true)


	/*----------------------------------------------------------发布信息图表统计end----------------------------------------------------*/

	/*----------------------------------------------------------案件勘验情况----------------------------------------------------*/
	var stayCaseUrl = top.path+'/api/0/workbench/assign/list';
	var stayRelevanceUrl = top.path+'/api/1/workbench/sceneInfo/list';

	//修改侧边栏iconfont样式
	function changeSidebarStyle(pageNo){
		top.rootTreeMenu.find('li>a').removeClass('menu-open menu-open2');
		top.rootTreeMenu.find('li').each(function() {
			if ($(this).attr('page-no') == pageNo) {
				var a=$(this).children('a');
				a.parents('.grade2,.grade3,#root-menu>li').each(function(){
					$(this).children('a').eq(0).addClass('menu-open');
				});
				a[0].click();
				a.addClass('menu-open menu-open2');
			}
		});
	}

	//判断案件数量
	function judgeCaseNum(caseName,caseDate){
		caseName.data.each(function(item){
			item[caseDate] = item[caseDate].replace(/:\d+$/,'');
		})
		if(caseName.totalCount == 0){
			caseName.totalCount = caseName.totalCount.toString();
		}
		if(caseName.totalCount<5){
			caseName.nowCount = caseName.totalCount;
		}else{
			caseName.nowCount = 5;
		}
	}

	//待勘案件
	$post(stayCaseUrl,{"isinvestigation":"0","lasjStart":dateRangeUtil.getCurrentMonth()[0].format('yyyy-mm-dd'),"lasjEnd":dateRangeUtil.getCurrentMonth()[1].format('yyyy-mm-dd'),"begin": 1,"end": 6},function(res){
		var stayCase = res;
		judgeCaseNum(stayCase,'fasjcz');
		$('#stayCaseWrapper').template(stayCase);
		$('#stayCaseBtn').on('click',function(){
			changeSidebarStyle('xcky-ajky');
			localData.set('stayCaseData',true);
		})
		$('#stayCaseWrapper').on('click','li',function(){
			changeSidebarStyle('xcky-ajky');
			localData.set('stayCaseDataList',$(this).attr('caseId'));
		})
	})

	//待关联案件
	$post(stayRelevanceUrl,{ "sceneArea": "0","isToCase": "0", "investigationTimeStart":dateRangeUtil.getCurrentMonth()[0].format('yyyy-mm-dd'),"investigationTimeEnd": dateRangeUtil.getCurrentMonth()[1].format('yyyy-mm-dd'), "begin": 1,"end": 6},function(res){
		var stayRelevance = res;
		judgeCaseNum(stayRelevance,'investigationTime');
		$('#stayRelevanceWrapper').template(stayRelevance);
		$('#stayRelevanceBtn').on('click',function(){
			changeSidebarStyle('xcky-xcxxlr');
			localData.set('stayRelevanceData',true);
		})
		$('#stayRelevanceWrapper').on('click','li',function(){
			changeSidebarStyle('xcky-xcxxlr');
			localData.set('stayRelevanceDataList',$(this).attr('caseId'));
		})
	})

	//权限设置
	var inquestSituation = top.ops['inquestSituation'],
		checkoutIdentify = top.ops['checkoutIdentify'],
		physicalEvidence = top.ops['physicalEvidence'],
		traceComparison = top.ops['traceComparison'],
		messageParallel = top.ops['messageParallel'];
	var caseLimitArray = [{name:'inquestSituation',value:inquestSituation},{name:'checkoutIdentify',value:checkoutIdentify},{name:'physicalEvidence',value:physicalEvidence},{name:'traceComparison',value:traceComparison},{name:'messageParallel',value:messageParallel}];
	caseLimitArray.each(function(item){
		if(item.value == 1){
			$('.'+item.name).removeClass('hideplus');
		}
	})
	/*----------------------------------------------------------案件勘验情况end----------------------------------------------------*/


	/*----------------------------------------------------------首页我的应用----------------------------------------------------*/
	//点击首页我的应用
	$('.index-content .my-apps .myapps-list').on('click', 'li', function () {
		var $this = $(this);
		var appename = $this.attr('appename');
		var changeName = appename.replace(/^\w+-\w+-/,'');
		var funcName = (changeName+'Handle');

		if (window[funcName]) {
			window[funcName]();
			return false;
		}
		//与导航条联动, 先看是否是导航下级菜单,寻找对应的侧边子菜单
		top.rootTreeMenu.find('li>a').each(function(){
			$(this).removeClass('menu-open');
			$(this).parents('.grade2,.grade3').each(function(){
				$(this).children('a').eq(0).removeClass('menu-open menu-open2');
			});
		});
		top.rootTreeMenu.find('li').each(function() {
			if (changeName == $(this).attr('page-no')) {
				var a=$(this).children('a').eq(0);
				a.parents('.grade2,#root-menu>li').each(function(){
					$(this).children('a').eq(0).addClass('menu-open');
				});
				a[0].click();
				a.addClass('menu-open menu-open2');
			}
		});
	})

	/*----------------------------------------------------------首页我的应用end----------------------------------------------------*/
})