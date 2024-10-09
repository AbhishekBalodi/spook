package com.company.optmizer.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.optmizer.modal.PortalClientDtls;
import com.company.optmizer.modal.PortalProjectDtls;

public interface PortalClientDtlsRepository extends JpaRepository<PortalClientDtls, Long> {
	@Query("SELECT COUNT(c) FROM PortalClientDtls c WHERE c.status = :status AND c.activeFlag = true")
    long countByStatus(@Param("status") boolean status);
	
	@Query("SELECT p FROM PortalProjectDtls p WHERE p.clientId = :clientId AND p.activeFlag = true")
    List<PortalProjectDtls> findProjectsByClientId(@Param("clientId") Long clientId);
	
	@Query("SELECT p FROM PortalClientDtls p WHERE p.activeFlag = :flag order by crtDt desc")
    public List<PortalClientDtls> findByActiveFlag(Boolean flag);
	
	 boolean existsByEmailAndActiveFlag(String email, boolean activeFlag);
	 
	 @Query("SELECT p FROM PortalClientDtls p WHERE p.clientId = :clientId AND p.activeFlag = true")
	 public PortalClientDtls findClientByClientId(@Param("clientId") Long clientId);
	 
	 
	 
}

