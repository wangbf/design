package vinux.web.demo.service;

import java.util.Map;

import vinux.service.common.page.Pagination;
import vinux.service.entity.demo.Demo;

public interface DemoService {

	int deleteByPrimaryKey(Long id);

	Demo insert(Demo record);

	Demo insertSelective(Demo record);

    Demo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Demo record);

    int updateByPrimaryKeyWithBLOBs(Demo record);

    int updateByPrimaryKey(Demo record);
    
    
    /**
     * 分页组件
     * @return
     */
	public Pagination<Demo> findByPageBySqlId(String sqlId, Map<String, Object> params, 
			Integer pageNo, Integer limit);
	
}
