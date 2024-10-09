package com.company.optmizer.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Set;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

@Entity
@Table(name="portal_role_dtls")
@FilterDef(name = "activeFilter", parameters = @ParamDef(name = "activeFlag", type = Boolean.class))
public class PortalRoleDtls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;
    @Column(name = "role_name")
    private String roleName;
    @Column(name = "is_client_role")
    private Boolean isClientRole;
    @Column(name = "active_flag")
    private Boolean activeFlag;
    @Column(name = "crt_dt")
    private Timestamp crtDt;
    @Column(name = "lst_updt_dt")
    private Timestamp lstUpdtDt;
    @Column(name = "crt_by_login_id")
    private Long crtByLoginId;
    @Column(name = "lst_updt_by_login_id")
    private Long lstUpdtByLoginId;
    


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "portal_url_role_mapping",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "url_id")
    )
    @Filter(name = "activeFilter", condition = "active_flag = :activeFlag")
    private Set<PortalUrlDtls> urls;

	

	

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Set<PortalUrlDtls> getUrls() {
		return urls;
	}

	public void setUrls(Set<PortalUrlDtls> urls) {
		this.urls = urls;
	}

	public Boolean getIsClientRole() {
		return isClientRole;
	}

	public void setIsClientRole(Boolean isClientRole) {
		this.isClientRole = isClientRole;
	}

	public Boolean getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(Boolean activeFlag) {
		this.activeFlag = activeFlag;
	}

	

	public Timestamp getCrtDt() {
		return crtDt;
	}

	public void setCrtDt(Timestamp crtDt) {
		this.crtDt = crtDt;
	}

	public Timestamp getLstUpdtDt() {
		return lstUpdtDt;
	}

	public void setLstUpdtDt(Timestamp lstUpdtDt) {
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

