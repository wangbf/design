package vinux.service.dao.design;

import vinux.service.entity.design.DesignPageData;

public interface DesignPageDataMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DesignPageData record);

    int insertSelective(DesignPageData record);

    DesignPageData selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DesignPageData record);

    int updateByPrimaryKeyWithBLOBs(DesignPageData record);

    int updateByPrimaryKey(DesignPageData record);
    
    DesignPageData getLatest(Long pageId);
    
    DesignPageData getEarliest(Long pageId);
    
    Long count(Long pageId);
}