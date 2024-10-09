package com.company.optmizer.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.optmizer.modal.PortalPersonLoginDtls;

public interface PortalPersonLoginDtlsRepository extends JpaRepository<PortalPersonLoginDtls, Long> {

	@Query(value = "SELECT * FROM portal_person_login_dtls WHERE CLIENT_ID IS NULL AND IS_CLIENT_USER IS NULL AND active_flag = true;", nativeQuery = true)
	List<PortalPersonLoginDtls> getCompanyTeam();
	
	@Query("SELECT p FROM PortalPersonLoginDtls p " +
	           "JOIN p.login l " +
	           "JOIN p.role r " +
	           "WHERE p.client IS NULL " +
	           "AND p.isClientUser IS NULL " +
	           "AND p.activeFlag = true " +
	           "AND l.enabled = true " +
	           "AND r.roleName <> 'ADMIN'")
	    List<PortalPersonLoginDtls> findNonAdminActiveUsersWithNullClient();
	
	@Query(value = "SELECT ppld.name, ppld.email, ppld.mobile, plm.last_login, ppld.status FROM portal_person_login_dtls ppld JOIN portal_login_mst plm ON ppld.login_id = plm.login_id WHERE ppld.client_id IS NOT NULL AND ppld.is_client_user IS NOT NULL AND ppld.client_id = :clientId;", nativeQuery = true)
	List<Map<String, String>> getCompanyClientTeamById(@Param("clientId") Long clientId);
	
	@Query(value ="SELECT ppd.project_id, ppd.project_name, ppld.login_id, ppld.name, ppld.email, ppld.mobile, ppld.designation, ppld.expertise,ppld.status FROM portal_project_dtls ppd JOIN portal_project_team_mapping pptm ON ppd.project_id = pptm.project_id AND pptm.active_flag = true JOIN portal_person_login_dtls ppld ON pptm.login_id = ppld.login_id AND ppld.active_flag = true WHERE ppd.client_id = :clientId AND ppd.project_id = :projectId ORDER BY ppd.project_name, ppld.name;", nativeQuery = true)
	
	List<Map<String, String>> getCompanyProjectAssignedTeam(@Param("projectId") Long projectId,@Param("clientId") Long clientId);

	@Query("SELECT p FROM PortalPersonLoginDtls p JOIN p.login l " +
	           "WHERE p.activeFlag = true AND l.enabled = true AND l.loginId = :loginId")
	    Optional<PortalPersonLoginDtls> findActivePersonByLoginId(@Param("loginId") Long loginId);
	
	@Query("SELECT p FROM PortalPersonLoginDtls p JOIN p.login l " +
	           "WHERE  l.loginId = :loginId")
	    Optional<PortalPersonLoginDtls> findPersonByLoginId(@Param("loginId") Long loginId);
	
	Optional<PortalPersonLoginDtls> findByLogin_LoginId(Long loginId);
}
