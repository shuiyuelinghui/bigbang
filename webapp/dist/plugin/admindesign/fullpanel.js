/**
 * Created by evans on 16/12/27.
 */
$.fn.fullPanel=function(ctrlSelector){
    var the=this;
    var wrap=top.$('#main-wrap');
    var topBody=top.$('body');
    ctrlSelector=ctrlSelector||'>div .full-ctrl-btn';
    the.find(ctrlSelector).click(function(){
        if(the.hasClass('full-panel')){
            topBody.removeClass('full-mode-ovh');
            wrap.addClass('hidden');
            wrap.removeClass('full-wrap');
            setTimeout(function(){the.removeClass('full-panel')},10);
            setTimeout(function(){wrap.removeClass('hidden')},260);
        }else{

            topBody.addClass('full-mode-ovh');
            wrap.addClass('full-wrap hidden');
            setTimeout(function(){the.addClass('full-panel')},10);
            setTimeout(function(){wrap.removeClass('hidden')},260);
        }
    });
};