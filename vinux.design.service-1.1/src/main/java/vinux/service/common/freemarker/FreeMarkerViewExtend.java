package vinux.service.common.freemarker;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.view.freemarker.FreeMarkerView;

import com.jagregory.shiro.freemarker.ShiroTags;

import vinux.service.common.config.Config;
import vinux.service.common.config.OpenUrlConfig;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.common.statics.Constant;
import vinux.service.core.exception.VException;
import vinux.service.core.utils.DateUtils;

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
 * Freemarker View 扩展
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年5月8日 <br/>
 * 
 */
public class FreeMarkerViewExtend extends FreeMarkerView {
	
	
	static final String V = DateUtils.ymdhms4();
	
	protected void exposeHelpers(Map<String, Object> model, HttpServletRequest request){
		try {
			super.exposeHelpers(model, request);
		} catch (Exception e) {
			throw new VException(e);
		}
		model.put(Constant.CSS_PATH, Config.getProperty("domain.css"));
		model.put(Constant.JS_PATH, Config.getProperty("domain.js"));
		model.put("imageUploadServer", OpenUrlConfig.getProperty("image.upload.server"));
		
		model.put("_v", V);//版本号
		
		if(TokenManager.isLogin()){
			model.put("adminToken", TokenManager.getToken()); 
		}
		
		
		
		
		model.put("nowTime", System.currentTimeMillis()); 
		model.put("shiro", new ShiroTags()); 
		model.put("nowYear", Constant.NOW_YEAR); 
		
		
		
	}
}
