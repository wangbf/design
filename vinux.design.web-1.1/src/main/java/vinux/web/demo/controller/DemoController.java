package vinux.web.demo.controller;

import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import vinux.service.common.base.BaseController;
import vinux.service.common.statics.Constant;
import vinux.service.entity.demo.Demo;
import vinux.web.demo.service.DemoService;

/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2015年4月29日 　<br/>
 * <p>
 * 
 * 测试Controller
 * 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年4月29日 <br/>
 * 
 */


@Controller
@Scope(Constant.SCOPE)
@RequestMapping("demo")
public class DemoController extends BaseController {
	
	@Autowired
	DemoService demoService;
	
	@RequestMapping("index")
	public ModelAndView index(Demo entity){
		
		//退出登录不能使用session
		//SecurityUtils.getSubject().logout();
		return new ModelAndView("demo/index");
	}
	
}
