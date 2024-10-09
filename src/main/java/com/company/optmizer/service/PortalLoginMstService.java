package com.company.optmizer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.company.optmizer.modal.PortalLoginMst;
import com.company.optmizer.repository.PortalLoginDtlsRepository;

@Service
public class PortalLoginMstService {

	@Autowired
	private PortalLoginDtlsRepository portalLoginDtlsRepository;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	public PortalLoginMst saveUser(PortalLoginMst user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return portalLoginDtlsRepository.save(user);
	}
	
	public List<Map<String, Object>> getRoleUserCounts() {
        List<Object[]> results = portalLoginDtlsRepository.findRoleUserCounts();
        List<Map<String, Object>> roleUserCounts = new ArrayList<Map<String, Object>>();
        for (Object[] result : results) {
            Map<String, Object> map = new HashMap<String, Object>();
            //map.put("roleId", result[0]);
            map.put("roleName", result[1]);
            map.put("userCount", result[2]);
            map.put("personNames", result[3] != null ? "["+result[3]+"]" : "");
            roleUserCounts.add(map);
        }
        return roleUserCounts;
    }
	
	public PortalLoginMst getLoginDetailsByLoginId(Long loginId) {
        return portalLoginDtlsRepository.findByLoginId(loginId);
    }
}
