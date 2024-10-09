package com.company.optmizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.optmizer.modal.PortalTaskWiseRoleDtls;

public interface PortalTaskWiseRoleDtlsRepository extends JpaRepository<PortalTaskWiseRoleDtls, Long> {
	@Query("SELECT r FROM PortalTaskWiseRoleDtls r WHERE r.activeFlag = true")
    List<PortalTaskWiseRoleDtls> findAllActiveRoles();
	
	
	boolean existsByTaskWiseRoleNameAndActiveFlag(String email, boolean activeFlag);
}
