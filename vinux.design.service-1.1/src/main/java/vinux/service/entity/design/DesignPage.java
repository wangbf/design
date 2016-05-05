package vinux.service.entity.design;

import java.io.Serializable;
import java.util.Date;

/**
 * 设计页
 * 一个设计实例包含一个或多个设计页
 * @author wangbf
 */
public class DesignPage implements Serializable {
	private static final long serialVersionUID = 3910550151176383767L;
	public static final String TYPE_INDEX = "index";

	private Long id;

	private String name;
	
	private String type;
	
    private Long instanceId;

    private Date cdate;

    private Date udate;

    private String data;
    
    private String html;
    
    public static DesignPage createIndex(Long instanceId) {
    	DesignPage index = new DesignPage();
    	index.setInstanceId(instanceId);
    	index.setType(TYPE_INDEX);
    	index.setName("首页");
    	return index;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getInstanceId() {
        return instanceId;
    }

    public void setInstanceId(Long instanceId) {
        this.instanceId = instanceId;
    }

    public Date getCdate() {
        return cdate;
    }

    public void setCdate(Date cdate) {
        this.cdate = cdate;
    }

    public Date getUdate() {
        return udate;
    }

    public void setUdate(Date udate) {
        this.udate = udate;
    }

    public String getData() {
        return data;
    }

    public void setData(DesignPageData pageData) {
    	if (null != pageData) {
    		this.data = pageData.getData();
    	}
    }

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

}