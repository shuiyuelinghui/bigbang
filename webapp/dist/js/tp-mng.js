/**
 * Created by XiongYing on 2017/2/10.
 * 现勘-模板管理模块
 */

/*录入项模板管理action*/
var sysInputTempLateListAct = makeAct('sceneCollecting/inputTemplate/query'),
    editInputTemplateAct = makeAct('sceneCollecting/inputTemplate/upd'),
    inputTemplateAddListAct = makeAct('sceneCollecting/inputTemplate/getBase'),
    addInputTemplateAct = makeAct('sceneCollecting/inputTemplate/add'),
    inputTemplateDelAct = makeAct('sceneCollecting/inputTemplate/delLogic');

/*文本信息模板管理action*/
var wbxxmbglListAct = makeAct('sceneCollecting/textTemplate/query'),
    textTemplateDelAct = makeAct('sceneCollecting/textTemplate/delLogic'),
    textTemplateAddAct = makeAct('sceneCollecting/textTemplate/add'),
    textTemplateEditAct = makeAct('sceneCollecting/textTemplate/upd');

/*录入项模板管理模块*/
function sysLrxmbgl(){
    importing('datepicker','dict',function(){

        var $qr=$('#inputTemplate-query-result');
        $(".dict").dict();

        //查询inputTemplate列表
        function queryForInputTemplate(){
            $qr.pagingList({
                action:sysInputTempLateListAct,//'http://localhost:8023/xcky/api/sceneCollecting/inputTemplate/query'
                callback:function(data){
                    $('#inputTemplate-table>tbody').template(data);
                }
            });
        }
        queryForInputTemplate();


        $('#inputTemplate-table').on('click','.inputTemplate-edit',function(){
            var $this = $(this);
            var id = $this.attr('param'),
                useageUserLevel = $this.attr('useageUserLevel'),
                caseType = $this.attr('caseType'),
                caseTypeName = $this.attr('caseTypeName'),
                allowModify = $this.attr('allowModify'),
                openFlag = $this.attr('openFlag');
            var paramObj = {
                "id": id,
                "useageUserLevel": useageUserLevel,
                "caseType": caseType,
                "caseTypeName":caseTypeName,
                "content": "",
                "allowModify": parseInt(allowModify),
                "openFlag": parseInt(openFlag)
            };
            inputTemplateEdit(paramObj);
        }).on('click','.inputTemplate-delete',function(){
            inputTemplateDelete(this.getAttribute('param'),this.getAttribute('caseTypeName'));
        }).on('click','.inputTemplate-open',function () {
            var $this = $(this);
            if($this.attr('val')==='1'){
                $this.attr('val','0').children('.open').hide().siblings().show();
            }else{
                $this.attr('val','1').children('.no-open').hide().siblings().show();
            }
        });
        $qr.find('.cm-add-btn').on('click',inputTemplateAdd);
        $('#edit-cancel-button').on('click',function(){
            closeWin('#edit-div','#edit-form');
        });
        $('#add-cancel-button').on('click',function(){
            closeWin('#add-div','#edit-form');
        });
        var closeWin = function(winId,resetForm) {
            if(winId){
                $(winId).$close();
            }
            if(resetForm) {
                $(resetForm)[0].reset();
            }
            $(winId).find('.validate').removeClass('validatebox-invalid validatebox-text');
        };
        $('#add-save-button').on('click',function () {
            saveInputTemplate('add');
        });
        $('#edit-save-button').on('click',function () {
            saveInputTemplate('edit');
        });
        function saveInputTemplate(saveType) {
            var content,
                contentObj = {};
            var paramObj = $('#{0}-form'.format(saveType)).serializeObject();

            var action = saveType === 'add'?addInputTemplateAct : editInputTemplateAct;
            addDataOptionsOfDict('.validate',saveType);
            if($('#{0}-div'.format(saveType)).find('.validatebox-invalid').length){
                return false;
            }

            $('#{0}-input-template-tb'.format(saveType)).children('tbody').children('tr').each(function (i,el) {
                var $el = $(el);
                content = {};
                $el.children().each(function (j,ele) {
                    var $ele = $(ele);
                    if(ele.hasAttribute('conName')){
                        var conName = $ele.attr('conName');
                        if(conName==='isOpen' || conName ==='must'){
                            content[$ele.attr('conName')] = $ele.children('input').prop('checked')?1:0;
                        }else {
                            content[$ele.attr('conName')] = $.trim($ele.html());
                        }
                    }
                });
                contentObj[$el.attr('conName')] = content;
            });
            paramObj.caseType = $('#{0}-case-type'.format(saveType)).attr('value');
            paramObj.useageUserLevel = $('#edit-user-level').val();
            paramObj.openFlag = parseInt(paramObj.openFlag);
            paramObj.allowModify = parseInt(paramObj.allowModify);
            paramObj.effectiveFlag = $('#edit-div').data('effectiveFlag') == undefined ? 1 : $('#edit-div').data('effectiveFlag');
            paramObj.content = obj2str(contentObj).replace(/"/g,"'");
            $post(action,paramObj,function () {
                toast('模板保存成功！').ok();
                queryForInputTemplate();
                closeWin('#{0}-div'.format(saveType),'#{0}-form'.format(saveType));
            });
        }

        function addDataOptionsOfDict(selector,saveType) {
            $('#{0}-div'.format(saveType)).find(selector).attr('data-options','required:true').validatebox();
        }

        function inputTemplateEdit(paramObj){
            var inputTemplateEditListAct = makeAct('sceneCollecting/inputTemplate/'+paramObj.id);
            $("#edit_id").val(paramObj.id);
            $('#edit-user-level').val(paramObj.useageUserLevel).parent().dictSelect(paramObj.useageUserLevel);
            $('#edit-case-type').text(paramObj.caseTypeName).attr('value',paramObj.caseType);
            // $('#edit-case-type_displayValue').val(paramObj.caseTypeName);
            $('#edit-allow-modify').val(paramObj.allowModify).parent().dictSelect(paramObj.allowModify);
            $('#edit-open-flag').val(paramObj.openFlag).parent().dictSelect(paramObj.openFlag);
            $get(inputTemplateEditListAct,{},function(res) {
                $open('#edit-div',{width:800, title:'录入项模板修改'});
                $('#edit-input-template-tb').attr('wrap-height',window.height-280).children('tbody').template(str2obj(res.data.content));
            });
        }
        function inputTemplateAdd(){
            $post(inputTemplateAddListAct,{},function(res) {
                $open('#add-div',{width:800, title:'录入项模板新增'});
                $('#add-input-template-tb').attr('wrap-height',window.height-280).children('tbody').template(str2obj(res.data.content));
            });
        }

        function inputTemplateDelete(id,caseTypeName){
            $confirm('确定要删除{0}的录入项模板吗？'.format(caseTypeName),function (bol) {
                if(bol){
                    $post(inputTemplateDelAct,id,function () {
                        toast('删除成功！').ok();
                        queryForInputTemplate();
                    });
                }
            });
        }
        $filter('toBol',function () {
            return this.toString()==='1'?'':'notCheck';
        });

    });
}

/*文本信息模板管理模块*/
function sysWbxxmbgl(){
    importing('dict',function(){
        var $qr=$('#textTemplate-query-result');
        $(".dict").dict();

        $('[dict-id="edit-case-type"]').on('x-change',function(){
            getTextTemplateLabel('edit',$('#edit-div').data('paramObj'));
        });
        $('[dict-id="add-case-type"]').on('x-change',function(){
            getTextTemplateLabel('add');
        });

        var closeWin = function(winId,resetForm) {
            if(winId){
                $(winId).$close();
            }
            if(resetForm) {
                $(resetForm)[0].reset();
            }
            $('[contenteditable="true"]').html('');
            $(winId).find('.validate').removeClass('validatebox-invalid validatebox-text');
        };

        //查询textTemplate列表
        function queryForTextTemplate(){
            var templateType = $('#query-template-type').val(),
                templateName = $('input[name="templateName"]').val(),
                openFlag = $('#query-open-flag').val();
            $qr.pagingList({
                action:wbxxmbglListAct,
                params:{
                    templateType:templateType,
                    templateName:templateName,
                    openFlag:openFlag
                },
                callback:function(data){
                    $('#textTemplate-table>tbody').template(data);
                }
            });
        }
        function resetQueryCondition() {
            var $qb = $('.query-block');
            $qb.find('input:text').val('');
            $qb.find('.dict').dict();
        }
        queryForTextTemplate();
        //查询
        $('#wbxxmbgl-query-btn').on('click',function () {
            queryForTextTemplate();
        });
        //重置
        $('#wbxxmbgl-reset-btn').on('click',function () {
            resetQueryCondition();
        });
        //新增
        $qr.find('.cm-add-btn').on('click',function () {
            textTemplateAdd();
        });
        //修改
        $('#textTemplate-table').on('click','.textTemplate-edit',function(){
            var $this = $(this);
            var $tsParent = $this.parent();
            var paramObj = {
                allAvailable:$this.attr('allAvailable'),
                allowModify:$this.attr('allowModify'),
                caseType:$this.attr('caseType'),
                caseTypeName:$this.attr('caseTypeName'),
                commonFlag:$this.attr('commonFlag'),
                content:$this.attr('content'),
                id:$this.attr('param'),
                openFlag:$this.attr('openFlag'),
                templateName:$this.attr('templateName'),
                templateType:$this.attr('templateType'),
            };
            $('#edit-div').data('paramObj',paramObj);
            textTemplateEdit(paramObj);
        })
        //删除
            .on('click','.textTemplate-delete',function(){
                textTemplateDelete(this.getAttribute('param'),this.getAttribute('tpName'));
            });

        //弹窗底部标签点击和拖动事件注册
        $('.label-wrap').on('click','em',function () {
            $(this).parent().prev('.tp-content').append(this.outerHTML).append('<u>&#9;</u>');//append u标签 防止删除连续em时删除掉整行
        }).on('dragstart','em',function (e) {
            e.originalEvent.dataTransfer.setData('text',$(this).attr('val'));
        });
        $('.tp-content').on('dragover',function (e) {
            e.originalEvent.preventDefault();
        }).on('drop',function (e) {
            var orE = e.originalEvent,
                val = orE.dataTransfer.getData('text');
            orE.preventDefault();
            $(this).append($('em[val="{0}"]'.format(val)).clone()).append('<u>&#9;</u>');
        });
        //保存新增内容
        $('#add-save-button').on('click',function () {
            saveTextTemplateInfo('add');
        });
        //保存修改内容
        $('#edit-save-button').on('click',function () {
            saveTextTemplateInfo('edit');
        });
        //关闭新增弹窗
        $('#add-cancel-button').on('click',function(){
            closeWin('#add-div','#add-form');
        });
        //关闭修改弹窗
        $('#edit-cancel-button').on('click',function(){
            closeWin('#edit-div','#edit-form');
        });

        //所有案别通用change事件
        $('.wrap-win').on('click','[dict-name="commonFlag"] input:radio',function () {
            var $this = $(this),
                $ajlbWrap = $this.parent().parent().nextAll('.ajlb-wrap'),
                thisVal = $this.val();
            if(thisVal=='0'){
                $ajlbWrap.show();
            }else{
                $ajlbWrap.hide().find('input[name="caseType"]').val('AJLBDM');
                // $ajlbWrap.find('input[name="caseType_displayValue"]').val('');
            }
            $ajlbWrap.children('dict').trigger('x-change');
        });

        $filter('toSfCh',function () {
            return this.toString()==='1'?'是':'否';
        });
        //保存文本模板信息
        function saveTextTemplateInfo(saveType) {
            var saveObj = {},
                $wrapDiv = $('#{0}-div'.format(saveType)),
                action = saveType === 'add'?textTemplateAddAct:textTemplateEditAct,
                saveAjlb = $wrapDiv.find('#edit-common-flag').val() =='1'?false:true;
            $wrapDiv.find('.validate').attr('data-options','required:true').validatebox();
            // !saveAjlb && $wrapDiv.find('input[name="caseType_displayValue"]').removeClass('validatebox-invalid');
            if($wrapDiv.find('.validatebox-invalid').length){
                return false;
            }
            saveObj = $('#{0}-form'.format(saveType)).serializeObject();
            if(!saveAjlb){
                saveObj.caseType = 'AJLBDM';
            }
            saveObj.templateType = $('#{0}-template-type'.format(saveType)).val();
            saveObj.commonFlag = $('#{0}-common-flag'.format(saveType)).val();
            saveObj.allAvailable = $('#{0}-all-available'.format(saveType)).val();
            saveObj.allowModify = $('#{0}-allow-modify'.format(saveType)).val();
            saveObj.openFlag = $('#{0}-open-flag'.format(saveType)).val();
            saveObj.caseType = saveObj.caseType?saveObj.caseType:'AJLBDM';
            saveObj.content = $('#{0}-content'.format(saveType)).html().replace(/\<em.*?<\/em>/g,function(match){
                return '$#'+$(match).attr('val')+'#$'
            }).replace(/\<.*?\>/g,'');
            $post(action,saveObj,function () {
                toast('保存成功！').ok();
                queryForTextTemplate();
                closeWin('#{0}-div'.format(saveType),'#{0}-form'.format(saveType));
            });
        }
        function textTemplateEdit(paramObj){
            $('#edit-all-available').val(paramObj.allAvailable).parent().dictSelect(paramObj.allAvailable);
            $('#edit-allow-modify').val(paramObj.allowModify).parent().dictSelect(paramObj.allowModify);
            $('#edit-case-type').val(paramObj.caseType).parent().dictSelect(paramObj.caseType);
            // $('#edit-case-type_displayValue').val(paramObj.caseTypeName);
            $('#edit-content').html(paramObj.content);
            $('#edit-id').val(paramObj.id);
            $('#edit-open-flag').val(paramObj.openFlag).parent().dictSelect(paramObj.openFlag);
            $('#edit-template-name').val(paramObj.templateName);
            $('#edit-template-type').val(paramObj.templateType).parent().dictSelect(paramObj.templateType);
            paramObj.commonFlag == '0' && $('#edit-div').find('.ajlb-wrap').show();
            $open('#edit-div',{width:'max', height:'max',title:'文本信息模板修改'});
            $('#edit-common-flag').val(paramObj.commonFlag).parent().dictSelect(paramObj.commonFlag);
            getTextTemplateLabel('edit',paramObj);
        }
        function textTemplateAdd(){
            $open('#add-div',{width:'max',top:30,title:'文本信息模板新增'});
            $('#add-common-flag').val('1');
            getTextTemplateLabel('add');
        }
        //生成弹窗底部标签
        function getTextTemplateLabel(type,paramObj) {
            var caseType = $('#{0}-div'.format(type)).find('input[name="caseType"]').val(),
                caseType = caseType?caseType:'AJLBDM',
                params = caseType==='AJLBDM'?{}:caseType;
            $post(inputTemplateAddListAct,params,function(res) {
                var content = str2obj(res.data.content).where('o=>o.isOpen==1').select('o=>{name:o.name,lable:o.lable}');
                var textTp = $('#text-tp-label-tp');
                function contentReplace(match) {
                    match = match.replace('$#','').replace('#$','');
                    return $compile(textTp.html().replace(/^\s*/,'').replace(/\s*$/,''),content.where('o=>o.lable==="{0}"'.format(match)));
                }
                // $template('#template-item-table tbody',str2obj(res.data.content));
                $('#{0}-label-wrap'.format(type)).template(content);
                type === 'edit' && $('#{0}-content'.format(type)).html(paramObj.content.replace(/\$#\w+#\$/gm,contentReplace));
            });
        }

        function textTemplateDelete(id,tpName){
            $confirm('确定要删除"{0}"模板吗？'.format(tpName),function (bol) {
                if(bol){
                    $post(textTemplateDelAct,id,function () {
                        toast('"{0}"模板删除成功！'.format(tpName)).ok();
                        queryForTextTemplate();
                    });
                }
            });
        }



    });
}