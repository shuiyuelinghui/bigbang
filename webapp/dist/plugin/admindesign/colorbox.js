/**
 * Created by evans on 16/12/25.
 */
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