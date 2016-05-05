package vinux.service.common.shiro;

import java.net.URLDecoder;

import net.sf.json.JSONObject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;

import vinux.service.common.config.Config;
import vinux.service.common.util.StringUtils;
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
 * 创建　周柏成　2014年12月4日 　<br/>
 * <p>
 * Shiro token 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年12月4日 <br/>
 * 
 */
public class ShiroToken extends UsernamePasswordToken  implements java.io.Serializable{
	
	private static final long serialVersionUID = 3906319983834498180L;

	private static final String EMPTY = "" ;
	public ShiroToken(String loginName, String userId) {
		super(loginName,userId);
		this.loginName = loginName;
		this.userId = userId;
	}
	
	private String careFirstOrderMedia;
	private String firstOrder;
	private String loginName;
	private String nickname;//昵称
	private String roleId;
	private String roleName;
	private String roleType;
	private String sellerType;
	private String userId;//用户ID
	private String userName;//登录帐号
	private String userType;
	private String vinuxId;
	
	
	private ShiroToken self ; //用户token存贮
	
	
	
	


	public ShiroToken(String userInfo) throws Exception {
		try {
			userInfo = URLDecoder.decode(userInfo,"utf-8");
			JSONObject u = JSONObject.fromObject(userInfo);
			LoggerUtils.debug(getClass(), "登录成功，从会员返回成功。UserInfo：[" + userInfo + "]");
			LoggerUtils.debug(getClass(), "开始构建ShiroToken对象");
			this.careFirstOrderMedia = u.optString("careFirstOrderMedia",EMPTY);
			this.firstOrder = u.optString("firstOrder",EMPTY);
			this.loginName = u.optString("loginName",EMPTY);
			this.nickname = u.optString("nickname",EMPTY);
			this.roleId = u.optString("roleId",EMPTY);
			this.roleName = u.optString("roleName",EMPTY);
			this.roleType = u.optString("roleType",EMPTY);
			this.sellerType = u.optString("sellerType",EMPTY);
			this.userId = u.optString("userId",EMPTY);
			this.userName = u.optString("userName",EMPTY);
			this.userType = u.optString("userType",EMPTY);
			this.vinuxId = u.optString("vinuxId",EMPTY);
			this.self = this ;
			LoggerUtils.debug(getClass(), "构建ShiroToken对象成功结束");
		} catch (Exception e) {
			LoggerUtils.error(getClass(), "构建ShiroToken对象失败！",e);
			throw e;
		}
	}
	
	public void login() throws Exception{
		try {
			ShiroToken token = new ShiroToken(loginName,userId);
			//从配置文件里获取要不要记住【登录状态】
			String rememberMe = Config.getProperty("shiro.rememberMe");
			Boolean isRememberMe = Boolean.FALSE;
			token.setSelf(this);
			if(StringUtils.isNotBlank(rememberMe)){
				isRememberMe = new Boolean(rememberMe);
			}
			token.setRememberMe(isRememberMe);
			SecurityUtils.getSubject().login(token);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public ShiroToken() {
	}
	public String getCareFirstOrderMedia() {
		return careFirstOrderMedia;
	}
	public void setCareFirstOrderMedia(String careFirstOrderMedia) {
		this.careFirstOrderMedia = careFirstOrderMedia;
	}
	public String getFirstOrder() {
		return firstOrder;
	}
	public void setFirstOrder(String firstOrder) {
		this.firstOrder = firstOrder;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleType() {
		return roleType;
	}
	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}
	public String getSellerType() {
		return sellerType;
	}
	public void setSellerType(String sellerType) {
		this.sellerType = sellerType;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getVinuxId() {
		return vinuxId;
	}
	public void setVinuxId(String vinuxId) {
		this.vinuxId = vinuxId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public ShiroToken getSelf() {
		return self;
	}

	public void setSelf(ShiroToken self) {
		this.self = self;
	}
	
}
