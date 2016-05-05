package vinux.base;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import vinux.demo.service.DemoTest;

/**
 * 集成测试
 * @author tongchuanwei
 *配置,SuiteClasses{DemoTest.class,DemoTest2.class}
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ DemoTest.class })
public class SuiteTest {
}
