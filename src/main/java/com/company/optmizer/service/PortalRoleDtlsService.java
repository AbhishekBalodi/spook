package com.company.optmizer.service;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalRoleDtls;
import com.company.optmizer.repository.PortalRoleDtlsRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class PortalRoleDtlsService {
	@Autowired
	PortalRoleDtlsRepository portalRoleDtlsRepository;
	@Autowired
    private EntityManager entityManager;
	public PortalRoleDtls saveRole(PortalRoleDtls portalRoleDtls) {
		return portalRoleDtlsRepository.save(portalRoleDtls);
	}
	
	@Transactional
	public List<PortalRoleDtls> findByActiveFlag(Boolean flag) {
		Session session = entityManager.unwrap(Session.class);
        session.enableFilter("activeFilter").setParameter("activeFlag", true);
		return portalRoleDtlsRepository.findByActiveFlag(flag);
	}
	
	public boolean isDupicateAccessType(String roleName) {
        return portalRoleDtlsRepository.existsByRoleNameAndActiveFlag(roleName, true);
    }
}
