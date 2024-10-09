package com.company.optmizer.modal;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "portal_client_dtls")
public class PortalClientDtls {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long clientId; 
    
    @Column(name = "client_name")
    private String clientName;
    
    @Column(name = "contact_person")
    private String contactPerson;
    
    @Column(name = "designation")
    private String designation;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "website")
    private String website;
    
    @Column(name = "include_gst")
    private Boolean includeGst;
    
    @Column(name = "gst")
    private String gst;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "state")
    private String state;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "zip_code")
    private Long zipCode;
    
    @Column(name = "country")
    private String country;
    
    @Column(name = "currency")
    private String currency;
    
    @Column(name = "status")
    private Boolean status;
    
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

	

	public String getDesignation() {
		return designation;
	}

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public Boolean getIncludeGst() {
		return includeGst;
	}

	public void setIncludeGst(Boolean includeGst) {
		this.includeGst = includeGst;
	}

	public Long getZipCode() {
		return zipCode;
	}

	public void setZipCode(Long zipCode) {
		this.zipCode = zipCode;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
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

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	
	public String getGst() {
		return gst;
	}

	public void setGst(String gst) {
		this.gst = gst;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}



	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
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