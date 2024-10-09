package com.company.optmizer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalUrlDtls;
import com.company.optmizer.repository.PortalUrlDtlsRepository;

@Service
public class PortalUrlDtlsService {

	@Autowired
	PortalUrlDtlsRepository portalUrlDtlsRepository;

	public Optional<List<PortalUrlDtls>> findByPermission(String permissionName) {
		return portalUrlDtlsRepository.findByPermissionName(permissionName);

	}
}
