package com.company.optmizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.optmizer.modal.PortalUrlDtls;

import java.util.List;
import java.util.Optional;

public interface PortalUrlDtlsRepository extends JpaRepository<PortalUrlDtls, Long> {
    Optional<PortalUrlDtls> findByUrlPattern(String pattern);
    Optional<List<PortalUrlDtls>> findByPermissionName(String permissionName);
}
