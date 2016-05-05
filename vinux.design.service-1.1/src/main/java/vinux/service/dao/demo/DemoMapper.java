package vinux.service.dao.demo;

import java.util.List;

import vinux.service.entity.demo.Demo;

public interface DemoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Demo record);

    int insertSelective(Demo record);

    Demo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Demo record);

    int updateByPrimaryKeyWithBLOBs(Demo record);

    int updateByPrimaryKey(Demo record);
    
    List<Demo> selectAll();
}