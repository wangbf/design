package vinux.service.common.statics;

import java.util.Calendar;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;

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
 * 常量库
 * <p>
 * 
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年5月8日 <br/>
 * 
 */
public interface Constant {
	
	
	static final String CSS_PATH = "cssPath";
	
	static final String JS_PATH = "jsPath";
	
	/*** Freemarker 使用的变量 begin **/

	static final String TARGET = "target";// 标签使用目标

	static final String OUT_TAG_NAME = "outTagName";// 输出标签Name
	
	static final String SCOPE = ConfigurableBeanFactory.SCOPE_PROTOTYPE;

	/*** Freemarker 使用的变量 end **/

	/** cache begin **/
	static final String CACHE_MANAGER = "cacheManager";// cacheManager bean name
	/** cache end **/
	


	/** 数值常量 start */
	static final Long ZERO = new Long(0);
	static final Long ONE = new Long(1);
	static final Long TWO = new Long(2);
	static final Long THREE = new Long(3);
	static final Long FOUR = new Long(4);

	
	
	/**当前年份*/
	static final int NOW_YEAR = java.util.Calendar.getInstance().get(Calendar.YEAR);
	
}
