<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title><s:text name="question.title"/></title>
    <link rel="stylesheet" type="text/css" href="/sshdzy/css/question.css">
    <link rel="stylesheet" href="/sshdzy/css/bootstrap.min.css">
    <link rel="stylesheet" href="/sshdzy/css/flat-ui.min.css">
    <script src="/sshdzy/js/jquery-1.7.2.min.js"></script>
    <script src="/sshdzy/js/bootstrap.min.js"></script>
    <script lang="javascript" type="text/javascript" src="/sshdzy/js/question.js"></script>
    <script type="text/javascript" src="/sshdzy/js/leipi.form.build.core.js"></script>
    <script type="text/javascript" src="/sshdzy/js/leipi.form.build.plugins.js"></script>
</head>
<body>
	<h1><s:text name="question.title"/></h1>
	<div class="span6">
        <div class="clearfix">
            <h3><s:text name="question.left.title"/></h3>
            <s:textfield id="title" key="question.name"/>
            <hr>
            <div id="build">
                <form id="target" class="form-horizontal">
                    <fieldset>
                        <div style="height: 60px;">
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <div class="span6">
        <h3><s:text name="question.right.title"/></h3>
        <hr>
        <div class="tabbable">
            <ul class="nav nav-tabs" id="navtab">
                <li class="active"><a href="#1" data-toggle="tab"><s:text name="question.li.name"/></a></li>
            </ul>
            <form class="form-horizontal" id="components">
                <fieldset>
                    <div class="tab-content">
                        <div class="tab-pane active" id="1">
                            <div class="control-group component" rel="popover" title="复选控件" trigger="manual" data-content="<form class='form'><div class='controls'><label class='control-label'>题目</label> <input type='text' id='orgname' placeholder='必填项'><label class='control-label'>选项</label><textarea style='min-height: 200px' id='orgvalue'></textarea><p class='help-block'>一行一个选项</p><hr/><button class='btn btn-info' type='button'>确定</button><button class='btn btn-danger' type='button'>取消</button></div></form>">
                                <label class="control-label leipiplugins-orgname"><s:text name="question.checkbox"/></label>
                                <div class="controls leipiplugins-orgvalue">
                                    <label class="checkbox">
                                  <input type="checkbox" name="leipiNewField" title="复选框" value="选项1" class="leipiplugins" leipiplugins="checkbox">
                                  <s:text name="question.checkbox.one"/>
                                </label>
                                    <label class="checkbox">
                                  <input type="checkbox" name="leipiNewField" title="复选框" value="选项2" class="leipiplugins" leipiplugins="checkbox">
                                  <s:text name="question.checkbox.two"/>
                                </label>
                                </div>
                            </div>
                            <div class="control-group component" rel="popover" title="单选控件" trigger="manual" data-content="<form class='form'><div class='controls'><label class='control-label'>题目</label> <input type='text' id='orgname' placeholder='必填项'><label class='control-label'>选项</label><textarea style='min-height: 200px' id='orgvalue'></textarea><p class='help-block'>一行一个选项</p><hr/><button class='btn btn-info' type='button'>确定</button><button class='btn btn-danger' type='button'>取消</button></div></form>">
                                <label class="control-label leipiplugins-orgname"><s:text name="question.radio"/></label>
                                <div class="controls leipiplugins-orgvalue">
                                    <label class="radio">
                                  <input type="radio" name="leipiNewField" title="单选框" value="选项1" class="leipiplugins" leipiplugins="radio">
                                  <s:text name="question.radio.one"/>
                                </label>
                                    <label class="radio">
                                  <input type="radio" name="leipiNewField" title="单选框" value="选项2" class="leipiplugins" leipiplugins="radio">
                                  <s:text name="question.radio.two"/>
                                </label>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="5">
                            <textarea id="source" class="span6"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
          				<button type="button" class="btn btn-primary" id="question_check">确认</button>
        				</div>
                </fieldset>
            </form>
        </div>
    </div>
</body>
</html>