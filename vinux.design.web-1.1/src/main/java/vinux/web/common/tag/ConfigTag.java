package vinux.web.common.tag;

import java.util.HashMap;
import java.util.Map;

import vinux.service.common.config.Config;
import vinux.service.common.config.OpenUrlConfig;
import vinux.service.core.annotation.tag.T;
import vinux.service.core.tag.SuperTag;
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
 * 配置读取  
 * 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年4月30日 <br/>
 * 
 */
@T("configTag")
public class ConfigTag extends SuperTag {

	@Override
	protected Object result(@SuppressWarnings("rawtypes") Map params) {
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		//当前系统域名
		resultMap.put("domain", Config.getProperty("domain"));
		//会员域名
		resultMap.put("memberDomain", OpenUrlConfig.getProperty("member.domain"));
		return resultMap;
	}

}
