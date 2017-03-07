
//设置web页面地址 已经在login.html中设置
//var path ="http://localhost:8080/xcky3";
//配置rest接口地址 TODO 请使用 makeAct('sys/sysDict/single') 来代替 restPath+'/sys/sysDict/single/'
//var restPath ="http://localhost:8022/xcky3";

// config.mock=1;
//引入依赖项, 完毕后启动页面, 所有变量在importing后的回调函数中定义
importing('base.css','login.css','bowser','tooltips','slick',function(){
    var loginAction = makeAct('login');
    var defaultTitle= '全国公安机关现场勘验信息系统';

    function checkBrowser() {
        var show=false;
        var domLoginForm = $('#login-container');
        var domBrowserHint = $('#browser-download');

        if(config.isLocal && window.chrome){
            show=true;
        }else{
            var i=window.navigator.appVersion.indexOf('Chrome');
            var ver=parseInt(window.navigator.appVersion.substr(i+7,2));
            if(window.chrome || ver<=43 ){
                show=true;
            }
        }
        if(show){
            domLoginForm.show();
        }else {
            domBrowserHint.show();
            window.getUploadPath(initPageAction,replaceLink);
        }
    }

    function initPageTitle(){
        //$get(sysParamAction,null,function (res){
        //var title= res.data.deploy_place || defaultTitle;
        var title=defaultTitle;
        $('#header .title').template({title:title});
        document.title =title;/*导航栏标题根据配置显示*/
        //localData.set('sysParam',res.data);
        //})
    }

    function makeThemes() {
        var docH = 600;
        var domMainContent = $('#login_content');
        var slickColorAry = ['#1f837b','#045daf'];//'#038aca', '#187cc8',

        if(window.height > docH) {
            $('body').css('padding-top', (window.height-docH)/2.5+'px');
        }

        $('.slick-container .slider').slick({
            autoplay: true,
            autoplaySpeed: 1500,
            speed: 200,
            arrows: false,
            //dots: true,
            dotsClass: 'slick-pagination',
            onBeforeChange: function(the,index) {
               domMainContent.css('background-color', slickColorAry[index]);
           }
        });

        $('.fa').tooltipster({theme: 'tooltipster-borderless'});

        $('body').css('visibility','visible');

    }

    function login(cb) {
        var checker=function(id,msg){
            if($(id).val().trim()==''){
                $('#error').fadeIn().find('span').text(msg);
                setTimeout(function () {
                    $('#error').fadeOut();
                },2400);
                return false;
            }
            return true;
        };

        if(!checker('#username','用户名不能为空！') || !checker('#password','密码不能为空！')){
            return false;
        }
        $post(loginAction ,{userName:byid('username').value,password:byid('password').value},function(res){
            // log(obj2str(res.data));
            // return false;
            // $post只处理flag==1成功的情况
            if(res.flag==1){
                localData.set('username',$('#username').val());
                localData.set('password',$('#password').val());
                localData.set('localDataDate',new Date().getTime());
                localData.set('token',res.data.token);
                localData.set('limits',res.data.limits);
                localData.set('path',window.path);
                localData.set('currentUser',res.data.currentUser);
                localData.set('roles',res.data.roles);
                localData.set('sysParams',res.data.sysParams);

                typeof cb=='function' && cb();

                if(config.isLocal){
                    window.resizeTo(window.screen.width, window.screen.height);
                    location.replace('index.html?version='+config.version);
                }else{
                    //远程tomcat web站点
                    location.replace(window.path+ 'dist/index.html?version='+config.version);
                }
            }
            /* // $post只处理flag==1成功的情况, 错误情况统一封装转到toast(res.msg)提示
            else{
                $('#error').fadeIn().find('span').text(res.msg);
                setTimeout(function () {
                    $('#error').fadeOut();
                },5000);
            }
            */
        });
    }

    function regEvents(){
        $('.btn-login').on('click',function () {
            login();
        });
        $('#error').on('click',function () {
            $('#error').fadeOut();
        });
        $(document).on('keyup',function (event) {
            var e =  event || window.event;
            if(e.keyCode === 13){
                login();
            }
        });
    }

    function checkLocal() {
        var userIpt= $('#username');
        var pswdIpt=$('#password');

        //检测token和缓存时间
        if(localData.get('token')){
            userIpt.val(localData.get('username'));
            pswdIpt.val(localData.get('password'));
            userIpt.val() && pswdIpt.val() && login();
        }
    }
    
    function detectWinSize() {
        window.width<1280 && $alert('为了有最佳的浏览效果，请您使用分辨率高于 1280*800 的显示器访问本系统！').width(330);
    }

    function init(){
        checkBrowser();

        makeThemes();

        checkLocal();

        regEvents();

        initPageTitle();

        detectWinSize();
    }

    init();

});