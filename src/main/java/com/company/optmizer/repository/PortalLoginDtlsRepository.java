package com.company.optmizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.company.optmizer.modal.PortalLoginMst;

import java.util.List;
import java.util.Optional;

public interface PortalLoginDtlsRepository extends JpaRepository<PortalLoginMst, Long> {
    Optional<PortalLoginMst> findByUsername(String username);
    
    @Query(value = "SELECT R.role_id AS ROLE_ID,  R.role_name AS ROLE_NAME, Count(P.person_id) AS USER_COUNT, Group_concat(P.name SEPARATOR ', ') AS PERSON_NAMES FROM portal_role_dtls R  LEFT JOIN portal_person_login_dtls P  ON R.role_id = P.role_id  AND P.active_flag = true  AND P.status = true  LEFT JOIN portal_login_mst L  ON P.login_id = L.login_id  AND L.enabled = true WHERE R.active_flag = true  AND R.is_client_role = false GROUP BY R.role_id,  R.role_name;", nativeQuery = true)
    List<Object[]> findRoleUserCounts();
    
    PortalLoginMst findByLoginId(Long loginId);
}
