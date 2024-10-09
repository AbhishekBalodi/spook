package com.company.optmizer.modal;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "portal_task_wise_role_task_mapping")
public class PortalTaskWiseRoleTaskMapping {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_wise_role_task_id")
    private Long taskWiseRoleTaskId;
	
	@Column(name = "task_wise_role_id")
    private Long taskWiseRoleId;
	
	@Column(name = "task_wise_role_task_name")
    private String taskWiseRoleTaskName;
	
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
	public Long getTaskWiseRoleTaskId() {
		return taskWiseRoleTaskId;
	}
	
	public PortalTaskWiseRoleTaskMapping() {
		super();
	}

	public void setTaskWiseRoleTaskId(Long taskWiseRoleTaskId) {
		this.taskWiseRoleTaskId = taskWiseRoleTaskId;
	}
	public Long getTaskWiseRoleId() {
		return taskWiseRoleId;
	}
	public void setTaskWiseRoleId(Long taskWiseRoleId) {
		this.taskWiseRoleId = taskWiseRoleId;
	}
	public String getTaskWiseRoleTaskName() {
		return taskWiseRoleTaskName;
	}
	public void setTaskWiseRoleTaskName(String taskWiseRoleTaskName) {
		this.taskWiseRoleTaskName = taskWiseRoleTaskName;
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
