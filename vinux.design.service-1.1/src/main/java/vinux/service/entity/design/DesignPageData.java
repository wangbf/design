package vinux.service.entity.design;

import java.util.Date;

/**
 * 页面数据实体
 * 每次页面数据变化都直接插入到VINUX_DESIGN_PAGE_DATA中
 * VINUX_DESIGN_PAGE_DATA表只保存最近的10条记录
 * @author wangbf
 */ 
public class DesignPageData {
	public static final Long DEFAULT_VERSION = 1L;
	public static final Long MAX = 10L;   //允许保存的最大条数      
	
    private Long id;

    private Long pageId;

    private Date cdate;

  //版本号，暂时是递增的，由于并发问题， 不能保证相同pageId的记录的version值不重复
    private Long version; 

    private String data;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public Date getCdate() {
        return cdate;
    }

    public void setCdate(Date cdate) {
        this.cdate = cdate;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}