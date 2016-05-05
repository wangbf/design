package vinux.web.design.service;

import vinux.service.entity.design.DesignPage;
import vinux.service.entity.design.DesignPageData;
import vinux.service.query.design.DesignPageQuery;

public interface IDesignPageService {

	DesignPage findOne(DesignPageQuery query);
	
	DesignPage create(DesignPage page);
	
	DesignPage getPageData(Long pageId);
	
	public void insertNewVersion(DesignPage page, DesignPageData pageData);
	
	/**
	 * 发布页面到es
	 * 现在的索引结构是：
	 * _index: "design_shop", //也可能是design_vinuxbuy
	 * _type: "index", //页面类型，index或者list
	 * _id: "sellerId"  //这个改为creatorId更好
	 * @param sellerId
	 * @param page
	 */
	public void publishPage(Long sellerId, DesignPage page);
}
