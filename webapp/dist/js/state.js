/**
 * Created by yao on 2017/1/17.
 */
setSubPrj('xk');
$state
.on('spa-t01',{
    importing:['sys.js'],
    init:function(scope){
        toast('test01 init!').ok();
        MODULE.sysLoginlog();
    }
})

.on('spa-t02',{
    importing:['dataTable','fixDataTable'],
    init:function(scope){
        var data=[
            [1,22,33,44,55],
            [2,22,33,44,55],
            [3,22,33,44,55],
            [4,22,33,44,55],
            [5,22,33,44,55]
        ];
        $post(makeAct('sys/sysUser/pagequery'),{roleName: '', note: '', begin: 1, end: 60},function ( res ){
            res.data=res.data.slice(0,20);
            res.data.each('o => o.roleName=o.roleName||"",o.rowNum=parseInt(o.rowNum)')
            $('#test-table').initDataTable({
                data: res.data,
                //ordering:true,
                info:true,
                // scrollY: window.height-400,
                columns: [
                    { "data": "rowNum" ,title:'序号'},
                    { "data": "organName" ,title:'单位'},
                    { "data": "organName" ,title:'单位2'},
                    { "data": "organName" ,title:'单位3'},
                    { "data": "organName" ,title:'单位4'},
                    { "data": "organName" ,title:'单位5'},
                    { "data": "organName" ,title:'单位6'},
                    { "data": "username" ,title:'用户名'},
                    { "data": "trueName" ,title:'真实姓名'}
                    // { "data": "roleName" ,title:'角色名', sortable: false} //当最后一列超长导致表格自动扩展时, dataTbale会出固定列bug
                ],
                fixedColumns: {
                    leftColumns: 1,
                    rightColumns: 1
                }
            });
        })

    }
})

