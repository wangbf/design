package vinux.service.common.config;

import java.io.IOException;
import java.util.Properties;

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
 * 创建　周柏成　2014年5月29日 　<br/>
 * <p>
 *  
 *  
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2014年12月59日 <br/>
 * 
 */

public class Config {

	/**
	 * 配置文件
	 */
	private static Properties prop = null;
	
	
	/**
	 * 配置文件名称
	 */
	private final static String FILE_NAME = "/config.properties";
	
	private Config() {
	}
	static{
		prop = new Properties();
		try {
			prop.load(Config.class.getResourceAsStream(FILE_NAME));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(String key){
		String value = prop.getProperty(key);
		LoggerUtils.debug(Config.class, String.format("config.properties.通过Key[%s],获取到的Value[%s]", key,value));
		return value;
	}
}
