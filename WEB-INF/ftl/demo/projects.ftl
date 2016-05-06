<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Projects - Akira</title>
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
						Projects
					</h1>
					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>
									Name
								</th>
								<th>
									Client
								</th>
								<th>
									Tasks
								</th>
								<th>
									Messages
								</th>
								<th>
									Files
								</th>
								<th>
									Progress
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									Nike.com Redesign
								</td>
								<td>
									Monsters Inc
								</td>
								<td>
									<span class="badge">11</span>
								</td>
								<td>
									<span class="badge">2</span>
								</td>
								<td>
									<span class="badge">4</span>
								</td>
								<td>
									<div class="progress">
										<div class="bar" style="width: 60%;"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									Twitter Server Consulting
								</td>
								<td>
									Bad Robot
								</td>
								<td>
									<span class="badge">7</span>
								</td>
								<td>
									<span class="badge">3</span>
								</td>
								<td>
									<span class="badge">0</span>
								</td>
								<td>
									<div class="progress">
										<div class="bar" style="width: 90%;"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									Childrens Book Illustration
								</td>
								<td>
									Evil Genius
								</td>
								<td>
									<span class="badge">10</span>
								</td>
								<td>
									<span class="badge">2</span>
								</td>
								<td>
									<span class="badge">1</span>
								</td>
								<td>
									<div class="progress">
										<div class="bar" style="width: 20%;"></div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<a class="toggle-link" href="#new-project"><i class="icon-plus"></i> New Project</a>
					<form id="new-project" class="form-horizontal hidden">
						<fieldset>
							<legend>New Project</legend>
							<div class="control-group">
								<label class="control-label" for="input01">Project Name</label>
								<div class="controls">
									<input type="text" class="input-xlarge" id="input01" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="select01">Client</label>
								<div class="controls">
									<select id="select01"> <option>-- Select client --</option> <option>Bad Robot</option> <option>Evil Genius</option> <option>Monsters Inc</option> </select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="textarea">Project Summary</label>
								<div class="controls">
									<textarea class="input-xlarge" id="textarea" rows="3"></textarea>
								</div>
							</div>
							<div class="form-actions">
								<button type="submit" class="btn btn-primary">Create</button> <button class="btn">Cancel</button>
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
