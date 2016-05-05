package vinux.service.common.shiro.manager;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;

import vinux.service.common.shiro.ShiroToken;


/**
 * 
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2014年3月3日 　<br/>
 * <p>
 * 
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年3月3日 
 * 
 * Shiro管理下的Token工具类
 */
public class TokenManager {
	
	public static final String TOKEN_KEY = TokenManager.class.getCanonicalName() + "token_key";
	
	/**
	 * 获取当前登录的用户User对象
	 * @return
	 */
	public static ShiroToken getToken(){
		ShiroToken token = (ShiroToken) SecurityUtils.getSubject().getPrincipal();
		return token ;
	}
	
	
	/**
	 * 获取当前用户的Session
	 * @return
	 */
	public static Session getSession(){
		return SecurityUtils.getSubject().getSession();
	}
	/**
	 * 获取当前用户NAME
	 * @return
	 */
	public static String getUserName(){
		return getToken().getUserName();
	}
	/**
	 * 获取当前用户ID
	 * @return
	 */
	public static String getUserId(){
		return getToken()==null?null:getToken().getUserId();
	}
	/**
	 * 把值放入到当前登录用户的Session里
	 * @param key
	 * @param value
	 */
	public static void setVal2Session(Object key ,Object value){
		getSession().setAttribute(key, value);
	}
	/**
	 * 从当前登录用户的Session里取值
	 * @param key
	 * @return
	 */
	public static Object getVal2Session(Object key){
		return getSession().getAttribute(key);
	}
	/**
	 * 获取当前用户的roles
	 * @return
	 */
//	public static Set<String> getRoles(){
//		LinkedHashMap<String,Role> roles = (LinkedHashMap<String, Role>) getSession().getAttribute(ROLES);
//		Set<String> roleKey = roles.keySet();
//		return roleKey ; 
//	} 
//	/**
//	 * 获取当前用户的Auths
//	 * @return
//	 */
//	public static Set<String>  getAuths(){
//		LinkedHashMap<String,Auth> auths = (LinkedHashMap<String, Auth>) getSession().getAttribute(AUTHS);
//		Set<String> authKey = auths.keySet();
//		return authKey ; 
//	} 
//	

	public static boolean isLogin() {
		try {
			ShiroToken token = (ShiroToken) SecurityUtils.getSubject().getPrincipal();
			if(null != token){ 
				return Boolean.TRUE;
			}
		} catch (Exception e) {
			return Boolean.FALSE;
		}
		return Boolean.FALSE;
	}
	
	
}
