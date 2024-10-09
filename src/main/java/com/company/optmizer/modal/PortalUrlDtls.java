package com.company.optmizer.modal;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "portal_url_dtls")
public class PortalUrlDtls {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "url_id")
    private Long urlId;
    
    @Column(name = "url_pattern")
    private String urlPattern;
    
    @Column(name = "permission_name")
    private String permissionName;
    @Column(name = "active_flag")
    private Boolean activeFlag;
    @Column(name = "crt_dt")
    private Date crtDt;
    @Column(name = "lst_updt_dt")
    private Date lstUpdtDt;
    @Column(name = "crt_by_login_id")
    private Long crtByLoginId;
    @Column(name = "lst_updt_by_login_id")
    private Long lstUpdtByLoginId;

    @ManyToMany
    @JoinTable(
        name = "portal_url_role_mapping",
        joinColumns = @JoinColumn(name = "url_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<PortalRoleDtls> roles;



	public Long getUrlId() {
		return urlId;
	}

	public void setUrlId(Long urlId) {
		this.urlId = urlId;
	}

	public String getUrlPattern() {
		return urlPattern;
	}

	public void setUrlPattern(String urlPattern) {
		this.urlPattern = urlPattern;
	}

	public Set<PortalRoleDtls> getRoles() {
		return roles;
	}

	public void setRoles(Set<PortalRoleDtls> roles) {
		this.roles = roles;
	}

	public String getPermissionName() {
		return permissionName;
	}

	public void setPermissionName(String permissionName) {
		this.permissionName = permissionName;
	}

	public Boolean getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(Boolean activeFlag) {
		this.activeFlag = activeFlag;
	}

	public Date getCrtDt() {
		return crtDt;
	}

	public void setCrtDt(Date crtDt) {
		this.crtDt = crtDt;
	}

	public Date getLstUpdtDt() {
		return lstUpdtDt;
	}

	public void setLstUpdtDt(Date lstUpdtDt) {
		this.lstUpdtDt = lstUpdtDt;
	}

	public Long getCrtByLoginId() {
		return crtByLoginId;
	}

	public void setCrtByLoginId(Long crtByLoginId) {
		this.crtByLoginId = crtByLoginId;
	}

	public Long getLstUpdtByLoginId() {
		return lstUpdtByLoginId;
	}

	public void setLstUpdtByLoginId(Long lstUpdtByLoginId) {
		this.lstUpdtByLoginId = lstUpdtByLoginId;
	}

    
}