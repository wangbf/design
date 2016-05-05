package vinux.service.common.statics;


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
public interface LogConstant {

    /**<===============================================日志操作常量=============================================>**/
	/**数据处理方式(dealType)*/
	/** 本地没有数据更新，查询与判断等 */
	static final String DATA_DEAL_READ="read";
	/** 本地有数据更新,但不请求第三方 */
	static final String DATA_DEAL_UPDATE="update";
	/** 本地请求第三方 */
	static final String DATA_DEAL_REQUEST="request";
	/** 第三方回调本地 */
	static final String DATA_DEAL_CALLBACK="callback";
	
	/**各个系统和小组编号(systemType)*/
	/** 购物车 */
	static final String SYSTEM_VINUXCART="vinuxcart";
	static final String SYSTEM_VINUXCART_PC="vinuxcart_pc";
	static final String SYSTEM_VINUXCART_COW="vinuxcart_cow";
	static final String SYSTEM_VINUXCART_PHONE="vinuxcart_phone";
	/** 会员 */
	static final String SYSTEM_VINUXMEMBERS="vinuxmembers";
	
	/** 樱桃阵 */
	static final String SYSTEM_VINUXPOST="vinuxpost";
	/**樱桃阵PC 商城 **/
	static final String SYSTEM_VINUXPOST_PCMALL="vinuxpost_pcmall";
	/**樱桃阵奶牛商城*/
	static final String SYSTEM_VINUXPOST_COWMALL="vinuxpost_cowmall";
	/**樱桃阵手机商城*/
	static final String SYSTEM_VINUXPOST_MOBILEMALL="vinuxpost_mobilemall";
	/**会员中心*/
	static final String SYSTEM_VINUXPOST_VIP="vinuxpost_vip";
	/** 邮局 */
	static final String SYSTEM_VINUXEXPRESS="vinuxexpress";
	/** 樱桃派 */
	static final String SYSTEM_VINUXPAY="vinuxpay";
	/** 基金*/
	static final String SYSTEM_VINUXCARE="vinuxcare";
	/** 基金服务 */
	static final String SYSTEM_VINUXCARE_SERVICE="vinuxcare_service";
	/** 商品库 */
	static final String SYSTEM_VINUXGOODS="vinuxgoods";
	/** 感冒医生 */
	static final String SYSTEM_XGANMAO="xganmao";
	/** xapollovita */
	static final String SYSTEM_XAPOLLOVITA="xapollovita";
	/** vinux */
	static final String SYSTEM_VINUX="vinux";
	/** vinux_login */
	static final String SYSTEM_VINUXLOGIN="vinuxlogin";
	/** 樱桃厨房 */
	static final String SYSTEM_VINUX_FINEFOOD = "vinuxfinefood";
	/**数据统计中心  */
	static final String SYSTEM_VINUX_DATACENTER="vinuxdatacenter";
	static final String SYSTEM_VINUX_DATACENTER_MEDIA="vinuxdatacenter_media";
	static final String SYSTEM_VINUX_DATACENTER_SELLER="vinuxdatacenter_seller";
	/** vinuximage */
	static final String SYSTEM_VINUX_IMAGE="vinuximage";
	/** 维他菠萝 */
	static final String SYSTEM_VITAPOLLO="vitapollo";
	/** 维他引擎 */
	static final String SYSTEM_VITAHELPER="vitahelper";
	/** 樱桃派 数据管理*/
	static final String SYSTEM_VINUXPAY_DB="vinuxpaydb";
	/**樱桃阵卡拉丁服务*/
	static final String SYSTEM_VINUXPOST_KAKADING = "vinux_kalading";
	/** 接口中心系统 */
	static final String SYSTEM_VINUXICENTER="vinuxicenter";
	/**水电煤缴费服务*/
	static final String SYSTEM_VINUXPOST_VS_SDM = "vinuxpost_vs_sdm";
	/**vita角色日志，包含vita运营，药房，诊院，检所，用户，社区*/
	static final String SYSTEM_VITAROLE = "vitarole";
	/**病案中心日志*/
	static final String SYSTEM_MEDICALCENTER = "medicalcenter";
	/** 海外购 */
	static final String SYSTEM_VINUX_BUY="vinuxbuy";
	/** 卖家中心 */
	static final String SYSTEM_SELLER_CENTER="seller_center";
	/** 监控中心 */
	static final String SYSTEM_MONITOR = "monitor";
	/**樱桃阵商城中间件*/
	static final String SYSTEM_VINUXPOST_APIMALL="vinuxpost_apimall";
	/**设计中心*/
	static final String SYSTEM_VINUXDESIGN = "vinux_design";

	/**日志类型(other)*/
	/** 普通日志 */
	static final String OTHER_LOG_COMMON="other_log_common";
	/** 缓存日志 */
	static final String OTHER_LOG_CACHE="other_log_cache";
	/** 定时任务日志 */
	static final String OTHER_LOG_CRON="other_log_cron";
	/** 队列日志 */
	static final String OTHER_LOG_MQ="other_log_mq";
	/** 索引日志 */
	static final String OTHER_LOG_ES="other_log_es";
	/** 用户日志 */
	static final String OTHER_LOG_USER="other_log_user";
	/** 图片日志 */
	static final String OTHER_LOG_IMAGE="other_log_image";
	/** 接口调用日志 */
	static final String OTHER_LOG_API="other_log_api";
	/** 监控日志 */
	static final String OTHER_LOG_MONITOR="other_log_monitor";
	/** 其他日志 */
	static final String OTHER_LOG_NEW="other_log_new";
}
