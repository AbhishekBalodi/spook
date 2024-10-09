package com.company.optmizer.modal;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="portal_project_dtls")
public class PortalProjectDtls {

 	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;
 	
 	@Column(name = "client_id")
    private Long clientId;
 	
 	@Column(name = "project_name")
    private String projectName;
 	
 	@Column(name = "billing_type")
    private Long billingType;
 	
 	@Column(name = "status")
    private Long status;
 	
 	@Column(name = "total_rate")
    private Long totalRate;
 	
 	@Column(name = "estimated_hours")
    private Long estimatedHours;
 	
 	@Column(name = "start_date")
    private Date startDate;
 	
 	@Column(name = "end_date")
    private Date endDate;
 	
 	@Column(name = "description")
    private String description;
 	
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
 

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Long getBillingType() {
		return billingType;
	}

	public void setBillingType(Long billingType) {
		this.billingType = billingType;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public Long getTotalRate() {
		return totalRate;
	}

	public void setTotalRate(Long totalRate) {
		this.totalRate = totalRate;
	}

	public Long getEstimatedHours() {
		return estimatedHours;
	}

	public void setEstimatedHours(Long estimatedHours) {
		this.estimatedHours = estimatedHours;
	}

	

	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(Boolean activeFlag) {
		this.activeFlag = activeFlag;
	}

	

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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
