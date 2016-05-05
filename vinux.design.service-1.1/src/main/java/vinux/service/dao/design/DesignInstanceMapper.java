package vinux.service.dao.design;

import java.util.List;

import vinux.service.entity.design.DesignInstance;
import vinux.service.query.design.DesignInstanceQuery;

public interface DesignInstanceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DesignInstance record);

    int insertSelective(DesignInstance record);

    DesignInstance selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DesignInstance record);

    int updateByPrimaryKey(DesignInstance record);
    
    List<DesignInstance> find(DesignInstanceQuery query);
}