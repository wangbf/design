package vinux.base;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 
 * Junti service Test junit
 * 配置,Configuration{"classpath:aaa.xml","classpath:bbb.xml"}，可配置多个
 * 
 * 方便区分 所有测试类，类名后面加Test
 * 
 * 测试service方法
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring.xml" })
public abstract class BaseServiceTest {
	// slf4j 方便调试
	public final transient Logger logger = LoggerFactory.getLogger(getClass());

	@Test
	public abstract void test();

}
