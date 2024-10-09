package com.company.optmizer.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalPersonLoginDtls;
import com.company.optmizer.modal.PortalProjectTeamMapping;
import com.company.optmizer.repository.PortalPersonLoginDtlsRepository;

@Service
public class PortalPersonLoginDtlsService {

	@Autowired
	PortalPersonLoginDtlsRepository portalPersonLoginDtlsRepository;

	public List<PortalPersonLoginDtls> getCompanyTeam() {
		return portalPersonLoginDtlsRepository.getCompanyTeam();
	}

	public List<Map<String, String>> getCompanyClientTeamById(Long clientId) {
		return portalPersonLoginDtlsRepository.getCompanyClientTeamById(clientId);
	}

	public PortalPersonLoginDtls saveUser(PortalPersonLoginDtls portalPersonLoginDtls) {
		return portalPersonLoginDtlsRepository.save(portalPersonLoginDtls);
	}

	public List<PortalPersonLoginDtls> findAll() {
		return portalPersonLoginDtlsRepository.findAll();
	}

	public Optional<PortalPersonLoginDtls> findById(Long id) {
		return portalPersonLoginDtlsRepository.findById(id);
	}

	public List<Map<String, String>> getCompanyProjectAssignedTeam(Long projectId, Long clientId) {
		return portalPersonLoginDtlsRepository.getCompanyProjectAssignedTeam(projectId, clientId);
	}

	public Optional<PortalPersonLoginDtls> findActivePersonByLoginId(Long loginId) {
		return portalPersonLoginDtlsRepository.findActivePersonByLoginId(loginId);
	}
	
	public Optional<PortalPersonLoginDtls> findPersonByLoginId(Long loginId) {
		return portalPersonLoginDtlsRepository.findPersonByLoginId(loginId);
	}
	
	

	public List<PortalPersonLoginDtls> getNonAdminActiveUsersWithNullClient() {
		return portalPersonLoginDtlsRepository.findNonAdminActiveUsersWithNullClient();
	}

	public Optional<PortalPersonLoginDtls> getPersonDetailsByLoginId(Long loginId) {
		return portalPersonLoginDtlsRepository.findByLogin_LoginId(loginId);
	}

}
