package vinux.web.common.mq;

import java.io.Serializable;

import vinux.service.core.mq.bo.MqEntity;
/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 	队列开放出口
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2015年6月2日 　<br/>
 * <p>
 * *******
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年6月2日 <br/>
 * 
 */
public class MQExecute implements Serializable{
	private static final long serialVersionUID = 5669902966340931851L;

	/**
	 * 
	 * 处理系统日志
	 * @param object  	队列存储对象
	 * @param queueName 队列名称
	 */
	public static void excMqManager(MqEntity<?> entity, String queueName) {

		//队列名称 ： queueName
		//队列类型 ：  mqEntity.getType()
		/**
		 * 1.可以根据queueName[队列名称]进行判断要执行的业务。
		 * 2.如果一个队列里有多个业务，可以用mqEntity.getType() 来区分。
		 */
		//TODO --------------------------------
		
	}
}
