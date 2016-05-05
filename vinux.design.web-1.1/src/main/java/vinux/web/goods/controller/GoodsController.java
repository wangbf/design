package vinux.web.goods.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import vinux.service.common.base.APIResult;
import vinux.web.goods.manager.GoodsMananger;

/**
 * 商品库相关
 * @author wangbf
 */
@Controller
@RequestMapping("/goods")
public class GoodsController {

	/**
	 * 获取卖家引入的商品
	 * @param request
	 * @return
	 */
	@RequestMapping("/seller/goods")
	@ResponseBody
	public Object sellerGoods(HttpServletRequest request) {
		APIResult<Object> apiResult = new APIResult<Object>();
		Map<String, Object> result = GoodsMananger.listMygoods(request);
		JSONArray goodsList = (JSONArray) result.get("listMap");
		Map<String, Object> fenyeresult = (Map<String, Object>) result.get("result");
		Map<String, Object> pageResult = new HashMap<String, Object>();
		pageResult.put("pageInfo", fenyeresult);
		pageResult.put("goodsList", goodsList);
		pageResult.put("categoryList", result.get("categoryList"));
		apiResult.setResult(pageResult);
		return apiResult;
	}
	
}
