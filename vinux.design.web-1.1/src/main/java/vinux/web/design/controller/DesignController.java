package vinux.web.design.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import vinux.service.common.base.APIResult;
import vinux.service.common.config.OpenConfig;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.core.exception.VException;
import vinux.service.entity.design.DesignInstance;
import vinux.service.entity.design.DesignPage;
import vinux.service.entity.design.DesignPageData;
import vinux.service.query.design.DesignInstanceQuery;
import vinux.service.query.design.DesignPageQuery;
import vinux.web.design.service.IDesignPageService;
import vinux.web.design.service.IDesignService;

@Controller
public class DesignController {
	private final String SELLER = OpenConfig.getProperty("member.seller.roletype");
	private final String VINUXBUY = OpenConfig.getProperty("member.vinuxbuy.roletype");
	
	@Autowired
	IDesignService designService;
	@Autowired
	IDesignPageService designPageService;
	
	/**
	 * 设计页
	 * @return
	 */
	@RequestMapping("/main/index")
	public ModelAndView index() {
		ShiroToken token = TokenManager.getToken();
		String roleType = token.getRoleType();
		String type = "";
		if (SELLER.equals(roleType)) {
			type = DesignInstance.TYPE_SHOP;
		} else if (VINUXBUY.equals(roleType)) {
			type = DesignInstance.TYPE_VINUXBUY;
		} else {
			return new ModelAndView("common/error");
		}
		return new ModelAndView("redirect:/edit/" + type +"/index.vhtml");
	}
	
	/**
	 * 首次访问该页面的用户，将会自动根据实例类型创建设计实例和页面
	 * @param instanceType
	 * @return
	 */
	@RequestMapping("/edit/{instanceType}/index")
	public ModelAndView edit(@PathVariable("instanceType") String instanceType) {
		ShiroToken token = TokenManager.getToken();
		Long userId = Long.valueOf(token.getUserId());
		DesignInstanceQuery query = new DesignInstanceQuery();
		query.setCreatorId(userId).setType(instanceType);
		DesignInstance instance = designService.findOne(query);
		if (instance == null) {
			instance = DesignInstance.createShopInstance(token, instanceType);
			designService.create(instance);
		}
		DesignPageQuery pageQuery = new DesignPageQuery();
		pageQuery.setInstanceId(instance.getId()).setType(DesignPage.TYPE_INDEX);
		DesignPage indexPage = designPageService.findOne(pageQuery);
		if (indexPage == null) {
			indexPage = DesignPage.createIndex(instance.getId());
			designPageService.create(indexPage);
		}
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("page", indexPage);
		model.put("instance", instance);
		return new ModelAndView("design/index", model);
	}
	
	/**
	 * 获取页面数据
	 * @param pageId
	 * @return
	 */
	@RequestMapping(value = "/main/page/{pageId}/data", method = RequestMethod.GET)
	@ResponseBody
	public DesignPage getPageData(@PathVariable("pageId") Long pageId) {
	
		return designPageService.getPageData(pageId);
	}
	
	/**
	 * 保存
	 * @param pageId
	 * @param data
	 * @return
	 */
	@RequestMapping(value = "/main/page/{pageId}/data", method = RequestMethod.POST)
	@ResponseBody
	public APIResult<Object> savePageData(@PathVariable("pageId") Long pageId, String data) {
		APIResult<Object> result = new APIResult<Object>();
		result.setStatus(APIResult.STATUS_SUCCESS);
		DesignPage page = new DesignPage();
		page.setId(pageId);
		DesignPageData pageData = new DesignPageData();
		pageData.setData(data);
		designPageService.insertNewVersion(page, pageData);
		return result;
	}
	
	/**
	 * 发布页面数据
	 * @param pageId
	 * @param instanceId
	 * @param type
	 * @param html
	 * @return
	 */
	@RequestMapping(value = "/main/publish/page/{pageId}",  method = RequestMethod.POST)
	@ResponseBody
	public APIResult<Object> publish(@PathVariable("pageId") Long pageId, Long instanceId, String type, String html) {
		APIResult<Object> result = new APIResult<Object>();
		result.setStatus(APIResult.STATUS_SUCCESS);
		result.setMessage("发布成功");
		try {
			String sellerId = TokenManager.getUserId();
			DesignPage page = new DesignPage();
			page.setId(pageId);
			page.setInstanceId(instanceId);
			page.setType(type);
			page.setHtml(html);
			designPageService.publishPage(Long.valueOf(sellerId), page);
		} catch (VException e) {
			result.setStatus(APIResult.STATUS_ERROR);
			result.setMessage("发布失败");
		}
		return result;
	}
}
