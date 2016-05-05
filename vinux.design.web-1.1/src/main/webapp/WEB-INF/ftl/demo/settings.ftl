<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Settings - Akira</title>
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
				<@ftl.left_menu 1/>
				<div class="span9">
					<h1>
						Settings
					</h1>
					<form id="edit-profile" class="form-horizontal">
						<fieldset>
							<legend>Configure Your Settings</legend>
							<div class="control-group">
								<label class="control-label" for="input01">Notifications</label>
								<div class="controls">
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList1" value="option1" checked="checked" />
										Tasks
									</label>
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList2" value="option2" />
										Messages
									</label>
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList3" value="option3" />
										Files
									</label>
									<p class="help-block">Shows pop-up notifications of new items.</p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="input01">Notification Email</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" value="john.smith@example.org" />
									<p class="help-block">Leave blank to use your profile email address.</p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="optionsCheckboxList">Super Admins</label>
								<div class="controls">
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList1" value="option1" checked="checked" />
										John Smith
									</label>
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList2" value="option2" />
										Jill Jackson
									</label>
									<label class="checkbox">
										<input type="checkbox" name="optionsCheckboxList3" value="option3" />
										Bill Kidman
									</label>
									<p class="help-block"><strong>Note:</strong> Super Admins get access to all projects.</p>
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