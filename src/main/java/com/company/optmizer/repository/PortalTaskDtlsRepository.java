package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.optmizer.modal.PortalTaskDtls;

public interface PortalTaskDtlsRepository extends JpaRepository<PortalTaskDtls, Long> {
	@Query("SELECT t FROM PortalTaskDtls t WHERE t.projectId = :projectId")
    List<PortalTaskDtls> findTasksByProjectId(@Param("projectId") Long projectId);
	
	@Query("SELECT t FROM PortalTaskDtls t WHERE t.projectId = :projectId AND t.activeFlag = true")
	List<PortalTaskDtls> findAllActiveTasksByProjectId(@Param("projectId") Long projectId);
}
