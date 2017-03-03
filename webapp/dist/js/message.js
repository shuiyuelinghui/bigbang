
/* 注：引入message.js的页面需要importing dict.js */

    importing('message.css');
    //右下角新消息提示
    // function popMsg() {
        var msgAction=makeAct('message/list'),
            setReadAction = makeAct('system/message/setRead',0);
        var msgTitleHtml = '<i class="icon-envelope-alt"></i> 新消息提醒 (<span class="msg-total-count">{totalCount}</span>)';
        var strHtml = '<p class="msg-title ellipsis" title="{subject}">{subject}</p><p class="msg-content">{contentTxt}</p><p class="msg-more"><a paramMsgId="{id}" paramTslb="{tslb}" paramAttId="{attId}" target="_blank">处理 »</a></p><nav class="msg-circle"><a class="prev arrow"><i class="icon-angle-left"></i></a><a class="next arrow"><i class="icon-angle-right"></i></a></nav>';
        var msgData;
        // var arryMsg = [];//未读消息列表
        // var next = 0, prev = 0, number = 0;
        top.registry.global.arryMsg = [];
        top.registry.global.msgNext = 0, top.registry.global.msgPrev = 0, top.registry.global.msgNumber = 0;

        //弹出消息初始化function
        function initPopMsg() {
            //用$post会自带遮罩效果，消息提示不需要遮罩效果，故用原始的$.ajax()
            $post(msgAction, {msgState: '1',noTslb:[/*'1300', '1400'*/]}, function (res) {
                if ( res.data.length>0) {
                    msgData = res;
                    // arryMsg = res.data;
                    // number = arryMsg.length;
                    // next = 0, prev = 0;
                    top.registry.global.arryMsg = res.data;
                    top.registry.global.msgNumber = res.data.length;
                    top.registry.global.msgNext = 0, top.registry.global.msgPrev = 0;
                    $msg({
                        timeout:99999,
                        title:$compile(msgTitleHtml,msgData),
                        msg:$compile(strHtml, top.registry.global.arryMsg[0], function (item, i) {
                            var t_length = item.content.length;
                            item.contentTxt = (t_length > 110) ? (item.content.substring(0,110) + '...') : item.content;
                        })
                    });
                    // popMsgPrevOrNext(prev, next, number);
                    popMsgPrevOrNext(top.registry.global.msgPrev, top.registry.global.msgNext, top.registry.global.msgNumber);
                }
            },false,false);
        }

        //使用$compile 将消息内容存放在模板中
        function popMsgContent(obj) {
            $(obj).html($compile(strHtml, top.registry.global.arryMsg[top.registry.global.msgNext + top.registry.global.msgPrev], function (item, i) {
                var t_length = item.content.length;
                item.contentTxt = (t_length > 110) ? (item.content.substring(0, 110) + '...') : item.content;
            }));
            // popMsgPrevOrNext(prev, next, number);
            popMsgPrevOrNext(top.registry.global.msgPrev, top.registry.global.msgNext, top.registry.global.msgNumber);
        }

        //进入模块处理消息后更新右下角消息内容
        function upModuleMsgContent(obj){
            if(obj.length > 0) {  //当右下角有消息提示框，即obj.length > 0 时需要更新消息
                $post(msgAction, {msgState: '1', noTslb: ['1300', '1400']}, function (res) {
                    if (res.data.length > 0) {
                        msgData = res;
                        // arryMsg = res.data;
                        // number = arryMsg.length;
                        // next = 0, prev = 0;
                        top.registry.global.arryMsg = res.data;
                        top.registry.global.msgNumber = res.data.length;
                        top.registry.global.msgNext = 0, top.registry.global.msgPrev = 0;
                        $(obj).html($compile(strHtml, top.registry.global.arryMsg[0], function (item, i) {
                            var t_length = item.content.length;
                            item.contentTxt = (t_length > 110) ? (item.content.substring(0, 110) + '...') : item.content;
                        }));

                        //消息上一条or下一条按钮 样式调整
                        var t_prev = $(obj).children('.msg-circle').children('.prev');
                        var t_next = $(obj).children('.msg-circle').children('.next');
                        if (top.registry.global.msgNumber == 0) {
                            $(t_prev).addClass('hidePlus');
                            $(t_next).addClass('hidePlus');
                        } else {
                            if ((top.registry.global.msgNext + top.registry.global.msgPrev) == 0) {
                                $(t_prev).addClass('hidePlus');
                            } else if ((top.registry.global.msgNext + top.registry.global.msgPrev) == (top.registry.global.msgNumber - 1)) {
                                $(t_next).addClass('hidePlus');
                            }
                        }
                        //右下角消息总数修改
                        $(top.document.getElementsByClassName('msg-total-count')).html(top.registry.global.msgNumber);
                    }
                }, false, false);

                $post(msgAction, {msgState: '1'}, function (res) {
                    var t_num = parseInt(res.totalCount);
                    var msgCountObj = top.document.getElementById('msg-count');
                    if (t_num > 0) {
                        $(msgCountObj).show().html(t_num);
                        msgCountObj.style.display = 'none';
                        setTimeout(function () {
                            msgCountObj.style.display = 'inline';
                        }, 10)
                    } else {
                        $(msgCountObj).hide();
                    }
                }, false, false);
            }
        }

        //隐藏上一条or下一条按钮
        function popMsgPrevOrNext(t_prev,t_next,t_number){
            if(t_number == 1){
                $('.messager-body .prev').addClass('hidePlus');
                $('.messager-body .next').addClass('hidePlus');
            }else {
                if ((t_next + t_prev) == 0) {
                    $('.messager-body .prev').addClass('hidePlus');
                }else if ((t_next + t_prev) == (top.registry.global.msgNumber - 1)) {
                    $('.messager-body .next').addClass('hidePlus');
                }
            }
        }

        //查看弹出消息 设为已读 @type 消息类型（反馈、关注等）sys_message的tslb   @id sys_message的att_id
        function popMsgView(msg_id, tslb, attid) {
            /*$get(top.path+'/api/0/system/message/view', {id: attid}, function (res) {
             $open('#msg-view-div', {width: 800, top:280, title: '查看消息'});
             $template('#msg-view-value', res.data);
             });*/
            var msgViewWin, ids = [];

           /* //定义消息类型和对应的模块
            var modules = [
                {'code':'0101','module':'work-supervise-ajjskyjd'}, //案件及时勘验监督
                {'code':'0102','module':'work-supervise-xcjsgljd'}, //现场及时勘验监督
                {'code':'0103','module':''}, //物证及时保管
                {'code':'0104','module':''}, //痕迹提取
                {'code':'0105','module':''}, //痕迹及时提交比对
                {'code':'0106','module':''}, //及时鉴定
                {'code':'0201','module':'quality-check-cflrxc'}, //重复录入现场
                {'code':'0202','module':'quality-check-cflrzpxc'}, //重复录入照片
                {'code':'0203','module':'quality-check-xczp'}, //现场照片质量不合格
                {'code':'0204','module':'quality-check-kybl'}, //勘验笔录不合格
                {'code':'0205','module':'quality-check-dqp'}, //‘盗抢骗’考核现场不合格
                {'code':'0206','module':'quality-check-ajkycc'}, //案件勘验抽查
                {'code':'0207','module':'quality-check-bhgxcjc'} //不合格现场检查
            ];

            //当消息类型type属于上述模块时, 跳转到对应模块
            if(modules.select('o => o.code').indexOf(tslb) > 0){
                msgViewChangeSidebarStyle(modules.where('o=>o.code=="' + tslb + '"').select('o=>o.module')[0]);
            }*/

            //消息表中设为已读
            ids.push(msg_id);
            $post(setReadAction, {listId:ids}, function(res){
                top.unReadMsgCounts();
            });
        }

        //修改侧边栏iconfont样式 并跳转到对应的模块页面
        /*function msgViewChangeSidebarStyle(pageNo){
            top.rootTreeMenu.find('li>a').removeClass('menu-open menu-open2');
            top.rootTreeMenu.find('li').each(function() {
                if ($(this).attr('page-no') == pageNo) {
                    var a=$(this).children('a');
                    a.parents('.grade2,.grade3,#root-menu>li').each(function(){
                        $(this).children('a').eq(0).addClass('menu-open');
                    });
                    a[0].click();
                    a.addClass('menu-open menu-open2');
                }
            });
        }*/

        //执行消息弹出方法
        // initPopMsg();

        $('body').on('click', '.messager-body .next', function () {
            if ((top.registry.global.msgNext + top.registry.global.msgPrev) < (top.registry.global.msgNumber - 1)) {
                top.registry.global.msgNext++;
                popMsgContent($(this).parents('.messager-body'));
            }
        }).on('click', '.messager-body .prev', function () {
            if ((top.registry.global.msgNext + top.registry.global.msgPrev) > 0) {
                top.registry.global.msgPrev--;
                popMsgContent($(this).parents('.messager-body'));
            }
        }).on('click', '.msg-more a', function () {
            top.registry.global.msgNumber = top.registry.global.msgNumber - 1; //消息总数减一
            top.registry.global.arryMsg.splice((top.registry.global.msgNext + top.registry.global.msgPrev),1);//数组中移除当前查看的消息

            var t_tslb = this.getAttribute('paramTslb');//消息的类别
            var t_id = this.getAttribute('paramAttId');//att_id
            var t_msg_id = this.getAttribute('paramMsgId');//msg_id
            //查看消息详情 设为已读
            popMsgView(t_msg_id, t_tslb, t_id);

            if(top.registry.global.msgNumber == 0){  //只有一条未读消息 查看后消息提示框隐藏
                $('.corner-msg').addClass('hidePlus');
            }else if((top.registry.global.msgPrev + top.registry.global.msgNext) == top.registry.global.msgNumber){ //查看最后一条消息时 消息内容往前显示一条
                if ((top.registry.global.msgNext + top.registry.global.msgPrev) > 0) {
                    top.registry.global.msgPrev--;
                    popMsgContent($(this).parents('.messager-body'));
                }
            }else {
                popMsgContent($(this).parents('.messager-body'));
            }
            $('.msg-total-count').html(top.registry.global.msgNumber);
        });
        /*$('#msg-view-ok').on('click',function(){
         $('#msg-view-div').$close();
         });*/
    // }

    // setTimeout(popMsg,5000);//刷新页面弹出消息提示框
    // setInterval(function(){popMsg();},1800000);//每30分钟，弹出消息提示框

    //初始化 右上角未读消息数量
    top.unReadMsgCounts = function unReadMsgCounts(){
        //获取未读消息数量
        function getCounts(){
            $post(msgAction, {msgState:'1'}, function(res){
                upMsgCount(res.totalCount);
            }, false, false);
        }

        //更新右上角未读消息数量
        function upMsgCount(num) {
            num = parseInt(num);
            if (num > 0) {
                // $style(top.path+'/dist/css/feedback.css');
                $('#msg-count').show().html(num);
            } else {
                $('#msg-count').hide();
            }
        }

        getCounts();
    };
    // top.unReadMsgCounts();
    // setInterval(function(){top.unReadMsgCounts();},180000);//每3分钟，更新一次右上角消息数量