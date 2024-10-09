package com.company.optmizer.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.LoginPrincipal;
import com.company.optmizer.modal.PortalLoginMst;
import com.company.optmizer.repository.PortalLoginDtlsRepository;


@Service
public class MyPortalLoginDtlsService implements UserDetailsService {
	
	@Autowired
    private PortalLoginDtlsRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	PortalLoginMst user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

 

        return new LoginPrincipal(user);
    }

}