//为静态页获取数据
window.path=localData.get('path');
window.restPath=localData.get('restPath');
window.token = localData.get('token');
window.uploadPath = localData.get('uploadServer');
window.LIMITS = localData.get('limits');
window.roles = localData.get('roles');
window.currentUser=localData.get('currentUser');
window.trueName = window.currentUser ? window.currentUser.trueName:'';
window.userName = window.currentUser ? window.currentUser.userName:'';
window.userUnit = window.currentUser ? window.currentUser.userUnit:'';
window.userId = window.currentUser ? window.currentUser.userId:'';
window.socketPath = localData.get('socketServer');
window.serverIp = location.hostname;
window.serverPort = location.port;
window.clientKey = localData.get('clientKey');
window.sysParams=localData.get('sysParams')||{};

importing('adminDesign.main','fullscreen','socket', 'dict','previewPro','state.js',config.isClient?'client.js':'',function(scope){

    var changePwdAct = makeAct('changePwd');
    var header=$('header').eq(0);
    // var headHeight=header.height();
    var content=byid('content')||byid('content_wrapper');
    window.mainFrame=byid('main-frame');
    mainFrame.onload=function(){
            top.$window=mainFrame.contentWindow,
            top.$document=mainFrame.contentWindow.document,
            top.$$=mainFrame.contentWindow.$
    };

    function initDictForGXS(){
        //var initDictForGXS = makeAct('dict/gxsdm');
        //$get(initDictForGXS,{userUnit:window.userUnit},function(res){
        //    window.GXSDM =res.data;
        //});
    }

    function clearDictCache(){
        //for (var i=0, len=localStorage.length; i<len; i++){
        //    var key = localStorage.key(i);
        //    if(key!=null && key.indexOf("dict")!=-1){
        //        localStorage.setItem(key,'');
        //    }
        //}
    }

    //注销
    window.logout=function logout() {
        localData.set('token','');
        localData.set('LIMITS','');
        localData.set('username','');
        localData.set('password','');
        localData.set('login-password','');
        clearDictCache();
        //方式一,路径跳转
        // location.href=window.path;
        //location.href='#';//location.protocol+'//'+location.host;
        //方式二,socket通讯
        //socket.emit('logout',userInfo.userId);
        location.href=window.config.isLocal ? location.href.replace('index','login') : location.origin+(window.path||'')+'dist/login.html?version='+config.version;//window.path + '/logout';
        //window.location.href=top.path+"/dist/login.html";
    }

    //页面初始化
    function indexInit(animate) {
        //检测浏览器
        if(!window.chrome&&!window.webkitURL){
            document.body.innerHTML='';
            toast('请使用chrome谷歌浏览器打开本系统!',9999)
        }
        //var title = sysParams.deploy_place || '全国公安机关现场勘验信息系统'; /*导航栏标题根据配置显示*/;
        //document.title=title;
        //$('#head-txt').template({head:title});
        //设置图片
        if(window.currentUser.techId) {
            $post(personInfoAction,{id:window.currentUser.techId},function(res){
                var data = res.data;
                var postZw = (data.postZw == null ? '':data.postZw+'人员');
                var length = (data.organ == null ? 0 : data.organ.length);
                var shortenedName = (data.shortenedName == null ? (length > 9 ? (data.organ.substring(0,5)+"..."+data.organ.substring(length-3)):data.organ) : data.shortenedName);
                $('#post').html(postZw).attr('title',postZw);
                $('#organ').html(shortenedName).attr('title',(data.shortenedName == null ? data.organ : data.shortenedName));
                if(data.photoStr) {
                    $('#user-avatar').attr("src", "data:image/jpg;base64," + data.photoStr);
                    $('#confirm-logout-img').attr("src", "data:image/jpg;base64," + data.photoStr);/*退出窗口添加用户头像*/
                }
            });
        }
        $('#user-avatar').previewPro('用户头像','<label>头像类型：</label><span>自定义</span><br><label>头像尺寸：</label><span>中</span>');

    }

    //窗口适配
    function fitSize(){
        var fitHeight=window.height-header.height();
        var fitWidth=window.width;
        rootTabs.css({width:fitWidth,height:fitHeight-3});
        rootTabs.find('.tabs-panels,.epanel,.epanel-body').has('iframe').css({width:fitWidth,height:fitHeight-35});//'auto'});//
        $('#main').css({width:fitWidth,height:fitHeight-35});
    }

    function runFullscreen() {
        // Fullscreen Functionality
        var screenCheck = $.fullscreen.isNativelySupported();
        // Attach handler to navbar fullscreen button
        $('.request-fullscreen').click(function() {
            // Check for fullscreen browser support
            if (screenCheck) {
                if ($.fullscreen.isFullScreen()) {
                    $.fullscreen.exit();
                } else {
                    $('html').fullscreen({
                        overflow: 'visible'
                    });
                }
            } else {
                toast('浏览器不支持全屏模式')
            }
        });
    }

    function topReg(){
        //顶层属性,元素与供内部frame调用的方法
        window.extending({
            //辅助遮罩
            showHelpMask:function (noNeedLeft){
                //var contentLeft=getRect(content).left;
                //var contentTop=122;//window.height-getRect(content).height-1.5//getRect(content).top;
                //noNeedLeft || (window.rootMenu.data('collapsed') ||window.rootMenu[0].style.display=='none'||window.rootMenu.hasClass('hideplus')) || $('body').hasClass('sb-l-m')|| $('#left-mask').css({
                //    top:60+30//contentTop
                //}).show();
                noNeedLeft || $('#left-mask').css({
                    width:$('body').hasClass('sb-l-m')?60:200,
                    top:60+30//contentTop
                }).show();
                $('#top-mask').css({
                    height:60+30//60.5+30//contentTop+1.5
                }).show();
                //window.rootMenu.find('.toggle-tag').hide();
                return true;
            },
            hideHelpMask:function(){
                $('#left-mask').hide();
                $('#top-mask').hide();
                //window.rootMenu.find('.toggle-tag').show();
                return true;
            },
            //主要元素
            rootTabs:$('#content_wrapper'),//$('#root-tabs'),
            rootNav:$('#root-nav'),
            rootMenu:$('#root-menu')
            //rootTreeMenu:$('#root-menu')//$('#tree-menu').hide(),
        });
    }

    function updateTabName(name){
        //更新当前模块名称
        rootTabs.tabs('update',{
            tab:rootTabs.tabs('getTab',0),
            options:{
                title:'::'+name//'当前模块:'+name
            }
        }).tabs('select',0);
    }

    function molReorganize(){
        //var s=new Date().getTime();
        console.info(JSON.clone(LIMITS))
        if(!LIMITS||!LIMITS.pages){
            toast('无权限访问任何页面,请重新登录！',2000,logout).warn().width(300);
        }




        //2016版遍历方式
        // TODO moduleNo后台没有传过来, 有的pageNo又不填写,前台js手动生成
        // LIMITS.pages.each(function(m){
        //     m.moduleNo=m.resourceEnName||m.resourceName;
        //     m.children && m.children.each(function(item){
        //         item.moduleNo=m.moduleNo;
        //         item.children &&m.children.each(function(sub){
        //             sub.moduleNo=m.moduleNo;
        //         })
        //     });
        // });
        //主模块的molNo与pageNo保持一致
        // var delegate='m=>{name:m.resourceName, pageNo:m.pageNo, direct:m.url, items:m.children, defaultInto:m.defaultInto,molNo:m.moduleNo}';
        // window.molDatas=LIMITS.pages.select(delegate.replace('m.pageNo','m.moduleNo'));
        // window.molDatas.each(function(m,i){
        //     m.items && (m.items= m.items.select(delegate)) && m.items.each(function(v,i){
        //         v.items && (v.items=v.items.select(delegate));
        //     });
        // });
        //window.molKeys=molDatas.select('m=>m.molNo');
        //molDatas[1].items[2]={name:'ceshi', pageNo:'m.pageNo', direct:'m.url', items:[
        //    {name:111, pageNo:'m.pageNo', direct:'m.url', defaultInto:'m.defaultInto',molNo:'m.moduleNo'},
        //    {name:222, pageNo:'m.pageNo', direct:'m.url', defaultInto:'m.defaultInto',molNo:'m.moduleNo'}
        //], defaultInto:'m.defaultInto',molNo:'m.moduleNo'}


        //2017.1新的遍历方式
        var views=[];
        window.molDatas=[];
        window.molKeys=[];

        var reorganize=function (data){
            data.each(function(m,i){
                data[i]=m={
                    name:m.resourceName,
                    pageNo:m.pageNo||m.resourceEnName,
                    direct:m.direct||m.url,
                    items:m.items||m.children,
                    defaultInto:m.defaultInto,
                    molNo:m.molNo||m.moduleNo||m.resourceEnName||m.pageNo||m.resourceName
                };

                data.isRoot && (m.pageNo=m.molNo) && window.molKeys.push(m.pageNo);

                if(m.direct){
                    var i=m.direct.lastIndexOf('/');
                    m.pageNo=m.pageNo||m.direct.slice(i+1).replace(/.html?$/i,'')
                    views.push({pageNo:m.pageNo,direct:m.direct});
                }

                m.items && reorganize(m.items);
            })
        }

        LIMITS.pages.isRoot=true;

        reorganize(LIMITS.pages);

        window.molDatas=LIMITS.pages;

        views.each(function(item){
            if(item.pageNo.indexOf('lib-')>0 ){
                item.direct=item.direct+'?bigbang={0}&id={1}'.format(top.token,top.userId);
            }
            $state.on( item.pageNo, item.direct);
        });

        //操作权限集合
        window.extending('ops',Object.create(null));
        window.LIMITS.operates.each(function(v,i){
            window.ops[v.operateNo]= v.openFlag;
        });
        //console.log(new Date().getTime()-s);
    }

    //菜单生成
    function menuInit(){
        //新的导航菜单启动方式
        $filter('iconClass',function(){
            var dic={
                '首页':'icon-home fs16',
                '地图取点':'icon-map-marker fs16',
                '新增现场':'icon-screenshot fs16',
                '现场管理':'icon-briefcase fs14',
                '资料制作':'icon-file-alt fs16',
                '模板管理':'icon-file-alt fs16',
                '管理统计':'icon-list-ul fs14',
                '检验鉴定':'icon-beaker fs14',
                '信息查询':'icon-info-sign fs14',
                '系统管理':'icon-cogs fs15'
            };
            return dic[this]||'icon-hdd fs15';
        });
        $filter('fixOffsetClass',function(){
            var dic={
                '技术管理':'fix-bug-temp-css-last2',
                '系统管理':'fix-bug-temp-css-last'
            };
            return dic[this]||'';
        });

        $state.frame=$('#main-frame');
        $state.ct=$('#main-div')

        $('#root-menu').template(molDatas).find('a[direct*=".htm"]').on('click',function(){

            var $this=$(this);

            $('#root-menu>li').removeClass('current').find('a').removeClass('menu-open2');

            var molName=$this.closest('#root-menu>li').addClass('current').attr('title')||'';
            var pageNo=$this.closest('li').attr('page-no')||'';
            var grade2Name=$this.closest('#root-menu .grade2').attr('title')||'';
            var grade3Name=$this.closest('#root-menu .grade3').attr('title')||'';

            updateTabName(molName + (grade2Name?' &gt; '+grade2Name:'')+ (grade3Name?' &gt; '+grade3Name:'') );

            $state.go(pageNo);

            //2016使用state管理前的路由方式
            // var direct=$this.attr('direct');
            // var j=direct.lastIndexOf('/');
            // if(direct.match(/.htm$/)){//(direct.slice(j+1).indexOf('spa-')==0){
            //     $(mainFrame).addClass('hide-plus');
            //     //importing(direct.replace('htm','css'));
            //     importing(direct,function(){
            //         //var pageKey=dash2camel(direct).replace(/\//g,'.');
            //         var pageKey=dash2camel(direct.replace(/\//g,'-')).replace(/.htm$/,'');
            //         $('#main-div').removeClass('hide-plus').tpsource(direct).template();
            //         var initFn=pageKey+'InitFn';
            //         typeof window[initFn]=='function' && $(window[initFn]);
            //         //importing(pageKey+'.js',function(){
            //         //    var initFn=pageKey+'InitFn';
            //         //    typeof window[initFn]=='function' && window[initFn]();
            //         //});
            //     });
            // }else{
            //     $(mainFrame).removeClass('hide-plus');
            //     $('#main-div').addClass('hide-plus').empty();
            //     mainFrame.src=getViewPath(direct);
            //     mainFrame.setAttribute('page-no',pageNo);
            // }

        })
        .on('mouseenter','body.sb-l-m .sidebar-menu > li',function(){
                var $subNav = $(this).children('.sub-nav');
                var $sTitle = $(this).find('.sidebar-title');
                var snt = $(this).children('.sub-nav').offset().top;
                var snh = $subNav.height();
                var diffVal = height-snt-snh;
                if(diffVal<0){
                    $subNav.css('top',parseInt($subNav.css('top'),10)+diffVal);
                    $sTitle.css('top',parseInt($sTitle.css('top'),10)+diffVal);
                }
            }
        )
        .find('.grade3 a').click(function(){//添加三级菜单icon thridLinks
            $('#root-menu .grade3 a').removeClass('current');
            $(this).addClass('menu-open2 current');
        }).addClass('accordion-toggle').html(function (i,old) {
            return '<span class="fa fa-dot-circle-o"></span><span class="sidebar-sub-title">{0}</span>'.format(old);
        })
        // .each(function(i,item){$(item).addClass('accordion-toggle').html('<span class="fa fa-dot-circle-o"></span><span class="sidebar-sub-title">'+$(this).html()+'</span>');})
    }

    function oldNavInit(){
        ////生成左侧功能菜单,并利用左侧菜单默认点击,自动将src载入iframe
        //rootTreeMenu.treemenu(molDatas,function(src,the){
        //    src=getViewPath(src);
        //    mainFrame.setAttribute('o-src',src);
        //    mainFrame.src=src;
        //    updateTabName($(the).closest('.grade-1').children('a').eq(0).attr('title'));
        //}).show();
        //
        //rootTreeMenu.find('.grade-1').click(function(){
        //    updateTabName($(this).children('a').eq(0).attr('title'));
        //});
        //
        //localParams.global.get('show-slide-menu')==0 && rootTreeMenu.addClass('hideplus');

        //生成导航条
        //$template(rootNav,molDatas,function(item){
        //    if(item.molNo=='sys'){
        //        item.isSys=true;
        //    }
        //});

        //注册导航选择事件
        //$('.nav a').click(function(){
        //    var $this=$(this);
        //    var navLink=$this.parents('.nav-first').children('a').eq(0);
        //    //var clicked=false;
        //    var src=$this.attr('direct');
        //    var molName=navLink.attr('mol-name');//||navLink.html();
        //    var pageNo=navLink.attr('page-no');
        //    var molTab=rootTabs.tabs('getTab',0);
        //    var molItems;
        //
        //    $('.nav a').removeClass('current');
        //    $this.addClass('current');
        //    navLink.addClass('current');
        //    mainFrame.setAttribute('currentPageNo',pageNo);
        //    window._currentItem_=$this;
        //    window.currentPageNo=pageNo;
        //    molItems=molDatas.where(/data => data.pageNo==window.currentPageNo/)[0].items;
        //
        //    //消除切换闪动
        //    $('#main').addClass('hidden');
        //    mainFrame.onload=function(){
        //        $('#main').removeClass('hidden');
        //    };
        //
        //
        //    //rootTreeMenu.hide();
        //    ////生成左侧功能菜单,并利用左侧菜单默认点击,自动将src载入iframe
        //    //if(molItems){
        //    //    rootTreeMenu.treemenu(molItems,function(src){
        //    //        //setTimeout(function(){
        //    //        src=getViewPath(src);
        //    //        //$('#content').css('padding-left',10);
        //    //        mainFrame.setAttribute('o-src',src);
        //    //        mainFrame.src=src;
        //    //        //},5);
        //    //    }).show();
        //    //
        //    //    //与导航条联动, 先看是否是导航下级菜单,寻找对应的侧边子菜单
        //    //    rootTreeMenu.find('li').each(function(){
        //    //        if(!clicked && window._currentItem_ && window._currentItem_.html()==$(this).children('a',0).html()) {
        //    //            this.click();
        //    //            clicked=true;
        //    //        }
        //    //    });
        //    //    //否则就是点击了一级模块自身
        //    //    if(!clicked){
        //    //        var defaultInto=$this.attr('default-into');
        //    //        if(defaultInto){
        //    //            rootTreeMenu.find('li').each(function(){
        //    //                var $this=$(this);
        //    //                if(!clicked){
        //    //                    if($this.attr('page-no')==defaultInto){
        //    //                        $this.click();
        //    //                        clicked=true;
        //    //                    }
        //    //                }
        //    //            });
        //    //        }
        //    //        !clicked && rootTreeMenu.find('li').eq(0).click();
        //    //    }
        //    //}
        //    ////无功能就隐藏菜单,载入src
        //    //else{
        //    //    //$('#content').css('padding-left',0);
        //    //    rootTreeMenu.empty().hide();
        //    //    mainFrame.setAttribute('o-src',getViewPath(src));
        //    //    mainFrame.src=getViewPath(src);
        //    //    //location.href.lastIndexOf('#')==location.href.length-1 ? location=location.href.slice(0,location.length-1):(location=location+'#');
        //    //}
        //    //localParams.global.get('show-slide-menu')==0 && rootTreeMenu.addClass('hideplus');
        //
        //    //更新当前模块名称
        //    rootTabs.tabs('update',{
        //        tab:molTab,
        //        options:{
        //            title:'当前模块:'+molName
        //            //content: '<iframe class="mol-content" src="{0}" frameborder="0"></iframe>'.format(src)
        //        }
        //    }).tabs('select',0);
        //
        //    setTimeout(fitSize,200);
        //    //history.pushState({}, "index", location.href+'#');
        //    //history.replaceState({}, "index", location.href);
        //    //window.onpopstate=function(){alert();window.location='sdf'}
        //    //window.addEventListener("popstate", function() {
        //    //    var currentState = history.state;
        //    //});
        //
        //});
    }

    //建立websocket连接
    function socketInit(){
        //socket监测用户登录注销
        var socket = null;
        var userInfo = {
            userId:  window.userName,
            userName: window.trueName,
            userUnit: window.userUnit,
            serverIp: window.serverIp,
            serverPort: window.serverPort
        };

        //设置用户基础信息
        localData.set('userInfo',userInfo);
        localData.set('login-truename', window.trueName);

        socket = io.connect(window.socketPath);
        socket.emit('login', userInfo);
        socket.on('logoutAll', function(){
            logout();
        });
    }

    //本地调用
    function nwExecInit(){
        if(typeof window.require=='function' && typeof require('os')=='object') {
            window.extending({
                regedit:require('os').platform().indexOf('win')==0?require('regedit'):{list:function(){return false;}},
                exec:require('child_process').exec,
                openIE: function (url) {window.exec('start,"" "iexplore" "' + url + '"');},
                openRemoteDesktop: function (ip,username,pwd) {
                    //打开远程桌面
                    var cmd = 'cmdkey /generic:'+ip+' /user:'+username+' /pass:'+pwd+' & mstsc /v:'+ip+':3389';
                    window.exec(cmd, function(error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        } else {
                            window.exec('cmdkey /delete:'+ip, function(er, out, err) {
                            });
                        }
                    });
                }
            });
        }
    }

    function clientTest(){
        /*
         //客户端测试
         $('#more-tool').click(function(){
         if(!window.regedit){return false;}
         var key = "HKCR\\hisignXmind\\shell\\open\\command\\";
         window.regedit.list(key, function(err, result) {
         var subStr = result[key]['values']['']['value'];
         var path = subStr.substring(0, subStr.indexOf("xmind.exe")).replace(/^"/,'');
         var shellPath = "\"" + path + "xmind.exe\"";
         var obj = {nodeId:"K4401141608002014070032",nodeValue:"(K4401141608002014070032)",user:"sys",userThink:"sys_1",tableName:"xcky_view",userTrueName:"sys",userUnit:"440000000000",module:"common",ypName:"最后哦顾问",systemPlace:"440000000000",systemEnv:"1"};
         var jsonObj = {};
         for (i in obj) {
         jsonObj[i] = "\"" + obj[i] + "\"";
         }
         var jsonStr = JSON.stringify(jsonObj);
         var cmd = shellPath + " " + jsonStr + "";
         window.exec(cmd, function(error, stdout, stderr) {
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
         if (error !== null) {
         console.log('exec error: ' + error);
         }
         });
         });
         });
         $('#head-txt').click(function(){
         if(!window.openIE){return false;}
         window.openIE('http://baidu.cn');

         //打开远程桌面
         if(!window.openRemoteDesktop){return false;}
         window.openRemoteDesktop('192.168.1.169','administrator','Aa123456');
         // var cmd = "cmdkey /generic:192.168.1.169 /user:administrator /pass:Aa123456 & mstsc /v:192.168.1.169:3389";
         // window.exec(cmd, function(error, stdout, stderr) {
         //     console.log('stdout: ' + stdout);
         //     console.log('stderr: ' + stderr);
         //     if (error !== null) {
         //         console.log('exec error: ' + error);
         //     } else {
         //         window.exec("cmdkey /delete:192.168.1.169", function(er, out, err) {
         //
         //         });
         //     }
         // });
         });
         */
        // $('#confirm-new-pwd').on('blur',function () {
        //     if($(this).val() !== $('#new-pwd').val()){
        //         $('#pwd-error').html('您两次输入的密码不一致');
        //     }else{
        //         $('#pwd-error').html('');
        //     }
        // });
    }

    //客户端更新
    function clientUpdateInit(){
        //客户端更新 begin
        if(config.isLocal && typeof require=='function'){
            setTimeout(function () {
                console.log('客户端检查更新开始');
                var pkg = require('./../package.json');
                var gui = require('nw.gui');
                var path = require('path');
                var updater = null;
                try{
                    updater = require('hupdater');
                }catch(e){
                    console.log('客户端检查意外中断');
                    console.log(e);
                }
                if(updater == null){
                    return;
                }
                var serverUrl = window.uploadPath; //更新服务地址
                var localVersion = pkg.version;  //本地版本号
                var targetPath =  path.dirname(process.execPath); //本地程序根目录
                var versionCheckApi = serverUrl + '/api/client/one/version';

                //开始检查版本号
                updater.checkVersion(versionCheckApi, function (err, newVersion) {
                    if(err){
                        console.log(err);
                        console.log('检查版本失败，请检查网络连接');
                        return;
                    }
                    var downloadApi = serverUrl + '/api/client/one/version/'+newVersion+'.zip';
                    //判断是否需要更新
                    //var ifUpdate = updater.ifNeedUpdate(localVersion, newVersion);
                    var ifUpdate = newVersion > localVersion;
                    if(ifUpdate){
                        console.log('发现新版本');
                        $open('#client-update-block',{width:336,top:180,title:'&nbsp客户端更新',closable:false});
                        $('#update-cancel-btn').on('click',function () {
                            $('#client-update-block').$close();
                            return;
                        });
                        $('#update-now-btn').on('click',function () {
                            $('#client-update-block').find('.btn-div').hide();
                            $('#client-update-block').find('.edit-div').html('<p>开始下载更新包...</p>');

                            //开始下载新版本包
                            var dw = updater.downloadNewVersion(downloadApi, targetPath, function(err, filePath){
                                if(err){
                                    console.log(err);
                                    console.log('下载更新包失败');
                                    return;
                                }
                                //下载完成后，开始解压缩更新包
                                $('#client-update-block').find('.edit-div').html('<p>下载完成，正在更新...</p>');
                                updater.unpackNewVersion(filePath, function(err) {
                                    if(err){
                                        $('#client-update-block').find('.edit-div').html('更新失败，请重试或联系管理员解决');
                                        return;
                                    }
                                    $('#client-update-block').find('.edit-div').html('<p>更新完成，5秒后将重启程序...</p>');
                                    updater.cleanOldVersion(filePath, function(err){});
                                    setTimeout(function () {
                                        updater.restartApp(gui.App);
                                    },5000);
                                });

                            });
                            var loaded = 0;
                            dw.on('data', function(chunk){
                                loaded += chunk.length;
                                var msg = "<p>已下载 " + Math.floor(loaded / dw['content-length'] * 100) + '%</p>';
                                $('#client-update-block').find('.edit-div').html(msg);
                            });
                        });
                    }else{
                        console.log('没有发现新版本');
                    }
                });
            }, 5000);
        }
    }

    function messageInit(){
        importing('message.js',function(){
            // setInterval(initPopMsg,1800000);//每30分钟，弹出消息提示框
            window.unReadMsgCounts();
            setInterval(function(){window.unReadMsgCounts();},180000);//每3分钟，更新一次右上角消息数量

            //打开收件箱页面
            $('#msg-count-wrap').on('click',function(){
                //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                if(typeof window.msgTab=='object' && window.msgTab.children().length>0){
                    window.msgTab.$select();
                }else{
                    window.msgTab=$open(getViewPath('message.html'),'收件箱');
                }
            });
        });
    }

    function baseOpreateInit(){
        //点击用户名 修改密码
        $('#modified-pwd').on('click',function () {
            $open('#edit-pwd-block',{width:336,top:180,title:'&nbsp系统用户修改个人密码',closable:false});
        });
        $('#close-edit-pwd').on('click',function () {
            $('#edit-pwd-block').window('close').find('input').val('');
            $('.pwd-validate').removeClass('validatebox-invalid');
        });
        $('#save-edit-pwd').on('click',function () {
            var oldPwd = $('#old-pwd').val();
            var newPwd = $('#new-pwd').val();
            $('.pwd-validate').validatebox();
            if($('.validatebox-invalid').length>0){
                return false;
            }
            if($('#confirm-new-pwd').val() != newPwd){
                toast(' 请确认两次输入的新密码是否一致！').width(300).addClass('warn');
                return false;
            }
            $post(changePwdAct,{oldPassword:oldPwd,newPassword:newPwd},function (res) {
                toast(res.msg||'新密码修改成功！',600,function () {
                    $('#edit-pwd-block').$close();
                    $('.common-input').val('');
                }).ok();
            });
        });
        // $.extendValidateRules({
        //         password: {
        //             validator: function (val) {
        //                 return /^[a-zA-Z]\w{2,20}$/.test(val);
        //             },
        //             message: '长度在3~20之间，不能包含中文'
        //         }
        // });

        //注销
        $('#login-out').on('click', function(){
            var $clogout = $('#confirm-logout');

            /*显示是否退出确认框*/
            showMask().css('background', 'rgba(43, 43, 43, 0.44)');
            $clogout.removeClass('hide');

            $clogout.on('click', '#logout-cancel', function(){ /*取消退出*/
                hideMask();
                $clogout.addClass('hide');
            }).on('click', '#logout-ok', function(){ /*确认退出*/
                logout();
            })
        });

        //个人设置
        $('#personal-settings').on('click',function () {
        	window.personEditWin=$open('_win/person-edit.htm', {width: 824, top:120,title: '个人设置'},true,function(){
                importing('multiWin.js',function(){
                    personEditFn(top.userId,'index');//这俩变量赋值传递都移动到multiWin.js中, 对外只暴露方法
                });
        	});
        });
    }

    function completeInit(){
        //完毕后头部正常显示
        $(".waiters").show();
        //启动选项卡,注册适配事件
        //rootTabs.height(window.height-header.height()-3).tabs({'scrollIncrement':320});
        //$(window).on('resize',fitSize);
        rootTabs.height(window.height-header.height()).tabs({'scrollIncrement':320});
        //默认载入首页
        mainFrame.src=getViewPath('fst-page.html');
        //scope.set('title',localData.get('title'))
    }


    //检测
    if(!window.token || !window.LIMITS ||!window.userName){
        logout();
    }else{
        byid('user-name').innerHTML=window.userName;
        initDictForGXS();
        nwExecInit();
        molReorganize();
        localParamsInit(window.molKeys);
        registryInit();
        topReg();
        menuInit();
        indexInit(localParams.get('indexAnimation')!='false');
        Core.init();
        runFullscreen();
        //socketInit()
        clientUpdateInit();
        //messageInit();
        baseOpreateInit();
        completeInit();
        config.mock && toast('当前是模拟数据模式');
        // $("#box").draggable({
        //     handle: "#pox"
        // });
    }
});
