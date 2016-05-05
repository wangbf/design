<#ftl strip_whitespace=true>
<#-- 页面公共ftl 引用处理 -->
<#macro top_menu index>
	<div class="navbar">
				<div class="navbar-inner">
					<div class="container">
						<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> 
							<span class="icon-bar"></span> 
							<span class="icon-bar"></span> 
							<span class="icon-bar"></span> 
						</a> 
						<a class="brand" href="javascript:void(0);">测试项目</a>
						<div class="nav-collapse">
							<ul class="nav">
								<li class="${(index == 1)?string('active','')}">
									<a href="/">Dashboard</a>
								</li>
							</ul>
							<form class="navbar-search pull-left" action="">
								<input type="text" class="search-query span2" placeholder="Search" />
							</form>
							<ul class="nav pull-right">
								<li>
									<a href="profile.vhtml">${adminToken.loginName}</a>
								</li>
								<li>
									<a href="javascript:C.fn.menu_logout();">Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
</#macro>
   
	

<#macro left_menu index>
	<div class="span3">
		<div class="well" style="padding: 8px 0;">
			<ul class="nav nav-list">
				<li class="nav-header">
					Akira
				</li>
				<li  class="${(index == 1)?string('active','')}">
					<a href="index.vhtml"><i class="icon-home"></i> Dashboard</a>
				</li>
				<li  class="${(index == 2)?string('active','')}">
					<a href="activity.vhtml"><i class="icon-list-alt"></i> Activity</a>
				</li>
				<li class="nav-header">
					Your Account
				</li>
				<li  class="${(index == 5)?string('active','')}">
					<a href="list.vhtml"><i class="icon-user"></i> 普通分页(增删改查)</a>
				</li>
				<li  class="${(index == 6)?string('active','')}">
					<a href="ajax.vhtml"><i class="icon-user"></i> Ajax分页</a>
				</li>
				
				<li  class="${(index == 3)?string('active','')}">
					<a href="profile.vhtml"><i class="icon-user"></i> Profile</a>
				</li>
				<li  class="${(index == 7)?string('active','')}">
					<a href="/image/index.vhtml"><i class="icon-user"></i> 上传实例</a>
				</li>
				<li class="divider">
				</li>
				<li  class="${(index == 4)?string('active','')}">
					<a href="help.vhtml"><i class="icon-info-sign"></i> Help</a>
				</li>
			</ul>
		</div>
	</div>
</#macro>
 
<#--弹窗初始化参数js-->
<#macro js_common_config>
	<@api target="configTag">
		<script>
	 		var V = {} || V ;
	 		<#--会员系统的相关地址-->
	 		V.member = new Object() ;
	 		<#--当前系统的相关地址-->
	 		V.domain = new Object();
	 		<#--当前域名-->
	 		V.domain.url = "${outTagName.domain?default('')}" || "";
	 		<#--会员域名-->
			V.member.domian= "${outTagName.memberDomain?default('')}" || "";
		 </script>
		 <script src="/js/common/jquery.min.js"></script>
		 <script src="${outTagName.memberDomain?default('会员域名未设置')}/js/open/vinuxGlobalCall.js"></script>
		 <script src="/js/common/v.js"></script>
		 
	</@api>
</#macro>
 
 