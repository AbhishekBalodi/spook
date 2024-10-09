package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalClientDtls;
import com.company.optmizer.modal.PortalProjectDtls;
import com.company.optmizer.modal.PortalProjectTeamMapping;
import com.company.optmizer.repository.PortalProjectTeamMappingRepository;

@Service
public class PortalProjectTeamMappingService {
	@Autowired
	PortalProjectTeamMappingRepository portalProjectTeamMappingRepository;
	public List<PortalProjectTeamMapping> saveAll(List<PortalProjectTeamMapping> mapping) {
		 return portalProjectTeamMappingRepository.saveAll(mapping);
	 }
	
	public List<PortalProjectTeamMapping> findAll(){
		return portalProjectTeamMappingRepository.findAll();
	}
	
	public List<PortalProjectTeamMapping> getMappingByProjectId(Long projectId){
		return portalProjectTeamMappingRepository.findByProjectIdAndActiveFlagTrue(projectId);
	}
	
	List<PortalProjectTeamMapping> findByActiveFlagTrue(){
		return portalProjectTeamMappingRepository.findByActiveFlagTrue();
	}
}
