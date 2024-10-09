package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalTaskWiseUserTaskMapping;
import com.company.optmizer.repository.PortalTaskWiseUserTaskMappingRepository;

@Service
public class PortalTaskWiseUserTaskMappingService {
	
	@Autowired
	PortalTaskWiseUserTaskMappingRepository portalTaskWiseUserTaskMappingRepository;
	
	public List<PortalTaskWiseUserTaskMapping> saveAll(List<PortalTaskWiseUserTaskMapping> mapping){
		return portalTaskWiseUserTaskMappingRepository.saveAll(mapping);
	}
	
}
