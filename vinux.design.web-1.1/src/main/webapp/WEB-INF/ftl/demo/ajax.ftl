<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6 ielt7 ielt8 ielt9"><![endif]--><!--[if IE 7 ]><html lang="en" class="ie7 ielt8 ielt9"><![endif]--><!--[if IE 8 ]><html lang="en" class="ie8 ielt9"><![endif]--><!--[if IE 9 ]><html lang="en" class="ie9"> <![endif]--><!--[if (gt IE 9)|!(IE)]><!--> 
<html lang="en"><!--<![endif]--> 
	<head>
		<meta charset="utf-8">
		<title>Ajax列表展示 - 演示项目</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="/css/demo/bootstrap.min.css" rel="stylesheet">
		<link href="/css/demo/bootstrap-responsive.min.css" rel="stylesheet">
		<link href="/css/demo/site.css" rel="stylesheet">
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body >
		<div class="container">
			<@ftl.top_menu 1/>
			<div class="row">
				<@ftl.left_menu 6/>
				<div class="span9">
					<h1>
						学生信息
					</h1>
					<form id="form1" action="ajaxselect.vhtml" method="post">
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
						<tbody id="outHtml">
							<#if page.list?exists>
								<#list page.list as demo>
									<tr>
										<td>
											${demo.name}
										</td>
										<td>
											${demo.age}
										</td>
										<td>
											${(demo?exists && demo.sex == 1)?string('男','女')}
										</td>
										<td>
											${demo.school}
										</td>
										<td>
											${demo.address}
										</td>
										<td>
											<a href="toAjaxInsert.vhtml" class="view-link">Insert</a> | 
											<a href="toAjaxUpdate/${demo.id}.vhtml" class="view-link">Update</a> | 
											<!-- 
											<a href="toAjaxUpdate/${demo.id}/${demo.name}.vhtml" class="view-link">Update</a> | 
											-->
											<a href="javascript:void(0)" onclick="_delete(${demo.id})"  class="view-link">Delete</a>
										</td>
									</tr>
								</#list>
							</#if>
						</tbody>
					</table>				
					<div class="pagination">
						${page.ajaxHtml}
					</div>
					 </form>
				</div>
			</div>
		</div>
		
		<@ftl.js_common_config/>
		<script src="/js/demo/bootstrap.min.js"></script>
		<script src="/js/demo/site.js"></script>
		<script>
		function goPageByAjax(pageNo){
				$.post("ajaxselect.vhtml",{'pageNo':pageNo},function(result){
					outHtml(result);
				},'json');
			}
			function outHtml(result){
				var html = [];
				$.each(result.list,function(){
						html.push('<tr>');
						html.push('	<td>');
						html.push(this.name);
						html.push('	</td>');
						html.push('	<td>');
						html.push(this.age);
						html.push('	</td>');
						html.push('	<td>');
						html.push(this.sex == 1 ? '男' : '女');
						html.push('	</td>');
						html.push('	<td>');
						html.push(this.school);
						html.push('	</td>');
						html.push('	<td>');
						html.push(this.address);
						html.push('	</td>');
						html.push('<td>');
						html.push('	<a href="toAjaxInsert.vhtml" class="view-link">Insert</a> | ');
						html.push('	<a href="toAjaxUpdate/' + this.id + '.vhtml" class="view-link">Update</a> | ');
						html.push('	<a href="javascript:void(0)" onclick="_delete(' + this.id + ')"  class="view-link">Delete</a>');
						html.push('</td>');
						html.push('</tr>');
					
				});
				$("#outHtml").html(html.join(''));
				$(".pagination").html(result.ajaxHtml);
			
			}
			function _delete(id){
				C.ajax({
					url:"deleteAjax.vhtml",
					data:{"id":id},
					before:function(){
						C.show_loading("操作进行中，请稍候！");
					},
					success:function(result){
						if(C.islogin(result) && result.status == 200){
								C.hide_loading();
								C.Utils.myTips("操作成功，正在跳转！","success");
								C.Utils.refresh();
							}else{
								C.Utils.myTips("操作失败！","error");
							}
					}
				});
			}
		</script>
		
	</body>
</html>
