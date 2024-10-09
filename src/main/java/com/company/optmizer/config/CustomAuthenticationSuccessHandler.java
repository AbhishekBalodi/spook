package com.company.optmizer.config;

import java.io.IOException;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                        HttpServletResponse response, 
                                        Authentication authentication) 
                                        throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);
        response.sendRedirect(targetUrl);
    }

    protected String determineTargetUrl(Authentication authentication) {
    	Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

    	for (GrantedAuthority authority : authorities) {
            if (authority instanceof CustomGrantedAuthority) {
                CustomGrantedAuthority customAuthority = (CustomGrantedAuthority) authority;
                if (!customAuthority.isClientRole()) {
                    return "/companyDashboard";
                } else if (customAuthority.isClientRole()) {
                    return "/companyClientDashboard";
                }else {
                	throw new IllegalStateException("Unknown role");
                }
            }
        }
    	
    	throw new IllegalStateException("Unknown role");
    }
}

