<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>购物车-1</title>
<style>
	 	body { font: 14px/1.5 "微软雅黑"; }
        .error-bg { background-color:#F6F6F6; }
        .cart .error { width: 100%; height: auto; min-height: 30px; overflow: hidden; float: left; }
        .cart .error .main-img-a { width: 100%; height:auto; min-height:580px; overflow: hidden; text-align: center; float: left; margin-top:100px; }
        .cart .error .error { background:url(../../../images/error.png) top no-repeat; }
        .cart .error .img-ct { width: 80%; height: auto; min-height:30px; overflow: hidden; text-align: center; margin:0 auto; margin-top: 480px; }
        .cart .error .img-ct label { font-size: 60px; color: #787878;  }
        .cart .error .main-img-b { width: 100%; height: 120px; padding-top: 40px; overflow: hidden; float: left; text-align: center; }
        .cart .error .main-img-b .ct { width: auto; height:170px; margin: 0 auto; overflow: hidden; display: inline-block; font-weight: 700; }
        .cart .error .main-img-b span { padding-top: 5px; margin-right: 5px; float: left; border-radius: 0.175em; }
        .cart .error .main-img-b a { font-size:48px; float: left; margin-right: 20px; border-radius: 0.115em; color:#fff; }
        .cart .error .main-img-b a:focus { border-bottom:0px; margin-top:7px;}
        .cart .error .main-img-b .img-button-a { padding: 10px 85px 10px 145px; background-color: #BF2429; border-bottom: 8px solid #9E1F24; background-image: url("data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2214px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2014%2014%22%20style%3D%22enable-background%3Anew%200%200%2014%2014%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20style%3D%22fill%3A%23FFFFFF%3B%22%20d%3D%22M5%2C3V0L1%2C4l4%2C4V5c0%2C0%2C6%2C0%2C6%2C3s-5%2C4-5%2C4v2c0%2C0%2C7-1%2C7-6C13%2C4%2C8%2C3%2C5%2C3z%22%2F%3E%3C%2Fsvg%3E"); background-size:48px 48px; background-position:70px 23px; background-repeat: no-repeat; }
        .cart .error .main-img-b .img-button-b { padding: 10px 85px 10px 145px; background-color: #898989; border-bottom: 8px solid #747474; background-image: url("data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2214px%22%20height%3D%2214px%22%20viewBox%3D%220%200%2014%2014%22%20style%3D%22enable-background%3Anew%200%200%2014%2014%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M3%2C0H1C0.447%2C0%2C0%2C0.447%2C0%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C4%2C0.447%2C3.553%2C0%2C3%2C0z%20M8%2C0H6%20C5.447%2C0%2C5%2C0.447%2C5%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C9%2C0.447%2C8.553%2C0%2C8%2C0z%20M13%2C0h-2c-0.553%2C0-1%2C0.447-1%2C1v2%20c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V1C14%2C0.447%2C13.553%2C0%2C13%2C0z%20M3%2C5H1C0.447%2C5%2C0%2C5.447%2C0%2C6v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2%20c0.553%2C0%2C1-0.447%2C1-1V6C4%2C5.447%2C3.553%2C5%2C3%2C5z%20M8%2C5H6C5.447%2C5%2C5%2C5.447%2C5%2C6v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V6%20C9%2C5.447%2C8.553%2C5%2C8%2C5z%20M13%2C5h-2c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1V6C14%2C5.447%2C13.553%2C5%2C13%2C5z%20M3%2C10%20H1c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1v-2C4%2C10.447%2C3.553%2C10%2C3%2C10z%20M8%2C10H6c-0.553%2C0-1%2C0.447-1%2C1v2%20c0%2C0.553%2C0.447%2C1%2C1%2C1h2c0.553%2C0%2C1-0.447%2C1-1v-2C9%2C10.447%2C8.553%2C10%2C8%2C10z%20M13%2C10h-2c-0.553%2C0-1%2C0.447-1%2C1v2c0%2C0.553%2C0.447%2C1%2C1%2C1h2%20c0.553%2C0%2C1-0.447%2C1-1v-2C14%2C10.447%2C13.553%2C10%2C13%2C10z%22%2F%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3C%2Fsvg%3E");  background-size:48px 48px; background-position:70px 23px; background-repeat: no-repeat; }

	</style>
<style>
p{font-weight: 700;margin-top: 10px;display: none;text-align: left;}
</style>
<link href="//css/demo/base.css" rel="stylesheet" type="text/css" />
<script src="//js/demo/jquery.1.8.3.js"></script>
<script type="text/javaScript">
$(function(){
	$("body").dblclick(function(){
		$("p").show(300);
	});
});
</script>
	<body class="error-bg">
	
	<div data-role="page" class="cart " id="shopcart-a" data-title="Inbox" data-url="demo-page">
		
		<div class="error">
			<div class="main-img-a error">
				<div class="img-ct">
					<label class="e78 z24">网络连接失败，请稍后再试！</label>
				</div>
			</div>
			<div class="main-img-b">
				<div class="ct">
					<a href="${backurl?default('')}" class="img-button-b e89 fff" style = "background-color:#bf2429;text-decoration:none;">返回首页</a>
				</div>
			</div>
				<p>异常信息：${message?default('')}</p>
				<p>异常行号：${line?default('')}</p>
				<p>异常文件：${clazz?default('')}</p>
				<p>异常方法：${methodName?default('')}</p>
		</div>

	</div>
</body>
</html>
