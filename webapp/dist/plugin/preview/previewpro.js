/**
 * Created by EvanYao on 2016/9/21.*/

typeof $style === 'function' && $style(getDistPath( 'plugin/preview/previewpro.css'));

(function(){


    var html=window.$cache('plugin/preview/previewpro.htm');

    var i=0;
    var j=1;
    var l=1;

    function imgRotate(img){
        i>=3 ? i=0 : i++;
        //img.style.filter='progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (i) +')';
        img.style.transform='rotate(90deg)'.replace('90',i*90)
        //info.innerHTML= "rotation="+ i + "，旋转"+ (i*90) + "度"
    }

    function imgRotateScale (img, angle, scale) {
        i=i%4;
        if (img && img.nodeType === 1) {
            angle = parseFloat(angle) || 0;
            scale = j= Math.max(parseFloat(scale) || 1, 1);
            if (typeof(angle) === "number") {
                var rad = angle * (Math.PI / 180);
                var m11 = Math.cos(rad) * scale, m12 = -1 * Math.sin(rad) * scale, m21 = Math.sin(rad) * scale, m22 = m11;
                //img.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+ m11 +",M12="+ m12 +",M21="+ m21 +",M22="+ m22 +",SizingMethod='auto expand')";
                //Modern
                scale=1+(scale-1)/4;
                var val= "rotate("+ angle +"deg) scale("+ scale +")";
                img.style.transform = val;
                img.style['-webkit-transform']= val;
            }
        }
        //info.innerHTML= "rotation="+ i + "，旋转"+ (i*90) + "度"
    }
    function imgBrighter(img,factor){
        //contrast
        var val='brightness({0})'.format(factor);
        img.style.filter=val;
        img.style['-webkit-filter']=val;
    }
    function imgReset(img){
        var val= 'rotate(0deg)';

        img.style.transform = val;
        img.style['-webkit-transform']= val;

        img.style.filter='';
        img.style['-webkit-filter']='';

        img.style.top='auto';
        img.style.left='auto';
        img.style.right='auto';
        i=0;
        j=1;
        l=1;
        //info.innerHTML= "rotation=0，旋转0度"
    }

    function toggleNative(imgWrap) {
        $(this).toggleClass('icon-resize-small');
        if(imgWrap.find('.preview-img').attr('native')==='true'){
            imgWrap.removeClass('preview-full');
            imgWrap.find('.preview-img').removeClass('native-img').attr('native','false');
        }else{
            imgWrap.addClass('preview-full');
            imgWrap.find('.preview-img').addClass('native-img').attr('native','true');
        }

    }

    window.$.fn.previewPro=function(title,desc,orgSrcAttr,eveType,hasWrap){
        // var previewWrap=$('.preview-wrap');
        // previewWrap.length||(previewWrap=$(html).appendTo('body'));
        var previewWrap=$(html).appendTo('body');
        var previewTitleP=previewWrap.find('.preview-title-p');
        var previewDesc=previewWrap.find('.preview-desc');
        var previewImg=previewWrap.find('.preview-img');
        var nativeBtn=previewWrap.find('a.toggle-native');
        var plusBtn=previewWrap.find('a.preview-plus');
        var minusBtn=previewWrap.find('a.preview-minus');
        var replyBtn=previewWrap.find('a.icon-reply');
        var rotateBtn=previewWrap.find('a.icon-repeat');
        var lightBtn=previewWrap.find('a.light-btn');
        var darkBtn=previewWrap.find('a.dark-btn');
        var prevBtn=previewWrap.find('.preview-go-prev');
        var nextBtn=previewWrap.find('.preview-go-next');
        var closeBtn=previewWrap.find('a.icon-remove');

        // 这里eui和jui的实现几乎是一致的. 因此弃了jui的依赖,但eui draggable有bug
        // 区别在于eui会在style里加上postion:absoulte导致初始位置不符合这里需求,因此将img的postion:relative设为important
        // 另外eui的cursor定义好后就立即生效,而jui则在拖动时才显示效果
        previewImg.draggable({
            cursor:'move',
            appendTo: "body"
        });
        rotateBtn.on('click',function () {
            imgRotateScale(previewImg[0],++i*90,j);
        });
        plusBtn.on('click',function () {
            imgRotateScale(previewImg[0],i*90,++j);
        });
        minusBtn.on('click',function () {
            imgRotateScale(previewImg[0],i*90,--j);
        });
        lightBtn.on('click',function () {
            imgBrighter(previewImg[0],l+=0.3);
        });
        darkBtn.on('click',function () {
            imgBrighter(previewImg[0],(l-0.3>0.3)?l-=0.3:l);
        });
        replyBtn.on('click',function () {
            imgReset(previewImg[0]);
        });
        nativeBtn.on('click',function () {
            toggleNative.call(this,previewWrap);
        });
        this.each(function(){
            var $this=$(this);
            if($this.attr('preview-reged')){
                return false;
            }
            $this.attr('preview-reged',true).on(eveType||'click',function(){
                var $this=$(this);
                var i=$this.index();
                var prev=$(this.parentNode).prev().children('img')[0];
                var next=$(this.parentNode).next().children('img')[0];
                //console.log(prev),console.info(next);
                var keyHandle;
                var canceler=function(){
                    window.hideMask();
                    $('body').off('keyup',keyHandle);
                    previewWrap.fadeOut(150);//.find('a').off('click');
                    previewImg[0].style='';
                    previewImg[0].className='preview-img';
                    previewImg[0].src='data:image/gif;base64,R0lGODlhAwADAIABAL6+vv///yH5BAEAAAEALAAAAAADAAMAAAIDjA9WADs=';
                    previewWrap.removeClass('preview-full');
                    nativeBtn.removeClass('icon-resize-small');
                    previewWrap.find('.preview-img').removeClass('native-img').attr('native','false');
                };

                var goPrev=function(){
                    previewImg.attr('src',prev.getAttribute(orgSrcAttr||'src'));//可以把大图地址记录在自定义属性上
                    if(prev){
                        next=$(prev.parentNode).next().children('img')[0];
                        prev=$(prev.parentNode).prev().children('img')[0];
                    }
                };

                var goNext=function () {
                    previewImg.attr('src',next.getAttribute(orgSrcAttr||'src'));
                    if(next) {
                        prev=$(next.parentNode).prev().children('img')[0];
                        next=$(next.parentNode).next().children('img')[0];
                    }
                }

                //初始化
                window.showMask();
                i=0;
                j=1;
                l=1;
                previewTitleP.html(title);
                previewDesc.html(desc);

                //调整图片大小
                previewImg.attr('src',this.getAttribute(orgSrcAttr||'src')).on('load',function(){
                    var ratio=this.naturalHeight/this.naturalWidth;
                    (this.naturalWidth<window.width*0.5 ||  this.naturalHeight> window.height*0.5 )&& previewWrap.addClass('preview-s');
                    if(this.naturalWidth>this.naturalHeight && window.height/window.width>ratio ){
                        $(this).css({width:'100%',height:'auto'});
                    }else{
                        $(this).css({width:'auto',height:'100%'});
                    }
                });

                //监听键盘事件
                $('body').on('keyup',(keyHandle=function(event){
                    if(event.keyCode==37 && prev){

                    } else if(event.keyCode==39 && next){
                        goNext();
                    } else if(event.keyCode==13 || event.keyCode==27){
                        canceler();
                    }
                }));


                prevBtn.click(function(){
                    goPrev();
                });
                nextBtn.click(function(){
                    goNext();
                });

                //显示并注册关闭事件
                previewWrap.show().css({display:'flex'}).on('click','.close-btn',canceler);
            });
        });

        return this;
    };


})();
