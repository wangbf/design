package vinux.web.common.controller;

import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.util.SavedRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import vinux.service.common.base.BaseController;
import vinux.service.common.config.Config;
import vinux.service.common.config.OpenUrlConfig;
import vinux.service.common.exception.ECode;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.common.statics.Constant;
import vinux.service.common.util.StringUtils;
import vinux.service.core.exception.VException;
import vinux.service.core.utils.LoggerUtils;
/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2015年4月30日 　<br/>
 * <p>
 * 
 * 与会员系统交互Controller
 * 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年4月30日 <br/>
 * 
 */
@Controller
@Scope(Constant.SCOPE)
@RequestMapping("/open/member")
public class MemberController extends BaseController {
	static final Class<?> SELF = MemberController.class;
	/**
	 * 没有登录跳转到登录
	 * @author zhou-baicheng
	 * @return
	 */
	@RequestMapping("tologin")
	public ModelAndView tologin(){
		SavedRequest request = (SavedRequest) TokenManager.getSession().getAttribute("shiroSavedRequest");
//		String url = request.getRequestUrl(); //这个方法会把?跟着的参数一起读出来，这样最后的backUrl会有一个参数重复一遍
		String url = request.getRequestURI();
		String query = request.getQueryString();
		String method= request.getMethod();
		LoggerUtils.fmtDebug(SELF, "当前没有登录，访问的地址为：%s，请求类型为：%s，请求的参数为：%s", 
				url,request.getMethod(),query);
		//获取会员跳转登录url
		String memberLogin = OpenUrlConfig.getProperty("member.login");
		LoggerUtils.fmtDebug(SELF, "获取会员跳转登录地址：%s", memberLogin);
		/**参数处理*/
		if(StringUtils.isNotBlank(url) || StringUtils.isNotBlank(query)){
			Map<String, String> map = StringUtils.getToMap(query);
			if(StringUtils.isNotBlank(url)){
				map.put("backUrl", url);
			}
			map.put("method", method);
			String args = StringUtils.mapToGet(map);
			args = StringUtils.getBASE64(args);
			memberLogin = String.format("%s?args=%s", memberLogin,args);
			LoggerUtils.fmtDebug(SELF, "获取会员跳转登录地址，加上参数：%s", memberLogin);
		}
		return redirect(memberLogin);
	}
	@RequestMapping("login")
	public ModelAndView login(HttpServletRequest request,String _access_token,String userInfo,String args) throws Exception{
		
		
		//弹出登录获取购物车地址
		String backUrl = request.getParameter("url");
		//会员SessionID  禁止使用此值
		if(StringUtils.isBlank(_access_token)){
			LoggerUtils.fmtError(SELF, "会员_access_token为null");
		}else{
			LoggerUtils.fmtError(SELF, "会员_access_token：%s" ,_access_token);
		}
		if(StringUtils.isNotBlank(userInfo)){
			userInfo = URLDecoder.decode(userInfo,"utf-8");
			ShiroToken token = new ShiroToken(userInfo);
			token.login();
			LoggerUtils.debug(getClass(), "登录成功，从会员返回成功。UserInfo：[" + userInfo + "]");
		}else{
			throw new VException(ECode.EMPTY_PARAMS,"登录成功，但从会员返回的UserInfo为null");
		}
		//当地址登录后返回的地址丢失了，那么就回跳到这个页面
		String indexUrl = Config.getProperty("domain.index");
		
		
		
	
		String redirect = indexUrl;
		if(StringUtils.isNotBlank(args)){
			args = StringUtils.getStrByBASE64(args);
			Map<String, ? extends Object> map = StringUtils.getToMap(args);
			String getBackUrl = (String) map.get("backUrl");
			if(StringUtils.isNotBlank(backUrl)){
				redirect = backUrl;
			}
			if(StringUtils.isNotBlank(getBackUrl)){
				redirect = getBackUrl;
				map.remove("backUrl");
			}
			String method = (String) map.get("method");
			//TODO 待升级 未能解决method为POST的提交
			if(StringUtils.isNotBlank(method)){
				map.remove("method");
				if( method.equals("POST")){
					redirect = indexUrl;
				}
			}
			String query = StringUtils.mapToGet(map);
			if(StringUtils.isNotBlank(query)){
				redirect = 	String.format("%s?%s", redirect,query);
			}
		}
		//弹出登录获取回跳地址
		if(StringUtils.isNotBlank(backUrl)){
			return new ModelAndView("common/login_success","backUrl",backUrl);
		}
		
		return redirect(redirect);
	}
}
