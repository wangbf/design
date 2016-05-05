package vinux.web.common.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import vinux.service.common.base.BaseController;
import vinux.service.common.config.Config;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
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
 * 系统公共跳转
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年4月30日 <br/>
 * 
 */
@Controller
@Scope(value = "prototype")
@RequestMapping("")
public class SystemController extends BaseController {
	/**
	 * 退出登录
	 * @return
	 */
	@RequestMapping(value="logout",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> logout(){
		ShiroToken token = null ;
		/**
		 * 有可能用户Session已经失效
		 * */
		try {
			token = TokenManager.getToken();
			if(null == token){
				LoggerUtils.fmtDebug(getClass(), "用户已经退出！");
				resultMap.put("status", 200);
				return resultMap;
			}
		} catch (Exception e) {
			resultMap.put("status", 200);
			LoggerUtils.fmtError(getClass(), e, "用户退出，获取用户信息异常，可以忽略此异常！");
			e.printStackTrace();
			return resultMap;
		}
		//正常退出
		String account = token.getLoginName();
		LoggerUtils.fmtDebug(getClass(), "用户正在退出，用户帐号为：%s",account);
		try {
			SecurityUtils.getSubject().logout();
			resultMap.put("status", 200);
		} catch (Exception e) {
			resultMap.put("status", 500);
			LoggerUtils.fmtError(getClass(), e, "用户退出出现异常，用户帐号为：%s", account);
		}
		return resultMap;
	}
	
	/**
	 * 首页
	 * @return
	 */
	@RequestMapping("toLogout")
	public ModelAndView toLogout(HttpServletRequest request,HttpServletResponse response){
		
		logout();
		return redirect(Config.getProperty("domain.index"));
	}
	
	/**
	 * 首页
	 * @return
	 */
	@RequestMapping("index")
	public ModelAndView index(HttpServletRequest request,HttpServletResponse response){
		return redirect(Config.getProperty("domain.index"));
	}
	/**
	 * 404页面
	 * @return
	 */
	@RequestMapping("404")
	public ModelAndView vinux404(HttpServletRequest request,HttpServletResponse response){
		
		return new ModelAndView("common/404");
	}
	/**
	 * 错误页面
	 * @return
	 */
	@RequestMapping("500")
	public ModelAndView vinux500(HttpServletRequest request,HttpServletResponse response){
		
		return new ModelAndView("common/500");
	}
	/**
	 * 无权限页面
	 * @return
	 */
	@RequestMapping("promission")
	public ModelAndView promission(HttpServletRequest request,HttpServletResponse response){
		ModelAndView view = new ModelAndView("common/permission");
		logout();
		view.addObject("needType", "卖家");
		view.addObject("nowType", "消费者");
		view.addObject("backLogin", "shop/index.vhtml");
		return view;
	}
	/**
	 * 成功跳转
	 * @param url 提示后需要跳转的页面
	 * @return
	 */
	@RequestMapping("success")
	public ModelAndView success(String url,HttpServletRequest request,HttpServletResponse response){
		
		return new ModelAndView("common/success","url",url);
	}
	/**
	 * 失败跳转
	 * @param url 提示后需要跳转的页面
	 * @return
	 */
	@RequestMapping("defeat")
	public ModelAndView defeat(String url,HttpServletRequest request,HttpServletResponse response){
		
		return new ModelAndView("common/defeat","url",url);
	}
	
	/**
	 * 错误跳转
	 * @return
	 */
	@RequestMapping("error")
	public ModelAndView error(HttpServletRequest request,HttpServletResponse response,
			Exception e,Exception exception){
		Throwable t = (Throwable)request.getAttribute("javax.servlet.error.exception");
		ModelAndView view = new ModelAndView("common/error");
		String defaultMessage = "未知" ;
		if(null == t){
			view.addObject("line", defaultMessage);
			view.addObject("clazz", defaultMessage);
			view.addObject("methodName",defaultMessage);
			return view;
		}
		String message = t.getMessage() ;
		StackTraceElement[] stack = t.getStackTrace();
		view.addObject("message", message);
		if(null != stack && stack.length != 0 ){
			StackTraceElement element = stack[0];
			int line = element.getLineNumber();//错误行号
			String clazz = element.getClassName();//错误java类
			String fileName = element.getFileName();
			
			String methodName = element.getMethodName() ;//错误方法
			view.addObject("line", line);
			view.addObject("clazz", clazz);
			view.addObject("methodName",methodName);
			LoggerUtils.fmtError(getClass(), "line:%s,clazz:%s,fileName:%s,methodName:%s()",
					line,clazz,fileName,methodName);
		}
		return view;
	}
	
}
