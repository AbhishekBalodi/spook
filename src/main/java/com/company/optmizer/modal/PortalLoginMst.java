package com.company.optmizer.modal;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "portal_login_mst")
public class PortalLoginMst {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id")
    private Long loginId;

    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    @Column(name = "enabled")
    private boolean enabled;

    @OneToOne(mappedBy = "login" , fetch = FetchType.EAGER)
    private PortalPersonLoginDtls personLoginDetails;

	

	public Long getLoginId() {
		return loginId;
	}

	public void setLoginId(Long loginId) {
		this.loginId = loginId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

	public LocalDateTime getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(LocalDateTime lastLogin) {
		this.lastLogin = lastLogin;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public PortalPersonLoginDtls getPersonLoginDetails() {
		return personLoginDetails;
	}

	public void setPersonLoginDetails(PortalPersonLoginDtls personLoginDetails) {
		this.personLoginDetails = personLoginDetails;
	}
}