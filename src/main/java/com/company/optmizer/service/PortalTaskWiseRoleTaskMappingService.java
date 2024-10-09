package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalTaskWiseRoleTaskMapping;
import com.company.optmizer.repository.PortalTaskWiseRoleTaskMappingRepository;

@Service
public class PortalTaskWiseRoleTaskMappingService {
	@Autowired
	PortalTaskWiseRoleTaskMappingRepository portalTaskWiseRoleTaskMappingRepository;
	
	public List<PortalTaskWiseRoleTaskMapping> findActiveTasksByRoleId(Long roleId){
		return portalTaskWiseRoleTaskMappingRepository.findActiveTasksByRoleId(roleId);
	}
	
	public List<PortalTaskWiseRoleTaskMapping> saveAll(List<PortalTaskWiseRoleTaskMapping> mapping){
		return portalTaskWiseRoleTaskMappingRepository.saveAll(mapping);
	}
	
	public List<PortalTaskWiseRoleTaskMapping> findByTaskWiseRoleIdAndActiveFlag(Long taskWiseRoleId){
		return portalTaskWiseRoleTaskMappingRepository.findByTaskWiseRoleIdAndActiveFlag(taskWiseRoleId,true);
	}
	

}
