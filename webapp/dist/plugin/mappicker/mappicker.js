/**
 * Created by EvanYao on 2016/9/10.
 */

    window.$.fn.mappicker=function(cb){
        return this.on('map-pick-done',function(e,markCoordinate,markEve){
            markCoordinate=markCoordinate||{};
            //var win=$(this).data('mappicker-win');
            //win && win.$close();
            if(typeof cb=='function') {
                cb(markCoordinate, markEve);
            }else{
                this.value=markCoordinate.lng + "," + markCoordinate.lat;
            }
        }).on('click',function(){
            var win=$open(getDistPath('plugin/mappicker/mappicker.html'),{width:top.width-100,height:top.height-80,title:'地图取点'});
            win.children('iframe').data('map-pick-target',$(this));
            //$(this).data('mappicker-win',win);
            //win.children('iframe').contentWindow['mappicker-target']=this;
        });
    };



