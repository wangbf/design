package vinux.service.common.base;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;

/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2014年5月8日 　<br/>
 * <p>
 * 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年5月8日 <br/>
 * 
 */ 
public class BaseController {
	/**
	 * 项目的web url 地址
	 */
	protected Integer pageSize = 10;
	
	//结果集返回Map
	protected Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
	//查询Map
	protected Map<String,Object> findMap = new LinkedHashMap<String, Object>();
	
	/**
	 * 重定向
	 * @param redirectUrl
	 * @return
	 */
	protected ModelAndView redirect(String redirectUrl){
		return new ModelAndView(new RedirectView(redirectUrl));
	}
	

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	
	
	/**
	 * 登录判断
	 * @param request
	 * @return
	 */
	public Map<String,Object> isLogin(){
		
		Map<String,Object> resultMap = null ;
		ShiroToken token = TokenManager.getToken();
		
		if(null == token){
			resultMap = new HashMap<String,Object>();
			resultMap.put("login_status", 300);
			resultMap.put("message", "当前用户没有登录！(HTTP)");
		}
		return resultMap ;
	}
	
	
}
