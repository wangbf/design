package vinux.web.design.service;

import vinux.service.entity.design.DesignInstance;
import vinux.service.query.design.DesignInstanceQuery;

public interface IDesignService {
	
	DesignInstance findOne(DesignInstanceQuery query);
	
	DesignInstance getById(Long id);
	
	DesignInstance create(DesignInstance target);
}
