package vinux.service.entity.design;

import java.io.Serializable;
import java.util.Date;

import vinux.service.common.shiro.ShiroToken;

/**
 * 设计实例
 * 一个设计实例对应一个店铺设计、活动设计、专题设计等
 * @author wangbf
 */
public class DesignInstance implements Serializable {
	private static final long serialVersionUID = -5125557112974039284L;
	public static final String TYPE_SHOP = "shop";
	public static final String TYPE_VINUXBUY = "vinuxbuy";
	
	
	
	
	

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
    
    public static DesignInstance createShopInstance(ShiroToken token) {
    	DesignInstance shop = new DesignInstance();
    	shop.setType(TYPE_SHOP);
    	shop.setName(token.getNickname() + "的店铺");
    	shop.setCreatorId(Long.valueOf(token.getUserId()));
    	shop.setCreatorRoleType(token.getUserType());
    	shop.setFlag("");
    	shop.setBak1("");
    	shop.setState("");
    	return shop;
    }
    
    public static DesignInstance createShopInstance(ShiroToken token, String type) {
    	DesignInstance shop = new DesignInstance();
    	shop.setType(type);
    	shop.setName(token.getNickname());
    	shop.setCreatorId(Long.valueOf(token.getUserId()));
    	shop.setCreatorRoleType(token.getUserType());
    	shop.setFlag("");
    	shop.setBak1("");
    	shop.setState("");
    	return shop;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorRoleType() {
        return creatorRoleType;
    }

    public void setCreatorRoleType(String creatorRoleType) {
        this.creatorRoleType = creatorRoleType;
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

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
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