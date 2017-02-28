/**
 * Created by admin on 2016/11/18.
 */

/**
 * 保存查询条件 保存到后台
 * @param first true：进入页面后执行  需要注册点击事件
 * @param cqId //查询区域的选择器
 * @param saveId //已保存条件区域的选择器
 * @param queryType //查询条件类型(CXTJLXDM)
 * @param cb //已保存条件 点击查询的方法 first=true时传入
 * 保存查询条件时 查询区域注意事项：
 * 1.
 */
function saveCondition(first, cqId, saveId, queryType, cb){
    var queryAct = makeAct('sceneCollecting/queryHistory/query', ''),
        saveAct = makeAct('sceneCollecting/queryHistory/add', ''),
        delAct = makeAct('sceneCollecting/queryHistory/del','');

    var chooseHtml = '<div class="cm-selected-condition">' +
                        '<label class="mb0">已选条件：</label>' +
                        '<ul class="active-search-list clearfix"></ul>' +
                        '<p class="btn-save hide-plus{0}">'.format(saveId) +
                            '<i class="icon-save"></i>' +
                            '<a href="javascript:void(0)">保存该条件</a>' +
                        '</p>' +
                      '</div>';

    var saveHtml = '<div>' +
                        '<p>' +
                            '<i class="icon-remove del" title="删除已保存条件"></i>' +
                            '<i class="icon-search search" title="使用已保存条件查询"></i>' +
                            '<em>{0}</em>.' +
                        '</p>' +
                        '<ul class="clearfix"></ul>' +
                    '</div>';

    var saveLi = '<li class="fl"><u>{title}</u><span>{content}</span></li>';

    var $queryReset = $(cqId).find('.query-reset');

    $('.cm-selected-condition').length && $('.cm-selected-condition').remove();
    //没有查询重置按钮的页面加在cqId后 by XiongYing
    $queryReset.length ? $queryReset.before(chooseHtml) : $(cqId).append(chooseHtml);

    initChooseCondition();
    function initChooseCondition(){
        //遍历查询区域中的option 初始化已选条件
        $(cqId).find('.option').each(function(i, item){
            //查询条件的名称
            var title = $(item).prev().html();
            var name = $(item).data('name');
            // var queryId = $(item).hasClass('dict') ? $(item).attr('dict-id') : $(item).attr('id');
            var queryId = $(item).hasClass('dict') ? $(item).attr('dict-id') : $(item).closest('.x-select').attr('id');
            //默认查询条件的u标签
            var $initU = $(item).hasClass('dict') ? $(item).children('input:checked') : $(item).children('.active');
            //获取u标签的文字
            var content = $(item).hasClass('dict') ? $initU.next('label').text() : $initU.text();
            //获取u标签的val值
            var value = $(item).hasClass('dict') ? ($initU.val() || '') : ($initU.attr('val') || '');
            if(!content.isEmpty() && content != '不限' && content!=''){
                $('.cm-selected-condition')
                    .children('.active-search-list')
                    .append('<li index="'+i+'" paramid="{0}">'.format(queryId) +
                        '<u class="hider">{0}</u>'.format(title) +
                        '<span val="{0}">{1}</span>'.format(value, content) +
                        '<em></em>' +
                        '</li>'
                    );
            }else{
                $('.cm-selected-condition')
                    .children('.active-search-list')
                    .append('<li index="'+i+'" paramid="{0}" class="hider">'.format(queryId) +
                        '<u class="hider">{0}</u>'.format(title) +
                        '<span></span>' +
                        '<em></em>' +
                        '</li>'
                    );
            }
        });

        //走后台，根据用户查询当前模块的以保存条件，并且存放在以保存条件区域
        if(first){ //初始化进入模块，需要走后台 之后同一个页面切换tabs 不需要再重新走后台查询
            $post(queryAct, {queryType:queryType}, function(res){
                var tdata = res.data;//已保存的所有查询条件
                tdata.each(function(item, i){
                    appendToSaveCon(i+1 , item);
                });
            }, false, false);
        }
    }
    //向已保存查询条件的div中添加内容 order：顺序 queryContent：查询内容 id：改保存条件对应的id
    function appendToSaveCon(order, obj){
        // log(obj)
        var $saveDiv = $(saveHtml.format(order));
        var queryContent = str2obj(obj.queryContent);
        // $saveDiv.find('.search').data('queryCon', queryContent.queryStr);
        $saveDiv.find('.search').data('queryCon', queryContent);
        $saveDiv.find('.del').attr('delId', obj.id);
        queryContent.config.each(function(o){
            $saveDiv.children('ul').append($compile(saveLi, o));
        });
        $(saveId).append($saveDiv);
    }

    //查询区域的点击事件
    if(first){
        //字典选择修改已选条件
        $('body').on('x-change', function(e,selector,key, value){
            var _index = $(selector).index(cqId+' .option'); //获取索引值
            var $li = $(cqId+' .cm-selected-condition').find('li'); //获取已选条件中所有的li
            if(value == '不限' || value == ''){
                $li.eq(_index).hide().children('span').removeAttr('val').text('');
            }else{
                $li.eq(_index).show().children('span').attr('val', key).text(value);
            }
        });
        //查询区域点击事件
        $(cqId).off('click').on('click', 'u', function(){
            var $this = $(this);
            /*if(!$this.hasClass('query-block-active')){
                return false;
            }*/
            //修改已选查询条件
            var _index = $this.closest('.option').index(cqId+' .option'); //获取索引值
            var $li = $(cqId+' .cm-selected-condition .active-search-list').find('li'); //获取已选条件中所有的li
            var u_text = $this.html().replace(/<.*?\/.*?>/g,'').trim();
            if(u_text == '不限'){
                $li.eq(_index).hide().children('span').removeAttr('val').text('');
            }else{
                $li.eq(_index).show().children('span').attr('val', $this.attr('val')).text(u_text);
            }
        }).on('click', '.btn-save', function(){
            var queryStr = {}, config = [], t_config = {};
            //遍历查询条件 获取当前的所有查询条件 进行保存
            var $con = $(cqId).find('[x-name]');
            $con.each(function(i, item){
                var $item = $(item);
                var $itemActive = $item.find('.active');
                var itemContent = $itemActive.length ? $itemActive.html().replace(/<.*?\/.*?>/g,'').trim() : '';
                var itemVal = $item.val();
                t_config = {};
                if(item.tagName == 'INPUT' && !itemVal.isEmpty()){
                    if($item.hasClass('date-range-picker')){
                        //时间特殊处理
                        queryStr[$item.attr('x-bname')] = itemVal ? itemVal.split(',')[0] : '';
                        queryStr[$item.attr('x-ename')] = itemVal ? itemVal.split(',')[1] : '';

                        t_config.title = $item.parent().parent().children('span:eq(0)').text();
                        t_config.content = itemVal;
                    }else if($item.parent().hasClass('x-select')){
                        //inline-select
                        queryStr[$item.attr('x-name')] = $item.val() || '';

                        t_config.title = $item.parent().children('span:eq(0)').text();
                        t_config.content = $item.prev().children('.active').text();
                    }else{
                        //input 输入框
                        queryStr[$item.attr('x-name')] = itemVal;

                        t_config.title = $item.prev().text();
                        t_config.content = itemVal;
                    }
                }else if(item.tagName == 'SPAN' && $itemActive.text()!='不限'){
                    queryStr[$item.attr('x-name')] = $itemActive.attr('val') || itemContent;

                    t_config.title = $item.prev().text();
                    t_config.content = itemContent;
                    $itemActive.data('child-options') && (t_config.childOptions = $itemActive.data('child-options'));
                }else if(item.tagName == 'DIV' && $item.hasClass('dict')){

                    var $input = $('#'+$item.attr('dict-id')); //获取字典的隐藏域input
                    if(!$input.attr('data-chval').isEmpty() && $input.attr('data-chval')!='不限'){
                        queryStr[$item.attr('x-name')] = $input.val();

                        t_config.title = $item.prev().text();
                        t_config.content = $input.attr('data-chval');
                    }
                }
                config.push(t_config);
            });
            if(obj2str(queryStr) == '{}'){
                toast(' 请选择需要保存的查询条件').warn();
                return false;
            }
            //走后台，进行保存
            $post(saveAct, {queryType:queryType,queryContent:obj2str({queryStr:queryStr,config:config})}, function(res){
                toast('保存成功！').ok();
                //保存成功后，在以保存条件存放条件
                appendToSaveCon($(saveId).children('div').length+1, res.data);
            }, true, false);
        }).on('click', '.cm-selected-condition .active-search-list em', function(){
            //已选条件中的删除操作
            var $li = $(this).closest('li');
            var $queryId = $('#'+$li.attr('paramid'));
            $li.hide();
            $li.children('span').removeAttr('val').text('');

            $queryId.find('u').removeClass('active')
                .end().find('.default').addClass('active');
            if($queryId.parent().hasClass('dict')){
                var $first = $queryId.parent().children('input:first');
                $first.prop('checked', true);
                $queryId.val($first.val()).attr('data-chval',$first.next('label').text());
            }
            //删除时间已选条件时 需要同时清空时间输入框的值
            else if($queryId.children('.date-select').length > 0){
                $queryId.children('.text-time').children('input').val('');
            }
            else{
                $queryId.children('[x-name]').val('');
            }
        }).on('click', '.cm-reset-btn', function(){

        });
        //以保存查询条件区域的点击事件
        $(saveId).on('click', '.del', function(){
            //删除已保存查询条件
            var $this = $(this);
            var delId = $this.attr('delId');
            $post(delAct,delId, function(){
                toast('删除成功').ok();
                $this.closest('div').remove();
                //更新保存条件的序号
                var $divs = $(saveId).children('div');
                $divs.each(function(i, item){
                    $(item).find('em').text(i+1);
                });
            }, false, false);
        }).on('click', '.search', function(){
            //用以保存查询条件 进行查询
            // alert(1);
            console.log( ['queryCon',$(this).data('queryCon')]);
            cb && cb($(this).data('queryCon'));
        });
    }
}