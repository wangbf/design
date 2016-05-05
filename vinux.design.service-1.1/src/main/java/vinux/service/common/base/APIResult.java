package vinux.service.common.base;

import java.io.Serializable;
/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2015年1月22日 　<br/>
 * <p>
 * 调用公共接口返回的结果集
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年1月22日 <br/>
 * 
 */
public class APIResult<V> implements Serializable{
	private static final long serialVersionUID = -7925016012331196255L;
	public static final int STATUS_SUCCESS = 200;
	public static final int STATUS_ERROR = 500;
	public static final int STATUS_NOT_FOUND = 400;
	
	/**返回状态，
	 * 处理中：100
	 * 成功：200，
	 * 失败：500，
	 * 备用成功：300，(如重复提交，重复执行等，即可返回300，表示已经提交过了)
	 * 其他具体情况自定义 
	 * */
	private int status ;
	/**
	 * 返回具体执行信息
	 */
	private String message;
	/**
	 * V V根据在new APIResult<V>的时候，如果V是存储一个User对象，那么就new APIResult<User>();
	 * 可以达到不用强转，直接Get即可获取。
	 */
	private V result ;

	public APIResult() {
		super();
	}
	public APIResult(int status,String message) {
		super();
		this.status = status;
		this.message = message;
	}
	public APIResult(int status,String message,V result) {
		super();
		this.status = status;
		this.message = message;
		this.result = result ;
	}

	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	public V getResult() {
		return result;
	}
	public void setResult(V result) {
		this.result = result;
	}
	
}
