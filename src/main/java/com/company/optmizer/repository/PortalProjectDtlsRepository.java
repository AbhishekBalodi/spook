package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.optmizer.modal.PortalProjectDtls;

public interface PortalProjectDtlsRepository extends JpaRepository<PortalProjectDtls, Long> {
	List<PortalProjectDtls> findByClientId(Long clientId);

	
	@Query("SELECT p FROM PortalProjectDtls p JOIN PortalClientDtls c ON p.clientId = c.clientId " +
	           "WHERE p.activeFlag = true AND c.activeFlag = true ORDER BY p.crtDt")
	    List<PortalProjectDtls> findActiveProjectsWithActiveClients();
	
	PortalProjectDtls findByProjectId(Long projectId);
	
	 List<PortalProjectDtls> findByClientIdAndActiveFlag(Long clientId, Boolean activeFlag);
	
	
}
	