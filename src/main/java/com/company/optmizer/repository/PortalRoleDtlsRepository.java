package com.company.optmizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.optmizer.modal.PortalRoleDtls;

import java.util.List;
import java.util.Optional;

public interface PortalRoleDtlsRepository extends JpaRepository<PortalRoleDtls, Long> {
    Optional<PortalRoleDtls> findByRoleName(String name);
    
    @Query("SELECT p FROM PortalRoleDtls p WHERE p.activeFlag = :flag")
    public List<PortalRoleDtls> findByActiveFlag(Boolean flag);
    
    boolean existsByRoleNameAndActiveFlag(String roleName, boolean activeFlag);
}
