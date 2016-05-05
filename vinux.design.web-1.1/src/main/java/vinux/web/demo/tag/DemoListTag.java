package vinux.web.demo.tag;

import java.util.HashMap;
import java.util.Map;

import vinux.service.core.annotation.tag.T;
import vinux.service.core.tag.SuperTag;
@T("demoListTag")
@SuppressWarnings("rawtypes") 
public class DemoListTag extends SuperTag {

	@Override
	protected Object result(Map params) {
		
		
		
		return new HashMap<String, Object>();
	}

}
