package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.optmizer.modal.PortalTaskWiseRoleTaskMapping;

public interface PortalTaskWiseRoleTaskMappingRepository extends JpaRepository<PortalTaskWiseRoleTaskMapping, Long> {
	@Query("SELECT t FROM PortalTaskWiseRoleTaskMapping t WHERE t.activeFlag = true AND t.taskWiseRoleId = :roleId")
    List<PortalTaskWiseRoleTaskMapping> findActiveTasksByRoleId(Long roleId);
	
	List<PortalTaskWiseRoleTaskMapping>  findByTaskWiseRoleIdAndActiveFlag(Long taskWiseRoleId, Boolean activeFlag);
}
