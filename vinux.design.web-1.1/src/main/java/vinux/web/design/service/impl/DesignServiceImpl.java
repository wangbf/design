package vinux.web.design.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vinux.service.dao.design.DesignInstanceMapper;
import vinux.service.dao.design.DesignPageDataMapper;
import vinux.service.dao.design.DesignPageMapper;
import vinux.service.entity.design.DesignInstance;
import vinux.service.query.design.DesignInstanceQuery;
import vinux.web.design.service.IDesignService;

@Service
public class DesignServiceImpl implements IDesignService {
	
	@Autowired
	DesignInstanceMapper designInstanceMapper;
	@Autowired
	DesignPageMapper designPageMapper;
	@Autowired
	DesignPageDataMapper designPageDataMapper;
	
	@Override
	public DesignInstance findOne(DesignInstanceQuery query) {
		List<DesignInstance> list = designInstanceMapper.find(query);
		if (CollectionUtils.isNotEmpty(list)) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public DesignInstance getById(Long id) {
	
		return designInstanceMapper.selectByPrimaryKey(id);
	}

	@Override
	public DesignInstance create(DesignInstance target) {
		target.setCdate(new Date());
		target.setUdate(new Date());
		designInstanceMapper.insertSelective(target);
		return target;
	}

}
