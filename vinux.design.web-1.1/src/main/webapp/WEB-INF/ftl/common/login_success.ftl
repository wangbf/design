<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="renderer" content="webkit"> 
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<title>成功登录页面</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script type="text/javascript" src="//js/demo/jquery.1.8.3.js"></script>	

<#--引入公共JS配置-->
<@ftl.js_common_config/>
<script src="//js/demo/common/cart.vinux.js"></script>
<script>
$(function(){
	//如果不是弹窗登录,那么直接重定向
	if("${redirect!''}"=='1'){
		window.location.href="${backUrl!}";
	}else{
		$("body").dblclick(function(){
			$(".content p").show(300);
		});
		parent.location.reload();
		//window.parent.refresh();
		window.parent.location.href=  "${backUrl?default('')}";
		window.parent.vinuxGlobalCall.init();
	}
});
</script>
</head>

<body>
<div class="wrapper">

</div>

</body>
</html>