.on('spa-t03',{
    importing:null,
    init:function(scope){
        toast('test03 init!').ok();
    }
})
.on('map-getpoint',{
    importing:['plugin/hsmap/js-old/apiv2.0.min.js','plugin/hsmap/js-old/PointConvertion.js','plugin/hsmap/js-old/DrawingManager_min.js','plugin/hsmap/js-old/DrawingManager_min.css'],
    init:function(){
        var bsdMapCityArr=["厦门", "118.08", "24.49"]
        //创建Map实例
        var map = new BMap.Map("map-getpoint-ct");
        //坐标对象
        //var pp = {lng:117.2872140000, lat:31.8337430000};
        var pp = {lng:+bsdMapCityArr[1],lat:+bsdMapCityArr[2]}//{lng:117.28, lat:31.86};
        //点实例
        var point = new BMapPoint(pp);
        //var point2 =new BMap.Point(116.99050200089576, 31.653679567968222)
        //圆实例
        var circle = new BMap.Circle(point,5000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.1, strokeOpacity: 0.1});
        //信息框实例
        var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
            "<img style='float:right;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" +
            "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门…</p>" +
            "</div>";
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        map.addEventListener("click", function (e) {
            //alert("当前位置：" + e.point.lng + ", " + e.point.lat);
            var pointClick=  new BMap.Point(e.point.lng , e.point.lat);
            map.openInfoWindow(infoWindow, pointClick);
        });

        //转换为百度坐标对象
        function convert2bdPP(nativePP){
            var hxPP = GPS.gcj_encrypt(nativePP.lat, nativePP.lng);
            var bdPP = GPS.bd_encrypt(hxPP.lat, hxPP.lng);
            //console.info(nativePP),console.log(bdPP)
            return bdPP;
        }
        //转换为百度坐标对象
        function convert2nativePP(bdPP){
            var hxPP = GPS.bd_decrypt(bdPP.lat, bdPP.lng);
            var nativePP = GPS.gcj_decrypt(hxPP.lat, hxPP.lng);
            //console.info(nativePP),console.log(bdPP)
            return nativePP;
        }
        //直接用原始坐标对象实例化一个点
        function BMapPoint(bdPP){
            var bdPP=convert2bdPP(pp);
            return new BMap.Point(bdPP.lng, bdPP.lat);
        }
        // 创建标注
        function addMarker(point){
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            return marker;
        }


        //标注点
        var marker=addMarker(point);
        //标注圆
        map.addOverlay(circle);

        map.addEventListener("click", function (e) {
            console.log("当前位置：" + e.point.lng + ", " + e.point.lat);
            var pointClick=  new BMap.Point(e.point.lng , e.point.lat);
            map.openInfoWindow(infoWindow, pointClick);
        });

        //设置中心点和缩放级别
        map.centerAndZoom(point, 14);
        //地图类型选择
        map.addControl(new BMap.MapTypeControl());
        map.addControl(new BMap.NavigationControl());
        //当前城市
        map.setCurrentCity(bsdMapCityArr[0]);
        //滚轮缩放
        map.enableScrollWheelZoom(true);


        //经纬度区域
        var bounds = map.getBounds();
        //西南角
        var sw = bounds.getSouthWest();
        //东北角
        var ne = bounds.getNorthEast();
        //宽度
        var lngSpan = Math.abs(sw.lng - ne.lng);
        //高度
        var latSpan = Math.abs(ne.lat - sw.lat);


        /* 随机向地图添加10个标注 */
        for (var i = 0; i < 10; i ++) {
            var pointTemp = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.15), ne.lat - latSpan * (Math.random() * 0.15));
            //var pointTemp = new BMapPoint({lng:bdSW.lng + lngSpan * (Math.random() * 0.15),  lat:bdNE.lat - latSpan * (Math.random() * 0.15)});
            addMarker(pointTemp);
        }


        function getCasePoints(paramData,searchType){
            var mapActions=[
                '/api/1/system/casemap/searchform',
                '/api/1/system/casemap/searchradius',
                '/api/1/system/casemap/searchdraw'
            ];
            $post(top.path+mapActions[searchType], paramData, function(res){
                var points=res.data;
                for (var i = 0; i < points.length; i ++) {
                    //生成标注点
                    //var pointTemp = new BMap.Point(points[i].lng, points[i].lat);
                    var pointTemp = new BMapPoint({lng:points[i].lng, lat:points[i].lat});
                    addMarker(pointTemp);
                    pointTemp.addEventListener('click',function(){alert(this.lng)});
                    //生成左侧案件列表
                    $('#case-list').template(points);
                }
            });
        }



        // 百度地图API功能
        var overlays = [];
        var overlaycomplete = function(e,p){
            overlays.push(e.overlay);
            //console.log(JSON.stringify(e.overlay.Mu));
            BMap['backToHander']();
            var ul=e.overlay.Mu.ul;
            var Ll=e.overlay.Mu.Ll;
            console.info('右上角原始坐标'+JSON.stringify(convert2nativePP(ul)))
            //getCasePoints( { ul:convert2nativePP(ul), Ll:convert2nativePP(Ll)} );
            addMarker(new BMap.Point(ul.lng,ul.lat));//up right
            addMarker(new BMap.Point(Ll.lng,Ll.lat));//down left
        };
        var styleOptions = {
            strokeColor:"steelblue",    //边线颜色。
            fillColor:"skyblue",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 2,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.6,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.4,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        function clearAll() {
            for(var i = 0; i < overlays.length; i++){
                map.removeOverlay(overlays[i]);
            }
            overlays.length = 0
        }

        //event function
        $('[drawingtype="rectangle"]').eq(0).attr('id','map-rectrange-btn');
        $('[drawingtype="hander"]').eq(0).attr('id','map-hander-btn');
        BMap['beginToRectangle']=function(){document.getElementById('map-rectrange-btn').click();};
        BMap['backToHander']=function(){document.getElementById('map-hander-btn').click();}

        //reg it
        $('#cls').click(function(){
            clearAll();
        });
        $('#to-rect').click(function(){
            BMap['beginToRectangle']();
        });

        // //百度地图设置或获取缩放级别
        // map.getZoom()
        // map.setZoom(12)
        //
        // //PS:先get再set, 可以实现在原有级别上放大缩小
        //
        // //百度地图移动指定位置和移动到指定点
        // map.panBy(200,50)
        // map.panTo(new BMap.Point(117.72,24.73))
    }
});
// .on('map-getpoint',{
//     importing:['hsmap'],
//     init:function(){
//         $('#map-getpoint-ct').css({width:'100%', height:'100%'});
//         //载入地图相关
//         initHsMap(function(){
//             //部署地配置
//             var bsdMapCityArr=["厦门", "118.08", "24.49"];//localData.get('sysParams')['defaultMapCity'].split(',');info([bsdMapCityArr,convert2bdPP({lat:bsdMapCityArr[1],lng:bsdMapCityArr[2]})]);
//             var bsdMapCityName=bsdMapCityArr[0];
//             var bsdMapCenter={lng:+bsdMapCityArr[1], lat:+bsdMapCityArr[2]};//
//             var bsdMapDefaultZoom=+(bsdMapCityArr[3]||12);
//             //坐标对象
//             //var pp = {lng:117.28, lat:31.86};
//             //创建Map实例
//             var map =window.map= new BMap.Map('map-getpoint-ct',window.config.defaultZoomSetting||{minZoom:12,maxZoom:18});
//             //点实例
//             var point = new BMapPoint(bsdMapCenter);
//             //标注点实例
//             //var marker=addMarker(point);
//             //圆实例, 标注圆
//             //var circle = new BMap.Circle(point,5000,{fillColor:'blue', strokeWeight: 1 ,fillOpacity: 0.1, strokeOpacity: 0.1});
//             //map.addOverlay(circle);
//             //信息框实例
//             //var sContent=byid('map-info-window').innerHTML;
//             //var infoWindow = new BMap.InfoWindow(sContent,{width:400,marginLeft:100});//, title : '案件详情'});  // 创建信息窗口对象
//             //设置中心点和缩放级别
//             map.centerAndZoom(point, bsdMapDefaultZoom);
//             //允许地图类型选择
//             //map.addControl(new BMap.MapTypeControl());
//             //当前城市
//             map.setCurrentCity(bsdMapCityName);
//             //滚轮缩放
//             map.enableScrollWheelZoom(true);
//             //单击获取点击的经纬度
//             map.addEventListener("click",function(e){
//                 $alert('经度{0}, 纬度{1}'.format(e.point.lng , e.point.lat));
//             });
//         });
//     }
// })