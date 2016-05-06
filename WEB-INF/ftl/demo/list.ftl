<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>form列表展示 - 演示项目</title>
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
				<@ftl.left_menu 5/>
				<div class="span9">
					<h1>
						学生信息
					</h1>
					<form id="formId" action="list.vhtml" method="post">
					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>
									姓名
								</th>
								<th>
									年龄
								</th>
								<th>
									性别
								</th>
								<th>
									学校
								</th>
								<th>
									地址
								</th>
								<th>
									添加/修改/删除
								</th>
							</tr>
						</thead>
						<#if page.list?exists>
								<#list page.list as demo>
									<tr>
										<td>
											${demo.name?default('')}
										</td>
										<td>
											${demo.age}
										</td>
										<td>
											<#if '${demo.sex}'=='1'>男</#if>
											<#if '${demo.sex}'=='2'>女</#if>
										</td>
										<td>
											${demo.school}
										</td>
										<td>
											${demo.address}
										</td>
										<td>
											<a href="toInsert.vhtml" class="view-link">Insert</a> | 
											<a href="toUpdate/${demo.id}.vhtml" class="view-link">Update</a> | 
											<a href="delete/${demo.id}.vhtml"  class="view-link">Delete</a>
										</td>
									</tr>
								</#list>
							</#if>
						<tbody>
							
						</tbody>
					</table>				
					<div class="pagination">
					   ${page.pageHtml}
					</div>
					</form>
				</div>
			</div>
		</div>
		<@ftl.js_common_config/>
		<script src="/js/demo/bootstrap.min.js"></script>
		<script src="/js/demo/site.js"></script>
		<script>
		
		</script>
	</body>
</html>
