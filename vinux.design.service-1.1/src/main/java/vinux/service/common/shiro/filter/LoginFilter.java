package vinux.service.common.shiro.filter;

import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import vinux.service.common.config.OpenUrlConfig;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.common.statics.LogConstant;
import vinux.service.common.util.StringUtils;
import vinux.service.common.util.VinuxPostMethod;
import vinux.service.core.exception.VException;
import vinux.service.core.utils.LoggerUtils;
import vinux.service.core.utils.SystemLogUitls;
/**
 * 判断是否是登录的
 * @author zhoubaicheng
 *
 */
public class LoginFilter extends AccessControlFilter {
	final Class<?> SELF = LoginFilter.class;
	private static final String URL_MEMBER_INFO_SESSIONID = OpenUrlConfig.getProperty("member.info.sessionId");
	
	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {
		String accessToken = request.getParameter("_access_token");
		//如果携带了_access_token，表明是第一次跳转过来，要从会员获取一次用户信息
		if (StringUtils.isNotBlank(accessToken)) {
			LoggerUtils.fmtDebug(SELF, "从卖家中心跳转过来，携带的_access_token：%s", accessToken);
			ShiroToken shiroToken = getUserInfoBySessionId(accessToken);
			if (null == shiroToken) {
				LoggerUtils.fmtError(SELF, "通过sessionId获取用户信息失败, accessToken：%s", accessToken);
				return false;
			} else {
				shiroToken.login();
				LoggerUtils.debug(SELF, "登录成功，通过sessionId从会员获取用户信息成功");
				return true;
			}
		} else {
			//如果请求没有携带_access_token，就按正常逻辑处理，这个分支里的代码没有修改
			ShiroToken token = TokenManager.getToken();
			Subject subject = getSubject(request, response);
			if(token!=null){// && isEnabled()
				return true;
			}else if (isLoginRequest(request, response)) {
	            return true;
	        } else {
	        	token = TokenManager.getToken();
	            
	            if(null== token){
	            	ShiroToken u = (ShiroToken) subject.getPrincipal();
	            	  if(u!=null){
//	            		  TokenManager.seToken(u);
	            		  LoggerUtils.debug(getClass(),"info success!!!");
	            	  }else{
	            		  HttpServletResponse hresponse = (HttpServletResponse)response;
	            		  HttpServletRequest hrequest = (HttpServletRequest)request;
	            		  if ("XMLHttpRequest".equalsIgnoreCase(hrequest.getHeader("X-Requested-With"))) {// ajax请求
	            			  LoggerUtils.debug(getClass(), "当前用户没有登录，并且是Ajax请求！");
	            			  
	            			  hresponse.setCharacterEncoding("UTF-8");
	        				  PrintWriter out = hresponse.getWriter();
	        				  
	        				  Map<String,String> resultMap = new HashMap<String,String>();
	        				  resultMap.put("login_status", "300");
	        				  resultMap.put("message", "当前用户没有登录！");
	        				  out.println(JSONObject.fromObject(resultMap).toString());
	        				  out.flush();
	        				  out.close();
        				  } else{
        					  LoggerUtils.debug(getClass(), "当前用户没有登录，并且普通的HTTP请求！");
        				  }
	            		  return false ;
	            	  }
	            }else{
	            	LoggerUtils.debug(getClass(),"info success!!!");
	            }
	           
	            return true;
	        }
		}
			
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request,
			ServletResponse response) throws Exception {
		saveRequestAndRedirectToLogin(request, response);
		LoggerUtils.error(getClass(),"user info is empty");
		return false;
	}

	/**
	 * 通过sessionId从会员系统获取用户信息
	 * @param sessionId
	 * @return
	 */
	private ShiroToken getUserInfoBySessionId(String sessionId) {
		LoggerUtils.fmtDebug(SELF, "通过sessionId获取去会员系统获取用户信息, sessionId：%s", sessionId);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sessionId", sessionId);
		JSONObject result = null;
		Exception methodMessage = null;
		ShiroToken token = null;
		try {
			VinuxPostMethod vinux = new VinuxPostMethod(URL_MEMBER_INFO_SESSIONID, map);
			result = (JSONObject) vinux.executeMethod("JSONObject");
			boolean isInvalidate = result.getBoolean("isInvalidate"); //判断sessionId是否过期
			if (true != isInvalidate) {
				LoggerUtils.fmtError(SELF, "sessionId已经过期:%s", sessionId);
				throw new VException("sessionId已经过期:%s" + sessionId);
			}
			String userInfo = result.getString("userInfo");
			if (StringUtils.isNotBlank(userInfo)) {
				userInfo = URLDecoder.decode(userInfo, "utf-8");
				token = new ShiroToken(userInfo);
			}
		} catch (Exception e) {
			methodMessage = e;
		} finally {
			SystemLogUitls.info(URL_MEMBER_INFO_SESSIONID, JSONObject.fromObject(map).toString(), result.toString(),
					LoginFilter.class, sessionId, methodMessage,
					LogConstant.DATA_DEAL_REQUEST,
					LogConstant.SYSTEM_VINUXDESIGN, "通过sessionId获取用户信息",
					sessionId, LogConstant.OTHER_LOG_API);
		}
		return token;
	
	}
}
