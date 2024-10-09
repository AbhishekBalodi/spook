package com.company.optmizer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalUrlRoleMapping;
import com.company.optmizer.repository.PortalUrlRoleMappingRepository;

import jakarta.persistence.EntityManager;
@Service
public class PortalUrlRoleMappingService {
	@Autowired
	PortalUrlRoleMappingRepository portalUrlRoleMappingRepository;

	public List<PortalUrlRoleMapping> saveAll(List<PortalUrlRoleMapping> portalUrlRoleMapping) {
		return  portalUrlRoleMappingRepository.saveAll(portalUrlRoleMapping);
	}
}
