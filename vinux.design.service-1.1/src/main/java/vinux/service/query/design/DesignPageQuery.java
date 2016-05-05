package vinux.service.query.design;

import java.util.Date;

public class DesignPageQuery {
	private Long id;

	private String name;
	
	private String type;
	
	private Long instanceId;

	private Date cdate;

	private Date udate;

	private String data;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public DesignPageQuery setName(String name) {
		this.name = name;
		return this;
	}

	public String getType() {
		return type;
	}

	public DesignPageQuery setType(String type) {
		this.type = type;
		return this;
	}

	public Long getInstanceId() {
		return instanceId;
	}

	public DesignPageQuery setInstanceId(Long instanceId) {
		this.instanceId = instanceId;
		return this;
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

	public void setData(String data) {
		this.data = data;
	}
}
