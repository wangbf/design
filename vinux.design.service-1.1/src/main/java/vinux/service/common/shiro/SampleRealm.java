package vinux.service.common.shiro;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;

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
 * 创建　周柏成　2014年3月3日 　<br/>
 * <p>
 * shiro 认证 + 授权   重写
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年3月3日 <br/>
 * 
 */
public class SampleRealm extends AuthorizingRealm {

	
	public SampleRealm() {
		super();
	}
	/**
	 *  认证信息，主要针对用户登录， 
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		
		ShiroToken token = (ShiroToken) authcToken;
		/**
		 * 通过帐号获取用户对象
		 * 
		 * 
		 */
		if(null == token )//|| token.checkSelf()
			throw new AccountException("'token' is null or 'token' contains null value");  
		
		//TODO 如果自己管理用户信息的，需要自主实现登录校验，如有问题咨询@周柏成
		
		String userId = new String(token.getUserId());
		token = token.getSelf();
		return new SimpleAuthenticationInfo(token,userId, getName());
		
    }

	 /** 
     * 授权 
     */  
    @Override  
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {  
    	/**
    	 * 在这可以给予当前用户的权限
    	 */
    	SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
    	ShiroToken token = TokenManager.getToken();
    	authorizationInfo.addRole(token.getUserType());
    	return authorizationInfo;  
    }  
	
    /** 
     * 异常转换 
     * @param e 
     * @return 
     */  
    private AuthenticationException translateAuthenticationException(Exception e) {  
        if (e instanceof AuthenticationException) {  
            return (AuthenticationException) e;  
        }  
        if(e instanceof DisabledAccountException){  
            return (DisabledAccountException)e;  
        }  
        if(e instanceof UnknownAccountException){  
            return (UnknownAccountException)e;  
        }  
        return new AuthenticationException(e);  
    } 
    
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(
				principal, getName());
		clearCachedAuthorizationInfo(principals);
	}
}
