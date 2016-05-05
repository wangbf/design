package vinux.service.query.design;

import java.util.Date;

public class DesignInstanceQuery {
	private Long id;

    private String type;

    private String name;

    private Long creatorId;

    private String creatorRoleType;

    private Date cdate;

    private Date udate;

    private String flag;

    private String bak1;

    private String state;

	public Long getId() {
		return id;
	}

	public DesignInstanceQuery setId(Long id) {
		this.id = id;
		return this;
	}

	public String getType() {
		return type;
	}

	public DesignInstanceQuery setType(String type) {
		this.type = type;
		return this;
	}

	public String getName() {
		return name;
	}

	public DesignInstanceQuery setName(String name) {
		this.name = name;
		return this;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public DesignInstanceQuery setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
		return this;
	}

	public String getCreatorRoleType() {
		return creatorRoleType;
	}

	public DesignInstanceQuery setCreatorRoleType(String creatorRoleType) {
		this.creatorRoleType = creatorRoleType;
		return this;
	}

	public Date getCdate() {
		return cdate;
	}

	public DesignInstanceQuery setCdate(Date cdate) {
		this.cdate = cdate;
		return this;
	}

	public Date getUdate() {
		return udate;
	}

	public void setUdate(Date udate) {
		this.udate = udate;
	}

	public String getFlag() {
		return flag;
	}

	public DesignInstanceQuery setFlag(String flag) {
		this.flag = flag;
		return  this;
	}

	public String getBak1() {
		return bak1;
	}

	public void setBak1(String bak1) {
		this.bak1 = bak1;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
    
}
