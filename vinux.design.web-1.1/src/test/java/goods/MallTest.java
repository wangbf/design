package goods;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.client.Client;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import util.ConnectionManager;
import vinux.service.common.util.Encrypt;
import vinux.service.common.util.VinuxPostMethod;
import vinux.service.core.elasticsearch.utils.ESTools;
import vinux.service.core.elasticsearch.utils.ElasticsearchManager;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring.xml", "classpath:spring-mybatis.xml"})
public class MallTest {

	public void testQueryGoods(String sellerIds) {
		Statement stmt = null;
		ResultSet rs = null;
		try {
			Connection conn = ConnectionManager.getConnection();
			stmt = (Statement) conn.createStatement();
			String sql = "SELECT * from PRODUCT_SKU";
			sql += " WHERE MEMBER_ID in (" + sellerIds + ")";
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				System.out.println(rs.getString("NAME"));
				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void pubSeller() {
		JSONArray sellers = getSellers("169");
		ElasticsearchManager.delete("mall", "sellers", "id");
		if (null != sellers) {
			for (int i = 0; i < sellers.size(); i++) {
				JSONObject each = sellers.getJSONObject(i);
				Map<String, Object> source = new HashMap<String, Object>();
				source.put("id", each.getString("id"));
				source.put("nickname", each.getString("nickname"));
				source.put("name", each.getString("name"));
				ElasticsearchManager.saveMap("mall", "sellers", "id", source);
			}
		}
	}
	
	@Test
	public void putGoods() {
		JSONArray sellers = getSellers("169");
		if (null != sellers) {
			List<String> ids = new ArrayList<String>();
			for (int i = 0; i < sellers.size(); i++) {
				JSONObject each = sellers.getJSONObject(i);
				ids.add(each.getString("id"));
			}
			testQueryGoods(StringUtils.join(ids, ","));
		}
	}
	
	@Test
	public void testUpdateSeller() {
		try {
			Map<String, Object> source = new HashMap<String, Object>();
			source.put("promotions", new JSONObject());
			source.put("name", "lalalala");
			source.put("id", "116");
			Client client = ESTools.client;
			client.prepareUpdate("mall", "sellers", "116")
				.setRefresh(true)
				.setDoc(source).get();
		} catch (ElasticsearchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private JSONArray getSellers(String mediaId) {
		String url = "http://www.vinuxmembers.com/open/request/penny/getSellerInfoByType.vhtml";
		VinuxPostMethod post = new VinuxPostMethod(url);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("mediaId", mediaId);
		parameter.put("sellerType", "1");
		parameter.put("sys_type", "vinux_pcmall");
		try {
			String sign = Encrypt.md5Digest("mediaId=" + mediaId + "&sellerType=1&sys_type=vinux_pcmall&Vinuxpcmall20140909010");
			parameter.put("sign", sign);
			post.setParameter(parameter);
			JSONArray res = (JSONArray) post.executeMethod("JSONArray");
			return res;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
