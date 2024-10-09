package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalLoginMst;
import com.company.optmizer.modal.PortalProjectDtls;
import com.company.optmizer.repository.PortalProjectDtlsRepository;

@Service
public class PortalProjectDtlsService {
	@Autowired
	PortalProjectDtlsRepository portalProjectDtlsRepository;
	public PortalProjectDtls saveProject(PortalProjectDtls portalProjectDtls) {
		
		return portalProjectDtlsRepository.save(portalProjectDtls);
	}
	
	public List<PortalProjectDtls> findAll(){
		return portalProjectDtlsRepository.findAll();
	}
	
	public List<PortalProjectDtls> findByClientId(Long clientId){
		return portalProjectDtlsRepository.findByClientId(clientId);
	}
	
	public List<PortalProjectDtls> findActiveProjectByClientId(Long clientId){
		return portalProjectDtlsRepository.findByClientIdAndActiveFlag(clientId,true);
	}

	
	public PortalProjectDtls findByProjectId(Long projectId) {
		return portalProjectDtlsRepository.findByProjectId(projectId);
	}
	
	public List<PortalProjectDtls> getAllActiveProjects() {
        return portalProjectDtlsRepository.findActiveProjectsWithActiveClients();
    }
	
	
}
