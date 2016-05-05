package vinux.service.dao.design;

import java.util.List;

import vinux.service.entity.design.DesignPage;
import vinux.service.query.design.DesignPageQuery;

public interface DesignPageMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DesignPage record);

    int insertSelective(DesignPage record);

    DesignPage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DesignPage record);

    int updateByPrimaryKeyWithBLOBs(DesignPage record);

    int updateByPrimaryKey(DesignPage record);
    
    List<DesignPage> find(DesignPageQuery query);
    
    DesignPage findLatest(DesignPageQuery query);
    
    Long count(DesignPageQuery query);
}