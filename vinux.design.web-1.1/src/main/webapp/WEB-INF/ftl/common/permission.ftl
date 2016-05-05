<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无权限访问页面</title>

<!--公用-->
<link href="/admin/base.css" rel="stylesheet" type="text/css" />

</head>
<body class="f2">
<div class="wrapper">

	<!--内容-->
	<div class="content">
		<div class="error">
			<div class="main-img-a wuquanxian">
				<div class="img-ct">
					<label class="e78 z24">你在访问[${needType?default('')}]角色的操作页面,而您的角色是[${nowType?default('')}]!!!</label>
				</div>
			</div>
			<div class="main-img-b">
				<div class="ct">
					<span class="e78">您还可以：</span>
					<a href="/shop/index.vhtml" class="img-button-b e89 fff">返回首页</a>
					<a href="${backLogin?default('javascript:alert(\'地址不存在\')')}" class="img-button-b e89 fff">更换[${needType?default('')}]帐号登录</a>
				</div>
			</div>
		</div>
	</div>
	<!--页脚
	<div class="footer">
		<div class="main">
			<div class="left">vinuxpost.com版权所有 2004-2014 ICP证：京B2-20100257 </div>
		</div>
	</div>
	-->
</div>
</body>
</html>
