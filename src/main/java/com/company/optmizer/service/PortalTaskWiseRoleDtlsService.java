package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalTaskWiseRoleDtls;
import com.company.optmizer.repository.PortalTaskWiseRoleDtlsRepository;

@Service
public class PortalTaskWiseRoleDtlsService {
	@Autowired
	PortalTaskWiseRoleDtlsRepository portalTaskWiseRoleDtlsRepository;
	
	public List<PortalTaskWiseRoleDtls> findAllActiveRoles(){
		return portalTaskWiseRoleDtlsRepository.findAllActiveRoles();
	}
	
	public PortalTaskWiseRoleDtls saveTaskWiseRole(PortalTaskWiseRoleDtls portalTaskWiseRoleDtls) {
		return portalTaskWiseRoleDtlsRepository.save(portalTaskWiseRoleDtls);
	}
	
	public PortalTaskWiseRoleDtls getRole(Long taskWiseRoleId) {
        return portalTaskWiseRoleDtlsRepository.findById(taskWiseRoleId).orElse(null);
    }
	
	public PortalTaskWiseRoleDtls findById(Long taskWiseRoleId) {
		return portalTaskWiseRoleDtlsRepository.findById(taskWiseRoleId).orElse(null);
	}
	
	public boolean isDupicateTaskWiseRoleType(String roleName) {
		return portalTaskWiseRoleDtlsRepository.existsByTaskWiseRoleNameAndActiveFlag(roleName,true);
	}
}
