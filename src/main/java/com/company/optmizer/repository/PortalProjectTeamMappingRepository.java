package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.optmizer.modal.PortalProjectTeamMapping;

public interface PortalProjectTeamMappingRepository extends JpaRepository<PortalProjectTeamMapping, Long> {

	List<PortalProjectTeamMapping> findByProjectIdAndActiveFlagTrue(Long projectId);
	
	List<PortalProjectTeamMapping> findByActiveFlagTrue();
}
