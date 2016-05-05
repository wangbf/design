package vinux.web.demo.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import vinux.service.common.page.Pagination;
import vinux.service.core.annotation.service.ServiceImpl;
import vinux.service.core.mybatis.BaseMybatisDao;
import vinux.service.dao.demo.DemoMapper;
import vinux.service.entity.demo.Demo;
import vinux.web.demo.service.DemoService;
@ServiceImpl("iDemoService")
public class DemoServiceImpl extends BaseMybatisDao<DemoMapper> implements DemoService {
	
	@Autowired
	DemoMapper demoMapper;

	public int deleteByPrimaryKey(Long id) {
		return demoMapper.deleteByPrimaryKey(id);
	}

	public Demo insert(Demo record) {
		demoMapper.insert(record);
		return record;
	}

	public Demo insertSelective(Demo record) {
		demoMapper.insertSelective(record);
		return record;
	}

	public Demo selectByPrimaryKey(Long id) {
		
		return demoMapper.selectByPrimaryKey(id);
	}

	public int updateByPrimaryKeySelective(Demo record) {
		return demoMapper.updateByPrimaryKeySelective(record);
	}

	public int updateByPrimaryKeyWithBLOBs(Demo record) {
		
		return demoMapper.updateByPrimaryKeyWithBLOBs(record);
	}

	public int updateByPrimaryKey(Demo record) {
		return demoMapper.updateByPrimaryKey(record);
	}

	@SuppressWarnings("unchecked")
	public Pagination<Demo> findByPageBySqlId(String sqlId,
			Map<String, Object> params, Integer pageNo, Integer limit) {
		return (Pagination<Demo>) super.findByPageBySqlId(sqlId, params, pageNo, limit);
	}
}
