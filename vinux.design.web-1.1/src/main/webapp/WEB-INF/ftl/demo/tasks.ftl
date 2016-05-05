<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Tasks - Akira</title>
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
						Tasks
					</h1>
					<ul class="tasks zebra-list">
						<li>
							<input type="checkbox" /> <span class="title">Thank Bill for loaning his tools last weekend</span> <span class="meta">Created <em>1 week ago</em> by <em>Jill</em></span>
						</li>
						<li>
							<input type="checkbox" /> <span class="title">Pay internet bill</span> <span class="meta">Created <em>1 week ago</em> by <em>Jill</em></span>
						</li>
						<li>
							<input type="checkbox" /> <span class="title">Finish reading Game of Thrones</span> <span class="meta">Created <em>1 week ago</em> by <em>Jill</em></span>
						</li>
						<li>
							<input type="checkbox" /> <span class="title">Buy sunscreen for the next summer day trip</span> <span class="meta">Created <em>1 week ago</em> by <em>Jill</em></span>
						</li>
						<li>
							<input type="checkbox" /> <span class="title">Send a birthday card to Frankie</span> <span class="meta">Created <em>1 week ago</em> by <em>Jill</em></span>
						</li>
					</ul>
					<a class="toggle-link" href="#new-task"><i class="icon-plus"></i> New Task</a>
					<form id="new-task" class="form-horizontal hidden">
						<fieldset>
							<legend>New Task</legend>
							<div class="control-group">
								<label class="control-label" for="textarea">Task Details</label>
								<div class="controls">
									<textarea class="input-xlarge" id="textarea" rows="2"></textarea>
								</div>
							</div>
							<div class="form-actions">
								<button type="submit" class="btn btn-primary">Create</button> <button class="btn">Cancel</button>
							</div>
						</fieldset>
					</form>
					<h2>
						Completed Tasks
					</h2>
					<ul class="tasks done">
						<li>
							<i class="icon-ok"></i> <span class="title">Wash the Car</span> <span class="meta">Completed <em>2 days ago</em> by <em>John</em></span>
						</li>
						<li>
							<i class="icon-ok"></i> <span class="title">Call the plumber</span> <span class="meta">Completed <em>5 days ago</em> by <em>John</em></span>
						</li>
						<li>
							<i class="icon-ok"></i> <span class="title">Try that new cookie recipe</span> <span class="meta">Completed <em>2 weeks ago</em> by <em>Jill</em></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<@ftl.js_common_config/>
		<script src="/js/demo/bootstrap.min.js"></script>
		<script src="/js/demo/site.js"></script>
	</body>
</html>
