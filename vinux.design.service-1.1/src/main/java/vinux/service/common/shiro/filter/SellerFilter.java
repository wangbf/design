package vinux.service.common.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import vinux.service.common.config.OpenConfig;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.core.utils.LoggerUtils;

/**
 * 这里单独增加一个判读卖家角色拦截器
 * 由于在shiro_base_auth.properties文件里用2=/shop/**=login,roles["230101"] 
 * 的方式有时会不生效，由于时间原因没有仔细排查，所以单独处理角色判断
 * @author wangbf
 */
public class SellerFilter extends AccessControlFilter {
	private final String SELLER = OpenConfig.getProperty("member.seller.roletype");
	private final Class<?> SELF = SellerFilter.class;

	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object arg2) throws Exception {
		ShiroToken token = TokenManager.getToken();
		Subject subject = getSubject(request, response);
		if (null == token) {
			token = (ShiroToken) subject.getPrincipal();
		}
		if (null != token) {
			if (!SELLER.equals(token.getRoleType())) {
				LoggerUtils.fmtError(SELF, "当前登录用户:%s, roleType: %s, 不是卖家角色", token.getUserId(), token.getRoleType());
				HttpServletResponse res = (HttpServletResponse)response;
				res.sendRedirect("/promission.vhtml");
				return false;
			}
			return true;
		}
		return false;
	}

	@Override
	protected boolean onAccessDenied(ServletRequest arg0, ServletResponse arg1)
			throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

}
