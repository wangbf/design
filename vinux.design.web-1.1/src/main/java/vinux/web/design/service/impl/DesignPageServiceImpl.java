package vinux.web.design.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vinux.service.common.config.Config;
import vinux.service.common.statics.LogConstant;
import vinux.service.core.elasticsearch.utils.ElasticsearchManager;
import vinux.service.core.utils.SystemLogUitls;
import vinux.service.dao.design.DesignPageDataMapper;
import vinux.service.dao.design.DesignPageMapper;
import vinux.service.entity.design.DesignInstance;
import vinux.service.entity.design.DesignPage;
import vinux.service.entity.design.DesignPageData;
import vinux.service.query.design.DesignPageQuery;
import vinux.web.design.service.IDesignPageService;
import vinux.web.design.service.IDesignService;

@Service
public class DesignPageServiceImpl implements IDesignPageService {
	private static final String DESIGN_ES_INDEX_PREFIX = Config.getProperty("design.es.index.prefix");

	@Autowired
	DesignPageMapper designPageMapper;
	@Autowired
	DesignPageDataMapper designPageDataMapper;
	@Autowired
	IDesignService designService;
	
	@Override
	public DesignPage findOne(DesignPageQuery query) {
		List<DesignPage> list = designPageMapper.find(query);
		if (CollectionUtils.isNotEmpty(list)) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public DesignPage create(DesignPage page) {
		page.setCdate(new Date());
		page.setUdate(new Date());
		designPageMapper.insertSelective(page);
		return page;
	}

	@Override
	public DesignPage getPageData(Long pageId) {
		DesignPage page = designPageMapper.selectByPrimaryKey(pageId);
		if (null != page) {
			page.setData(designPageDataMapper.getLatest(pageId));
		}
		return page;
	}

	@Override
	public void insertNewVersion(DesignPage page, DesignPageData pageData) {
		DesignPageData oldData = designPageDataMapper.getLatest(page.getId());
		Long version = DesignPageData.DEFAULT_VERSION;
		if (null != oldData) {
			Long oldVersion = oldData.getVersion();
			version = ++oldVersion;
		}
		pageData.setVersion(version);
		pageData.setPageId(page.getId());
		pageData.setCdate(new Date());
		designPageDataMapper.insertSelective(pageData);
		
		this.clearEarlyVersion(page);
	}
	
	@Override
	public void publishPage(Long sellerId, DesignPage page) {
		Exception methodMessage = null;
		try {
			DesignInstance instance = designService.getById(page.getInstanceId());
			Map<String, Object> value = new HashMap<String, Object>();
			value.put("html", page.getHtml());
			value.put("sellerId", sellerId.toString());
			value.put("flag", 0);
			ElasticsearchManager.saveMap(DESIGN_ES_INDEX_PREFIX + instance.getType(), page.getType(), "sellerId", value);
		} catch (Exception e) {
			methodMessage = e;
		} finally {
			SystemLogUitls.info(null, null, null, this.getClass(), 
					String.format("sellerId: %s, pageType: %s", sellerId, page.getType()), 
					methodMessage, LogConstant.DATA_DEAL_UPDATE,
					LogConstant.SYSTEM_VINUXDESIGN, "发布卖家店铺页面，更新到es", sellerId.toString(), LogConstant.OTHER_LOG_CACHE);
		}
	}

	/**
	 * 清理早期的版本
	 * @param page
	 */
	private void clearEarlyVersion(DesignPage page) {
		Long count = designPageDataMapper.count(page.getId());
		if (DesignPageData.MAX < count) {
			DesignPageData data = designPageDataMapper.getEarliest(page.getId());
			if (null != data) {
				designPageDataMapper.deleteByPrimaryKey(data.getId());
			}
		}
	}
}
