package com.company.optmizer.modal;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.company.optmizer.config.CustomGrantedAuthority;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
public class LoginPrincipal implements UserDetails{

	private static final long serialVersionUID = 1L;

	
	private PortalLoginMst user;
	public LoginPrincipal(PortalLoginMst user) {
		this.user=user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	
		return Collections.singleton(new CustomGrantedAuthority("ROLE_" + user.getPersonLoginDetails().getRoleName(), user.getPersonLoginDetails().getIsClientRole()));
	}

	@Override
	public String getPassword() {
		
		return user.getPassword();
	}

	@Override
	public String getUsername() {
	
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;	}
	
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	

	@Override
	public boolean isEnabled() {
		return user.isEnabled();
	}
	
	public String getPersonName() {
		return user.getPersonLoginDetails().getName();
	}
	
	public Long getLoginId() {
		return user.getLoginId();
	}

	public List<String> getPermissions(){
		ArrayList<String> permissionList = new ArrayList<String>();
		Set<PortalUrlDtls> set = this.user.getPersonLoginDetails().getRole().getUrls();
		for (PortalUrlDtls portalUrlDtls : set) {
			permissionList.add(portalUrlDtls.getPermissionName());
		}
		return permissionList;
	}
}
