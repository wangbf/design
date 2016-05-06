  <#--以文本方式输出(防止Html输出)-->
  <#macro outText text>
  	<#escape x as x?html>
		${text?default('')}
	</#escape>
  </#macro>
 <#--以文本方式输出(防止Html输出)   截串-->
 <#macro subOutText text,begin,end>
  	<#escape x as x?html>
  		${FSubStr(text?default(''),begin,end)}
		
	</#escape>
  </#macro>
  
