package com.company.optmizer.config;

import org.springframework.security.core.GrantedAuthority;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
public class CustomGrantedAuthority implements GrantedAuthority {

	private static final long serialVersionUID = 1L;
	private final String roleName;
    private final boolean isClientRole;

    public CustomGrantedAuthority(String roleName, boolean isClientRole) {
        this.roleName = roleName;
        this.isClientRole = isClientRole; 
    }

    @Override
    public String getAuthority() {
        return roleName;
    }

    public boolean isClientRole() {
        return isClientRole;
    }
}