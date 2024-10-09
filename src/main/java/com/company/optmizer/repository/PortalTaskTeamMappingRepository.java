package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.optmizer.modal.PortalTaskTeamMapping;

public interface PortalTaskTeamMappingRepository extends JpaRepository<PortalTaskTeamMapping, Long> {
	@Query("SELECT tm FROM PortalTaskTeamMapping tm JOIN PortalPersonLoginDtls p ON tm.loginId = p.login.loginId WHERE tm.taskId = :taskId AND tm.activeFlag = true AND p.activeFlag = true")
    List<PortalTaskTeamMapping> findTeamMembersByTaskId(@Param("taskId") Long taskId);
	
	@Query("SELECT p.name FROM PortalTaskTeamMapping tm JOIN PortalPersonLoginDtls p ON tm.loginId = p.login.loginId WHERE tm.taskId = :taskId AND tm.activeFlag = true AND p.activeFlag = true")
    List<String> findMemberNamesByTaskId(@Param("taskId") Long taskId);
	
	List<PortalTaskTeamMapping> findByTaskIdAndActiveFlag(Long taskId, Boolean activeFlag);

}
