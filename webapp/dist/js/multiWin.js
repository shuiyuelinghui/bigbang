//防止重复执行
//$('.dict').dict();
//$('.query-date').datepicker();

function personEditFn(id, pageNO) {
    importing('multiWin.css','dict','datepicker',function(){
        $('.dict').dict();
        $('.query-date').datepicker();
        //先声明  action无任何相互依赖,在顶部直接定义
        var personEditAction = makeAct('sys/sysUser/upd');
        var personInfoAction = makeAct('sys/sysUser/get');
        var unitAction = makeAct('sys/sysOrganization/dict_unit');

        var personCheckId;
        var personEditId;
        var photoId;
        var personEditWin;

        var idVal,piVal,t_data = {};

        function initPersonEditData(id) {
            if(id == null) return false;
            $post(personInfoAction,id,function(res){
                var data = res.data;
                $('#edit-id').val(top.userId);
                if(data == null){
                	$('#edit-trueName').val(top.userName);
                	return false;
                }
                $('#edit-trueName').val(data.trueName);
                $('#edit-policeNo').val(data.policeNo);
                $('#edit-idCardNo').val(data.idCardNo);
                $('#edit-telephoneNo').val(data.telNo);
                $('#edit-mobilephoneNo').val(data.mobileNo);
                $('#edit-remark').html(data.remark);

                $('#edit-organId-dict').val(data.organId);
                $('#edit-organId-dict_displayValue').val(data.organName);
                $('#edit-gender-dict').dictSelect(data.gender);
                $('#edit-openFlag').dictSelect(data.openFlag);
                if(data.tType == '1') {
                    var fzmj =   $('#edit-fzmj');
                    if(fzmj.hasClass('hidePlus')){fzmj.removeClass('hidePlus');}
                    t_data.ryList = [];
                    for (var p in data.ryInfoList) {
                        var that = data.ryInfoList[p];
                        var i = t_data.ryList.length;
                        t_data.ryList[i] = {};
                        t_data.ryList[i].id = that.id || '';
                        t_data.ryList[i].name = that.trueName || '';
                    }
                    intoPersonSelect('edit');
                }

                if(data.photoStr) {
                    $('#img0').attr("src", "data:image/jpg;base64," + data.photoStr);
                }

                idVal = data.idCardNo;
                piVal = data.policeNo;

                $('.picshow').previewBox();
            });
        }

        function intoPersonSelect(type) {
            $('#note-group-'+type+'-person-mult').template(t_data);
            $('.add-tree-btn').on('click',function () {
                var selectWin=$open(getViewPath('person-select-mult.html'), {width:"60%", title:'选择人员',onClose:function(){"function"==typeof window.personSelectMultCloseFn && personSelectMultCloseFn()}},true,function (){
                    intoPersonSelectMult(selectWin,'jsgl-person-mng-'+type);
                });
            });
            $('.delete-person-note-'+type).on('click',function () {
                var id = $(this).attr('dataId');
                var ifAfter = false;
                for(var o in t_data.ryList) {
                    if(t_data.ryList[o].id === id) {
                        ifAfter = true;
                    }
                    if(ifAfter && o != t_data.ryList.length-1) {
                        t_data.ryList[o] = t_data.ryList[parseInt(o)+1];
                        t_data.ryList[o].sort = parseInt(o) + 1;
                    }
                }
                t_data.ryList.remove(t_data.ryList.length-1);
                intoPersonSelect(type);
            });

        }

        //立即预览本地图片(选中尚未上传的)
        function previewUpImgBase64(upInput,preImg){
            typeof upInput=='string' && (upInput=byid(upInput));
            typeof preImg=='string' && (preImg=byid(preImg));

            var file=upInput.files[0];
            var reader=new FileReader();

            reader.onload = function() {
                preImg.src=this.result;
            };
            reader.readAsDataURL(file);
        }

        function personEditSave() {

            //验证
            $('#edit-person-block .validate').validatebox();
            if($('#edit-person-block .validatebox-invalid').length>0){
                return false;
            }

            var tType = $('#edit-tType-dict').val();
            if(tType == '1') {
                if(t_data.ryList.length == 0) {
                    setTimeout(function () {
                        toast("请添加辅警！", 600).warn();
                    }, 50);
                    return false;
                }
                var persons = [];
                for(var i=0;i<t_data.ryList.length;i++){
                    persons.push(t_data.ryList[i].id);
                }
                $('#edit-ryInfo').val(persons.join());
            } else {
                $('#edit-ryInfo').val('');
            }

            var data = new FormData(document.querySelector('.p-file-form'));
            log(data);
            if($('#p-file').val()) {
                $.ajax({
                    url: action2link(pictureAction)+ '&oldId=' + photoId,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    async: false,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res.flag == 1) {
                            //回传过来的img-src地址数组
                            $('#edit-photo').val(res.data);
                        } else {
                            console.info(res);
                        }
                    }
                });
            }

            $('#edit-organ').val($('#edit-organId-dict_displayValue').val());
            //保存
            var paramsObj=$('#edit-form').serializeObject();
            delete paramsObj["organId_displayValue"];

            $post(personEditAction,JSON.stringify(paramsObj),function (res) {

                toast(res.msg||'保存成功！',600,function(){

                    if(top.registry.global.personEditPageNO === 'jsgl-organizations-mng'){
                        var chooseName =$('#edit-trueName').val();
                        window.initTreeData(false,null,chooseName);
                    }else if( top.registry.global.personEditPageNO === 'jsgl-person-mng'){
                        loadPersonList($('.paging').data('currentPage'));
                        personEditWin.$close();
                    } else {
                        personEditWin.$close();
                    }

                }).ok();

            });
        }


        //声明好后开始执行代码
        $('#edit-id').val(id);
        personEditId = id;
        personEditWin=window.personEditWin;
        top.registry.global.personEditPageNO = pageNO;

        $('#img0').attr('src',getDistPath('img/replace_photo.png'));


        $get(unitAction,null,function (res) {
            $('#edit-organId').dict(res.data,function() {
                initPersonEditData(top.userId)
            });
        });


        $('#edit-tType-dict').on('change',function () {
            var value = $(this).val();
            var fzmj =   $('#edit-fzmj');
            if(value == '1') {
                if(fzmj.hasClass('hidePlus')){fzmj.removeClass('hidePlus');}
                t_data.ryList = [];
                intoPersonSelect('edit');
            } else {
                if(!fzmj.hasClass('hidePlus')){fzmj.addClass('hidePlus');}
                $('#edit-ryInfo').val('');
            }
        });


        //保存修改内容
        $('#person-edit-save-btn').off('click').on('click',personEditSave);

        byid('p-file')&& (byid('p-file').onchange=function(){
            previewUpImgBase64('p-file','img0');
        });
    });

}


