/**
 * Created by evans on 16/12/27.
 */
/**
 * Created by evans on 16/12/27.
 */
$.fn.fullPanel=function(ctrlSelector){
    var the=this;
    var wrap=top.$('#main-wrap');
    var topBody=top.$('body');
    ctrlSelector=ctrlSelector||'>div .full-ctrl-btn';
    var ctrl=the.find(ctrlSelector);
    ctrl.click(function(){
        if(the.hasClass('full-panel')){
            // wrap.addClass('hidden');
            // $('body').removeClass('full-mode-ovh');
            // topBody.removeClass('full-mode-ovh');
            // wrap.removeClass('full-wrap');
            // setTimeout(function(){the.removeClass('full-panel')},10);
            // setTimeout(function(){wrap.removeClass('hidden')},280);

            the.siblings().add(the.parent().siblings()).addClass('hidden');

            topBody.animate({opacity:0},10,function () {
                //避免引发重绘
                window._cancelGlobalReFixTbTime=new Date().getTime();
                $('body').removeClass('full-mode-ovh');
                topBody.removeClass('full-mode-ovh');
                wrap.removeClass('full-panel-wrap');
                //引发重绘
                window._cancelGlobalReFixTbTime=new Date().getTime()-500;
                the.removeClass('full-panel');
                setTimeout(function(){
                    topBody.animate({opacity:1},60);
                    the.siblings().add(the.parent().siblings()).removeClass('hidden');
                },200);
            });

            ctrl[0] && (ctrl[0].title='最大化显示') && ctrl.removeClass('icon-resize-small').addClass('icon-resize-full');;
        }else{
            // wrap.addClass('full-wrap hidden');
            // topBody.addClass('full-mode-ovh');
            // $('body').addClass('full-mode-ovh');
            // setTimeout(function(){the.addClass('full-panel')},10);
            // setTimeout(function(){wrap.removeClass('hidden')},280);

            the.siblings().add(the.parent().siblings()).addClass('hidden');

            topBody.animate({opacity:0},10,function () {
                //避免引发重绘
                window._cancelGlobalReFixTbTime=new Date().getTime();
                $('body').addClass('full-mode-ovh');
                topBody.addClass('full-mode-ovh');
                wrap.addClass('full-panel-wrap');
                the.addClass('full-panel');
                //引发重绘
                window._cancelGlobalReFixTbTime=new Date().getTime()-500;
                setTimeout(function(){
                    topBody.animate({opacity:1},60);
                },260);
            });


            ctrl[0] && (ctrl[0].title='还原') && ctrl.removeClass('icon-resize-full').addClass('icon-resize-small');
        }
    });
    return this;
};

$.colorBox= function (ele) {
    //var colorCtrl=$('.panel-control-color');
    var colorCtrl=$(ele||document.body).find('.panel-control-color');

    colorCtrl.click(function(){

        var $this=$(this);
        var panelHeading=$this.closest('div');
        var panel=panelHeading.parent();

        if(panel.children('.panel-colorbox:visible').length){
            panel.children('.panel-colorbox').hide();
            return false;
        }

        if (!panel.children('.panel-colorbox').length) {
            var colorBox = '<div class="panel-colorbox"> <span class="bg-white" data-panel-color="panel-default"></span> <span class="bg-primary" data-panel-color="panel-primary"></span> <span class="bg-info" data-panel-color="panel-info"></span><span class="bg-okay" data-panel-color="panel-okay"></span> <span class="bg-success" data-panel-color="panel-success"></span> <span class="bg-warning" data-panel-color="panel-warning"><span class="bg-msg" data-panel-color="panel-msg"></span></span> <span class="bg-danger" data-panel-color="panel-danger"></span> <span class="bg-alert" data-panel-color="panel-alert"></span> <span class="bg-system" data-panel-color="panel-system"></span> <span class="bg-dark" data-panel-color="panel-dark"></span> </div>'
            panelHeading.after(colorBox);
        }

        var panelColorBox = panel.children('.panel-colorbox').show();

        panelColorBox.on('click', '> span', function(e) {
            var dataColor = $(this).data('panel-color');
            var altColors = 'panel-primary panel-info panel-success panel-warning panel-danger panel-alert panel-system panel-dark panel-default panel-white panel-okay panel-msg';
            panel.removeClass(altColors).addClass(dataColor).data('panel-color', dataColor);
            panelColorBox.hide();
            //methods.updateSettings(options);
        });
    });
};