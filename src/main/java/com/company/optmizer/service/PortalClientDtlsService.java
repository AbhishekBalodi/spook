package com.company.optmizer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalClientDtls;
import com.company.optmizer.modal.PortalProjectDtls;
import com.company.optmizer.repository.PortalClientDtlsRepository;

@Service
public class PortalClientDtlsService {
	
	@Autowired
	PortalClientDtlsRepository clientsRepository;
	
	public List<PortalClientDtls> getAllClients() {
		
		return clientsRepository.findAll();
	}
	
	 public long countClientsByStatus(boolean status) {
	        return clientsRepository.countByStatus(status);
	 }
	 
	 public Optional<PortalClientDtls> getCompanyById(Long id) {
		 return clientsRepository.findById(id);
	         
	    }
	 
	 public PortalClientDtls saveClients(PortalClientDtls clients) {
		 return clientsRepository.save(clients);
	 }
	 
	 public PortalClientDtls getClientByClientId(Long clientId) {
		 return clientsRepository.findClientByClientId(clientId);
	 }
	 
	 List<PortalProjectDtls> findProjectsByClientId(Long clientId){
		 return clientsRepository.findProjectsByClientId(clientId);
	 }
	 
	 public List<PortalClientDtls> getAllActiveClients(Boolean flag){
		 return clientsRepository.findByActiveFlag(flag);
	 }
	 
	 public boolean isDuplicateClientEmail(String email) {
	        return clientsRepository.existsByEmailAndActiveFlag(email, true);
	    }
	 
	 
}
