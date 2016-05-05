package vinux.service.common.util;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.log4j.Logger;


public class CheckSign {
	
	private static final Logger logger = Logger.getLogger(CheckSign.class);

	public static String checkSign(Map<String,Object> paramMap,String md5Key) throws Exception {
		String checkSign = "";
		Set<String> paramSet = new HashSet<String>();
		for(Entry<String, Object> each : paramMap.entrySet()) {
			Object val = each.getValue();
			String valString = "";
			if(val!=null){
				valString = val.toString();
			}
			if(!"sign".equals(each.getKey())) {
				paramSet.add(each.getKey() + "=" + valString);
			}
		}
		String[] urlArr = paramSet.toArray(new String[paramSet.size()]);
		String param = getNewUrl(urlArr)+"&"+md5Key;
		logger.debug("待校验的请求参数[" + param + "]");
		checkSign = Encrypt.md5Digest(param); //对解析出来的url再签名

		return checkSign;
	}
	/**
	 * 方法描述: 根据请求参数数组和系统类型，重新排序后获取新的url
	 * @param params
	 * @return
	 */
	private static String getNewUrl(String[] params) {
		String param = "";
		if(params != null) {
			Arrays.sort(params);
			for(int i = 0; i < params.length; i++) {
				if(i != 0) {
					param += "&";
				}
				param += params[i];
			}		
		}
		return param;
	}
}
