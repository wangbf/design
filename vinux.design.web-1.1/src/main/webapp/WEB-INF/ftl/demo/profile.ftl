<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Profile - Akira</title>
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
						Edit Your Profile
					</h1>
					<form id="edit-profile" class="form-horizontal">
						<fieldset>
							<legend>Your Profile</legend>
							<div class="control-group">
								<label class="control-label" for="input01">careFirstOrderMedia</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.careFirstOrderMedia?default('')}" />
								</div>
							</div>
							
							<div class="control-group">
								<label class="control-label" for="input01">firstOrder</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.firstOrder?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">loginName</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.loginName?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">nickname</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.nickname?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">roleId</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.roleId?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">roleName</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.roleName?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">roleType</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.roleType?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">sellerType</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.sellerType?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">userId</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.userId?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">userName</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.userName?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">userType</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.userType?default('')}" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">vinuxId</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="${adminToken.vinuxId?default('')}" />
								</div>
							</div>
							
							<div class="form-actions">
								<button type="submit" class="btn btn-primary">Save</button> <button class="btn">Cancel</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<@ftl.js_common_config/>
		<script src="/js/demo/bootstrap.min.js"></script>
		<script src="/js/demo/site.js"></script>
	</body>
</html>
