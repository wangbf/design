package vinux.demo.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import vinux.base.BaseServiceTest;
import vinux.service.entity.demo.Demo;
import vinux.web.demo.service.DemoService;

/**
 * 各个具体业务测试
 * @author tongchuanwei
 *
 */
public class DemoTest extends BaseServiceTest {

	@Autowired
	DemoService demoService;

	@Override
	@Test
	public void test() {
		logger.info("测试开始。。。。。");
		Demo demo = demoService.selectByPrimaryKey(1L);
		System.out.println("......................" + demo.getName());
		logger.info("测试结束。。。。。");
	}

}
