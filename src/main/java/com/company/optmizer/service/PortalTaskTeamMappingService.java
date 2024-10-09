package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalTaskTeamMapping;
import com.company.optmizer.repository.PortalTaskTeamMappingRepository;

@Service
public class PortalTaskTeamMappingService {
	@Autowired
	PortalTaskTeamMappingRepository portalTaskTeamMappingRepository;
	
	public List<PortalTaskTeamMapping> saveAll(List<PortalTaskTeamMapping> mapping) {
		 return portalTaskTeamMappingRepository.saveAll(mapping);
	 }
	
	List<String> findMemberNamesByTaskId(Long taskId){
		return portalTaskTeamMappingRepository.findMemberNamesByTaskId(taskId);
	}
	
	public List<PortalTaskTeamMapping> findTeamMembersByTaskId(Long taskId){
		return portalTaskTeamMappingRepository.findTeamMembersByTaskId(taskId);
	}
	
	public List<PortalTaskTeamMapping> findByTaskId(Long taskId) {
	    return portalTaskTeamMappingRepository.findByTaskIdAndActiveFlag(taskId,true);
	}

}
