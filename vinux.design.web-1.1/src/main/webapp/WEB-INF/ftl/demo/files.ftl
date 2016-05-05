<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Files - Akira</title>
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
						Files
					</h1>
					<ul class="files zebra-list">
						<li>
							<i class="icon-file"></i> <a class="title" href="#">List of Customer Emails</a> <span class="meta">Uploaded <em>2 days ago</em> by <em>John</em></span>
						</li>
						<li>
							<i class="icon-file"></i> <a class="title" href="#">Weekly Stat Report</a> <span class="meta">Uploaded <em>5 days ago</em> by <em>John</em></span>
						</li>
						<li>
							<i class="icon-file"></i> <a class="title" href="#">Company Newsletter - Jan 2012</a> <span class="meta">Uploaded <em>2 weeks ago</em> by <em>Jill</em></span>
						</li>
					</ul>
					<a class="toggle-link" href="#new-file"><i class="icon-plus"></i> New File</a>
					<form id="new-file" class="form-horizontal hidden">
						<fieldset>
							<legend>New File</legend>
							<div class="control-group">
								<label class="control-label" for="textarea">Title</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="fileInput">File</label>
								<div class="controls">
									<input class="input-file" id="fileInput" type="file" />
								</div>
							</div>
							<div class="form-actions">
								<button type="submit" class="btn btn-primary">Upload</button> <button class="btn">Cancel</button>
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
