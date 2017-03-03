setSubPrj('xk');
//公用方法
function trimAll(selector) {
    $(selector+' input,'+selector+' textarea').each(function (i,el) {
        var value = $(el).val();
        $(el).val(value.trim());
    });
}

//设定默认ajax开始和结束时的loading遮罩效果(#post自带,paginglist没有自带)
//$.ajaxSetup({
//    beforeSend:showLoading,
//    complete:hideLoading
//});


window.MODULE={
    //系统角色管理
    sysXtjsgl: function () {
            importing('dict','ztree',function() {
                var searchAction = makeAct('sys/sysRole/pagequery');
                var intoEditAct = makeAct('sys/sysRole/');
                var intoChooseUserAction = makeAct('sys/sysRole/roleuser');
                var intoChoosePermisAction = makeAct('sys/sysRole/viewPermis');
                var saveAct = makeAct('sys/sysRole/add');
                var updateAct = makeAct('sys/sysRole/update');
                var deleteAct = makeAct('sys/sysRole/delete');
                var roleUserHandle = makeAct('sys/sysRole/userassociation');
                var authAction = makeAct('sys/sysRole/authorization');
                var permisTree = $("#permis-tree");
                var v_roleId;//角色id
                var v_role;//选择权限页面需要保存角色信息
                var l_permis
                var zTreeObj;

                var nodes = [];
                var setting = {
                    check: {
                        enable:true
                    },
                    data: {
                        simpleData: {
                            enable:'pid',		//扁平数据，pid表示父节点的ID
                            idKey:'id',
                            pIdKey:'pid'		//默认的pId改为pid，注意默认I为大写
                        }
                    },
                    view: {
                        showIcon:false,
                        showTitle:false
                    }
                };

                $('.dict').dict();

                //查询角色列表
                function queryForRole(iflog, currentPage){
                    $('#role-query-result').pagingList({
                        action:searchAction,
                        currentPage:currentPage,
                        jsonObj:{
                            roleName:$('#roleName').val2(),
                            note:$('#roleDesc').val2()
                        },
                        callback:function(data){
                            hideLoading();
                            $template('#role-table tbody',data,function(item,i){
                                item.openFlagTxt = item.activeStatus=='1'?'启用':'禁用';
                                item.fixedRole = item.type == '1' ? '' : '_1';//type为0，可以删除；为1，表示固定角色，不可以删除
                            });
                        }
                    });
                }
                //重置
                function resetForRole(){
                    $('#roleName').val('');
                    $('#roleDesc').val('');
                }
                //进入新增角色页面
                function intoRoleAdd() {
                    $("#add-role-form")[0].reset();
                    $('#add-role-openFlag').dictSelect('1');
                    $open('#add-role-div', {width: 800, height: 300, title: '角色新增'});
                }
                //进入修改角色页面
                function intoRoleEdit(id){
                    $get(intoEditAct+id,null,function(res){
                        var t_role = res.data;
                        $open('#edit-role-div', {width: 800, height: 300, title: '角色修改'});
                        $template('#edit-role-form', t_role);
                        $('#edit-role-openFlag').dictSelect(t_role.activeStatus);
                        $('input[name="roleId"]').val(t_role.roleId);
                        $('input[name="type"]').val(t_role.type);
                    });
                }
                //进入选择权限页面
                function intoChoosePermis(id,moduleId){
                    var datastr = "{\"roleId\":\""+id+"\",\"moduleId\":\""+moduleId+"\"}";
                    $post(intoChoosePermisAction,datastr,function(res){
                        v_role = res.data;
                        $open('#choose-permis-div',{width:650,height:450,title:'权限选择（'+v_role.sysRole.roleName+'）'});
                        v_roleId = v_role.sysRole.roleId;
                        $template('#all-module',v_role.sysModuleList);
                        $('#all-module li a').removeClass('current-module');
                        $('#all-module li:first-child a').addClass('current-module');
                        intoPermisZtree(v_role.sysRole.roleId,v_role.sysModuleList[0].resourceId);
                    },"json");
                }
                //进入选择用户页面
                function intoChooseUser(id){
                    $get(intoChooseUserAction+"/"+id,{},function(res){
                        var t_role = res.data;
                        $open('#choose-user-div',{width:640, height:450, title:'用户选择（'+t_role.sysRole.roleName+'）'});
                        v_roleId = t_role.sysRole.roleId;
                        $template('#select-user',t_role.associatedUserList);
                        $template('#all-user',t_role.allUserList);
                    },"json");
                }
                //进入模块权限ztree
                function intoPermisZtree(roleId,moduleId){
                    var datastr = "{\"roleId\":\""+roleId+"\",\"moduleId\":\""+moduleId+"\"}";
                    $post(intoChoosePermisAction,datastr,function(res){
                        var t_sysRole = res.data;
                        l_permis = t_sysRole.sysRolePermisList;//当前角色下所有权限的数组
                        nodes = [];

                        showPermisZtree(nodes, t_sysRole.moduleList, l_permis);

                        zTreeObj = $('#permis-tree').ztree(setting, nodes);
                    },"json");
                }
                //模块权限ztree的设置
                function showPermisZtree(nodes, moduleList, sysRolePermisList){
                    var l_module = moduleList; //模块
                    var l_permis = sysRolePermisList; //所有权限
                    var l_m_permis;
                    var m_if_check = false, if_check = false;  //m_if_check 模块是否勾选复选框  if_check某个树节点是否勾选复选框

                    if(l_module != null) {
                        l_module.forEach(function (m, i) {  //对模块进行遍历
                            m_if_check = false;
                            l_permis.forEach(function (p, k) {
                                if (m.resourceId == p.resourceId) { //判断是否拥有权限
                                    m_if_check = true; //判断该模块是否勾上复选框
                                    if_check = true; //判断该操作是否勾上复选框
                                    return false;
                                }
                            });
                            nodes.push({id: m.resourceId, pid: m.superId, name: m.resourceName, checked: m_if_check, sort: i});
                            m_if_check = false;
                        });
                    }
                }
                //新增保存角色
                function saveRole(){
                    trimAll();
                    $('.role-add-valid').validatebox();
                    if($('.validatebox-invalid').length > 0){
                        return false;
                    }
                    var postData = $("#add-role-form").serializeObject();
                    $post(saveAct,JSON.stringify(postData),function(res) {
                        if (res.flag == '1') {
                            roleCloseWin('add-role-div');
                            toast('新增成功！').ok();
                            queryForRole(false);
                        } else {
                            toast('新增失败！').ok();
                        }
                    });
                }
                //修改保存角色
                function updateRole(){
                    trimAll();
                    $('.role-edit-valid').validatebox();
                    if($('.validatebox-invalid').length > 0){
                        return false;
                    }
                    $post(updateAct,JSON.stringify($('#edit-role-form').serializeObject()),function(res){
                        if (res.flag == '1') {
                            roleCloseWin('edit-role-div');
                            toast('修改成功！').ok();
                            queryForRole(false, $('.paging').data('currentPage'));
                        } else {
                            toast('修改失败！').ok();
                        }
                    });
                }
                //删除角色
                function deleteRole(id,trueName){
                    $confirm('确定删除【'+trueName+'】角色吗？',function(bol){
                        if(bol){
                            $post(deleteAct,id,function(res){
                                if (res.flag == '1') {
                                    toast('删除成功！').ok();
                                    queryForRole(false, $('.paging').data('currentPage'));
                                } else {
                                    toast('删除失败！').ok();
                                }
                            });
                        }
                    });
                }
                //角色授权
                function authRole(){
                    var t_treeObj = $.fn.zTree.getZTreeObj('permis-tree');
                    var t_nodes = t_treeObj.getCheckedNodes(true);//选中的节点
                    var t_nodes_nocheck = t_treeObj.getCheckedNodes(false);//未选中的节点
                    var noselectNodes = [];//未选中节点的id
                    var selectNodes = [];//选中节点的id

                    for(var i=0;i<t_nodes_nocheck.length;i++){
                        noselectNodes.push(t_nodes_nocheck[i].id);
                    }

                    var oldLimits = [];
                    l_permis.forEach(function (p, k) {
                        oldLimits.push(p.resourceId);
                    });

                    for(var i=0;i<t_nodes.length;i++){
                        if (oldLimits.indexOf(t_nodes[i].id) < 0){
                            selectNodes.push(t_nodes[i].id);
                        }
                    }
                    var postr = "{\"roleId\":\""+v_roleId+"\",\"delRolePermisIds\":\""+noselectNodes.join()+"\",\"sysRolePermisIds\":\""+selectNodes.join()+"\"}";
                    $post(authAction,postr,function(res){
                        if (res.flag == '1') {
                            toast('授权成功！').ok();
                        } else{
                            toast('授权失败！').ok();
                        }
                    },"json");
                }
                //关闭窗口
                function roleCloseWin(id){
                    $('#'+id).$close();
                    $('.role-add-valid').removeClass('validatebox-invalid');
                    $('.role-edit-valid').removeClass('validatebox-invalid');
                }

                queryForRole(false);

                $('#role-query').on('click',function(){
                    queryForRole(true);
                });
                $('#role-reset').on('click',function(){
                    resetForRole();
                });
                $('#into-role-add').on('click',function(){
                    intoRoleAdd();
                });
                $('#save-role').on('click',function(){
                    saveRole();
                });
                $('#add-role-cancel').on('click',function(){
                    roleCloseWin('add-role-div');
                });

                $('#role-table').on('click','.into-role-edit',function(){
                    intoRoleEdit(this.getAttribute('param'));
                }).on('click','.into-choose-user',function(){
                    intoChooseUser(this.getAttribute('param'));
                }).on('click','.into-choose-permis',function(){
                    intoChoosePermis(this.getAttribute('param'),'');
                }).on('click','.delete-role',function(){
                    deleteRole(this.getAttribute('param'),this.getAttribute('paramName'));
                });
                $('#update-role').on('click',function(){
                    updateRole();
                });
                $('#edit-role-cancel').on('click',function(){
                    roleCloseWin('edit-role-div');
                });
                $('#all-module').on('click','.into-module-permis',function(){
                    $('#all-module li a').removeClass('current-module');
                    $(this).addClass('current-module');
                    var t_role_id = v_roleId;
                    var module_id = this.getAttribute('moduleId');
                    intoPermisZtree(t_role_id,module_id);
                });
                $('#user-to-right').on('click',function(){
                    var t_id = $('#select-user').val();//若没有选择需要移除的用户，t_id为null
                    if(!t_id){toast('请先选择需要移除的用户').css('left','43%').warn();return false;}
                    var postr = "{\"roleId\":\""+v_roleId+"\",\"associatedUserId\":\""+t_id+"\"}";
                    $post(roleUserHandle+"/remove",postr,function(res){
                        if (res.flag == '1') {
                            $("#select-user option:selected").remove();
                            toast('移除用户成功！').ok();
                            //重新加载未选用户列表
                            $get(intoChooseUserAction+"/"+v_roleId,{},function(res){
                                $('#all-user').template(res.data.allUserList);
                            },"json");
                        } else {
                            toast('移除用户失败！').ok();
                        }
                    },"json");
                });
                $('#user-to-left').on('click',function(){
                    var t_id = $('#all-user').val();//若没有选择需要添加的用户，t_id为null
                    if(!t_id){toast('请先选择需要添加的用户').css('left','43%').warn();return false;}
                    var postr = "{\"roleId\":\""+v_roleId+"\",\"selectUserId\":\""+t_id+"\"}";
                    $post(roleUserHandle+"/add",postr,function(res){
                        if (res.flag == '1') {
                            $("#all-user option:selected").remove();
                            toast('添加用户成功！').ok();
                            //重新加载已选用户列表
                            $get(intoChooseUserAction+"/"+v_roleId,{},function(res){
                                $('#select-user').template(res.data.associatedUserList);
                            },"json");
                        } else {
                            toast('添加用户失败！').ok();
                        }
                    });
                });
                $('#choose-user-cancel').on('click',function(){
                    roleCloseWin('choose-user-div');
                });
                $('#auth-role-cancel').on('click',function(){
                    roleCloseWin('choose-permis-div');
                });
                $('#auth-role').on('click',function(){
                    authRole();
                });
            });
        },
    //登录用户管理
    sysDlyhgl:function (){
        importing('dict',function(scope) {
            var searchAct = makeAct('sys/sysUser/pagequery');
            var viewAct = makeAct('sys/sysUser/');
            var deleteAct = makeAct('sys/sysUser/delete');
            var saveAct = makeAct('sys/sysUser/add');
            var updateAct = makeAct('sys/sysUser/update');
            var roleDict = makeAct('sys/sysRole/roleDict');
            var unitAct = makeAct('sys/sysOrganization/dict_unit');
            var editingUser;
            var roleListHelper=function(item,i){
                item.rownum = i+1;
                if(editingUser.sysUserRoleIds.indexOf(item.roleId)>-1){
                    //如果用户已有该项权限则勾上，但前提是没有手动操作过
                    if(typeof top.registry.sys.checkRoles[item.rownum]=='undefined'){
                        item._checked=top.registry.sys.checkRoles[item.rownum]='checked';
                        top.registry.sys.checkRoleIds[item.rownum]=item.id;
                    }
                }
                item._checked=top.registry.sys.checkRoles[item.rownum];
            };

            scope.bind('usersData','#user-table>tbody');
            scope.bind('userData','#user-view-pre');
            scope.bind('rolesData','#role-table>tbody',roleListHelper);

            var add_limit = top.ops['user_add_button'];  //按钮权限，key值为权限代号

            $(".dict").dict();

            $get(unitAct,null,function (res) {
                $('#edit-organId').dict(res.data);
                $('#add-organId').dict(res.data);
            });

            //设置密码填写规则
            $.extend($.fn.validatebox.defaults.rules, {
                password: {
                    validator: function (val) {
                        return /^[a-zA-Z]\w{2,20}$/.test(val);
                    },
                    message: '请以字母开头，长度在3~20之间，只能包含字母、数字和下划线'
                },
                username: {
                    validator: function(val){
                        return /^[a-zA-Z]\w{0,50}$/.test(val);
                    },
                    message: '请以字母开头，只能包含字母、数字和下划线，长度小于50'
                }
            });

            //角色字典查询
            function initRoleDict(){
                $get(roleDict,null,function(res){
                    $('#dict-query-role').dict(res.data);
                });
            }


            //查询用户
            function queryForUser(currentPage){
                $('#user-query-result').pagingList({
                    action:searchAct,
                    currentPage:currentPage,
                    jsonObj:{
                        username:$('#userName').val2(),
                        trueName:$('#trueName').val2(),
                        roleName:$('#query-role').val2()
                    },
                    callback:function(data){
                        scope.set('usersData',data);
                        //$('#user-table>tbody').template(data);//, function(item,i){ item.openFlagTxt = item.openFlag=='1'?'启用':'禁用'; });
                    }
                });
            }
            //重置
            function resetForQuery(){
                $('#trueName,#userName,#query-role').val('');
            }
            //进入新增页面
            function intoUserAdd(){
                $("#user-add-form")[0].reset();
                $open('#user-add-div',{width:800,height:500,title:'用户新增'});
                $('#add-openFlag').dictSelect('1');
                $('#add-gender-dict').dictSelect('1');
            }
            //进入查看页面
            function intoUserView(id) {
                var url=viewAct+id+'/view';
                $get(url,null,function(res){
                    $open('#user-view-div', {width: 800, title: '用户查看'});
                    scope.set('userData',res.data);
                    //$template('#user-view-pre', res.data);
                });
            }
            //进入修改页面
            function intoUserEdit(id){
                var url=viewAct+id+'/edit';
                //var url=makeAct('sys/sysUser/edit')
                $get(url,null,function(msg) {
                    editingUser=msg.data;
                    $open('#user-edit-div',{width:800, title:'用户修改'});
                    $template('#user-edit-form',editingUser.sysUser);
                    //if(editingUser.sysUser.userName != 'sys' && editingUser.sysUser.userName != 'admin') $('#techEdit').prop('readonly', 'true').attr({'data-options':'required:true','placeholder':'请选择技术人员'});
                    $('#edit-openflag').dictSelect(editingUser.sysUser.openFlag);
                    $('#edit-gender-dict').dictSelect(editingUser.sysUser.gender);
                    $('#edit-organId-dict').val(editingUser.sysUser.organId);
                    $('#edit-organId-dict_displayValue').val(editingUser.sysUser.organName);

                    top.registry.sys ||(top.registry.sys={});
                    top.registry.sys.checkRoles=[];
                    top.registry.sys.checkRoleIds=[];

                    scope.set('rolesData',editingUser.roleList);
                    // $template('#role-table>tbody',editingUser.roleList,function(item,i){
                    //     item.rownum = i+1;
                    //     if(editingUser.sysUserRoleIds.indexOf(item.roleId)>-1){
                    //         //如果用户已有该项权限则勾上，但前提是没有手动操作过
                    //         if(typeof top.registry.sys.checkRoles[item.rownum]=='undefined'){
                    //             item._checked=top.registry.sys.checkRoles[item.rownum]='checked';
                    //             top.registry.sys.checkRoleIds[item.rownum]=item.id;
                    //         }
                    //     }
                    //     item._checked=top.registry.sys.checkRoles[item.rownum];
                    // });
                });
            }
            //删除用户
            function deleteForUser(id,userName){
                $confirm('确定删除【'+userName+'】用户吗？',function(bol){
                    if(bol){
                        $post(deleteAct,id,function(res){
                            if (res.flag == '1') {
                                toast('删除成功！').ok();
                                queryForUser($('.paging').data('currentPage'));
                            } else {
                                toast('删除失败！').ok();
                            }
                        },"json");
                    }
                });
            }
            //新增保存用户
            function saveUser(){
                trimAll();
                $('.user-add-valid').validatebox();
                if($('.validatebox-invalid').length > 0){
                    return false;
                }
                //$post(saveAct,$("#user-add-form").serializeObject(), ,true);
                var postData = $("#user-add-form").serializeObject();
                //转json对象的时候 忽略 organId_displayValue 字段
                Object.defineProperty(postData, "organId_displayValue", { enumerable: false })
                $post(saveAct,JSON.stringify(postData),function(res) {
                    if (res.flag == '1') {
                        userCloseWin('user-add-div');
                        toast('新增成功！',600,function(){
                            intoUserEdit(res.data.id);
                        }).ok();
                        queryForUser();
                    } else {
                        toast('新增失败！').ok();
                    }
                });

            }
            //修改保存用户
            function updateUser(){
                trimAll();
                $('.user-edit-valid').validatebox();
                if($('.validatebox-invalid').length > 0){
                    return false;
                }
                var roleIds = '';
                var chks=$("input[class='check-role']:checked");
                $.each(chks,function(){
                    roleIds = roleIds + $(this).val() + ',';
                });
                if (roleIds.length > 1) {
                    roleIds = roleIds.substring(0, roleIds.length-1);
                }
                $('#sysUserRoleIds').val(roleIds);
                var postData = $("#user-edit-form").serializeObject();
                //转json对象的时候 忽略 organId_displayValue 字段
                Object.defineProperty(postData, "organId_displayValue", { enumerable: false })
                $post(updateAct,obj2str(postData),function(res) {
                    userCloseWin('user-edit-div');
                    toast('修改成功！').ok();
                    queryForUser($('.paging').data('currentPage'));
                });

            }
            //关闭窗口
            function userCloseWin(id){
                $('#'+id).$close();
                $('.user-add-valid').removeClass("validatebox-invalid");
                $('.user-edit-valid').removeClass("validatebox-invalid");
            }

            //点击事件绑定页面列表排序函数
            /*
             function regOrder(){
             var flag=0;//desc
             var sortName;
             var order;

             //            $('#user-table').find("[sort-name]").click(function(){
             //                flag=!flag;
             //                if(flag==0){
             //                    sortName = this.getAttribute('sort-name');
             //                    order = 'desc';
             //                    if($('#icon-asc')){$('#icon-asc').remove();}
             //                    $(this).append('<i id="icon-desc" class="icon-caret-down"></i>');
             //                }else{
             //                    sortName = this.getAttribute('sort-name');
             //                    order = 'asc';
             //                    if($('#icon-desc')){$('#icon-desc').remove();}
             //                    $(this).append('<i id="icon-asc" class="icon-caret-up"></i>');
             //                }
             //                queryForUser(sortName,order);
             //            });

             }
             //regOrder();
             */

            $('#user-add').click(function(){
                intoUserAdd();
            });

            $('#user-query-condition').on('x-reset',resetForQuery).on('x-query', function(e){ queryForUser() });

            // $('#user-query-btn').on('click',function(){
            //     if($('.sort-arrow')) $('.sort-arrow').remove();
            //     queryForUser();
            // });
            // $('#user-reset-btn').on('click',function(){
            //     resetForQuery();
            // });
            $('#save-user').on('click',function(){
                saveUser();
            });
            $('#user-add-cancel').on('click',function(){
                userCloseWin('user-add-div');
            });
            $('#update-user').on('click',function(){
                updateUser();
            });
            $('#user-edit-cancel').on('click',function(){
                userCloseWin('user-edit-div');
            });
            $('#user-view-cancel').on('click',function(){
                userCloseWin('user-view-div');
            });
            $('#user-table').on('click','.into-user-view',function(){
                intoUserView(this.getAttribute('param'));
            }).on('click','.into-user-edit',function(){
                intoUserEdit(this.getAttribute('param'));
            }).on('click','.delete-for-user',function(){
                deleteForUser(this.getAttribute('param'),this.getAttribute('paramName'));
            });
            $('#user-edit-div,#user-add-div').on('click','.tech-button',function () {
                //choosePerson(this.getAttribute('param'));
            });
            $('#role-table').on('click','.check-role',function(i,ele){
                var rownum=+(this.getAttribute('rownum'));
                var roleId=this.getAttribute('id');
                if(this.checked){
                    top.registry.sys.checkRoles[rownum]='checked';
                    top.registry.sys.checkRoleIds[rownum]=roleId;
                    //this.setAttribute('checked','true');
                }else{
                    top.registry.sys.checkRoles[rownum]=null;
                    top.registry.sys.checkRoleIds[rownum]=null;
                    //this.removeAttribute('checked');
                }
            });

            //初始化角色字典
            initRoleDict();

            //初始化查询
            queryForUser();
        });
    },
    //系统模块管理
    sysXtmkgl:function (){
    importing('ztree','dict',function () {
        var moduleInfo,
            moduleId,
            treeObj,
            moduleAction = makeAct('sys/sysModule/list'),
            moduleViewAction = makeAct('sys/sysModule'),
            moduleDelAct = makeAct('sys/sysModule/del'),
            moduleEditAct = makeAct('sys/sysModule/upd'),
            moduleAddAct = makeAct('sys/sysModule/add'),
            setting = {
                check: {
                    enable: false			//启用复选框
                },
                data: {
                    simpleData: {
                        enable:"pid",		//扁平数据，pid表示父节点的ID
                        idKey:"id",
                        pIdKey:"pid"		//默认的pId改为pid，注意默认I为大写
                    }
                },
                view:{
                    showTitle: false, 	    //不显示提示信息
                    nameIsHTML: true,		//名字支持html代码
                    selectedMulti:false     //只能选中一个节点
                },
                callback:{
                    onClick:function(nodes, treeId, treeNode){
                        loadModuleInfo(treeNode);
                    }
                }
            };

        //初始化页面
        function initPageData(isFirst,delPid,editName) {
            $post(moduleAction,{},function (res) {
                var nodes = [];
                moduleInfo = res.data,
                    treeNode = {};
                for (var i = 0; i < moduleInfo.length; i++) {
                    if(moduleInfo[i].superId==null){
                        nodes.push({id:moduleInfo[i].resourceId,pid:0,name:moduleInfo[i].resourceName,sort:i});
                    }else{
                        nodes.push({id:moduleInfo[i].resourceId,pid:moduleInfo[i].superId,name:moduleInfo[i].resourceName,sort:i});
                    }
                }
                //$.ztree.init($('#module-tree'), setting, nodes);
                //treeObj = $.ztree.getZTreeObj('module-tree');

                //新api, 发动和获得树对象一步完成,调用逻辑更清晰
                treeObj =$('#module-tree').ztree( setting, nodes);
                //treeObj.expandAll(true);//默认展开全部节点
                if(isFirst){
                    loadModuleInfo(treeObj.getNodes()[0]);
                }
                if(delPid){
                    treeNode = treeObj.getNodeByParam('id',delPid);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                    treeObj.expandNode(treeNode);
                }
                if(editName){
                    treeNode = treeObj.getNodeByParam('name',editName);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                }
            });
        }
        //点击树节点加载数据
        function loadModuleInfo(treeNode){
            $get(moduleViewAction+"/"+treeNode.id,[],function(res){
                var data = res.data,
                    subRights = [];

                if(data==null){
                    $('#module-tip').show();
                    $('#module-content').hide();
                    return false;
                }
                $('#sub-rights-table').hide().find('tbody').html('');
                $('#main-rights').template(data);
                moduleId = data.resourceId;
                $('#open-flag').dictSelect(data.visibleState);
                byid('open-flag').disabled="disabled";

                var children=data.children;
                if(children){
                    for (var i = 0; i < children.length; i++) {
                        subRights.push(str2obj('{"resourceName":"'+children[i].resourceName+'","url":"'+children[i].url+'"}'));
                    }
                }
                //加载子权限数据
                if(subRights.length>0){
                    $('#sub-rights-table').show();
                    $template('#sub-rights-table tbody',subRights);
                    clickToRemoveSubRights();
                    subRights = [];
                }
                $('#module-content table input,#module-content table select').addClass('no-edit').prop('readonly',true);

                //注册新增同级模块事件
                $('#add-same-btn').on('click',function () {
                    addModule(true);
                });
                //注册新增下级模块事件
                $('#add-lower-btn').on('click',function () {
                    addModule(false,treeNode.id);
                });
                //保存修改模块事件
                $('#save-add-btn').on('click',function () {
                    var paramsObj = {};
                    trimAll('#module-content');
                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }
                    paramsObj=$('#add-form').serializeObject();
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        paramsObj = $.extend(paramsObj,{visibleState:'1'});
                    }
                    if(paramsObj["descriptionArray"]){
                        var descriptionArray=paramsObj["descriptionArray"].split(",");
                        var resourceArray=paramsObj["resourceArray"].split(",");
                        var length=descriptionArray.length;
                        var children=[];
                        for(var i=0;i<length;i++){
                            var child = {"resourceName": descriptionArray[i], "url": resourceArray[i]};
                            children.push(child);
                        }
                        paramsObj.children=children;
                        delete paramsObj["descriptionArray"];
                        delete paramsObj["resourceArray"];
                    }

                    $post(moduleEditAct,obj2str(paramsObj),function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
                        initPageData(false,false,$('#title').val());
//                        loadModuleInfo(treeNode);
                    });

                });

                //保存新增模块事件
                $('#save-save-btn').on('click',function () {
                    var resourceStrVal,moduleNoVal;

                    trimAll('#module-content');

                    resourceStrVal = $('#resourceStr').val();
                    moduleNoVal = $('#moduleNo').val();
                    //模块代号或页面代号为空时，将另一个有值的代号赋值给它
                    if(moduleNoVal === ''){
                        $('#moduleNo').val(resourceStrVal);
                    }
                    if(resourceStrVal === ''){
                        $('#resourceStr').val(moduleNoVal);
                    }

                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }

                    var paramsObj=$('#add-form').serializeObject();
                    if(paramsObj["descriptionArray"]){
                        var descriptionArray=paramsObj["descriptionArray"].split(",");
                        var resourceArray=paramsObj["resourceArray"].split(",");
                        var length=descriptionArray.length;
                        var children=[];
                        for(var i=0;i<length;i++){
                            var child = {"resourceName": descriptionArray[i], "url": resourceArray[i]};
                            children.push(child);
                        }
                        paramsObj.children=children;
                        delete paramsObj["descriptionArray"];
                        delete paramsObj["resourceArray"];
                    }

                    $post(moduleAddAct,obj2str(paramsObj),function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
//                        loadModuleInfo(treeNode);
//                        treeObj.updateNode(treeNode);
                        initPageData(false,false,$('#title').val());
                    });
                });
                //绑定修改节点事件
                $('#edit-btn').on('click',function () {
                    var selector = '';
                    //首页的启用标志不可编辑
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        selector = '[name!="visibleState"]';
                    }else{
                        $('#open-flag').removeAttr("disabled");
                    }
                    $('#module-content table input[name!="moduleNo"],#module-content table select'+selector).removeClass('no-edit').removeAttr('readonly');//input加上边框
                    $('.load-module,.add-module').hide();
                    $('#sub-rights-table').show();
                    $('.edit-module').show();
                    //根节点模块代号可编辑
                    if(!treeNode.getParentNode()){
                        $('#moduleNo').removeClass('no-edit').removeAttr('readonly');//input加上边框
                    }
                });
                //注册返回事件
                $('#save-return-btn').on('click',function () {
                    loadModuleInfo(treeNode);
                });

                $('#module-tip').hide();
                $('#module-content').show();
                $('.edit-module,.add-module').hide();
                $('.load-module').show();

                if(treeNode.isParent){
                    $('#delete-btn,.c-mod').hide();//有子节点的节点隐藏“删除节点”按钮
                    if(treeNode.children.length>1){//有一个以上子节点的显示默认进入
                        $('.default-into').show();
                        $('#url-col').removeAttr('colspan');
                    }else{
                        $('.default-into').hide();
                        $('#url-col').attr('colspan','3');
                    }
                    $('.p-mod').show();
                }else{
                    $('#delete-btn').show().on('click',function(){
                        deleteModuleInfo(moduleId,treeNode);
                    });
                    $('.c-mod').show();
                    $('.default-into,.p-mod').hide();
                    $('#url-col').attr('colspan','3');
                }
                $('#save-save-btn').hide();
            });
        }

        //删除节点
        function deleteModuleInfo(id,treeNode){
            $confirm('确认删除【'+treeNode.name+'】节点？',function(bol) {
                if (bol) {
                    $post(moduleDelAct,"{\"resourceId\":\""+id+"\"}",function (res) {
                        var msg = res.msg?res.msg:'删除成功！';
                        toast(msg,600).ok();
                        initPageData(false,treeNode.pid);
                        if(!treeNode.pid){
                            loadModuleInfo(treeObj.getNodes()[0]);
                        }
                    });
                }
            });
        }
        //点击删除一行子权限
        function clickToRemoveSubRights() {
            $('.sub-rights-remove').one('click',function () {
                $(this).parent().parent().remove();
            });
        }
        //新增同级或下级模块
        function addModule(sameLevel,pid) {
            $('#open-flag').removeAttr("disabled");
            $('.load-module,.edit-module').hide();
            $('.add-module').show();
            $('#module-content table input[name!="moduleNo"],#module-content table select').removeClass('no-edit').removeAttr('readonly').val('');//input加上边框，内容置空
            $('#sub-rights-table tbody').html('');//新增时移除子权限table里面的内容
            $('#sub-rights-table').show();

            if(!sameLevel){//新增下级模块时
                $('#parent-id').val(moduleId).attr("readonly","true").addClass('no-edit');
                $('#parent-id').parent().parent().show();
//                $('#moduleNo').addClass('no-edit').prop('readonly','readonly');
                $('.p-mod').hide();
                $('.c-mod').show();
            }else{//新增同级模块时
                $('#moduleNo').removeClass('no-edit').removeAttr('readonly').val('');
            }
            $('#save-add-btn').hide();
            $('#save-save-btn').show();
            $('#open-flag').dictSelect(1);
        }
        //扩展验证
        $.extend($.fn.validatebox.defaults.rules, {
            letter: {
                validator: function (val) {
                    return /^[\w|-]+$/.test(val);
                },
                message: '请输入字母、数字、中划线及下划线'
            },
            //验证汉字、英文、数字
            chEnName: {
                validator: function (value) {
                    return /^[\u0391-\uFFE5]+[a-z|A-Z|\d]*$/.test(value);
                },
                message: '请输入中文（后面可以包含英文或数字）'
            }
        });

        initPageData(true);
        $('#open-flag').dict();

        //注册点击添加子权限事件
        $('#sub-rights-plus').on('click',function () {
            $('#sub-rights-table tbody').append('<tr><td><span class="add-module edit-module orangered">★ </span>子权限描述：</td>'+
                '<td><input name="descriptionArray" type="text" class="common-input validate" data-options="required:true"></td>'+
                '<td><span class="add-module edit-module orangered">★ </span>子权限代号：</td>'+
                '<td><input name="resourceArray" type="text" class="common-input validate" data-options="required:true"><i class="icon-remove sub-rights-remove"></i></td></tr>');
            //绑定点击删除子权限事件
            clickToRemoveSubRights();
        });
    });
},
    //系统参数管理
    sysXtcsgl:function (){
    importing('dict','datepicker',function () {

        var intoParamAction = makeAct('sys/sysParameter/list'),
            editParamAction = makeAct('sys/sysParameter/edit'),
            addParamAction = makeAct('sys/sysParameter/add'),
            updateParamAction = makeAct('sys/sysParameter/upd');

        var pageDataForParam,editId;
        //paramType 0 input,1 long input,2 textarea, 3 dict ,4 date, 5 single select, 6 multiple select
        $filter('showMultiple',function(){
            return this=='6'
        });
        $filter('showSingle',function(){
            return this=='5'
        });
        $filter('showDate',function(){
            return this=='4'
        });
        $filter('showDict',function(){
            return this=='3'
        });
        $filter('showTa',function(){
            return this=='2'
        });
        $filter('showInputL',function(){
            return this=='1'
        });
        $filter('showInput',function(){
            return this=='0'
        });
        var closeWin = function(winId,resetForm) {
            if(winId){
                $(winId).$close();
            }
            if(resetForm) {
                $(resetForm)[0].reset();
            }
            $('.param-name').removeClass('validatebox-invalid');
        }
        function initPageData(){
            $post(intoParamAction,[],function (res) {
                var initSel = '0',
                    enName = '';
                var configIdOption = '';
                if(res.flag == 1){
                    //tab 分组
                    $template('#param-config-ul',res.data);
                    pageDataForParam = res.data;
                    //分组数据绑定事件
                    var firstTabId="";
                    firstTabId=res.data.length && res.data[0].id;
                    $.each(res.data,function(n,value){
                        $('#'+value.id).on('click',function () {
                            $('#param-config-ul').find('li').removeClass('active');
                            $(this).addClass('active');
                            $template('#param-list-table tbody',value.data,function (item,index) {
                                item.rownum=index+1;
                            });
                            $('.paramDict:not(hide)').each(function(){
                                var dict=$(this);
                                var dictValue=$(this).attr('value');
                                $(this).dict(function(){
                                    dict.dictSelect(dictValue);
                                })
                            });
                            $('.paramDates:not(hide)').datepicker();
                        });
                        //显示第一组数据
                        configIdOption += '<option value="{dictKey}">{dictValue}</option>'.format(value);
                    });
                    //所属模块的选项
                    $('#param-configId').html(configIdOption);
                    $("#"+firstTabId).click();
                }
            });
        }

        $.extend($.fn.validatebox.defaults.rules, {
            english: {
                validator: function (val) {
                    return /^[a-zA-Z]+$/.test(val);
                },
                message: '请输入纯英文'
            },
            num:{
                validator: function (val) {
                    return /^[0-9]*$/.test(val);
                },
                message: '请输入数字'
            }
        });

        initPageData();

        $('#hideFlag').dict();
        $('#paramType').dict();

        //打开新增弹窗
        $('#add-btn').on('click',function () {
            $('#add-param-form')[0].reset();
            //参数类型绑定字典类型input框事件
            $('#param-paramType').change(function(){
                //字典CSLXDM对应3-下拉框，5-单选字典，6-多选字典，需要填写字典代码
                var cslx = $('#param-paramType').val();
                if(cslx == '3' || cslx == '5' || cslx == '6'){
                    $('#param-dict-type').show();
                    $('#param-dictType').validatebox();
                }else{
                    $('#param-dict-type').hide();
                    $('#param-dictType').removeClass('validatebox-invalid');
                }
            });
            $('#save-edit-param').hide();
            $('#save-add-param').show();
            $open('#add-param-block',{width:800,title:'&nbsp;系统参数新增',onClose:function () {
                closeWin('','#add-param-form');
            }});
        });

        //关闭新增弹窗
        $('#close-add-param').on('click',function () {
            closeWin('#add-param-block','#add-param-form');
        });

        //修改系统参数
        function editSystemParamConfig(id){
            $('#add-param-form')[0].reset();
            for(var i=0;i<pageDataForParam.length;i++){
                if(pageDataForParam[i].data!=null) {
                    for (var j = 0; j < pageDataForParam[i].data.length; j++) {
                        if (pageDataForParam[i].data[j].id == id) {
                            byid('param-editId').value = id;
                            byid('param-chineseName').value = pageDataForParam[i].data[j].name;
                            byid('param-englishName').value = pageDataForParam[i].data[j].key;
                            byid('param-default').value = pageDataForParam[i].data[j].value;
                            byid('param-value').value = pageDataForParam[i].data[j].value;
                            byid('param-remark').value = pageDataForParam[i].data[j].remark==null?"":pageDataForParam[i].data[j].remark;
                            $("#param-hideFlag").val(pageDataForParam[i].data[j].showFlag);
                            $("#param-allowModify").val(pageDataForParam[i].data[j].allowModify);
                            byid('param-paramSort').value = pageDataForParam[i].data[j].sort;
                            byid('param-configId').value = pageDataForParam[i].data[j].type;
                            $("#param-paramType").val(pageDataForParam[i].data[j].paramType);
                            $("#param-dictType").val(pageDataForParam[i].data[j].dictType);
                        }
                    }
                }
            }

            //参数类型绑定字典类型input框事件
            $('#param-paramType').change(function(){
                //字典CSLXDM对应3-下拉框，5-单选字典，6-多选字典，需要填写字典代码
                var cslx = $('#param-paramType').val();
                if(cslx == '3' || cslx == '5' || cslx == '6'){
                    $('#param-dict-type').show();
                    $('#param-dictType').validatebox();
                }else{
                    $('#param-dict-type').hide();
                    $('#param-dictType').removeClass('validatebox-invalid');
                }
            });
            $('#save-edit-param').show();
            $('#save-add-param').hide();
            $open('#add-param-block',{width:800,title:'&nbsp;系统参数新增',onClose:function () {
                closeWin('','#add-param-form');
            }});
        }

        //系统参数修改保存
        function updateSystemParam(){
            trimAll('.add-content');
            $('.param-name').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            $post(updateParamAction,obj2str($('#add-param-form').serializeObject()),function (res) {
                if(res.flag==1) {
                    toast('保存成功！', 600, function () {
                        closeWin('#add-param-block', '#add-param-form');
                    }).ok();
                    initPageData();
                }else{
                    toast('保存出错！', 600, function () {
                    }).error()
                }
            });
        }

        //保存参数列表
        $('#save-btn').on('click',function () {
            $('.param-name-edit').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            $post(editParamAction,obj2str($('#param-form').serializeArray()),function (res) {
                if(res.flag==1) {
                    toast('保存成功！', 600, function () {
                        closeWin('#add-param-block', '#add-param-form');
                    }).ok();
                    initPageData();
                }else{
                    toast('保存出错！', 600, function () {
                    }).error()
                }
            });
        });

        $('#save-add-param').on('click',function () {
            //top.registry.sys.sysParamCurrentTab = $('.active').attr('id');
            trimAll('.add-content');
            $('.param-name').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            $post(addParamAction, obj2str($('#add-param-form').serializeObject()), function (res) {
                if(res.flag==1) {
                    toast('保存成功！', 600, function () {
                        closeWin('#add-param-block', '#add-param-form');
                    }).ok();
                    initPageData();
                }else{
                    toast('保存出错！', 600, function () {
                    }).error()
                }
            });
        });
        $('#param-list-table').on('click','.into-edit-param',function(){
            editSystemParamConfig(this.getAttribute("paramId"));
        });
        $('#save-edit-param').on('click',function(){
            updateSystemParam();
        });
    });

},
    //系统登录日志
    sysLoginlog:function (){
        importing('datepicker',function(){
            var searchAction = makeAct('sys/sysOnlineLog/query');
            $('.query-date').datepicker();
            $('#loginDateEnd').val(Date.format('YYYY-MM-DD'));
            $('#loginDateBegin').val(Date.format('YYYY-MM-DD'));
            queryForLoginlog();

            //查询登录日志列表
            function queryForLoginlog(){
                $('#loginlog-query-result').pagingList({
                    action:searchAction,
                    jsonObj:{
                        loginUser: $('#loginName').val().trim(),
                        loginTimeBegin: $('#loginDateBegin').val().trim(),
                        loginTimeEnd: $('#loginDateEnd').val().trim()
                    },
                    callback:function(data){
                        $('#loginlog-table tbody').template(data);
                    }
                });
            }

            $('#loginlog-query-btn').on('click',function(){
                var t_beginDate = $('#loginDateBegin').val();
                var t_endDate = $('#loginDateEnd').val();
                if(!t_beginDate.isEmpty() && !t_endDate.isEmpty() && t_beginDate > t_endDate){
                    toast('登录开始时间不能大于结束时间！').css('width','300px').warn();
                    return false;
                }
                queryForLoginlog();
            });
            $('#loginlog-reset-btn').on('click',function(){
                $('#loginName').val('');
                $('#loginDateBegin').val('');
                $('#loginDateEnd').val('');
            });
        });
    },
    //系统操作日志
    sysOptlog:function () {
        importing('datepicker',function(){
            var searchAction = makeAct('sys/sysLog/query');
            $('.query-date').datepicker();
            $('#optTimeBegin').val(Date.format('YYYY-MM-DD'));
            $('#optTimeEnd').val(Date.format('YYYY-MM-DD'));
            queryForOptlog();

            //查询操作日志列表
            function queryForOptlog(){
                $('#optlog-query-result').pagingList({
                    action:searchAction,
                    jsonObj:{
                        optUser: $('#optUser').val().trim(),
                        optTimeBegin: $('#optTimeBegin').val().trim(),
                        optTimeEnd: $('#optTimeEnd').val().trim()
                    },
                    callback:function(data){
                        hideLoading();
                        $template('#optlog-table tbody',data,function(item,i){
                        });
                    }
                });
            }

            $('#optlog-query-btn').on('click',function(){
                var t_beginDate = $('#optTimeBegin').val();
                var t_endDate = $('#optTimeEnd').val();
                if(!t_beginDate.isEmpty() && !t_endDate.isEmpty() && t_beginDate > t_endDate){
                    toast('开始时间不能大于结束时间！').css('width','300px').warn();
                    return false;
                }
                queryForOptlog();
            });
            $('#optlog-reset-btn').on('click',function(){
                $('#optUser').val('');
                $('#optTimeEnd').val('');
                $('#optTimeBegin').val('');
            });
        });
    },
    //系统导航
    sysXtdh:function () {
        importing('dict', function () {
            var   xtdhDeleteAction = makeAct('sys/sysXtdh/del'),
                xtdhAddAct = makeAct('sys/sysXtdh/add'),
                xtdhEditAct = makeAct('sys/sysXtdh/upd'),
                xtdhViewAction = makeAct('sys/sysXtdh'),
                xtdhListAct = makeAct('sys/sysXtdh/query'),
                pictureAction = makeAct('sys/sysXtdh/photoAdd');
            var xtdhDeleteLimit = top.ops['system-xtdh-delete'],
                xtdhEditLimit = top.ops['system-xtdh-edit'],
                xtdhAddLimit = top.ops['system-xtdh-add'];

            $('.dict').dict();

            $filter('isNotNull',function(){
                return this != '' && this != null && this != undefined;
            });

            //初始化方法
            function init() {
                //加载设备列表数据
                loadXtdhList();
            }

            //初始化窗口数据
            function initWinData(type) {
                var that = $(this),
                    id = that.attr('dataId');
                $get(xtdhViewAction+"/"+id, [], function (res) {
                    var data = res.data;
                    $('#' + type + '-systemName').val(data.systemName);
                    $('#' + type + '-systemCode').val(data.systemCode);
                    $('#' + type + '-sort').val(data.sort);
                    $('#' + type + '-systemAddr').val(data.systemAddr);
                    $('#' + type + '-systemUnit').dictSelect(data.systemUnit);
                    $('#' + type + '-jhPara').val(data.jhPara);
                    $('#' + type + '-sfzhPara').val(data.sfzhPara);
                    if(data.photo) {
                        $('#edit-img0').attr("src", "data:image/jpg;base64," + data.photo);
                    }
                    if (type == 'edit') {
                        $('#edit-id').val(id);
                        $('#edit-sort-last').html('');
                        $('#edit-login').val('1');
                        $('#edit-notLogin').val('0');
                        $('#edit-p-file').val('');
                        $('#edit-ifJh').val('1');
                        $('#edit-ifSfzh').val('1');
                        if(data.ifLogin == 1) {
                            $('#edit-login').prop('checked', true);
                        } else {
                            $('#edit-notLogin').prop('checked', true);
                        }
                        $('#edit-ifJh').prop('checked', data.ifJh == '1' ? true:false);
                        $('#edit-ifSfzh').prop('checked', data.ifSfzh == '1' ? true:false);
                        changeDL(data.ifLogin,'edit');
                        $("input[name='ifLogin']").off('click').click(function(){
                            changeDL(this.value,'edit');
                        });
                        $("#edit-ifJh").click(function(){
                            changeDlType('edit', 'jhPara', $(this).prop("checked"));
                        });
                        $("#edit-ifSfzh").click(function(){
                            changeDlType('edit', 'sfzhPara', $(this).prop("checked"));
                        });
                        $post(xtdhListAct, obj2str({orderBy: 'sort', sort:'asc'}), function (res) {
                            var thisObj = res.data.where('o=>o.id=="'+id+'"');
                            if(thisObj[0].rownum > 1) {
                                var systemCode = res.data[thisObj[0].rownum - 2].systemCode;
                                var sort = res.data[thisObj[0].rownum - 2].sort;
                                $('#edit-sort-last').html('上一个' + systemCode + ' ' + sort);
                                $('#edit-sort-last').off('click').click(function () {
                                    $open('#xtdh-sort-div', {title: '显示顺序', width: 320});
                                    $template('#xtdh-sort-table tbody', res.data);
                                });
                            }
                        });
                    } else {

                    }
                });

            }
            //改变登录状态
            function changeDlType(type, dlType, ifSelect) {
                if(ifSelect) {
                    $('#'+type+'-'+dlType).addClass("validate");
                } else {
                    $('#'+type+'-'+dlType).removeClass("validate validatebox-invalid").val("");
                }
            }
            //改变登录状态
            function changeDL(ifDL, type) {
                var dddl =   $('#'+type+'-dddl');
                if(ifDL == '1') {
                    if(dddl.hasClass('hidePlus')){dddl.removeClass('hidePlus');}
                } else {
                    if(!dddl.hasClass('hidePlus')){dddl.addClass('hidePlus');}
                    changeDlType(type, 'jhPara', false);
                    changeDlType(type, 'sfzhPara', false);
                    $('#'+type+'-ifJh').prop('checked', false);
                    $('#'+type+'-ifSfzh').prop('checked', false);
                }
            }
            //保存
            function saveXtdh(action, params, winId, formId, type) {
                //验证
                $(winId + ' .validate').validatebox();
                if ($('.validatebox-invalid').length > 0) {
                    return false;
                }
                //保存
                $post(action, params, function (res) {
                    dhId = res.data;
                    var data = new FormData(document.querySelector('.'+type+'-p-file-form'));
                    if($('#'+type+'-p-file').val()) {
                        $.ajax({
                            url: pictureAction + '/' + dhId,
                            type: 'POST',
                            data: data,
                            async: false,
                            cache: false,
                            processData: false,
                            contentType: false,
                            success: function (resPhoto) {
                                if (resPhoto.flag == 1) {
                                    saveSuccess(winId, formId, res.msg);
                                } else {
                                    console.info(resPhoto);
                                }
                            }
                        });
                    } else {
                        saveSuccess(winId, formId, res.msg);
                    }
                });



            }


            function saveSuccess(winId, formId, msgInfo) {
                var msg = msgInfo ? msgInfo : '保存成功！';
                closeWin(winId, formId);
                toast(msg, 600).ok();
                //加载列表数据
                loadXtdhList($('.paging').data('currentPage'));
            }

            //关闭弹窗
            function closeWin(winId, formId) {
                if (winId) {
                    $(winId).$close();
                }
                if (formId) {
                    $(formId)[0].reset();
                    $(formId).find('input').val('');
                }
                $('.validate').removeClass('validatebox-invalid');
            }

            //查询
            $('#query-btn').on('click', function () {
                if ($('.sort-arrow')) $('.sort-arrow').remove();
                loadXtdhList();
            });
            //重置
            $('#reset-btn').on('click', function () {
                var queryForm = $('#xtdh-form');
                queryForm[0].reset();
                queryForm.find('input').val('');
            });
            //新增
            $('.cm-add-btn').on('click', function () {
                $('#add-img0').attr('src',top.path + '/dist/img/replace_photo.png');
                $post(xtdhListAct, obj2str({orderBy: 'sort', sort:'asc'}), function (res) {
                    var systemCode = res.data[res.data.length - 1].systemCode;
                    var sort = res.data[res.data.length - 1].sort;
                    $('#add-sort-last').html('上一个' + systemCode + ' ' + sort);
                    $('#add-sort-last').off('click').click(function () {
                        $open('#xtdh-sort-div', {title: '显示顺序', width: 320});
                        $template('#xtdh-sort-table tbody', res.data);
                    });
                });

                $('#add-form')[0].reset();
                $('#add-form').find('input').val('');
                $('#add-p-file').val('');
                $('#add-login').val('1');
                $('#add-ifJh').val('1');
                $('#add-ifSfzh').val('1');
                $('#add-notLogin').val('0');
                $open('#xtdh-add-div', {title: '添加系统导航', width: 820});
                changeDL('0','add');
                $("input[name='ifLogin']").off('click').click(function(){
                    changeDL(this.value,'add');
                });
                $("#add-ifJh").click(function(){
                    changeDlType('add', 'jhPara', $(this).prop("checked"));
                });
                $("#add-ifSfzh").click(function(){
                    changeDlType('add', 'sfzhPara', $(this).prop("checked"));
                });
            });
            //关闭新增弹窗
            $('#add-close-btn').on('click', function () {
                closeWin('#xtdh-add-div', '#add-form');
            });
            //保存新增内容
            $('#add-save-btn').on('click', function () {
                var checked = $('#add-login').prop("checked");
                if(checked) {
                    if(!($('#add-ifSfzh').prop("checked") || $('#add-ifJh').prop("checked"))) {
                        toast('请选择单点登录类型', 600).warn();
                        return false;
                    }
                }
                $('#add-systemCunit').val($('#add-systemUnit-dict_displayValue').val());
                saveXtdh(xtdhAddAct, obj2str($('#add-form').serializeObject()), '#xtdh-add-div', '#add-form', 'add');
            });
            //关闭修改弹窗
            $('#edit-close-btn').on('click', function () {
                closeWin('#xtdh-edit-div', '#edit-form');
            });
            //关闭修改弹窗
            $('#check-close-btn').on('click', function () {
                closeWin('#xtdh-check-div', '#check-form');
            });
            //保存修改内容
            $('#edit-save-btn').on('click', function () {
                var checked = $('#edit-login').prop("checked");
                if(checked) {
                    if(!($('#edit-ifSfzh').prop("checked") || $('#edit-ifJh').prop("checked"))) {
                        toast('请选择单点登录类型', 600).warn();
                        return false;
                    }
                }
                //document.getElementById(type+'-systemCunit').value = $('#'+type+'-systemUnit-dict_displayValue').val();
                $('#edit-systemCunit').val($('#edit-systemUnit-dict_displayValue').val());
                saveXtdh(xtdhEditAct, obj2str($('#edit-form').serializeObject()), '#xtdh-edit-div', '#edit-form', 'edit');
            });
            //初始化
            init();
            if (xtdhAddLimit) {
                $('.cm-add-btn').removeClass('hidePlus');
            }


            //回调函数
            function pageBackXtdh(data) {
                $('#xtdh-info-table>tbody').template( data, function (item, i) {
                    item.deleteLimit = xtdhDeleteLimit;
                    item.editLimit = xtdhEditLimit;
                }, true);
                $('.picshow').previewBox();
                //查看
                $('.into-xtdh-view').on('click', function () {
                    $open('#xtdh-check-div', {title: '系统导航查看', width: 820});
                    //初始化修改弹窗数据
                    initWinData.call(this, 'check');
                });
                //修改
                $('.icon-edit-btn').on('click', function () {
                    $('#edit-img0').attr('src',top.path + '/dist/img/replace_photo.png');
                    $open('#xtdh-edit-div', {title: '系统导航修改', width: 820});
                    //初始化修改弹窗数据
                    initWinData.call(this, 'edit');
                });
                //删除
                $('.delete-for-xtdh').on('click', function () {
                    var id = $(this).attr('dataId');
                    var name = $(this).attr('name');
                    $confirm('确定删除' + name + '吗？', function (del) {
                        if (del) {
                            $post(xtdhDeleteAction, id, function (res) {
                                var msg = res.msg ? res.msg : '删除成功！';
                                toast(msg, 600).ok();
                                //加载设备列表数据
                                loadXtdhList($('.paging').data('currentPage'));
                            });
                        }
                    });
                });
            }

            //载入列表
            function loadXtdhList(currentPage) {
                $('#xtdh-query-result').pagingList({
                    action: xtdhListAct,
                    currentPage: currentPage,
                    jsonObj: $('#xtdh-form').serializeObject(),
                    callback: pageBackXtdh
                });
            }

            //立即预览本地图片(选中尚未上传的)
            function previewUpImgBase64(upInput,preImg){
                typeof upInput=='string' && (upInput=document.getElementById(upInput));
                typeof preImg=='string' && (preImg=document.getElementById(preImg));

                var file=upInput.files[0];
                var reader=new FileReader();

                reader.onload = function() {
                    preImg.src=this.result;
                }
                reader.readAsDataURL(file);
            }

            document.getElementById('add-p-file').onchange=function(){
                previewUpImgBase64('add-p-file','add-img0');
            };
            document.getElementById('edit-p-file').onchange=function(){
                previewUpImgBase64('edit-p-file','edit-img0');
            };

        });
    },
    //消息管理
    sysMsg:function (){

    }
};

/*  注意!!!
 *  把同一个主模块下的各个页面脚本写在一个文件中
 *  这样的好处是: 同一模块下,总有一些东西可以抽出来公用. 介于纯单页应用和各页面互不干涉之间
 *  每个页面的代码集中在一个函数中
 *  pageNo与方法名对应,以便自动找到, 否则在页面底部手动调用
 */

(function (){
    var pageNo=top.currentPageNo||window.frameElement.getAttribute('page-no');
    var initFn=window.MODULE[window.dash2camel(pageNo)];//+'Fn';
    //logEx([initFn,typeof window[initFn]]);
    window!=top && pageNo && typeof initFn=='function' && initFn();
})();