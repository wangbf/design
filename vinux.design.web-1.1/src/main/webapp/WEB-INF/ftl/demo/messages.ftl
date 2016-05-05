<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Messages - Akira</title>
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
						Messages
					</h1>
					<h2>
					</h2>
					<ul class="messages">
						<li class="well">
							<p class="message">
								Ut fermentum tortor at enim blandit gravida et et odio. Quisque eu libero vitae nibh malesuada sagittis. Integer eget turpis velit. Maecenas auctor eleifend ante in dictum. Proin mattis dictum imperdiet. Nam sed leo ut massa volutpat pharetra eget vel nisi. Vestibulum vel nunc felis, in ultrices neque. Duis ut rutrum lectus. Vivamus ultricies aliquam est ac gravida. Nulla facilisis sem sed est sagittis sed auctor turpis mollis. Duis ultricies viverra dapibus. Nunc lectus quam, rutrum aliquet cursus vitae, gravida vel arcu.
							</p>
							<span class="meta">Written <em>2 weeks ago</em> by <em>Jill</em></span>
						</li>
						<li class="well">
							<p class="message">
								Donec id consequat odio. Etiam felis tellus, pretium tincidunt malesuada quis, vestibulum a leo. Cras tortor enim, elementum nec pretium non, vestibulum sit amet massa. Vivamus non velit quis purus luctus pretium et ut quam. Aenean eu urna nulla, quis iaculis nunc. Nam consectetur erat nec turpis dapibus ac sodales dolor pulvinar. Fusce eu consectetur risus. In ut erat sit amet nunc tempor mattis sit amet id diam.
							</p>
							<span class="meta">Written <em>1 week ago</em> by <em>John</em></span>
						</li>
						<li class="well">
							<p class="message">
								Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus enim nibh, congue nec tincidunt sed, luctus ullamcorper leo. Nunc ac mauris augue. Nam non nulla tellus, vitae volutpat nibh. Maecenas fringilla vestibulum neque vitae tristique. Ut fermentum accumsan dolor, ut tincidunt lacus dictum non. Proin non ultrices libero. Praesent hendrerit, dolor ut facilisis porta, lorem massa ullamcorper dolor, at dictum elit augue vel lorem. Pellentesque vitae elit quis erat congue gravida ac sed urna. Vivamus vitae purus lectus. Maecenas nec dui lorem. Mauris viverra, est et mattis malesuada, sapien lectus congue justo, eget ultricies lorem ante a nulla. In facilisis nisi in dolor ultricies id hendrerit tortor suscipit.
							</p>
							<span class="meta">Written <em>4 days ago</em> by <em>Jill</em></span>
							<ul class="messages">
								<li class="well">
									<p class="message">
										Nascetur ridiculus mus. Phasellus enim nibh, congue nec tincidunt sed, luctus ullamcorper leo. Nunc ac mauris augue. Nam non nulla tellus, vitae volutpat nibh. Maecenas fringilla vestibulum neque vitae tristique. Ut fermentum accumsan dolor, ut tincidunt lacus dictum non. Proin non ultrices libero. Praesent hendrerit, dolor ut facilisis porta, lorem massa ullamcorper dolor, at dictum elit augue vel lorem. Pellentesque vitae elit quis erat congue gravida ac sed urna. Vivamus vitae purus lectus. Maecenas nec dui lorem. Mauris viverra, est et mattis malesuada, sapien lectus congue justo, eget ultricies lorem ante a nulla.
									</p>
									<span class="meta">Written <em>2 days ago</em> by <em>Jill</em></span>
									<ul class="messages">
										<li class="well">
											<p class="message">
												Etiam felis tellus.
											</p>
											<span class="meta">Written <em>1 day ago</em> by <em>Jill</em></span>
										</li>
									</ul>
								</li>
								<li class="well">
									<p class="message">
										Sapien lectus congue justo, eget ultricies lorem ante a nulla.
									</p>
									<span class="meta">Written <em>1 day ago</em> by <em>Jill</em></span>
								</li>
							</ul>
						</li>
					</ul>
					<a class="toggle-link" href="#message-reply"><i class="icon-plus"></i> Reply</a>
					<form id="message-reply" class="form-horizontal hidden">
						<fieldset>
							<legend>Reply</legend>
							<div class="control-group">
								<label class="control-label" for="textarea">Message</label>
								<div class="controls">
									<textarea class="input-xlarge" id="textarea" rows="4"></textarea>
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
