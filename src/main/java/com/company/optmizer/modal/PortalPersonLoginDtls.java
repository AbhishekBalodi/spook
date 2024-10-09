package com.company.optmizer.modal;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "portal_person_login_dtls")
public class PortalPersonLoginDtls {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personId;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "login_id")
    private PortalLoginMst login;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "client_id")
    private PortalClientDtls client;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "role_id", nullable = false)
    private PortalRoleDtls role;

    //@Column(name = "role_id")
    //private String roleId;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "designation")
    private String designation;
    
    @Column(name = "status")
    private Boolean status;
	
    @Column(name = "is_client_user")
    private Boolean isClientUser;
    
    @Column(name = "is_primary_client_user")
    private Boolean isPrimaryClientUser;
    
    @Column(name = "additional_email")
    private String additionalEmail;
    
    @Column(name = "additional_mobile")
    private String additionalMobile;
    
    @Column(name = "expertise")
    private String expertise;
    
    @Column(name = "account_holder_name")
    private String accountHolderName;
    
    @Column(name = "bank_name")
    private String bankName;
    
    @Column(name = "account_number")
    private String accountNumber;
	
    @Column(name = "ifsc_code")
    private String ifscCode;
    
    @Column(name = "branch_name")
    private String branchName;
    
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
    @Column(name = "type_of_employment")
    private String typeOfEmployment;
    
    @Transient
    private Long personLoginId;
    
    @Column(name = "ctc")
    private Long ctc;
    
    
	public Long getPersonLoginId() {
		return personLoginId;
	}
	public void setPersonLoginId(Long personLoginId) {
		this.personLoginId = personLoginId;
	}
	public String getRoleName() {
		return role.getRoleName();
	}
	public Boolean getIsClientRole() {
		return role.getIsClientRole();
	}
	public Long getPersonId() {
		return personId;
	}
	public void setPersonId(Long personId) {
		this.personId = personId;
	}
	public PortalLoginMst getLogin() {
		return login;
	}
	public void setLogin(PortalLoginMst login) {
		this.login = login;
	}
	public PortalClientDtls getClient() {
		return client;
	}
	public void setClient(PortalClientDtls client) {
		this.client = client;
	}
	public PortalRoleDtls getRole() {
		return role;
	}
	public void setRole(PortalRoleDtls role) {
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public Long getCtc() {
		return ctc;
	}
	public void setCtc(Long ctc) {
		this.ctc = ctc;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public Boolean getIsClientUser() {
		return isClientUser;
	}
	public void setIsClientUser(Boolean isClientUser) {
		this.isClientUser = isClientUser;
	}
	public Boolean getIsPrimaryClientUser() {
		return isPrimaryClientUser;
	}
	public void setIsPrimaryClientUser(Boolean isPrimaryClientUser) {
		this.isPrimaryClientUser = isPrimaryClientUser;
	}
	//public String getRoleId() {
	//	return roleId;
	//}
	//public void setRoleId(String roleId) {
	//	this.roleId = roleId;
	//}
	
	public String getAdditionalEmail() {
		return additionalEmail;
	}
	public String getTypeOfEmployment() {
		return typeOfEmployment;
	}
	public void setTypeOfEmployment(String typeOfEmployment) {
		this.typeOfEmployment = typeOfEmployment;
	}
	public void setAdditionalEmail(String additionalEmail) {
		this.additionalEmail = additionalEmail;
	}
	public String getAdditionalMobile() {
		return additionalMobile;
	}
	public void setAdditionalMobile(String additionalMobile) {
		this.additionalMobile = additionalMobile;
	}
	public String getExpertise() {
		return expertise;
	}
	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}
	public String getAccountHolderName() {
		return accountHolderName;
	}
	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
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
