(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=
{
  //配置部分
  "prjName":"wzgl",
  "subPrj":{
    "wz":{
      "prjName":"wzgl",
      "restfuls":["http://192.168.40.231:28094"]
    },
    "xk":{
      "prjName":"xcky3",
      "restfuls":["http://192.168.40.231:28094"]
    },
    "lib":{
      "prjName":"lib",
      "restfuls":["http://192.168.40.231:28094"]
    }
  },
  "version":"0.9.2",
  "maxTabCount":9,
  "scrollBarWidth":5,
  "indexStyle":"adds",
  "useFullWrap":false,
  "tabLength":null,
  "holdToken":false,
  "mapVersion":2.0,
  "autoCustomCol":1,
  "mapServerPath":"http://192.168.1.168:8101",
  "mock":0,//设置为0关闭模拟接口
  "test":0,//设置为test模式时info和log输出,否则不输出
  "useLocalAgent":1,
  "defaultImports":["xtp","xTable","fixTable","customCol","scope","filter","widget"],
  "plugins":{
    "hsmap":"hsmap/hsmap.js",
    "fullscreen":"fullscreen/jquery.fullscreen.js",
    "autocomplete":"autocomplete/autocomplete.js",
    "mappicker":"mappicker/mappicker.js",
    "datepicker":"date/my97/datepicker.js",
    "ztree":"ztree/ztree.js",
    "echarts":"echarts/echarts3110.js",
    "echarts2":"echarts/echarts225.js",
    "echarts3":"echarts/echarts3110.js",
    "china":"echarts/china.js",
    "jqgrid":"jqgrid/jquery.jqGrid.min.js",
    "dataTable":"dataTable/jquery.dataTables.js",
    "fixDataTable":"dataTable/dataTables.fixedColumns.js",
    "dict":"dict/dict.js",
    "socket":"socket/socket.io.js",
    "ckeditor":"ckeditor/ckeditor.js",
    "moment":"date/moment.js",
    //"datepicker2":"daterangepicker/daterangepicker.js",
    "daterangepicker":{
      "path":"date/daterangepicker/daterangepicker2124.js",
      "depending":["moment"]
    },
    "currentDate":"date/currentDate.js",
    "bs-popover":"bootstrap/bs-popover.js",//依赖bootstrap.css
    "bs-tooltip":"bootstrap/bs-tooltip.js",//依赖bootstrap.css
    "bootstrap":{
      "depending":["bootstrap-css","bootstrap-js"]
    },
    "bootstrap-js":"bootstrap/bootstrap.3.31.js",
    "bootstrap-css":"bootstrap/bootstrap.3.31.css",
    "datetimepicker":{
      "path":"date/bs.datetimepicker/bootstrap-datetimepicker.min.js",
      "depending":["moment"]
    },
    "adminDesign.main":"admindesign/main.js",
    "colorBox":"admindesign/colorbox.js",
    "panelCtrls":"admindesign/panel.ctrls.js",
    "slick":"slick/slick.min.js",
    "bowser":"bowser.min.js",
    "tooltips":"tooltips/tooltipster.bundle.min.js",
    "jui":"jui/jquery-ui.js",
    "popover":"popover/jquery.webui-popover.min.js",
    "previewBox":"preview/previewbox.js",
    "previewPro":{
      "path":"preview/previewpro.js",
      "depending":["plugin/preview/previewpro.htm","jui"]
    },
    "barcode":"barcode/jsbarcode-all.js"
  },
  ////获取其他所有服务地址更新的基础服务地址
  //baseRestful:'http://localhost:8888/xcky/api',
  ////各模块服务地址
  //restfuls:{
  //    //基础系统接口 登入登出
  //    'base-sys':'http://localhost:8022/xcky/api/',
  //    //系统配置模块
  //    'sys':'http://localhost:8022/xcky/api/',
  //    //新增现场
  //    'newScene':'http://localhost:8023/xcky/api/'
  //},
  //restful服务器根路径 目前只写一个,由nginx配置, 可以写一组, 前台多选一
  "restfuls":[
    "http://192.168.40.231:28094"
  ],
  "restDesc":"上方为restful服务器路径,会自动加上项目名对应到xcky3,下方为具体的业务action登记,登记后使用makeAct('login')就可以得到完整的服务url, 如未登记,则用makeAct('sys/login/login')也能生成全路径",
  //具体的业务action登记, 登记后使用makeAct('login')就可以得到完整的服务url, 如未登记,则用makeAct('sys/login/login')也能生成全路径
  "actions":{
    "login":"sys/login/login",
    "logout":"sys/login/logout",
    "sysUserUpd":"sys/sysUser/upd",
    "sysOrgDict":"sys/sysOrganization/dict_unit"
    //"login":"http://localhost:8022/xcky/api/login/login",
    //"logout":"http://localhost:8022/xcky/api//login/logout"
  },
  //模拟接口
  "mockActions":{
      "login":"",
      "logout":"",
      "sysUserUpd":"sys/sysUser/upd",
      "sysOrgDict":"sys/sysOrganization/dict_unit",
      "message/list":""
  }
}
},{}],2:[function(require,module,exports){
/**
 * Created by EvanYao on 2016/9/21.
 */

window.sysParams=window.sysParams||localData.get('sysParams')||{};

var cobwebPath=window.sysParams['cobwebPath']||'http://10.130.151.151:8088/cobweb';
var shortPath=cobwebPath.replace('http://','').replace('/cobweb','');
var cobwebPagePath=getViewPath('page-cobweb.html')+'&shortPath={0}&phoneNo={1}'.format(shortPath,12345);

if(typeof module === "object" && typeof module.exports === "object" ){
    module.exports={
        //打开word控件页面
        openDoc:function(docID,tableID,tableName,title,allowEdit,showCustomBar,showMenuBar,theFrame){
            var obj=arguments[0];
            var ag=typeof obj=='object'?[obj.docID,obj.tableID,obj.tableName,obj.title,obj.allowEdit,obj.showCustomBar,obj.showMenuBar]:arguments;
            var wordPath=top.config['wordJspPath']||(top.path+'/jsp/word.jsp');
            var src=wordPath+'?docID={0}&tableID={1}&tableName={2}&title={3}&allowEdit={4}&showCustomBar={5}&showMenuBar={6}'.format(ag[0],ag[1],ag[2]||'',ag[3]||'',ag[4]||'0',ag[5]||'0',ag[6]||'0');
            if(typeof theFrame=='object'){
                return theFrame.src=src;
            }else{
                return top.$open(src,{title:title,width:top.innerWidth-120,height:top.innerHeight-20});
            }
        },
        //在指定的iframe中打开word
        openDocInFrame:function(theFrame,docID,tableID,tableName,title,allowEdit,showCustomBar,showMenuBar){
            return openDoc(docID,tableID,tableName,title,allowEdit,showCustomBar,showMenuBar,theFrame);
        },
        //蛛网SIS登录
        cobwebInit:function(cobwebPath){
            window.open(cobwebPagePath);
        },
        //蛛网指向具体页面
        cobwebDirect:function(url){
            info('蛛网页面地址:'+url);
            var ifr=document.createElement('iframe');
            ifr.height=0,ifr.width=0;
            document.body.appendChild(ifr);
            ifr.onload=function(){
                setTimeout(function(){
                    window.open(url);
                    setTimeout(function(){
                        document.body.removeChild(ifr);
                    },2000);
                },360);
            }
            ifr.src=cobwebPagePath;
        },
        //蛛网查询
        cobwebSearch:function(keyWord,keyType){
            //if(!keyWord){
            //    $alert('查询关键字为空!');
            //    return false;
            //}
            keyWord=keyWord||'';
            keyType=keyType||'handsetNum';
            keyType=='id' && (keyType='identification');

            var url=keyWord?'{0}/oneSearch/searchResult?keyType={1}&keyWord={2}'.format(cobwebPath,keyType,keyWord)
                :'{0}/oneSearch/searchPage'.format(cobwebPath);
            cobwebDirect(url);
        },
        //SIS首页
        sisInit:function(){
            cobwebDirect(cobwebPath+'/sisSearch/getIndex');
        }

    }
}

/*
*
* $.post('http://10.130.151.151:8088/cobweb/system/thirdAutoLogin',{phoneNo:13738083247,idCard:350524199000000000,jumpUrl:'/oneSearch/searchResult?keyType=handsetNum&keyWord=13738083247'},function(res){ info(res)})



 http://10.130.151.151:8088/cobweb/oneSearch/searchResult?keyType=handsetNum&keyWord=13738083247


 function cobwebInit(){
 var fr=document.createElement('form')
 fr.action='http://10.130.151.151:8088/cobweb/system/thirdAutoLogin'
 fr.method='POST'
 var ipt=document.createElement('input')
 ipt.name='phoneNo'
 ipt.value='13738083247'
 fr.appendChild(ipt)
 var ipt2=document.createElement('input')
 ipt2.name='idCard'
 ipt2.value='350524199000000000'
 fr.appendChild(ipt2)
 var ipt3=document.createElement('input')
 ipt3.name='jumpUrl'
 ipt3.value='/oneSearch/searchResult?keyType=handsetNum&keyWord=13738083247'
 fr.appendChild(ipt3)
 document.body.appendChild(fr);
 fr.submit();
 }

 function cobwebSearch(phoneNo,cobwebPath){
 var ifr=document.createElement('iframe');
 ifr.height=0,ifr.width=0;
 document.body.appendChild(ifr);
 ifr.onload=function(){
 setTimeout(function(){
 window.open( ('http://'+ (cobwebPath||'10.130.151.151:8088') +'/cobweb') + '/oneSearch/searchResult?keyType=handsetNum&keyWord='+(phoneNo||'13738083247'))
 document.body.removeChild(ifr);
 },300);
 }
 ifr.src=getViewPath('cobweb.html')+'&cobwebPath='+(cobwebPath||'10.130.151.151:8088') +'&phoneNo='+phoneNo
 }

 function cobwebIndex(cobwebPath){
 window.open( getViewPath('cobweb.html')+'&cobwebPath='+(cobwebPath||'10.130.151.151:8088') + '&phoneNo=13766668888' )
 }


 cityTreeName:福建省厅,福建福州,福建厦门,福建泉州,福建龙岩,福州海关,福建泉州安溪县,福建政和县
 cityTreeId:3500,3501,3502,3505,3508,3589,3598,3599
 card:
 phone:15759273144
 plate:
 name:
 beginTime:
 endTime:
 checkAllCity:0

 <ul class="dropdown-menu kind-dropdown" role="menu" id="kindValueList" style="display: block;">
 <li class="kind_item" id="handsetNum"><a><i class="icon-ok"></i>手机号码</a></li>
 <li class="kind_item" id="identification"><a><i class="icon-ok"></i>证件号码</a></li>
 <li class="kind_item" id="viNum"><a><i class="icon-ok"></i>虚拟号码</a></li>
 <!-- 搜索时不显示 -->
 <li class="kind_item" id="qqNum"><a class="current-kind"><i class="icon-ok"></i>QQ号码</a></li>
* */
},{}],3:[function(require,module,exports){
/**
 * Created by evans on 17/2/25.
 *
 *
 * extractor和x-getter结合了,
 * 传入queryObj时, 赋值给queryObj,  就是被用在x-from中取值
 * 没有传queryObj, 则直接返回一个值, 用在自身与scope建立联系,直接往外供值
 *
 *
 * so, 必须提供一种return, 用于getFn时使用
 *
 */

//自动拆分range picker
window.$extractor
('rangeDate', function (queryObj){
    var $this=$(this);
    var data=$this.data();
    var name=$this.attr('x-name');
    var val=$this.val().split(',');
    var bname=data['bname']||(name+'Begin');
    var ename=data['ename']||(name+'End');

    if(!queryObj){
        return $this.val();
    }else{
        queryObj[bname]=val[0].trim();
        queryObj[ename]=(val[1]||'').trim();
    }
})
(
    'dict', function(queryObj){
        var $this=$(this);
        var key=$this.attr('dict-name');
        var dictInputId=$this.attr('dict-id');
        var dictVal=$this.find('#'+dictInputId).val();
        if(queryObj){
            queryObj[key]=dictVal;
        }else{
            return dictVal;
        }
    }
)
},{}],4:[function(require,module,exports){
    require('./lib/defineding.js');
    window.extending({voidFn:function(){}})

    var config=require('../data/config.json');

    config.isClient=(location.protocol=='file:' || location.protocol=='chrome-extension:') && typeof window['require']=='function';
    config.isLocal=config.isClient || config.useLocalAgent && location.href.indexOf('webapp/dist/')>-1;


    window.extending({
        config:config,
        setSubPrj:function(key){
            var subPrj=config.subPrj[key];
            config.prjName=subPrj.prjName;
            config.restfuls=subPrj.restfuls||config.restfuls;
        }
    });


    var locals=require('./lib/locals');
    window.extending(locals,true);
    window.extending({ _staticCache:Object.create(null)});
    window.extending({ $cache:function(src,txt){
        var len=arguments.length;
        if(len==2){
            return (window['_staticCache'][src]=txt);
        }else if(len==1){
            return window['_staticCache'][src];
        }else if(len==0){
            return window['_staticCache'];
        }

    }});
    //window.extending({ loadJSONCache:Object.create(null)});
    //window.extending({ loadHTMLCache:Object.create(null)});
    //window.extending({ loadTEXTCache:Object.create(null)});


    require('./lib/path.js');


    var $=require('./lib/jquery');
    window.extending({$:$,jQuery:$},true);

    require('./lib/jquery.extend');

    //require('./lib/bootstrap.3.31');

    var $eui=require('./lib/eui');
    $eui($);

    var $cookie=require('./lib/jquery.cookie');
    $cookie($);

    var exy=require('./lib/exy');
    window.extending(exy,true);

    require('./lib/proto');

    var xtp=require('./lib/xtp');
    window.extending(xtp);

    var pub=require('./lib/pub');
    window.extending(pub,true);

    var pubBusiness=require('./business/pub-business');
    window.extending(pubBusiness);


    var paging=require('./lib/paging.js');

    var validate=require('./lib/validate.js');

    top.molKeys && window.localParamsInit(top.molKeys);


    //for mock...
    require('./lib/mock-register.js');

    require('./filter.js');

    require('./extractor.js');

    require('./injector.js');

    require('./widget.js');


    //TODO 应该生成到index.js中
    if(window==top){
        window.extending('$state',require('./lib/naving.state.js'));
        window.$state=window.$state;
        //require('./state.js');
    }


    require('./lib/patch.js');



    window.makeAct=window.makeAct;
    window.queryParse=window.queryParse;
    window.typeOf=window.typeOf;

    window.obj2str=window.obj2str;
    window.str2obj=window.str2obj;

    window.byid=window.byid;
    window.bytag=window.bytag;

    window.dash2camel=window.dash2camel;
    window.camel2dash=window.camel2dash;

    window.getRect=window.getRect;

    window.toast=window.toast;
    window.$alert=window.$alert;
    window.$confirm=window.$confirm;
    window.$open=window.$open;
    window.$append=window.$append;

    window.$post=window.$post;
    window.$get=window.$get;

    window.$compile=window.$compile;
    window.$widget=window.$widget;
    window.$behavior=window.$behavior;

    window.$cache=window.$cache;
    window.localData=localData;

    window.$filter=window.$filter;
    window.$injector=window.$injector;
    window.$extractor=window.$extractor;

    //window.$loadHTML=window.$loadHTML;
    //window.$loadJSON=window.$loadJSON;
    //window.$loadTEXT=window.$loadTEXT;
    

    if(typeof module === "object" && typeof module.exports === "object" ){
        module.exports={
            checkDtd:function(){
                if(document.compatMode=='BackCompat'){
                    throw new Error('BackCompat！please check DTD！');
                }
            }
        }
    }



},{"../data/config.json":1,"./business/pub-business":2,"./extractor.js":3,"./filter.js":5,"./injector.js":6,"./lib/defineding.js":7,"./lib/eui":8,"./lib/exy":9,"./lib/jquery":14,"./lib/jquery.cookie":12,"./lib/jquery.extend":13,"./lib/locals":16,"./lib/mock-register.js":17,"./lib/naving.state.js":18,"./lib/paging.js":19,"./lib/patch.js":20,"./lib/path.js":21,"./lib/proto":22,"./lib/pub":23,"./lib/validate.js":25,"./lib/xtp":30,"./widget.js":33}],5:[function(require,module,exports){
/**
 * Created by evan on 2017/1/3.
 * todo filter也和widget一样, 将手动匿名闭包包裹后,移出去用importing加载
 */
function num2txt(txt1,txt2,txt3){
    //TODO 加入布尔值的支持
    var the=parseInt(this);
    if(the===1){
        return txt1;
    }else if(the===0){
        return txt2;
    }else{
        return typeof txt3!='undefined'? txt3:this.valueOf();
    }
}
window.$filter('asNumber',function(){
    return this.valueOf()==true?1:0;
},Boolean);

window.$filter('sub16',function(){
    return this.trim().slice(0,16);
    //return (new Date(this)).format('YYYY-M-D hh:mm');
},String);

window.$filter('asDate16',function(){
    // return this.trim().slice(0,16);
    return this.valueOf()?(new Date(this)).format('YYYY-M-D hh:mm'):'';
});

window.$filter('asCnTime',function(){
    return this.valueOf()?(new Date(this)).format('YYYY年M月D日 hh:mm'):(window.config.emptyDate||'--');
});

window.$filter('asCnDate',function(){
    return (new Date(this)).format('YYYY年M月D日');
});
//<b>{dateTxt.asCnDate}</b>

window.$filter('asRead',function(){
    return num2txt.apply(this,['已读','未读']);
});
//<b>{num.asRead}</b>

window.$filter('asEnable', function () {
    return num2txt.apply(this,['启用','禁用','禁用']);
});

window.$filter('asSolved',function(){
    return num2txt.apply(this,['已解决','未解决']);
});
//<b>{num.asSolved}</b>


window.$filter('asActive',function(){
    return num2txt.apply(this,['active','no-active','']);
});
//<a class="btn-edit {num.asActive}"></a>
//<a class="nav-link-{num.asActive}"></a>

window.$filter('toInt', function(){
    return parseInt(this.valueOf());
});

window.$filter('asSex', function () {
    return this.toString().trim().replace('1', '男').replace('2', '女').replace('0', '未知');
});

window.$filter('exNum',function () {
    return parseInt(this)===1?0:1;
});
window.$filter('asYes',function () {
    return parseInt(this)===1?'是':'否';
});
window.$filter('asUndefined',function () {
    return this.toString() == 'undefined' ? undefined : this;
});
window.$filter('html2txt',function () {
    return this.toString().replace(/<\/?.*?>/g,'');
});
},{}],6:[function(require,module,exports){
/**
 * Created by evans on 17/3/2.
 */
//自动合并range picker
window.$injector
('rangeDate', function (val,queryObj){
    var $this=$(this);
    var data=$this.data();
    var name=$this.attr('x-name');
    var bname=data['bname']||(name+'Begin');
    var ename=data['ename']||(name+'End');

    if(!queryObj){
        return $this.val(queryObj[bname]+','+queryObj[ename]);
    }else{
        return $this.val(val);
    }
})

},{}],7:[function(require,module,exports){
/**
 * Created by evans on 16/11/27.
 */
(function(context){
    Object.defineProperty(Object.prototype,'extending',{
        value:function() { //name,val or obj
            var obj={};
            typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
            for(var n in obj){
                if(obj.hasOwnProperty(n)){
                    Object.defineProperty(this, n, {
                        value: obj[n],
                        writable:false, enumerable:arguments[arguments.length-1]===true, configurable:false
                    });
                }
            }
            return this;
        },writable:false, enumerable:false, configurable:false
    });
    Object.defineProperty(Object.prototype,'getting',{
        value:function() { //name,getter or obj
            var obj={};
            typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
            for(var n in obj){
                    Object.defineProperty(this, n, {
                        get:obj[n],enumerable:arguments[arguments.length-1]===true, configurable:false
                    });
            }
            return this;
        },writable:false, enumerable:false, configurable:false
    });
})(window);

Object.prototype.extending('fixing',function(key){
    Object.defineProperty(this, key, {
        writable:false,
        configurable:false
    });
});

window.extending(window===top ?{_mol_wins:{},_opener_wins:{}}:{$window:top.$window,$document:top.$document,$$:top.$$});

window.getting({
    doc:function(){return document.documentElement;},
    width:function(){return this.innerWidth;},
    height:function(){return this.innerHeight;},
    scrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop;},
    scrollLeft:function(){return document.documentElement.scrollLeft||document.body.scrollLeft;},
    iframe:function(){
        //if(window===top)return null;
        //var frs=parent.document.getElementsByTagName('iframe');
        //for(var i=frs.length-1;i>-1;i--){
        //    if(frs[i].contentWindow==self){return frs[i];}
        //}
        //return null;
        return window.frameElement;
    },
    $opener:function(){
        var openerId=this.iframe.getAttribute('opener-id');
        return top._opener_wins[openerId];
    }
});

window.extending('getPrjName',function(){
    // var querys=window.queryParse()||Object.create(null);
    // var prjName=querys['prj-name']||window.config.prjName;
    // return prjName;
    return window.config.prjName;
});
},{}],8:[function(require,module,exports){
var _eui=function(jQuery) {
    //parser
    (function ($) {
        $.parser = {
            auto: true,
            onComplete: function (_1) {
            },
            plugins: ["_draggable", "_droppable", "_resizable", "pagination", "etooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "epanel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form"],
            parse: function (_2) {
                var aa = [];
                for (var i = 0; i < $.parser.plugins.length; i++) {
                    var _3 = $.parser.plugins[i];
                    var r = $(".eui-" + _3, _2);
                    if (r.length) {
                        if (r[_3]) {
                            r[_3]();
                        } else {
                            aa.push({name: _3, jq: r});
                        }
                    }
                }
                if (aa.length && window.easyloader) {
                    var _4 = [];
                    for (var i = 0; i < aa.length; i++) {
                        _4.push(aa[i].name);
                    }
                    easyloader.load(_4, function () {
                        for (var i = 0; i < aa.length; i++) {
                            var _5 = aa[i].name;
                            var jq = aa[i].jq;
                            jq[_5]();
                        }
                        $.parser.onComplete.call($.parser, _2);
                    });
                } else {
                    $.parser.onComplete.call($.parser, _2);
                }
            },
            parseValue: function (_6, _7, _8, _9) {
                _9 = _9 || 0;
                var v = $.trim(String(_7 || ""));
                var _a = v.substr(v.length - 1, 1);
                if (_a == "%") {
                    v = parseInt(v.substr(0, v.length - 1));
                    if (_6.toLowerCase().indexOf("width") >= 0) {
                        v = Math.floor((_8.width() - _9) * v / 100);
                    } else {
                        v = Math.floor((_8.height() - _9) * v / 100);
                    }
                } else {
                    v = parseInt(v) || undefined;
                }
                return v;
            },
            parseOptions: function (_b, _c) {
                var t = $(_b);
                var _d = {};
                var s = $.trim(t.attr("data-options"));
                if (s) {
                    if (s.substring(0, 1) != "{") {
                        s = "{" + s + "}";
                    }
                    _d = (new Function("return " + s))();
                }
                $.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (p) {
                    var pv = $.trim(_b.style[p] || "");
                    if (pv) {
                        if (pv.indexOf("%") == -1) {
                            pv = parseInt(pv) || undefined;
                        }
                        _d[p] = pv;
                    }
                });
                if (_c) {
                    var _e = {};
                    for (var i = 0; i < _c.length; i++) {
                        var pp = _c[i];
                        if (typeof pp == "string") {
                            _e[pp] = t.attr(pp);
                        } else {
                            for (var _f in pp) {
                                var _10 = pp[_f];
                                if (_10 == "boolean") {
                                    _e[_f] = t.attr(_f) ? (t.attr(_f) == "true") : undefined;
                                } else {
                                    if (_10 == "number") {
                                        _e[_f] = t.attr(_f) == "0" ? 0 : parseFloat(t.attr(_f)) || undefined;
                                    }
                                }
                            }
                        }
                    }
                    $.extend(_d, _e);
                }
                return _d;
            }
        };
        $(function () {
            var d = $("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
            $._boxModel = d.outerWidth() != 100;
            d.remove();
            if (!window.easyloader && $.parser.auto) {
                $.parser.parse();
            }
        });
        $.fn._outerWidth = function (_11) {
            if (_11 == undefined) {
                if (this[0] == window) {
                    return this.width() || document.body.clientWidth;
                }
                return this.outerWidth() || 0;
            }
            return this._size("width", _11);
        };
        $.fn._outerHeight = function (_12) {
            if (_12 == undefined) {
                if (this[0] == window) {
                    return this.height() || document.body.clientHeight;
                }
                return this.outerHeight() || 0;
            }
            return this._size("height", _12);
        };
        $.fn._scrollLeft = function (_13) {
            if (_13 == undefined) {
                return this.scrollLeft();
            } else {
                return this.each(function () {
                    $(this).scrollLeft(_13);
                });
            }
        };
        $.fn._propAttr = $.fn.prop || $.fn.attr;
        $.fn._size = function (_14, _15) {
            if (typeof _14 == "string") {
                if (_14 == "clear") {
                    return this.each(function () {
                        $(this).css({width: "", minWidth: "", maxWidth: "", height: "", minHeight: "", maxHeight: ""});
                    });
                } else {
                    if (_14 == "fit") {
                        return this.each(function () {
                            _16(this, this.tagName == "BODY" ? $("body") : $(this).parent(), true);
                        });
                    } else {
                        if (_14 == "unfit") {
                            return this.each(function () {
                                _16(this, $(this).parent(), false);
                            });
                        } else {
                            if (_15 == undefined) {
                                return _17(this[0], _14);
                            } else {
                                return this.each(function () {
                                    _17(this, _14, _15);
                                });
                            }
                        }
                    }
                }
            } else {
                return this.each(function () {
                    _15 = _15 || $(this).parent();
                    $.extend(_14, _16(this, _15, _14.fit) || {});
                    var r1 = _18(this, "width", _15, _14);
                    var r2 = _18(this, "height", _15, _14);
                    if (r1 || r2) {
                        $(this).addClass("eui-fluid");
                    } else {
                        $(this).removeClass("eui-fluid");
                    }
                });
            }
            function _16(_19, _1a, fit) {
                if (!_1a.length) {
                    return false;
                }
                var t = $(_19)[0];
                var p = _1a[0];
                var _1b = p.fcount || 0;
                if (fit) {
                    if (!t.fitted) {
                        t.fitted = true;
                        p.fcount = _1b + 1;
                        $(p).addClass("epanel-noscroll");
                        if (p.tagName == "BODY") {
                            $("html").addClass("epanel-fit");
                        }
                    }
                    return {width: ($(p).width() || 1), height: ($(p).height() || 1)};
                } else {
                    if (t.fitted) {
                        t.fitted = false;
                        p.fcount = _1b - 1;
                        if (p.fcount == 0) {
                            $(p).removeClass("epanel-noscroll");
                            if (p.tagName == "BODY") {
                                $("html").removeClass("epanel-fit");
                            }
                        }
                    }
                    return false;
                }
            };
            function _18(_1c, _1d, _1e, _1f) {
                var t = $(_1c);
                var p = _1d;
                var p1 = p.substr(0, 1).toUpperCase() + p.substr(1);
                var min = $.parser.parseValue("min" + p1, _1f["min" + p1], _1e);
                var max = $.parser.parseValue("max" + p1, _1f["max" + p1], _1e);
                var val = $.parser.parseValue(p, _1f[p], _1e);
                var _20 = (String(_1f[p] || "").indexOf("%") >= 0 ? true : false);
                if (!isNaN(val)) {
                    var v = Math.min(Math.max(val, min || 0), max || 99999);
                    if (!_20) {
                        _1f[p] = v;
                    }
                    t._size("min" + p1, "");
                    t._size("max" + p1, "");
                    t._size(p, v);
                } else {
                    t._size(p, "");
                    t._size("min" + p1, min);
                    t._size("max" + p1, max);
                }
                return _20 || _1f.fit;
            };
            function _17(_21, _22, _23) {
                var t = $(_21);
                if (_23 == undefined) {
                    _23 = parseInt(_21.style[_22]);
                    if (isNaN(_23)) {
                        return undefined;
                    }
                    if ($._boxModel) {
                        _23 += _24();
                    }
                    return _23;
                } else {
                    if (_23 === "") {
                        t.css(_22, "");
                    } else {
                        if ($._boxModel) {
                            _23 -= _24();
                            if (_23 < 0) {
                                _23 = 0;
                            }
                        }
                        t.css(_22, _23 + "px");
                    }
                }
                function _24() {
                    if (_22.toLowerCase().indexOf("width") >= 0) {
                        return t.outerWidth() - t.width();
                    } else {
                        return t.outerHeight() - t.height();
                    }
                };
            };
        };
    })(jQuery);
    //event
    (function ($) {
        var _25 = null;
        var _26 = null;
        var _27 = false;

        function _28(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (!_27) {
                _27 = true;
                dblClickTimer = setTimeout(function () {
                    _27 = false;
                }, 500);
            } else {
                clearTimeout(dblClickTimer);
                _27 = false;
                _29(e, "dblclick");
            }
            _25 = setTimeout(function () {
                _29(e, "contextmenu", 3);
            }, 1000);
            _29(e, "mousedown");
            if ($.fn._draggable.isDragging || $.fn._resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2a(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mousemove");
            if ($.fn._draggable.isDragging || $.fn._resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2b(e) {
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mouseup");
            if ($.fn._draggable.isDragging || $.fn._resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _29(e, _2c, _2d) {
            var _2e = new $.Event(_2c);
            _2e.pageX = e.changedTouches[0].pageX;
            _2e.pageY = e.changedTouches[0].pageY;
            _2e.which = _2d || 1;
            $(e.target).trigger(_2e);
        };
        if (document.addEventListener) {
            document.addEventListener("touchstart", _28, true);
            document.addEventListener("touchmove", _2a, true);
            document.addEventListener("touchend", _2b, true);
        }
    })(jQuery);
    //dragable
    (function ($) {
        function _2f(e) {
            var _30 = $.data(e.data.target, "_draggable");
            var _31 = _30.options;
            var _32 = _30.proxy;
            var _33 = e.data;
            var _34 = _33.startLeft + e.pageX - _33.startX;
            var top = _33.startTop + e.pageY - _33.startY;
            if (_32) {
                if (_32.parent()[0] == document.body) {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 = e.pageX + _31.deltaX;
                    } else {
                        _34 = e.pageX - e.data.offsetWidth;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top = e.pageY + _31.deltaY;
                    } else {
                        top = e.pageY - e.data.offsetHeight;
                    }
                } else {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 += e.data.offsetWidth + _31.deltaX;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top += e.data.offsetHeight + _31.deltaY;
                    }
                }
            }
            if (e.data.parent != document.body) {
                _34 += $(e.data.parent).scrollLeft();
                top += $(e.data.parent).scrollTop();
            }
            if (_31.axis == "h") {
                _33.left = _34;
            } else {
                if (_31.axis == "v") {
                    _33.top = top;
                } else {
                    _33.left = _34;
                    _33.top = top;
                }
            }
        };
        function _35(e) {
            var _36 = $.data(e.data.target, "_draggable");
            var _37 = _36.options;
            var _38 = _36.proxy;
            if (!_38) {
                _38 = $(e.data.target);
            }
            _38.css({left: e.data.left, top: e.data.top});
            $("body").css("cursor", _37.cursor);
        };
        function _39(e) {
            if (!$.fn._draggable.isDragging) {
                return false;
            }
            var _3a = $.data(e.data.target, "_draggable");
            var _3b = _3a.options;
            var _3c = $("._droppable").filter(function () {
                return e.data.target != this;
            }).filter(function () {
                var _3d = $.data(this, "_droppable").options.accept;
                if (_3d) {
                    return $(_3d).filter(function () {
                            return this == e.data.target;
                        }).length > 0;
                } else {
                    return true;
                }
            });
            _3a._droppables = _3c;
            var _3e = _3a.proxy;
            if (!_3e) {
                if (_3b.proxy) {
                    if (_3b.proxy == "clone") {
                        _3e = $(e.data.target).clone().insertAfter(e.data.target);
                    } else {
                        _3e = _3b.proxy.call(e.data.target, e.data.target);
                    }
                    _3a.proxy = _3e;
                } else {
                    _3e = $(e.data.target);
                }
            }
            _3e.css("position", "absolute");
            _2f(e);
            _35(e);
            _3b.onStartDrag.call(e.data.target, e);
            return false;
        };
        function _3f(e) {
            if (!$.fn._draggable.isDragging) {
                return false;
            }
            var _40 = $.data(e.data.target, "_draggable");
            _2f(e);
            if (_40.options.onDrag.call(e.data.target, e) != false) {
                _35(e);
            }
            var _41 = e.data.target;
            _40._droppables.each(function () {
                var _42 = $(this);
                if (_42._droppable("options").disabled) {
                    return;
                }
                var p2 = _42.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + _42.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _42.outerHeight()) {
                    if (!this.entered) {
                        $(this).trigger("_dragenter", [_41]);
                        this.entered = true;
                    }
                    $(this).trigger("_dragover", [_41]);
                } else {
                    if (this.entered) {
                        $(this).trigger("_dragleave", [_41]);
                        this.entered = false;
                    }
                }
            });
            return false;
        };
        function _43(e) {
            if (!$.fn._draggable.isDragging) {
                _44();
                return false;
            }
            _3f(e);
            var _45 = $.data(e.data.target, "_draggable");
            var _46 = _45.proxy;
            var _47 = _45.options;
            if (_47.revert) {
                if (_48() == true) {
                    $(e.data.target).css({
                        position: e.data.startPosition,
                        left: e.data.startLeft,
                        top: e.data.startTop
                    });
                } else {
                    if (_46) {
                        var _49, top;
                        if (_46.parent()[0] == document.body) {
                            _49 = e.data.startX - e.data.offsetWidth;
                            top = e.data.startY - e.data.offsetHeight;
                        } else {
                            _49 = e.data.startLeft;
                            top = e.data.startTop;
                        }
                        _46.animate({left: _49, top: top}, function () {
                            _4a();
                        });
                    } else {
                        $(e.data.target).animate({left: e.data.startLeft, top: e.data.startTop}, function () {
                            $(e.data.target).css("position", e.data.startPosition);
                        });
                    }
                }
            } else {
                $(e.data.target).css({position: "absolute", left: e.data.left, top: e.data.top});
                _48();
            }
            _47.onStopDrag.call(e.data.target, e);
            _44();
            function _4a() {
                if (_46) {
                    _46.remove();
                }
                _45.proxy = null;
            };
            function _48() {
                var _4b = false;
                _45._droppables.each(function () {
                    var _4c = $(this);
                    if (_4c._droppable("options").disabled) {
                        return;
                    }
                    var p2 = _4c.offset();
                    if (e.pageX > p2.left && e.pageX < p2.left + _4c.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _4c.outerHeight()) {
                        if (_47.revert) {
                            $(e.data.target).css({
                                position: e.data.startPosition,
                                left: e.data.startLeft,
                                top: e.data.startTop
                            });
                        }
                        $(this).trigger("_drop", [e.data.target]);
                        _4a();
                        _4b = true;
                        this.entered = false;
                        return false;
                    }
                });
                if (!_4b && !_47.revert) {
                    _4a();
                }
                return _4b;
            };
            return false;
        };
        function _44() {
            if ($.fn._draggable.timer) {
                clearTimeout($.fn._draggable.timer);
                $.fn._draggable.timer = undefined;
            }
            $(document).unbind("._draggable");
            $.fn._draggable.isDragging = false;
            setTimeout(function () {
                $("body").css("cursor", "");
            }, 100);
        };
        $.fn._draggable = function (_4d, _4e) {
            if (typeof _4d == "string") {
                return $.fn._draggable.methods[_4d](this, _4e);
            }
            return this.each(function () {
                var _4f;
                var _50 = $.data(this, "_draggable");
                if (_50) {
                    _50.handle.unbind("._draggable");
                    _4f = $.extend(_50.options, _4d);
                } else {
                    _4f = $.extend({}, $.fn._draggable.defaults, $.fn._draggable.parseOptions(this), _4d || {});
                }
                var _51 = _4f.handle ? (typeof _4f.handle == "string" ? $(_4f.handle, this) : _4f.handle) : $(this);
                $.data(this, "_draggable", {options: _4f, handle: _51});
                if (_4f.disabled) {
                    $(this).css("cursor", "");
                    return;
                }
                _51.unbind("._draggable").bind("mousemove._draggable", {target: this}, function (e) {
                    if ($.fn._draggable.isDragging) {
                        return;
                    }
                    var _52 = $.data(e.data.target, "_draggable").options;
                    if (_53(e)) {
                        $(this).css("cursor", _52.cursor);
                    } else {
                        $(this).css("cursor", "");
                    }
                }).bind("mouseleave._draggable", {target: this}, function (e) {
                    $(this).css("cursor", "");
                }).bind("mousedown._draggable", {target: this}, function (e) {
                    if (_53(e) == false) {
                        return;
                    }
                    $(this).css("cursor", "");
                    var _54 = $(e.data.target).position();
                    var _55 = $(e.data.target).offset();
                    var _56 = {
                        startPosition: $(e.data.target).css("position"),
                        startLeft: _54.left,
                        startTop: _54.top,
                        left: _54.left,
                        top: _54.top,
                        startX: e.pageX,
                        startY: e.pageY,
                        offsetWidth: (e.pageX - _55.left),
                        offsetHeight: (e.pageY - _55.top),
                        target: e.data.target,
                        parent: $(e.data.target).parent()[0]
                    };
                    $.extend(e.data, _56);
                    var _57 = $.data(e.data.target, "_draggable").options;
                    if (_57.onBeforeDrag.call(e.data.target, e) == false) {
                        return;
                    }
                    $(document).bind("mousedown._draggable", e.data, _39);
                    $(document).bind("mousemove._draggable", e.data, _3f);
                    $(document).bind("mouseup._draggable", e.data, _43);
                    $.fn._draggable.timer = setTimeout(function () {
                        $.fn._draggable.isDragging = true;
                        _39(e);
                    }, _57.delay);
                    return false;
                });
                function _53(e) {
                    var _58 = $.data(e.data.target, "_draggable");
                    var _59 = _58.handle;
                    var _5a = $(_59).offset();
                    var _5b = $(_59).outerWidth();
                    var _5c = $(_59).outerHeight();
                    var t = e.pageY - _5a.top;
                    var r = _5a.left + _5b - e.pageX;
                    var b = _5a.top + _5c - e.pageY;
                    var l = e.pageX - _5a.left;
                    return Math.min(t, r, b, l) > _58.options.edge;
                };
            });
        };
        $.fn._draggable.methods = {
            options: function (jq) {
                return $.data(jq[0], "_draggable").options;
            }, proxy: function (jq) {
                return $.data(jq[0], "_draggable").proxy;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this)._draggable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this)._draggable({disabled: true});
                });
            }
        };
        $.fn._draggable.parseOptions = function (_5d) {
            var t = $(_5d);
            return $.extend({}, $.parser.parseOptions(_5d, ["cursor", "handle", "axis", {
                "revert": "boolean",
                "deltaX": "number",
                "deltaY": "number",
                "edge": "number",
                "delay": "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn._draggable.defaults = {
            proxy: null,
            revert: false,
            cursor: "move",
            deltaX: null,
            deltaY: null,
            handle: null,
            disabled: false,
            edge: 0,
            axis: null,
            delay: 100,
            onBeforeDrag: function (e) {
            },
            onStartDrag: function (e) {
            },
            onDrag: function (e) {
            },
            onStopDrag: function (e) {
            }
        };
        $.fn._draggable.isDragging = false;
    })(jQuery);
    //dropable
    (function ($) {
        function _5e(_5f) {
            $(_5f).addClass("_droppable");
            $(_5f).bind("_dragenter", function (e, _60) {
                $.data(_5f, "_droppable").options.onDragEnter.apply(_5f, [e, _60]);
            });
            $(_5f).bind("_dragleave", function (e, _61) {
                $.data(_5f, "_droppable").options.onDragLeave.apply(_5f, [e, _61]);
            });
            $(_5f).bind("_dragover", function (e, _62) {
                $.data(_5f, "_droppable").options.onDragOver.apply(_5f, [e, _62]);
            });
            $(_5f).bind("_drop", function (e, _63) {
                $.data(_5f, "_droppable").options.onDrop.apply(_5f, [e, _63]);
            });
        };
        $.fn._droppable = function (_64, _65) {
            if (typeof _64 == "string") {
                return $.fn._droppable.methods[_64](this, _65);
            }
            _64 = _64 || {};
            return this.each(function () {
                var _66 = $.data(this, "_droppable");
                if (_66) {
                    $.extend(_66.options, _64);
                } else {
                    _5e(this);
                    $.data(this, "_droppable", {options: $.extend({}, $.fn._droppable.defaults, $.fn._droppable.parseOptions(this), _64)});
                }
            });
        };
        $.fn._droppable.methods = {
            options: function (jq) {
                return $.data(jq[0], "_droppable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this)._droppable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this)._droppable({disabled: true});
                });
            }
        };
        $.fn._droppable.parseOptions = function (_67) {
            var t = $(_67);
            return $.extend({}, $.parser.parseOptions(_67, ["accept"]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn._droppable.defaults = {
            accept: null, disabled: false, onDragEnter: function (e, _68) {
            }, onDragOver: function (e, _69) {
            }, onDragLeave: function (e, _6a) {
            }, onDrop: function (e, _6b) {
            }
        };
    })(jQuery);
    //resizeable
    (function ($) {
        $.fn._resizable = function (_6c, _6d) {
            if (typeof _6c == "string") {
                return $.fn._resizable.methods[_6c](this, _6d);
            }
            function _6e(e) {
                var _6f = e.data;
                var _70 = $.data(_6f.target, "_resizable").options;
                if (_6f.dir.indexOf("e") != -1) {
                    var _71 = _6f.startWidth + e.pageX - _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                }
                if (_6f.dir.indexOf("s") != -1) {
                    var _72 = _6f.startHeight + e.pageY - _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                }
                if (_6f.dir.indexOf("w") != -1) {
                    var _71 = _6f.startWidth - e.pageX + _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                    _6f.left = _6f.startLeft + _6f.startWidth - _6f.width;
                }
                if (_6f.dir.indexOf("n") != -1) {
                    var _72 = _6f.startHeight - e.pageY + _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                    _6f.top = _6f.startTop + _6f.startHeight - _6f.height;
                }
            };
            function _73(e) {
                var _74 = e.data;
                var t = $(_74.target);
                t.css({left: _74.left, top: _74.top});
                if (t.outerWidth() != _74.width) {
                    t._outerWidth(_74.width);
                }
                if (t.outerHeight() != _74.height) {
                    t._outerHeight(_74.height);
                }
            };
            function _75(e) {
                $.fn._resizable.isResizing = true;
                $.data(e.data.target, "_resizable").options.onStartResize.call(e.data.target, e);
                return false;
            };
            function _76(e) {
                _6e(e);
                if ($.data(e.data.target, "_resizable").options.onResize.call(e.data.target, e) != false) {
                    _73(e);
                }
                return false;
            };
            function _77(e) {
                $.fn._resizable.isResizing = false;
                _6e(e, true);
                _73(e);
                $.data(e.data.target, "_resizable").options.onStopResize.call(e.data.target, e);
                $(document).unbind("._resizable");
                $("body").css("cursor", "");
                return false;
            };
            return this.each(function () {
                var _78 = null;
                var _79 = $.data(this, "_resizable");
                if (_79) {
                    $(this).unbind("._resizable");
                    _78 = $.extend(_79.options, _6c || {});
                } else {
                    _78 = $.extend({}, $.fn._resizable.defaults, $.fn._resizable.parseOptions(this), _6c || {});
                    $.data(this, "_resizable", {options: _78});
                }
                if (_78.disabled == true) {
                    return;
                }
                $(this).bind("mousemove._resizable", {target: this}, function (e) {
                    if ($.fn._resizable.isResizing) {
                        return;
                    }
                    var dir = _7a(e);
                    if (dir == "") {
                        $(e.data.target).css("cursor", "");
                    } else {
                        $(e.data.target).css("cursor", dir + "-resize");
                    }
                }).bind("mouseleave._resizable", {target: this}, function (e) {
                    $(e.data.target).css("cursor", "");
                }).bind("mousedown._resizable", {target: this}, function (e) {
                    var dir = _7a(e);
                    if (dir == "") {
                        return;
                    }
                    function _7b(css) {
                        var val = parseInt($(e.data.target).css(css));
                        if (isNaN(val)) {
                            return 0;
                        } else {
                            return val;
                        }
                    };
                    var _7c = {
                        target: e.data.target,
                        dir: dir,
                        startLeft: _7b("left"),
                        startTop: _7b("top"),
                        left: _7b("left"),
                        top: _7b("top"),
                        startX: e.pageX,
                        startY: e.pageY,
                        startWidth: $(e.data.target).outerWidth(),
                        startHeight: $(e.data.target).outerHeight(),
                        width: $(e.data.target).outerWidth(),
                        height: $(e.data.target).outerHeight(),
                        deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
                        deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
                    };
                    $(document).bind("mousedown._resizable", _7c, _75);
                    $(document).bind("mousemove._resizable", _7c, _76);
                    $(document).bind("mouseup._resizable", _7c, _77);
                    $("body").css("cursor", dir + "-resize");
                });
                function _7a(e) {
                    var tt = $(e.data.target);
                    var dir = "";
                    var _7d = tt.offset();
                    var _7e = tt.outerWidth();
                    var _7f = tt.outerHeight();
                    var _80 = _78.edge;
                    if (e.pageY > _7d.top && e.pageY < _7d.top + _80) {
                        dir += "n";
                    } else {
                        if (e.pageY < _7d.top + _7f && e.pageY > _7d.top + _7f - _80) {
                            dir += "s";
                        }
                    }
                    if (e.pageX > _7d.left && e.pageX < _7d.left + _80) {
                        dir += "w";
                    } else {
                        if (e.pageX < _7d.left + _7e && e.pageX > _7d.left + _7e - _80) {
                            dir += "e";
                        }
                    }
                    var _81 = _78.handles.split(",");
                    for (var i = 0; i < _81.length; i++) {
                        var _82 = _81[i].replace(/(^\s*)|(\s*$)/g, "");
                        if (_82 == "all" || _82 == dir) {
                            return dir;
                        }
                    }
                    return "";
                };
            });
        };
        $.fn._resizable.methods = {
            options: function (jq) {
                return $.data(jq[0], "_resizable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this)._resizable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this)._resizable({disabled: true});
                });
            }
        };
        $.fn._resizable.parseOptions = function (_83) {
            var t = $(_83);
            return $.extend({}, $.parser.parseOptions(_83, ["handles", {
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number",
                edge: "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn._resizable.defaults = {
            disabled: false,
            handles: "n, e, s, w, ne, se, sw, nw, all",
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000,
            edge: 5,
            onStartResize: function (e) {
            },
            onResize: function (e) {
            },
            onStopResize: function (e) {
            }
        };
        $.fn._resizable.isResizing = false;
    })(jQuery);
    //linkbutton
    (function ($) {
        function _84(_85, _86) {
            var _87 = $.data(_85, "linkbutton").options;
            if (_86) {
                $.extend(_87, _86);
            }
            if (_87.width || _87.height || _87.fit) {
                var btn = $(_85);
                var _88 = btn.parent();
                var _89 = btn.is(":visible");
                if (!_89) {
                    var _8a = $("<div style=\"display:none\"></div>").insertBefore(_85);
                    var _8b = {position: btn.css("position"), display: btn.css("display"), left: btn.css("left")};
                    btn.appendTo("body");
                    btn.css({position: "absolute", display: "inline-block", left: -20000});
                }
                btn._size(_87, _88);
                var _8c = btn.find(".l-btn-left");
                _8c.css("margin-top", 0);
                _8c.css("margin-top", parseInt((btn.height() - _8c.height()) / 2) + "px");
                if (!_89) {
                    btn.insertAfter(_8a);
                    btn.css(_8b);
                    _8a.remove();
                }
            }
        };
        function _8d(_8e) {
            var _8f = $.data(_8e, "linkbutton").options;
            var t = $(_8e).empty();
            t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
            t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + _8f.size);
            if (_8f.plain) {
                t.addClass("l-btn-plain");
            }
            if (_8f.outline) {
                t.addClass("l-btn-outline");
            }
            if (_8f.selected) {
                t.addClass(_8f.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            }
            t.attr("group", _8f.group || "");
            t.attr("id", _8f.id || "");
            var _90 = $("<span class=\"l-btn-left\"></span>").appendTo(t);
            if (_8f.text) {
                $("<span class=\"l-btn-text\"></span>").html(_8f.text).appendTo(_90);
            } else {
                $("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_90);
            }
            if (_8f.iconCls) {
                $("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_8f.iconCls).appendTo(_90);
                _90.addClass("l-btn-icon-" + _8f.iconAlign);
            }
            t.unbind(".linkbutton").bind("focus.linkbutton", function () {
                if (!_8f.disabled) {
                    $(this).addClass("l-btn-focus");
                }
            }).bind("blur.linkbutton", function () {
                $(this).removeClass("l-btn-focus");
            }).bind("click.linkbutton", function () {
                if (!_8f.disabled) {
                    if (_8f.toggle) {
                        if (_8f.selected) {
                            $(this).linkbutton("unselect");
                        } else {
                            $(this).linkbutton("select");
                        }
                    }
                    _8f.onClick.call(this);
                }
            });
            _91(_8e, _8f.selected);
            _92(_8e, _8f.disabled);
        };
        function _91(_93, _94) {
            var _95 = $.data(_93, "linkbutton").options;
            if (_94) {
                if (_95.group) {
                    $("a.l-btn[group=\"" + _95.group + "\"]").each(function () {
                        var o = $(this).linkbutton("options");
                        if (o.toggle) {
                            $(this).removeClass("l-btn-selected l-btn-plain-selected");
                            o.selected = false;
                        }
                    });
                }
                $(_93).addClass(_95.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
                _95.selected = true;
            } else {
                if (!_95.group) {
                    $(_93).removeClass("l-btn-selected l-btn-plain-selected");
                    _95.selected = false;
                }
            }
        };
        function _92(_96, _97) {
            var _98 = $.data(_96, "linkbutton");
            var _99 = _98.options;
            $(_96).removeClass("l-btn-disabled l-btn-plain-disabled");
            if (_97) {
                _99.disabled = true;
                var _9a = $(_96).attr("href");
                if (_9a) {
                    _98.href = _9a;
                    $(_96).attr("href", "javascript:void(0)");
                }
                if (_96.onclick) {
                    _98.onclick = _96.onclick;
                    _96.onclick = null;
                }
                _99.plain ? $(_96).addClass("l-btn-disabled l-btn-plain-disabled") : $(_96).addClass("l-btn-disabled");
            } else {
                _99.disabled = false;
                if (_98.href) {
                    $(_96).attr("href", _98.href);
                }
                if (_98.onclick) {
                    _96.onclick = _98.onclick;
                }
            }
        };
        $.fn.linkbutton = function (_9b, _9c) {
            if (typeof _9b == "string") {
                return $.fn.linkbutton.methods[_9b](this, _9c);
            }
            _9b = _9b || {};
            return this.each(function () {
                var _9d = $.data(this, "linkbutton");
                if (_9d) {
                    $.extend(_9d.options, _9b);
                } else {
                    $.data(this, "linkbutton", {options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), _9b)});
                    $(this).removeAttr("disabled");
                    $(this).bind("_resize", function (e, _9e) {
                        if ($(this).hasClass("eui-fluid") || _9e) {
                            _84(this);
                        }
                        return false;
                    });
                }
                _8d(this);
                _84(this);
            });
        };
        $.fn.linkbutton.methods = {
            options: function (jq) {
                return $.data(jq[0], "linkbutton").options;
            }, resize: function (jq, _9f) {
                return jq.each(function () {
                    _84(this, _9f);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _92(this, false);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _92(this, true);
                });
            }, select: function (jq) {
                return jq.each(function () {
                    _91(this, true);
                });
            }, unselect: function (jq) {
                return jq.each(function () {
                    _91(this, false);
                });
            }
        };
        $.fn.linkbutton.parseOptions = function (_a0) {
            var t = $(_a0);
            return $.extend({}, $.parser.parseOptions(_a0, ["id", "iconCls", "iconAlign", "group", "size", {
                plain: "boolean",
                toggle: "boolean",
                selected: "boolean",
                outline: "boolean"
            }]), {
                disabled: (t.attr("disabled") ? true : undefined),
                text: $.trim(t.html()),
                iconCls: (t.attr("icon") || t.attr("iconCls"))
            });
        };
        $.fn.linkbutton.defaults = {
            id: null,
            disabled: false,
            toggle: false,
            selected: false,
            outline: false,
            group: null,
            plain: false,
            text: "",
            iconCls: null,
            iconAlign: "left",
            size: "small",
            onClick: function () {
            }
        };
    })(jQuery);
    //pagination deleted
    //tree deleted
    //progtess deleted
    //etooltip
    (function ($) {
        function init(_1eb) {
            $(_1eb).addClass("etooltip-f");
        };
        function _1ec(_1ed) {
            var opts = $.data(_1ed, "etooltip").options;
            $(_1ed).unbind(".etooltip").bind(opts.showEvent + ".etooltip", function (e) {
                $(_1ed).etooltip("show", e);
            }).bind(opts.hideEvent + ".etooltip", function (e) {
                $(_1ed).etooltip("hide", e);
            }).bind("mousemove.etooltip", function (e) {
                if (opts.trackMouse) {
                    opts.trackMouseX = e.pageX;
                    opts.trackMouseY = e.pageY;
                    $(_1ed).etooltip("reposition");
                }
            });
        };
        function _1ee(_1ef) {
            var _1f0 = $.data(_1ef, "etooltip");
            if (_1f0.showTimer) {
                clearTimeout(_1f0.showTimer);
                _1f0.showTimer = null;
            }
            if (_1f0.hideTimer) {
                clearTimeout(_1f0.hideTimer);
                _1f0.hideTimer = null;
            }
        };
        function _1f1(_1f2) {
            var _1f3 = $.data(_1f2, "etooltip");
            if (!_1f3 || !_1f3.tip) {
                return;
            }
            var opts = _1f3.options;
            var tip = _1f3.tip;
            var pos = {left: -100000, top: -100000};
            if ($(_1f2).is(":visible")) {
                pos = _1f4(opts.position);
                if (opts.position == "top" && pos.top < 0) {
                    pos = _1f4("bottom");
                } else {
                    if ((opts.position == "bottom") && (pos.top + tip._outerHeight() > $(window)._outerHeight() + $(document).scrollTop())) {
                        pos = _1f4("top");
                    }
                }
                if (pos.left < 0) {
                    if (opts.position == "left") {
                        pos = _1f4("right");
                    } else {
                        $(_1f2).etooltip("arrow").css("left", tip._outerWidth() / 2 + pos.left);
                        pos.left = 0;
                    }
                } else {
                    if (pos.left + tip._outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                        if (opts.position == "right") {
                            pos = _1f4("left");
                        } else {
                            var left = pos.left;
                            pos.left = $(window)._outerWidth() + $(document)._scrollLeft() - tip._outerWidth();
                            $(_1f2).etooltip("arrow").css("left", tip._outerWidth() / 2 - (pos.left - left));
                        }
                    }
                }
            }
            tip.css({
                left: pos.left,
                top: pos.top,
                zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))
            });
            opts.onPosition.call(_1f2, pos.left, pos.top);
            function _1f4(_1f5) {
                opts.position = _1f5 || "bottom";
                tip.removeClass("etooltip-top etooltip-bottom etooltip-left etooltip-right").addClass("etooltip-" + opts.position);
                var left, top;
                if (opts.trackMouse) {
                    t = $();
                    left = opts.trackMouseX + opts.deltaX;
                    top = opts.trackMouseY + opts.deltaY;
                } else {
                    var t = $(_1f2);
                    left = t.offset().left + opts.deltaX;
                    top = t.offset().top + opts.deltaY;
                }
                switch (opts.position) {
                    case "right":
                        left += t._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "left":
                        left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "top":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                    case "bottom":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top += t._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                }
                return {left: left, top: top};
            };
        };
        function _1f6(_1f7, e) {
            var _1f8 = $.data(_1f7, "etooltip");
            var opts = _1f8.options;
            var tip = _1f8.tip;
            if (!tip) {
                tip = $("<div tabindex=\"-1\" class=\"etooltip\">" + "<div class=\"etooltip-content\"></div>" + "<div class=\"etooltip-arrow-outer\"></div>" + "<div class=\"etooltip-arrow\"></div>" + "</div>").appendTo("body");
                _1f8.tip = tip;
                _1f9(_1f7);
            }
            _1ee(_1f7);
            _1f8.showTimer = setTimeout(function () {
                $(_1f7).etooltip("reposition");
                tip.show();
                opts.onShow.call(_1f7, e);
                var _1fa = tip.children(".etooltip-arrow-outer");
                var _1fb = tip.children(".etooltip-arrow");
                var bc = "border-" + opts.position + "-color";
                _1fa.add(_1fb).css({
                    borderTopColor: "",
                    borderBottomColor: "",
                    borderLeftColor: "",
                    borderRightColor: ""
                });
                _1fa.css(bc, tip.css(bc));
                _1fb.css(bc, tip.css("backgroundColor"));
            }, opts.showDelay);
        };
        function _1fc(_1fd, e) {
            var _1fe = $.data(_1fd, "etooltip");
            if (_1fe && _1fe.tip) {
                _1ee(_1fd);
                _1fe.hideTimer = setTimeout(function () {
                    _1fe.tip.hide();
                    _1fe.options.onHide.call(_1fd, e);
                }, _1fe.options.hideDelay);
            }
        };
        function _1f9(_1ff, _200) {
            var _201 = $.data(_1ff, "etooltip");
            var opts = _201.options;
            if (_200) {
                opts.content = _200;
            }
            if (!_201.tip) {
                return;
            }
            var cc = typeof opts.content == "function" ? opts.content.call(_1ff) : opts.content;
            _201.tip.children(".etooltip-content").html(cc);
            opts.onUpdate.call(_1ff, cc);
        };
        function _202(_203) {
            var _204 = $.data(_203, "etooltip");
            if (_204) {
                _1ee(_203);
                var opts = _204.options;
                if (_204.tip) {
                    _204.tip.remove();
                }
                if (opts._title) {
                    $(_203).attr("title", opts._title);
                }
                $.removeData(_203, "etooltip");
                $(_203).unbind(".etooltip").removeClass("etooltip-f");
                opts.onDestroy.call(_203);
            }
        };
        $.fn.etooltip = function (_205, _206) {
            if (typeof _205 == "string") {
                return $.fn.etooltip.methods[_205](this, _206);
            }
            _205 = _205 || {};
            return this.each(function () {
                var _207 = $.data(this, "etooltip");
                if (_207) {
                    $.extend(_207.options, _205);
                } else {
                    $.data(this, "etooltip", {options: $.extend({}, $.fn.etooltip.defaults, $.fn.etooltip.parseOptions(this), _205)});
                    init(this);
                }
                _1ec(this);
                _1f9(this);
            });
        };
        $.fn.etooltip.methods = {
            options: function (jq) {
                return $.data(jq[0], "etooltip").options;
            }, tip: function (jq) {
                return $.data(jq[0], "etooltip").tip;
            }, arrow: function (jq) {
                return jq.etooltip("tip").children(".etooltip-arrow-outer,.etooltip-arrow");
            }, show: function (jq, e) {
                return jq.each(function () {
                    _1f6(this, e);
                });
            }, hide: function (jq, e) {
                return jq.each(function () {
                    _1fc(this, e);
                });
            }, update: function (jq, _208) {
                return jq.each(function () {
                    _1f9(this, _208);
                });
            }, reposition: function (jq) {
                return jq.each(function () {
                    _1f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _202(this);
                });
            }
        };
        $.fn.etooltip.parseOptions = function (_209) {
            var t = $(_209);
            var opts = $.extend({}, $.parser.parseOptions(_209, ["position", "showEvent", "hideEvent", "content", {
                trackMouse: "boolean",
                deltaX: "number",
                deltaY: "number",
                showDelay: "number",
                hideDelay: "number"
            }]), {_title: t.attr("title")});
            t.attr("title", "");
            if (!opts.content) {
                opts.content = opts._title;
            }
            return opts;
        };
        $.fn.etooltip.defaults = {
            position: "bottom",
            content: null,
            trackMouse: false,
            deltaX: 0,
            deltaY: 0,
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            showDelay: 200,
            hideDelay: 100,
            onShow: function (e) {
            },
            onHide: function (e) {
            },
            onUpdate: function (_20a) {
            },
            onPosition: function (left, top) {
            },
            onDestroy: function () {
            }
        };
    })(jQuery);
    //pannel
    (function ($) {
        $.fn._remove = function () {
            return this.each(function () {
                $(this).remove();
                try {
                    this.outerHTML = "";
                }
                catch (err) {
                }
            });
        };
        function _20b(node) {
            node._remove();
        };
        function _20c(_20d, _20e) {
            var _20f = $.data(_20d, "epanel");
            var opts = _20f.options;
            var _210 = _20f.epanel;
            var _211 = _210.children(".epanel-header");
            var _212 = _210.children(".epanel-body");
            var _213 = _210.children(".epanel-footer");
            if (_20e) {
                $.extend(opts, {
                    width: _20e.width,
                    height: _20e.height,
                    minWidth: _20e.minWidth,
                    maxWidth: _20e.maxWidth,
                    minHeight: _20e.minHeight,
                    maxHeight: _20e.maxHeight,
                    left: _20e.left,
                    top: _20e.top
                });
            }
            _210._size(opts);
            _211.add(_212)._outerWidth(_210.width());
            if (!isNaN(parseInt(opts.height))) {
                _212._outerHeight(_210.height() - _211._outerHeight() - _213._outerHeight());
            } else {
                _212.css("height", "");
                var min = $.parser.parseValue("minHeight", opts.minHeight, _210.parent());
                var max = $.parser.parseValue("maxHeight", opts.maxHeight, _210.parent());
                var _214 = _211._outerHeight() + _213._outerHeight() + _210._outerHeight() - _210.height();
                _212._size("minHeight", min ? (min - _214) : "");
                _212._size("maxHeight", max ? (max - _214) : "");
            }
            _210.css({height: "", minHeight: "", maxHeight: "", left: opts.left, top: opts.top});
            opts.onResize.apply(_20d, [opts.width, opts.height]);
            $(_20d).epanel("doLayout");
        };
        function _215(_216, _217) {
            var opts = $.data(_216, "epanel").options;
            var _218 = $.data(_216, "epanel").epanel;
            if (_217) {
                if (_217.left != null) {
                    opts.left = _217.left;
                }
                if (_217.top != null) {
                    opts.top = _217.top;
                }
            }
            _218.css({left: opts.left, top: opts.top});
            opts.onMove.apply(_216, [opts.left, opts.top]);
        };
        function _219(_21a) {
            $(_21a).addClass("epanel-body")._size("clear");
            var _21b = $("<div class=\"epanel\"></div>").insertBefore(_21a);
            _21b[0].appendChild(_21a);
            _21b.bind("_resize", function (e, _21c) {
                if ($(this).hasClass("eui-fluid") || _21c) {
                    _20c(_21a);
                }
                return false;
            });
            return _21b;
        };
        function _21d(_21e) {
            var _21f = $.data(_21e, "epanel");
            var opts = _21f.options;
            var _220 = _21f.epanel;
            _220.css(opts.style);
            _220.addClass(opts.cls);
            _221();
            _222();
            var _223 = $(_21e).epanel("header");
            var body = $(_21e).epanel("body");
            var _224 = $(_21e).siblings(".epanel-footer");
            if (opts.border) {
                _223.removeClass("epanel-header-noborder");
                body.removeClass("epanel-body-noborder");
                _224.removeClass("epanel-footer-noborder");
            } else {
                _223.addClass("epanel-header-noborder");
                body.addClass("epanel-body-noborder");
                _224.addClass("epanel-footer-noborder");
            }
            _223.addClass(opts.headerCls);
            body.addClass(opts.bodyCls);
            $(_21e).attr("id", opts.id || "");
            if (opts.content) {
                $(_21e).epanel("clear");
                $(_21e).html(opts.content);
                $.parser.parse($(_21e));
            }
            function _221() {
                if (opts.noheader || (!opts.title && !opts.header)) {
                    _20b(_220.children(".epanel-header"));
                    _220.children(".epanel-body").addClass("epanel-body-noheader");
                } else {
                    if (opts.header) {
                        $(opts.header).addClass("epanel-header").prependTo(_220);
                    } else {
                        var _225 = _220.children(".epanel-header");
                        if (!_225.length) {
                            _225 = $("<div class=\"epanel-header\"></div>").prependTo(_220);
                        }
                        if (!$.isArray(opts.tools)) {
                            _225.find("div.epanel-tool .epanel-tool-a").appendTo(opts.tools);
                        }
                        _225.empty();
                        var _226 = $("<div class=\"epanel-title\"></div>").html(opts.title).appendTo(_225);
                        if (opts.iconCls) {
                            _226.addClass("epanel-with-icon");
                            $("<div class=\"epanel-icon\"></div>").addClass(opts.iconCls).appendTo(_225);
                        }
                        var tool = $("<div class=\"epanel-tool\"></div>").appendTo(_225);
                        tool.bind("click", function (e) {
                            e.stopPropagation();
                        });
                        if (opts.tools) {
                            if ($.isArray(opts.tools)) {
                                $.map(opts.tools, function (t) {
                                    _227(tool, t.iconCls, eval(t.handler));
                                });
                            } else {
                                $(opts.tools).children().each(function () {
                                    $(this).addClass($(this).attr("iconCls")).addClass("epanel-tool-a").appendTo(tool);
                                });
                            }
                        }
                        if (opts.collapsible) {
                            _227(tool, "epanel-tool-collapse", function () {
                                if (opts.collapsed == true) {
                                    _245(_21e, true);
                                } else {
                                    _238(_21e, true);
                                }
                            });
                        }
                        if (opts.minimizable) {
                            _227(tool, "epanel-tool-min", function () {
                                _24b(_21e);
                            });
                        }
                        if (opts.maximizable) {
                            _227(tool, "epanel-tool-max", function () {
                                if (opts.maximized == true) {
                                    _24e(_21e);
                                } else {
                                    _237(_21e);
                                }
                            });
                        }
                        if (opts.closable) {
                            _227(tool, "epanel-tool-close", function () {
                                _239(_21e);
                            });
                        }
                    }
                    _220.children("div.epanel-body").removeClass("epanel-body-noheader");
                }
            };
            function _227(c, icon, _228) {
                var a = $("<a href=\"javascript:void(0)\"></a>").addClass(icon).appendTo(c);
                a.bind("click", _228);
            };
            function _222() {
                if (opts.footer) {
                    $(opts.footer).addClass("epanel-footer").appendTo(_220);
                    $(_21e).addClass("epanel-body-nobottom");
                } else {
                    _220.children(".epanel-footer").remove();
                    $(_21e).removeClass("epanel-body-nobottom");
                }
            };
        };
        function _229(_22a, _22b) {
            var _22c = $.data(_22a, "epanel");
            var opts = _22c.options;
            if (_22d) {
                opts.queryParams = _22b;
            }
            if (!opts.href) {
                return;
            }
            if (!_22c.isLoaded || !opts.cache) {
                var _22d = $.extend({}, opts.queryParams);
                if (opts.onBeforeLoad.call(_22a, _22d) == false) {
                    return;
                }
                _22c.isLoaded = false;
                $(_22a).epanel("clear");
                if (opts.loadingMessage) {
                    $(_22a).html($("<div class=\"epanel-loading\"></div>").html(opts.loadingMessage));
                }
                opts.loader.call(_22a, _22d, function (data) {
                    var _22e = opts.extractor.call(_22a, data);
                    $(_22a).html(_22e);
                    $.parser.parse($(_22a));
                    opts.onLoad.apply(_22a, arguments);
                    _22c.isLoaded = true;
                }, function () {
                    opts.onLoadError.apply(_22a, arguments);
                });
            }
        };
        function _22f(_230) {
            var t = $(_230);
            t.find(".combo-f").each(function () {
                $(this).combo("destroy");
            });
            t.find(".m-btn").each(function () {
                $(this).menubutton("destroy");
            });
            t.find(".s-btn").each(function () {
                $(this).splitbutton("destroy");
            });
            t.find(".etooltip-f").each(function () {
                $(this).etooltip("destroy");
            });
            t.children("div").each(function () {
                $(this)._size("unfit");
            });
            t.empty();
        };
        function _231(_232) {
            $(_232).epanel("doLayout", true);
        };
        function _233(_234, _235) {
            var opts = $.data(_234, "epanel").options;
            var _236 = $.data(_234, "epanel").epanel;
            if (_235 != true) {
                if (opts.onBeforeOpen.call(_234) == false) {
                    return;
                }
            }
            _236.stop(true, true);
            if ($.isFunction(opts.openAnimation)) {
                opts.openAnimation.call(_234, cb);
            } else {
                switch (opts.openAnimation) {
                    case "slide":
                        _236.slideDown(opts.openDuration, cb);
                        break;
                    case "fade":
                        _236.fadeIn(opts.openDuration, cb);
                        break;
                    case "show":
                        _236.show(opts.openDuration, cb);
                        break;
                    default:
                        _236.show();
                        cb();
                }
            }
            function cb() {
                opts.closed = false;
                opts.minimized = false;
                var tool = _236.children(".epanel-header").find("a.epanel-tool-restore");
                if (tool.length) {
                    opts.maximized = true;
                }
                opts.onOpen.call(_234);
                if (opts.maximized == true) {
                    opts.maximized = false;
                    _237(_234);
                }
                if (opts.collapsed == true) {
                    opts.collapsed = false;
                    _238(_234);
                }
                if (!opts.collapsed) {
                    _229(_234);
                    _231(_234);
                }
            };
        };
        function _239(_23a, _23b) {
            var opts = $.data(_23a, "epanel").options;
            var _23c = $.data(_23a, "epanel").epanel;
            if (_23b != true) {
                if (opts.onBeforeClose.call(_23a) == false) {
                    return;
                }
            }
            _23c.stop(true, true);
            _23c._size("unfit");
            if ($.isFunction(opts.closeAnimation)) {
                opts.closeAnimation.call(_23a, cb);
            } else {
                switch (opts.closeAnimation) {
                    case "slide":
                        _23c.slideUp(opts.closeDuration, cb);
                        break;
                    case "fade":
                        _23c.fadeOut(opts.closeDuration, cb);
                        break;
                    case "hide":
                        _23c.hide(opts.closeDuration, cb);
                        break;
                    default:
                        _23c.hide();
                        if(_23c.children('.epanel-body')[0].hasAttribute('dynamic')){
                            _23c.next('.window-shadow').next('.window-mask').remove() &&_23c.next('.window-shadow').remove() &&_23c.remove();
                        }else{
                            _23c.removeClass('animated');
                        }
                        top.hideMask();
                        cb();
                }
            }
            function cb() {
                opts.closed = true;
                opts.onClose.call(_23a);
            };
        };
        function _23d(_23e, _23f) {
            var _240 = $.data(_23e, "epanel");
            var opts = _240.options;
            var _241 = _240.epanel;
            if (_23f != true) {
                if (opts.onBeforeDestroy.call(_23e) == false) {
                    return;
                }
            }
            $(_23e).epanel("clear").epanel("clear", "footer");
            _20b(_241);
            opts.onDestroy.call(_23e);
        };
        function _238(_242, _243) {
            var opts = $.data(_242, "epanel").options;
            var _244 = $.data(_242, "epanel").epanel;
            var body = _244.children(".epanel-body");
            var tool = _244.children(".epanel-header").find("a.epanel-tool-collapse");
            if (opts.collapsed == true) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeCollapse.call(_242) == false) {
                return;
            }
            tool.addClass("epanel-tool-expand");
            if (_243 == true) {
                body.slideUp("normal", function () {
                    opts.collapsed = true;
                    opts.onCollapse.call(_242);
                });
            } else {
                body.hide();
                opts.collapsed = true;
                opts.onCollapse.call(_242);
            }
        };
        function _245(_246, _247) {
            var opts = $.data(_246, "epanel").options;
            var _248 = $.data(_246, "epanel").epanel;
            var body = _248.children(".epanel-body");
            var tool = _248.children(".epanel-header").find("a.epanel-tool-collapse");
            if (opts.collapsed == false) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeExpand.call(_246) == false) {
                return;
            }
            tool.removeClass("epanel-tool-expand");
            if (_247 == true) {
                body.slideDown("normal", function () {
                    opts.collapsed = false;
                    opts.onExpand.call(_246);
                    _229(_246);
                    _231(_246);
                });
            } else {
                body.show();
                opts.collapsed = false;
                opts.onExpand.call(_246);
                _229(_246);
                _231(_246);
            }
        };
        function _237(_249) {
            var opts = $.data(_249, "epanel").options;
            var _24a = $.data(_249, "epanel").epanel;
            var tool = _24a.children(".epanel-header").find("a.epanel-tool-max");
            if (opts.maximized == true) {
                return;
            }
            tool.addClass("epanel-tool-restore");
            if (!$.data(_249, "epanel").original) {
                $.data(_249, "epanel").original = {
                    width: opts.width,
                    height: opts.height,
                    left: opts.left,
                    top: opts.top,
                    fit: opts.fit
                };
            }
            opts.left = 0;
            opts.top = 0;
            opts.fit = true;
            _20c(_249);
            opts.minimized = false;
            opts.maximized = true;
            opts.onMaximize.call(_249);
        };
        function _24b(_24c) {
            var opts = $.data(_24c, "epanel").options;
            var _24d = $.data(_24c, "epanel").epanel;
            _24d._size("unfit");
            _24d.hide();
            opts.minimized = true;
            opts.maximized = false;
            opts.onMinimize.call(_24c);
        };
        function _24e(_24f) {
            var opts = $.data(_24f, "epanel").options;
            var _250 = $.data(_24f, "epanel").epanel;
            var tool = _250.children(".epanel-header").find("a.epanel-tool-max");
            if (opts.maximized == false) {
                return;
            }
            _250.show();
            tool.removeClass("epanel-tool-restore");
            $.extend(opts, $.data(_24f, "epanel").original);
            _20c(_24f);
            opts.minimized = false;
            opts.maximized = false;
            $.data(_24f, "epanel").original = null;
            opts.onRestore.call(_24f);
        };
        function _251(_252, _253) {
            $.data(_252, "epanel").options.title = _253;
            $(_252).epanel("header").find("div.epanel-title").html(_253);
        };
        var _254 = null;
        $(window).unbind(".epanel").bind("resize.epanel", function () {
            if (_254) {
                clearTimeout(_254);
            }
            _254 = setTimeout(function () {
                var _255 = $("body.layout");
                if (_255.length) {
                    _255.layout("resize");
                    $("body").children(".eui-fluid:visible").each(function () {
                        $(this).triggerHandler("_resize");
                    });
                } else {
                    $("body").epanel("doLayout");
                }
                _254 = null;
            }, 100);
        });
        $.fn.epanel = function (_256, _257) {
            if (typeof _256 == "string") {
                return $.fn.epanel.methods[_256](this, _257);
            }
            _256 = _256 || {};
            return this.each(function () {
                var _258 = $.data(this, "epanel");
                var opts;
                if (_258) {
                    opts = $.extend(_258.options, _256);
                    _258.isLoaded = false;
                } else {
                    opts = $.extend({}, $.fn.epanel.defaults, $.fn.epanel.parseOptions(this), _256);
                    $(this).attr("title", "");
                    _258 = $.data(this, "epanel", {options: opts, epanel: _219(this), isLoaded: false});
                }
                _21d(this);
                if (opts.doSize == true) {
                    _258.epanel.css("display", "block");
                    _20c(this);
                }
                if (opts.closed == true || opts.minimized == true) {
                    _258.epanel.hide();
                } else {
                    _233(this);
                }
            });
        };
        $.fn.epanel.methods = {
            options: function (jq) {
                return $.data(jq[0], "epanel").options;
            }, epanel: function (jq) {
                return $.data(jq[0], "epanel").epanel;
            }, header: function (jq) {
                return $.data(jq[0], "epanel").epanel.children(".epanel-header");
            }, footer: function (jq) {
                return jq.epanel("epanel").children(".epanel-footer");
            }, body: function (jq) {
                return $.data(jq[0], "epanel").epanel.children(".epanel-body");
            }, setTitle: function (jq, _259) {
                return jq.each(function () {
                    _251(this, _259);
                });
            }, open: function (jq, _25a) {
                return jq.each(function () {
                    _233(this, _25a);
                });
            }, close: function (jq, _25b) {
                return jq.each(function () {
                    _239(this, _25b);
                });
            }, destroy: function (jq, _25c) {
                return jq.each(function () {
                    _23d(this, _25c);
                });
            }, clear: function (jq, type) {
                return jq.each(function () {
                    _22f(type == "footer" ? $(this).epanel("footer") : this);
                });
            }, refresh: function (jq, href) {
                return jq.each(function () {
                    var _25d = $.data(this, "epanel");
                    _25d.isLoaded = false;
                    if (href) {
                        if (typeof href == "string") {
                            _25d.options.href = href;
                        } else {
                            _25d.options.queryParams = href;
                        }
                    }
                    _229(this);
                });
            }, resize: function (jq, _25e) {
                return jq.each(function () {
                    _20c(this, _25e);
                });
            }, doLayout: function (jq, all) {
                return jq.each(function () {
                    _25f(this, "body");
                    _25f($(this).siblings(".epanel-footer")[0], "footer");
                    function _25f(_260, type) {
                        if (!_260) {
                            return;
                        }
                        var _261 = _260 == $("body")[0];
                        var s = $(_260).find("div.epanel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.eui-fluid:visible").filter(function (_262, el) {
                            var p = $(el).parents(".epanel-" + type + ":first");
                            return _261 ? p.length == 0 : p[0] == _260;
                        });
                        s.each(function () {
                            $(this).triggerHandler("_resize", [all || false]);
                        });
                    };
                });
            }, move: function (jq, _263) {
                return jq.each(function () {
                    _215(this, _263);
                });
            }, maximize: function (jq) {
                return jq.each(function () {
                    _237(this);
                });
            }, minimize: function (jq) {
                return jq.each(function () {
                    _24b(this);
                });
            }, restore: function (jq) {
                return jq.each(function () {
                    _24e(this);
                });
            }, collapse: function (jq, _264) {
                return jq.each(function () {
                    _238(this, _264);
                });
            }, expand: function (jq, _265) {
                return jq.each(function () {
                    _245(this, _265);
                });
            }
        };
        $.fn.epanel.parseOptions = function (_266) {
            var t = $(_266);
            var hh = t.children(".epanel-header,header");
            var ff = t.children(".epanel-footer,footer");
            return $.extend({}, $.parser.parseOptions(_266, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
                cache: "boolean",
                fit: "boolean",
                border: "boolean",
                noheader: "boolean"
            }, {collapsible: "boolean", minimizable: "boolean", maximizable: "boolean"}, {
                closable: "boolean",
                collapsed: "boolean",
                minimized: "boolean",
                maximized: "boolean",
                closed: "boolean"
            }, "openAnimation", "closeAnimation", {
                openDuration: "number",
                closeDuration: "number"
            },]), {
                loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined),
                header: (hh.length ? hh.removeClass("epanel-header") : undefined),
                footer: (ff.length ? ff.removeClass("epanel-footer") : undefined)
            });
        };
        $.fn.epanel.defaults = {
            id: null,
            title: null,
            iconCls: null,
            width: "auto",
            height: "auto",
            left: null,
            top: null,
            cls: null,
            headerCls: null,
            bodyCls: null,
            style: {},
            href: null,
            cache: true,
            fit: false,
            border: true,
            doSize: true,
            noheader: false,
            content: null,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            collapsed: false,
            minimized: false,
            maximized: false,
            closed: false,
            openAnimation: false,
            openDuration: 400,
            closeAnimation: false,
            closeDuration: 400,
            tools: null,
            footer: null,
            header: null,
            queryParams: {},
            method: "get",
            href: null,
            loadingMessage: "Loading...",
            loader: function (_267, _268, _269) {
                var opts = $(this).epanel("options");
                if (!opts.href) {
                    return false;
                }
                $.ajax({
                    type: opts.method,
                    url: opts.href,
                    cache: false,
                    data: _267,
                    dataType: "html",
                    success: function (data) {
                        _268(data);
                    },
                    error: function () {
                        _269.apply(this, arguments);
                    }
                });
            },
            extractor: function (data) {
                var _26a = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                var _26b = _26a.exec(data);
                if (_26b) {
                    return _26b[1];
                } else {
                    return data;
                }
            },
            onBeforeLoad: function (_26c) {
            },
            onLoad: function () {
            },
            onLoadError: function () {
            },
            onBeforeOpen: function () {
            },
            onOpen: function () {
            },
            onBeforeClose: function () {
            },
            onClose: function () {
            },
            onBeforeDestroy: function () {
            },
            onDestroy: function () {
            },
            onResize: function (_26d, _26e) {
            },
            onMove: function (left, top) {
            },
            onMaximize: function () {
            },
            onRestore: function () {
            },
            onMinimize: function () {
            },
            onBeforeCollapse: function () {
            },
            onBeforeExpand: function () {
            },
            onCollapse: function () {
            },
            onExpand: function () {
            }
        };
    })(jQuery);
    //window
    (function ($) {
        function _26f(_270, _271) {
            var _272 = $.data(_270, "window");
            if (_271) {
                if (_271.left != null) {
                    _272.options.left = _271.left;
                }
                if (_271.top != null) {
                    _272.options.top = _271.top;
                }
            }
            $(_270).epanel("move", _272.options);
            if (_272.shadow) {
                _272.shadow.css({left: _272.options.left, top: _272.options.top});
            }
        };
        function _273(_274, _275) {
            var opts = $.data(_274, "window").options;
            var pp = $(_274).window("epanel");
            var _276 = pp._outerWidth();
            if (opts.inline) {
                var _277 = pp.parent();
                opts.left = Math.ceil((_277.width() - _276) / 2 + _277.scrollLeft());
            } else {
                opts.left = Math.ceil(($(window)._outerWidth() - _276) / 2 + $(document).scrollLeft());
            }
            if (_275) {
                _26f(_274);
            }
        };
        function _278(_279, _27a) {
            var opts = $.data(_279, "window").options;
            var pp = $(_279).window("epanel");
            var _27b = pp._outerHeight();
            if (opts.inline) {
                var _27c = pp.parent();
                opts.top = Math.ceil((_27c.height() - _27b) / 2 + _27c.scrollTop());
            } else {
                opts.top = Math.ceil(($(window)._outerHeight() - _27b) / 2 + $(document).scrollTop());
            }
            if (_27a) {
                _26f(_279);
            }
        };
        function _27d(_27e) {
            var _27f = $.data(_27e, "window");
            var opts = _27f.options;
            var win = $(_27e).epanel($.extend({}, _27f.options, {
                border: false,
                doSize: true,
                closed: true,
                cls: "window",
                headerCls: "window-header",
                bodyCls: "window-body " + (opts.noheader ? "window-body-noheader" : ""),
                onBeforeDestroy: function () {
                    if (opts.onBeforeDestroy.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.remove();
                    }
                    if (_27f.mask) {
                        _27f.mask.remove();
                    }
                },
                onClose: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    opts.onClose.call(_27e);
                },
                onOpen: function () {
                    if (_27f.mask) {
                        _27f.mask.css({display: "block", zIndex: $.fn.window.defaults.zIndex++});
                    }
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            display: "block",
                            zIndex: $.fn.window.defaults.zIndex++,
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    _27f.window.css("z-index", $.fn.window.defaults.zIndex++);
                    opts.onOpen.call(_27e);
                },
                onResize: function (_280, _281) {
                    var _282 = $(this).epanel("options");
                    $.extend(opts, {width: _282.width, height: _282.height, left: _282.left, top: _282.top});
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    opts.onResize.call(_27e, _280, _281);
                },
                onMinimize: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    _27f.options.onMinimize.call(_27e);
                },
                onBeforeCollapse: function () {
                    if (opts.onBeforeCollapse.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                },
                onExpand: function () {
                    if (_27f.shadow) {
                        _27f.shadow.show();
                    }
                    opts.onExpand.call(_27e);
                }
            }));
            _27f.window = win.epanel("epanel");
            if (_27f.mask) {
                _27f.mask.remove();
            }
            if (opts.modal == true) {
                _27f.mask = $("<div class=\"window-mask\"></div>").insertAfter(_27f.window);
                _27f.mask.css({
                    width: (opts.inline ? _27f.mask.parent().width() : _283().width),
                    height: (opts.inline ? _27f.mask.parent().height() : _283().height),
                    display: "none"
                });
            }
            if (_27f.shadow) {
                _27f.shadow.remove();
            }
            if (opts.shadow == true) {
                _27f.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(_27f.window);
                _27f.shadow.css({display: "none"});
            }
            if (opts.left == null) {
                _273(_27e);
            }
            if (opts.top == null) {
                _278(_27e);
            }
            _26f(_27e);
            if (!opts.closed) {
                win.window("open");
            }
        };
        function _284(_285) {
            var _286 = $.data(_285, "window");
            _286.window._draggable({
                handle: ">div.epanel-header>div.epanel-title",
                disabled: _286.options._draggable == false,
                onStartDrag: function (e) {
                    if (_286.mask) {
                        _286.mask.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    if (_286.shadow) {
                        _286.shadow.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    _286.window.css("z-index", $.fn.window.defaults.zIndex++);
                    if (!_286.proxy) {
                        _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    }
                    _286.proxy.css({
                        display: "none",
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top
                    });
                    _286.proxy._outerWidth(_286.window._outerWidth());
                    _286.proxy._outerHeight(_286.window._outerHeight());
                    setTimeout(function () {
                        if (_286.proxy) {
                            _286.proxy.show();
                        }
                    }, 500);
                },
                onDrag: function (e) {
                    _286.proxy.css({display: "block", left: e.data.left, top: e.data.top});
                    return false;
                },
                onStopDrag: function (e) {
                    _286.options.left = e.data.left;
                    _286.options.top = e.data.top;
                    $(_285).window("move");
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
            _286.window._resizable({
                disabled: _286.options._resizable == false, onStartResize: function (e) {
                    if (_286.pmask) {
                        _286.pmask.remove();
                    }
                    _286.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(_286.window);
                    _286.pmask.css({
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top,
                        width: _286.window._outerWidth(),
                        height: _286.window._outerHeight()
                    });
                    if (_286.proxy) {
                        _286.proxy.remove();
                    }
                    _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    _286.proxy.css({zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
                }, onResize: function (e) {
                    _286.proxy.css({left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width);
                    _286.proxy._outerHeight(e.data.height);
                    return false;
                }, onStopResize: function (e) {
                    $(_285).window("resize", e.data);
                    _286.pmask.remove();
                    _286.pmask = null;
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
        };
        function _283() {
            if (document.compatMode == "BackCompat") {
                return {
                    width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                    height: Math.max(document.body.scrollHeight, document.body.clientHeight)
                };
            } else {
                return {
                    width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                    height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
                };
            }
        };
        $(window).resize(function () {
            $("body>div.window-mask").css({width: $(window)._outerWidth(), height: $(window)._outerHeight()});
            setTimeout(function () {
                $("body>div.window-mask").css({width: _283().width, height: _283().height});
            }, 50);
        });
        $.fn.window = function (_287, _288) {
            if (typeof _287 == "string") {
                var _289 = $.fn.window.methods[_287];
                if (_289) {
                    return _289(this, _288);
                } else {
                    return this.epanel(_287, _288);
                }
            }
            _287 = _287 || {};
            return this.each(function () {
                var _28a = $.data(this, "window");
                if (_28a) {
                    $.extend(_28a.options, _287);
                } else {
                    _28a = $.data(this, "window", {options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), _287)});
                    if (!_28a.options.inline) {
                        document.body.appendChild(this);
                    }
                }
                _27d(this);
                _284(this);
            });
        };
        $.fn.window.methods = {
            options: function (jq) {
                var _28b = jq.epanel("options");
                var _28c = $.data(jq[0], "window").options;
                return $.extend(_28c, {
                    closed: _28b.closed,
                    collapsed: _28b.collapsed,
                    minimized: _28b.minimized,
                    maximized: _28b.maximized
                });
            }, window: function (jq) {
                return $.data(jq[0], "window").window;
            }, move: function (jq, _28d) {
                return jq.each(function () {
                    _26f(this, _28d);
                });
            }, hcenter: function (jq) {
                return jq.each(function () {
                    _273(this, true);
                });
            }, vcenter: function (jq) {
                return jq.each(function () {
                    _278(this, true);
                });
            }, center: function (jq) {
                return jq.each(function () {
                    _273(this);
                    _278(this);
                    _26f(this);
                });
            }
        };
        $.fn.window.parseOptions = function (_28e) {
            return $.extend({}, $.fn.epanel.parseOptions(_28e), $.parser.parseOptions(_28e, [{
                _draggable: "boolean",
                _resizable: "boolean",
                shadow: "boolean",
                modal: "boolean",
                inline: "boolean"
            }]));
        };
        $.fn.window.defaults = $.extend({}, $.fn.epanel.defaults, {
            zIndex: 9000,
            _draggable: true,
            _resizable: true,
            shadow: true,
            modal: false,
            inline: false,
            title: "  ",
            collapsible: true,
            minimizable: true,
            maximizable: true,
            closable: true,
            closed: false
        });
    })(jQuery);
    //dialog
    (function ($) {
        function _28f(_290) {
            var opts = $.data(_290, "dialog").options;
            opts.inited = false;
            $(_290).window($.extend({}, opts, {
                onResize: function (w, h) {
                    if (opts.inited) {
                        _295(this);
                        opts.onResize.call(this, w, h);
                    }
                }
            }));
            var win = $(_290).window("window");
            if (opts.toolbar) {
                if ($.isArray(opts.toolbar)) {
                    $(_290).siblings("div.dialog-toolbar").remove();
                    var _291 = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
                    var tr = _291.find("tr");
                    for (var i = 0; i < opts.toolbar.length; i++) {
                        var btn = opts.toolbar[i];
                        if (btn == "-") {
                            $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                        } else {
                            var td = $("<td></td>").appendTo(tr);
                            var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                            tool[0].onclick = eval(btn.handler || function () {
                                });
                            tool.linkbutton($.extend({}, btn, {plain: true}));
                        }
                    }
                } else {
                    $(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
                    $(opts.toolbar).show();
                }
            } else {
                $(_290).siblings("div.dialog-toolbar").remove();
            }
            if (opts.buttons) {
                if ($.isArray(opts.buttons)) {
                    $(_290).siblings("div.dialog-button").remove();
                    var _292 = $("<div class=\"dialog-button\"></div>").appendTo(win);
                    for (var i = 0; i < opts.buttons.length; i++) {
                        var p = opts.buttons[i];
                        var _293 = $("<a href=\"javascript:void(0)\"></a>").appendTo(_292);
                        if (p.handler) {
                            _293[0].onclick = p.handler;
                        }
                        _293.linkbutton(p);
                    }
                } else {
                    $(opts.buttons).addClass("dialog-button").appendTo(win);
                    $(opts.buttons).show();
                }
            } else {
                $(_290).siblings("div.dialog-button").remove();
            }
            opts.inited = true;
            var _294 = opts.closed;
            win.show();
            $(_290).window("resize");
            if (_294) {
                win.hide();
            }
        };
        function _295(_296, _297) {
            var t = $(_296);
            var opts = t.dialog("options");
            var _298 = opts.noheader;
            var tb = t.siblings(".dialog-toolbar");
            var bb = t.siblings(".dialog-button");
            tb.insertBefore(_296).css({
                position: "relative",
                borderTopWidth: (_298 ? 1 : 0),
                top: (_298 ? tb.length : 0)
            });
            bb.insertAfter(_296).css({position: "relative", top: -1});
            tb.add(bb)._outerWidth(t._outerWidth()).find(".eui-fluid:visible").each(function () {
                $(this).triggerHandler("_resize");
            });
            if (!isNaN(parseInt(opts.height))) {
                t._outerHeight(t._outerHeight() - tb._outerHeight() - bb._outerHeight());
            }
            var _299 = $.data(_296, "window").shadow;
            if (_299) {
                var cc = t.epanel("epanel");
                _299.css({width: cc._outerWidth(), height: cc._outerHeight()});
            }
        };
        $.fn.dialog = function (_29a, _29b) {
            if (typeof _29a == "string") {
                var _29c = $.fn.dialog.methods[_29a];
                if (_29c) {
                    return _29c(this, _29b);
                } else {
                    return this.window(_29a, _29b);
                }
            }
            _29a = _29a || {};
            return this.each(function () {
                var _29d = $.data(this, "dialog");
                if (_29d) {
                    $.extend(_29d.options, _29a);
                } else {
                    $.data(this, "dialog", {options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _29a)});
                }
                _28f(this);
            });
        };
        $.fn.dialog.methods = {
            options: function (jq) {
                var _29e = $.data(jq[0], "dialog").options;
                var _29f = jq.epanel("options");
                $.extend(_29e, {
                    width: _29f.width,
                    height: _29f.height,
                    left: _29f.left,
                    top: _29f.top,
                    closed: _29f.closed,
                    collapsed: _29f.collapsed,
                    minimized: _29f.minimized,
                    maximized: _29f.maximized
                });
                return _29e;
            }, dialog: function (jq) {
                return jq.window("window");
            }
        };
        $.fn.dialog.parseOptions = function (_2a0) {
            var t = $(_2a0);
            return $.extend({}, $.fn.window.parseOptions(_2a0), $.parser.parseOptions(_2a0, ["toolbar", "buttons"]), {
                toolbar: (t.children(".dialog-toolbar").length ? t.children(".dialog-toolbar").removeClass("dialog-toolbar") : undefined),
                buttons: (t.children(".dialog-button").length ? t.children(".dialog-button").removeClass("dialog-button") : undefined)
            });
        };
        $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
            title: "New Dialog",
            collapsible: false,
            minimizable: false,
            maximizable: false,
            _resizable: false,
            toolbar: null,
            buttons: null
        });
    })(jQuery);
    //messager
    (function ($) {
        function _2a1() {
            $(document).unbind(".messager").bind("keydown.messager", function (e) {
                if (e.keyCode == 27) {
                    $("body").children("div.messager-window").children("div.messager-body").each(function () {
                        $(this).window("close");
                    });
                } else {
                    if (e.keyCode == 9) {
                        var win = $("body").children("div.messager-window").children("div.messager-body");
                        if (!win.length) {
                            return;
                        }
                        var _2a2 = win.find(".messager-input,.messager-button .l-btn");
                        for (var i = 0; i < _2a2.length; i++) {
                            if ($(_2a2[i]).is(":focus")) {
                                $(_2a2[i >= _2a2.length - 1 ? 0 : i + 1]).focus();
                                return false;
                            }
                        }
                    }
                }
            });
        };
        function _2a3() {
            $(document).unbind(".messager");
        };
        function _2a4(_2a5) {
            var opts = $.extend({}, $.messager.defaults, {
                modal: false,
                shadow: false,
                _draggable: false,
                _resizable: false,
                closed: true,
                style: {
                    left: "",
                    top: "",
                    right: 0,
                    zIndex: $.fn.window.defaults.zIndex++,
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                },
                title: "",
                width: 250,
                height: 100,
                showType: "slide",
                showSpeed: 600,
                msg: "",
                timeout: 4000
            }, _2a5);
            var win = $("<div class=\"messager-body\"></div>").html(opts.msg).appendTo("body");
            win.window($.extend({}, opts, {
                openAnimation: (opts.showType),
                closeAnimation: (opts.showType == "show" ? "hide" : opts.showType),
                openDuration: opts.showSpeed,
                closeDuration: opts.showSpeed,
                onOpen: function () {
                    win.window("window").hover(function () {
                        if (opts.timer) {
                            clearTimeout(opts.timer);
                        }
                    }, function () {
                        _2a6();
                    });
                    _2a6();
                    function _2a6() {
                        if (opts.timeout > 0) {
                            opts.timer = setTimeout(function () {
                                if (win.length && win.data("window")) {
                                    win.window("close");
                                }
                            }, opts.timeout);
                        }
                    };
                    if (_2a5.onOpen) {
                        _2a5.onOpen.call(this);
                    } else {
                        opts.onOpen.call(this);
                    }
                },
                onClose: function () {
                    if (opts.timer) {
                        clearTimeout(opts.timer);
                    }
                    if (_2a5.onClose) {
                        _2a5.onClose.call(this);
                    } else {
                        opts.onClose.call(this);
                    }
                    win.window("destroy");
                }
            }));
            win.window("window").css(opts.style);
            win.window("open");
            return win;
        };
        function _2a7(_2a8) {
            _2a1();
            var win = $("<div class=\"messager-body\"></div>").appendTo("body");
            win.window($.extend({}, _2a8, {
                doSize: false, noheader: (_2a8.title ? false : true), onClose: function () {
                    _2a3();
                    if (_2a8.onClose) {
                        _2a8.onClose.call(this);
                    }
                    setTimeout(function () {
                        win.window("destroy");
                    }, 100);
                }
            }));
            if (_2a8.buttons && _2a8.buttons.length) {
                var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
                $.map(_2a8.buttons, function (btn) {
                    $("<a href=\"javascript:void(0)\" style=\"margin-left:10px\"></a>").appendTo(tb).linkbutton(btn);
                });
            }
            win.window("window").addClass("messager-window");
            win.window("resize");
            win.children("div.messager-button").children("a:first").focus();
            return win;
        };
        $.messager = {
            show: function (_2a9) {
                return _2a4(_2a9);
            }, alert: function (_2aa, msg, icon, fn) {
                var opts = typeof _2aa == "object" ? _2aa : {title: _2aa, msg: msg, icon: icon, fn: fn};
                var cls = opts.icon ? "messager-icon messager-" + opts.icon : "";
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"" + cls + "\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, confirm: function (_2ab, msg, fn) {
                var opts = typeof _2ab == "object" ? _2ab : {title: _2ab, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(true);
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn(false);
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, prompt: function (_2ac, msg, fn) {
                var opts = typeof _2ac == "object" ? _2ac : {title: _2ac, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(win.find(".messager-input").val());
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                win.find("input.messager-input").focus();
                return win;
            }, progress: function (_2ad) {
                var _2ae = {
                    bar: function () {
                        return $("body>div.messager-window").find("div.messager-p-bar");
                    }, close: function () {
                        var win = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                        if (win.length) {
                            win.window("close");
                        }
                    }
                };
                if (typeof _2ad == "string") {
                    var _2af = _2ae[_2ad];
                    return _2af();
                }
                var opts = $.extend({}, {
                    title: "",
                    content: undefined,
                    msg: "",
                    text: undefined,
                    interval: 300
                }, _2ad || {});
                var win = _2a7($.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-progress\"><div class=\"messager-p-msg\">" + opts.msg + "</div><div class=\"messager-p-bar\"></div></div>",
                    closable: false,
                    doSize: false
                }, opts, {
                    onClose: function () {
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        if (_2ad.onClose) {
                            _2ad.onClose.call(this);
                        } else {
                            $.messager.defaults.onClose.call(this);
                        }
                    }
                }));
                var bar = win.find("div.messager-p-bar");
                bar.progressbar({text: opts.text});
                win.window("resize");
                if (opts.interval) {
                    win[0].timer = setInterval(function () {
                        var v = bar.progressbar("getValue");
                        v += 10;
                        if (v > 100) {
                            v = 0;
                        }
                        bar.progressbar("setValue", v);
                    }, opts.interval);
                }
                return win;
            }
        };
        $.messager.defaults = $.extend({}, $.fn.window.defaults, {
            ok: "确定",
            cancel: "取消",
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            _resizable: false,
            fn: function () {
            }
        });
    })(jQuery);
    //accordion
    (function ($) {
        function _2b0(_2b1, _2b2) {
            var _2b3 = $.data(_2b1, "accordion");
            var opts = _2b3.options;
            var _2b4 = _2b3.epanels;
            var cc = $(_2b1);
            if (_2b2) {
                $.extend(opts, {width: _2b2.width, height: _2b2.height});
            }
            cc._size(opts);
            var _2b5 = 0;
            var _2b6 = "auto";
            var _2b7 = cc.find(">.epanel>.accordion-header");
            if (_2b7.length) {
                _2b5 = $(_2b7[0]).css("height", "")._outerHeight();
            }
            if (!isNaN(parseInt(opts.height))) {
                _2b6 = cc.height() - _2b5 * _2b7.length;
            }
            _2b8(true, _2b6 - _2b8(false) + 1);
            function _2b8(_2b9, _2ba) {
                var _2bb = 0;
                for (var i = 0; i < _2b4.length; i++) {
                    var p = _2b4[i];
                    var h = p.epanel("header")._outerHeight(_2b5);
                    if (p.epanel("options").collapsible == _2b9) {
                        var _2bc = isNaN(_2ba) ? undefined : (_2ba + _2b5 * h.length);
                        p.epanel("resize", {width: cc.width(), height: (_2b9 ? _2bc : undefined)});
                        _2bb += p.epanel("epanel").outerHeight() - _2b5 * h.length;
                    }
                }
                return _2bb;
            };
        };
        function _2bd(_2be, _2bf, _2c0, all) {
            var _2c1 = $.data(_2be, "accordion").epanels;
            var pp = [];
            for (var i = 0; i < _2c1.length; i++) {
                var p = _2c1[i];
                if (_2bf) {
                    if (p.epanel("options")[_2bf] == _2c0) {
                        pp.push(p);
                    }
                } else {
                    if (p[0] == $(_2c0)[0]) {
                        return i;
                    }
                }
            }
            if (_2bf) {
                return all ? pp : (pp.length ? pp[0] : null);
            } else {
                return -1;
            }
        };
        function _2c2(_2c3) {
            return _2bd(_2c3, "collapsed", false, true);
        };
        function _2c4(_2c5) {
            var pp = _2c2(_2c5);
            return pp.length ? pp[0] : null;
        };
        function _2c6(_2c7, _2c8) {
            return _2bd(_2c7, null, _2c8);
        };
        function _2c9(_2ca, _2cb) {
            var _2cc = $.data(_2ca, "accordion").epanels;
            if (typeof _2cb == "number") {
                if (_2cb < 0 || _2cb >= _2cc.length) {
                    return null;
                } else {
                    return _2cc[_2cb];
                }
            }
            return _2bd(_2ca, "title", _2cb);
        };
        function _2cd(_2ce) {
            var opts = $.data(_2ce, "accordion").options;
            var cc = $(_2ce);
            if (opts.border) {
                cc.removeClass("accordion-noborder");
            } else {
                cc.addClass("accordion-noborder");
            }
        };
        function init(_2cf) {
            var _2d0 = $.data(_2cf, "accordion");
            var cc = $(_2cf);
            cc.addClass("accordion");
            _2d0.epanels = [];
            cc.children("div").each(function () {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                var pp = $(this);
                _2d0.epanels.push(pp);
                _2d2(_2cf, pp, opts);
            });
            cc.bind("_resize", function (e, _2d1) {
                if ($(this).hasClass("eui-fluid") || _2d1) {
                    _2b0(_2cf);
                }
                return false;
            });
        };
        function _2d2(_2d3, pp, _2d4) {
            var opts = $.data(_2d3, "accordion").options;
            pp.epanel($.extend({}, {
                collapsible: true,
                minimizable: false,
                maximizable: false,
                closable: false,
                doSize: false,
                collapsed: true,
                headerCls: "accordion-header",
                bodyCls: "accordion-body"
            }, _2d4, {
                onBeforeExpand: function () {
                    if (_2d4.onBeforeExpand) {
                        if (_2d4.onBeforeExpand.call(this) == false) {
                            return false;
                        }
                    }
                    if (!opts.multiple) {
                        var all = $.grep(_2c2(_2d3), function (p) {
                            return p.epanel("options").collapsible;
                        });
                        for (var i = 0; i < all.length; i++) {
                            _2dc(_2d3, _2c6(_2d3, all[i]));
                        }
                    }
                    var _2d5 = $(this).epanel("header");
                    _2d5.addClass("accordion-header-selected");
                    _2d5.find(".accordion-collapse").removeClass("accordion-expand");
                }, onExpand: function () {
                    if (_2d4.onExpand) {
                        _2d4.onExpand.call(this);
                    }
                    opts.onSelect.call(_2d3, $(this).epanel("options").title, _2c6(_2d3, this));
                }, onBeforeCollapse: function () {
                    if (_2d4.onBeforeCollapse) {
                        if (_2d4.onBeforeCollapse.call(this) == false) {
                            return false;
                        }
                    }
                    var _2d6 = $(this).epanel("header");
                    _2d6.removeClass("accordion-header-selected");
                    _2d6.find(".accordion-collapse").addClass("accordion-expand");
                }, onCollapse: function () {
                    if (_2d4.onCollapse) {
                        _2d4.onCollapse.call(this);
                    }
                    opts.onUnselect.call(_2d3, $(this).epanel("options").title, _2c6(_2d3, this));
                }
            }));
            var _2d7 = pp.epanel("header");
            var tool = _2d7.children("div.epanel-tool");
            tool.children("a.epanel-tool-collapse").hide();
            var t = $("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
            t.bind("click", function () {
                _2d8(pp);
                return false;
            });
            pp.epanel("options").collapsible ? t.show() : t.hide();
            _2d7.click(function () {
                _2d8(pp);
                return false;
            });
            function _2d8(p) {
                var _2d9 = p.epanel("options");
                if (_2d9.collapsible) {
                    var _2da = _2c6(_2d3, p);
                    if (_2d9.collapsed) {
                        _2db(_2d3, _2da);
                    } else {
                        _2dc(_2d3, _2da);
                    }
                }
            };
        };
        function _2db(_2dd, _2de) {
            var p = _2c9(_2dd, _2de);
            if (!p) {
                return;
            }
            _2df(_2dd);
            var opts = $.data(_2dd, "accordion").options;
            p.epanel("expand", opts.animate);
        };
        function _2dc(_2e0, _2e1) {
            var p = _2c9(_2e0, _2e1);
            if (!p) {
                return;
            }
            _2df(_2e0);
            var opts = $.data(_2e0, "accordion").options;
            p.epanel("collapse", opts.animate);
        };
        function _2e2(_2e3) {
            var opts = $.data(_2e3, "accordion").options;
            var p = _2bd(_2e3, "selected", true);
            if (p) {
                _2e4(_2c6(_2e3, p));
            } else {
                _2e4(opts.selected);
            }
            function _2e4(_2e5) {
                var _2e6 = opts.animate;
                opts.animate = false;
                _2db(_2e3, _2e5);
                opts.animate = _2e6;
            };
        };
        function _2df(_2e7) {
            var _2e8 = $.data(_2e7, "accordion").epanels;
            for (var i = 0; i < _2e8.length; i++) {
                _2e8[i].stop(true, true);
            }
        };
        function add(_2e9, _2ea) {
            var _2eb = $.data(_2e9, "accordion");
            var opts = _2eb.options;
            var _2ec = _2eb.epanels;
            if (_2ea.selected == undefined) {
                _2ea.selected = true;
            }
            _2df(_2e9);
            var pp = $("<div></div>").appendTo(_2e9);
            _2ec.push(pp);
            _2d2(_2e9, pp, _2ea);
            _2b0(_2e9);
            opts.onAdd.call(_2e9, _2ea.title, _2ec.length - 1);
            if (_2ea.selected) {
                _2db(_2e9, _2ec.length - 1);
            }
        };
        function _2ed(_2ee, _2ef) {
            var _2f0 = $.data(_2ee, "accordion");
            var opts = _2f0.options;
            var _2f1 = _2f0.epanels;
            _2df(_2ee);
            var _2f2 = _2c9(_2ee, _2ef);
            var _2f3 = _2f2.epanel("options").title;
            var _2f4 = _2c6(_2ee, _2f2);
            if (!_2f2) {
                return;
            }
            if (opts.onBeforeRemove.call(_2ee, _2f3, _2f4) == false) {
                return;
            }
            _2f1.splice(_2f4, 1);
            _2f2.epanel("destroy");
            if (_2f1.length) {
                _2b0(_2ee);
                var curr = _2c4(_2ee);
                if (!curr) {
                    _2db(_2ee, 0);
                }
            }
            opts.onRemove.call(_2ee, _2f3, _2f4);
        };
        $.fn.accordion = function (_2f5, _2f6) {
            if (typeof _2f5 == "string") {
                return $.fn.accordion.methods[_2f5](this, _2f6);
            }
            _2f5 = _2f5 || {};
            return this.each(function () {
                var _2f7 = $.data(this, "accordion");
                if (_2f7) {
                    $.extend(_2f7.options, _2f5);
                } else {
                    $.data(this, "accordion", {
                        options: $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), _2f5),
                        accordion: $(this).addClass("accordion"),
                        epanels: []
                    });
                    init(this);
                }
                _2cd(this);
                _2b0(this);
                _2e2(this);
            });
        };
        $.fn.accordion.methods = {
            options: function (jq) {
                return $.data(jq[0], "accordion").options;
            }, epanels: function (jq) {
                return $.data(jq[0], "accordion").epanels;
            }, resize: function (jq, _2f8) {
                return jq.each(function () {
                    _2b0(this, _2f8);
                });
            }, getSelections: function (jq) {
                return _2c2(jq[0]);
            }, getSelected: function (jq) {
                return _2c4(jq[0]);
            }, getepanel: function (jq, _2f9) {
                return _2c9(jq[0], _2f9);
            }, getepanelIndex: function (jq, _2fa) {
                return _2c6(jq[0], _2fa);
            }, select: function (jq, _2fb) {
                return jq.each(function () {
                    _2db(this, _2fb);
                });
            }, unselect: function (jq, _2fc) {
                return jq.each(function () {
                    _2dc(this, _2fc);
                });
            }, add: function (jq, _2fd) {
                return jq.each(function () {
                    add(this, _2fd);
                });
            }, remove: function (jq, _2fe) {
                return jq.each(function () {
                    _2ed(this, _2fe);
                });
            }
        };
        $.fn.accordion.parseOptions = function (_2ff) {
            var t = $(_2ff);
            return $.extend({}, $.parser.parseOptions(_2ff, ["width", "height", {
                fit: "boolean",
                border: "boolean",
                animate: "boolean",
                multiple: "boolean",
                selected: "number"
            }]));
        };
        $.fn.accordion.defaults = {
            width: "auto",
            height: "auto",
            fit: false,
            border: true,
            animate: true,
            multiple: false,
            selected: 0,
            onSelect: function (_300, _301) {
            },
            onUnselect: function (_302, _303) {
            },
            onAdd: function (_304, _305) {
            },
            onBeforeRemove: function (_306, _307) {
            },
            onRemove: function (_308, _309) {
            }
        };
    })(jQuery);
    //tabs
    (function ($) {
        function _30a(c) {
            var w = 0;
            $(c).children().each(function () {
                w += $(this).outerWidth(true);
            });
            return w;
        };
        function _30b(_30c) {
            var opts = $.data(_30c, "tabs").options;
            if (opts.tabPosition == "left" || opts.tabPosition == "right" || !opts.showHeader) {
                return;
            }
            var _30d = $(_30c).children("div.tabs-header");
            var tool = _30d.children("div.tabs-tool");
            var _30e = _30d.children("div.tabs-scroller-left");
            var _30f = _30d.children("div.tabs-scroller-right");
            var wrap = _30d.children("div.tabs-wrap");
            var _310 = _30d.outerHeight();
            if (opts.plain) {
                _310 -= _310 - _30d.height();
            }
            tool._outerHeight(_310);
            var _311 = _30a(_30d.find("ul.tabs"));
            var _312 = _30d.width() - tool._outerWidth();
            if (_311 > _312) {
                _30e.add(_30f).show()._outerHeight(_310);
                if (opts.toolPosition == "left") {
                    tool.css({left: _30e.outerWidth(), right: ""});
                    wrap.css({
                        marginLeft: _30e.outerWidth() + tool._outerWidth(),
                        marginRight: _30f._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                } else {
                    tool.css({left: "", right: _30f.outerWidth()});
                    wrap.css({
                        marginLeft: _30e.outerWidth(),
                        marginRight: _30f.outerWidth() + tool._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                }
            } else {
                _30e.add(_30f).hide();
                if (opts.toolPosition == "left") {
                    tool.css({left: 0, right: ""});
                    wrap.css({marginLeft: tool._outerWidth(), marginRight: 0, width: _312});
                } else {
                    tool.css({left: "", right: 0});
                    wrap.css({marginLeft: 0, marginRight: tool._outerWidth(), width: _312});
                }
            }
        };
        function _313(_314) {
            var opts = $.data(_314, "tabs").options;
            var _315 = $(_314).children("div.tabs-header");
            if (opts.tools) {
                if (typeof opts.tools == "string") {
                    $(opts.tools).addClass("tabs-tool").appendTo(_315);
                    $(opts.tools).show();
                } else {
                    _315.children("div.tabs-tool").remove();
                    var _316 = $("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_315);
                    var tr = _316.find("tr");
                    for (var i = 0; i < opts.tools.length; i++) {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(td);
                        tool[0].onclick = eval(opts.tools[i].handler || function () {
                            });
                        tool.linkbutton($.extend({}, opts.tools[i], {plain: true}));
                    }
                }
            } else {
                _315.children("div.tabs-tool").remove();
            }
        };
        function _317(_318, _319) {
            var _31a = $.data(_318, "tabs");
            var opts = _31a.options;
            var cc = $(_318);
            if (!opts.doSize) {
                return;
            }
            if (_319) {
                $.extend(opts, {width: _319.width, height: _319.height});
            }
            cc._size(opts);
            var _31b = cc.children("div.tabs-header");
            var _31c = cc.children("div.tabs-epanels");
            var wrap = _31b.find("div.tabs-wrap");
            var ul = wrap.find(".tabs");
            ul.children("li").removeClass("tabs-first tabs-last");
            ul.children("li:first").addClass("tabs-first");
            ul.children("li:last").addClass("tabs-last");
            if (opts.tabPosition == "left" || opts.tabPosition == "right") {
                _31b._outerWidth(opts.showHeader ? opts.headerWidth : 0);
                _31c._outerWidth(cc.width() - _31b.outerWidth());
                _31b.add(_31c)._outerHeight(opts.height);
                wrap._outerWidth(_31b.width());
                ul._outerWidth(wrap.width()).css("height", "");
            } else {
                _31b.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool").css("display", opts.showHeader ? "block" : "none");
                _31b._outerWidth(cc.width()).css("height", "");
                if (opts.showHeader) {
                    _31b.css("background-color", "");
                    wrap.css("height", "");
                } else {
                    _31b.css("background-color", "transparent");
                    _31b._outerHeight(0);
                    wrap._outerHeight(0);
                }
                ul._outerHeight(opts.tabHeight).css("width", "");
                ul._outerHeight(ul.outerHeight() - ul.height() - 1 + opts.tabHeight).css("width", "");
                _31c._size("height", isNaN(opts.height) ? "" : (opts.height - _31b.outerHeight()));
                _31c._size("width", isNaN(opts.width) ? "" : opts.width);
            }
            if (_31a.tabs.length) {
                var d1 = ul.outerWidth(true) - ul.width();
                var li = ul.children("li:first");
                var d2 = li.outerWidth(true) - li.width();
                var _31d = _31b.width() - _31b.children(".tabs-tool")._outerWidth();
                var _31e = Math.floor((_31d - d1 - d2 * _31a.tabs.length) / _31a.tabs.length);
                $.map(_31a.tabs, function (p) {
                    _31f(p, (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) ? _31e : undefined);
                });
                if (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) {
                    var _320 = _31d - d1 - _30a(ul);
                    _31f(_31a.tabs[_31a.tabs.length - 1], _31e + _320);
                }
            }
            _30b(_318);
            function _31f(p, _321) {
                var _322 = p.epanel("options");
                var p_t = _322.tab.find("a.tabs-inner");
                var _321 = _321 ? _321 : (parseInt(_322.tabWidth || opts.tabWidth || undefined));
                if (_321) {
                    p_t._outerWidth(_321);
                } else {
                    p_t.css("width", "");
                }
                p_t._outerHeight(opts.tabHeight);
                p_t.css("lineHeight", p_t.height() + "px");
                p_t.find(".eui-fluid:visible").triggerHandler("_resize");
            };
        };
        function _323(_324) {
            var opts = $.data(_324, "tabs").options;
            var tab = _325(_324);
            if (tab) {
                var _326 = $(_324).children("div.tabs-epanels");
                var _327 = opts.width == "auto" ? "auto" : _326.width();
                var _328 = opts.height == "auto" ? "auto" : _326.height();
                tab.epanel("resize", {width: _327, height: _328});
            }
        };
        function _329(_32a) {
            var tabs = $.data(_32a, "tabs").tabs;
            var cc = $(_32a).addClass("tabs-container");
            var _32b = $("<div class=\"tabs-epanels\"></div>").insertBefore(cc);
            cc.children("div").each(function () {
                _32b[0].appendChild(this);
            });
            cc[0].appendChild(_32b[0]);
            $("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(_32a);
            cc.children("div.tabs-epanels").children("div").each(function (i) {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                _338(_32a, opts, $(this));
            });
            cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
                $(this).addClass("tabs-scroller-over");
            }, function () {
                $(this).removeClass("tabs-scroller-over");
            });
            cc.bind("_resize", function (e, _32c) {
                if ($(this).hasClass("eui-fluid") || _32c) {
                    _317(_32a);
                    _323(_32a);
                }
                return false;
            });
        };
        function _32d(_32e) {
            var _32f = $.data(_32e, "tabs");
            var opts = _32f.options;
            $(_32e).children("div.tabs-header").unbind().bind("click", function (e) {
                if ($(e.target).hasClass("tabs-scroller-left")) {
                    $(_32e).tabs("scrollBy", -opts.scrollIncrement);
                } else {
                    if ($(e.target).hasClass("tabs-scroller-right")) {
                        $(_32e).tabs("scrollBy", opts.scrollIncrement);
                    } else {
                        var li = $(e.target).closest("li");
                        if (li.hasClass("tabs-disabled")) {
                            return false;
                        }
                        var a = $(e.target).closest("a.tabs-close");
                        if (a.length) {
                            _351(_32e, _330(li));
                        } else {
                            if (li.length) {
                                var _331 = _330(li);
                                var _332 = _32f.tabs[_331].epanel("options");
                                if (_332.collapsible) {
                                    _332.closed ? _348(_32e, _331) : _365(_32e, _331);
                                } else {
                                    _348(_32e, _331);
                                }
                            }
                        }
                        return false;
                    }
                }
            }).bind("contextmenu", function (e) {
                var li = $(e.target).closest("li");
                if (li.hasClass("tabs-disabled")) {
                    return;
                }
                if (li.length) {
                    opts.onContextMenu.call(_32e, e, li.find("span.tabs-title").html(), _330(li));
                }
            });
            function _330(li) {
                var _333 = 0;
                li.parent().children("li").each(function (i) {
                    if (li[0] == this) {
                        _333 = i;
                        return false;
                    }
                });
                return _333;
            };
        };
        function _334(_335) {
            var opts = $.data(_335, "tabs").options;
            var _336 = $(_335).children("div.tabs-header");
            var _337 = $(_335).children("div.tabs-epanels");
            _336.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
            _337.removeClass("tabs-epanels-top tabs-epanels-bottom tabs-epanels-left tabs-epanels-right");
            if (opts.tabPosition == "top") {
                _336.insertBefore(_337);
            } else {
                if (opts.tabPosition == "bottom") {
                    _336.insertAfter(_337);
                    _336.addClass("tabs-header-bottom");
                    _337.addClass("tabs-epanels-top");
                } else {
                    if (opts.tabPosition == "left") {
                        _336.addClass("tabs-header-left");
                        _337.addClass("tabs-epanels-right");
                    } else {
                        if (opts.tabPosition == "right") {
                            _336.addClass("tabs-header-right");
                            _337.addClass("tabs-epanels-left");
                        }
                    }
                }
            }
            if (opts.plain == true) {
                _336.addClass("tabs-header-plain");
            } else {
                _336.removeClass("tabs-header-plain");
            }
            _336.removeClass("tabs-header-narrow").addClass(opts.narrow ? "tabs-header-narrow" : "");
            var tabs = _336.find(".tabs");
            tabs.removeClass("tabs-pill").addClass(opts.pill ? "tabs-pill" : "");
            tabs.removeClass("tabs-narrow").addClass(opts.narrow ? "tabs-narrow" : "");
            tabs.removeClass("tabs-justified").addClass(opts.justified ? "tabs-justified" : "");
            if (opts.border == true) {
                _336.removeClass("tabs-header-noborder");
                _337.removeClass("tabs-epanels-noborder");
            } else {
                _336.addClass("tabs-header-noborder");
                _337.addClass("tabs-epanels-noborder");
            }
            opts.doSize = true;
        };
        function _338(_339, _33a, pp) {
            _33a = _33a || {};
            var _33b = $.data(_339, "tabs");
            var tabs = _33b.tabs;
            if (_33a.index == undefined || _33a.index > tabs.length) {
                _33a.index = tabs.length;
            }
            if (_33a.index < 0) {
                _33a.index = 0;
            }
            var ul = $(_339).children("div.tabs-header").find("ul.tabs");
            var _33c = $(_339).children("div.tabs-epanels");
            var tab = $("<li>" + "<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a>" + "</li>");
            if (!pp) {
                pp = $("<div></div>");
            }
            if (_33a.index >= tabs.length) {
                tab.appendTo(ul);
                pp.appendTo(_33c);
                tabs.push(pp);
            } else {
                tab.insertBefore(ul.children("li:eq(" + _33a.index + ")"));
                pp.insertBefore(_33c.children("div.epanel:eq(" + _33a.index + ")"));
                tabs.splice(_33a.index, 0, pp);
            }
            pp.epanel($.extend({}, _33a, {
                tab: tab,
                border: false,
                noheader: true,
                closed: true,
                doSize: false,
                iconCls: (_33a.icon ? _33a.icon : undefined),
                onLoad: function () {
                    if (_33a.onLoad) {
                        _33a.onLoad.call(this, arguments);
                    }
                    _33b.options.onLoad.call(_339, $(this));
                },
                onBeforeOpen: function () {
                    if (_33a.onBeforeOpen) {
                        if (_33a.onBeforeOpen.call(this) == false) {
                            return false;
                        }
                    }
                    var p = $(_339).tabs("getSelected");
                    if (p) {
                        if (p[0] != this) {
                            $(_339).tabs("unselect", _343(_339, p));
                            p = $(_339).tabs("getSelected");
                            if (p) {
                                return false;
                            }
                        } else {
                            _323(_339);
                            return false;
                        }
                    }
                    var _33d = $(this).epanel("options");
                    _33d.tab.addClass("tabs-selected");
                    var wrap = $(_339).find(">div.tabs-header>div.tabs-wrap");
                    var left = _33d.tab.position().left;
                    var _33e = left + _33d.tab.outerWidth();
                    if (left < 0 || _33e > wrap.width()) {
                        var _33f = left - (wrap.width() - _33d.tab.width()) / 2;
                        $(_339).tabs("scrollBy", _33f);
                    } else {
                        $(_339).tabs("scrollBy", 0);
                    }
                    var _340 = $(this).epanel("epanel");
                    _340.css("display", "block");
                    _323(_339);
                    _340.css("display", "none");
                },
                onOpen: function () {
                    if (_33a.onOpen) {
                        _33a.onOpen.call(this);
                    }
                    var _341 = $(this).epanel("options");
                    _33b.selectHis.push(_341.title);
                    _33b.options.onSelect.call(_339, _341.title, _343(_339, this));
                },
                onBeforeClose: function () {
                    if (_33a.onBeforeClose) {
                        if (_33a.onBeforeClose.call(this) == false) {
                            return false;
                        }
                    }
                    $(this).epanel("options").tab.removeClass("tabs-selected");
                },
                onClose: function () {
                    if (_33a.onClose) {
                        _33a.onClose.call(this);
                    }
                    var _342 = $(this).epanel("options");
                    _33b.options.onUnselect.call(_339, _342.title, _343(_339, this));
                }
            }));
            $(_339).tabs("update", {tab: pp, options: pp.epanel("options"), type: "header"});
        };
        function _344(_345, _346) {
            var _347 = $.data(_345, "tabs");
            var opts = _347.options;
            if (_346.selected == undefined) {
                _346.selected = true;
            }
            _338(_345, _346);
            opts.onAdd.call(_345, _346.title, _346.index);
            if (_346.selected) {
                _348(_345, _346.index);
            }
        };
        function _349(_34a, _34b) {
            _34b.type = _34b.type || "all";
            var _34c = $.data(_34a, "tabs").selectHis;
            var pp = _34b.tab;
            var _34d = pp.epanel("options").title;
            if (_34b.type == "all" || _34b == "body") {
                pp.epanel($.extend({}, _34b.options, {iconCls: (_34b.options.icon ? _34b.options.icon : undefined)}));
            }
            if (_34b.type == "all" || _34b.type == "header") {
                var opts = pp.epanel("options");
                var tab = opts.tab;
                if (opts.header) {
                    tab.find(".tabs-inner").html($(opts.header));
                } else {
                    var _34e = tab.find("span.tabs-title");
                    var _34f = tab.find("span.tabs-icon");
                    _34e.html(opts.title);
                    _34f.attr("class", "tabs-icon");
                    tab.find("a.tabs-close").remove();
                    if (opts.closable) {
                        _34e.addClass("tabs-closable");
                        $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
                    } else {
                        _34e.removeClass("tabs-closable");
                    }
                    if (opts.iconCls) {
                        _34e.addClass("tabs-with-icon");
                        _34f.addClass(opts.iconCls);
                    } else {
                        _34e.removeClass("tabs-with-icon");
                    }
                    if (opts.tools) {
                        var _350 = tab.find("span.tabs-p-tool");
                        if (!_350.length) {
                            var _350 = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
                        }
                        if ($.isArray(opts.tools)) {
                            for (var i = 0; i < opts.tools.length; i++) {
                                var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(_350);
                                t.addClass(opts.tools[i].iconCls);
                                if (opts.tools[i].handler) {
                                    t.bind("click", {handler: opts.tools[i].handler}, function (e) {
                                        if ($(this).parents("li").hasClass("tabs-disabled")) {
                                            return;
                                        }
                                        e.data.handler.call(this);
                                    });
                                }
                            }
                        } else {
                            $(opts.tools).children().appendTo(_350);
                        }
                        var pr = _350.children().length * 12;
                        if (opts.closable) {
                            pr += 8;
                        } else {
                            pr -= 3;
                            _350.css("right", "5px");
                        }
                        _34e.css("padding-right", pr + "px");
                    } else {
                        tab.find("span.tabs-p-tool").remove();
                        _34e.css("padding-right", "");
                    }
                }
                if (_34d != opts.title) {
                    for (var i = 0; i < _34c.length; i++) {
                        if (_34c[i] == _34d) {
                            _34c[i] = opts.title;
                        }
                    }
                }
            }
            _317(_34a);
            $.data(_34a, "tabs").options.onUpdate.call(_34a, opts.title, _343(_34a, pp));
        };
        function _351(_352, _353) {
            var opts = $.data(_352, "tabs").options;
            var tabs = $.data(_352, "tabs").tabs;
            var _354 = $.data(_352, "tabs").selectHis;
            if (!_355(_352, _353)) {
                return;
            }
            var tab = _356(_352, _353);
            var _357 = tab.epanel("options").title;
            var _358 = _343(_352, tab);
            if (opts.onBeforeClose.call(_352, _357, _358) == false) {
                return;
            }
            var tab = _356(_352, _353, true);
            tab.epanel("options").tab.remove();
            tab.epanel("destroy");
            opts.onClose.call(_352, _357, _358);
            _317(_352);
            for (var i = 0; i < _354.length; i++) {
                if (_354[i] == _357) {
                    _354.splice(i, 1);
                    i--;
                }
            }
            var _359 = _354.pop();
            if (_359) {
                _348(_352, _359);
            } else {
                if (tabs.length) {
                    _348(_352, 0);
                }
            }
        };
        function _356(_35a, _35b, _35c) {
            var tabs = $.data(_35a, "tabs").tabs;
            if (typeof _35b == "number") {
                if (_35b < 0 || _35b >= tabs.length) {
                    return null;
                } else {
                    var tab = tabs[_35b];
                    if (_35c) {
                        tabs.splice(_35b, 1);
                    }
                    return tab;
                }
            }
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.epanel("options").title == _35b) {
                    if (_35c) {
                        tabs.splice(i, 1);
                    }
                    return tab;
                }
            }
            return null;
        };
        function _343(_35d, tab) {
            var tabs = $.data(_35d, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i][0] == $(tab)[0]) {
                    return i;
                }
            }
            return -1;
        };
        function _325(_35e) {
            var tabs = $.data(_35e, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.epanel("options").tab.hasClass("tabs-selected")) {
                    return tab;
                }
            }
            return null;
        };
        function _35f(_360) {
            var _361 = $.data(_360, "tabs");
            var tabs = _361.tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].epanel("options").selected) {
                    _348(_360, i);
                    return;
                }
            }
            _348(_360, _361.options.selected);
        };
        function _348(_362, _363) {
            var p = _356(_362, _363);
            if (p && !p.is(":visible")) {
                _364(_362);
                p.epanel("open");
            }
        };
        function _365(_366, _367) {
            var p = _356(_366, _367);
            if (p && p.is(":visible")) {
                _364(_366);
                p.epanel("close");
            }
        };
        function _364(_368) {
            $(_368).children("div.tabs-epanels").each(function () {
                $(this).stop(true, true);
            });
        };
        function _355(_369, _36a) {
            return _356(_369, _36a) != null;
        };
        function _36b(_36c, _36d) {
            var opts = $.data(_36c, "tabs").options;
            opts.showHeader = _36d;
            $(_36c).tabs("resize");
        };
        $.fn.tabs = function (_36e, _36f) {
            if (typeof _36e == "string") {
                return $.fn.tabs.methods[_36e](this, _36f);
            }
            _36e = _36e || {};
            return this.each(function () {
                var _370 = $.data(this, "tabs");
                if (_370) {
                    $.extend(_370.options, _36e);
                } else {
                    $.data(this, "tabs", {
                        options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), _36e),
                        tabs: [],
                        selectHis: []
                    });
                    _329(this);
                }
                _313(this);
                _334(this);
                _317(this);
                _32d(this);
                _35f(this);
            });
        };
        $.fn.tabs.methods = {
            options: function (jq) {
                var cc = jq[0];
                var opts = $.data(cc, "tabs").options;
                var s = _325(cc);
                opts.selected = s ? _343(cc, s) : -1;
                return opts;
            }, tabs: function (jq) {
                return $.data(jq[0], "tabs").tabs;
            }, resize: function (jq, _371) {
                return jq.each(function () {
                    _317(this, _371);
                    _323(this);
                });
            }, add: function (jq, _372) {
                return jq.each(function () {
                    _344(this, _372);
                });
            }, close: function (jq, _373) {
                return jq.each(function () {
                    _351(this, _373);
                });
            }, getTab: function (jq, _374) {
                return _356(jq[0], _374);
            }, getTabIndex: function (jq, tab) {
                return _343(jq[0], tab);
            }, getSelected: function (jq) {
                return _325(jq[0]);
            }, select: function (jq, _375) {
                return jq.each(function () {
                    _348(this, _375);
                });
            }, unselect: function (jq, _376) {
                return jq.each(function () {
                    _365(this, _376);
                });
            }, exists: function (jq, _377) {
                return _355(jq[0], _377);
            }, update: function (jq, _378) {
                return jq.each(function () {
                    _349(this, _378);
                });
            }, enableTab: function (jq, _379) {
                return jq.each(function () {
                    $(this).tabs("getTab", _379).epanel("options").tab.removeClass("tabs-disabled");
                });
            }, disableTab: function (jq, _37a) {
                return jq.each(function () {
                    $(this).tabs("getTab", _37a).epanel("options").tab.addClass("tabs-disabled");
                });
            }, showHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, true);
                });
            }, hideHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, false);
                });
            }, scrollBy: function (jq, _37b) {
                return jq.each(function () {
                    var opts = $(this).tabs("options");
                    var wrap = $(this).find(">div.tabs-header>div.tabs-wrap");
                    var pos = Math.min(wrap._scrollLeft() + _37b, _37c());
                    wrap.animate({scrollLeft: pos}, opts.scrollDuration);
                    function _37c() {
                        var w = 0;
                        var ul = wrap.children("ul");
                        ul.children("li").each(function () {
                            w += $(this).outerWidth(true);
                        });
                        return w - wrap.width() + (ul.outerWidth() - ul.width());
                    };
                });
            }
        };
        $.fn.tabs.parseOptions = function (_37d) {
            return $.extend({}, $.parser.parseOptions(_37d, ["tools", "toolPosition", "tabPosition", {
                fit: "boolean",
                border: "boolean",
                plain: "boolean"
            }, {
                headerWidth: "number",
                tabWidth: "number",
                tabHeight: "number",
                selected: "number"
            }, {showHeader: "boolean", justified: "boolean", narrow: "boolean", pill: "boolean"}]));
        };
        $.fn.tabs.defaults = {
            width: "auto",
            height: "auto",
            headerWidth: 150,
            tabWidth: "auto",
            tabHeight: 27,
            selected: 0,
            showHeader: true,
            plain: false,
            fit: false,
            border: true,
            justified: false,
            narrow: false,
            pill: false,
            tools: null,
            toolPosition: "right",
            tabPosition: "top",
            scrollIncrement: 100,
            scrollDuration: 400,
            onLoad: function (_37e) {
            },
            onSelect: function (_37f, _380) {
            },
            onUnselect: function (_381, _382) {
            },
            onBeforeClose: function (_383, _384) {
            },
            onClose: function (_385, _386) {
            },
            onAdd: function (_387, _388) {
            },
            onUpdate: function (_389, _38a) {
            },
            onContextMenu: function (e, _38b, _38c) {
            }
        };
    })(jQuery);
    //layout
    (function ($) {
        var _38d = false;

        function _38e(_38f, _390) {
            var _391 = $.data(_38f, "layout");
            var opts = _391.options;
            var _392 = _391.epanels;
            var cc = $(_38f);
            if (_390) {
                $.extend(opts, {width: _390.width, height: _390.height});
            }
            if (_38f.tagName.toLowerCase() == "body") {
                cc._size("fit");
            } else {
                cc._size(opts);
            }
            var cpos = {top: 0, left: 0, width: cc.width(), height: cc.height()};
            _393(_394(_392.expandNorth) ? _392.expandNorth : _392.north, "n");
            _393(_394(_392.expandSouth) ? _392.expandSouth : _392.south, "s");
            _395(_394(_392.expandEast) ? _392.expandEast : _392.east, "e");
            _395(_394(_392.expandWest) ? _392.expandWest : _392.west, "w");
            _392.center.epanel("resize", cpos);
            function _393(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.epanel("options");
                pp.epanel("resize", {width: cc.width(), height: opts.height});
                var _396 = pp.epanel("epanel").outerHeight();
                pp.epanel("move", {left: 0, top: (type == "n" ? 0 : cc.height() - _396)});
                cpos.height -= _396;
                if (type == "n") {
                    cpos.top += _396;
                    if (!opts.split && opts.border) {
                        cpos.top--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.height++;
                }
            };
            function _395(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.epanel("options");
                pp.epanel("resize", {width: opts.width, height: cpos.height});
                var _397 = pp.epanel("epanel").outerWidth();
                pp.epanel("move", {left: (type == "e" ? cc.width() - _397 : 0), top: cpos.top});
                cpos.width -= _397;
                if (type == "w") {
                    cpos.left += _397;
                    if (!opts.split && opts.border) {
                        cpos.left--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.width++;
                }
            };
        };
        function init(_398) {
            var cc = $(_398);
            cc.addClass("layout");
            function _399(cc) {
                cc.children("div").each(function () {
                    var opts = $.fn.layout.parseepanelOptions(this);
                    if ("north,south,east,west,center".indexOf(opts.region) >= 0) {
                        _39b(_398, opts, this);
                    }
                });
            };
            cc.children("form").length ? _399(cc.children("form")) : _399(cc);
            cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
            cc.bind("_resize", function (e, _39a) {
                if ($(this).hasClass("eui-fluid") || _39a) {
                    _38e(_398);
                }
                return false;
            });
        };
        function _39b(_39c, _39d, el) {
            _39d.region = _39d.region || "center";
            var _39e = $.data(_39c, "layout").epanels;
            var cc = $(_39c);
            var dir = _39d.region;
            if (_39e[dir].length) {
                return;
            }
            var pp = $(el);
            if (!pp.length) {
                pp = $("<div></div>").appendTo(cc);
            }
            var _39f = $.extend({}, $.fn.layout.epaneldefaults, {
                width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
                height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
                doSize: false,
                collapsible: true,
                cls: ("layout-epanel layout-epanel-" + dir),
                bodyCls: "layout-body",
                onOpen: function () {
                    var tool = $(this).epanel("header").children("div.epanel-tool");
                    tool.children("a.epanel-tool-collapse").hide();
                    var _3a0 = {north: "up", south: "down", east: "right", west: "left"};
                    if (!_3a0[dir]) {
                        return;
                    }
                    var _3a1 = "layout-button-" + _3a0[dir];
                    var t = tool.children("a." + _3a1);
                    if (!t.length) {
                        t = $("<a href=\"javascript:void(0)\"></a>").addClass(_3a1).appendTo(tool);
                        t.bind("click", {dir: dir}, function (e) {
                            _3ad(_39c, e.data.dir);
                            return false;
                        });
                    }
                    $(this).epanel("options").collapsible ? t.show() : t.hide();
                }
            }, _39d);
            pp.epanel(_39f);
            _39e[dir] = pp;
            var _3a2 = {north: "s", south: "n", east: "w", west: "e"};
            var _3a3 = pp.epanel("epanel");
            if (pp.epanel("options").split) {
                _3a3.addClass("layout-split-" + dir);
            }
            _3a3._resizable($.extend({}, {
                handles: (_3a2[dir] || ""), disabled: (!pp.epanel("options").split), onStartResize: function (e) {
                    _38d = true;
                    if (dir == "north" || dir == "south") {
                        var _3a4 = $(">div.layout-split-proxy-v", _39c);
                    } else {
                        var _3a4 = $(">div.layout-split-proxy-h", _39c);
                    }
                    var top = 0, left = 0, _3a5 = 0, _3a6 = 0;
                    var pos = {display: "block"};
                    if (dir == "north") {
                        pos.top = parseInt(_3a3.css("top")) + _3a3.outerHeight() - _3a4.height();
                        pos.left = parseInt(_3a3.css("left"));
                        pos.width = _3a3.outerWidth();
                        pos.height = _3a4.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_3a3.css("top"));
                            pos.left = parseInt(_3a3.css("left"));
                            pos.width = _3a3.outerWidth();
                            pos.height = _3a4.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_3a3.css("top")) || 0;
                                pos.left = parseInt(_3a3.css("left")) || 0;
                                pos.width = _3a4.width();
                                pos.height = _3a3.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_3a3.css("top")) || 0;
                                    pos.left = _3a3.outerWidth() - _3a4.width();
                                    pos.width = _3a4.width();
                                    pos.height = _3a3.outerHeight();
                                }
                            }
                        }
                    }
                    _3a4.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                }, onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var _3a7 = $(">div.layout-split-proxy-v", _39c);
                        _3a7.css("top", e.pageY - $(_39c).offset().top - _3a7.height() / 2);
                    } else {
                        var _3a7 = $(">div.layout-split-proxy-h", _39c);
                        _3a7.css("left", e.pageX - $(_39c).offset().left - _3a7.width() / 2);
                    }
                    return false;
                }, onStopResize: function (e) {
                    cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    pp.epanel("resize", e.data);
                    _38e(_39c);
                    _38d = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _39d));
        };
        function _3a8(_3a9, _3aa) {
            var _3ab = $.data(_3a9, "layout").epanels;
            if (_3ab[_3aa].length) {
                _3ab[_3aa].epanel("destroy");
                _3ab[_3aa] = $();
                var _3ac = "expand" + _3aa.substring(0, 1).toUpperCase() + _3aa.substring(1);
                if (_3ab[_3ac]) {
                    _3ab[_3ac].epanel("destroy");
                    _3ab[_3ac] = undefined;
                }
            }
        };
        function _3ad(_3ae, _3af, _3b0) {
            if (_3b0 == undefined) {
                _3b0 = "normal";
            }
            var _3b1 = $.data(_3ae, "layout").epanels;
            var p = _3b1[_3af];
            var _3b2 = p.epanel("options");
            if (_3b2.onBeforeCollapse.call(p) == false) {
                return;
            }
            var _3b3 = "expand" + _3af.substring(0, 1).toUpperCase() + _3af.substring(1);
            if (!_3b1[_3b3]) {
                _3b1[_3b3] = _3b4(_3af);
                _3b1[_3b3].epanel("epanel").bind("click", function () {
                    p.epanel("expand", false).epanel("open");
                    var _3b5 = _3b6();
                    p.epanel("resize", _3b5.collapse);
                    p.epanel("epanel").animate(_3b5.expand, function () {
                        $(this).unbind(".layout").bind("mouseleave.layout", {region: _3af}, function (e) {
                            if (_38d == true) {
                                return;
                            }
                            if ($("body>div.combo-p>div.combo-epanel:visible").length) {
                                return;
                            }
                            _3ad(_3ae, e.data.region);
                        });
                    });
                    return false;
                });
            }
            var _3b7 = _3b6();
            if (!_394(_3b1[_3b3])) {
                _3b1.center.epanel("resize", _3b7.resizeC);
            }
            p.epanel("epanel").animate(_3b7.collapse, _3b0, function () {
                p.epanel("collapse", false).epanel("close");
                _3b1[_3b3].epanel("open").epanel("resize", _3b7.expandP);
                $(this).unbind(".layout");
            });
            function _3b4(dir) {
                var icon;
                if (dir == "east") {
                    icon = "layout-button-left";
                } else {
                    if (dir == "west") {
                        icon = "layout-button-right";
                    } else {
                        if (dir == "north") {
                            icon = "layout-button-down";
                        } else {
                            if (dir == "south") {
                                icon = "layout-button-up";
                            }
                        }
                    }
                }
                var p = $("<div></div>").appendTo(_3ae);
                p.epanel($.extend({}, $.fn.layout.epaneldefaults, {
                    cls: ("layout-expand layout-expand-" + dir),
                    title: "&nbsp;",
                    closed: true,
                    minWidth: 0,
                    minHeight: 0,
                    doSize: false,
                    tools: [{
                        iconCls: icon, handler: function () {
                            _3bd(_3ae, _3af);
                            return false;
                        }
                    }]
                }));
                p.epanel("epanel").hover(function () {
                    $(this).addClass("layout-expand-over");
                }, function () {
                    $(this).removeClass("layout-expand-over");
                });
                return p;
            };
            function _3b6() {
                var cc = $(_3ae);
                var _3b8 = _3b1.center.epanel("options");
                var _3b9 = _3b2.collapsedSize;
                if (_3af == "east") {
                    var _3ba = p.epanel("epanel")._outerWidth();
                    var _3bb = _3b8.width + _3ba - _3b9;
                    if (_3b2.split || !_3b2.border) {
                        _3bb++;
                    }
                    return {
                        resizeC: {width: _3bb},
                        expand: {left: cc.width() - _3ba},
                        expandP: {top: _3b8.top, left: cc.width() - _3b9, width: _3b9, height: _3b8.height},
                        collapse: {left: cc.width(), top: _3b8.top, height: _3b8.height}
                    };
                } else {
                    if (_3af == "west") {
                        var _3ba = p.epanel("epanel")._outerWidth();
                        var _3bb = _3b8.width + _3ba - _3b9;
                        if (_3b2.split || !_3b2.border) {
                            _3bb++;
                        }
                        return {
                            resizeC: {width: _3bb, left: _3b9 - 1},
                            expand: {left: 0},
                            expandP: {left: 0, top: _3b8.top, width: _3b9, height: _3b8.height},
                            collapse: {left: -_3ba, top: _3b8.top, height: _3b8.height}
                        };
                    } else {
                        if (_3af == "north") {
                            var _3bc = p.epanel("epanel")._outerHeight();
                            var hh = _3b8.height;
                            if (!_394(_3b1.expandNorth)) {
                                hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                            }
                            _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).epanel("resize", {
                                top: _3b9 - 1,
                                height: hh
                            });
                            return {
                                resizeC: {top: _3b9 - 1, height: hh},
                                expand: {top: 0},
                                expandP: {top: 0, left: 0, width: cc.width(), height: _3b9},
                                collapse: {top: -_3bc, width: cc.width()}
                            };
                        } else {
                            if (_3af == "south") {
                                var _3bc = p.epanel("epanel")._outerHeight();
                                var hh = _3b8.height;
                                if (!_394(_3b1.expandSouth)) {
                                    hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                                }
                                _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).epanel("resize", {height: hh});
                                return {
                                    resizeC: {height: hh},
                                    expand: {top: cc.height() - _3bc},
                                    expandP: {top: cc.height() - _3b9, left: 0, width: cc.width(), height: _3b9},
                                    collapse: {top: cc.height(), width: cc.width()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _3bd(_3be, _3bf) {
            var _3c0 = $.data(_3be, "layout").epanels;
            var p = _3c0[_3bf];
            var _3c1 = p.epanel("options");
            if (_3c1.onBeforeExpand.call(p) == false) {
                return;
            }
            var _3c2 = "expand" + _3bf.substring(0, 1).toUpperCase() + _3bf.substring(1);
            if (_3c0[_3c2]) {
                _3c0[_3c2].epanel("close");
                p.epanel("epanel").stop(true, true);
                p.epanel("expand", false).epanel("open");
                var _3c3 = _3c4();
                p.epanel("resize", _3c3.collapse);
                p.epanel("epanel").animate(_3c3.expand, function () {
                    _38e(_3be);
                });
            }
            function _3c4() {
                var cc = $(_3be);
                var _3c5 = _3c0.center.epanel("options");
                if (_3bf == "east" && _3c0.expandEast) {
                    return {
                        collapse: {left: cc.width(), top: _3c5.top, height: _3c5.height},
                        expand: {left: cc.width() - p.epanel("epanel")._outerWidth()}
                    };
                } else {
                    if (_3bf == "west" && _3c0.expandWest) {
                        return {
                            collapse: {left: -p.epanel("epanel")._outerWidth(), top: _3c5.top, height: _3c5.height},
                            expand: {left: 0}
                        };
                    } else {
                        if (_3bf == "north" && _3c0.expandNorth) {
                            return {
                                collapse: {top: -p.epanel("epanel")._outerHeight(), width: cc.width()},
                                expand: {top: 0}
                            };
                        } else {
                            if (_3bf == "south" && _3c0.expandSouth) {
                                return {
                                    collapse: {top: cc.height(), width: cc.width()},
                                    expand: {top: cc.height() - p.epanel("epanel")._outerHeight()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _394(pp) {
            if (!pp) {
                return false;
            }
            if (pp.length) {
                return pp.epanel("epanel").is(":visible");
            } else {
                return false;
            }
        };
        function _3c6(_3c7) {
            var _3c8 = $.data(_3c7, "layout").epanels;
            _3c9("east");
            _3c9("west");
            _3c9("north");
            _3c9("south");
            function _3c9(_3ca) {
                var p = _3c8[_3ca];
                if (p.length && p.epanel("options").collapsed) {
                    _3ad(_3c7, _3ca, 0);
                }
            };
        };
        function _3cb(_3cc, _3cd, _3ce) {
            var p = $(_3cc).layout("epanel", _3cd);
            p.epanel("options").split = _3ce;
            var cls = "layout-split-" + _3cd;
            var _3cf = p.epanel("epanel").removeClass(cls);
            if (_3ce) {
                _3cf.addClass(cls);
            }
            _3cf._resizable({disabled: (!_3ce)});
            _38e(_3cc);
        };
        $.fn.layout = function (_3d0, _3d1) {
            if (typeof _3d0 == "string") {
                return $.fn.layout.methods[_3d0](this, _3d1);
            }
            _3d0 = _3d0 || {};
            return this.each(function () {
                var _3d2 = $.data(this, "layout");
                if (_3d2) {
                    $.extend(_3d2.options, _3d0);
                } else {
                    var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _3d0);
                    $.data(this, "layout", {
                        options: opts,
                        epanels: {center: $(), north: $(), south: $(), east: $(), west: $()}
                    });
                    init(this);
                }
                _38e(this);
                _3c6(this);
            });
        };
        $.fn.layout.methods = {
            options: function (jq) {
                return $.data(jq[0], "layout").options;
            }, resize: function (jq, _3d3) {
                return jq.each(function () {
                    _38e(this, _3d3);
                });
            }, epanel: function (jq, _3d4) {
                return $.data(jq[0], "layout").epanels[_3d4];
            }, collapse: function (jq, _3d5) {
                return jq.each(function () {
                    _3ad(this, _3d5);
                });
            }, expand: function (jq, _3d6) {
                return jq.each(function () {
                    _3bd(this, _3d6);
                });
            }, add: function (jq, _3d7) {
                return jq.each(function () {
                    _39b(this, _3d7);
                    _38e(this);
                    if ($(this).layout("epanel", _3d7.region).epanel("options").collapsed) {
                        _3ad(this, _3d7.region, 0);
                    }
                });
            }, remove: function (jq, _3d8) {
                return jq.each(function () {
                    _3a8(this, _3d8);
                    _38e(this);
                });
            }, split: function (jq, _3d9) {
                return jq.each(function () {
                    _3cb(this, _3d9, true);
                });
            }, unsplit: function (jq, _3da) {
                return jq.each(function () {
                    _3cb(this, _3da, false);
                });
            }
        };
        $.fn.layout.parseOptions = function (_3db) {
            return $.extend({}, $.parser.parseOptions(_3db, [{fit: "boolean"}]));
        };
        $.fn.layout.defaults = {fit: false};
        $.fn.layout.parseepanelOptions = function (_3dc) {
            var t = $(_3dc);
            return $.extend({}, $.fn.epanel.parseOptions(_3dc), $.parser.parseOptions(_3dc, ["region", {
                split: "boolean",
                collpasedSize: "number",
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number"
            }]));
        };
        $.fn.layout.epaneldefaults = $.extend({}, $.fn.epanel.defaults, {
            region: null,
            split: false,
            collapsedSize: 28,
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000
        });
    })(jQuery);
    //menu
    (function ($) {
        $(function () {
            $(document).unbind(".menu").bind("mousedown.menu", function (e) {
                var m = $(e.target).closest("div.menu,div.combo-p");
                if (m.length) {
                    return;
                }
                $("body>div.menu-top:visible").not(".menu-inline").menu("hide");
                _3dd($("body>div.menu:visible").not(".menu-inline"));
            });
        });
        function init(_3de) {
            var opts = $.data(_3de, "menu").options;
            $(_3de).addClass("menu-top");
            opts.inline ? $(_3de).addClass("menu-inline") : $(_3de).appendTo("body");
            $(_3de).bind("_resize", function (e, _3df) {
                if ($(this).hasClass("eui-fluid") || _3df) {
                    $(_3de).menu("resize", _3de);
                }
                return false;
            });
            var _3e0 = _3e1($(_3de));
            for (var i = 0; i < _3e0.length; i++) {
                _3e2(_3e0[i]);
            }
            function _3e1(menu) {
                var _3e3 = [];
                menu.addClass("menu");
                _3e3.push(menu);
                if (!menu.hasClass("menu-content")) {
                    menu.children("div").each(function () {
                        var _3e4 = $(this).children("div");
                        if (_3e4.length) {
                            _3e4.appendTo("body");
                            this.submenu = _3e4;
                            var mm = _3e1(_3e4);
                            _3e3 = _3e3.concat(mm);
                        }
                    });
                }
                return _3e3;
            };
            function _3e2(menu) {
                var wh = $.parser.parseOptions(menu[0], ["width", "height"]);
                menu[0].originalHeight = wh.height || 0;
                if (menu.hasClass("menu-content")) {
                    menu[0].originalWidth = wh.width || menu._outerWidth();
                } else {
                    menu[0].originalWidth = wh.width || 0;
                    menu.children("div").each(function () {
                        var item = $(this);
                        var _3e5 = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", {separator: "boolean"}]), {disabled: (item.attr("disabled") ? true : undefined)});
                        if (_3e5.separator) {
                            item.addClass("menu-sep");
                        }
                        if (!item.hasClass("menu-sep")) {
                            item[0].itemName = _3e5.name || "";
                            item[0].itemHref = _3e5.href || "";
                            var text = item.addClass("menu-item").html();
                            item.empty().append($("<div class=\"menu-text\"></div>").html(text));
                            if (_3e5.iconCls) {
                                $("<div class=\"menu-icon\"></div>").addClass(_3e5.iconCls).appendTo(item);
                            }
                            if (_3e5.disabled) {
                                _3e6(_3de, item[0], true);
                            }
                            if (item[0].submenu) {
                                $("<div class=\"menu-rightarrow\"></div>").appendTo(item);
                            }
                            _3e7(_3de, item);
                        }
                    });
                    $("<div class=\"menu-line\"></div>").prependTo(menu);
                }
                _3e8(_3de, menu);
                if (!menu.hasClass("menu-inline")) {
                    menu.hide();
                }
                _3e9(_3de, menu);
            };
        };
        function _3e8(_3ea, menu) {
            var opts = $.data(_3ea, "menu").options;
            var _3eb = menu.attr("style") || "";
            menu.css({display: "block", left: -10000, height: "auto", overflow: "hidden"});
            menu.find(".menu-item").each(function () {
                $(this)._outerHeight(opts.itemHeight);
                $(this).find(".menu-text").css({
                    height: (opts.itemHeight - 2) + "px",
                    lineHeight: (opts.itemHeight - 2) + "px"
                });
            });
            menu.removeClass("menu-noline").addClass(opts.noline ? "menu-noline" : "");
            var _3ec = menu[0].originalWidth || "auto";
            if (isNaN(parseInt(_3ec))) {
                _3ec = 0;
                menu.find("div.menu-text").each(function () {
                    if (_3ec < $(this)._outerWidth()) {
                        _3ec = $(this)._outerWidth();
                    }
                });
                _3ec += 40;
            }
            var _3ed = menu.outerHeight();
            var _3ee = menu[0].originalHeight || "auto";
            if (isNaN(parseInt(_3ee))) {
                _3ee = _3ed;
                if (menu.hasClass("menu-top") && opts.alignTo) {
                    var at = $(opts.alignTo);
                    var h1 = at.offset().top - $(document).scrollTop();
                    var h2 = $(window)._outerHeight() + $(document).scrollTop() - at.offset().top - at._outerHeight();
                    _3ee = Math.min(_3ee, Math.max(h1, h2));
                } else {
                    if (_3ee > $(window)._outerHeight()) {
                        _3ee = $(window).height();
                    }
                }
            }
            menu.attr("style", _3eb);
            menu._size({fit: (menu[0] == _3ea ? opts.fit : false), width: _3ec, minWidth: opts.minWidth, height: _3ee});
            menu.css("overflow", menu.outerHeight() < _3ed ? "auto" : "hidden");
            menu.children("div.menu-line")._outerHeight(_3ed - 2);
        };
        function _3e9(_3ef, menu) {
            if (menu.hasClass("menu-inline")) {
                return;
            }
            var _3f0 = $.data(_3ef, "menu");
            menu.unbind(".menu").bind("mouseenter.menu", function () {
                if (_3f0.timer) {
                    clearTimeout(_3f0.timer);
                    _3f0.timer = null;
                }
            }).bind("mouseleave.menu", function () {
                if (_3f0.options.hideOnUnhover) {
                    _3f0.timer = setTimeout(function () {
                        _3f1(_3ef, $(_3ef).hasClass("menu-inline"));
                    }, _3f0.options.duration);
                }
            });
        };
        function _3e7(_3f2, item) {
            if (!item.hasClass("menu-item")) {
                return;
            }
            item.unbind(".menu");
            item.bind("click.menu", function () {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                if (!this.submenu) {
                    _3f1(_3f2, $(_3f2).hasClass("menu-inline"));
                    var href = this.itemHref;
                    if (href) {
                        location.href = href;
                    }
                }
                $(this).trigger("mouseenter");
                var item = $(_3f2).menu("getItem", this);
                $.data(_3f2, "menu").options.onClick.call(_3f2, item);
            }).bind("mouseenter.menu", function (e) {
                item.siblings().each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
                item.addClass("menu-active");
                if ($(this).hasClass("menu-item-disabled")) {
                    item.addClass("menu-active-disabled");
                    return;
                }
                var _3f3 = item[0].submenu;
                if (_3f3) {
                    $(_3f2).menu("show", {menu: _3f3, parent: item});
                }
            }).bind("mouseleave.menu", function (e) {
                item.removeClass("menu-active menu-active-disabled");
                var _3f4 = item[0].submenu;
                if (_3f4) {
                    if (e.pageX >= parseInt(_3f4.css("left"))) {
                        item.addClass("menu-active");
                    } else {
                        _3dd(_3f4);
                    }
                } else {
                    item.removeClass("menu-active");
                }
            });
        };
        function _3f1(_3f5, _3f6) {
            var _3f7 = $.data(_3f5, "menu");
            if (_3f7) {
                if ($(_3f5).is(":visible")) {
                    _3dd($(_3f5));
                    if (_3f6) {
                        $(_3f5).show();
                    } else {
                        _3f7.options.onHide.call(_3f5);
                    }
                }
            }
            return false;
        };
        function _3f8(_3f9, _3fa) {
            var left, top;
            _3fa = _3fa || {};
            var menu = $(_3fa.menu || _3f9);
            $(_3f9).menu("resize", menu[0]);
            if (menu.hasClass("menu-top")) {
                var opts = $.data(_3f9, "menu").options;
                $.extend(opts, _3fa);
                left = opts.left;
                top = opts.top;
                if (opts.alignTo) {
                    var at = $(opts.alignTo);
                    left = at.offset().left;
                    top = at.offset().top + at._outerHeight();
                    if (opts.align == "right") {
                        left += at.outerWidth() - menu.outerWidth();
                    }
                }
                if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
                }
                if (left < 0) {
                    left = 0;
                }
                top = _3fb(top, opts.alignTo);
            } else {
                var _3fc = _3fa.parent;
                left = _3fc.offset().left + _3fc.outerWidth() - 2;
                if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = _3fc.offset().left - menu.outerWidth() + 2;
                }
                top = _3fb(_3fc.offset().top - 3);
            }
            function _3fb(top, _3fd) {
                if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    if (_3fd) {
                        top = $(_3fd).offset().top - menu._outerHeight();
                    } else {
                        top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight();
                    }
                }
                if (top < 0) {
                    top = 0;
                }
                return top;
            };
            menu.css({left: left, top: top});
            menu.show(0, function () {
                if (!menu[0].shadow) {
                    menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
                }
                menu[0].shadow.css({
                    display: (menu.hasClass("menu-inline") ? "none" : "block"),
                    zIndex: $.fn.menu.defaults.zIndex++,
                    left: menu.css("left"),
                    top: menu.css("top"),
                    width: menu.outerWidth(),
                    height: menu.outerHeight()
                });
                menu.css("z-index", $.fn.menu.defaults.zIndex++);
                if (menu.hasClass("menu-top")) {
                    $.data(menu[0], "menu").options.onShow.call(menu[0]);
                }
            });
        };
        function _3dd(menu) {
            if (menu && menu.length) {
                _3fe(menu);
                menu.find("div.menu-item").each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
            }
            function _3fe(m) {
                m.stop(true, true);
                if (m[0].shadow) {
                    m[0].shadow.hide();
                }
                m.hide();
            };
        };
        function _3ff(_400, text) {
            var _401 = null;
            var tmp = $("<div></div>");

            function find(menu) {
                menu.children("div.menu-item").each(function () {
                    var item = $(_400).menu("getItem", this);
                    var s = tmp.empty().html(item.text).text();
                    if (text == $.trim(s)) {
                        _401 = item;
                    } else {
                        if (this.submenu && !_401) {
                            find(this.submenu);
                        }
                    }
                });
            };
            find($(_400));
            tmp.remove();
            return _401;
        };
        function _3e6(_402, _403, _404) {
            var t = $(_403);
            if (!t.hasClass("menu-item")) {
                return;
            }
            if (_404) {
                t.addClass("menu-item-disabled");
                if (_403.onclick) {
                    _403.onclick1 = _403.onclick;
                    _403.onclick = null;
                }
            } else {
                t.removeClass("menu-item-disabled");
                if (_403.onclick1) {
                    _403.onclick = _403.onclick1;
                    _403.onclick1 = null;
                }
            }
        };
        function _405(_406, _407) {
            var opts = $.data(_406, "menu").options;
            var menu = $(_406);
            if (_407.parent) {
                if (!_407.parent.submenu) {
                    var _408 = $("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
                    _408.hide();
                    _407.parent.submenu = _408;
                    $("<div class=\"menu-rightarrow\"></div>").appendTo(_407.parent);
                }
                menu = _407.parent.submenu;
            }
            if (_407.separator) {
                var item = $("<div class=\"menu-sep\"></div>").appendTo(menu);
            } else {
                var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
                $("<div class=\"menu-text\"></div>").html(_407.text).appendTo(item);
            }
            if (_407.iconCls) {
                $("<div class=\"menu-icon\"></div>").addClass(_407.iconCls).appendTo(item);
            }
            if (_407.id) {
                item.attr("id", _407.id);
            }
            if (_407.name) {
                item[0].itemName = _407.name;
            }
            if (_407.href) {
                item[0].itemHref = _407.href;
            }
            if (_407.onclick) {
                if (typeof _407.onclick == "string") {
                    item.attr("onclick", _407.onclick);
                } else {
                    item[0].onclick = eval(_407.onclick);
                }
            }
            if (_407.handler) {
                item[0].onclick = eval(_407.handler);
            }
            if (_407.disabled) {
                _3e6(_406, item[0], true);
            }
            _3e7(_406, item);
            _3e9(_406, menu);
            _3e8(_406, menu);
        };
        function _409(_40a, _40b) {
            function _40c(el) {
                if (el.submenu) {
                    el.submenu.children("div.menu-item").each(function () {
                        _40c(this);
                    });
                    var _40d = el.submenu[0].shadow;
                    if (_40d) {
                        _40d.remove();
                    }
                    el.submenu.remove();
                }
                $(el).remove();
            };
            var menu = $(_40b).parent();
            _40c(_40b);
            _3e8(_40a, menu);
        };
        function _40e(_40f, _410, _411) {
            var menu = $(_410).parent();
            if (_411) {
                $(_410).show();
            } else {
                $(_410).hide();
            }
            _3e8(_40f, menu);
        };
        function _412(_413) {
            $(_413).children("div.menu-item").each(function () {
                _409(_413, this);
            });
            if (_413.shadow) {
                _413.shadow.remove();
            }
            $(_413).remove();
        };
        $.fn.menu = function (_414, _415) {
            if (typeof _414 == "string") {
                return $.fn.menu.methods[_414](this, _415);
            }
            _414 = _414 || {};
            return this.each(function () {
                var _416 = $.data(this, "menu");
                if (_416) {
                    $.extend(_416.options, _414);
                } else {
                    _416 = $.data(this, "menu", {options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), _414)});
                    init(this);
                }
                $(this).css({left: _416.options.left, top: _416.options.top});
            });
        };
        $.fn.menu.methods = {
            options: function (jq) {
                return $.data(jq[0], "menu").options;
            }, show: function (jq, pos) {
                return jq.each(function () {
                    _3f8(this, pos);
                });
            }, hide: function (jq) {
                return jq.each(function () {
                    _3f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _412(this);
                });
            }, setText: function (jq, _417) {
                return jq.each(function () {
                    $(_417.target).children("div.menu-text").html(_417.text);
                });
            }, setIcon: function (jq, _418) {
                return jq.each(function () {
                    $(_418.target).children("div.menu-icon").remove();
                    if (_418.iconCls) {
                        $("<div class=\"menu-icon\"></div>").addClass(_418.iconCls).appendTo(_418.target);
                    }
                });
            }, getItem: function (jq, _419) {
                var t = $(_419);
                var item = {
                    target: _419,
                    id: t.attr("id"),
                    text: $.trim(t.children("div.menu-text").html()),
                    disabled: t.hasClass("menu-item-disabled"),
                    name: _419.itemName,
                    href: _419.itemHref,
                    onclick: _419.onclick
                };
                var icon = t.children("div.menu-icon");
                if (icon.length) {
                    var cc = [];
                    var aa = icon.attr("class").split(" ");
                    for (var i = 0; i < aa.length; i++) {
                        if (aa[i] != "menu-icon") {
                            cc.push(aa[i]);
                        }
                    }
                    item.iconCls = cc.join(" ");
                }
                return item;
            }, findItem: function (jq, text) {
                return _3ff(jq[0], text);
            }, appendItem: function (jq, _41a) {
                return jq.each(function () {
                    _405(this, _41a);
                });
            }, removeItem: function (jq, _41b) {
                return jq.each(function () {
                    _409(this, _41b);
                });
            }, enableItem: function (jq, _41c) {
                return jq.each(function () {
                    _3e6(this, _41c, false);
                });
            }, disableItem: function (jq, _41d) {
                return jq.each(function () {
                    _3e6(this, _41d, true);
                });
            }, showItem: function (jq, _41e) {
                return jq.each(function () {
                    _40e(this, _41e, true);
                });
            }, hideItem: function (jq, _41f) {
                return jq.each(function () {
                    _40e(this, _41f, false);
                });
            }, resize: function (jq, _420) {
                return jq.each(function () {
                    _3e8(this, $(_420));
                });
            }
        };
        $.fn.menu.parseOptions = function (_421) {
            return $.extend({}, $.parser.parseOptions(_421, [{
                minWidth: "number",
                itemHeight: "number",
                duration: "number",
                hideOnUnhover: "boolean"
            }, {fit: "boolean", inline: "boolean", noline: "boolean"}]));
        };
        $.fn.menu.defaults = {
            zIndex: 110000,
            left: 0,
            top: 0,
            alignTo: null,
            align: "left",
            minWidth: 120,
            itemHeight: 22,
            duration: 100,
            hideOnUnhover: true,
            inline: false,
            fit: false,
            noline: false,
            onShow: function () {
            },
            onHide: function () {
            },
            onClick: function (item) {
            }
        };
    })(jQuery);
    //menubutton
    (function ($) {
        function init(_422) {
            var opts = $.data(_422, "menubutton").options;
            var btn = $(_422);
            btn.linkbutton(opts);
            if (opts.hasDownArrow) {
                btn.removeClass(opts.cls.btn1 + " " + opts.cls.btn2).addClass("m-btn");
                btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + opts.size);
                var _423 = btn.find(".l-btn-left");
                $("<span></span>").addClass(opts.cls.arrow).appendTo(_423);
                $("<span></span>").addClass("m-btn-line").appendTo(_423);
            }
            $(_422).menubutton("resize");
            if (opts.menu) {
                $(opts.menu).menu({duration: opts.duration});
                var _424 = $(opts.menu).menu("options");
                var _425 = _424.onShow;
                var _426 = _424.onHide;
                $.extend(_424, {
                    onShow: function () {
                        var _427 = $(this).menu("options");
                        var btn = $(_427.alignTo);
                        var opts = btn.menubutton("options");
                        btn.addClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _425.call(this);
                    }, onHide: function () {
                        var _428 = $(this).menu("options");
                        var btn = $(_428.alignTo);
                        var opts = btn.menubutton("options");
                        btn.removeClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _426.call(this);
                    }
                });
            }
        };
        function _429(_42a) {
            var opts = $.data(_42a, "menubutton").options;
            var btn = $(_42a);
            var t = btn.find("." + opts.cls.trigger);
            if (!t.length) {
                t = btn;
            }
            t.unbind(".menubutton");
            var _42b = null;
            t.bind("click.menubutton", function () {
                if (!_42c()) {
                    _42d(_42a);
                    return false;
                }
            }).bind("mouseenter.menubutton", function () {
                if (!_42c()) {
                    _42b = setTimeout(function () {
                        _42d(_42a);
                    }, opts.duration);
                    return false;
                }
            }).bind("mouseleave.menubutton", function () {
                if (_42b) {
                    clearTimeout(_42b);
                }
                $(opts.menu).triggerHandler("mouseleave");
            });
            function _42c() {
                return $(_42a).linkbutton("options").disabled;
            };
        };
        function _42d(_42e) {
            var opts = $(_42e).menubutton("options");
            if (opts.disabled || !opts.menu) {
                return;
            }
            $("body>div.menu-top").menu("hide");
            var btn = $(_42e);
            var mm = $(opts.menu);
            if (mm.length) {
                mm.menu("options").alignTo = btn;
                mm.menu("show", {alignTo: btn, align: opts.menuAlign});
            }
            btn.blur();
        };
        $.fn.menubutton = function (_42f, _430) {
            if (typeof _42f == "string") {
                var _431 = $.fn.menubutton.methods[_42f];
                if (_431) {
                    return _431(this, _430);
                } else {
                    return this.linkbutton(_42f, _430);
                }
            }
            _42f = _42f || {};
            return this.each(function () {
                var _432 = $.data(this, "menubutton");
                if (_432) {
                    $.extend(_432.options, _42f);
                } else {
                    $.data(this, "menubutton", {options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), _42f)});
                    $(this).removeAttr("disabled");
                }
                init(this);
                _429(this);
            });
        };
        $.fn.menubutton.methods = {
            options: function (jq) {
                var _433 = jq.linkbutton("options");
                return $.extend($.data(jq[0], "menubutton").options, {
                    toggle: _433.toggle,
                    selected: _433.selected,
                    disabled: _433.disabled
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var opts = $(this).menubutton("options");
                    if (opts.menu) {
                        $(opts.menu).menu("destroy");
                    }
                    $(this).remove();
                });
            }
        };
        $.fn.menubutton.parseOptions = function (_434) {
            var t = $(_434);
            return $.extend({}, $.fn.linkbutton.parseOptions(_434), $.parser.parseOptions(_434, ["menu", {
                plain: "boolean",
                hasDownArrow: "boolean",
                duration: "number"
            }]));
        };
        $.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            hasDownArrow: true,
            menu: null,
            menuAlign: "left",
            duration: 100,
            cls: {btn1: "m-btn-active", btn2: "m-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn"}
        });
    })(jQuery);
    //splitbutton
    (function ($) {
        function init(_435) {
            var opts = $.data(_435, "splitbutton").options;
            $(_435).menubutton(opts);
            $(_435).addClass("s-btn");
        };
        $.fn.splitbutton = function (_436, _437) {
            if (typeof _436 == "string") {
                var _438 = $.fn.splitbutton.methods[_436];
                if (_438) {
                    return _438(this, _437);
                } else {
                    return this.menubutton(_436, _437);
                }
            }
            _436 = _436 || {};
            return this.each(function () {
                var _439 = $.data(this, "splitbutton");
                if (_439) {
                    $.extend(_439.options, _436);
                } else {
                    $.data(this, "splitbutton", {options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), _436)});
                    $(this).removeAttr("disabled");
                }
                init(this);
            });
        };
        $.fn.splitbutton.methods = {
            options: function (jq) {
                var _43a = jq.menubutton("options");
                var _43b = $.data(jq[0], "splitbutton").options;
                $.extend(_43b, {disabled: _43a.disabled, toggle: _43a.toggle, selected: _43a.selected});
                return _43b;
            }
        };
        $.fn.splitbutton.parseOptions = function (_43c) {
            var t = $(_43c);
            return $.extend({}, $.fn.linkbutton.parseOptions(_43c), $.parser.parseOptions(_43c, ["menu", {
                plain: "boolean",
                duration: "number"
            }]));
        };
        $.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            menu: null,
            duration: 100,
            cls: {
                btn1: "m-btn-active s-btn-active",
                btn2: "m-btn-plain-active s-btn-plain-active",
                arrow: "m-btn-downarrow",
                trigger: "m-btn-line"
            }
        });
    })(jQuery);
    //validatebox $.extend($.fn.validatebox.defaults.rules,{rname:{validator:function(val){},message:''}});
    (function ($) {
        function init(_43d) {
            $(_43d).addClass("validatebox-text");
        };
        function _43e(_43f) {
            var _440 = $.data(_43f, "validatebox");
            _440.validating = false;
            if (_440.timer) {
                clearTimeout(_440.timer);
            }
            $(_43f).etooltip("destroy");
            $(_43f).unbind();
            $(_43f).remove();
        };
        function _441(_442) {
            var opts = $.data(_442, "validatebox").options;
            var box = $(_442);
            box.unbind(".validatebox");
            if (opts.novalidate || box.is(":disabled")) {
                return;
            }
            for (var _443 in opts.events) {
                $(_442).bind(_443 + ".validatebox", {target: _442}, opts.events[_443]);
            }
        };
        function _444(e) {
            var _445 = e.data.target;
            var _446 = $.data(_445, "validatebox");
            var box = $(_445);
            if ($(_445).attr("readonly")) {
                return;
            }
            _446.validating = true;
            _446.value = undefined;
            (function () {
                if (_446.validating) {
                    if (_446.value != box.val()) {
                        _446.value = box.val();
                        if (_446.timer) {
                            clearTimeout(_446.timer);
                        }
                        _446.timer = setTimeout(function () {
                            $(_445).validatebox("validate");
                        }, _446.options.delay);
                    } else {
                        _447(_445);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        };
        function _448(e) {
            var _449 = e.data.target;
            var _44a = $.data(_449, "validatebox");
            if (_44a.timer) {
                clearTimeout(_44a.timer);
                _44a.timer = undefined;
            }
            _44a.validating = false;
            _44b(_449);
        };
        function _44c(e) {
            var _44d = e.data.target;
            if ($(_44d).hasClass("validatebox-invalid")) {
                _44e(_44d);
            }
        };
        function _44f(e) {
            var _450 = e.data.target;
            var _451 = $.data(_450, "validatebox");
            if (!_451.validating) {
                _44b(_450);
            }
        };
        function _44e(_452) {
            var _453 = $.data(_452, "validatebox");
            var opts = _453.options;
            $(_452).etooltip($.extend({}, opts.tipOptions, {
                content: _453.message,
                position: opts.tipPosition,
                deltaX: opts.deltaX
            })).etooltip("show");
            _453.tip = true;
        };
        function _447(_454) {
            var _455 = $.data(_454, "validatebox");
            if (_455 && _455.tip) {
                $(_454).etooltip("reposition");
            }
        };
        function _44b(_456) {
            var _457 = $.data(_456, "validatebox");
            _457.tip = false;
            $(_456).etooltip("hide");
        };
        function _458(_459) {
            var _45a = $.data(_459, "validatebox");
            var opts = _45a.options;
            var box = $(_459);
            opts.onBeforeValidate.call(_459);
            var _45b = _45c();
            opts.onValidate.call(_459, _45b);
            return _45b;
            function _45d(msg) {
                _45a.message = msg;
            };
            function _45e(_45f, _460) {
                var _461 = box.val();
                var _462 = /([a-zA-Z_]+)(.*)/.exec(_45f);
                var rule = opts.rules[_462[1]];
                if (rule && _461) {
                    var _463 = _460 || opts.validParams || eval(_462[2]);
                    if (!rule["validator"].call(_459, _461, _463)) {
                        box.addClass("validatebox-invalid");
                        var _464 = rule["message"];
                        if (_463) {
                            for (var i = 0; i < _463.length; i++) {
                                _464 = _464.replace(new RegExp("\\{" + i + "\\}", "g"), _463[i]);
                            }
                        }
                        _45d(opts.invalidMessage || _464);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                return true;
            };
            function _45c() {
                box.removeClass("validatebox-invalid");
                _44b(_459);
                if (opts.novalidate || box.is(":disabled")) {
                    return true;
                }
                if (opts.required) {
                    if ((box.val() == "" && !box.attr('contenteditable'))||(box.attr('contenteditable') && $.trim(box.html()) == "")) {
                        box.addClass("validatebox-invalid");
                        _45d(opts.missingMessage);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                if (opts.validType) {
                    if ($.isArray(opts.validType)) {
                        for (var i = 0; i < opts.validType.length; i++) {
                            if (!_45e(opts.validType[i])) {
                                return false;
                            }
                        }
                    } else {
                        if (typeof opts.validType == "string") {
                            if (!_45e(opts.validType)) {
                                return false;
                            }
                        } else {
                            for (var _465 in opts.validType) {
                                var _466 = opts.validType[_465];
                                if (!_45e(_465, _466)) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                return true;
            };
        };
        function _467(_468, _469) {
            var opts = $.data(_468, "validatebox").options;
            if (_469 != undefined) {
                opts.novalidate = _469;
            }
            if (opts.novalidate) {
                $(_468).removeClass("validatebox-invalid");
                _44b(_468);
            }
            _458(_468);
            _441(_468);
        };
        $.fn.validatebox = function (_46a, _46b) {
            if (typeof _46a == "string") {
                return $.fn.validatebox.methods[_46a](this, _46b);
            }
            _46a = _46a || {};
            return this.each(function () {
                var _46c = $.data(this, "validatebox");
                if (_46c) {
                    $.extend(_46c.options, _46a);
                } else {
                    init(this);
                    $.data(this, "validatebox", {options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), _46a)});
                }
                _467(this);
                _458(this);
            });
        };
        $.fn.validatebox.methods = {
            options: function (jq) {
                return $.data(jq[0], "validatebox").options;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _43e(this);
                });
            }, validate: function (jq) {
                return jq.each(function () {
                    _458(this);
                });
            }, isValid: function (jq) {
                return _458(jq[0]);
            }, enableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, false);
                });
            }, disableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, true);
                });
            }
        };
        $.fn.validatebox.parseOptions = function (_46d) {
            var t = $(_46d);
            return $.extend({}, $.parser.parseOptions(_46d, ["validType", "missingMessage", "invalidMessage", "tipPosition", {
                delay: "number",
                deltaX: "number"
            }]), {
                required: (t.attr("required") ? true : undefined),
                novalidate: (t.attr("novalidate") != undefined ? true : undefined)
            });
        };
        $.fn.validatebox.defaults = {
            required: false,
            validType: null,
            validParams: null,
            delay: 200,
            missingMessage: "该项必须填写",
            invalidMessage: null,
            tipPosition: "right",
            deltaX: 0,
            novalidate: false,
            events: {
                focus: _444, blur: _448, mouseenter: _44c, mouseleave: _44f, click: function (e) {
                    var t = $(e.data.target);
                    if (!t.is(":focus")) {
                        t.trigger("focus");
                    }
                }
            },
            tipOptions: {
                showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                    $(this).etooltip("tip").css({color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC"});
                }, onHide: function () {
                    $(this).etooltip("destroy");
                }
            },
            rules: {
                //验证汉字
                chinese: {
                    validator: function (value) {
                        return /^[\u0391-\uFFE5]+$/.test(value);
                    },
                    message: '请输入纯中文'
                },
                //移动手机号码验证
                mobile: {//value值为文本框中的值
                    validator: function (value) {
                        var reg = /^1\d{10}$/;
                        return reg.test(value);
                    },
                    message: '手机号码格式错误'
                },
                //国内邮编验证
                zipCode: {
                    validator: function (value) {
                        var reg = /^[0-9]\d{5}$/;
                        return reg.test(value);
                    },
                    message: '邮编格式错误'
                },
                //数字
                number: {
                    validator: function (value) {
                        var reg =/^[0-9]*$/;
                        return reg.test(value);
                    },
                    message: '请输入纯数字'
                },
                email: {
                    validator: function (_46e) {
                        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_46e);
                    }, message: "Email格式错误"
                }, url: {
                    validator: function (_46f) {
                        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_46f);
                    }, message: "网址格式错误"
                }, length: {
                    validator: function (_470, _471) {
                        var len = $.trim(_470).length;
                        return len >= _471[0] && len <= _471[1];
                    }, message: "请输入{0}个到{1}个字符"
                }, remote: {
                    validator: function (_472, _473) {
                        var data = {};
                        data[_473[1]] = _472;
                        var _474 = $.ajax({
                            url: _473[0],
                            dataType: "json",
                            data: data,
                            async: false,
                            cache: false,
                            type: "post"
                        }).responseText;
                        return _474 == "true";
                    }, message: "填写错误, 请更正"
                }
            },
            onBeforeValidate: function () {
            },
            onValidate: function (_475) {
            }
        };
        $.extendValidateRules=function(obj){return $.extend($.fn.validatebox.defaults.rules,obj);}
    })(jQuery);
    //textbox
    (function ($) {
        function init(_476) {
            $(_476).addClass("textbox-f").hide();
            var span = $("<span class=\"textbox\">" + "<input class=\"textbox-text\" autocomplete=\"off\">" + "<input type=\"hidden\" class=\"textbox-value\">" + "</span>").insertAfter(_476);
            var name = $(_476).attr("name");
            if (name) {
                span.find("input.textbox-value").attr("name", name);
                $(_476).removeAttr("name").attr("textboxName", name);
            }
            return span;
        };
        function _477(_478) {
            var _479 = $.data(_478, "textbox");
            var opts = _479.options;
            var tb = _479.textbox;
            tb.find(".textbox-text").remove();
            if (opts.multiline) {
                $("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
            } else {
                $("<input type=\"" + opts.type + "\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
            }
            tb.find(".textbox-addon").remove();
            var bb = opts.icons ? $.extend(true, [], opts.icons) : [];
            if (opts.iconCls) {
                bb.push({iconCls: opts.iconCls, disabled: true});
            }
            if (bb.length) {
                var bc = $("<span class=\"textbox-addon\"></span>").prependTo(tb);
                bc.addClass("textbox-addon-" + opts.iconAlign);
                for (var i = 0; i < bb.length; i++) {
                    bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon " + bb[i].iconCls + "\" icon-index=\"" + i + "\" tabindex=\"-1\"></a>");
                }
            }
            tb.find(".textbox-button").remove();
            if (opts.buttonText || opts.buttonIcon) {
                var btn = $("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
                btn.addClass("textbox-button-" + opts.buttonAlign).linkbutton({
                    text: opts.buttonText,
                    iconCls: opts.buttonIcon
                });
            }
            _47a(_478, opts.disabled);
            _47b(_478, opts.readonly);
        };
        function _47c(_47d) {
            var tb = $.data(_47d, "textbox").textbox;
            tb.find(".textbox-text").validatebox("destroy");
            tb.remove();
            $(_47d).remove();
        };
        function _47e(_47f, _480) {
            var _481 = $.data(_47f, "textbox");
            var opts = _481.options;
            var tb = _481.textbox;
            var _482 = tb.parent();
            if (_480) {
                opts.width = _480;
            }
            if (isNaN(parseInt(opts.width))) {
                var c = $(_47f).clone();
                c.css("visibility", "hidden");
                c.insertAfter(_47f);
                opts.width = c.outerWidth();
                c.remove();
            }
            var _483 = tb.is(":visible");
            if (!_483) {
                tb.appendTo("body");
            }
            var _484 = tb.find(".textbox-text");
            var btn = tb.find(".textbox-button");
            var _485 = tb.find(".textbox-addon");
            var _486 = _485.find(".textbox-icon");
            tb._size(opts, _482);
            btn.linkbutton("resize", {height: tb.height()});
            btn.css({left: (opts.buttonAlign == "left" ? 0 : ""), right: (opts.buttonAlign == "right" ? 0 : "")});
            _485.css({
                left: (opts.iconAlign == "left" ? (opts.buttonAlign == "left" ? btn._outerWidth() : 0) : ""),
                right: (opts.iconAlign == "right" ? (opts.buttonAlign == "right" ? btn._outerWidth() : 0) : "")
            });
            _486.css({width: opts.iconWidth + "px", height: tb.height() + "px"});
            _484.css({
                paddingLeft: (_47f.style.paddingLeft || ""),
                paddingRight: (_47f.style.paddingRight || ""),
                marginLeft: _487("left"),
                marginRight: _487("right")
            });
            if (opts.multiline) {
                _484.css({paddingTop: (_47f.style.paddingTop || ""), paddingBottom: (_47f.style.paddingBottom || "")});
                _484._outerHeight(tb.height());
            } else {
                var _488 = Math.floor((tb.height() - _484.height()) / 2);
                _484.css({paddingTop: _488 + "px", paddingBottom: _488 + "px"});
            }
            _484._outerWidth(tb.width() - _486.length * opts.iconWidth - btn._outerWidth());
            if (!_483) {
                tb.insertAfter(_47f);
            }
            opts.onResize.call(_47f, opts.width, opts.height);
            function _487(_489) {
                return (opts.iconAlign == _489 ? _485._outerWidth() : 0) + (opts.buttonAlign == _489 ? btn._outerWidth() : 0);
            };
        };
        function _48a(_48b) {
            var opts = $(_48b).textbox("options");
            var _48c = $(_48b).textbox("textbox");
            _48c.validatebox($.extend({}, opts, {
                deltaX: $(_48b).textbox("getTipX"), onBeforeValidate: function () {
                    var box = $(this);
                    if (!box.is(":focus")) {
                        opts.oldInputValue = box.val();
                        box.val(opts.value);
                    }
                }, onValidate: function (_48d) {
                    var box = $(this);
                    if (opts.oldInputValue != undefined) {
                        box.val(opts.oldInputValue);
                        opts.oldInputValue = undefined;
                    }
                    var tb = box.parent();
                    if (_48d) {
                        tb.removeClass("textbox-invalid");
                    } else {
                        tb.addClass("textbox-invalid");
                    }
                }
            }));
        };
        function _48e(_48f) {
            var _490 = $.data(_48f, "textbox");
            var opts = _490.options;
            var tb = _490.textbox;
            var _491 = tb.find(".textbox-text");
            _491.attr("placeholder", opts.prompt);
            _491.unbind(".textbox");
            if (!opts.disabled && !opts.readonly) {
                _491.bind("blur.textbox", function (e) {
                    if (!tb.hasClass("textbox-focused")) {
                        return;
                    }
                    opts.value = $(this).val();
                    if (opts.value == "") {
                        $(this).val(opts.prompt).addClass("textbox-prompt");
                    } else {
                        $(this).removeClass("textbox-prompt");
                    }
                    tb.removeClass("textbox-focused");
                }).bind("focus.textbox", function (e) {
                    if (tb.hasClass("textbox-focused")) {
                        return;
                    }
                    if ($(this).val() != opts.value) {
                        $(this).val(opts.value);
                    }
                    $(this).removeClass("textbox-prompt");
                    tb.addClass("textbox-focused");
                });
                for (var _492 in opts.inputEvents) {
                    _491.bind(_492 + ".textbox", {target: _48f}, opts.inputEvents[_492]);
                }
            }
            var _493 = tb.find(".textbox-addon");
            _493.unbind().bind("click", {target: _48f}, function (e) {
                var icon = $(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
                if (icon.length) {
                    var _494 = parseInt(icon.attr("icon-index"));
                    var conf = opts.icons[_494];
                    if (conf && conf.handler) {
                        conf.handler.call(icon[0], e);
                        opts.onClickIcon.call(_48f, _494);
                    }
                }
            });
            _493.find(".textbox-icon").each(function (_495) {
                var conf = opts.icons[_495];
                var icon = $(this);
                if (!conf || conf.disabled || opts.disabled || opts.readonly) {
                    icon.addClass("textbox-icon-disabled");
                } else {
                    icon.removeClass("textbox-icon-disabled");
                }
            });
            var btn = tb.find(".textbox-button");
            btn.unbind(".textbox").bind("click.textbox", function () {
                if (!btn.linkbutton("options").disabled) {
                    opts.onClickButton.call(_48f);
                }
            });
            btn.linkbutton((opts.disabled || opts.readonly) ? "disable" : "enable");
            tb.unbind(".textbox").bind("_resize.textbox", function (e, _496) {
                if ($(this).hasClass("eui-fluid") || _496) {
                    _47e(_48f);
                }
                return false;
            });
        };
        function _47a(_497, _498) {
            var _499 = $.data(_497, "textbox");
            var opts = _499.options;
            var tb = _499.textbox;
            if (_498) {
                opts.disabled = true;
                $(_497).attr("disabled", "disabled");
                tb.addClass("textbox-disabled");
                tb.find(".textbox-text,.textbox-value").attr("disabled", "disabled");
            } else {
                opts.disabled = false;
                tb.removeClass("textbox-disabled");
                $(_497).removeAttr("disabled");
                tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
            }
        };
        function _47b(_49a, mode) {
            var _49b = $.data(_49a, "textbox");
            var opts = _49b.options;
            opts.readonly = mode == undefined ? true : mode;
            _49b.textbox.removeClass("textbox-readonly").addClass(opts.readonly ? "textbox-readonly" : "");
            var _49c = _49b.textbox.find(".textbox-text");
            _49c.removeAttr("readonly");
            if (opts.readonly || !opts.editable) {
                _49c.attr("readonly", "readonly");
            }
        };
        $.fn.textbox = function (_49d, _49e) {
            if (typeof _49d == "string") {
                var _49f = $.fn.textbox.methods[_49d];
                if (_49f) {
                    return _49f(this, _49e);
                } else {
                    return this.each(function () {
                        var _4a0 = $(this).textbox("textbox");
                        _4a0.validatebox(_49d, _49e);
                    });
                }
            }
            _49d = _49d || {};
            return this.each(function () {
                var _4a1 = $.data(this, "textbox");
                if (_4a1) {
                    $.extend(_4a1.options, _49d);
                    if (_49d.value != undefined) {
                        _4a1.options.originalValue = _49d.value;
                    }
                } else {
                    _4a1 = $.data(this, "textbox", {
                        options: $.extend({}, $.fn.textbox.defaults, $.fn.textbox.parseOptions(this), _49d),
                        textbox: init(this)
                    });
                    _4a1.options.originalValue = _4a1.options.value;
                }
                _477(this);
                _48e(this);
                _47e(this);
                _48a(this);
                $(this).textbox("initValue", _4a1.options.value);
            });
        };
        $.fn.textbox.methods = {
            options: function (jq) {
                return $.data(jq[0], "textbox").options;
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    var t = $(this);
                    if (t.data("textbox")) {
                        return;
                    }
                    if (!$(from).data("textbox")) {
                        $(from).textbox();
                    }
                    var name = t.attr("name") || "";
                    t.addClass("textbox-f").hide();
                    t.removeAttr("name").attr("textboxName", name);
                    var span = $(from).next().clone().insertAfter(t);
                    span.find("input.textbox-value").attr("name", name);
                    $.data(this, "textbox", {options: $.extend(true, {}, $(from).textbox("options")), textbox: span});
                    var _4a2 = $(from).textbox("button");
                    if (_4a2.length) {
                        t.textbox("button").linkbutton($.extend(true, {}, _4a2.linkbutton("options")));
                    }
                    _48e(this);
                    _48a(this);
                });
            }, textbox: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-text");
            }, button: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-button");
            }, destroy: function (jq) {
                return jq.each(function () {
                    _47c(this);
                });
            }, resize: function (jq, _4a3) {
                return jq.each(function () {
                    _47e(this, _4a3);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _47a(this, true);
                    _48e(this);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _47a(this, false);
                    _48e(this);
                });
            }, readonly: function (jq, mode) {
                return jq.each(function () {
                    _47b(this, mode);
                    _48e(this);
                });
            }, isValid: function (jq) {
                return jq.textbox("textbox").validatebox("isValid");
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setValue", "");
                });
            }, setText: function (jq, _4a4) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    var _4a5 = $(this).textbox("textbox");
                    if ($(this).textbox("getText") != _4a4) {
                        opts.value = _4a4;
                        _4a5.val(_4a4);
                    }
                    if (!_4a5.is(":focus")) {
                        if (_4a4) {
                            _4a5.removeClass("textbox-prompt");
                        } else {
                            _4a5.val(opts.prompt).addClass("textbox-prompt");
                        }
                    }
                    $(this).textbox("validate");
                });
            }, initValue: function (jq, _4a6) {
                return jq.each(function () {
                    var _4a7 = $.data(this, "textbox");
                    _4a7.options.value = "";
                    $(this).textbox("setText", _4a6);
                    _4a7.textbox.find(".textbox-value").val(_4a6);
                    $(this).val(_4a6);
                });
            }, setValue: function (jq, _4a8) {
                return jq.each(function () {
                    var opts = $.data(this, "textbox").options;
                    var _4a9 = $(this).textbox("getValue");
                    $(this).textbox("initValue", _4a8);
                    if (_4a9 != _4a8) {
                        opts.onChange.call(this, _4a8, _4a9);
                        $(this).closest("form").trigger("_change", [this]);
                    }
                });
            }, getText: function (jq) {
                var _4aa = jq.textbox("textbox");
                if (_4aa.is(":focus")) {
                    return _4aa.val();
                } else {
                    return jq.textbox("options").value;
                }
            }, getValue: function (jq) {
                return jq.data("textbox").textbox.find(".textbox-value").val();
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    $(this).textbox("setValue", opts.originalValue);
                });
            }, getIcon: function (jq, _4ab) {
                return jq.data("textbox").textbox.find(".textbox-icon:eq(" + _4ab + ")");
            }, getTipX: function (jq) {
                var _4ac = jq.data("textbox");
                var opts = _4ac.options;
                var tb = _4ac.textbox;
                var _4ad = tb.find(".textbox-text");
                var _4ae = tb.find(".textbox-addon")._outerWidth();
                var _4af = tb.find(".textbox-button")._outerWidth();
                if (opts.tipPosition == "right") {
                    return (opts.iconAlign == "right" ? _4ae : 0) + (opts.buttonAlign == "right" ? _4af : 0) + 1;
                } else {
                    if (opts.tipPosition == "left") {
                        return (opts.iconAlign == "left" ? -_4ae : 0) + (opts.buttonAlign == "left" ? -_4af : 0) - 1;
                    } else {
                        return _4ae / 2 * (opts.iconAlign == "right" ? 1 : -1);
                    }
                }
            }
        };
        $.fn.textbox.parseOptions = function (_4b0) {
            var t = $(_4b0);
            return $.extend({}, $.fn.validatebox.parseOptions(_4b0), $.parser.parseOptions(_4b0, ["prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
                multiline: "boolean",
                editable: "boolean",
                iconWidth: "number"
            }]), {
                value: (t.val() || undefined),
                type: (t.attr("type") ? t.attr("type") : undefined),
                disabled: (t.attr("disabled") ? true : undefined),
                readonly: (t.attr("readonly") ? true : undefined)
            });
        };
        $.fn.textbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
            width: "auto",
            height: 22,
            prompt: "",
            value: "",
            type: "text",
            multiline: false,
            editable: true,
            disabled: false,
            readonly: false,
            icons: [],
            iconCls: null,
            iconAlign: "right",
            iconWidth: 18,
            buttonText: "",
            buttonIcon: null,
            buttonAlign: "right",
            inputEvents: {
                blur: function (e) {
                    var t = $(e.data.target);
                    var opts = t.textbox("options");
                    t.textbox("setValue", opts.value);
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.textbox("setValue", t.textbox("getText"));
                    }
                }
            },
            onChange: function (_4b1, _4b2) {
            },
            onResize: function (_4b3, _4b4) {
            },
            onClickButton: function () {
            },
            onClickIcon: function (_4b5) {
            }
        });
    })(jQuery);
    //filebox
    (function ($) {
        var _4b6 = 0;

        function _4b7(_4b8) {
            var _4b9 = $.data(_4b8, "filebox");
            var opts = _4b9.options;
            var id = "filebox_file_id_" + (++_4b6);
            $(_4b8).addClass("filebox-f").textbox(opts);
            $(_4b8).textbox("textbox").attr("readonly", "readonly");
            _4b9.filebox = $(_4b8).next().addClass("filebox");
            _4b9.filebox.find(".textbox-value").remove();
            opts.oldValue = "";
            var file = $("<input type=\"file\" class=\"textbox-value\">").appendTo(_4b9.filebox);
            file.attr("id", id).attr("name", $(_4b8).attr("textboxName") || "");
            file.change(function () {
                $(_4b8).filebox("setText", this.value);
                opts.onChange.call(_4b8, this.value, opts.oldValue);
                opts.oldValue = this.value;
            });
            var btn = $(_4b8).filebox("button");
            if (btn.length) {
                $("<label class=\"filebox-label\" for=\"" + id + "\"></label>").appendTo(btn);
                if (btn.linkbutton("options").disabled) {
                    file.attr("disabled", "disabled");
                } else {
                    file.removeAttr("disabled");
                }
            }
        };
        $.fn.filebox = function (_4ba, _4bb) {
            if (typeof _4ba == "string") {
                var _4bc = $.fn.filebox.methods[_4ba];
                if (_4bc) {
                    return _4bc(this, _4bb);
                } else {
                    return this.textbox(_4ba, _4bb);
                }
            }
            _4ba = _4ba || {};
            return this.each(function () {
                var _4bd = $.data(this, "filebox");
                if (_4bd) {
                    $.extend(_4bd.options, _4ba);
                } else {
                    $.data(this, "filebox", {options: $.extend({}, $.fn.filebox.defaults, $.fn.filebox.parseOptions(this), _4ba)});
                }
                _4b7(this);
            });
        };
        $.fn.filebox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "filebox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.filebox.parseOptions = function (_4be) {
            return $.extend({}, $.fn.textbox.parseOptions(_4be), {});
        };
        $.fn.filebox.defaults = $.extend({}, $.fn.textbox.defaults, {
            buttonIcon: null,
            buttonText: "Choose File",
            buttonAlign: "right",
            inputEvents: {}
        });
    })(jQuery);
    //searchbox
    (function ($) {
        function _4bf(_4c0) {
            var _4c1 = $.data(_4c0, "searchbox");
            var opts = _4c1.options;
            var _4c2 = $.extend(true, [], opts.icons);
            _4c2.push({
                iconCls: "searchbox-button", handler: function (e) {
                    var t = $(e.data.target);
                    var opts = t.searchbox("options");
                    opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                }
            });
            _4c3();
            var _4c4 = _4c5();
            $(_4c0).addClass("searchbox-f").textbox($.extend({}, opts, {
                icons: _4c2,
                buttonText: (_4c4 ? _4c4.text : "")
            }));
            $(_4c0).attr("searchboxName", $(_4c0).attr("textboxName"));
            _4c1.searchbox = $(_4c0).next();
            _4c1.searchbox.addClass("searchbox");
            _4c6(_4c4);
            function _4c3() {
                if (opts.menu) {
                    _4c1.menu = $(opts.menu).menu();
                    var _4c7 = _4c1.menu.menu("options");
                    var _4c8 = _4c7.onClick;
                    _4c7.onClick = function (item) {
                        _4c6(item);
                        _4c8.call(this, item);
                    };
                } else {
                    if (_4c1.menu) {
                        _4c1.menu.menu("destroy");
                    }
                    _4c1.menu = null;
                }
            };
            function _4c5() {
                if (_4c1.menu) {
                    var item = _4c1.menu.children("div.menu-item:first");
                    _4c1.menu.children("div.menu-item").each(function () {
                        var _4c9 = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                        if (_4c9.selected) {
                            item = $(this);
                            return false;
                        }
                    });
                    return _4c1.menu.menu("getItem", item[0]);
                } else {
                    return null;
                }
            };
            function _4c6(item) {
                if (!item) {
                    return;
                }
                $(_4c0).textbox("button").menubutton({
                    text: item.text,
                    iconCls: (item.iconCls || null),
                    menu: _4c1.menu,
                    menuAlign: opts.buttonAlign,
                    plain: false
                });
                _4c1.searchbox.find("input.textbox-value").attr("name", item.name || item.text);
                $(_4c0).searchbox("resize");
            };
        };
        $.fn.searchbox = function (_4ca, _4cb) {
            if (typeof _4ca == "string") {
                var _4cc = $.fn.searchbox.methods[_4ca];
                if (_4cc) {
                    return _4cc(this, _4cb);
                } else {
                    return this.textbox(_4ca, _4cb);
                }
            }
            _4ca = _4ca || {};
            return this.each(function () {
                var _4cd = $.data(this, "searchbox");
                if (_4cd) {
                    $.extend(_4cd.options, _4ca);
                } else {
                    $.data(this, "searchbox", {options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), _4ca)});
                }
                _4bf(this);
            });
        };
        $.fn.searchbox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "searchbox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, menu: function (jq) {
                return $.data(jq[0], "searchbox").menu;
            }, getName: function (jq) {
                return $.data(jq[0], "searchbox").searchbox.find("input.textbox-value").attr("name");
            }, selectName: function (jq, name) {
                return jq.each(function () {
                    var menu = $.data(this, "searchbox").menu;
                    if (menu) {
                        menu.children("div.menu-item").each(function () {
                            var item = menu.menu("getItem", this);
                            if (item.name == name) {
                                $(this).triggerHandler("click");
                                return false;
                            }
                        });
                    }
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var menu = $(this).searchbox("menu");
                    if (menu) {
                        menu.menu("destroy");
                    }
                    $(this).textbox("destroy");
                });
            }
        };
        $.fn.searchbox.parseOptions = function (_4ce) {
            var t = $(_4ce);
            return $.extend({}, $.fn.textbox.parseOptions(_4ce), $.parser.parseOptions(_4ce, ["menu"]), {searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)});
        };
        $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                keydown: function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var t = $(e.data.target);
                        var opts = t.searchbox("options");
                        t.searchbox("setValue", $(this).val());
                        opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                        return false;
                    }
                }
            }), buttonAlign: "left", menu: null, searcher: function (_4cf, name) {
            }
        });
    })(jQuery);
    //form deleted
    //numberbox
    (function ($) {
        function _4fe(_4ff) {
            var _500 = $.data(_4ff, "numberbox");
            var opts = _500.options;
            $(_4ff).addClass("numberbox-f").textbox(opts);
            $(_4ff).textbox("textbox").css({imeMode: "disabled"});
            $(_4ff).attr("numberboxName", $(_4ff).attr("textboxName"));
            _500.numberbox = $(_4ff).next();
            _500.numberbox.addClass("numberbox");
            var _501 = opts.parser.call(_4ff, opts.value);
            var _502 = opts.formatter.call(_4ff, _501);
            $(_4ff).numberbox("initValue", _501).numberbox("setText", _502);
        };
        function _503(_504, _505) {
            var _506 = $.data(_504, "numberbox");
            var opts = _506.options;
            var _505 = opts.parser.call(_504, _505);
            var text = opts.formatter.call(_504, _505);
            opts.value = _505;
            $(_504).textbox("setText", text).textbox("setValue", _505);
            text = opts.formatter.call(_504, $(_504).textbox("getValue"));
            $(_504).textbox("setText", text);
        };
        $.fn.numberbox = function (_507, _508) {
            if (typeof _507 == "string") {
                var _509 = $.fn.numberbox.methods[_507];
                if (_509) {
                    return _509(this, _508);
                } else {
                    return this.textbox(_507, _508);
                }
            }
            _507 = _507 || {};
            return this.each(function () {
                var _50a = $.data(this, "numberbox");
                if (_50a) {
                    $.extend(_50a.options, _507);
                } else {
                    _50a = $.data(this, "numberbox", {options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), _507)});
                }
                _4fe(this);
            });
        };
        $.fn.numberbox.methods = {
            options: function (jq) {
                var opts = jq.data("textbox") ? jq.textbox("options") : {};
                return $.extend($.data(jq[0], "numberbox").options, {
                    width: opts.width,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, fix: function (jq) {
                return jq.each(function () {
                    $(this).numberbox("setValue", $(this).numberbox("getText"));
                });
            }, setValue: function (jq, _50b) {
                return jq.each(function () {
                    _503(this, _50b);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("clear");
                    $(this).numberbox("options").value = "";
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    $(this).textbox("reset");
                    $(this).numberbox("setValue", $(this).numberbox("getValue"));
                });
            }
        };
        $.fn.numberbox.parseOptions = function (_50c) {
            var t = $(_50c);
            return $.extend({}, $.fn.textbox.parseOptions(_50c), $.parser.parseOptions(_50c, ["decimalSeparator", "groupSeparator", "suffix", {
                min: "number",
                max: "number",
                precision: "number"
            }]), {prefix: (t.attr("prefix") ? t.attr("prefix") : undefined)});
        };
        $.fn.numberbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {
                keypress: function (e) {
                    var _50d = e.data.target;
                    var opts = $(_50d).numberbox("options");
                    return opts.filter.call(_50d, e);
                }, blur: function (e) {
                    var _50e = e.data.target;
                    $(_50e).numberbox("setValue", $(_50e).numberbox("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var _50f = e.data.target;
                        $(_50f).numberbox("setValue", $(_50f).numberbox("getText"));
                    }
                }
            },
            min: null,
            max: null,
            precision: 0,
            decimalSeparator: ".",
            groupSeparator: "",
            prefix: "",
            suffix: "",
            filter: function (e) {
                var opts = $(this).numberbox("options");
                var s = $(this).numberbox("getText");
                if (e.which == 13) {
                    return true;
                }
                if (e.which == 45) {
                    return (s.indexOf("-") == -1 ? true : false);
                }
                var c = String.fromCharCode(e.which);
                if (c == opts.decimalSeparator) {
                    return (s.indexOf(c) == -1 ? true : false);
                } else {
                    if (c == opts.groupSeparator) {
                        return true;
                    } else {
                        if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                            return true;
                        } else {
                            if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            formatter: function (_510) {
                if (!_510) {
                    return _510;
                }
                _510 = _510 + "";
                var opts = $(this).numberbox("options");
                var s1 = _510, s2 = "";
                var dpos = _510.indexOf(".");
                if (dpos >= 0) {
                    s1 = _510.substring(0, dpos);
                    s2 = _510.substring(dpos + 1, _510.length);
                }
                if (opts.groupSeparator) {
                    var p = /(\d+)(\d{3})/;
                    while (p.test(s1)) {
                        s1 = s1.replace(p, "$1" + opts.groupSeparator + "$2");
                    }
                }
                if (s2) {
                    return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
                } else {
                    return opts.prefix + s1 + opts.suffix;
                }
            },
            parser: function (s) {
                s = s + "";
                var opts = $(this).numberbox("options");
                if (parseFloat(s) != s) {
                    if (opts.prefix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"), ""));
                    }
                    if (opts.suffix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"), ""));
                    }
                    if (opts.groupSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.groupSeparator, "g"), ""));
                    }
                    if (opts.decimalSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.decimalSeparator, "g"), "."));
                    }
                    s = s.replace(/\s/g, "");
                }
                var val = parseFloat(s).toFixed(opts.precision);
                if (isNaN(val)) {
                    val = "";
                } else {
                    if (typeof (opts.min) == "number" && val < opts.min) {
                        val = opts.min.toFixed(opts.precision);
                    } else {
                        if (typeof (opts.max) == "number" && val > opts.max) {
                            val = opts.max.toFixed(opts.precision);
                        }
                    }
                }
                return val;
            }
        });
    })(jQuery);
    //calendar deleted
    //spinner
    (function ($) {
        function _543(_544) {
            var _545 = $.data(_544, "spinner");
            var opts = _545.options;
            var _546 = $.extend(true, [], opts.icons);
            _546.push({
                iconCls: "spinner-arrow", handler: function (e) {
                    _547(e);
                }
            });
            $(_544).addClass("spinner-f").textbox($.extend({}, opts, {icons: _546}));
            var _548 = $(_544).textbox("getIcon", _546.length - 1);
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
            $(_544).attr("spinnerName", $(_544).attr("textboxName"));
            _545.spinner = $(_544).next();
            _545.spinner.addClass("spinner");
        };
        function _547(e) {
            var _549 = e.data.target;
            var opts = $(_549).spinner("options");
            var up = $(e.target).closest("a.spinner-arrow-up");
            if (up.length) {
                opts.spin.call(_549, false);
                opts.onSpinUp.call(_549);
                $(_549).spinner("validate");
            }
            var down = $(e.target).closest("a.spinner-arrow-down");
            if (down.length) {
                opts.spin.call(_549, true);
                opts.onSpinDown.call(_549);
                $(_549).spinner("validate");
            }
        };
        $.fn.spinner = function (_54a, _54b) {
            if (typeof _54a == "string") {
                var _54c = $.fn.spinner.methods[_54a];
                if (_54c) {
                    return _54c(this, _54b);
                } else {
                    return this.textbox(_54a, _54b);
                }
            }
            _54a = _54a || {};
            return this.each(function () {
                var _54d = $.data(this, "spinner");
                if (_54d) {
                    $.extend(_54d.options, _54a);
                } else {
                    _54d = $.data(this, "spinner", {options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _54a)});
                }
                _543(this);
            });
        };
        $.fn.spinner.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "spinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.spinner.parseOptions = function (_54e) {
            return $.extend({}, $.fn.textbox.parseOptions(_54e), $.parser.parseOptions(_54e, ["min", "max", {increment: "number"}]));
        };
        $.fn.spinner.defaults = $.extend({}, $.fn.textbox.defaults, {
            min: null, max: null, increment: 1, spin: function (down) {
            }, onSpinUp: function () {
            }, onSpinDown: function () {
            }
        });
    })(jQuery);
    (function ($) {
        function _54f(_550) {
            $(_550).addClass("numberspinner-f");
            var opts = $.data(_550, "numberspinner").options;
            $(_550).numberbox(opts).spinner(opts);
            $(_550).numberbox("setValue", opts.value);
        };
        function _551(_552, down) {
            var opts = $.data(_552, "numberspinner").options;
            var v = parseFloat($(_552).numberbox("getValue") || opts.value) || 0;
            if (down) {
                v -= opts.increment;
            } else {
                v += opts.increment;
            }
            $(_552).numberbox("setValue", v);
        };
        $.fn.numberspinner = function (_553, _554) {
            if (typeof _553 == "string") {
                var _555 = $.fn.numberspinner.methods[_553];
                if (_555) {
                    return _555(this, _554);
                } else {
                    return this.numberbox(_553, _554);
                }
            }
            _553 = _553 || {};
            return this.each(function () {
                var _556 = $.data(this, "numberspinner");
                if (_556) {
                    $.extend(_556.options, _553);
                } else {
                    $.data(this, "numberspinner", {options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), _553)});
                }
                _54f(this);
            });
        };
        $.fn.numberspinner.methods = {
            options: function (jq) {
                var opts = jq.numberbox("options");
                return $.extend($.data(jq[0], "numberspinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.numberspinner.parseOptions = function (_557) {
            return $.extend({}, $.fn.spinner.parseOptions(_557), $.fn.numberbox.parseOptions(_557), {});
        };
        $.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
            spin: function (down) {
                _551(this, down);
            }
        });
    })(jQuery);
    (function ($) {
        function _558(_559) {
            var _55a = 0;
            if (_559.selectionStart) {
                _55a = _559.selectionStart;
            } else {
                if (_559.createTextRange) {
                    var _55b = _559.createTextRange();
                    var s = document.selection.createRange();
                    s.setEndPoint("StartToStart", _55b);
                    _55a = s.text.length;
                }
            }
            return _55a;
        };
        function _55c(_55d, _55e, end) {
            if (_55d.selectionStart) {
                _55d.setSelectionRange(_55e, end);
            } else {
                if (_55d.createTextRange) {
                    var _55f = _55d.createTextRange();
                    _55f.collapse();
                    _55f.moveEnd("character", end);
                    _55f.moveStart("character", _55e);
                    _55f.select();
                }
            }
        };
        function _560(_561) {
            var opts = $.data(_561, "timespinner").options;
            $(_561).addClass("timespinner-f").spinner(opts);
            var _562 = opts.formatter.call(_561, opts.parser.call(_561, opts.value));
            $(_561).timespinner("initValue", _562);
        };
        function _563(e) {
            var _564 = e.data.target;
            var opts = $.data(_564, "timespinner").options;
            var _565 = _558(this);
            for (var i = 0; i < opts.selections.length; i++) {
                var _566 = opts.selections[i];
                if (_565 >= _566[0] && _565 <= _566[1]) {
                    _567(_564, i);
                    return;
                }
            }
        };
        function _567(_568, _569) {
            var opts = $.data(_568, "timespinner").options;
            if (_569 != undefined) {
                opts.highlight = _569;
            }
            var _56a = opts.selections[opts.highlight];
            if (_56a) {
                var tb = $(_568).timespinner("textbox");
                _55c(tb[0], _56a[0], _56a[1]);
                tb.focus();
            }
        };
        function _56b(_56c, _56d) {
            var opts = $.data(_56c, "timespinner").options;
            var _56d = opts.parser.call(_56c, _56d);
            var text = opts.formatter.call(_56c, _56d);
            $(_56c).spinner("setValue", text);
        };
        function _56e(_56f, down) {
            var opts = $.data(_56f, "timespinner").options;
            var s = $(_56f).timespinner("getValue");
            var _570 = opts.selections[opts.highlight];
            var s1 = s.substring(0, _570[0]);
            var s2 = s.substring(_570[0], _570[1]);
            var s3 = s.substring(_570[1]);
            var v = s1 + ((parseInt(s2) || 0) + opts.increment * (down ? -1 : 1)) + s3;
            $(_56f).timespinner("setValue", v);
            _567(_56f);
        };
        $.fn.timespinner = function (_571, _572) {
            if (typeof _571 == "string") {
                var _573 = $.fn.timespinner.methods[_571];
                if (_573) {
                    return _573(this, _572);
                } else {
                    return this.spinner(_571, _572);
                }
            }
            _571 = _571 || {};
            return this.each(function () {
                var _574 = $.data(this, "timespinner");
                if (_574) {
                    $.extend(_574.options, _571);
                } else {
                    $.data(this, "timespinner", {options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), _571)});
                }
                _560(this);
            });
        };
        $.fn.timespinner.methods = {
            options: function (jq) {
                var opts = jq.data("spinner") ? jq.spinner("options") : {};
                return $.extend($.data(jq[0], "timespinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, setValue: function (jq, _575) {
                return jq.each(function () {
                    _56b(this, _575);
                });
            }, getHours: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[0], 10);
            }, getMinutes: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[1], 10);
            }, getSeconds: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[2], 10) || 0;
            }
        };
        $.fn.timespinner.parseOptions = function (_576) {
            return $.extend({}, $.fn.spinner.parseOptions(_576), $.parser.parseOptions(_576, ["separator", {
                showSeconds: "boolean",
                highlight: "number"
            }]));
        };
        $.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
            inputEvents: $.extend({}, $.fn.spinner.defaults.inputEvents, {
                click: function (e) {
                    _563.call(this, e);
                }, blur: function (e) {
                    var t = $(e.data.target);
                    t.timespinner("setValue", t.timespinner("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.timespinner("setValue", t.timespinner("getText"));
                    }
                }
            }),
            formatter: function (date) {
                if (!date) {
                    return "";
                }
                var opts = $(this).timespinner("options");
                var tt = [_577(date.getHours()), _577(date.getMinutes())];
                if (opts.showSeconds) {
                    tt.push(_577(date.getSeconds()));
                }
                return tt.join(opts.separator);
                function _577(_578) {
                    return (_578 < 10 ? "0" : "") + _578;
                };
            },
            parser: function (s) {
                var opts = $(this).timespinner("options");
                var date = _579(s);
                if (date) {
                    var min = _579(opts.min);
                    var max = _579(opts.max);
                    if (min && min > date) {
                        date = min;
                    }
                    if (max && max < date) {
                        date = max;
                    }
                }
                return date;
                function _579(s) {
                    if (!s) {
                        return null;
                    }
                    var tt = s.split(opts.separator);
                    return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
                };
                if (!s) {
                    return null;
                }
                var tt = s.split(opts.separator);
                return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
            },
            selections: [[0, 2], [3, 5], [6, 8]],
            separator: ":",
            showSeconds: false,
            highlight: 0,
            spin: function (down) {
                _56e(this, down);
            }
        });
    })(jQuery);
    //datetimespinner deleted
    //datagrid deleted
    //propertygrid deleted
    //treegrid deleted
    //datalist deleted
    //combo
    (function ($) {
        $(function () {
            $(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function (e) {
                var p = $(e.target).closest("span.combo,div.combo-p,div.menu");
                if (p.length) {
                    _90a(p);
                    return;
                }
                $("body>div.combo-p>div.combo-epanel:visible").epanel("close");
            });
        });
        function _90b(_90c) {
            var _90d = $.data(_90c, "combo");
            var opts = _90d.options;
            if (!_90d.epanel) {
                _90d.epanel = $("<div class=\"combo-epanel\"></div>").appendTo("body");
                _90d.epanel.epanel({
                    minWidth: opts.epanelMinWidth,
                    maxWidth: opts.epanelMaxWidth,
                    minHeight: opts.epanelMinHeight,
                    maxHeight: opts.epanelMaxHeight,
                    doSize: false,
                    closed: true,
                    cls: "combo-p",
                    style: {position: "absolute", zIndex: 10},
                    onOpen: function () {
                        var _90e = $(this).epanel("options").comboTarget;
                        var _90f = $.data(_90e, "combo");
                        if (_90f) {
                            _90f.options.onShowepanel.call(_90e);
                        }
                    },
                    onBeforeClose: function () {
                        _90a(this);
                    },
                    onClose: function () {
                        var _910 = $(this).epanel("options").comboTarget;
                        var _911 = $(_910).data("combo");
                        if (_911) {
                            _911.options.onHideepanel.call(_910);
                        }
                    }
                });
            }
            var _912 = $.extend(true, [], opts.icons);
            if (opts.hasDownArrow) {
                _912.push({
                    iconCls: "combo-arrow", handler: function (e) {
                        _916(e.data.target);
                    }
                });
            }
            $(_90c).addClass("combo-f").textbox($.extend({}, opts, {
                icons: _912, onChange: function () {
                }
            }));
            $(_90c).attr("comboName", $(_90c).attr("textboxName"));
            _90d.combo = $(_90c).next();
            _90d.combo.addClass("combo");
        };
        function _913(_914) {
            var _915 = $.data(_914, "combo");
            var opts = _915.options;
            var p = _915.epanel;
            if (p.is(":visible")) {
                p.epanel("close");
            }
            if (!opts.cloned) {
                p.epanel("destroy");
            }
            $(_914).textbox("destroy");
        };
        function _916(_917) {
            var _918 = $.data(_917, "combo").epanel;
            if (_918.is(":visible")) {
                _919(_917);
            } else {
                var p = $(_917).closest("div.combo-epanel");
                $("div.combo-epanel:visible").not(_918).not(p).epanel("close");
                $(_917).combo("showepanel");
            }
            $(_917).combo("textbox").focus();
        };
        function _90a(_91a) {
            $(_91a).find(".combo-f").each(function () {
                var p = $(this).combo("epanel");
                if (p.is(":visible")) {
                    p.epanel("close");
                }
            });
        };
        function _91b(e) {
            var _91c = e.data.target;
            var _91d = $.data(_91c, "combo");
            var opts = _91d.options;
            var _91e = _91d.epanel;
            if (!opts.editable) {
                _916(_91c);
            } else {
                var p = $(_91c).closest("div.combo-epanel");
                $("div.combo-epanel:visible").not(_91e).not(p).epanel("close");
            }
        };
        function _91f(e) {
            var _920 = e.data.target;
            var t = $(_920);
            var _921 = t.data("combo");
            var opts = t.combo("options");
            switch (e.keyCode) {
                case 38:
                    opts.keyHandler.up.call(_920, e);
                    break;
                case 40:
                    opts.keyHandler.down.call(_920, e);
                    break;
                case 37:
                    opts.keyHandler.left.call(_920, e);
                    break;
                case 39:
                    opts.keyHandler.right.call(_920, e);
                    break;
                case 13:
                    e.preventDefault();
                    opts.keyHandler.enter.call(_920, e);
                    return false;
                case 9:
                case 27:
                    _919(_920);
                    break;
                default:
                    if (opts.editable) {
                        if (_921.timer) {
                            clearTimeout(_921.timer);
                        }
                        _921.timer = setTimeout(function () {
                            var q = t.combo("getText");
                            if (_921.previousText != q) {
                                _921.previousText = q;
                                t.combo("showepanel");
                                opts.keyHandler.query.call(_920, q, e);
                                t.combo("validate");
                            }
                        }, opts.delay);
                    }
            }
        };
        function _922(_923) {
            var _924 = $.data(_923, "combo");
            var _925 = _924.combo;
            var _926 = _924.epanel;
            var opts = $(_923).combo("options");
            var _927 = _926.epanel("options");
            _927.comboTarget = _923;
            if (_927.closed) {
                _926.epanel("epanel").show().css({
                    zIndex: ($.fn.menu ? $.fn.menu.defaults.zIndex++ : $.fn.window.defaults.zIndex++),
                    left: -999999
                });
                _926.epanel("resize", {
                    width: (opts.epanelWidth ? opts.epanelWidth : _925._outerWidth()),
                    height: opts.epanelHeight
                });
                _926.epanel("epanel").hide();
                _926.epanel("open");
            }
            (function () {
                if (_926.is(":visible")) {
                    _926.epanel("move", {left: _928(), top: _929()});
                    setTimeout(arguments.callee, 200);
                }
            })();
            function _928() {
                var left = _925.offset().left;
                if (opts.epanelAlign == "right") {
                    left += _925._outerWidth() - _926._outerWidth();
                }
                if (left + _926._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - _926._outerWidth();
                }
                if (left < 0) {
                    left = 0;
                }
                return left;
            };
            function _929() {
                var top = _925.offset().top + _925._outerHeight();
                if (top + _926._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    top = _925.offset().top - _926._outerHeight();
                }
                if (top < $(document).scrollTop()) {
                    top = _925.offset().top + _925._outerHeight();
                }
                return top;
            };
        };
        function _919(_92a) {
            var _92b = $.data(_92a, "combo").epanel;
            _92b.epanel("close");
        };
        function _92c(_92d, text) {
            var _92e = $.data(_92d, "combo");
            var _92f = $(_92d).textbox("getText");
            if (_92f != text) {
                $(_92d).textbox("setText", text);
                _92e.previousText = text;
            }
        };
        function _930(_931) {
            var _932 = [];
            var _933 = $.data(_931, "combo").combo;
            _933.find(".textbox-value").each(function () {
                _932.push($(this).val());
            });
            return _932;
        };
        function _934(_935, _936) {
            var _937 = $.data(_935, "combo");
            var opts = _937.options;
            var _938 = _937.combo;
            if (!$.isArray(_936)) {
                _936 = _936.split(opts.separator);
            }
            var _939 = _930(_935);
            _938.find(".textbox-value").remove();
            var name = $(_935).attr("textboxName") || "";
            for (var i = 0; i < _936.length; i++) {
                var _93a = $("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_938);
                _93a.attr("name", name);
                if (opts.disabled) {
                    _93a.attr("disabled", "disabled");
                }
                _93a.val(_936[i]);
            }
            var _93b = (function () {
                if (_939.length != _936.length) {
                    return true;
                }
                var a1 = $.extend(true, [], _939);
                var a2 = $.extend(true, [], _936);
                a1.sort();
                a2.sort();
                for (var i = 0; i < a1.length; i++) {
                    if (a1[i] != a2[i]) {
                        return true;
                    }
                }
                return false;
            })();
            if (_93b) {
                if (opts.multiple) {
                    opts.onChange.call(_935, _936, _939);
                } else {
                    opts.onChange.call(_935, _936[0], _939[0]);
                }
                $(_935).closest("form").trigger("_change", [_935]);
            }
        };
        function _93c(_93d) {
            var _93e = _930(_93d);
            return _93e[0];
        };
        function _93f(_940, _941) {
            _934(_940, [_941]);
        };
        function _942(_943) {
            var opts = $.data(_943, "combo").options;
            var _944 = opts.onChange;
            opts.onChange = function () {
            };
            if (opts.multiple) {
                _934(_943, opts.value ? opts.value : []);
            } else {
                _93f(_943, opts.value);
            }
            opts.onChange = _944;
        };
        $.fn.combo = function (_945, _946) {
            if (typeof _945 == "string") {
                var _947 = $.fn.combo.methods[_945];
                if (_947) {
                    return _947(this, _946);
                } else {
                    return this.textbox(_945, _946);
                }
            }
            _945 = _945 || {};
            return this.each(function () {
                var _948 = $.data(this, "combo");
                if (_948) {
                    $.extend(_948.options, _945);
                    if (_945.value != undefined) {
                        _948.options.originalValue = _945.value;
                    }
                } else {
                    _948 = $.data(this, "combo", {
                        options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), _945),
                        previousText: ""
                    });
                    _948.options.originalValue = _948.options.value;
                }
                _90b(this);
                _942(this);
            });
        };
        $.fn.combo.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "combo").options, {
                    width: opts.width,
                    height: opts.height,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    $(this).textbox("cloneFrom", from);
                    $.data(this, "combo", {
                        options: $.extend(true, {cloned: true}, $(from).combo("options")),
                        combo: $(this).next(),
                        epanel: $(from).combo("epanel")
                    });
                    $(this).addClass("combo-f").attr("comboName", $(this).attr("textboxName"));
                });
            }, epanel: function (jq) {
                return $.data(jq[0], "combo").epanel;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _913(this);
                });
            }, showepanel: function (jq) {
                return jq.each(function () {
                    _922(this);
                });
            }, hideepanel: function (jq) {
                return jq.each(function () {
                    _919(this);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setText", "");
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", []);
                    } else {
                        $(this).combo("setValue", "");
                    }
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", opts.originalValue);
                    } else {
                        $(this).combo("setValue", opts.originalValue);
                    }
                });
            }, setText: function (jq, text) {
                return jq.each(function () {
                    _92c(this, text);
                });
            }, getValues: function (jq) {
                return _930(jq[0]);
            }, setValues: function (jq, _949) {
                return jq.each(function () {
                    _934(this, _949);
                });
            }, getValue: function (jq) {
                return _93c(jq[0]);
            }, setValue: function (jq, _94a) {
                return jq.each(function () {
                    _93f(this, _94a);
                });
            }
        };
        $.fn.combo.parseOptions = function (_94b) {
            var t = $(_94b);
            return $.extend({}, $.fn.textbox.parseOptions(_94b), $.parser.parseOptions(_94b, ["separator", "epanelAlign", {
                epanelWidth: "number",
                hasDownArrow: "boolean",
                delay: "number",
                selectOnNavigation: "boolean"
            }, {
                epanelMinWidth: "number",
                epanelMaxWidth: "number",
                epanelMinHeight: "number",
                epanelMaxHeight: "number"
            }]), {
                epanelHeight: (t.attr("epanelHeight") == "auto" ? "auto" : parseInt(t.attr("epanelHeight")) || undefined),
                multiple: (t.attr("multiple") ? true : undefined)
            });
        };
        $.fn.combo.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {click: _91b, keydown: _91f, paste: _91f, drop: _91f},
            epanelWidth: null,
            epanelHeight: 200,
            epanelMinWidth: null,
            epanelMaxWidth: null,
            epanelMinHeight: null,
            epanelMaxHeight: null,
            epanelAlign: "left",
            multiple: false,
            selectOnNavigation: true,
            separator: ",",
            hasDownArrow: true,
            delay: 200,
            keyHandler: {
                up: function (e) {
                }, down: function (e) {
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                }, query: function (q, e) {
                }
            },
            onShowepanel: function () {
            },
            onHideepanel: function () {
            },
            onChange: function (_94c, _94d) {
            }
        });
    })(jQuery);
    //combobox
    (function ($) {
        var _94e = 0;

        function _94f(_950, _951) {
            var _952 = $.data(_950, "combobox");
            var opts = _952.options;
            var data = _952.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i][opts.valueField] == _951) {
                    return i;
                }
            }
            return -1;
        };
        function _953(_954, _955) {
            var opts = $.data(_954, "combobox").options;
            var _956 = $(_954).combo("epanel");
            var item = opts.finder.getEl(_954, _955);
            if (item.length) {
                if (item.position().top <= 0) {
                    var h = _956.scrollTop() + item.position().top;
                    _956.scrollTop(h);
                } else {
                    if (item.position().top + item.outerHeight() > _956.height()) {
                        var h = _956.scrollTop() + item.position().top + item.outerHeight() - _956.height();
                        _956.scrollTop(h);
                    }
                }
            }
        };
        function nav(_957, dir) {
            var opts = $.data(_957, "combobox").options;
            var _958 = $(_957).combobox("epanel");
            var item = _958.children("div.combobox-item-hover");
            if (!item.length) {
                item = _958.children("div.combobox-item-selected");
            }
            item.removeClass("combobox-item-hover");
            var _959 = "div.combobox-item:visible:not(.combobox-item-disabled):first";
            var _95a = "div.combobox-item:visible:not(.combobox-item-disabled):last";
            if (!item.length) {
                item = _958.children(dir == "next" ? _959 : _95a);
            } else {
                if (dir == "next") {
                    item = item.nextAll(_959);
                    if (!item.length) {
                        item = _958.children(_959);
                    }
                } else {
                    item = item.prevAll(_959);
                    if (!item.length) {
                        item = _958.children(_95a);
                    }
                }
            }
            if (item.length) {
                item.addClass("combobox-item-hover");
                var row = opts.finder.getRow(_957, item);
                if (row) {
                    _953(_957, row[opts.valueField]);
                    if (opts.selectOnNavigation) {
                        _95b(_957, row[opts.valueField]);
                    }
                }
            }
        };
        function _95b(_95c, _95d) {
            var opts = $.data(_95c, "combobox").options;
            var _95e = $(_95c).combo("getValues");
            if ($.inArray(_95d + "", _95e) == -1) {
                if (opts.multiple) {
                    _95e.push(_95d);
                } else {
                    _95e = [_95d];
                }
                _95f(_95c, _95e);
                opts.onSelect.call(_95c, opts.finder.getRow(_95c, _95d));
            }
        };
        function _960(_961, _962) {
            var opts = $.data(_961, "combobox").options;
            var _963 = $(_961).combo("getValues");
            var _964 = $.inArray(_962 + "", _963);
            if (_964 >= 0) {
                _963.splice(_964, 1);
                _95f(_961, _963);
                opts.onUnselect.call(_961, opts.finder.getRow(_961, _962));
            }
        };
        function _95f(_965, _966, _967) {
            var opts = $.data(_965, "combobox").options;
            var _968 = $(_965).combo("epanel");
            if (!$.isArray(_966)) {
                _966 = _966.split(opts.separator);
            }
            _968.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            var vv = [], ss = [];
            for (var i = 0; i < _966.length; i++) {
                var v = _966[i];
                var s = v;
                opts.finder.getEl(_965, v).addClass("combobox-item-selected");
                var row = opts.finder.getRow(_965, v);
                if (row) {
                    s = row[opts.textField];
                }
                vv.push(v);
                ss.push(s);
            }
            if (!_967) {
                $(_965).combo("setText", ss.join(opts.separator));
            }
            $(_965).combo("setValues", vv);
        };
        function _969(_96a, data, _96b) {
            var _96c = $.data(_96a, "combobox");
            var opts = _96c.options;
            _96c.data = opts.loadFilter.call(_96a, data);
            _96c.groups = [];
            data = _96c.data;
            var _96d = $(_96a).combobox("getValues");
            var dd = [];
            var _96e = undefined;
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var v = row[opts.valueField] + "";
                var s = row[opts.textField];
                var g = row[opts.groupField];
                if (g) {
                    if (_96e != g) {
                        _96e = g;
                        _96c.groups.push(g);
                        dd.push("<div id=\"" + (_96c.groupIdPrefix + "_" + (_96c.groups.length - 1)) + "\" class=\"combobox-group\">");
                        dd.push(opts.groupFormatter ? opts.groupFormatter.call(_96a, g) : g);
                        dd.push("</div>");
                    }
                } else {
                    _96e = undefined;
                }
                var cls = "combobox-item" + (row.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
                dd.push("<div id=\"" + (_96c.itemIdPrefix + "_" + i) + "\" class=\"" + cls + "\">");
                dd.push(opts.formatter ? opts.formatter.call(_96a, row) : s);
                dd.push("</div>");
                if (row["selected"] && $.inArray(v, _96d) == -1) {
                    _96d.push(v);
                }
            }
            $(_96a).combo("epanel").html(dd.join(""));
            if (opts.multiple) {
                _95f(_96a, _96d, _96b);
            } else {
                _95f(_96a, _96d.length ? [_96d[_96d.length - 1]] : [], _96b);
            }
            opts.onLoadSuccess.call(_96a, data);
        };
        function _96f(_970, url, _971, _972) {
            var opts = $.data(_970, "combobox").options;
            if (url) {
                opts.url = url;
            }
            _971 = $.extend({}, opts.queryParams, _971 || {});
            if (opts.onBeforeLoad.call(_970, _971) == false) {
                return;
            }
            opts.loader.call(_970, _971, function (data) {
                _969(_970, data, _972);
            }, function () {
                opts.onLoadError.apply(this, arguments);
            });
        };
        function _973(_974, q) {
            var _975 = $.data(_974, "combobox");
            var opts = _975.options;
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            if (opts.mode == "remote") {
                _976(qq);
                _96f(_974, null, {q: q}, true);
            } else {
                var _977 = $(_974).combo("epanel");
                _977.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
                _977.find("div.combobox-item,div.combobox-group").hide();
                var data = _975.data;
                var vv = [];
                $.map(qq, function (q) {
                    q = $.trim(q);
                    var _978 = q;
                    var _979 = undefined;
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        if (opts.filter.call(_974, q, row)) {
                            var v = row[opts.valueField];
                            var s = row[opts.textField];
                            var g = row[opts.groupField];
                            var item = opts.finder.getEl(_974, v).show();
                            if (s.toLowerCase() == q.toLowerCase()) {
                                _978 = v;
                                item.addClass("combobox-item-selected");
                            }
                            if (opts.groupField && _979 != g) {
                                $("#" + _975.groupIdPrefix + "_" + $.inArray(g, _975.groups)).show();
                                _979 = g;
                            }
                        }
                    }
                    vv.push(_978);
                });
                _976(vv);
            }
            function _976(vv) {
                _95f(_974, opts.multiple ? (q ? vv : []) : vv, true);
            };
        };
        function _97a(_97b) {
            var t = $(_97b);
            var opts = t.combobox("options");
            var _97c = t.combobox("epanel");
            var item = _97c.children("div.combobox-item-hover");
            if (item.length) {
                var row = opts.finder.getRow(_97b, item);
                var _97d = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        t.combobox("unselect", _97d);
                    } else {
                        t.combobox("select", _97d);
                    }
                } else {
                    t.combobox("select", _97d);
                }
            }
            var vv = [];
            $.map(t.combobox("getValues"), function (v) {
                if (_94f(_97b, v) >= 0) {
                    vv.push(v);
                }
            });
            t.combobox("setValues", vv);
            if (!opts.multiple) {
                t.combobox("hideepanel");
            }
        };
        function _97e(_97f) {
            var _980 = $.data(_97f, "combobox");
            var opts = _980.options;
            _94e++;
            _980.itemIdPrefix = "_eui_combobox_i" + _94e;
            _980.groupIdPrefix = "_eui_combobox_g" + _94e;
            $(_97f).addClass("combobox-f");
            $(_97f).combo($.extend({}, opts, {
                onShowepanel: function () {
                    $(_97f).combo("epanel").find("div.combobox-item,div.combobox-group").show();
                    _953(_97f, $(_97f).combobox("getValue"));
                    opts.onShowepanel.call(_97f);
                }
            }));
            $(_97f).combo("epanel").unbind().bind("mouseover", function (e) {
                $(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
                var item = $(e.target).closest("div.combobox-item");
                if (!item.hasClass("combobox-item-disabled")) {
                    item.addClass("combobox-item-hover");
                }
                e.stopPropagation();
            }).bind("mouseout", function (e) {
                $(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
                e.stopPropagation();
            }).bind("click", function (e) {
                var item = $(e.target).closest("div.combobox-item");
                if (!item.length || item.hasClass("combobox-item-disabled")) {
                    return;
                }
                var row = opts.finder.getRow(_97f, item);
                if (!row) {
                    return;
                }
                var _981 = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        _960(_97f, _981);
                    } else {
                        _95b(_97f, _981);
                    }
                } else {
                    _95b(_97f, _981);
                    $(_97f).combo("hideepanel");
                }
                e.stopPropagation();
            });
        };
        $.fn.combobox = function (_982, _983) {
            if (typeof _982 == "string") {
                var _984 = $.fn.combobox.methods[_982];
                if (_984) {
                    return _984(this, _983);
                } else {
                    return this.combo(_982, _983);
                }
            }
            _982 = _982 || {};
            return this.each(function () {
                var _985 = $.data(this, "combobox");
                if (_985) {
                    $.extend(_985.options, _982);
                    _97e(this);
                } else {
                    _985 = $.data(this, "combobox", {
                        options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _982),
                        data: []
                    });
                    _97e(this);
                    var data = $.fn.combobox.parseData(this);
                    if (data.length) {
                        _969(this, data);
                    }
                }
                if (_985.options.data) {
                    _969(this, _985.options.data);
                }
                _96f(this);
            });
        };
        $.fn.combobox.methods = {
            options: function (jq) {
                var _986 = jq.combo("options");
                return $.extend($.data(jq[0], "combobox").options, {
                    width: _986.width,
                    height: _986.height,
                    originalValue: _986.originalValue,
                    disabled: _986.disabled,
                    readonly: _986.readonly
                });
            }, getData: function (jq) {
                return $.data(jq[0], "combobox").data;
            }, setValues: function (jq, _987) {
                return jq.each(function () {
                    _95f(this, _987);
                });
            }, setValue: function (jq, _988) {
                return jq.each(function () {
                    _95f(this, [_988]);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).combo("clear");
                    var _989 = $(this).combo("epanel");
                    _989.find("div.combobox-item-selected").removeClass("combobox-item-selected");
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).combobox("options");
                    if (opts.multiple) {
                        $(this).combobox("setValues", opts.originalValue);
                    } else {
                        $(this).combobox("setValue", opts.originalValue);
                    }
                });
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _969(this, data);
                });
            }, reload: function (jq, url) {
                return jq.each(function () {
                    if (typeof url == "string") {
                        _96f(this, url);
                    } else {
                        if (url) {
                            var opts = $(this).combobox("options");
                            opts.queryParams = url;
                        }
                        _96f(this);
                    }
                });
            }, select: function (jq, _98a) {
                return jq.each(function () {
                    _95b(this, _98a);
                });
            }, unselect: function (jq, _98b) {
                return jq.each(function () {
                    _960(this, _98b);
                });
            }
        };
        $.fn.combobox.parseOptions = function (_98c) {
            var t = $(_98c);
            return $.extend({}, $.fn.combo.parseOptions(_98c), $.parser.parseOptions(_98c, ["valueField", "textField", "groupField", "mode", "method", "url"]));
        };
        $.fn.combobox.parseData = function (_98d) {
            var data = [];
            var opts = $(_98d).combobox("options");
            $(_98d).children().each(function () {
                if (this.tagName.toLowerCase() == "optgroup") {
                    var _98e = $(this).attr("label");
                    $(this).children().each(function () {
                        _98f(this, _98e);
                    });
                } else {
                    _98f(this);
                }
            });
            return data;
            function _98f(el, _990) {
                var t = $(el);
                var row = {};
                row[opts.valueField] = t.attr("value") != undefined ? t.attr("value") : t.text();
                row[opts.textField] = t.text();
                row["selected"] = t.is(":selected");
                row["disabled"] = t.is(":disabled");
                if (_990) {
                    opts.groupField = opts.groupField || "group";
                    row[opts.groupField] = _990;
                }
                data.push(row);
            };
        };
        $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
            valueField: "value", textField: "text", groupField: null, groupFormatter: function (_991) {
                return _991;
            }, mode: "local", method: "post", url: null, data: null, queryParams: {}, keyHandler: {
                up: function (e) {
                    nav(this, "prev");
                    e.preventDefault();
                }, down: function (e) {
                    nav(this, "next");
                    e.preventDefault();
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _97a(this);
                }, query: function (q, e) {
                    _973(this, q);
                }
            }, filter: function (q, row) {
                var opts = $(this).combobox("options");
                return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
            }, formatter: function (row) {
                var opts = $(this).combobox("options");
                return row[opts.textField];
            }, loader: function (_992, _993, _994) {
                var opts = $(this).combobox("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _992, dataType: "json", success: function (data) {
                        _993(data);
                    }, error: function () {
                        _994.apply(this, arguments);
                    }
                });
            }, loadFilter: function (data) {
                return data;
            }, finder: {
                getEl: function (_995, _996) {
                    var _997 = _94f(_995, _996);
                    var id = $.data(_995, "combobox").itemIdPrefix + "_" + _997;
                    return $("#" + id);
                }, getRow: function (_998, p) {
                    var _999 = $.data(_998, "combobox");
                    var _99a = (p instanceof jQuery) ? p.attr("id").substr(_999.itemIdPrefix.length + 1) : _94f(_998, p);
                    return _999.data[parseInt(_99a)];
                }
            }, onBeforeLoad: function (_99b) {
            }, onLoadSuccess: function () {
            }, onLoadError: function () {
            }, onSelect: function (_99c) {
            }, onUnselect: function (_99d) {
            }
        });
    })(jQuery);
    //combotree deleted
    //combogrid deleted
    //datebox deleted
    //datetimebox deleted
    //slider deleted
}
if ( typeof module === "object" && typeof module.exports === "object" ){
    module.exports=_eui;
}else{
    _eui(window.jQuery);
}

},{}],9:[function(require,module,exports){
var scrollFunc=function (evt) {
    evt = evt || window.event;
    if(evt.preventDefault) {
        // Firefox
        evt.preventDefault();
        evt.stopPropagation();
    } else{
        // IE
        evt.cancelBubble=true;
        evt.returnValue = false;
    }
    return false;
};

module.exports={
        //json与string互转
        obj2str:function(obj){return typeof obj=='object'?JSON.stringify(obj):obj;},
        str2obj:function(str,b){
            var obj;
            if(typeof str=='string'){
                obj=b?eval('('+str+')'):JSON.parse(str);
            }else{
                obj=str;
            }
            return obj;
        },
        dash2camel:function(str){
            var arr=str.split('-');
            for(var i= 1;i<arr.length;i++){
                if(arr[i]){
                    arr[0]=arr[0]+arr[i][0].toUpperCase()+arr[i].slice(1);
                }
            }
            return arr[0];
        },
        camel2dash:function(str){
            for(var i=1;i<str.length;i++){
                if(str[i].match(/[A-Z]/)){
                    str=str.slice(0,i)+'-'+str[i].toLowerCase()+str.slice(i+1);
                }
            }
            return str;
        },
        //简写原生选择器，支持传入第二参数iframe的document
        byid:function(id,doc){return (doc||document).getElementById(id);},
        bytag:function(tag,doc){return (doc||document).getElementsByTagName(tag);},
        byName:function (name,doc) {return (doc||document).getElementsByName(name);},
        //获取位置
        getRect:function(ele){return ele.getBoundingClientRect();},
        //是否出现滚动条 也可以设置overflow-y:hidden,overflow:visible,再恢复保存的overflow值,来比较两次是否有变化来判断 TODO 不准有待修复
        hasScroll:function(p,xory){
            var cstyles=getComputedStyle(p);
            //var paddingsSize= xory=='y' ? (parseInt(cstyles.paddingLeft) + parseInt(cstyles.paddingRight)) : (parseInt(cstyles.paddingTop) + parseInt(cstyles.paddingBottom));
            //var contentUseSize=xory=='y' ? (p.offsetWidth - paddingsSize-bordersSize) : (p.offsetHeight - paddingsSize-bordersSize);;
            var bordersSize= xory=='y'? (parseInt(cstyles.borderLeftWidth) + parseInt(cstyles.borderRightWidth)) : (parseInt(cstyles.borderTopWidth) + parseInt(cstyles.borderBottomWidth));
            var scrollBarWidth=xory=='y'? (p.offsetWidth - p.clientWidth-bordersSize) : (p.offsetHeight - p.clientHeight-bordersSize);
            return scrollBarWidth;
        },
        //调试
        log:function (param){typeof console!='undefined' && console.log(param);},
        info:function(param){typeof console!='undefined' && console.info(param);},
        warn:function(param){typeof console!='undefined' && console.warn(param);},
        error:function(param){typeof console!='undefined' && console.error(param);},
        logEx:function(msg,cssTxt){
                //默认fontsize 16px写前面，后写的可覆盖
                cssTxt= cssTxt ? 'font-size:16px;'+cssTxt : 'font-size:16px;color:red;';
                console.log('%c'+msg,cssTxt);
            },
        //类型判断
        typeOf:(function(){
                var dic={'[object Object]':'object','[object RegExp]':'regexp','[object Date]':'date','[object Array]':'array','[object String]':'string','[object Number]':'number','[object Boolean]':'boolean','[object Error]':'error','[object Window]':'window'};
                var stringify=Object.prototype.toString;
                return function(obj,plus){
                    if(typeof obj !='object')
                        return typeof obj;
                    else if(obj===null)
                        return 'null';
                    else if(plus)
                        return dic[stringify.apply(obj)] || stringify.call(obj).slice(8,-1).toLowerCase()|| 'object';
                    else
                        return dic[stringify.apply(obj)] || 'object';
                };
                })(),
        //queryStr解析
        queryParse:function (str){
                var str=str||location.search;
                var result =str.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]*","g"));
                if(result==null)return false;
                var j=result.length;
                var obj={},arr=[];
                for(var i=0;i<j;i++){
                    arr=result[i].slice(1).split('=');
                    obj[arr[0]]=arr[1];
                }
                return obj;
            },
        //防止百分号标签空白输出在页面上
        getJspData:function(data){
                return data||null;
            },
        replaceDDD:function(value){return value.replace(/\<ddd\>/gmi,"'");},
        //禁止滚轮事件
        disabledMouseWheel:function (ele) {
            var ele=ele||document;
            if(ele.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }//W3C
            //window.onmousewheel =
            ele.onmousewheel = scrollFunc;//IE/Opera/Chrome
        },
        enabledMouseWheel:function (ele,fn){
            var ele=ele||document;
            if(ele.removeEventListener) {
                ele.removeEventListener('DOMMouseScroll', scrollFunc, false);
            }
            //window.onmousewheel =
            ele.onmousewheel = fn||function(){};
        },
        //原生弹窗的封装
        open2:function(){
                var features='';
                var config={status:0,width:top.getWidth()-40,height:top.getHeight()-70,top:20,left:20,scrollbars:1,resizable:1,fullscreen:0,channelmode:0,directories:1,help:0,menubar:0,toolbar:0,location:0};
                var obj=typeof arguments[0]=='object' ? arguments[0]:{url:arguments[0],name:arguments[1],width:arguments[2],height:arguments[3],left:arguments[4],top:arguments[5]} ;
                for (var n in obj){
                    typeof obj[n]!='undefined' && (config[n]=obj[n]);
                }
                for (var m in config){
                    if(m!='url' || m!='name')
                    features += ','+ m + '=' +config[m];
                }
                //log(url +'\n'+ name +'\n'+ features.slice(1))
                var win=window.open(config.url,config.name||'_blank',features.slice(1));
                return win;
            },
        removeTag:function(src,tagName){
            var tags=document.head.getElementsByTagName(tagName||'script');
            src=src.replace('../','').replace('..\\','').replace('.\\','').replace('./','')+'?version='+config.version;
            for(var i=0;i<tags.length;i++){
                if((tagName=='link'?tags[i].href:tags[i].src).split('').reverse().join('').indexOf(src.split('').reverse().join(''))==0){
                    document.head.removeChild(tags[i]);
                }
            }
        },
        checkExistTag:function(src,tagName){
            var tags=document.head.getElementsByTagName(tagName||'script');
            src=src.replace('../','').replace('..\\','').replace('.\\','').replace('./','')+'?version='+config.version;
            //warn(src)
            for(var i=0;i<tags.length;i++){
                //info([tags[i].href,tags[i].src])
                if((tagName=='link'?tags[i].href:tags[i].src).split('').reverse().join('').indexOf(src.split('').reverse().join(''))==0){
                    return tags[i];
                }
            }
            return false;
        },
        //简单加载样式 304改为走200，缓存10天
        $style:function(src,cb,redoExist){
                //src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
                src.match(/\.css$/i)!=null || (src+='.css');
                //src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
                var exist=window.checkExistTag(src,'link');
                if(exist && !redoExist){
                    return typeof cb=='function'?cb():false;
                }else {
                    exist && document.head.removeChild(exist);
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.type = "text/css";
                    link.media = "screen";
                    link.href = src + (window.config.version ? '?version=' + window.config.version : '');
                    document.head.appendChild(link);
                    cb && cb.call(link);
                    return link;
                }
            },
        $script:function (src,cb,redoExist){
            var bol=false;
            var tag=document.createElement("script");
            var exist=checkExistTag(src);
            if(exist && !redoExist){
                return typeof cb=='function'?cb():false;

            }else{
                exist && document.head.removeChild(exist);
                tag.type="text/javascript";
                tag.language="javascript";
                //tag.setAttribute('async','async');
                //tag.setAttribute('defer','defer');
                src.match(/\.js$/i)!=null || (src+='.js');
                tag.src=src+(window.config.version?'?version='+window.config.version:'');
                tag.onload=tag.onreadystatechange=function(){
                    if(!bol&&(!tag.readyState||tag.readyState=="loaded"||tag.readyState=="complete")){
                        bol=true;
                        tag.onload=tag.onreadystatechange=null;
                        if(cb){
                            cb();
                        }
                    }
                };
                document.head.appendChild(tag);
                return tag;
            }
        },
        $loadHTML:function(src,cb){
            return $loadTEXT(src,cb,'HTML')
        },
        $loadJSON:function(src,cb){
            return $loadTEXT(src,cb,'JSON');
        },
        $loadTEXT:function(src,cb,type){

            var url=src.replace(/\?.*$/,'');

            if(url.match(/\.html?$/i)) {
                url=window.getViewPath(src);
            }
            else if(url.match(/\.json$|\.txt$|\.md$/i)) {
                url=window.getSrcPath(src);
            }

            if(window.$cache(src)){
                typeof cb=='function' && cb();
            }else{
                $.get(url,function(res){
                    window.$cache(src, type=='JSON'? str2obj(res) : res);
                    typeof cb=='function' && cb();
                });
            }
        },

        importing:require('./importing.js')
    };
},{"./importing.js":10}],10:[function(require,module,exports){
/**
 * Created by evans on 17/1/22.
 * TODO 在config中配置importing的默认加载项, 各模块脱离base, 且避免频繁手动importing常用项
 */
var mark='auto-bind';
var $scope=require('./scope')();
var xtpWidget=require('./xtp.widget');

////准备一个手动方法以供动态加载html后,再次生成其中组件
//window.$widget.regInit=function(doc){
//    window.importing.call(doc);
//};

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports=function(){
        var ags=arguments;
        var ag=ags[0];
        var type=typeOf(ag);

        //var str=[].slice.apply(ags).toString(); console.log('进入importing({0}...)'.format(str.slice(0,str.indexOf('function')+8)));


        if(type=='function' || type=='boolean' || ags.length==0){

            //console.info('importing走到最后');


            var cb=xtpWidget.reg.call(this,[].slice.call(ags));

            if(cb){
                //console.info('有额外调用importing')
                return cb();
            }

            //把init挪出$(fn),这样在所有imports依赖已经准备好的情况下,可以避免异步
            xtpWidget.init();

            $(function(){
                //delete window.importing['_widgetRegDone'];
                //delete window.importing['_widgetInitDone'];

                $('body,body>.body-agent').removeClass('unready');

                if(type=='function'){
                    //var bindArea=$('[auto-bind]');
                    //bindArea.length && $scope.bind(bindArea) && bindArea.removeAttr('auto-bind');//处理完后就去掉,避免再次被扫描

                    window.doc.hasAttribute(mark) && $scope.scan(document,window.doc.getAttribute(mark)=='true') && window.doc.removeAttribute(mark);

                    ag($scope);
                }
            });

            return false;
        }

        //是一组,通常用作常用引入系列
        if(type=='array'){
            return  window.importing.apply(this,ag.concat([].slice.call(ags,1)));
        }

        //log('走到识别插件开始')

        //识别插件
        var plugins=window.config.plugins;
        if(plugins[ag]){
            if(typeof plugins[ag]=='object'){
                //并入依赖项
                ag=(plugins[ag].depending||[]).concat(plugins[ag].path?window.getDistPath('plugin/'+plugins[ag].path):[]);
                return  window.importing.apply(this,ag.concat([].slice.call(ags,1)));
            }else{
                ag=window.getDistPath('plugin/'+plugins[ag]);
            }
        }
        //空字符串会被跳过,适用于三目运算,条件选择加载,如: importing('panels', config.doTest?'test.js':null,.........
        else if(ag=='' || String(ag)=='null'){
            return  window.importing.apply(this,[].slice.call(ags,1));
        }
        //对应默认文件夹
        else if(ag.indexOf('http')!=0){

            //如果是页面有专门的getViewPath处理
            if(ag.replace(/\?.*$/,'').match(/\.html?$|\.json$|\.txt$/i)){
                return window.$loadTEXT(ag,function(){
                    window.importing.apply(this,[].slice.call(ags,1));
                },ags[ags.length-1]===true);
            }


            //如果直接写css或js就表示在对应的基本目录下
            else if(ag.indexOf('/')<0) {
                if (ag.match(/.*.css$/i)) {
                    ag = window.getDistPath() + 'css/' + ag;
                } else if (ag.match(/.*.js$/i)) {
                    ag = window.getDistPath() + 'js/' + ag;
                }
            }

            //否则就是相对distPath的路径
            else{
                ag=ag.indexOf(window.getDistPath())>-1 ?ag:window.getDistPath()+ag;
            }
        }
        //识别加载方式
        window[ag.match(/.*\/css\/.+|.css$/i)?'$style':'$script'](ag,function(){
            window.importing.apply(this,[].slice.call(ags,1));
        },ags[ags.length-1]===true);
    };
}
},{"./scope":24,"./xtp.widget":32}],11:[function(require,module,exports){
/**
 * Created by evans on 17/2/25.
 */
var xInjectors=Object.create(null);
var xExtractors=Object.create(null);

var $injector=function(injectorName,fn){
    Object.defineProperty(xInjectors,injectorName,{
        value:fn, writable:false, enumerable:true, configurable:false
    });
    return $injector;
};

var $extractor=function(extractorName,fn){
    Object.defineProperty(xExtractors,extractorName,{
        value:fn, writable:false, enumerable:true, configurable:false
    });
    return $extractor;
};

$.fn.injector=function(fn){
    return arguments.length?this.data('x-injector',typeof fn=='string'?xInjectors[fn]:fn):this.data('x-injector');
};
$.fn.extractor=function(fn){
    return arguments.length?this.data('x-extractor',typeof fn=='string'?xExtractors[fn]:fn):this.data('x-extractor');
};

window.extending({
    $injector:$injector,
    $extractor:$extractor
});

if(typeof module === "object" && typeof module.exports === "object" ){
    module.exports={
        xInjectors:xInjectors,
        xExtractors:xExtractors
    };
}
},{}],12:[function(require,module,exports){
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if(typeof module === "object" && typeof module.exports === "object" ){
		//browserify
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		//factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

},{}],13:[function(require,module,exports){
/**
 * Created by EvanYao on 2016/9/21.
 */
//清除linkbutton点击后的虚线
window.$.noOutline=function(selector){
    $(selector||'a').on('focus',function(){this.blur();});
};

//jQuery from 序列化扩展 将jquery系列化后的值转为name:value的形式。
//$("#form2").serializeObject() => {id:"007",age:"24""}
window.$.fn.serializeObject=function(){
    var convertArray=function (arr) {
        var i=arr.length, obj = {};
        while (i--){
            if(typeof obj[arr[i].name]=='undefined')
                obj[arr[i].name] = arr[i].value;
            else
                obj[arr[i].name] += ','+arr[i].value;
        }
        return obj;
    };
    return function(){
        return convertArray(this.serializeArray());
    };
}();

window.$.fn.val2=function(){
    if(this.is(':text')|| this.is('textarea')){
        return this.val().trim();
    }else{
        return this.val();
    }
};

window.$.fn.checkRow=function (i,checked) {
    $(this).find('tbody:not("td>tbale>tbody")').children('tr:nth-child({0})'.format(i+1))[checked===false?'removeClass':'addClass']('checked');
}

$.fn.cssPlus=function(){
    var ag=arguments;
    if(typeof ag[0]=='object'){
        for(var n in ag[0]){
            this.cssPlus(n,ag[0][n]);
        }
    }
    else{
        this.each(function(i,ele){
            var style=ele.getAttribute('style')||'';
            (style.lastIndexOf(';')==style.length-1) || (style +=';');
            style+='{0}:{1}!important;'.format(ag[0],ag[1]);
            ele.setAttribute('style',style);
        });
    }
    return this;
};
$.fn.hidden=function(){
    return this.cssPlus('visibility','hidden')
};
$.fn.visible=function(){
    return this.cssPlus('visibility','visible');
};
$.random=function(){
    //222222222222223+0.23
    return (''+$.now()+ Math.random()).replace('.','').slice(8);
}
},{}],14:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T20:02Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than dist
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with dist prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) ptcg false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) ptcg false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return this;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the dist event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) dist event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire dist event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire dist event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire dist .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				// Support: IE<11
				// option.value not trimmed (#14858)
				return jQuery.trim( elem.value );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for dist handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a dist DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the compat branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/data, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a data expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera ptcg offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual dist abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a dist abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use dist DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "data jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve data after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force data dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// Stop scripts or inline event handlers from being executed immediately
	// by using document.implementation
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],15:[function(require,module,exports){

    //lambda临时委托方法工厂
    var $lambda=window.$lambda=function(foo){
        var str,i,param,body;
        if(!foo){
            return function(x){return x};   
        }else if(typeof foo=='function'){
            return foo;
        }else if(foo.source){
            str=foo.source.replace(/^\s+|\s+$/g,'');
        }else{
            str=foo.replace(/^\s+|\s+$/g,'');
        }
            
        //开始解析函数字符串
        var i=str.indexOf('=>');
        if(i==-1)  {
            return new Function(str);
        }else{
            param=str.slice(0,i).replace(/\s+/gm,'');
            body =str.slice(i+2).replace(/^\s+|\s+$/g,'');

            //k=><alert(k);return k;>  //[]可能用来表示数组,{}用来表示对象,()用来表示区间块,只有<>是没有用的
            body= body.indexOf('<')==0 ? body.slice(1,-1) : 'return '+body;
            
            if(param=='args'){
                body='var args=arguments;'+body;
                param='';
            }
            return new Function(param,body);
        }
    }

    module.exports={
        indexAs:function(item){
                    var len=this.length;
                    for(var i=0;i<len;i++){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        lastIndexAs:function(item){
                    for(var i=this.length-1;i>-1;i--){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        each:function(foo,the){
                // var len=this.length;
                // for(var i=0;i<len;i++){
                //     $lambda(foo).apply(the,[this[i],i,this])
                // }
                // return this;
                this.forEach($lambda(foo),the);
                return this;
        },
        remove:function(i){return this.splice(i,1);},
        has:function(item,bol){return bol===false? this.indexOf(item)+1 : this.indexAs(item)+1;},//默认使用JSON.equal
        any:function (foo,the) {
            // var len=this.length;
            // var flag=false;
            // for(var i=0;i<len;i++){
            //     if(flag){
            //         break;
            //     }
            //     flag=$lambda(foo).apply(the,[this[i],i,this]);
            // }
            // return flag;
            return this.some($lambda(foo),the);
        },
        where:function(foo,the){
                // var len=this.length;
                // var res=[];
                // for(var i=0;i<len;i++){
                //     $lambda(foo).apply(the,[this[i],i,this]) && res.push(this[i]);
                // }
                // return res;
                return this.filter( $lambda(foo),the);
            },
        select:function(foo,the){
                // var len=this.length;
                // var res=[];
                // for(var i=0;i<len;i++){
                //     res.push($lambda(foo).apply(the,[this[i],i,this]));
                // }
                // return res;
                return this.map($lambda(foo),the);
            },
        update:function (foo,the) {
            // var len=this.length;
            // for(var i=0;i<len;i++){
            //     this[i]=$lambda(foo).apply(the,[this[i],i,this]);
            // }
            // return this;
            this.forEach(function(v,i,arr){
                arr[i]=$lambda(foo)(v,i,arr);
            },the);
            return this;
        },
        distinct:function(jsonEqual){
                        var i,j;
                        for(i=this.length-1;i>0;i--){
                                j= jsonEqual ? this.indexAs(this[i]) :this.indexOf(this[i]);
                                j>-1 && j<i && this.remove(i);
                            
                            /*for(var k=i-1;k>-1;k--){
                                var item=this[i];
                                JSON.equal(item,this[k],jsonEqual) && this.remove(i);
                            }*/
                        }
                        return this.where('x => typeof x !="undefined" ');
                },



        orderby:function(func,desc){
                    var orderFn, arr=this.slice();
                    
                    //准备好转换函数定义和排序三大套路
                    var trans=function(x){return x};
                    var orderFns={
                        number:function(a,b){return trans(a) - trans(b)},
                        string:function(a,b){return trans(a).localeCompare(trans(b))},
                        boolean:function(a,b){return !trans(a);}
                    };
                    
                    if(this.length<2) return arr;
                    
                    //trans转换函数重赋值（不传的话等于初始值）
                    trans=$lambda(func);
                    
                    //抽样判断转换函数的返回值类型，来选择对应的比较函数
                    orderFn=orderFns[typeof trans(arr[0])];
                    
                    try{
                        arr.sort(orderFn||null);
                    }catch(e){
                        throw new Error('排序失败,请检测方法和数组内容');
                    }
                    //第二参数为true表示结果需要倒序
                    desc && arr.reverse();
                    return arr;
                },
        max:function(str){
                    var now, j=this.length, func=$lambda(str);
                    if(j==0) return null;
                    if(j==1) return func(this[0])
                    now=func(this[0]);
                    for(var i=1;i<j;i++){
                        now=Math.max(now,func(this[i]));
                    }
                    return now;
                },
        min:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    now=Math.min(now,func(this[i]));
                }
                return now;
            },
        sum:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    next=func(this[i]);
                    if(now==null){
                        now=next;      //前者是null直接取后者         
                    }else{
                        now= next==null ? now : now+next;  //后者是null直接取前者，否则相加
                    } 
                    //null加数字的时候,就是0+数字,而null加字符串,不是''+字符,而是'null'+字符串...所以是null就不加
                }
                return now;
            },
    
        linq:function(query){
            //数据源
            var dataInfo=query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/); //'from多个空格到where或终点之间的字符'之'前半段'
            var dataName=dataInfo[0]; //数据源名
            var dataMark=dataInfo[1]; //短别名	
            
            var columns=[];
            var where_clause='';
            var order_clause='';
            var desc='';
            
            //用正则捕获where和order条件 TODO
            var cond=query.match(/\swhere\s+(.+)(order\sby){0,1}/); //where和order by一起取出
            if(cond.length && cond.length>1){
                var clause=cond[1].split(' order by ');
                where_clause=clause[0];
                if (clause.length>1){
                    order_clause=clause[1];
                    desc=order_clause.slice(-5)==' desc'; //"order by字段.slice(-5)==' desc'或' DESC'"
                    desc && (order_clause=order_clause.slice(0,-5));
                }
            }else{
                //没有where条件的,尝试找下order by条件
                cond=query.match( new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace('#',dataName).replace('*',dataMark))  );
                if(cond.length && cond.length>1){
                    var index=cond[0].indexOf(' order by ');
                    order_clause=cond[0].slice(index+10)
                }
            }

            //排除空条件
            if(where_clause.trim())
                where_clause= dataMark+'=>'+where_clause;
            if(order_clause.trim())
                order_clause= dataMark+'=>'+order_clause;

            //用正则捕获选取的字段 TODO
            var cols=query.match(/^select\s+(.+)\s+from/);
            if(cols.length && cols.length>1){
                cols=cols[1].trim();
                if(cols.trim()=='*'){
                    columns[0]='';
                }else{
                    columns=cols.split(/,\s+/gm); //最终选了,和空格,是否改为;分割?
                    var j=columns.length
                    for(var i=0;i<j;i++)
                        columns[i]=dataMark+'=>'+columns[i];
                }
            }
            
            eval('var data='+dataName); 
            //this[dataName] 用this指向上下文，需要使用时将数据挂在某对象上。 
            //或者直接传入第二个Linq参数data引用数据源
            
            return function(){
                return [].select.apply(data.where(where_clause).orderby(order_clause,desc),columns); //cols用select.apply(data,colsArr)传多个字段
            };
        }
            // "select d.name, d.age from datas d where d.age>25 && d.name!='tom' order by d.age desc";
            // 这样的写法其实已经不能成立， columns分隔依赖select的多项合并，和数组combine方法
            //select('d=>d.name','d=>d.age') //这里需要讲两次循环的数组结果项concat，因为性能已经放弃，并且单项还是数组不是对象
            //select('d=>{姓名:d.name,年龄:d.age}') //解析为这样的理想形式需要键名
            //或者这样写
            //"select {姓名:d.name,年龄:d.age－1} from datas d where d.age%2==0"
            //"select [d.name,d.age] from datas d"
    };






},{}],16:[function(require,module,exports){
/**
 * Created by evans on 16/5/22.
 **/


var prefix='@prj:'+window.getPrjName()+'-';

var localParamsInit=function(_modules){
    var localParams={};
    var _set=function(module,key,val){
        return localParams['set'](module+key,val);
    };
    var _get=function(module,key,val){
        return localParams['get'](module+key,val);
    };
    // _modules={global:null, sys:null, reports:null, prjWatch:null, fstPage:null, infoMng:null, feedBack:null};
    var obj={
        set:function(key,val){
            key=prefix+key;
            localStorage['params@'+key]=val;
            return true;
        },
        get:function(key){
            key=prefix+key;
            return localStorage['params@'+key];
        }
    };
    _modules.push('global');
    //for(var n in _modules){
       // var space=n=='global'?'':n+'@';
       // obj[n]={
    for(var i= 0;i<_modules.length;i++){
        var space=_modules[i]=='global'?'':_modules[i]+'@';
        obj[dash2camel(_modules[i])]={
            get:function(space){return function (key,val) {return _get(space,key);}}(space),
            set:function(space){return function (key,val) {return _set(space,key,val);}}(space)
        };
    }
    localParams.extending(obj);
    window.extending({localParams:localParams});
    window.localParams=window.localParams;
}



var localData={};
localData.extending({
    set:function(key,val){
        key=prefix+key;
        if(val==null){
            localStorage[key]='null';
        }
        if(typeof val=='string'){
            localStorage[key]=val;
        }
        if(typeof val=='number'){
            localStorage[key]="[number]:"+val;
        }
        if(typeof val=='boolean'){
            localStorage[key]="[boolean]:"+val;
        }
        if(typeOf(val)=='date'){
            localStorage[key]="[date]:"+val.getTime();
        }
        else{
            try {
                localStorage[key] = JSON.stringify(val);
            }catch(e){
                localStorage[key] = String(val);
            }
        }
        return true;
    },
    get:function(key){
        key=prefix+key;
        var obj;
        var val=localStorage[key];
        if(typeof val!='string'){
            return val;
        }
        else if(val==='null'){
            return null;
        }
        else if(val.indexOf('[number]:')==0){
            return +(val.slice(9));
        }
        else if(val.indexOf('[boolean]:')==0){
            return val.slice(10)==='true';
        }
        else if(val.indexOf('[date]:')==0){
            return new Date(+(val.slice(7)));
        }else{
            try{
                obj=JSON.parse(val);
            }catch(e){
                obj=String(val);
            }
            return obj;
        }
    }
});

var registryInit=function(){
    if(window==top){
        window.extending({
            //注册中心
            registry:(function(){
                var obj={};
                for(var i=0;i<window.molDatas.length;i++){
                    obj.extending(dash2camel(window.molDatas[i].molNo),{});
                }
                obj.extending('global',{});
                return obj;
            })()
        });
    }
    //else{
    //    window.extending({
    //        registry:top.registry
    //    });
    //}
};

module.exports=({
    localData:localData,
    //因为下面两个是对应系统模块下分模块的,因此需要提供init方法,以供index.js中取得LIMITS配置后生成
    localParamsInit:localParamsInit,
    registryInit:registryInit
    //localParams:localParams
});


},{}],17:[function(require,module,exports){
(function(){
    var basePath=window.getDistPath()+'mock/';
    //var mockActions={
    //    login:1,
    //    loginTitle:1,
    //    dictGxsdm:1,//管辖所代码
    //    systemXtdhList:1,
    //    systemMessageList:1,
    //    appMyappsAlllist:1,
    //    jsglNoticViewInit:1,
    //    jsglTechnicianPersonInfo:1,
    //    statSbtjEcharts:1,
    //    statSbtjKyzlEcharts:1
    //};
    //var mockActions={};
    //var mockActionsArr=[
    //    'login',
    //    'logout',
    //    'sys/param',
    //    'sys/sysUser/upd'
    //];


    //mockActionsArr.each(function(act){
    //    var act2=window['dash2camel'](act.replace(/\//g,'-'));
    //    var url=basePath+ act.replace(/\//g,'-')+'.json';
    //    mockActions[act]=mockActions[act2]=url;
    //});
    //window.config.mock && (window.config.actions=mockActions);
    var mActs=window.config.mockActions;
    for(var n in  mActs){
        mActs[n]=basePath + (mActs[n]||n).replace(/\//g,'-') + '.json';
        //var n2=window['dash2camel'](mActs[n]);
        //mActs[n]=basePath+ window['camel2dash'](mActs[n]||n2) +'.json';
    }
})();


},{}],18:[function(require,module,exports){
/**
 * Created by yao on 2017/1/17.
 */
var dict=Object.create(null);
var $state={
    go:function(name){
        var stater=dict[name];
        var imports=stater.importing||[];
        var view=stater.view;
        var isFrame=!view.match(/\.htm$|\.htm\?/);

        $state.current=top.currentPageNo=name;

        //处理frame跳转
        if(isFrame){
            $state.ct.addClass('hide-plus').empty();
            $state.frame.removeClass('hide-plus');
            $state.frame[0].src=getViewPath(view);
            $state.frame.attr('page-no',name);
        }
        //处理单页路由
        else{
            var $scope=require('./scope')();
            window.importing.apply(null,imports.concat(view).concat(function(scope){
                $state.frame.addClass('hide-plus');
                $state.ct.removeClass('hide-plus').tpsource(view).template();
                typeof stater.init=='function' && stater.init($scope);
            }));
        }
        return $state;
    },
    on:function (name,stater) {
        if(typeof arguments[1]=='string'){
            stater={
                view:arguments[1]
            };
        }
        if(!dict[name]){
            dict[name]=stater;
        }else{
            $.extend(dict[name],stater);
        }

        return $state;
    },
    current:null,
    ct:null,
    frame:null
};


if(typeof module === "object" && typeof module.exports === "object" ){
    module.exports=$state;
}
},{"./scope":24}],19:[function(require,module,exports){
 (function($){
    //计算器 计算页数和各页的begin和end
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	};
    
	$.extend($.PaginationCalculator.prototype, {
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.pageOnce);
		},
		getInterval:function(currentPage)  {
			var ne_half = Math.floor(this.opts.num_display_entries/2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = currentPage > ne_half ? Math.max( Math.min(currentPage - ne_half, upper_limit), 0 ) : 0;
			var end = currentPage > ne_half?Math.min(currentPage+ne_half + (this.opts.num_display_entries % 2), np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
    //生成器 生成单个或多个页码链接
	$.PaginationRenderers = {};
	
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	};
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		createLink:function(page_id, currentPage, appendopts){
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == currentPage){
				lnk = $("<span class='current'>" + appendopts.text + "</span>");
			}
			else
			{
				lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			if(appendopts.rel){ lnk.attr('rel', appendopts.rel); }
			lnk.data('page_id', page_id);
			return lnk;
		},
		// Generate a range of numeric links 
		appendRange:function(container, currentPage, start, end, opts) {
			var i;
			for(i=start; i<end; i++) {
				this.createLink(i, currentPage, opts).appendTo(container);
			}
		},
		getLinks:function(currentPage, eventHandler) {
			var begin, end,
				interval = this.pc.getInterval(currentPage),
				np = this.pc.numPages(),
				//fragment = $("<div class='pagination'></div>");
				fragment = $("<div>");
			
			// Generate "Previous"-Link
			if(this.opts.prev_text && (currentPage > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(currentPage-1, currentPage, {text:this.opts.prev_text, classes:"prev",rel:"prev"}));
			}
			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, currentPage, 0, end, {classes:'sp'});
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}
			// Generate interval links
			this.appendRange(fragment, currentPage, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, currentPage, begin, np, {classes:'ep'});
				
			}
			// Generate "Next"-Link
			if(this.opts.next_text && (currentPage < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(currentPage+1, currentPage, {text:this.opts.next_text, classes:"next",rel:"next"}));
			}
			$('a', fragment).click(eventHandler);//所以那个return continuePropagation并没有什么软用
			return fragment;
		}
	});
	
	// 这个方法是直接发动在分页条元素上，并非整个列表容器
	$.fn._pagination = function(maxentries, opts){
		// Initialize options with default values
		opts = $.extend({
			pageOnce:10,
			num_display_entries:11,
			currentPage:0,
			num_edge_entries:0,
			link_to:"javascript:void(0);",
			prev_text:"<",
			next_text:">",
			ellipse_text:"...",
			prev_show_always:true,
			next_show_always:true,
			renderer:"defaultRenderer",
			show_if_single_page:false,
			loadFirstPage:true,
			callback:function(){return false;}
		},opts||{});

		var count = maxentries,
			pOnce = opts.pageOnce,
			containers = this, renderer, links, currentPage,pageContainer;
		containers.children('div:not(.select-pageonce)').length || containers.append('<div></div>');
		pageContainer = containers.children('div:not(.select-pageonce)');
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function paginationClickHandler(evt){
			//jQuery("#loadingBar").text('加载中...请稍候');
			var links, 
				newCurrentPage = $(evt.target).data('page_id'),
				continuePropagation = selectPage(newCurrentPage);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}
		
		function selectPage(newCurrentPage) {
			// update the link display of a all containers
			containers.data('currentPage', newCurrentPage);
			links = renderer.getLinks(newCurrentPage, paginationClickHandler);
			count>pOnce ? pageContainer.empty() : containers.empty();
			links.appendTo(pageContainer);
			// call the callback and propagate the event if it does not return false
			var continuePropagation = opts.callback(newCurrentPage, containers);
			return continuePropagation;
		}
		
		// -----------------------------------
		// Initialize containers
		// -----------------------------------
		currentPage = parseInt(opts.currentPage, 10);
		containers.data('currentPage', currentPage);
		// Create a sane value for maxentries and pageOnce
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.pageOnce = (!opts.pageOnce || opts.pageOnce < 0)?1:opts.pageOnce;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		// Attach control events to the DOM elements
		var pc = new $.PaginationCalculator(maxentries, opts);
		var np = pc.numPages();
		containers.off('setPage').on('setPage', {numPages:np}, function(evt, page_id) { 
				if(page_id >= 0 && page_id < evt.data.numPages) {
					selectPage(page_id); return false;
				}
		});
		containers.off('prevPage').on('prevPage', function(evt){
				var currentPage = $(this).data('currentPage');
				if (currentPage > 0) {
					selectPage(currentPage - 1);
				}
				return false;
		});
		containers.off('nextPage').on('nextPage', {numPages:np}, function(evt){
				var currentPage = $(this).data('currentPage');
				if(currentPage < evt.data.numPages - 1) {
					selectPage(currentPage + 1);
				}
				return false;
		});
		containers.off('currentPage').on('currentPage', function(){
				var currentPage = $(this).data('currentPage');
				selectPage(currentPage);
				return false;
		});
		

		links = renderer.getLinks(currentPage, paginationClickHandler);
		count>pOnce ? pageContainer.empty() : containers.empty();
		if(np > 1 || opts.show_if_single_page) {
			links.appendTo(pageContainer);
		}
		containers.is(':empty') && links.appendTo(containers);
		if(opts.loadFirstPage) {
			//config中一路传过来的newSearch在此时会传入，也只有loadFirstPage时有机会传第三个参数，确保了selectPage时为false
			//2016.07.18改为直接传true;
			opts.callback(currentPage, containers, true);//opts.newSearch);
		}
		return this;
	}; 
	

	//paging是利用pagination的封装。 在含有paging分页条的母容器上发动。总数count作为option的一部分传入，而callback从option中拿出单独传入。
 	$.fn.paging = function(config,clickHandle) {
        this.children('.paging').empty();
			var paceOnceSetingHTML='<div class="select-pageonce"><label>每页显示</label><select name="datatable_length"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>条</div>'
 			typeof config=='number' && (config={count:config});
 			var pageOnce=config.pageOnce=config.pageOnce||10;
 			var currentPage = config.currentPage||0;
		    var $this = $(this);
            //执行新的paing或搜索不再保存上次的每页几条设置
			//$this.children('.paging').children('.select-pageonce').length && (pageOnce=+$this.children('.paging').children('.select-pageonce').children('select').val());
		    var opts = {
				pageOnce:pageOnce,
				loadFirstPage:config.loadFirstPage!==false,
				num_display_entries:config.num_display_entries||5,
				num_edge_entries:config.num_edge_entries||1,
				currentPage:currentPage,
				callback: function(pageIndex, jq, newSearch){  //这个jq并无卵用,可以随时用jquery取到的分页条对象
		    		var begin = pageIndex * pageOnce;
				    var end   = Math.min((pageIndex+1) * pageOnce, config.count);
					newSearch && $this.children('.paging').children('.select-pageonce').length && ($this.children('.paging').children('.select-pageonce').children('select')[0].options.selected = true);
				    //执行保存了查询条件,只更改页码条件的搜索
		    		clickHandle((begin+1),end,newSearch,pageIndex,pageOnce, config.count);//这个newSearch在整个pagination里只有loadFirstPage时会传递，确保selectPage时为false
					!newSearch && config.autoHash!==false && ($(jq.parent()[0].scrollIntoView()).hide().show());//(location.href = location.pathname+'#'+ (jq.parent().attr('id')||'') );
				}
			};
            //发动容器内的.paging子元素是分页条元素，对其执行pagination
			$this.children('.paging')._pagination(config.count,opts);//.css('visibility','visible');
            //发动容器内的.total-count元素显示总条数，.table-name元素显示列表名（如果有配置的话将替换原来html中的表名）
            $this.find('.total-count').html(config.count);
	        config.name && $this.find('.table-name,.list-name').html(config.name);
            //设置好描述文字后，表头条可以显示出来
			$this.find('.list-title-bar').show();

            //$this.children('.paging').children('.select-pageonce').remove();
			//显示每页几条自定义
			//if(config.count>pageOnce){
				var paceOnceSeting=$(paceOnceSetingHTML)//||$this.children('.select-pageonce');
				$this.children('.paging').append(paceOnceSeting);
				var ops=paceOnceSeting.children('select')[0].options;
				for(var k=0;k<ops.length;k++){
					if(ops[k].value==pageOnce){
						ops[k].selected=true;
						break;
					}
				}
				//选择每页几条
				paceOnceSeting.children('select').on('change',function(){
					config.pageOnce=+this.value;
					//config.cacheOnce=config.cacheOnce||4;
					config.count=null;
					//$this.children('.paging').css('visibility','hidden');
					$this.pagingList(config);
				});
			//}
			if(config.count==0){
				$this.children('.select-pageonce').remove();
			}
			return $this;
	};
	
	/* 用css inline-block结合IE7 hack *+html .paging div{ display:inline}解决，避免每次callback生成html后调用setFitWidth()
	function setFitWidth($this){
		var left=$this.find('.paging .prev').eq(0).offset().left;
		var right=$this.find('.paging .next').eq(0).offset().left+60;
		$this.find('.paging>div').width(right-left);
	}
	*/ 
    
    //pagingList——基于paging的restful再包装， paging处理同步(本地已有数据)情况下的分页，而pagingList是集合了ajax请求、本地缓存、paging分页的合体
		var localCache={};
		//localCache.size=0;
		//var paged=false;
		var commonHTML=window.config.paingListCommonHTML||
						'<div class="new-color-bar list-title-bar"> <b>▌</b><u class="table-name"></u><span class="table-desc">共查找到<u class="total-count"></u>条数据</span></div>'+
						'<div class="search-result"  tpsource="#search-result-tp"></div>'+
						'<div class="paging"></div>';
		var exeAjaxEvent=function(eveType,the){
			//typeof the.data('ajax'+eveType)=='function' && the.data('ajax'+eveType)();
		};
		var checkCache=function(cacheMax,cacheOnce,pageOnce){
			var msg='';
			//缓存设置必须检测下有效性
			if (typeof cacheOnce!='number' || typeof cacheMax!='number') {
				msg='缓存参数设置错误，非数字！';
			}
			//单次缓存确保不超过最大缓存
			if( cacheOnce>cacheMax){
				msg='缓存参数设置错误，单次缓存数大于总体缓存数!';
			}
			//单次缓存确保不低于单页条数
			if(cacheOnce < pageOnce){
				msg='缓存参数设置错误，单次缓存数小于单页条数!';
			};
			if(msg){
				throw new Error(msg+' cacheMax,cacheOnce,pageOnce: '+[cacheMax,cacheOnce,pageOnce].join(','));
			}
			return true;
		};
		var resetCache=function(id){
			localCache[id] = [];
			localCache[id].size = 0;
			localCache[id].time = new Date().getTime();
		};
		//var setCache=function(useCache,cacheMax,data,newSearch,sectionBegin){
		var setCache=function(id,cacheMax,data,reset,_begin){
			_begin=_begin||1;
			//newSearch或超过缓存极限时重置
			if (reset || (localCache[id].size + data.length > cacheMax)) {
				resetCache(id);
			}

			//对应放入,localCache的index对应整体数据的index
			for (var i = data.length - 1; i > -1; i--) {
				//localCache[sectionBegin + i] = data[i];
				localCache[id][_begin-1 + i] = data[i];
			}

			localCache[id].size+=data.length;
			return true;
		};
		$.fn.setCache=function(data,_begin,reset,cacheMax){
			var id=this[0].id||this.attr('cache-id');
			setCache(id,cacheMax||1600,data,reset!==false,_begin||1);
			return $(this);
		};
		//pagingList只接收一个对象做参数
		 $.fn.pagingList=function(config) {
             var cacheMaxTime=3*60*1000;
			 //为了一页多个缓存,cache必须挂在自身标识
			 var id=this[0].id||this.attr('cache-id');
			 localCache[id]=[];
			 localCache[id].size=0;

			//第一次启动的变量全部保存起来,默认就是newSearch
            var $this = this,
				newSearch = config.newSearch !== false,
				pageOnce = config.pageOnce || 10,
				cacheOnce = (config.cacheOnce || 4)*pageOnce,//改为缓存几页,默认4页
				cacheMax = Math.min((config.cacheMax || 16)*pageOnce,(window.config.pagingCacheMaxCount||1600)),
				useCache = config.useCache !== false,
				begin = config.begin||1,
				end = config.end||(begin-1+pageOnce),
			
				name = config.name,
                //一查通默认向yctPostAction请求，其他可传自定义的action
				action = config.action||config.url, //|| window.yctPostAction,
                //jsonObj是整个参数集合打包，并包括了跨域转接url，后台无对应接收的忽略此参数
				jsonObj = config.jsonObj || window.jsonObj || Object.create(null),
                //如果不是用jsonObj把参数打包再转为jsonStr单参数传递的话，可以自定义params，是一个键值对对象，后台可以按键一一接收
				params = config.params||config.data,
				//callback是每次取回单页数据的回调，一般就是代入数据生成html
				callback = config.callback,
                //默认是用post
				method = config.method || config.type||'post';
				
				config.commonHTML && $this.html(commonHTML);//如果发动容器为空，注明commonHTML，newSearch时生成默认html结构


			//该函数就是一个restful封装
			 var remote=function(cb,reset,_begin,_end){

				 //jsonObj['begin']= _begin;
				 //jsonObj['end']  = useCache ? _begin-1+cacheOnce : _end;

				 //mark 分页更改,设置缓存为整页的倍数, 且起点为缓存的倍数,上方为更改前
				 if(useCache){
					 jsonObj['pageSizeTest'] = cacheOnce;
					 jsonObj['pageNumTest'] = Math.ceil(_begin/(jsonObj['pageSizeTest']));

					 jsonObj['begin']= Math.floor(_begin/cacheOnce)*cacheOnce+1;
					 jsonObj['end']  = jsonObj['begin']+cacheOnce-1 ;
				 }else{
					 jsonObj['pageSize'] = pageOnce;
					 jsonObj['pageNum'] = Math.ceil(_begin/(jsonObj['pageSize']));

					 jsonObj['begin']= _begin;
					 jsonObj['end']  = _end;
				 }

				 //exeAjaxEvent('Begin',$this);
				 params=params||Object.create(null);
				 //params.token=top.token;

				 //for mock
				 if(typeof action=='string' && action.match(/\/mock\/.+\.json/i)){
					 method='GET';
				 }

				 var loading;
				 if(config.loading!==false){
					 var bfn=config.beforeSend||function(){};
					 config.beforeSend=function(){
							 bfn.apply(null,[].slice.apply(arguments));
							 loading=showLoading();
						 };
				 }

				 //拓展支持全部$.ajax配置
				 $.ajax($.extend({
					 url:action,
					 type:method,
					 //contentType: "application/json; charset=UTF-8",
					 headers:{
						 'Content-Type':'application/json;charset=utf-8',
						 'token':window.token||(window.token=localData.get('token'))
					 },
					 data: method=='GET'?$.extend(jsonObj, params):obj2str($.extend(jsonObj, params))
				 },config||null)).always(function (res, status) {
					 //exeAjaxEvent('End',$this);
					 loading && loading.fadeOut && loading.fadeOut(150);

					 if (status == 'success') {
						 if(!window.config.mock && (typeof res=='string'&& res.length>2048*100 || (typeOf(res.data)=='array' && res.data.length>2000))){
							 warn("result's length too long, check the end－begin,or other params wrong？");
							 return false;
						 }
						 res=str2obj(res);
						 if(res.flag == 1){
							 useCache && setCache(id,cacheMax,res.data,false,jsonObj['begin']);
							 //cb(res); //mark 分页更改,设置缓存为整页的倍数, 且起点为缓存的倍数
							 useCache ?cb({flag:1,data:localCache[id].slice(_begin - 1, _end),totalCount:res.totalCount}):cb(res);

							 // 处理分页之外的数据 (newSearch时是reset)
							 reset && res.extraRes && config.extraCb && config.extraCb(res.extraRes);

						 } else if (res.flag == -1) {
							 toast('登录状态过期,请重新登录',function(){top.logout()});
							 //if(location.protocol=='http:'){
								// top.location.replace('http://'+top.location.host+'/intoLogin');
							 //}else{
								// top.location.replace(top.location.href.replace('index.html','login.html'));
							 //}
						 } else {
							 //参数错误等
							 toast(res.msg||'后台请求失败').err();
							 warn('ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}'.format(action,obj2str($.extend(jsonObj, params)),res.msg||''));
						 }
					 }else{
						 warn('paing请求地址错误或网络问题, status: {0}, action:{1} '.format(status,action));
					 }
				 });
			 };
			 var pageHandle=function(_begin,_end,newSearch,pageIndex,pageOnce,totalCount){
				 if(config.count==0){
					 //利用callback生成空内容, 清理旧的内容
					 callback([], _begin,_end,newSearch,pageIndex,pageOnce,totalCount);
					 return false;
				 }
				 //先检测缓存有效期
				 ( localCache[id].time+cacheMaxTime> new Date().getTime() ) || resetCache(id);
				 //有缓存就使用, 没缓存去请求
				 if (localCache[id][_begin - 1] && localCache[id][_end - 1] ) {
					 //（newSearch为true时会清缓存，所以跑到这里newSearch一定是false,所以直接传false了）
					 callback(localCache[id].slice(_begin - 1, _end), _begin, _end, false, pageIndex,pageOnce,totalCount);
				 }else{
					 remote(function(res){
						 //callback(useCache ? localCache.slice(_begin - 1, _end):res.data, _begin,_end,newSearch,pageIndex,pageOnce);//更改了callback参数列表
						 callback(res.data.slice(0,pageOnce), _begin,_end,newSearch,pageIndex,pageOnce,totalCount);//更改了callback参数列表
					 },newSearch,_begin,_end);
				 }
			 };

			//准备就绪，开始
			checkCache(cacheMax,cacheOnce,pageOnce);

			newSearch && resetCache(id);
			
			if(config.count){
				$this.paging(config,pageHandle);
			}else{
				remote(function(res){
					//config.loadFirstPage=false;
					config.count=res.totalCount;
					if(useCache){
						$this.paging(config,pageHandle);
					}else{
						config.loadFirstPage=false;
						$this.paging(config,config,pageHandle);
						//由于无缓存时,当前的res.data需要在此立刻使用, 取消了第一页自动点击,因此在这里要走一个第一页的callback
						callback(res.data, begin,end,newSearch,0,pageOnce,config.count);
					}

					//pagingHandle(begin,end,newSearch);
					//loadFirstPage的机制是pagination自动执行第一页的handle，但这样无法区分newSearch，因此关闭，改为手动执行(另一方式，config传递到pagination，执行一次callback后设置为false)
				},newSearch,begin,end);
			}


			 var sortFn=function(config,ct){
				 var sortName = this.getAttribute('sort-name');
				 var sortOrder = this.getAttribute('sort-order')||'asc';
				 if(!sortName){
					 return false;
				 }
				 config.jsonObj.sortName=sortName;
				 config.jsonObj.sortOrder=sortOrder;
				 ct.pagingList(config);
				 if(sortOrder=='desc'){
					 //this.setAttribute('sort-order','asc');
					 ct.find('[sort-name={0}]'.format(sortName)).attr('sort-order','asc');
					 //目前只支持单字段排序,因此移除其他排序标识
					 //ct.find('.sort-arrow').remove();
					 //$(this).append('<b class="sort-arrow">▼</b>');//('<i class="icon-caret-down sort-arrow"></i>');
					 ct.find('[sort-name={0}]'.format(sortName)).removeClass('sort-asc').addClass('sort-desc');//.append('<b class="sort-arrow fr gray">▼</b>');
				 }else{
					 //this.setAttribute('sort-order','desc');
					 ct.find('[sort-name={0}]'.format(sortName)).attr('sort-order','desc');
					 //ct.find('.sort-arrow').remove();
					 //$(this).append('<b class="sort-arrow">▲</b>')//('<i class="icon-caret-up sort-arrow"></i>');
					 ct.find('[sort-name={0}]'.format(sortName)).removeClass('sort-desc').addClass('sort-asc');//.append('<b class="sort-arrow fr gray">▲</b>');
				 }
			 };
			 //排序事件只注册一次,防止递归多次调用
			 //if($this.data('sortReged')!=1){
			 // 其实应该多次注册,newSearch清除上次残留
			 if(newSearch){
				//$this.data('sortReged',1);
				 var allFixWrap=$this.closest('.all-fix-wrap');
				 var ct=allFixWrap.length ? allFixWrap : $this;
				 ct.off('click','[sort-name]').on('click','[sort-name]',function(){
					sortFn.apply(this,[config,ct]);
				});
			}
			 return $this;
		};
		 
})(window.jQuery);
 
 
// $('#userTable').paging(97,function(begin,end){})
 
//$('#userTable').pagingList({
    //begin:1,
    //end:15,
    //callback:generateForPerson,
    //newSearch:true
    //pageOnce:15,
    //useCache:true,
    //cacheOnce:4,
    //cacheMax:16,
    //name:'人员列表'
    //action:yctPostAction,
    //jsonObj:jsonObj,
    //commonHTML:false
//});
    
    

},{}],20:[function(require,module,exports){
/**
 * Created by Evany Yao on 2016/9/27.
 */

(function(){

    if(window!==top && !config.isLocal && (window.originSrc=window.iframe.getAttribute('o-src'))&&((location.pathname+location.search)!==originSrc)){
        console.info(location.pathname+location.search);
        console.error('状态过期,请刷新页面\n'+originSrc);
        top.document.body.innerHTML='<br><h2>状态过期,请刷新页面\n</h2>';
        //location.href=originSrc;
    }

    //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
    var banBackSpace=function (e){
        var ev = e || window.event;//获取event对象
        var obj = ev.target || ev.srcElement;//获取事件源
        var t = obj.type || obj.getAttribute('type');//获取事件源类型
        var editable = obj.hasAttribute('contenteditable');
        //获取作为判断条件的事件类型
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        //处理null值情况
        vReadOnly = (vReadOnly == null) ? false : vReadOnly;
        vEnabled = (vEnabled == null) ? true : vEnabled;
        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
        //并且readonly属性为true或enabled属性为false的，则退格键失效
        var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea") && (vReadOnly==true || vEnabled!=true))?true:false;
        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
        var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" && !editable) ?true:false;
        //判断
        if(flag2){
            return false;
        }
        if(flag1){
            return false;
        }
    };
    //禁止后退键 作用于Firefox、Opera
    //document.onkeypress=banBackSpace;
    //禁止后退键 作用于IE、Chrome
    document.onkeydown=banBackSpace;
    //document.attachEvent ? document.attachEvent('onkeydown',banBackSpace):  document.addEventListener('keydown',banBackSpace,false);

    $('.query-block').each(function(){
        this.addEventListener('click',function(){
            var $this=$(this);
            var oldHeight=$this[0].scrollHeight;
            setTimeout(function(){
                var newHeight=$this[0].scrollHeight;
                newHeight==oldHeight || $('.query-result').find('.native-fix-wrap>table').each(function(){
                    var $this=$(this);
                    var mode=$this.attr('fixed-mode');
                    mode && $this.fixTable(mode);
                });
            },500)
        },false);
    });
})();


},{}],21:[function(require,module,exports){
//window.path=typeof top.path=='string'? top.path:location.href.replace(/index2?\.(html|jsp)/,'').replace(/\/dist\/view\/.*/,'');
window.path=window.path||localData.get('path')||''; //top.path:location.href.replace(/index2?\.(html|jsp)/,'').replace(/\/dist\/view\/.*/,'');

//window.distPath= location.protocol!='file:'? window.path+'/dist/': (location.pathname.match(/\/index\.html|\/login\.html|\\index\.html|\\login\.html/) ? './' : '../');
window.getDistPath=function (src){
    src=src||'';
    if(!config.isLocal){//location.protocol!=='file:'){
        return window.path+'/dist/'+src;
    }else{
        var str=location.href;
        var k=''
        var i=str.indexOf('/view/');
        var j=str.indexOf('/plugin/');
        if(i>-1){
            for(i=i+6;i<str.length;i++){
                (str[i]=='/') && (k+='../');
            }
        }else if(j>-1){
            for(j=j+8;j<str.length;j++){
                (str[j]=='/') && (k+='../');
            }
        }
        return (location.pathname.match(/\/index\.html|\/login\.html|\\index\.html|\\login\.html/) ? './' : k+'../')+src;
    }
};
window.getSrcPath=function(src){
    if(src.match(/^https?|^\.|^\//i)){
        return src;
    }
    if(src.match(/.css$/i)){
        return window.getDistPath()+'css/'+src;
    }
    if(src.match(/.js$/i)){
        return window.getDistPath()+'js/'+src;
    }
    if(src.match(/.html?$/i)){
        return window.getDistPath()+'view/'+src;
    }
    else {
        return window.getDistPath()+src;
    }
    // if(src.match(/.json$/i)){
    //     return window.getDistPath()+'data/'+src;
    // }
    // if(src.match(/.txt$|.md$/i)){
    //     return window.getDistPath()+'text/'+src;
    // }
};
window.getViewPath=function (src,prefix){
    var viewPrePath;
    if(src.match(/^https?|^\.|^\//i)){
        return src;
    }
    if(prefix){
        viewPrePath=prefix;
    }
    else if(src.indexOf('plugin/')==0){
        viewPrePath= window.getDistPath();
    }
    else{
        viewPrePath= window.getDistPath('view/');//index.html和login.html是例外,两者一般不需要被引用,需要时用getDistPath('index.html')
    }
    var querySymbol=viewPrePath.indexOf('?')>-1?'&':'?';
    return viewPrePath+(src||'404.html')+  querySymbol +'version='+window.config.version;
};
window.getMap_server= function () {
    var p= localData.get('sysParams') ? localData.get('sysParams')['defaultMapServer'] : '';
    p=p||window.config.mapServerPath;
    if(!p){
        throw new Error('the mapServerPath is empty or undefined!');
    }
    return p;
};
},{}],22:[function(require,module,exports){
//JSON扩展
JSON.extending({
    equal:function(obj,obj2){return obj===obj2 || ( typeof obj==typeof obj2  && JSON.stringify(obj)===JSON.stringify(obj2) );},
    clone:function(obj){
        if(!obj || (typeOf(obj,true)!='object' && typeOf(obj,true)!='array')){
            return obj;
        }else{
            return window.str2obj(window.obj2str(obj))
        }
    }
});
var weeks=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
var weeks2=["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//时间扩展
Date.prototype.extending({
    getDayAs:function(symbol){
        if(symbol=='星期'){
            return weeks[this.getDay()];
        }else if(symbol=='周'){
            return weeks2[this.getDay()];
        }else{
            return this.getDay();
        }
    },
    addMonth:function(i){
        var m=this.getMonth();
        var y=this.getFullYear();
        if(i>0){
            (i>11) && (y+=Math.floor(i/12));
        }else{
            (i<-11)&& (y+=Math.ceil(i/12));
        }
        m+=i%12;
        this.setMonth(m);
        this.setFullYear(y);
        return this;
    },
    format:function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "D+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "Q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        fmt=fmt||'YYYY-MM-DD hh:mm:ss';
        for(var n in {8:8,10:10})
            if(fmt.slice(0,+n).toUpperCase().replace(/\-|\.|\s|\//g,'')=='YYYYMMDD'){
                fmt=fmt.slice(0,+n).toUpperCase()+fmt.slice(+n);
            }
        if (/(Y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
    }
});

Date.extending({
    format:function(fmt){return new Date().format(fmt);},
    getDayAs:function(symbol){return new Date().getDayAs(symbol);},
    weeks:weeks,
    weeks2:weeks2
});
// Date.weeks[new Date().getDay()]

//String扩展
String.prototype.extending({
    isEmpty:function(){return this.replace(/\s+/gm,'').length===0;},
    format:function(){
        var vname='\\{i\\}';
        var str=this;
        var agmt;
        if(typeof arguments[0]=='object'){
            return $compile(this,arguments[0],true);
        }
        for(var i=arguments.length-1;i>-1;i--){
            agmt=vname.replace('i',i);
            str=str.replace(RegExp(agmt,'g'),arguments[i]);
        }
        return str;
    },
    inside:function(strs){
        var the=this.valueOf();
        if(typeof strs=='string'){
            return strs.indexOf(the)>-1;
        }else{                                                                               //字符串存在于数组某项? 不接受大小写,要忽略大小写请自己将双方toUpperCase()
            for(var i=strs.length-1;i>-1;i--){
                if( the===strs[i].valueOf() )
                    return i+1;	//返回第几项. 不从0开始,避免识别为false, 注意是最后一次出现的位置+1
            }
        }
        return false;
    },
    like:function(key){
        var bs=key.indexOf('%')==0;
        var be=key.lastIndexOf('%')==key.length-1;
        if(bs&&be)  return this.indexOf(key.slice(1,-1))!=-1;
        else if(bs) return this.lastIndexOf(key.slice(1))==this.length-key.length+1;
        else if(be) return this.indexOf(key.slice(0,-1))==0;
        else return String(this)===String(key);
    },
    trimL:function(){return this.trimLeft();},
    trimR:function(){return this.trimRight();},
    lower:function(){return this.toLowerCase();},
    upper:function(){return this.toUpperCase();},
    lowEqual:function(str){return this.toLowerCase()==str.toLowerCase();}
});
Number.prototype.extending({
    prev:function(){return this-1;},
    next:function(){return this+1;}
});
//数组对象扩展
var lambda=require('./lambda');
Array.prototype.extending(lambda).extending('fire',function(holder){
        if(!this.length){
            return false;
        }
        if(typeof this[0]=='function'){
            this[0]();
        }
        this.shift();
        arguments.callee.call(this,holder);
});

if(typeof module === "object" && typeof module.exports === "object" ){
    //module.exports=lambda;
}
},{"./lambda":15}],23:[function(require,module,exports){

//require('./treemenu');
//require('./previewbox');

top._rootTabUrls=top._rootTabUrls||Object.create(null);

window.getting({
    currentTab:function(){return top.rootTabs.tabs('getSelected');},
    currentTabWin:function(){return top.$('.tabs-panels>.epanel:not(hide)').find('.tab-content-frame')[0].contentWindow;}
});

window.$.fn.$close=function(){
    var id=this[0].id;
    if(id && id.indexOf('root-tab')==0){
        var index=top.rootTabs.tabs('getTabIndex', this);
        top.rootTabs.tabs('close', index);
    }else {
        this.window('close');
    }
    return this;
};
window.$.fn.$select=function(){
    if(this.hasClass('epanel-body')){
        var index=top.rootTabs.tabs('getTabIndex', this);
        top.rootTabs.tabs('select', index);
    }else {
        //
    }
    return this;
};
window.$.fn.$open=function(ops){
    return window.$open(this,ops||this.data('open-params')||{});
};
module.exports={
    //----------------基于jquery的拓展------------------
    showLoading:function (needMask){
        var loading=$('.loading-mask');
        (loading.length) || (loading=$('<div class="loading-mask"><div class="loading"><i class="icon-spinner"></i><p>加载中...</p></div></div>').appendTo('body'));
        return loading[needMask===false?'addClass':'removeClass']('transparent').show();
    },
    hideLoading:function(){
        return $('.loading-mask').fadeOut(150);
    },
    showMask:function (){
        var mask=$('.common-mask.preview-mask');
        (mask.length) || (mask=$('<div class="common-mask preview-mask">'));
        return mask.appendTo('body').show();
    },
    hideMask:function(){
        return $('.common-mask.preview-mask').fadeOut(150);
    },

    //吐司消息
    toast:function(str){
        var holding;
        var callback;
        var itv;
        var done;
        str=String(str);
        var bol= str.length>15;
        var len= bol ? str.length : 15;
        if(typeof arguments[1]=='number'){
            holding=arguments[1];
            typeof arguments[2]=='function' && (callback=arguments[2]);
        }else if(typeof arguments[1]=='function'){
            callback=arguments[1];
        }
        var mid=new Date().getTime();
        // 根据文字长度增加延时, 限制最高秒数
        holding= holding || 1600+(len-15)*30;
        var p=jQuery('<div><p>str</p></div>'.replace('str',str));
        var fadeOut=function(){
            if(!done){
                //jQuery('.the-mask').remove();
                p.animate({'opacity':0},500,function(){callback && callback(p);p.remove();});
                done=true;
            }
        };
        jQuery('.toast').hide();
        //jQuery('body').one('click',fadeOut);

        document.body.addEventListener('click',fadeOut,true);

        // 预制样式
        return  p.addClass('toast').appendTo('body')
            //透明度 文字居中居左判断
            .css({'text-align':bol?'left':'center'})
            // 移入暂停
            .bind('mouseenter',function(){clearTimeout(itv);})
            .bind('mouseleave',function(){itv=setTimeout(fadeOut,200);})
            // 增加icon
            .extend({
                ok:function(){return p.addClass('ok');},
                err:function(){return p.addClass('err');},
                warn:function(){return p.addClass('warn');}
            })
            // 显示
            .fadeIn(function(){
                itv=setTimeout(fadeOut,holding||900);
            });
    },
    //tab控件
    tabsInit:function (selector){
        $(selector||document.body).find('.tabs-list').find('li').on('click', function(event) {
            var tabsList = this.parentNode//$('.tabs-list');
            var tabsWrap = tabsList.parentNode;//$('.tabs-wrap');
            tabsList.find('.current').removeClass('current');
            tabsWrap.find('.tabs-content').hide();
            $(this).addClass('current');
            $(this.getAttribute('direct')).show();
        });
    },
    //--------------基于eui的扩展----------------
    // 弹窗
    $open:require('./win').$open,
    // 单确定框
    _$alert:function(param){
        var title='提示',icon='info',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            icon=param.icon||icon;
            cb=param.callback||cb;
            msg=param.msg;
        }
        var ele=jQuery.messager.alert(title,msg,icon,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return Math.max(100,parseInt(v,10)-60);});
        $.noOutline();
        return ele.parent();
    },
    // 二选一确认框
    _$confirm:function(param){
        var title='提示',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            cb=param.callback||cb;
            msg=param.msg;
        }
        var ele=jQuery.messager.confirm(title,msg,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return Math.max(100,parseInt(v,10)-60);});
        $.noOutline();
        return ele.parent();
    },
    $alert:function(){
        return top._$alert.apply(this,[].slice.call(arguments));
    },
    $confirm:function(){
        return top._$confirm.apply(this,[].slice.call(arguments));
    },
    // 自动关闭提示框
    $show:function(str){
        return jQuery.messager.show({
            title:'提示',
            msg:str,
            showType:'fade',
            timeout:1500,
            showSpeed:500,
            width:220,
            height:120,
            style:{
                right:'50%',
                top:'50%',
                margin:'-120px -110px 0  0 '
            }
        });
        $.noOutline();
    },
    //右下角消息通知
    $msg:function(ops){
        typeof ops=='string' && (ops={msg:ops});
        return $.messager.show({
            title:ops.title||'<i class="icon-envelope-alt"></i> 新消息提醒',
            msg:ops.msg,
            timeout:ops.timeout||8000,
            width:ops.width||380,
            height:ops.height||210,
            showType:'slide'
        }).closest('.window').addClass('corner-msg '+ (ops.className||''));
    },
    $close:function(isTag){
        if(isTag){
            //关闭整个当前标签页
            var rootTabs=top.rootTabs||top.$('#root-tabs');
            var tab = rootTabs.tabs('getSelected');
            if (tab){
                var index = rootTabs.tabs('getTabIndex', tab);
                index!==0 && rootTabs.tabs('close', index);
            }
        }else{
            //关闭包含本iframe的模态窗
            var ifr=window.iframe;
            if(ifr){
                var win=top._mol_wins[ifr.getAttribute('win-id')];
                win && win.window('close');
            }
        }
    },
    $select:function(){
        var wraper=$(this.iframe).parentsUntil('.epanel','.epanel-body');
        return wraper.$select();
    },
    $append:function(src,label,onlyOnce,closable,iconCls){
        var rootTabs=top.rootTabs||top.$('#root-tabs');
        rootTabs.data('tab-urls') || rootTabs.data('tab-urls',{});
        var rootTabUrls=rootTabs.data('tab-urls');

        if(onlyOnce!==false && rootTabUrls[src]){
            var pbodys=rootTabs.find('>.tabs-epanels>.epanel>.epanel-body');
            var ele;
            pbodys.each(function(){
                if(!ele){
                    var url=top.$(this).data('tab-src');
                    if(src==url){
                        ele=top.$(this).$select();
                    }
                }
            });
            if(ele){
                return ele;
            }
        }
        rootTabUrls[src]=true;

        //给新页签注册一个id
        var id='root-tab-'+new Date().getTime();
        //把调用窗口登记到全局
        var openerId='opener-'+id;
        top._opener_wins[openerId]=this;
        var addTab=function(id){
            rootTabs.tabs('add',{
                title: label,//'Tab'+index,
                id:id,
                content:'<iframe class="tab-content-frame" src="{0}" opener-id="{1}" frameborder="0"></iframe>'.format(src,openerId),
                iconCls:iconCls||null,//'icon-reload',
                closable: closable!==false
            });
        };
        if(rootTabs.tabs('tabs').length>(parseInt(window.config.maxTabCount)||9)){
            top.$confirm('页签窗口过多!<br>将关闭最先打开的页签, 再打开新窗口。<br>是否继续?',function(res){
                if(res) {
                    rootTabs.tabs('close', 1);
                    addTab(id);
                }
            });
        }else{
            addTab(id);
        }
        return top.$('#'+id).data('tab-src',src).addClass('root-tab-one');
    },
    $ajax:function(url,params,cb,type,beforeSend,complete){
        var ag=arguments[0];
        if(typeof ag=='object'){
            url=ag.url, params=ag.data||ag.params, cb=ag.success||ag.callback, type=ag.type||type, beforeSend=ag.beforeSend, complete=ag.complete;
        }

        //for mock
        if(typeof url=='string' && url.match(/\/mock\/.+\.json/i)){

            type='GET';
        }

        params=params||{};
        var voidFn=function(){};
        if(beforeSend===false){
            beforeSend=voidFn;
        }else if(typeof beforeSend!='function'){
            beforeSend=function () {showLoading();};
        }
        if(beforeSend==voidFn){
            complete=voidFn;
        }else{
            complete=typeof complete=='function'?complete:function(){hideLoading()};
        }

        //typeof params =='object' && (params.token=top.token);

        //if(type!=='GET'){
        //params=obj2str(params);//post时避免自动将参数序列化为a=1&b=2的形式
        //}
        var requestHead={'token':window.token||(window.token=localData.get('token'))};
        window.config && window.config.exToken && (requestHead.exToken=window.config.exToken);

        //处理参数集合在路径中的恶心情况
        if(type=='GET'){
            if(typeof params=='string' && url.lastIndexOf('/')==url.length-1){
                url=url+params;
                params=null;
            }
            else if(url.indexOf('{')>-1 && url.indexOf('}')>0){
                url=url.format(params);
                params=null;
            }
        }

        return $.ajax($.extend({
            type: type || "POST",
            url: url,
            headers:requestHead,
            contentType: "application/json; charset=UTF-8",
            dataType: 'json',
            data: type=="GET"?params:obj2str(params),
            beforeSend: beforeSend,
        },typeof arguments[0]=='object'?arguments[0]:null)).always(function(res,status){
            complete(res,status);
            if(status == 'success'){
                if(res.flag==1){
                    typeof cb=='function' && cb(res);
                }else if(res.flag==0){
                    toast(res.msg||'后台请求失败').err();
                    warn('ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}'.format(url,obj2str(params),res.msg||''));
                }else if(res.flag==-1){
                    toast('登录状态过期,请重新登录',function(){top.logout()});//top.location.replace('http://'+top.location.host+'/intoLogin');
                }
            }else if(res.status==404){
                //404浏览器本身有报错就不提示了
            }
            else{
                warn('$ajax请求地址错误或网络问题, status: {0}, action:{1} '.format(status,url));
            }
        });
    },
    $post:function(url,params,cb,beforeSend,complete){
        return $ajax(url,params,cb,'POST',beforeSend,complete);
    },
    $get:function(url,params,cb,beforeSend,complete){
        return $ajax(url,params,cb,'GET',beforeSend,complete);
    },
    action2link:function(action){
        return action + (action.indexOf('?')>-1 ? '&token={0}'.format(top.token) : '?token={0}'.format(top.token));
    },
    act2link:this.action2link,
    makeAct:function(act,log){
        var url='/'+act;
        var acts=window.config.mock?window.config.mockActions:window.config.actions;
        var concat=arguments[1]||'api';//默认在service 和 action 中间用api连接
        var baseRestPath=window.config.restfuls[0]+'/'+window.getPrjName()+'/'+concat+'/';
        act=act.replace(/^\//,'').replace(/\?.+/,'');
        if(!acts[act]){
            acts[act]=window.config.mock?window.getDistPath('mock/{0}.json'.format(act.replace(/\/$/,'').replace(/\/|\./g,'-'))):act;
        }
        //console.log(act);
        //arguments.caller && console.info(arguments.caller.toString());
        return acts[act].indexOf('http')==0 ? acts[act] :
            (window.config.mock ? acts[act] : baseRestPath+acts[act] ); //||(window.path+url);
    },
    //内容在4行内的不显示“更多”
    isShowMore:function (selector){
        var container=$(selector||document.body);
        var letterNum = 140;
        var showMore = function (el,letterNum) {
            var elHtml = el.innerHTML.replace(/\n/gm,'<br>'),
                letterNum = letterNum,
                elBriefHtml = '',
                elHtmlLen = elHtml.length,
                $el = $(el),
                $aObj = $el.next(),
                moreId = $aObj.attr('moreId'),
                mt = elHtml.match(/<br/gm);
            //var allFixWrap=$($aObj).closest('.all-fix-wrap');
            //var nativeTable=$($aObj).closest('.native-fix-wrap>table');
            if(elHtmlLen>letterNum ){//|| (mt && mt.length > 3)
                elBriefHtml = elHtml.substring(0,letterNum);
                $el.html(elBriefHtml);
                $aObj.show();
                $aObj.on('click',function () {
                    toggleMore(this,moreId,letterNum,elHtml,elBriefHtml);
                    //allFixWrap.length && allFixWrap.children('.native-fix-wrap').children('table').trigger('refitFix');
                    //nativeTable.trigger('refitFix');
                    container.find('.native-fix-wrap>table').trigger('refitFix');
                });
            }
        };
        $(selector||'body').find('p.brief-content').each(function(index,el){
            showMore(el,letterNum);
        });
        container.find('.native-fix-wrap>table').trigger('refitFix');
        letterNum = null;
    },
    //显示更多、收起
    toggleMore:(function () {
        var isShow = [];//isShow = [{id:'1u',show:true},{id:'2c',show:false}];
        return function (obj,id,letterNum,elHtml,elBriefHtml) {
            var isShowLen = isShow.length,
                moreId = id,
                isMatch = false,//默认false,没有点击过,isShow数组里没有它的id
                i=0,
                obj = $(obj);
            
            for(;i<isShowLen;i++){
                if(isShow[i].id === moreId){
                    if(isShow[i].show){
                        obj.text('收起').prev().html(elHtml);
                        isShow[i].show = false;
                    }else{
                        obj.text('更多').prev().html(elBriefHtml);
                        isShow[i].show = true;
                    }
                    isMatch = true;
                }
            }
            if(!isMatch){
                obj.text('收起').prev().html(elHtml);
                isShow.push({id:moreId,show:false});
            }
        };
    })()
};




},{"./win":26}],24:[function(require,module,exports){
/**
 * Created by yao on 2017/1/18.
 */

require('./injector-extractor');


//todo 类似ng的直接绑定考虑放弃支持
var bindAttr='x-bind';
var bindAttr2='s-bind';
var overlook= $.random();
var getSelf=function(v){return v};



/*
* 注意
* extractor和x-getter合并了,
* 传入queryObj时,给queryObj添加指定的属性和值
* 否则就是x-getter,直接返回一个值
*
* injector和x-setter合并了,
* 传入queryObj时, 除了val,还可能参照queryObj的其他属性来赋值
* 否则就是x-setter,直接根据val赋值
*
*
* 在setEleData和getEleData中,injector和extractor不再是x-form中x-name控件的使用方式
*
* */


//设置元素数据
var setEleData=function(val,always){
    // console.log([key,val,always])
    var ele=this;
    var $ele=$(ele);
    var tempData=$ele.data('current-data');
    var setFn=$ele.injector();//.data('x-setter');

    //1,自定义setFn (有injector的x-name控件在x-form的inject过程中就调用了injector,不会走这里)
    if(typeof setFn=='function'){
        return setFn.apply($ele,[val,null,always]);
    }

    //2,普通原生元素
    else if( $ele.is(':checkbox') ||  $ele.is(':radio') ){
        $ele[0].checked=val===true;
    }
    else if($ele.is(':input')){
        $ele.val(val);
    }
    else if( $ele.is('img')){
        $ele[0].src=val;
    }


    //3,x-from不会挂载tempData, 每次都是即时提供/即时注入
    else if( $ele.is('[x-form]') ){
        $ele.inject(val)
    }

    //4,template系列,x-temp,x-table
    else if(tempData && tempData===val && !always){
        //or JSON.equal(val,tempData)?
        //do nothing, tempData没被整个引用替换就无需更新,除非显式声明对象值已经变了
    }
    else if($ele.is('[x-temp]')){
        $ele.inject(val,true);
    }
    else if($ele.is('[x-table]')){
        $ele.table(val);
    }
    else if(typeof val=='string'){
        $ele.html(val);
    }
    else{
        $ele.template(val,$ele.data('helper'),$ele.data('allow-html'),val);
    }

};


//获取元素数据
var getEleData=function(){
    var $ele=$(this);
    var tempData=$ele.data('current-data');
    var getFn=$ele.extractor();//.data('x-getter');

    //1,自定义getFn (有extractor的x-name控件在x-form的extract过程中就调用了extractor,不会走这里)
    if(typeof getFn=='function'){
        return getFn.call($ele,null);
    }

    //2,普通原生元素
    else if( $ele.is(':checkbox') || $ele.is(':radio')){
        return $ele[0].checked;
    }
    else if($ele.is(':input')){
        return $ele[0].value;
    }
    else if( $ele.is('img')){
        return $ele[0].src;
    }

    //3,x-from不会挂载tempData, 每次都是即时提供/即时注入
    else if( $ele.is('[x-form]') ){
        return $ele.extract();
    }

    //4,template系列,x-temp,x-table
    else if( $ele.is('[x-temp]') ){
        return tempData;
    }
    else if( $ele.is('[x-table]') ){
        return tempData;
    }
    else if(tempData){
        return tempData;
    }
    else{
        return $ele.html();
    }
};




//按属性取值
var getObjVal=function (key,obj,allowHTML,filter){
    //x-map使用stp机制的$encode, x-name返回原始值
    return typeof filter=='function' ? key.valueAt(obj,filter) : key.valueAt(obj,allowHTML);
};

//按属性赋值 (支持反向多级赋值 x-map不可使用,只有x-name可以,因为后者赋值不可包括filter和属性方法)
var setObjVal=function (key,obj,val){
    var arr=key.split('.');
    var len=arr.length;
    var sub=obj;

    for(var i=0;i<len;i++){
        var k=arr[i];
        var last=i==arr.length-1;

        //原型继承属性不可赋值, x-name中不可出现,如filter,原生toString,原生length
        if(typeof sub.hasOwnProperty=='function'  && !sub.hasOwnProperty(k) && typeof sub[k]!='undefined'){
            throw new Error('can not set a prefix property is not ownProperty');
        }

        if(!last){
            //如果是undefined,可以初始化为空对象
            if(typeof sub[k]=='undefined'){
                sub[k]=Object.create(null);
            }
            //其他非Object类型:Function,Number,Boolean,String都不能作为中间属性(null也不可以)
            else if(typeof sub[k]!='object' || sub[k]===null){
                throw new Error('can not set a prefix property is null or typeof Number,Boolean,Function');
            }
            //至此可以安全转换到下一级属性
            sub=sub[k];
        }
        else{
            sub[k]=val;
        }

    }
    return obj;
};




var ckSelector='[x-name],[x-map]';
var ckSelector2='[x-name]';


//x-temp和x-from注入数据
$.fn.checkIn=$.fn.inject=function (data,allowHTML){

    //if(this.filter('[x-form],[x-temp]').length==0){
    //    console.info(this);
    //    throw new Error('the selector has no [x-form] or [x-temp]');
    //}

    //限定了只给x-form 和 x-temp使用
    this.filter('[x-form],[x-temp]').each(function (i,ct) {
        var $ct=$(ct);
        var eles=$ct.find(ckSelector);
        //加入内部表达式支持
        if(eles.length==0){
            var cleanNodes=[];
            $ct.find('*').each(function(i,node){
                //编译属性
                [].slice.call(node.attributes).each(function(attr){
                    var val=node.getAttribute(attr);
                   if(typeof val=='string' && val){
                       val[0]=='#' && (val=val.replace(/^#/,'replace4compile#ID'));
                       node.setAttribute(attr,window.$compile(val,data,allowHTML).replace(/^replace4compile#ID/,'#'));
                   }

                });
                //只对无子节点的元素compile内容,保证元素静态性
                if(node.children.length==0){
                    node.innerHTML=window.$compile(node.innerHTML,data,allowHTML);
                }
            });
        }
        eles.each(function(j,ele){
            var $ele=$(ele);
            var attr=$ele.attr('x-name')||$ele.attr('x-map')//||$ele.attr('name');
            var ifHide=$ele.attr('x-hide');
            var ifShow=$ele.attr('x-show');
            if(ifHide){
                getObjVal(ifHide,data) && $ele.hide().addClass('hide-plus');
            }
            if(ifShow){
                $ele.addClass('hide-plus');
                getObjVal(ifShow,data) && $ele.show().removeClass('hide-plus');
            }
            var val;
            if(attr=='x-map'){
                val=getObjVal(attr,data,allowHTML);
            }
            //x-name是返回原始值的(有业务要求,可定义getSelf对null和undefined做空值处理)
            else{
                val=getObjVal(attr,data,allowHTML,getSelf);
            }

            //todo 如果是x-if,将其用注释节点replace切换

            //todo 是否对x-hide的元素不做数据更新?

            var injector=$ele.injector();
            //自定义的注入键值的方式
            if(typeof injector=='function'){
                injector.apply($ele,[val,data]);
            }
            else{
                setEleData.call(ele,val);
            }

        });
        $ct.is('[x-temp]') && $ct.data('current-data',data);
    });
    return this;
};
/*
 * x-temp和x-form都可以使用
 * 注入的时候x-name,x-map都可以注入,
 * 提取的时候[x-form]是集合x-name控件的当前值, x-temp是返回注入的原始数据
 */




//x-form数据提取
$.fn.checkOut=$.fn.extract=function (reduce4names) {
    if(this.filter('[x-form]').length==0){
        console.info(['the selector has no elements',this]);
        return false;
    }
    if(!this.eq(0).is('[x-form]')){
        console.info(this);
        throw new Error('the element is not a [x-form]');
    }
    var $ele=this.eq(0);
    var outside=$ele.attr('x-outside');
    var queryObj=$ele.data('x-query-obj');
    var eles=$ele.find(ckSelector2);

    if(!queryObj){
        queryObj={};//Object.create(null);
        $ele.data('x-query-obj',queryObj);
    }
    else{
        for(var n in queryObj){
            //清空各值,设定为指定标示符,避免在set中触发绑定更新
            queryObj.hasOwnProperty(n) && (queryObj[n]=overlook);
        }
    }

    //console.log('check outside')
    (outside?eles.add($(outside)):eles).each(function(j,ele){
        var $ele=$(ele);
        var extractor=$ele.extractor();
        //自定义的提供键值的方式
        if(typeof extractor=='function'){
            extractor.call($ele,queryObj);
        }
        else{
            var attr=$ele.attr('x-name')//||$ele.attr('name')//||$ele.attr('x-map')
            var val=getEleData.call($ele);
            setObjVal(attr,queryObj,val);
        }

    });
    for(var n in queryObj){
        //对空值做处理(包括没在set中设置为空的标示)
        if( queryObj.hasOwnProperty(n)  &&  (queryObj[n]==null || queryObj[n]==overlook) ){
            queryObj[n]='';
        }
    }
    return queryObj;
};
/*
 * 非[x-form]是无法使用此方法萃取数据的,被认为是普通容器,去尝试读它的template数据或html
 * 固定了一个queryObj,每次提取在此对象上操作,而非返回一个全新对象,以避免绑定丢失
 * 加入了x-outsides=selector来获取外部绑定
 * 设计了name处理规则:把同name放在一个x-name组件里,该容器通过behavior设定extractor
 */




//子属性监听
var subWatcher=function(n,key,val,root,$scope,nested,safeguard){
    if(nested>5 || safeguard>99887766){
        return false;
    }
    // console.info(safeguard)
    var shadow='_shadow_'+n;
    if(val.hasOwnProperty(n) && !val.hasOwnProperty(shadow)){
        Object.defineProperty(val, shadow , {
            value:val[n],
            writable:true,
            enumerable:false,configurable:false
        });

        Object.defineProperty(val, n , {
            set:function(v){
                if(v===overlook){
                   //此标示用于内部清空属性,不做任何触发;
                    val[shadow]=null;
                }
                // 在赋值之前先比较, 之后先赋值再check,因此共同的val[shadow]=v;不可提出
                // 如果v是对象, 即使全等也可能值发生了变化
                else if(val[shadow]!==v || typeof v=='object'){
                    val[shadow]=v;
                    $scope.check(key,root,true);
                }
                // 并非全等即可不做任何操作,为了避免undefined和无此属性相等,还需要赋值
                else{
                    val[shadow]=v;
                }
            },
            get:function(){
                return val[shadow];
            },
            enumerable:true,configurable:false,//value: undefined,writable:true
        });

        if(typeof val[n]=='object'){
            for(var m in val[n]){
                subWatcher(m,key,val[n],root,$scope,nested+1,safeguard+1);
            }
        }
    }
}
var deepWatcher=function(key,val,$scope){
    //如果是对象对属性进行监视
    if(typeof val=='object'){
        for(var n in val){
            subWatcher(n,key,val,val,$scope,0,0);
        }
    }
}


//绑定组合
function initCoupleClass($scope) {
    var Couple=function (key,selector){
        this.selector=selector;
        this.ele=$(selector);
        this.key=key;
    };

    Couple.prototype.set=function (val,always) {
        $scope.set(this.key,val,always!==false);
        return this;
    };
    Couple.prototype.get=function () {
        return $scope.get(this.key);
    };
    Couple.prototype.update=function (fn,eachItem) {
        //$scope.check(this.key,this.get(),true);
        // return this;
        return $scope.update(this.key,fn,eachItem);
    };
    return Couple;
}


//绑定声明
function bindFactory(mode){
    return function(){
        var the=this;
        var s,ops,k,helper,allowHTML;
        if(arguments[0].isScope){
            s=arguments[0];
            k=arguments[1];
            helper=arguments[2];
            allowHTML=arguments[3];
        }
        else{
            ops=arguments[0];
            s=ops.scope;
            k=ops.key;
            helper=ops.helper;
            allowHTML=ops.allowHTML;
        }
        the.each(function(){
            var $this=$(this);
            var id=$this.prop('id');
            var key=k||('x-binder#'+ id ? id:$.random());
            var couple=s[mode](key,$this,helper,allowHTML);
            $this.data('x-couple',couple);
        });
        return this;
    };
}

$.fn.bind2=bindFactory('bind');

$.fn.binding=bindFactory('binding');


//设置/获取 绑定或装载 的数据
$.fn.getData=$.fn.Get=function(){
    var couple=this.data('x-couple');
    if(couple){
        return couple.get();
    }
    else{
       //console.warn('the ele is not in a couple');
        return getEleData.call(this);
    }

};

$.fn.setData=$.fn.Set=function(data,always){
    this.each(function(){
        var $this=$(this);
        var couple=$this.data('x-couple');
        if(couple){
            couple.set(data,always);
        }
        else{
            setEleData.apply($this,[data,always])
        }
    });
    return this;
};

$.fn.upData=$.fn.update=function(fn,eachItem){
    this.each(function(){
        var $this=$(this);
        var couple=$this.data('x-couple');
        if(couple){
            couple.update(fn,eachItem);
        }
        else{
            var data=this.getData();
            var newData;
            if(eachItem){
                data && data.each(fn);
            }else{
                newData=fn(data);
                data=typeof newData=='undefined'?data:newData;
            }
            this.setData(data);
        }
    });
    return this;
};

$.fn.xData=function(){
     var ags=arguments;
     if(ags.length==0){
         return this.getData();
     }
     else if(typeof ags[0]=='function'){
         return this.update(ags[0],ags[1]);
     }
     else{
         return this.setData(ags[0],ags[1]);
     }
 }


//$.fn.dataBind=function(){
//    var key,data,keyIsData,helper,allowHTML,$scope,ops;
//    if(arguments.length==1){
//        ops=arguments[0];
//        key=ops.key;
//        data=ops.data;
//        helper=ops.helper;
//        allowHTML=ops.allowHTML;
//        $scope=ops.scope;
//        keyIsData=typeof key=='undefined' ;
//        return $scope.bind(keyIsData?data:key,this,keyIsData,helper,allowHTML);
//    }
//    else{
//        $scope=arguments[0];
//        key=arguments[1];
//        keyIsData=arguments[2];
//        helper=arguments[3];
//        allowHTML=arguments[4];
//        return $scope.bind(key,this,keyIsData,helper,allowHTML)
//    }
//}


if(typeof module === "object" && typeof module.exports === "object" ){
    module.exports=function(){
        var $scope={};
        var _data=Object.create(null);
        var _dict=Object.create(null);

        var Couple=initCoupleClass($scope);

        $scope.extending({
            get:function (key) {
                //if(key.match(/\.html?$|\.json$|\.txt$|\.md$/i)){
                //    return window.$cache(key);
                //}
                if(key in _dict){
                    //获取该值绑定的元素
                    var selector=_dict[key];
                    var $ele=$(selector).eq(0);
                    _data[key]=getEleData.call($ele)
                }
                //返回该值
                return _data[key];
            },

            check:function(key,val,always){
                var selector=_dict[key];
                selector && $(selector).each(function(i,ele){
                    setEleData.apply(ele,[val,always]);
                });
                return $scope;
            },

            //通过set设置数据, 进行dirtyCheck
            set:function (key,val,alwaysCheck) {
                _data[key]=val;

                //false表示强制声明不用check,否则去判断undefined还是true
                if(alwaysCheck!==false){
                    $scope.check(key,val,alwaysCheck);
                }

                deepWatcher(key,val,$scope);

                return $scope;
            },

            //加入自动模式
            scan:function (doc,useNgBind) {
                var doc=doc||document;

                var $target=$(doc).find('[{0}]'.format(bindAttr));

                $target.each(function(i,ele){
                    var $ele=$(ele);
                    var key=$ele.attr(bindAttr);
                    key && $scope.bind(key,$ele);
                });

                $target.removeAttr(bindAttr);


                if(useNgBind){
                    var $target2=$(doc).find('[{0}]'.format(bindAttr2));

                    $target2.each(function(i,ele){
                        var $ele=$(ele);
                        var key=$ele.attr(bindAttr2);
                        $scope.binding(key,$ele);
                    });

                    $target2.removeAttr(bindAttr2);
                }
            },

            //使用直接点属性的绑定模式, 对应的数据设置: scope.listData=data;
            binding:function (key,selector,helper,allowHTML) {
                if(!key){
                    return false;
                }

                var _key='_shadow_'+key;

                //被绑定过一次,_dict[_key]就会存在
                _dict[_key] || Object.defineProperty($scope, key , {
                    set:function(val){
                        $scope.set(_key,val);

                        deepWatcher(key,val,$scope);
                    },
                    get:function(){
                        return $scope.get(_key);
                    },
                    enumerable:true,configurable:false,//value: undefined,writable:true
                });

                var couple=$scope.bind(_key,selector,false,helper,allowHTML);


                return couple;
            },

            //通过bind绑定数据,  对应的数据设置: scope.set('listData',data);
            bind:function (key,seletor,keyIsData,helper,allowHTML) {

                //keyIsData参数的加入打乱了原来后面跟着的helper参数的序位
                if(typeof arguments[2]!='boolean'){
                    helper=arguments[2];
                    allowHTML=arguments[3];
                }
                // if(arguments.length<2){
                //     $scope.scan();
                // }

                //手动绑定(推荐,清晰,在js中可以批量审视绑定关系,而不用html与js对应查看)
                // else{
                    var data;
                    //传入数据本身,自动生成key(事实上这样绑定的数据必须是对象,且不可被整体赋值,因为key不返回出来,就无法再次找到. 使用方式为直接赋值其子属性)
                    if(keyIsData){
                        data=key;
                        key=new Date().getTime();
                        _data[key]=data;
                    }
                    //传入的是数据的key
                    else{
                        data=_data[key];
                    }
                    //通过add来叠加多次同一key绑定
                    _dict[key]=$(_dict[key]).add(seletor);

                    //可见auto-bind批量绑定的时候,没有机会传入helper和allowHTML, 尽量用filter代替helper
                    $(seletor).data('helper',helper).data('allow-html',allowHTML);

                    //绑定声明的时候只支持string和对象,因此类false不能触发
                    //data && $scope.set(key,data);

                    //so,更改为in检测以支持全部类型, 如果绑定时已经data有了,就set, 否则只是预绑定,暂无数据
                    (key in _data) && $scope.set(key,data);
                // }


                // 生成一个绑定对像并返回(次对象拥有一批方法, 来简化get,set,update)
                var couple=new Couple(key,seletor,helper,allowHTML,true);
                return couple;//$scope;
            },

            //解除绑定关系
            unbind:function(key,selector){

                //scope.unbind(null,'.notice');
                if(key===null || key===''){
                    selector && $(selector).each(function(i,ele){
                        var $ele=$(ele);
                        key=$ele.attr(bindAttr);
                        key && $scope.unbind(key,$ele);
                    });
                }

                //as u see,in fact, we can find the key on the attribute, but provide a key is always better
                else if(selector){
                    _dict[key] &&  (_dict[key]=_dict[key].not(selector));
                }else{
                    _dict[key]=null;
                }

                return $scope;
            },

            //更新绑定的数据, 对应的数据设置: scope.update('myData',function(myData){ myData.a=2; });
            update:function(key,fn,eachItem){
                var data=_data[key];
                var newData;
                fn=$lambda(fn);
                if(key in _data){
                    //只传入了一个key,说明数据在其他地方已经手动更新
                    if(arguments.length==1){
                        newData=data;
                    }
                    //直接传入了数据,表示强制更新 意义见202行
                    else if(typeof fn!='function'){
                       newData=data;
                    }
                    //数组模式,处理每一子项,无需return和手动each
                    else if(eachItem && Array.isArray(data)){
                        data.each(fn);
                        newData=data;
                    }
                    //标准模式,在update处理函数中更新data; 传入原有data,返回更新后的data,若无返回,表示操作的是对象,同引用已经自动改变
                    else{
                        newData=fn(data);
                        newData=typeof newData=='undefined' ? data : newData;
                    }

                    //也就是scope.update(key,data)等价于scope.set(key,data,true)
                    $scope.set (key, newData, true);
                }
                return newData;
            },
            isScope:true
        },true);

        return $scope;
    };
}
},{"./injector-extractor":11}],25:[function(require,module,exports){
/**
 * Created by yao on 2016/7/26.
 */
$.extend($.fn.validatebox.defaults.rules, {
    ip: {
        validator: function (val) {
            return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test(val);
        },
        message: '请输入正确的IP地址'
    },
    //手机或座机号正则
    contact: {
        validator: function (val) {
            return /^1\d{10}$|^0\d{2,3}-?\d{7,8}$/.test(val);
        },
        message: '请输入正确的固定电话或手机号码'
    },
    //端口号正则
    port: {
        validator: function (val) {
            return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(val);
        },
        message: '端口号必须在1-65535之间'
    },
    //账号密码非中文正则
    noChinese: {
        validator: function (val) {
            return !/^[\u0391-\uFFE5]+$/.test(val);
        },
        message: '账号密码不能包含中文'
    },
    extLength:{
        validator:function (val,arr) {
            val = val.trim();
            var regCh = /[\u0391-\uFFE5]+/gm,//中文
                regNoCh = /[^\u0391-\uFFE5]+/gm,//非中文
                chArr = val.match(regCh),
                noChArr = val.match(regNoCh),
                valLen = (chArr?chArr.join('').length*2:0) + (noChArr?noChArr.join('').length:0);
            arr[2] = Math.ceil((valLen - arr[1])/2);
            return valLen >= arr[0] && valLen<=arr[1];
        },
        message:'已超出{2}字'
    },
    longitude: {
        validator: function (val) {
            var numVal = parseFloat(val);
            return /^-?\d\d?\d?(\.\d\d?\d?\d?)?$/.test(val) && numVal<=180 && numVal>=-180;
        },
        message: '请输入-180到180之间的数字，可包括四位小数'
    },
    latitude:{
        validator: function (val) {
            var numVal = parseFloat(val);
            return /^-?\d\d?(\.\d\d?\d?\d?)?$/.test(val) && numVal<=90 && numVal>=-90;
        },
        message: '请输入-90到90之间的数字，可包括四位小数'
    },
    isChineseID:{
        validator:function(str){
            // aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
            //     31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
            //     43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
            //     61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            var aCity = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91";
            var iSum = 0;
            var idCardLength = str.length;
            var sBirthday = '';
            var d = 0;
            if(!/^\d{17}(\d|x)$/i.test(str)&&!/^\d{15}$/i.test(str))
            {
                return false;
            }
            //在后面的运算中x相当于数字10,所以转换成a
            str = str.replace(/x$/i,"a");
            var curCity = str.substr(0,2);
            if(!(aCity.indexOf(curCity) > 0) )
            {
                return false;
            }
            if (idCardLength==18)
            {
                sBirthday=str.substr(6,4)+"-"+Number(str.substr(10,2))+"-"+Number(str.substr(12,2));
                d = new Date(sBirthday.replace(/-/g,"/"));
                if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
                {
                    return false;
                }

                for(var i = 17;i>=0;i --)
                    iSum += (Math.pow(2,i) % 11) * parseInt(str.charAt(17 - i),11);
                if(iSum%11!=1)
                {
                    return false;
                }
            }
            else if (idCardLength==15)
            {
                sBirthday = "19" + str.substr(6,2) + "-" + Number(str.substr(8,2)) + "-" +
                    Number(str.substr(10,2));
                d = new Date(sBirthday.replace(/-/g,"/"));
                var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
                if(sBirthday != dd)
                {
                    return false;
                }
            }
            return true;
        },
        message:'请输入正确的身份证号'
    }
});
},{}],26:[function(require,module,exports){
/**
 * Created by evans on 16/12/15.
 */
module.exports= {
    $open: function (str, params, isAjax, cb) {
        var ele;
        var body=document.body;
        var innerMaxCss={}, outerMaxCss={},maxHeight,maxWidth;
        var rootSlideMenu = top.byid('root-menu') || {};
        //var fixBarHeight = window.config.winFixBarHeight||params.fixBarHeight||48;

        //固定底部按钮
        var fitLayout = function (ele) {

            var win=ele.closest('.window');
            var panelHead=win.children('.epanel-header');
            var fixBar=ele.children('.win-fix-bar');

            win.addClass('hidden');

            outerMaxCss = {maxHeight:maxHeight};
            innerMaxCss = {maxHeight:maxHeight,overflowY:'auto'};

            outerMaxCss.maxHeight=outerMaxCss.maxHeight-5;
            innerMaxCss.maxHeight=innerMaxCss.maxHeight-5;

            if(panelHead.length){
                var headHeight=getRect(panelHead[0]).height;
                innerMaxCss.maxHeight=innerMaxCss.maxHeight-headHeight;
            }

            if(fixBar.length){
                //win.addClass('has-fix-bar');
                var barHeight=getRect(fixBar[0]).height;
                innerMaxCss.maxHeight=innerMaxCss.maxHeight-barHeight;
                outerMaxCss.paddingBottom=barHeight;
            }

            win.css(outerMaxCss);
            ele.css(innerMaxCss);

            //info([params.height,innerMaxCss.maxHeight,outerMaxCss.maxHeight,outerMaxCss.maxHeight-])

            win.removeClass('hidden');
            ele.on('click', '.cm-cancel-btn,.win-close-btn', function () {
                $(this).closest('.window-body').$close();
            });
        };

        var calcSize=function(win){

            if(params.width == 'max'){
                params.width=win.width-20;
            }
            else if(params.width == 'full'){
                params.width=win.width;
            }

            if(params.height == 'max'){
                params.height=win.height-20;
                params.top=10;
            }
            else if(params.height == 'full' || parseInt(params.height) > win.height){
                params.height=win.height;
                params.top=0;
            }
            else{
                params.top=params.top||Math.min((win.height-~~params.height)/2,win==top?60:0);
            }
            maxHeight=win.height-params.top;
            //outerMaxCss = {maxHeight:maxHeight,overflowY:'auto'}
            //innerMaxCss = {visibility:'visible',maxHeight:maxHeight-36};//-fixBarHeight};//36+48=84,36为弹窗自带的title条的高度,48为底部固定按钮的高度

        };

        //tab弹窗转用$append
        if (typeof params == 'string') {
            return window.$append.apply(this, [].slice.call(arguments));
        }

        //默认不可缩小拉伸,模态显示,允许滚动条,空白标题
        ('maximizable' in params) || (params.maximizable = false);
        ('minimizable' in params) || (params.minimizable = false);
        ('collapsible' in params) || (params.collapsible = false);
        ('resizable' in params) || (params._resizable = false);
        ('scroll' in params) || (params.scroll = true);
        ('modal' in params) || (params.modal = true);
        ('cache' in params) || (params.cache = false);
        ('doSize' in params) || (params.doSize = true);
        ('shadow' in params) || (params.shadow = false);
        ('title' in params) || (params.title = ' ');
        ('height' in params) || (params.height = 'auto');
        ('mask' in params) || (params.mask = 'global');
        ('style' in params) || (params.style = {});//'max-height':window.height-20+'px', 'max-width':window.width-20+'px'});
        ('center' in params) || (params.center = 'global');


        //小于921的完全可以用辅助遮罩模式
        //if(parseInt(params.width)<921 && params.mode=='full-wrap'){
        //    params.mode=='help-mask';
        //}

        //var fn = function(ele){
        //    (params.onClose||window.voidFn)();
        //    ele[0].id=ele[0].id||('eui-win-'+new Date().getTime());
        //    $(body).data('open-params', params); //目前只有原有元素的弹窗可以缓存参数,用于直接发动 $('#mydiv').open();
        //}
        var fn = params.onClose||window.voidFn;


        //三种模态方
        if (window != top) {
            var topMain=top.$('#admin-design-main');//top.$('body>div:first-child');
            var topMainWrap=top.$('#main-wrap');
            var bodyAgent=$(body).children('.body-agent')[0]||$(body).children(':first-child')[0];


            //避免引发重绘
            window._cancelGlobalReFixTbTime=new Date().getTime();

            //延续上一个弹窗的模式
            if(topMain.hasClass('full-win-mode')){
                params.mode='full-win';
            }
            else if(topMain.hasClass('help-mask-mode')){
                params.mode='help-mask';
            }
            else{
                params.mode=params.mode||'trans-agent';
            }

            topMain.addClass(params.mode+'-mode');

            //辅助遮罩方案
            if(params.mode=='help-mask'){

                calcSize(window);

                var scrollTop=body.scrollTop;
                var disabledScroll=function(){body.scrollTop=scrollTop};
                $(window).on('scroll',disabledScroll);

                //废弃,改用addClass控制help-mask显示/隐藏
                //topMainWrap.hasClass('full-wrap')||top.showHelpMask(window.width+30>top.width);

                //暗化滚动条(仍然可滚)
                //$(body).addClass('darken-scroll');

                //彻底禁用滚轮会影响弹窗自身滚动
                //window.disabledMouseWheel(bodyAgent);

                //使用overflow:hidden
                //var completedCSS=getComputedStyle(body);
                //var scrollDis=body.scrollHeight-window.height-parseInt(completedCSS['margin-top'])-parseInt(completedCSS['margin-bottom']);
                //$(body).addClass(scrollDis>0 ? 'holdScrollWidth overflowHidden':'overflowHidden');

                params.onClose = function () {
                    if($(body).children('.window-mask:visible').length==0){

                        $(window).off('scroll',disabledScroll);
                        topMain.removeClass('trans-agent-mode help-mask-mode full-win-mode');

                        //以上对应的四种返回方式
                        //top.hideHelpMask();
                        //$(body).removeClass('darken-scroll');
                        //window.enabledMouseWheel(bodyAgent);
                        //$(body).removeClass('overflowHidden holdScrollWidth');
                    }
                    fn(ele);
                };

                var slideWidth=getRect(rootSlideMenu).width;
                var residue=window.innerWidth-parseInt(params.width);
                var maxLeft=params.width ? residue/-2 : -Infinity;//log(window.innerWidth)
                var marginLeft=Math.max(slideWidth/-2, residue<slideWidth ? 0:Math.min(maxLeft,0) );
                //如果不够调整为全局居中就放弃,让eui自动在内部居中即可
                //正数的marginLeft是因为 弹窗宽度大于窗口宽度了, 导致eui生成的left为负值往左缩入. 这个时候即使用marginLeft正值右移也是没用的. 因为弹窗宽度太大, 左边显示了,右边也是放不下的.info(marginLeft)
                ('margin-left' in params.style) || (params.style['margin-left']=marginLeft);//Math.min(0,marginLeft);



            }
            //最大化frame方案
            else if(params.mode=='full-win'){

                calcSize(top);

                topMainWrap.addClass('full-wrap');
                params.top=params.top||50;
                params.onClose = function () {

                    topMain.removeClass('trans-agent-mode help-mask-mode full-win-mode');
                    topMainWrap.removeClass('full-wrap');
                    $(body).removeClass('overflowHidden').removeClass('holdScrollWidth');
                    fn(ele);
                };

            }

            //移形换影方案 mock-agent
            else{
                calcSize(top);

                var scrollY = body.scrollTop;
                var scrollX = body.scrollLeft;
                $(body).addClass(top.$('body').hasClass('sb-l-m') ?'in-sb-l-m-full-wrap':'in-full-wrap');
                topMainWrap.addClass('full-wrap mock-agent');
                bodyAgent.scrollTop=scrollY;

                $('[refix]').each(function(){
                    var $this=$(this);
                    var cls=$this.attr('refix');
                    cls=cls||'y';
                    cls=='x' && (cls='refix-x');
                    cls=='y' && (cls='refix-y');
                    cls=='x,y' && (cls='refix-x refix-y');
                    $this.attr('refix',cls);
                    $this.addClass(cls);
                });

                params.onClose = function () {
                    //所有弹窗都关闭了,才恢复
                    if ($(body).children('.window.animated').length == 0) {
                        topMain.removeClass('trans-agent-mode help-mask-mode full-win-mode');

                        topMainWrap.removeClass('full-wrap');
                        $(body).removeClass('in-full-wrap in-sb-l-m-full-wrap');
                        body.scrollTop = scrollY;
                        body.scrollLeft = scrollX;

                        $('[refix]').each(function(){
                            var $this=$(this);
                            var cls=$this.attr('refix');
                            $this.removeClass(cls);
                        });
                    }
                    fn(ele);
                };
            }

        }else{
            //calcSize(window);
        }


        //三种加载方式
        ele = arguments[0].jquery ? arguments[0] : null;


        if (ele || str.indexOf('#') == 0) {


            ele = $(str).addClass('e-win-wrap');
            //innerMaxCss.overflowY = 'auto';
            ele.show().window(params).window('hcenter')
                .parent().addClass('animated fadeInDown').end();
            fitLayout(ele);


        }
        else if (isAjax) {


            ele = $('<div class="e-win-wrap" dynamic>').css({overflow: params.scroll ? 'auto' : 'hidden'});

            if (window.$cache(str)) {

                ele.window(params).css(outerMaxCss).html(window.$cache(str))
                    .parent().addClass('animated fadeInDown').css(innerMaxCss).end();

                setTimeout(function () {
                    cb && cb();
                }, 0);

                fitLayout(ele);

            } else {

                ele.window(params).css(outerMaxCss).load(getViewPath(str), function (res) {

                    window.$cache(str,res);
                    cb && cb();
                    fitLayout(ele);

                }).parent().addClass('animated fadeInDown').css(innerMaxCss).end();
            }


        }
        else {


            str = getViewPath(str);

            var id = '' + Date.format('MMDDhhmmssS');

            ele = $('<div class="e-win-wrap overhide" dynamic win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(params.scroll ? 'auto' : 'no', id));

            //setTimeout(function(){
            top._mol_wins[id] = ele.window(params).css(outerMaxCss)
                                    .find('iframe').attr('src', str).end()
                                    .parent().addClass('animated fadeInDown').css(innerMaxCss).end();
            //},0);


        }

        ele.data('open-params', params); //目前只有原有元素的弹窗可以缓存参数,用于直接发动 $('#mydiv').open();

        //hasMask && $('.window-mask').last().css('background-color','transparent');


        return ele;
    }
}
},{}],27:[function(require,module,exports){
/**
 * Created by yao on 2016/11/21.
 *
 * depending:lambda,String.prototype.format,$open,importing,jui
 */
//方法如下
var hideClass='custom-col-hide';
var slice=[].slice;
//var reg=/\<\/?[^\<\>]+\>/g;
//window.extending({html2txt:function(html){return html.replace(reg,'').trim();}});
var isFix=function($ele){
    return $ele.hasClass('need-fix')|| $ele.hasClass('need-fix-end');

};
//列排序方法
var customSortFn=function(cells,isTh){
    //避免引发重绘
    window._cancelGlobalReFixTbTime=new Date().getTime();

    if(!cells.length){
        return false;
    }
    var parent=$(cells[0].parentNode);
    var cellsArr=slice.call(cells).orderby('o => +o.getAttribute("sort-index")');

    //位置不变的不替换,性能会好点,但算法复杂,容易出bug,可靠性差
    //$cells.each(function(j,cell){
    //    var $cell=$(cell);
    //    if(j!=$cell.attr('sort-index')){
    //        $cell.replaceWith($cellsArr[j]);
    //    }
    //});
//if(isTh){
//    log(parent)
//    console.info(cellsArr)
//}
    //避免引发重绘
    window._cancelGlobalReFixTbTime=new Date().getTime();

    cells.remove();
    cellsArr.each(function(cell){
        parent.append(cell);
    });
};

//隐藏指定列的方法
var customFn=function(table,rs){
    //每次非初始化进入,比如先页面载入又保存按钮点过之后,原来的tds顺序已经无法确定,只能重走template来找回th和td的对应关系
    var theadRow=table.children('thead').children('tr');
    var ths=theadRow.children('th');
    var thsArr;
    var tds;

    //避免引发重绘
    window._cancelGlobalReFixTbTime=new Date().getTime();

    table.hide();

    //先保存原有的index
    table.find(' >thead>tr>th , >tbody>tr>td ').each(function(){
        this.hasAttribute('native-index') || this.setAttribute('native-index',$(this).index());
    })

    thsArr=ths.toArray().orderby('th => +th.getAttribute("native-index")');

    //先加隐藏类,打上排序标记
    thsArr.each(function(th,i){
        var $th=$(th)
        var text=$th.text();
        var colConfig=rs.where('o => o.cn=="{0}"'.format(text))[0];
        // rs.each(function(item){   if(!colConfig && item.cn==$th.text()) { colConfig=item; }    });
        var act=colConfig.custom==0 ?  'addClass':'removeClass';
        var sortIndex=colConfig.sortIndex;

        //原来的排序依赖于nth的对应,那么template的表格,每次都要初始化template来找回原来的顺序
        //tds=table.children('tbody').children('tr').children('td:nth-child({0})'.format(i+1));
        tds=table.find('>tbody>tr>td').filter('[native-index="{0}"]'.format(i));

        $th.add(tds)[act](hideClass).attr('sort-index',sortIndex);
    });

    //console.info(['sort-index处理后的ths',slice.call(ths).select('td => td.outerHTML')]);
    //每行进行每个单元格位置的检测和替换
    customSortFn(ths,true);
    table.find('>tbody>tr').each(function(i,tr){
        var tds=$(tr).children('td');//.clone();
        customSortFn(tds);
    });

    table.show();

    var mode=table.attr('fixed-mode');
    mode && table.fixTable(mode);//重走fixTable (todo fixTable要做是否因溢出而需要fix的检测，与本方法无关)
};


//小控件模版
var btnHtml='<div class="custom-tool"><i class="fa icon-cogs" title="自定义列"></i></div>';
var winHtml='<div id="{0}" class="custom-setting-modal">'+
    '<ul class="custom-col-options">{1}</ul>'+
    '<div class="btn-bar"><b class="cm-save-btn"></b><b class="cm-cancel-btn"></b></div>'+
    '</div>';
var tp='<li class="{2}"><input type="checkbox" id="{1}"/><label for="{1}"></label><u>{0}</u><label for="{1}" class="custom-col-switch" data-on="显示" data-off="隐藏"></label></li>';//checked={1} readOnly={2}

$.fn.customCol=function(attr){

    //防止空table过来跑一遍customCol
    if(!this.children().length){
        return this;
    }
    if(this.hasClass('no-custom')){
        return this;
    }

    attr=attr||'custom';//指令属性也可以自定义
    var table=this;
    var wrap=table.closest('.query-result');
    var key='cs-'+(window.iframe?window.iframe.getAttribute('page-no'):($('.spa-view')[0]||{}.id))+(table.prop('id')||'table');
    var thead=table.children('thead');
    var ths=thead.children('tr').children('th');
    var rs=localData.get(key);//rowsSetting
    //console.info(['取出的rs',rs])
    //检测基本条件
    if(!key || !table.is('table')){  //|| !ths.filter('[{0}]'.format(attr)).length){
        //console.warn([key,table]);
        return this;
    }

    //检测表头是否有更新
    if(rs){
        if(rs.length!=ths.length){
            rs=null;
        }else{
            rs=rs.orderby('r => r.cn');
            var thsArr=slice.call(ths).orderby('th => $(th).text()');
            var msg='列名改变? {0},  自定义项改变?{1} , 自定义固定列改变?{2}';

            var needUp=rs.some(function(r,i){
                var b  =  r.cn!= $(thsArr[i]).text(); //info([r.cn,ths])
                var b2 = (r.custom==null && thsArr[i].hasAttribute(attr));
                var b3 = (r.custom!=null && !thsArr[i].hasAttribute(attr));
                var b4 = r.needFix!=(isFix($(thsArr[i]))?'fixed-item':'');//.className.match(/\s?need-fix|^need-fix/)

                //info([r.cn,r.needFix,isFix($(thsArr[i]))?'fixed-item':''])

                msg=msg.format(b,b2||b3,b4);
                return b || b2 || b3 ||b4;
            });

            needUp && console.info(['custom表格结构变化,更新custom设置...',msg,table.prop('id'),table]);
            needUp && (rs=null);
        }
    }
    //初始化
    if(!rs){
        rs=[];
        ths.each(function(i,th){
            var $th=$(th);
            //custom列默认显示，调成0为默认不显示
            rs[i]={
                cn:$th.text(),
                custom:this.hasAttribute(attr)?(this.getAttribute('cs-init')==='false'?0:1):null,
                nativeIndex:i,
                needFix:isFix($th)?'fixed-item':'',
                sortIndex:this.getAttribute('sort-index')||i //第0个是不变的,否则0||i会不对
            };

            //同时存到th上
            th.setAttribute('sort-index',rs[i].sortIndex);
            //th.setAttribute('native-index',rs[i].nativeIndex);
        });
        localData.set(key,rs);
    }
    //都更新下
    //localData.set(key,rs);

    //console.log('$.fn.customCol触发custom重绘!');
    customFn(table,rs);

    //table.on('customHide',function(){
    //    customHide(rs,table);
    //})

    //生成小控件
    if(!wrap.hasClass('has-custom-btn')){
        var btn=$(btnHtml);
        btn.appendTo(wrap.addClass('has-custom-btn'));//.attr('custom-btn-appended',true));//设定为table必须有.query-result包裹，因为小控件不生成于table中
        //btn.appendTo(wrap.length?wrap:table.closest(':not(".native-fix-wrap,.all-fix-wrap")'));

        //设置弹窗
        btn.on('click',function(){
            var ops='';
            var rs=localData.get(key);//防止闭包保存，从本地存储实时获取
            rs=rs.orderby('r => +r.sortIndex');
            rs.each(function(r,i){
                ops+=tp.format(r.cn, key+'-'+i, r.needFix);//,r.custom!=0,r.custom==null);
            });

            //todo 这个弹窗可以只生成一次，做好对映标识别，以后每次只更新check值就可以了
            var tempID='temp-'+new Date().getTime();
            var win=$(winHtml.format(tempID,ops));
            win.hide().appendTo(wrap);
            window.$open('#'+tempID,{width:350,title:'自定义列'}).focus();//$open接受元素传参


            win.find(':checkbox').each(function(i,checkbox){
                checkbox.checked=rs[i].custom!=0;
                checkbox.disabled=rs[i].custom==null;
            });

            //保存按钮
            win.on('click','.cm-save-btn',function(){
                //更新rowsetting
                //var rs=localData.get(key);//防止闭包保存，从本地存储实时获取
                //var rs=[]
                win.find('li').each(function(i){
                    ////console.log([i,this.disabled,this.checked]);
                    var $this=$(this);
                    var checkBox=$this.find(':checkbox')[0];
                    var custom;
                    if(!checkBox.disabled){
                        custom=checkBox.checked?1:0;
                    }
                    //rs[i].sortIndex=i;
                    rs[i]={
                        cn:$this.children('u').text(),
                        custom:custom,
                        //nativeIndex:$this.attr('native-index'),
                        needFix:$this.hasClass('fixed-item')?'fixed-item':'',
                        sortIndex:i //第0个是不变的,否则0||i会不对
                    };
                    //console.info(obj2str(rs[i]))
                });
                //console.info(['更改后的rs',rs])
                //更新本地存储和视图显示
                //rs=rs.orderby('o => o.nativeIndex')
                localData.set(key,rs);
                //console.log('保存触发custom重绘!');
                customFn(table,rs);

                //var thead=table.children('thead');
                //var theadData=thead.data('current-data');
                //theadData && thead.template(theadData);
                //
                //var tbody=table.children('tbody');
                //var tbodyData=tbody.data('current-data');
                //tbodyData && tbody.template(tbodyData);
                //
                //var tableData=table.data('current-data');
                //tableData && table.template(tableData);

                //table.on('customHide',function(){
                //    customHide(rs,table);
                //})
                win.$close().remove();

            })
                .on('click','.cm-cancel-btn',function(){
                    //避免引发重绘
                    window._cancelGlobalReFixTbTime=new Date().getTime();
                    //因为没有走单例，因此每次动态生成，使用完后都清除
                    win.$close().remove();
                }).on('click','li',function (e) {
                    $(e.target).is('input,label') || $(this).find('input')[0].click();
                });
            importing('jui',function(){
                win.children('.custom-col-options').sortable({
                    //items: "li:not(:)"
                    cancel: 'li:first-child,li:last-child,.fixed-item',
                    cursor: 'move',
                    items: 'li:not(:first-child,:last-child,.fixed-item)',
                    axis: 'y'
                }).on('sortstart', function(e, ui){
                    //$(this).children().css({cursor:'move'});
                }).disableSelection();
            });
        });
    }

    return this;
};

//先在要走custom的th上加上custom属性, 如：<th custom>案件详情</th>

//然后自启动
$(function(){
    if(config.autoCustomCol){
        //console.log('domreay $.fn.customCol, 主要是为了处理静态写在页面上的表头');
        $('.query-result table:has("tbody"):not("[xtp-table]")').eq(0).customCol('cs');
    }
    //config.autoCustomCol && alert(config.autoCustomCol==true) && window!=top && $('.query-result table').eq(0).customCol('cs');//:has("th[custom]:first")
});
},{}],28:[function(require,module,exports){
/**
 * Created by yao on 2016/11/21.
 */
window.extending('$filter',function(filterName,fn,theType){
    if(theType){
        theType.prototype.extending(filterName,fn);
    }else{
        String.prototype.extending(filterName,fn);
        Number.prototype.extending(filterName,fn);
        Boolean.prototype.extending(filterName,fn);
    }
});

},{}],29:[function(require,module,exports){
/**
 * Created by yao on 2016/11/15.
 */
window.$.fn.fixTable=function fixTable(mode,cb){//,wraped,cb){
    var nativeTable=this;
    var $qr=nativeTable.closest('.query-result');
    var needFixCol=nativeTable.children('thead').find('th.need-fix').length>0 //&& widthOverflow;
    var needFixColEnd=nativeTable.children('thead').find('th.need-fix-end').length>0 //&& widthOverflow;
    var needFixHead=nativeTable.children('thead.need-fix').length>0;
    //stp.table等直接table发动后传来的空table,而非tbobdy发动引出,这种情况下除了数据,thead也没有,因此无法判断是否need-fix,彻底重走
    if(nativeTable.is(':empty')){
        // 注意! 事件不要注册在.all-fix-wrap上,因为在固定列时会被重置,.query-result才是一个固定的战略点
        //TODO 可以把all-fix-wrap中其他元素清除,nativeTable去掉nativeFixWrap即可
        nativeTable.closest('.all-fix-wrap').replaceWith(nativeTable);
        nativeTable.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">');
        return nativeTable;
    }
    if(!nativeTable[0] || nativeTable.hasClass('no-fix') || (mode=='all'&&!(needFixCol||needFixHead||needFixColEnd)) || (mode=='col'&&!needFixCol&&!needFixColEnd) || (mode=='head'&&!needFixHead) ){
        nativeTable.closest('.query-result').children(':not(.new-color-bar)').add(nativeTable).css('visibility','visible');
        nativeTable.closest('.query-result').children('.all-fix-wrap').find('.head-fix-wrap>table, table.cross-fix-cols-head, .col-fix-wrap>table').css('visibility','visible');
        return nativeTable;
    }
    else if(nativeTable.hasClass('no-fix-head')){
        if(mode=='all')
        mode=='all' && (mode='col');
    }
    else if(nativeTable.hasClass('no-fix-col')){
        mode=='all' && (mode='head')
    }
    $qr.addClass('changing');
    setTimeout(function(){
        //先去除原来的包裹
        nativeTable.closest('.all-fix-wrap').replaceWith(nativeTable);

        var nativeTableWidth=getRect(nativeTable[0]).width;
        var nativeTableHeight=getRect(nativeTable[0]).height;
        var nativeTableParentWidth=getRect(nativeTable.parent()[0]).width;
        var nativeTableParentHeight=getRect(nativeTable.parent()[0]).height;

        var widthOverflow=nativeTableWidth>nativeTableParentWidth;
        var heightOverflow=nativeTableHeight>nativeTableParentHeight;



        var wrapHeight=nativeTable.attr('wrap-height');
        var isMultipleHead=nativeTable.children('thead').children('tr').length>1;
        var rootWrap, nativeWrap, theCopyForCol,theCopyForHead,theCopyForColEnd;



        //console.log([ getRect(nativeTable[0]).width,getRect(nativeTable.parent()[0]).width,getRect(nativeTable[0]).height,getRect(nativeTable.parent()[0]).height,hasScroll(nativeTable.parent()[0],'y')]);
        if(!widthOverflow){
            if(mode=='col'){
                nativeTable.closest('.query-result').removeClass('changing');
                return nativeTable;
            }
            mode=='all'&& (mode='head');
        }else{
            mode=='head'&& (mode='all');
        }
        //判断是否超出容器最大高度
        //var winHeight=nativeTable.closest('.window').length ? wrapHeight:window.innerHeight;
        //if(parseInt(wrapHeight) &&  nativeTableHeight<winHeight-120){//(!hasScroll(nativeTable.parent()[0],'y')){ // !heightOverflow){
        //    if(mode=='head'){
        //          nativeTable.closest('.query-result').removeClass('changing');
        //          return nativeTable;
        //    }
        //    mode=='all' && (mode='col');
        //}


        nativeTable.wrap('<div class="native-fix-wrap">').parent().wrap('<div class="all-fix-wrap">');

        rootWrap=nativeTable.closest('.all-fix-wrap');
        nativeWrap=nativeTable.closest('.native-fix-wrap');

        !isMultipleHead && nativeTable.children('thead').find('th').each(function(i,th) {
            nativeTable.children('tbody').children('tr').each(function (j,tr) {
                //$(tr).children('td.hide,td.stp-hide,td.hideplus,td.hide-plus,td.hidePlus').remove();
                var $td=$(tr).children('td').eq(i);
                $(th).hasClass('need-fix') && $td.addClass('need-fix');
                $(th).hasClass('need-fix-end') && $td.addClass('need-fix-end');
            });
        });

        nativeTable.on('refitFix',function(){
            theCopyForCol && theCopyForCol.add(theCopyForColEnd).children('tbody').children('tr').each(function(i,ele) {
                $(this).children('td').height(0);
                var proto=nativeTable.children('tbody').children('tr').eq(i);
                proto[0] && $(this).height(getComputedStyle(proto[0]).height);
            });
            theCopyForColEnd && theCopyForColEnd.children('tbody').children('tr').each(function(i,ele) {
                //同上,先把内部height置空避免tr设置高度无效, 然后直接设置tr的高度就可以了, 不一一再循环设置td的高度了
                $(this).children('td').height(0);
                var proto=nativeTable.children('tbody').children('tr').eq(i);
                proto[0] && $(this).height(getComputedStyle(proto[0]).height);
            });
        });

         $(window).resize(function(){
             setTimeout(function(){
                 nativeTable.trigger('refitFix');
             },120);
         });

        //fix-col
        if( (mode=='col' || mode=='all') && needFixCol){
            theCopyForCol=$(nativeTable.clone(true)).width('auto');
            theCopyForCol.prop('id','').children('thead,tbody').prop('id','');

            var nativeTrs=nativeTable.children('thead,tbody').children('tr');
            var copyTrs=theCopyForCol.children('thead,tbody').children('tr');

            copyTrs.each(function(i,tr) {

                var proto=nativeTrs.eq(i);

                $(tr).children().each(function(k,cell){

                    var $this=$(cell);

                    if($this.hasClass('need-fix')){// && proto.nextElementSibling){

                        var protoCell=proto.children().eq(k);

                        $this.width(getComputedStyle(protoCell[0]).width);
                        $this.height(getComputedStyle(protoCell[0]).height);

                        //TODO 是太p.fixtable右侧固定列鼠标移入意外也能触发下面方法,而且事件目标确实是固定列非nativeTr, 然而查看proto并没有取错
                        proto.hover(function(){
                            $this.addClass('hover-like');
                        },function(){
                            $this.removeClass('hover-like');
                        });

                        $this.hover(
                            function(){
                                rootWrap.find('>.col-end-fix-wrap>table>tbody>tr').eq(i-1).add(proto).addClass('hover-like');
                            },function(){
                                rootWrap.find('>.col-end-fix-wrap>table>tbody>tr').eq(i-1).add(proto).removeClass('hover-like');
                            }
                        );
                    }else{
                        $this.remove();
                    }
                });
            });
            theCopyForCol.wrap('<div class="col-fix-wrap">');//.format(nativeWrap.clientHeight))
            theCopyForCol.parent().appendTo(rootWrap);
        }

        //fix-col-end
        if( (mode=='col' || mode=='all') && needFixColEnd){
            theCopyForColEnd=$(nativeTable.clone(true)).width('auto');
            theCopyForColEnd[0].id='';
            theCopyForColEnd.children('thead,tbody').each(function(){
                this.id='';
            });
            theCopyForColEnd.children('thead,tbody').children('tr').each(function(i,ele) {
                var proto=nativeTable.children('thead,tbody').children('tr').eq(i);
                $(this).children('th,td').each(function(k){
                    var $this=$(this);
                    if( $this.hasClass('need-fix-end')){//|| proto.is('.need-fix:last-child') ){
                        var protoCell=proto.children('th,td').eq(k);
                        $this.width(getComputedStyle(protoCell[0]).width);
                        $this.height(getComputedStyle(protoCell[0]).height);
                        proto.hover(function(){
                            $this.addClass('hover-like');
                        },function(){
                            $this.removeClass('hover-like');
                        });
                        $this.hover(
                            function(){
                                //TODO colEnd copy cell的鼠标移入,意外直接触发了proto.hover事件导致col copy hover-like自动生效, 然后colEnd copy本身的proto并没有hover,也没有自动产生:hover样式,尚未明确
                                //rootWrap.find('>.col-fix-wrap>table>tbody>tr').eq(i).add(proto).addClass('hover-like');
                                proto.addClass('hover-like');
                            },function(){
                                //rootWrap.find('>.col-fix-wrap>table>tbody>tr').eq(i).add(proto).removeClass('hover-like');
                                proto.removeClass('hover-like');
                            }
                        );
                    }else{
                        $this.remove();
                    }
                });
            });
            theCopyForColEnd.wrap('<div class="col-end-fix-wrap">');//.format(nativeWrap.clientHeight))
            theCopyForColEnd.parent().appendTo(rootWrap);
        }

        //fix-head
        if( (mode=='head' || mode=='all') && needFixHead){
            theCopyForHead=$(nativeTable.clone(true)).width('auto');
            //nativeTable.children('thead').children('tr').children('th').children('.custom-col-wrap').html(function(i,old){return backUpWrapBegin + old + backUpWrapEnd;});
            //指定表格区高度以便出现纵向滚动条
            //var ct=rootWrap.parent().parent();
            //var underModal= ct[0]!=document.body;
            if(isNaN(wrapHeight)){
                //wrapHeight= underModal ? getRect(ct.closest('.panel.window')[0]).height-40 :
                wrapHeight= window.innerHeight  - getRect(nativeTable[0]).top-parseInt(getComputedStyle(document.body).paddingBottom)- parseInt(getComputedStyle(rootWrap.parent()[0]||rootWrap[0]).marginBottom)- (rootWrap.next().length?getRect(rootWrap.next()[0]).height:0)-3;
            }
            wrapHeight=wrapHeight>300?wrapHeight:(window.height-100);
            nativeWrap.css({'max-height':+wrapHeight,'min-height':20});
            //固定列表格的高度是否遮盖下方的水平滚动条?
            rootWrap.children('.col-fix-wrap,.col-end-fix-wrap').height(nativeWrap[0].clientHeight);
            //rootWrap.children('.col-fix-wrap,.col-end-fix-wrap').height('100%');
            theCopyForHead[0].id='';
            theCopyForHead.children('thead,tbody').each(function(){
                this.id='';
            });
            theCopyForHead.children(':not(thead)').remove();
            theCopyForHead.children('thead').children('tr').each(function(i) {
                var proto=nativeTable.children('thead').children('tr').eq(i);
                $(this).children('th').each(function(k){
                    var $this=$(this);
                    var protoCell=proto.children('th,td').eq(k);
                    var computedStyle=getComputedStyle(protoCell[0]);
                    $this.width(computedStyle.width);
                    $this.height(computedStyle.height);
                });
            });

            if(needFixCol){
                var fixColsHead=theCopyForHead.clone(true).addClass('cross-fix-cols-head');
                fixColsHead[0].id='';
                //fixColsHead.children('thead').children('tr').children('th:not(.need-fix),th:last-child').remove();
                fixColsHead.children('thead').children('tr').children('th:not(.need-fix)').remove();
                fixColsHead.appendTo(rootWrap);
            }

            if(needFixColEnd) {
                var fixColsHeadEnd = theCopyForHead.clone(true).addClass('cross-fix-cols-head-end');
                fixColsHeadEnd[0].id = '';
                //fixColsHeadEnd.children('thead').children('tr').children('th:not(.need-fix:last-child,.need-fix-end)').remove();
                fixColsHeadEnd.children('thead').children('tr').children('th:not(.need-fix-end)').remove();

                var scrollbarWidth = nativeWrap[0].offsetWidth - nativeWrap[0].clientWidth;
                //fixColsHeadEnd.find('th').length > 0 && fixColsHeadEnd.find('th:last-child').width(function (i, old) {
                //    return old + scrollbarWidth
                //}).end().appendTo(rootWrap);
                //theCopyForColEnd && theCopyForColEnd.parent().css({zIndex: 1, right: scrollbarWidth});

                //为了防止滚动条被右上固定格子挡住
                fixColsHeadEnd.appendTo(rootWrap);
                theCopyForColEnd && theCopyForColEnd.parent().css({zIndex: 1, right: scrollbarWidth});
                fixColsHeadEnd.css({zIndex: 1, right: scrollbarWidth});
            }


            //TODO scrollWidth
            var scrollWidth=window.hasScroll(nativeWrap[0],'y');
            //var scrollHeight=hasScroll(nativeWrap[0],'x');//console.log([scrollWidth,scrollHeight]);
            var rootWrapWidth=getComputedStyle(rootWrap[0]).width;


            theCopyForHead.width(getComputedStyle(nativeTable[0]).width).wrap('<div class="head-fix-wrap">');


            //为了防止滚动条被右上固定格子挡住, headCopyWrap限制为比nativeWrap小一个滚动条的宽度, 记得取消min-width:100%
            //needFixColEnd &&
            // if(mode=='head'){
            //     // theCopyForHead.parent().css({
            //     //     width:'100%',
            //     //     paddingRight:scrollWidth,
            //     // }).appendTo(rootWrap);
            //     // theCopyForHead.width('100%');
            //     theCopyForHead.parent().appendTo(rootWrap).css('paddingRight','5');
            // }
            // else{
                theCopyForHead.parent().css({
                    width:nativeWrap.width()-scrollbarWidth,
                    //marginRight,scrollWidth,
                    paddingRight:scrollWidth,
                    minWidth:'auto',//不支持auto的浏览器,写一个100px来废掉原有的100%即可
                    background:'transparent'
                }).appendTo(rootWrap);
            // }



            //nativeTable的td居然会在computedStyle计算完成后, 再次自动扩展大小, 见于列少屏幕大的情况. 因此这种情况下, 重新拷贝
            //原单元格自动扩展, 导致computedStyle.width不准, 引起theCopyForHead宽度不适配
            var theCopyForHeadWidth=parseInt(getComputedStyle(theCopyForHead[0]).width);
            var nativeTableWidth=parseInt(getComputedStyle(nativeTable[0]).width);

            //logEx([theCopyForHeadWidth,nativeTableWidth,nativeTable[0].id])

            //先算下复制表头是否宽度准确
            //theCopyForHeadWidth=theCopyForHeadWidth-scrollWidth;
            var gap=nativeTableWidth-theCopyForHeadWidth;


            //todo 在添加padding前就判断最好,可避免先加又减,目前这样比较保险
            //固定头,出现纵向滚动条,  同时固定列又未出现横向滚动条时, headCopy为了让出右上角滚动遮挡损失了scrollWidth宽度, paddingRight需要去除, headcopy使用原型表头就可以了
            gap>0 && gap==scrollWidth && theCopyForHead.parent().css({paddingRight:0});
            //如复制的固定表头宽度不准,放弃,直接使用新的thead clone
            //if(Math.abs(gap)>2){
            //    log('need replace clone-head again  scrollWidth:{0}, gap:{1}, table:{2}'.format(scrollWidth,gap,nativeTable[0].id));
            //    //见于列少屏幕大的情况.
            //    theCopyForHead.parent().css({paddingRight:0});//theCopyForHead.parent().css({minWidth:'100%'});
            //    //theCopyForHead.css({width:'100%',margin:'0'});
            //    //theCopyForHead.children('thead').replaceWith(nativeTable.children('thead').clone());
            //}

            var firstWidth=getRect(theCopyForHead.find('th')[0]).width;
            var firstWidth2=getRect(nativeTable.children('thead').find('th')[0]).width;
            if(Math.abs(firstWidth-firstWidth2)){
                console.info([firstWidth,firstWidth2]);
                var thead=$('.native-fix-wrap>table>thead'),thead2=$('.head-fix-wrap>table>thead'); thead2.replaceWith(thead.clone());
                //$('.cross-fix-cols-head,.cross-fix-cols-head-end').remove();
            }
        }


        var fixCols=$(theCopyForCol).add(theCopyForColEnd);
        var rootHeight = rootWrap ? rootWrap.height():'';

        mode=='head' && theCopyForHead && nativeWrap.scroll(function(){
            theCopyForHead.css('right',this.scrollLeft);
        }) &&  $(fixColsHead).add(fixColsHeadEnd).remove();

        mode=='col' && fixCols.length && nativeWrap.scroll(function(){
            fixCols.css('bottom',this.scrollTop);
        });

        mode=='all' &&  (theCopyForHead||fixCols.length) && nativeWrap.scroll(function(){
            theCopyForHead && theCopyForHead.css('right',this.scrollLeft);
            fixCols.length && fixCols.css('bottom',this.scrollTop);
        });
        nativeTable.children('tbody').children().length || rootWrap.height(rootHeight+1);
        //return nativeTable;


        nativeTable.attr('fixed-mode',mode);


        //注册resize时,检测固定的th是否与td宽度一致
        if(mode && !nativeTable[0].hasAttribute('resize-reg')){
            $(window).resize(function() {
                var exeReFixTbTime=+nativeTable.attr('resize-reg');
                var now=new Date().getTime();

                //是否全局刚刚禁止触发reFix-table
                var gitv=now-window._cancelGlobalReFixTbTime||(now-9);
                //info(['window._cancelGlobalReFixTbTime '+window._cancelGlobalReFixTbTime, gitv])
                if(gitv<300 ||gitv==9){
                    log('global resize-reg cancel before ....')//{0}ms'.format(gitv))
                    return false;
                }

                exeReFixTbTime=exeReFixTbTime||now-9;
                var itv=now-exeReFixTbTime;
                if(itv>300 || itv==9){
                    var tds=nativeTable.find('>tbody>tr:first>td');
                    var need=false;

                    //setTimeout(function(){
                        //检测,判断是否需要重走fixTable,有些情况下table自适应
                        $qr.find('>.all-fix-wrap>.head-fix-wrap>table>thead').children('tr').each(function(){
                            var $this=$(this);
                            var ths=$this.children('th');
                            if(ths.length!=tds.length){
                                return false;
                            }else{
                                ths.each(function(i,th){
                                    if(need){
                                        return false;
                                    }
                                    //log([getRect(th).width,getRect(tds[i]).width])
                                    var width=getRect(th).width;
                                    var widthProp=getRect(tds[i]).width;
                                    // log([width,widthProp,width-widthProp]);
                                    // setTimeout(function(){
                                    //     (widthProp-getRect(tds[i]).width) && info([widthProp,getRect(tds[i]).width])
                                    // },1500);
                                    if(Math.abs(parseFloat(width-widthProp))){
                                        //info([getRect(th).width,getRect(tds[i]).width],Math.abs(parseFloat(getRect(th).width-getRect(tds[i]).width)))
                                        need=true;
                                    }
                                });
                            }
                        });

                        if(need){
                            $qr.animate({opacity:0},60);
                            nativeTable.attr('resize-reg',new Date().getTime());
                            //注意,每次进行可能引发resize的操作,而该操作本身会触发template或fixTable,或其他不需要触发下面语句的时候
                            //要执行上面那句,时间戳赋值,以避免短时间内触发多次
                            setTimeout(function(){
                                nativeTable.fixTable(nativeTable.attr('fixed-mode'),function(){
                                    setTimeout(function(){
                                        $qr.animate({opacity:1},80);
                                    },90);
                                });
                            },90);
                            info('window resize before {0}ms, {1}'.format(itv,' reFixed table:{0}'.format(nativeTable.prop('id'))));
                        }
                        else{
                            //log('window resize before {0}ms, {1}'.format(itv,' no needReFixed table:{0}'.format(nativeTable.prop('id'))));
                        }


                    //},50)

                }else{
                    log('just resize...')
                }
            });
        }
        nativeTable.attr('resize-reg','');

        $qr.removeClass('changing');
        typeof cb=='function' && cb(rootWrap);
    },50);

    return nativeTable;
};

//typeof module === "object" && typeof module.exports === "object"  && (module.exports=);

},{}],30:[function(require,module,exports){
//todo 若将STP应用于后端node渲染的话,需要解除几个jquery的依赖,或手写一个轻量的jqLite即可

//空值及转义处理 for null,undefined,number,xss and others
function $encode(val,allowHTML){
    var dic={'<':'&lt;','>':'&gt;','"':'&quot',"'":'‘',':':'：','{':'&#123;','}':'&#125;'};//&#39; &apos;
    // 数字0会做false,false做‘’处理(字符串'0'不会),需要显示0或不做为false条件则需要{i.toString}转为字符串形式
    //if($encode.zeroAsEmpty!==false && val===0){
    //    return '';//不再提供此配额, 有需要显示按上面i.toString方法
    //}
    if(val==null || val=='null' || val=='NULL' || val===0 || val===false ){
        return '';
    }
    val =  allowHTML ? String(val).replace(/\<\/?script[^\>]*\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return dic[$]})})
        : String(val).replace(/\<|\>/gm,function($){return dic[$]});
    //后台没做转义才开启，避免性能消耗
    return $encode.tranSymbol ? val.replace(/\"\'\{\}\:/gm,function($){return dic[$];}):val;
}

//单个属性值解析器
function $getVal(key,obj,allowHTML,$index){
    var val=obj;
    var arr=key.split('.');
    var the=this;
    for(var i=0;i<arr.length;i++){
        //对第一个属性判断
        if(i==0 ){
            //this一般是绑定的固定数据,如果是this则指向代入的this, 直接赋值走向下个属性
            if(arr[i]=='this'){
                val=the;
                continue;
            }
            //只有数组在调用中会传入$index
            if(typeof $index!='undefined'){
                //如果是$index或$rownum就直接代入索引和序号
                if(arr[i]=='$index'){
                    val=$index;
                    continue;
                }
                if(arr[i]=='$rownum'){
                    val=$index+1;
                    continue;
                }
                if(arr[i]=='$nth'){
                    val =  $index%2==1 ? 'nth-even':'nth-odd';
                    $index%3==2  && (val += ' nth-third');
                    continue;
                }
            }
        }
        //数字的length是数字本身,而非数字字符串长度. i=0,k=5; i.length为0,返回空值, k.length返回5, 这样的设计是让空值的length属性也为空, 取id.length属性时,不管id是number还是string都可用于真假值判断
        if(typeof val=='number' && arr[i]=='length'){
            //val=val;
        }
        //函数属性取返回值
        else{
            if(typeof val[arr[i]]=='function'){
                val=val[arr[i]].toString().indexOf('[native code]')>-1?val[arr[i]]():val[arr[i]].apply(val,[obj,$index]);
            }else{
                val=val[arr[i]];
            }
        }
        //过滤特殊字符,数据库或js类型转换的典型结果, 实际预期是空字符串
        if((val==null||val=='null' || val=='NULL') && typeof arr[i+1]!='undefined'){
            val='';
        }
        //console.info('一次循环结束\n\n  ')
    }
    return typeof arguments[2]=='function' ? arguments[2](val):$encode(val,allowHTML);
};

//单个对象值编译器 core 4 core
function $format(str,obj,$index,allowHTML){//,prefix) {

    var the=this;

    var getVal=function(key){
        return $getVal.apply(the,[key,obj,allowHTML,$index]);
    }
    //prefix=prefix||'';
    //{{arr:#tp2}}
    ///{{!?[A-z]+(\.?\w+)*\s?&{2}\s?#[\w\-]+}}/
    ///{{!?[A-z]+(\.?\w+)*\s?&{2}\s?#[^#].+}}/
    ///{{!?[A-z]+(\.?\w+)*\s?&{2}\s?\n[^\xdd]+\s*\n}}/
    ///{{[A-z]+(\.?\w+)*\s?:?\s?#[\w\-]+}}/
    ///{{\w*\s?:?\s?#[^#].+#}}/
    //条件或循环表达式{{....}}  这里有个小隐坑,页面中的html模版取出时,&会被转义,因此解析表达式时需要转回来
    str=str.replace(/&amp;&amp;/g,'&&').replace(/{{!?\w+(\.\w+)*\s?&{2}\s?#[\w\-]+}}|{{!?\w+(\.\w+)*\s?&{2}\s?#[^#].+}}|{{\w+(\.\w+)*\s?:?\s?#[\w\-]+}}|{{\w*\s?:?\s?#[^#].+#}}|{{!?[A-z]+(\.\w+)*\s?&{2}\s?\n[^\xdd]+\n\s*}}/g,function(g){
        //if(g.match(/{{[A-z]+(\.?\w+)*\s?&{2}\s?\n[^\xdd]+\n\s*}}/)){
        //    info(g.match(/{{[A-z]+(\.?\w+)*\s?&{2}\s?\n[^\xdd]+\n\s*}}/))
        //    return g;
        //}

        //if(g.indexOf('\n')>-1){
        //    return g.replace(/{{!?[A-z]+(\.\w+)*\s?&{2}\s?\n|{{!?[A-z]+(\.\w+)*\s?:\s?\n|\n\s*}}/g,function(m){return m.trim();});
        //}


        g=g.replace(/^{{|}}$/g,'');

        //使用了换行代替#<p>内容</p>#包裹
        var n1=g.indexOf('\n'),x1=g.indexOf('#');
        //换行符在#前面或者没有#
        if(( n1>-1 && x1>-1 && n1<x1) || (n1>-1 && x1==-1)){
            //todo 这里待使用for循环捕获或exec遍历位置来弥补正则不足, g=g.slice(0,第一个\n}}出现的位置)
            //todo 捕获后替换为去掉\n的{{...}}形式即可,让下次捕获来自动处理,\n相当于便于书写的空符号
            //在整体解析前去掉也可?.replace(/{{!?[A-z]+(\.\w+)*\s?&{2}\s?\n|{{!?[A-z]+(\.\w+)*\s?:\s?\n|\n\s*}}/g,function(m){return m.trim();})
            var n2=g.lastIndexOf('\n');
            g= g.replace(/\n/,'#');
            g=g.slice(0,n2)+ '#'+g.slice(n2+1);
        }

        g=g.trim();//replace(/^\s+|\s+$/gm,'');

        var d,t,e, j,_i,i=g.indexOf(':'),i2=g.indexOf('&&');

        //直接引入嵌套内容
        if(i==-1 && i2==-1){
            return $(g).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
        }

        else{
            j=(g.indexOf(':')>0 && g.indexOf(':') < g.indexOf('#')) ? 1:2;
            d= j==1 ? g.slice(0,i).trim():g.slice(0,i2).trim();
            _i=j==1 ? i:i2;

            var gtrim=g.slice(_i+j).trim();

            //#...#包括的模版字符串
            if(g.lastIndexOf('#')==g.length-1){
                t= gtrim.slice(1,-1);
                //t=g.slice(i+2,-1);
            }
            //嵌套模版id
            else{
                t=gtrim.indexOf('#')==0 ? $(gtrim).html() : gtrim.slice(1,-1);
            }

            //if(g.indexOf('#站内消息')>-1){console.warn(d);console.log(t)}

            //循环条件表达式
            if(j===1){
                return getVal(d)?$compile.apply(the,[t,obj[d],function(item){
                    //('super' in item)  && (console.info(item) || console.warn("don't use keyword 'super' as key"));
                    typeof item=='object' && !item['$super'] && item.extending('$super',obj);
                    return false;
                },allowHTML]):'';
            }
            //取反条件表达式
            else if(d.indexOf('!')==0){
                return getVal(d.slice(1))?'':$compile.apply(the,[t,obj,allowHTML]);
            }
            //取真条件表达式
            else{
                //if(g.indexOf('#站内消息')>-1){console.warn(d);console.log(t)}
                return getVal(d)?$compile.apply(the,[t,obj,allowHTML]):'';
            }
        }
    });
    //普通表达式{...}
    str=str.replace(/{\$?[A-z]+(\.?\w+)*}/gm,function(key){
        key=key.slice(1,-1);
        return getVal(key);
        //return the[key.replace(/{|}|(this)|\./g,'')];
    });
    //$format只接受对象
    return str;
}

//整体编译 core
function $compile(source,data,arg2,arg3) {
    //这个this是$compile.apply调用时传入的固定数据对象,如权限控制对象,模版中可用{this.editLimit}
    var the=this;
    var allowHTML;
    var helper;
    var dataType=typeOf(data);

    //空数组将产生空字符串
    if(data==null || (dataType=='array' && data.length==0)){
        return '';
    }
    //节省性能,空对像也直接返回空字符串(这里可以考虑空对象依然产生编译结果,只是任一处代入数据都为空)
    else if(typeof data=='object'){
        if(Object.keys(data).length==0){
            return '';
        }
        // var kCount=0;
        // for(var _n in data){
        //     if(data.hasOwnProperty(_n)){
        //         continue;
        //     }
        //     _n!='_stp_helper_done_' && kCount++;
        //     if(kCount){
        //         break;
        //     }
        // }
        // if(!kCount){
        //     return '';
        // }
    }
    data = dataType=='array' ? data : [data];

    if(typeof arg2=='boolean'){
        allowHTML=arg2;
    }
    //只要第二个参数不是布尔值, 就说明以标准顺序传入,不关心类型
    else{
        helper=arg2;
        allowHTML=arg3;
    }

    if(typeof source=='string' && source[0]=='#'){
        source=$(source).html();
    }
    if(!source){
        throw new Error('source undefined! please checkout the template source,id or url!');
    }

    var i=0,j=data.length,sb=[];

    for(;i<j;i++){
        typeof helper=='function' && !data[i]._xtp_helper_done_ && helper(data[i],i) && (data[i].extending({_xtp_helper_done_:true}));
        //console.info(allowHTML)
        sb.push($format.apply(the,[source,data[i],i,allowHTML]));
        //sb.push($format(source,data[i],i).replace(/\{\$rownum\}/g,i+1).replace(/\{\$index\}/g,$encode(i)).replace(/\{\$nth2\}/g,i%2==1?'nth-even':'nth-odd'));
    }

    return sb.join('');
}

//原来是用于将表格中有ID的子元素备份为文本, 改写拷贝的ID后再找回,避免拷贝后有ID冲突,后废弃,拷贝元素的id应删除或不滥用id来处理
//var backUpWrapBegin='<script type="text/backup">';
//var backUpWrapEnd='</script>';

var selectOpsTmp='<option value="{val}" selected="{selected}">{txt}</option>'
//seal4quick
var $template=(function($){
    var cache=$cache();//={};
    return function (container,data,arg2,arg3,arg4){
        var args=arguments;
        var $container=$(container);
        var tpsource='';

        if(typeof data!='string'){
            //未设置tpspource表示template存储于自身innerHTML, 需要钩子来做cache, 否则执行一次template后,保存在自身内的模板会丢失
            tpsource=$container.attr('tpsource')||'';
            var id=$container.attr('id')||'';
            var selector=$container.selector||'';
            var tpcache=$container.attr('tpcache')||$container.attr('tpcache',$.random()).attr('tpcache');  //未设tpsource,未设id,未通过选择器,那就需要随意赋值一个唯一值给tpcahce属性

            //依次尝试钩子,如果都没有,报错  改为自动加上钩子
            (!tpsource && id && byid(id+'-tp')) && (tpsource='#{0}-tp'.format(id));
            tpsource=tpsource || ( id ? ('#'+id) : selector );
            tpsource=tpsource || (tpcache ? '[tpcache={0}]'.format(tpcache) : '' );

            if(!tpsource){
                throw new Error('The template tpsource was not found! check the container selector or id or attr:tpcache');
            }
        }


        var initIt=function(){
            var children;
            var curData;
            var dataType=typeOf(data);

            //空template(),表示tpsource指向一个.htm片段页并已缓存, 并无需编译, 可直接使用
            if(args.length==1){
                return $container.html(cache[tpsource]);
            }

            //template只接受object的data, 当传入string的时候, 实际就直接将其作为innerHTML
            //原始的$compile没有这个限制,因此嵌套模版中<p>{valueOf}</p>这类不受影响
            //template(html)来代替html(html), 来实现一些template中通用的操作, 并且可以传数据对象进来, 利用template绑定
            else if(dataType=='string'){
                //此时data是已经编译好的html字符串,而编译所用的数据可以放在最后参数传进来
                $container.html(data);
                //如果多传一个额外的数据,此时数据就是那串字符串本身
                curData= args.length==5 ? args[4] : data;
            }

            else if($container.is('[x-temp]')){
                $container.inject(data);
                curData=data;
            }

            //普通情况
            else{
                curData=data;
                $container.html($compile.apply(this,[cache[tpsource],data,arg2,arg3])).removeClass('xtp-hide');
            }

            if($container.is('tbody')){
                //console.log("$container.is('tbody') 将触发table custom重绘")
               $container.parent('table').customCol('cs').fixTable('all');
            }else if($container.is('table')){
                //console.log("$container.is('table') 将触发自身 custom重绘")
                $container.customCol('cs').fixTable('all');
            }

            //这里是为了解决模版中生成的checked=true生成到元素后,checked值未生效的问题,所以之后再设置
            if($container.hasClass('has-checkbox')){
                //$container.find('[x-checked]').each(function () {
                //    this.checked=$(this).attr('x-checked');
                //});
                $container.find('[checked]').each(function () {
                    this.checked=this.checked || String($(this).attr('checked'))=='true';
                });
            }

            //编译完后, 数据绑定在容器
            $container.data('current-data',curData);


            //数组分解赋值给子项, 表格
            if($container.is('table')){
                children=$container.find('>tbody>tr');
                if(dataType=='array'){
                    curData=data;
                }
                //如果实例化这个table的数据包含了thead和tbody对应的两大对象,需用此键告知tbodyData的键名{headData:data,rowsData:data2,tbodyDataKey:'rowsData'}
                else if(data['tbodyDataKey']){
                    curData=data[data['tbodyDataKey']];
                }
            }
            //非表格
            else if(dataType=='array'){
                children=$container.children();
                curData=data;
            }

            children && curData && children.each(function (i) {
                $(this).data('current-data',curData[i]);
            });

            return $container.find('[xtp-behavior]').behavior();

        };

        if($container.is('select')){
            cache[tpsource]=selectOpsTmp;
            initIt.call(this);
        }
        else if(cache[tpsource]){
            //注意init抽取为function后,其代码中默认this指向变化,由于$(selector).template(...)会传入元素的fixData作为this,因此需要一路传进子方法,或者外层用the保存
            initIt.call(this);
        }else if(tpsource.indexOf('.htm')>0){
            $.get(tpsource,function(res){
                cache[tpsource]=res;
                initIt.call(this);
            });
        }else{
            var $sourceCt=$(tpsource).eq(0);

            //table中的条件表达式,会浏览器被当作不合规的html,提到table外面,导致模版取不到,因此,加注释
            if($sourceCt.is('table') || $sourceCt.is('tbody') || $sourceCt.is('thead')){
                cache[tpsource]=$sourceCt.html().trim().replace(/^\<\!\-\-/,'').replace(/\-\-\>$/,'');
            }
            //非指定元素类型不做replace, 比不顾情况都replace掉注释要合理,性能也更可靠(用原生nodeType更好)
            else{
                cache[tpsource]=$sourceCt.html();
            }
            initIt.call(this);
        }

        return $container;
    }
})(window.jQuery);

window.$.fn.template=function(data,arg2,arg3){
    var args=arguments;
    return this.each(function() {$template.apply($(this).data('fix-data') || window, [this].concat([].slice.call(args)));});
};
window.$.fn.fixData=window.$.fn.thisData=function(data){
    return arguments.length==0 ? this.data('fix-data') : this.each(function(){$(this).data('fix-data',data)});
};
window.$.fn.tpsource=function(tps){
    return arguments.length==0 ? this[0].getAttribute('tpsource') : this.each(function(){$(this).attr('tpsource',typeof tps=='function'?tps($(this)):tps);});
};

require('./xtp.filter');
require('./xtp.table');
require('./xtp.fixtable');
require('./xtp.customcols');

var xtp={
    $encode:$encode,
    $compile:$compile,
    $template:$template
}

//todo 是否把$getVal暴露出来, 目前是反向嫁接给string发动
String.prototype.extending('valueAt',function(obj,allowHTML,$index){
    return $getVal(this.valueOf(),obj,allowHTML,$index);
});
//window.extending(obj);
typeof module === "object" && typeof module.exports === "object"  && (module.exports=xtp);
},{"./xtp.customcols":27,"./xtp.filter":28,"./xtp.fixtable":29,"./xtp.table":31}],31:[function(require,module,exports){
/**
 * Created by yao on 2016/11/15.
 */
$.fn.table=function(config){
    var the=this;

    //已经配置过
    if(typeOf(arguments[0])=='array'){
        //var columns=arguments[0],data=arguments[1],helper=arguments[2],allowHTML=arguments[3];
        var conf=the.data('table-config');
        if(typeof conf=='object'){
            conf.data=arguments[0];
            return the.table(conf);
        }else{
            return the;
        }
    }
    //传入配置项
    else{
        var columns=config.cols,data=config.data,helper=config.helper,allowHTML=config.allowHTML!==false;
    }

    //基本可行性检测
    if(!the.length || !columns.length){
        return the;
    }

    //传入不带数据的配置项
    if(config && !config.hasOwnProperty('data')){
        return the.data('table-config',config).attr('x-table','');
    }

    //数据为空,利用template形成空内容
    if(!data||!data.length){
        //TODO 可以考虑加一项参数,是否保留上次的thead
        return the.template(data,helper,allowHTML);
    }


    var len=columns.length;
    var thstr='<th class="xtp-{0}-th-{1} {2} {3}" {4} {6} {8}>{7}{5}</th>';//'<th class="xtp-{pid}-th-{key} {hide}" sort-name={sort}>{title}</th>'
    var tdstr='<td class="xtp-{0}-td-{1} {2} {3} {6}" rowspan="{7}">{5}{{4}}</td>';//'<td class="xtp-{pid}-td-{key} {hide}">{{value}}</td>'
    if(typeof columns[0]=='string'){
        columns=columns.select('r => {title:r,map:r}');
    }

    if( columns.any('o => o.rowspan') ){
        var first;
        data.where('o => o.rowspan').each(function (item,i) {
            if(!first){
                first=item.rownum||item.rowNum||(i+1);
            }
            item.extending('$rowspanNum',first+i);
        })
    }

    //hide跟自定义列设置联动 另一方式实现 本方法废弃 new
    //var customSetting=the.data('customSetting')||new Array(columns.length);
    //if(customSetting.length!=len){
    //    throw new Error('customSetting.length!=columns.length');
    //}
    //columns.each(function(col,i){
    //    if(!col.hasOwnProperty('hide')){
    //        col.hide=customSetting[i] && customSetting[i].val==0;
    //    }
    //});

    //固定列
    if(config.fixCols){
        var leftCount=config.fixCols.left;
        var rightCount=config.fixCols.right;
        leftCount && columns.slice(0,leftCount).each('o => o.fix="left",o.custom=false');
        rightCount && columns.slice(len-rightCount).each('o => o.fix="right",o.custom=false');
    }

    //var keys=Object.keys(data[0]);
    var thtp='<tr>';
    var tdtp='<tr>';
    var str='',str2='';

    columns.each(function(col,i){
        //col.fix= col.fix ? (col.fix=='left'?'need-fix':'need-fix-end') : '';
        if(!col.hide){
            if(col.map.lower().replace('$','')=='rownum'){
                col.cls='tleft '+col.cls;
            }
            str=thstr.format(
                the[0].id||'',
                col.map.split('.')[0],
                col.fix ? (col.fix=='left'?'need-fix':'need-fix-end') : '',
                col.cls||'',
                col.sort ? 'sort-name="{0}"'.format(col.sort):'',
                col.title,
                col.custom!==false?(typeof col.custom=='string'?col.custom:'cs'):'',
                config.check && i==0 ?'<input type="checkbox" class="xtp-check-tr-all"/>':'',
                col.customInit===false?'cs-init="false"':''
            );
            str2=tdstr.format(
                the[0].id||'',
                col.map.split('.')[0],
                col.fix ? (col.fix=='left'?'need-fix':'need-fix-end') : '',
                col.cls||'',
                (col.key||col.map)+(col.filter ? '.'+col.filter:''),
                config.check && i==0 ?'<input type="checkbox" class="xtp-check-tr" tr-param="{{0}}" tr-index="{$index.toString}" tr-rownum="{{1}}" xtp-checked="{_trChecked}"/>'.format(typeof config.check=='string'?config.check:'',col.map):'',
                col.rowspan?'hideplus{rowspan}':'',
                col.rowspan?'{rowspan}':''
            );
            thtp+=str;
            tdtp+=str2;
        }
    });

    thtp+='</tr>';
    tdtp+='</tr>';
    var table;
    var html='<thead class="{0}">{1}</thead><tbody>{2}</tbody>'.format(config.fixHead!==false?'need-fix':'',thtp,$compile(tdtp,data,helper,allowHTML));
    if(the.is('table')){
        table=the.attr('x-table','').addClass('typical-tb '+ (config.cls||'')).template(html,null,null,data).data('table-config',config);
    }
    else{
        throw new Error('the element is not a table!');
        //table=the.html('<table x-table class="typical-tb {1}">{0}</table>'.format(html,config.cls||'')).children();
    }
    if(table.hasClass('has-checkbox')){
        table.find('[xtp-checked]').each(function () {
            this.checked=$(this).attr('xtp-checked');
        });
    }
    var wrap=table.closest('.query-result');//.all-fix-wrap是会被replace掉的
    wrap.length>0 || (wrap=$('body'));
    wrap.on('click','.xtp-check-tr-all',function(){
        var checked=this.checked;
        wrap.find('.xtp-check-tr').prop('checked',checked?true:false);
        wrap.find('tbody:not("td>tbale>tbody")').children().each(function(){
            $(this)[checked===false?'removeClass':'addClass']('checked');
        });
    }).on('click','.xtp-check-tr',function () {
        var i=$(this).closest('tr').index();
        wrap.checkRow(i,this.checked);
    });
    // table.find('>tbody>tr').each(function(i){
    //     $(this).data('current-data',data[i]);
    // });
    config.fixCols===false || table.fixTable('all');
    return config.custom===false?the:the.customCol('cs');

};

///* DEMO deleted
// var columnsSetting=[ '序号','姓名','性别','年龄'];
//
// var columnsData=[
//     {rownum:1, name:'ave',   sex:1, age:18},
//     {rownum:2, name:'alice', sex:0, age:24},
//     {rownum:2, name:'david', sex:1, age:24}
// ];
//
// $('body').table(columnsSetting,columnsData);
//
// */

/* DEMO2

 var columnsSetting=[
     {title:'序号', map:'rownum',hide:true,  fix:'left',  cls:'cell-xs'},
     {title:'姓名', map:'name',  hide:false, fix:false,   cls:'cell-m',  sort:'name'},
     {title:'性别', map:'sex',   hide:false, fix:false,   cls:'cell-m', sort:'sex', filter:'asCnSex'}, //分别是列中文名,排序字段名,取值键名
     {title:'年龄', map:'age',   hide:true,  fix:'right', cls:'cell-s',  key:'fakeAge' }
 ];


 var columnsData=[
     {rownum:1, name:'ave', sex:1, age:18},
     {rownum:2, name:'alice', sex:0, age:24},
     {rownum:2, name:'david', sex:1, age:24}
 ];


 $('body').attr('id','pid').table(columnsSetting,columnsData,function(item){
    item.fakeAge=item.age+100;
 });


 $filter('asCnSex',function(){
    return this==1?'男':'女';
 });

 var columns=[
 {title:'序号', map:'rownum',      hide:false,   cls:'cell-xs'},
 {title:'姓名', map:'name',        hide:false,  cls:'cell-m',   sort:'name' ,custom:true},
 {title:'性别', map:'sex.asCnSex', hide:false,  cls:'cell-m',   sort:'sex',custom:true},
 {title:'姓名2', map:'name',        hide:false,  cls:'cell-m',   sort:'name'},
 {title:'性别2', map:'sex.asCnSex', hide:true,  cls:'cell-m',   sort:'sex'},
 {title:'年龄', map:'fakeAge',     hide:false,   cls:'cell-s' }
 ];


 var data=[
    {rownum:1, name:'ave', sex:1, age:18},
    {rownum:2, name:'alice', sex:0, age:24},
    {rownum:3, name:'david', sex:1, age:24}
 ];

$('body').table({
    data:data,
    cols:columns,
    fixCols:{ left:1, right:1},
    helper:function(item){item.fakeAge=item.age+100;}
});


 columnsSetting.each('r => r.hide=0');

 var table=$('<table class="xtp-table">').appendTo($('body').html(''));

 table.table({
    columns:columnsSetting,
    data:columnsData,
    helper:function(item){ item.fakeAge= '<b>'+(item.age+5)+'岁</b>'; }
 });

setTimeout(function(){
    table.closest('.all-fix-wrap').width(340);
},300)
 */

/*new demo

 $('body').empty();$('<div class="query-result"><div class="new-color-bar"></div><table id="mytable" class="typical-tb"></table></div>').appendTo('body');
 '1'.asCnSex || $filter('asCnSex',function(){return this==1?'男':'女';});

 var columns=[
 {title:'序号',  map:'rownum',        cls:'cell-xs'},
 {title:'姓名',  map:'name',          cls:'cell-m'},
 {title:'姓名2', map:'name.toUpper',  cls:'cell-m' ,hide:1},
 {title:'性别',  map:'sex.asCnSex',   cls:'cell-m'},
 {title:'年龄',  map:'age',       cls:'cell-s'}
 ];

 var columns=[
 {title:'序号', map:'rownum',      hide:false,   cls:'cell-xs'},
 {title:'姓名', map:'name',        hide:false,  cls:'cell-m',   sort:'name',custom:true},
 {title:'性别', map:'sex.asCnSex', hide:false,  cls:'cell-m',   sort:'sex',custom:true},
 {title:'姓名2', map:'name',        hide:false,  cls:'cell-m',   sort:'name',custom:true},
 {title:'性别2', map:'sex.asCnSex', hide:1,  cls:'cell-m',   sort:'sex'},
 {title:'姓名3', map:'name',        hide:false,  cls:'cell-l',   sort:'name'},
 {title:'性别3', map:'sex.asCnSex', hide:false,  cls:'cell-l',   sort:'sex'},
 {title:'姓名4', map:'name',        hide:false,  cls:'cell-l',   sort:'name'},
 {title:'性别4', map:'sex.asCnSex', hide:false,  cls:'cell-l',   sort:'sex'},
 {title:'年龄', map:'fakeAge',     hide:false,   cls:'cell-s' ,custom:true}
 ];


 var data=[
   {rownum:1, name:'ave', sex:1, age:18},
   {rownum:2, name:'alice', sex:0, age:24},
   {rownum:3, name:'david', sex:1, age:24}
 ];
 data=data.concat(data);data=data.concat(data);data=data.concat(data);

 $('#mytable').table({
   data:data,
   cols:columns,
   fixCols:{ left:1, right:1},
   helper:function(item){item.fakeAge=item.age+100;}
 });

*/
},{}],32:[function(require,module,exports){
/**
 * Created by yao on 2016/12/12.
 * todo widget加入递归查找importing和template依赖,支持嵌套widget
 * todo behavior 支持inherit继承行为
 */
var voidFn=function(){};

var nullObj={_null_:''};//'just for make a no-empty data for template'};

var getData=function(data){
    return $.extend(data,nullObj);//注意顺序,会产生意外的同一引用
};

var templateFn=function(html,data){
    return $($compile(html,data));
};

window.extending({_widgets_:Object.create(null)});

window._widgets_=window._widgets_;

window.$widget=window.$widget||function(name,defineder) {
    window._widgets_[name]= window._widgets_[name]||defineder();
    return window.$widget;
};

window.$behavior=window.$behavior||window.$widget;


var regFnPack={
    behavior:function(bKey,$this,exImports){
        var behaviors=bKey.trim().split(' ');
        behaviors.each(function (b) {
            b=b.trim();
            var behavior=window._widgets_[b];
            if(!behavior){
                throw new Error('there is not such behavior: '+b);
            }
            exImports=exImports.concat(behavior.importing||[]);
        });

        return exImports;
    },

    widget:function(wKey,$this,exImports){
        var widget=window._widgets_[wKey];

        if(typeof widget.template=='string' && widget.template.indexOf('<')!=0 ){
            exImports.push(widget.template);
        }

        return exImports.concat(widget.importing||[]);
    },

    includeOrReplace:function(src,$this,exImports){
        exImports.push(src);

        return exImports.concat(($this.attr('importing')||'').split(','));
    },
    include:function(src,$this,exImports){return regFnPack.includeOrReplace(src,$this,exImports);},
    replace:function(src,$this,exImports){return regFnPack.includeOrReplace(src,$this,exImports);}
}

var initFnPack={

    behavior:function(bKey,$this,data,initFnArr){
        var behaviors=bKey.trim().split(' ');
        behaviors.each(function (b) {
            b=b.trim();
            var behavior=window._widgets_[b];
            if(!behavior){
                throw new Error('there has not behavior: '+b);
            }
            //exImports && exImports.push(behavior.importing||[]);

            //initFnArr.push((function(behavior,$this,data,_b){
            //    return function(){
            //        behavior.init.call($this,data);
            //    };
            //})(behavior,$this,data,b));

            initFnArr.push(function(){
                behavior.init.call($this,data);
            });
        });

        return $this;
    },

    widget:function(wKey,$this,data,initFnArr){
            var widget=window._widgets_[wKey];
            if(!widget){
                throw new Error('can not find the widget/behavior:'+ wKey);
            }

            var bKey=$this.attr('behavior');
            var id = $this[0].id;
            var cls=$this[0].className;
            var boot=widget.boot||templateFn;


            initFnArr.push(function(){

                //生成新结构
                var html=window.$cache(widget.template)||widget.template;
                var newEle= boot.apply($this[0],[html,data]).addClass(cls).prop('id', id);

                $this.replaceWith(newEle);

                widget.init.call(newEle,data);

                newEle.scanSubWidget(), newEle.behavior(bKey);
            })
            //正常初始化
            //else{
            //    initFnArr.push((function(widget,newEle,data,_wKey){
            //        return function(){
            //            //生成新结构
            //            var html=window.$cache(widget.template)||widget.template;
            //            var newEle= boot.apply($this[0],[html,data]).addClass(cls).prop('id', id);
            //            $this.replaceWith(newEle);
            //
            //            widget.init.call(newEle,data);
            //        };
            //    })(widget,newEle,data,wKey));
            //}

            //return newEle;
    },
    includeOrReplace:function(attr,src,$this,data,initFnArr){
        initFnArr.push(function(){

            var bKey=$this.attr('behavior');
            var html=window.$cache(src);
            var newEle;

            if(!html){
                throw new Error('the replace/include source is undefined in cahe');
            }

            if(attr=='replace'){
                newEle=$($compile(html,data,true));
                $this.replaceWith(newEle);
            }

            else{
                $this.html($compile(html, data, true)).removeAttr('include');
                newEle = $this;
            }

            newEle.scanSubWidget(), newEle.behavior(bKey);

        });
        //return newEle;
    },
    replace:function(replaceSrc,$this,data,initFnArr){
        return initFnPack.includeOrReplace('replace',replaceSrc,$this,data,initFnArr);
    },

    include:function(includeSrc,$this,data,initFnArr){
        return initFnPack.includeOrReplace('include',includeSrc,$this,data,initFnArr);
    }
};

/* ⚠注意!
 * behavior可以更改元素的内容结构——如加上简单的包裹层, 但不要去产生新的组件元素widget等复杂变化
 * behavior的最佳实践, 是给元素添加指定的事件,行为, 增加通用的配置属性
 * 因此,behavior完成之后,不去扫描是否有新产生的widget需要初始化
 */
var pubScanFn=function(attr,arg0,arg1){

    var key=typeof arg0=='string'? arg0 : null; //可以传一个key, 即使元素一开始没有定义behavior, 也可以按传入的key进行behavior初始化
    var cb=typeof arg0=='function' ? arg0 : arg1; //可以传一个回调, 确保在behavior异步解析之后, 可以做什么

    var dtd = $.Deferred();

    var exImports=[];
    var initFnArr=[];


    this.each(function(i,item){
        var $this=$(item);
        var data=getData($this.data());
        var wKey=key||$this.attr(attr)||$this.attr('xtp-'+attr);

        if(wKey){
            exImports=regFnPack[attr](wKey,$this,exImports);
            initFnPack[attr](wKey,$this,data,initFnArr);
        }

        $this.removeAttr(attr);
    });

    window.importing.apply(window,exImports.concat(function () {
        initFnArr.fire();
        if(typeof cb=='function'){
            cb();
        }
        else{
            dtd.resolve();
        }
    }));

    return dtd.promise();
};


//$.fn.widget => pubScanFn => regFnPack/initFnPack => scnSubWidget => $.fn.widget
//exports.reg => regFnPack => .... => exports.init => initFnPack  => scnSubWidget => $.fn.widget

['replace','include','behavior','widget'].forEach(function(attr){
    $.fn[attr]=function(){
        return pubScanFn.apply(this,[attr,arguments[0],arguments[1]]);
    };
});


//use promise for callback subReplace or subInclude
$.fn.scanSubWidget=function(cb){

    var $this=this;

    //if the newEle is not only one-wrap, it's newEles, so, need add them self back
    return $this.find('[replace]').addBack().replace()
        .done(function(){
            return $this.find('[include]').addBack().include();
        }).done(function(){
            return $this.find('[widget]').addBack().widget();
        }).done(function(){
            return $this.find('[behavior]').addBack().behavior();
        }).done(function(){
            return typeof cb=='function' && cb();
        });
};



if(typeof module === "object" && typeof module.exports === "object" ){
    module.exports={

        //收集依赖
        reg:function(ags){
            if(window.importing['_widgetRegDone']){
                    //console.log('避开reg');
                    return null;
            }else{
                var $root=this==window?$('body'):$(this);
                var exImports=[];

                // TODO 子组件嵌套需要走递归,每个组件单独生成完毕后,再重新整体查找一遍,init的时候也需要重新查找
                // 通过标记解决, 每次内部的importing依然有机会再查找新的widget
                // 注意,如果最后一次importing或之后的回调里动态加载了新的html,那么其中的widget没用办法被识别
                // 需要再手动调用一次importing();完成组件查找(这段动态载入的html应用到页面的时候)
                // 这次手动调用是没有参数的,因为尚不知道动态载入的html中有哪些imports,但是因为包含reg和init,会自动识别加入
                // 可以用importing.call(html),这样reg会只在html中查找
                // 但这样解决的是动态依次产生组件的问题,并没用解决widget中又有widget的问题,嵌套还是需要reg和init每个组件走完,递归,再走下一个
                // 如果只在初始化的第一次importing时查找,那么可以用全局的concatDone,节省以后每次尝试查找的性能开销
                // 先add本身来保存上次查找结果,避免$root改变为局部时的已查找元素结果在init前丢失
                window._widgetElements=$(window._widgetElements).add($root.find('[widget]')).add($root.find('[replace],[include]')).add($root.find('[behavior]'))//.not('[widget-reg-done]').toArray();

                //if(!window._widgetElements.not('[widget-reg-done]').length){
                //    return false;
                //}
                //console.info('进入 reg')

                window._widgetElements.each(function(i,item){

                    var $this=$(item);
                    var wKey=$this.attr('widget');
                    var bKey=$this.attr('behavior');
                    var replaceSrc=$this.attr('replace');
                    var includeSrc=$this.attr('include');

                    if($this.attr('widget-reg-done')){  return false;  }

                    //四大组件导入依赖的方式
                    if(replaceSrc || includeSrc){
                        exImports=regFnPack.includeOrReplace(replaceSrc || includeSrc, $this, exImports);
                    }

                    else if(wKey){
                        exImports=regFnPack.widget(wKey,$this,exImports);
                    }

                    if(bKey){
                        exImports=regFnPack.behavior(bKey,$this,exImports);
                    }

                    //throw new Error('these attr:include or replace, widget can not be empty');
                    $this.attr('widget-reg-done',true);
                });


                window.importing['_widgetRegDone']=true;


                //依赖全部加完,递归重启importing
                if(exImports.where(' v => v ').length){
                    //console.info('widgets add new imports, 将运行importing.apply(null,newArgs)')
                    var newArgs=exImports.concat(ags).distinct();
                    return function(){
                        window.importing.apply(null,newArgs);
                    };
                }
                else{
                    return null;
                }
            }
        },

        //依赖已经载入完毕
        init:function(){

            var initFnArr=[];
            var len=window._widgetElements.not('[widget-init-done]').length;

            if(window.importing['_widgetInitDone']||!len){
                //console.log('避开init')
                return false;
            }
            //console.info('进入 init, len:'+len)
            window._widgetElements.each(function(i,item){

                var $this=$(item);
                var newEle;
                var data=getData($this.data());
                var html;
                var wKey=$this.attr('widget');
                var bKey=$this.attr('behavior');
                var replaceSrc=$this.attr('replace');
                var includeSrc=$this.attr('include');


                if($this.attr('widget-init-done')){
                    return false;
                }



                if(wKey){
                    initFnPack.widget(wKey,$this,data,initFnArr);
                }

                else if(replaceSrc){
                    initFnPack.replace(replaceSrc,$this,data,initFnArr);
                }

                else if(includeSrc) {
                    initFnPack.include(includeSrc,$this,data,initFnArr);
                }

                //⚠ replace,include,widget任意两者不可能同时存在, 但它们都可以同时拥有behavior,  但因为replace和widget创建了newEle, 因此不能同步加上去, 需要在initFn中处理
                else if(bKey){
                    initFnPack.behavior(bKey,$this,data,initFnArr);
                }

                /*
                 *
                 * widget,replace,include都可能产生新的widget
                 *
                 * 因为在收集依赖中未做递归查找, 所以组件中包含组件时, 需要在根组件中登记其所有子依赖(todo 收集依赖有待自动递归)
                 *
                 * 否则也可以走通, 但会在主importing中产生子组件的生成的异步问题, 需要注意
                 *
                 * */


                ////扫描replace,include,widget内部的widget,behavior , 移到initFn中完成
                //newEle && initFnArr.push((function(newEle){
                //    return function(){
                //        newEle.scanSubWidget();
                //    };
                //})(newEle));


                $this.removeAttr('widget').removeAttr('behavior').removeAttr('include').removeAttr('replace').attr('widget-init-done',true);

                //window._widgetElements[i]=null;

            });


            //window._widgetElements=window._widgetElements.where('v=>v!=null');

            window.importing['_widgetInitDone']=true;

            initFnArr.fire();
        }
    }
}
},{}],33:[function(require,module,exports){
/**
 * Created by evan on 2017/1/3.
 * TODO 手动加一个匿名闭包,将自己定义的业务widgets移出base,而用importing载入
 */

var xSelectRegEve=function(){
    var $this=$(this);
    var us=$this.find('u');
    var input=$this.find('input');

    // $this.on('x-reset',function(e){
    //     us.removeClass('active');
    //     confirm()
    //     input.val('');
    //      e.stopPropagation()
    // });

    $this.on('x-default',function(e){
        us.each(function(i,u){
            if($(u).hasClass('default')){
                $(u).click();
            }
        });
    });
    $this.on('x-select',function(e,val){
        us.each(function(i,u){
            if($(u).attr('val')==val){
                $(u).click();
            }
        });
    });
};
var dateSelects={
    'empty':'不限',
    'today':'当天',
    '3days':'近三天',
    'week':'本周',
    'month':'本月',
    'season':'本季度',
    'year':'本年'
};
var dateOptionsInit = function(data){
    var $this=$(this);
    //var selected=defaults.indexOf(data.default);
    var selected = dateSelects[data.default];

    var input=$this.find('.date-range-picker');

    //已经通过widget后重走behavior解决
    //input.daterangepicker().extractor('getRangeDate');

    $this.find('.date-select').children().click(function(){
        var $the=$(this);

        $the.addClass('active').siblings('u').removeClass('active');

        var value = $the.text();
        var $input = $the.parent().siblings('.text-time').children('input');

        if(value == '不限'){
            $input.val('');
        }else if(value == '当天'){
            $input.val(DTU.today+','+DTU.today);
        }else if(value == '近三天'){
            $input.val(DTU.threeDaysBefore+','+DTU.today);
        }else if(value == '本周'){
            $input.val(DTU.weekBegin+','+DTU.weekEnd);
        }else if(value == '本月'){
            $input.val(DTU.monthBegin+','+DTU.monthEnd);
        }else if(value == '本季度'){
            $input.val(DTU.seasonBegin+','+DTU.seasonEnd);
        }else if(value == '本年'){
            $input.val(DTU.yearBegin+','+DTU.yearEnd);
        }
    });

    //if(selected==-1 && parseInt(data.default)){
    if(parseInt(data.default)){
        //selected=data.default; //TODO 应该用正则做字符串日期匹配验证
        //$this.find('input').val(selected);
        $this.find('input').val(data.default);
    }else{
        //$this.find('.date-select').children().eq(selected).click();
        $this.find('.date-select').children().each(function () {
            if($(this).text()==selected){
                $(this).click();
            }
        })
    }
    xSelectRegEve.call(this);

};

//时间选择组件
window.$widget('date-options',function(){
    return {
        template:'_temp/date-options.htm',
        importing:['daterangepicker','currentDate'],
        init:dateOptionsInit
    };
});
//时间选择组件2
window.$widget('date-options2',function(){
    return {
        template:'_temp/date-options2.htm',
        importing:['daterangepicker','currentDate'],
        init:dateOptionsInit
    };
});

//行内选择组件
window.$widget('inline-select',function(){
    return {
        template:'<div class="inline-select-wrap  x-select ">' +
                        '<span class="qc-label-m {labelcls} hideplus{label.length}">{label}：</span>' +
                        '<span class="inline-select option"></span>' +
                        '<input name="{name}" x-name="{name}" type="hidden">' +
                    '</div>',
        // importing:[],
        init:function(data){
            var $this=$(this);
            var select=$this.children('.inline-select');
            var input=$this.children('input');
            // var opsStr='<u class="{selected.asActive} {default}" val="{val}">{txt}</u>';
            var opsStr='&nbsp;<u class="{selected.asActive} {default} " val="{val}">{txt}</u>';
            var dft=data.default;
            var arr=data.ops.split(',');
            var opsData= arr.select('o => { txt:o.split(":")[0].trim(), val:o.split(":")[1].trim() }');
            if(typeof dft!='undefined'){
                var res=opsData.where('o => o.val==this',dft);
                res[0] && (res[0].selected=1) && (res[0].default='default');//default-ops
                input.val(dft);
            }
            select.html(window.$compile(opsStr,opsData));
            var us=select.children('u');
            us.on('click',function(){
                us.removeClass('active');
                $(this).addClass('active');
                input.val($(this).attr('val'));
            });

            xSelectRegEve.call(this);
        }
    };
});

//查询标题的公用逻辑
var queryTitleBoot=function(html,data){
    var $this=$(this);
    var btnLimits={};
    var btns=($this.data('btns')||'').split(',');
    btns.each(function(btn){
        btnLimits[btn+'Limit']=true;
    });
    data.title=data.title||'查询结果';
    data=$.extend(data,btnLimits);
};

var queryTitleInit=function(data){
    var $this=$(this);
    $.colorBox(data.share?null:this);
    $this.parent().fullPanel();
};

//查询区域标题组件 TODO 组件嵌套组件
window.$widget('query-title',function(){
    return {
        template:'_temp/query-title.htm',
        importing:'panelCtrls',
        boot:function(html,data){
            queryTitleBoot.apply(this,[html,data]);
            return $( $compile(html,data) );
        },
        init:function(data){
            queryTitleInit.call(this,data);
        }
    };
});

//查询区域组件
window.$widget('query-result',function(){
    return {
        template:'_temp/query-result.htm',
        importing:'panelCtrls',
        boot:function(html,data){
            queryTitleBoot.apply(this,[html,data]);
            data.id=data.id||this.getAttribute('id');
            data.cls=data.cls||this.className;
            return $( $compile(html,data) );
        },
        init:function(data){
            var $this=$(this);

            queryTitleInit.call($this.children('.query-title')[0],data);

            if(data.tablehtml){
                $this.find('.qr-tb').html( data.tablehtml.slice(0,1)=='#' ? $(data.tablehtml).html() : window.$cache(data.tablehtml) );
            }
            $this.on('up-count',function(e,count){
                $this.children('div').find('.total-count').html(count);
            });
            $this.on('x-check',function (e,i,checked) {
                var arr=[].concat(i);
                arr.each(function (k) {
                    $this.checkRow(k,checked);
                });
            });
        }
    };
});


//查询重置按钮
var queryRestInit=function(type,data){
    var $this=$(this);
    $this.click(function () {
        $this.closest('.query-block').trigger(type);
    });
};

window.$behavior('query',function(){
    return {
        init: function (data) {
            queryRestInit.call(this,'x-query',data);
        }
    };
});
window.$behavior('reset',function(){
    return {
        init:function (data) {
            queryRestInit.call(this,'x-reset',data);
        }
    };
});
//查询重置按钮
window.$widget('query-btns',function(){
    return {
        template:'_temp/query-btns.htm',
        init:function(data){
            var $this=$(this);
            queryRestInit.call($this.find('.cm-query-btn'),'x-query',data);
            queryRestInit.call($this.find('.cm-reset-btn'),'x-reset',data);
        }
    };
});
//查询区域
window.$behavior('query-block',function(){
    return {
        init:function(data){
            var $this=$(this);
            queryRestInit.call($this.find('.cm-query-btn').not('.query-widget-wrap *'),'x-query',data)
            queryRestInit.call($this.find('.cm-reset-btn').not('.query-widget-wrap *'),'x-reset',data);
        }
    };
});


//展开收缩更多查询条件
function toggleMoreCondition(data){
    var $this=$(this);
    var icon=$this.find('i.toggle-icon');

    $this.on('click', function(){
        $('.query-condition-hide').slideToggle();
        icon.toggleClass('icon-angle-down');

        var tip=icon.is('.icon-angle-down')?'展开查询条件':'折叠查询条件';
        $this.attr('title',tip ).find('span').html(tip);
    });

    if(data.default=='open'){
        $(function(){
            $this.attr('title')=='展开查询条件' && $this.click();
        });
    }
}
//收缩更多查询条件
function hideMoreCondition(data){
    var $this=$(this);
    (data.selector?$this.find(data.selector):$this).on('click', function(){
        $('.query-condition-hide').slideUp();
    });
}
//展开更多查询条件
function showMoreCondition(){
    var $this=$(this);
    $this.on('click', function(){
        $('.query-condition-hide').slideDown();
    });
}
window.$widget('more-condition',function(){
    return {
        template:'<div class="more-condition" title="展开查询条件"><span>展开查询条件</span><i class="toggle-icon icon-angle-up icon-angle-down"></i></div>',
        init:function(data){
            toggleMoreCondition.call(this,data)
        }
    };
});

window.$behavior('toggle-more-condition',function(){
    return {
        init:function(data){
            toggleMoreCondition.call(this,data)
        }
    };
});
window.$behavior('hide-more-condition',function(){
    return {
        init:function(data){
            hideMoreCondition.call(this,data)
        }
    };
});
window.$behavior('show-more-condition',function(){
    return {
        init:function(data){
            showMoreCondition.call(this,data)
        }
    };
});
//显示子元素数目
window.$behavior('info-childNodes',function(){
    return {
        init:function(data){
            var $this=$(this);
            var selector=data.selector||'*';
            var all=data.all;
            $this.click(function(){
                var nodes=$this[all?'find':'children'](selector).toArray();
                log('子元素:{0}个,  选择器:{1},  查找范围:{2}'.format(  nodes.length, selector, all?'所有子孙元素':'直接子元素'));
                console.info(nodes);
            });
        }
    };
});

//查询条件头部title切换
window.$widget('common-panel-heading', function(){
    return {
        template:'<div class="common-panel-heading">' +
                        '<ul class="clearfix">' +
                            '<li class="active">查询条件</li>' +
                            '<li>已保存条件</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="cq-condition al-save-condition"></div>',
        init:function(data){
            var $this = $(this);
            var saveCdcEle=$this.filter('.al-save-condition');
            var lis=$this.find('li');

            if(data.saved == 'hide'){ //不显示已保存条件
                $this.find('ul>li:eq(1)').hide();
            }

            lis.click(function(){
                lis.removeClass('active');
                $(this).addClass('active');

                var text = $(this).text();
                if(text == '查询条件'){
                    saveCdcEle.hide().next().show();
                }else if(text == '已保存条件'){
                    saveCdcEle.show().next().hide();
                }
            });
        }
    };
});

window.$behavior('dict',function(){
    return {
        importing:['dict'],
        init:function(data){
            var $this=$(this).addClass('dict').attr('x-dict','');
            var dictName=$this.attr('dict-name');
            var xName=$this.attr('x-name');
            if(!dictName && !xName){
                throw new Error('the dict has no dict-name or x-name');
            }
            //这两者其实都是一个东西,历史包袱,保持一致
            dictName && $this.attr('x-name',dictName);
            xName && $this.attr('dict-name',xName);
            if(data.act){
                window['$'+(data.act.split('@')[1]||'get')](window.makeAct(data.act.split('@')[0]),null,function(res){
                    $this.dict(res.data);
                })
            }else{
                $this.dict();
            }
            $this.extractor('dict');
        }
    };
});



//双选双赋值时间组件
window.$behavior('date-range',function(){
    return {
        importing:['daterangepicker'],
        init:function(data){
            var $this=$(this);
            var timePicker=data.timepicker;
            $this.addClass('cm-input date-range-picker').daterangepicker({
                timePicker:String(timePicker)=='true'
            }).extractor('rangeDate');
        }
    };
});

//勘验检查人员字典取值
window.$behavior('kyjcry-picker',function(){
    return {
        importing: ['dict'],
        init: function (data) {
            var $this = $(this).attr('x-dict','');
            $this.extractor(function(queryObj){
                var key=$this.attr('dict-name');
                var dictInputId=$this.attr('dict-id');
                var dictVal=$this.find('#'+dictInputId).val();
                var searchVal=$this.find('#query-kyjcry-input-hidden').val();
                var result=dictVal || searchVal;
                if(queryObj){
                    queryObj[key] = result;
                }else{
                    return result;
                }
            });
        }
    }
});


//x-table自动加原始包裹
window.$behavior('in-wrap',function(){
    return {
        init: function (data) {
            var $this = $(this);
            $this.wrap('<div class="{0}">'.format(data['wrapcls']||'all-fix-wrap'));
        }
    }
});



},{}]},{},[4])