package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalTaskDtls;
import com.company.optmizer.repository.PortalTaskDtlsRepository;

@Service
public class PortalTaskDtlsService {
		@Autowired
		PortalTaskDtlsRepository portalTaskDtlsRepository;
		
		public PortalTaskDtls saveTask(PortalTaskDtls portalTaskDtls) {
			return portalTaskDtlsRepository.save(portalTaskDtls);
		}
		
		List<PortalTaskDtls> findTasksByProjectId(Long projectId){
			return portalTaskDtlsRepository.findTasksByProjectId(projectId);
		}
		
		List<PortalTaskDtls> findAllActiveTasksByProjectId(Long projectId){
			return portalTaskDtlsRepository.findAllActiveTasksByProjectId(projectId);
		}
		
		public PortalTaskDtls findByTaskId(Long taskId) {
			return portalTaskDtlsRepository.findById(taskId).get();
		}
		
		
}
