<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Update Ajax操作 - 演示项目</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="/css/demo/bootstrap.min.css" rel="stylesheet">
		<link href="/css/demo/bootstrap-responsive.min.css" rel="stylesheet">
		<link href="/css/demo/site.css" rel="stylesheet">
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body>
		<div class="container">
			<@ftl.top_menu 1/>
			<div class="row">
				<@ftl.left_menu 3/>
				<div class="span9">
					<h1>
						Update
					</h1>
					<form id="edit-profile" class="form-horizontal" action="/demo/ajaxSaveOrUpdate.vhtml" method="post">
						<fieldset>
							<legend>Your Profile</legend>
							<div class="control-group">
								<label class="control-label" for="input01">姓名</label>
								<div class="controls">
									<input type="hidden" name="id" class="input-xlarge" id="input01" value="${demo.id?default('')}" />
									<input type="text" name="name" class="input-xlarge" placeholder="真实姓名" check="请输入真实姓名" value="${demo.name?default('')}" />
								</div>
							</div>
							
							<div class="control-group">
								<label class="control-label" for="input01">年龄</label>
								<div class="controls">
									<input type="text" name="age" class="input-xlarge" placeholder="请输入年龄" check="请输入年龄,3位有效数值" checkType="number" value="${demo.age?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">学校</label>
								<div class="controls">
									<input type="text" name="school" class="input-xlarge" placeholder="请输入学校" check="请输入学校" value="${demo.school?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">性别</label>
								<div class="controls">
									<select name="sex">
										<option value="1" ${(demo.sex == 1 )?string('selected="selected"','')}>男</option>
										<option value="2" ${(demo.sex == 2 )?string('selected="selected"','')}>女</option>
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">地址</label>
								<div class="controls">
									<input type="text" name="address" class="input-xlarge"  placeholder="请输入地址" check="请输入地址" value="${demo.address?default('')}" />
								</div>
							</div>
							
							<div class="form-actions">
								<button type="button" id="_submit" class="btn btn-primary">Save</button> <button type="reset"  class="btn">Cancel</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<@ftl.js_common_config/>
		<script src="/js/demo/bootstrap.min.js"></script>
		<script src="/js/demo/site.js"></script>
		<script>
			$(function(){
				$("#_submit").click(function(){
					for(var i=0;i < $("[check]").length ;i++){
						var self = $($("[check]")[i]);
						var value = $.trim(self.val());
						var type = self.attr("checkType");
						if(type && type == 'number'){
							var p = /^[0-9]{0,3}$/;
							if(!p.test(value)){
								var check = self.attr("check");
								C.Utils.myTips(check);
								return !1;
							}
						}else{
							if(value == ''){
								var check = self.attr("check");
								C.Utils.myTips(check);
								return !1;
							}
						}
					}
					C.ajax({
						data:$("#edit-profile").serialize(),
						url:"/demo/ajax/saveOrUpdate.vhtml",
						before:function(){
							C.show_loading("操作进行中，请稍候！");
						},
						success:function(result){
							if(C.islogin(result) && result.status == 200){
								C.hide_loading();
								C.Utils.myTips("操作成功，正在跳转！","success");
								C.Utils.refresh('/demo/ajax.vhtml');
							}else{
								C.Utils.myTips("操作失败！","error");
							}
						}
					});
					
				});
			});
		</script>
	</body>
</html>
