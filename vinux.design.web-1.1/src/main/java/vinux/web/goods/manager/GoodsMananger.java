package vinux.web.goods.manager;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import vinux.service.common.config.OpenConfig;
import vinux.service.common.config.OpenUrlConfig;
import vinux.service.common.shiro.ShiroToken;
import vinux.service.common.shiro.manager.TokenManager;
import vinux.service.common.statics.LogConstant;
import vinux.service.common.util.CheckSign;
import vinux.service.common.util.VinuxPostMethod;
import vinux.service.core.exception.VException;
import vinux.service.core.utils.SystemLogUitls;

public class GoodsMananger {
	private static final Logger logger = Logger.getLogger(GoodsMananger.class);
	public static final String URL_LIST_MYGOODS = OpenUrlConfig.getProperty("vinuxgoods.realProduct");

	/***
	 * 实际商品列表
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> listMygoods(HttpServletRequest request) {
		ShiroToken token = TokenManager.getToken();
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> params = new HashMap<String, Object>();
		JSONObject dataJson = null;
		VException vException = null;
		try {
			String systemType = OpenConfig.getProperty("seller.in.goodsType");// 系统类型
			params.put("sys_type", systemType);// 平台类型
			int memberId = Integer.parseInt(token.getUserId());
			int sellerType = Integer.parseInt(token.getSellerType());
			int status = 0;
			if (request.getParameter("onsale") != null) {
				params.put("onsale", request.getParameter("onsale"));
			} else {
				params.put("onsale", "");
			}
			params.put("memberId", memberId);
			params.put("sellerType", sellerType);
			params.put("status", status);
			// 进行参数加密
			String categoryId = request.getParameter("categoryId");
			if (categoryId != null && !"-1".equals(categoryId)) {
				params.put("categoryId", categoryId);
			} else {
				params.put("categoryId", "");
			}
			if (request.getParameter("supplierId") != null) {
				params.put("supplierId", request.getParameter("supplierId"));
			} else {
				params.put("supplierId", "");
			}
			if (request.getParameter("productType") != null) {
				params.put("productType", request.getParameter("productType"));
			} else {
				params.put("productType", "");
			}
			if (request.getParameter("productName") != null) {
				System.out.println(request.getParameter("productName").length());
				params.put("productName", request.getParameter("productName").trim());
			} else {
				params.put("productName", "");
			}
			if (request.getParameter("pageNo") != null) {
				params.put("page", request.getParameter("pageNo"));
			} else {
				params.put("page", "");
			}
			if (request.getParameter("pageSize") != null) {
				params.put("pageSize", request.getParameter("pageSize"));
			} else {
				params.put("pageSize", "");
			}
			// 商品编码
			if (request.getParameter("productCode") != null) {
				params.put("productCode", request.getParameter("productCode").trim());
				result.put("productCode", request.getParameter("productCode").trim());
			} else {
				params.put("productCode", "");
			}
			// 商品SKU编码
			if (request.getParameter("pSkuNumber") != null) {
				params.put("pSkuNumber", request.getParameter("pSkuNumber").trim());
				result.put("pSkuNumber", request.getParameter("pSkuNumber").trim());
			} else {
				params.put("pSkuNumber", "");
			}
			
			String sign = CheckSign.checkSign(params, OpenConfig.getProperty("seller.in.goodsKey"));
			params.put("sign", sign);
			VinuxPostMethod method = new VinuxPostMethod(URL_LIST_MYGOODS, params);

			// 图片服务器url
			String imageUrl = OpenConfig.getProperty("goods_img_url");
			result.put("goodsImaPath", imageUrl);
			dataJson = (JSONObject) method.executeMethod(VinuxPostMethod.JSONObject);
			if (dataJson != null && dataJson.getInt("status") == 200) {
				JSONObject jo = (JSONObject) dataJson.get("result");
				// 得到商品类目
				JSONArray categoryList = jo.getJSONArray("categoryList");
//				result.put("categoryList", categoryList.toString());
				result.put("categoryList", categoryList);
				// 得到条件查询的商品类目
				if (jo.containsKey("categoryId")) {
					result.put("categoryId", jo.get("categoryId").toString());
				}
				// 得到供应商列表
				JSONArray listSupplier = jo.getJSONArray("listSupplier");
				result.put("listSupplier", listSupplier);
				// 得到条件查询的供应商
				if (jo.containsKey("supplierId")) {
					result.put("supplierId", jo.get("supplierId"));
				}
				// 得到商品名称:
				if (jo.containsKey("productName")) {
					result.put("productName", jo.get("productName"));
				}
				// 得到商品上下架状态
				if (jo.containsKey("onsale")) {
					result.put("onsale", jo.get("onsale"));
				}
				// 得到商品类型列表
				JSONArray goodsTypeList = jo.getJSONArray("goodsTypeList");
				result.put("goodsTypeList", goodsTypeList);
				// 得到查询条件中的商品类型
				if (jo.containsKey("productType")) {
					result.put("productType", Integer.parseInt(jo.get("productType").toString()));
				}
				// 得到商品详情列表
				if (null == jo.get("listMap")) {
					result.put("listMap", null);
				} else {
					JSONArray listMap = jo.getJSONArray("listMap");
					result.put("listMap", listMap);
				}
				// 得到分页查询信息
				int totalCount = Integer.parseInt(jo.getString("totalSize"));
				int pagesize = Integer.parseInt(jo.getString("pageSize"));
				int page = Integer.parseInt(jo.getString("page"));
				Map<String, Object> fenyeresult = new HashMap<String, Object>();
				fenyeresult.put("pageSize", pagesize);
				if (totalCount == 0) {
					int totalPage = 1;
					fenyeresult.put("totalPage", totalPage);
				} else {
					int totalPage = totalCount % pagesize == 0 ? (totalCount / pagesize) : (totalCount / pagesize) + 1;
					fenyeresult.put("totalPage", totalPage);
				}
				int pageNo = page;
				fenyeresult.put("pageNo", pageNo);
				result.put("result", fenyeresult);
			} else {
				logger.info("++++++status:" + dataJson.getInt("status")
						+ "   message:" + dataJson.getString("message") + "++++++");
			}
		} catch (Exception e) {
			vException = new VException("调用商品库，获取我的商品列表出现异常", "异常是：" + e.getMessage());
		} finally {
			SystemLogUitls.info(URL_LIST_MYGOODS, params + "", dataJson + "",
					GoodsMananger.class, "执行listMygoods()函数; 参数：" + params,
					vException, LogConstant.DATA_DEAL_REQUEST,
					LogConstant.SYSTEM_VINUXDESIGN, "获取我的商品列表", token.getUserId(),
					LogConstant.OTHER_LOG_API);
		}
		return result;
	}
	
}
