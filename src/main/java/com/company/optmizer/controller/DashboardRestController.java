package com.company.optmizer.controller;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.company.optmizer.modal.LoginPrincipal;
import com.company.optmizer.modal.PortalClientDtls;
import com.company.optmizer.modal.PortalLoginMst;
import com.company.optmizer.modal.PortalPersonLoginDtls;
import com.company.optmizer.modal.PortalProjectDtls;
import com.company.optmizer.modal.PortalProjectTeamMapping;
import com.company.optmizer.modal.PortalRoleDtls;
import com.company.optmizer.modal.PortalTaskDtls;
import com.company.optmizer.modal.PortalTaskTeamMapping;
import com.company.optmizer.modal.PortalTaskWiseRoleDtls;
import com.company.optmizer.modal.PortalTaskWiseRoleTaskMapping;
import com.company.optmizer.modal.PortalTaskWiseUserTaskMapping;
import com.company.optmizer.modal.PortalUrlDtls;
import com.company.optmizer.modal.PortalUrlRoleMapping;
import com.company.optmizer.service.PortalClientDtlsService;
import com.company.optmizer.service.PortalCommonService;
import com.company.optmizer.service.PortalLoginMstService;
import com.company.optmizer.service.PortalPersonLoginDtlsService;
import com.company.optmizer.service.PortalProjectDtlsService;
import com.company.optmizer.service.PortalProjectTeamMappingService;
import com.company.optmizer.service.PortalRoleDtlsService;
import com.company.optmizer.service.PortalTaskDtlsService;
import com.company.optmizer.service.PortalTaskTeamMappingService;
import com.company.optmizer.service.PortalTaskWiseRoleDtlsService;
import com.company.optmizer.service.PortalTaskWiseRoleTaskMappingService;
import com.company.optmizer.service.PortalUrlDtlsService;
import com.company.optmizer.service.PortalUrlRoleMappingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
@RestController
public class DashboardRestController {

	@Autowired
	private PortalClientDtlsService portalClientDtlsService;
	@Autowired
	private PortalLoginMstService portalLoginMstService;
	@Autowired
	private PortalPersonLoginDtlsService portalPersonLoginDtlsService;
	@Autowired
	private PortalCommonService portalCommonService;
	@Autowired
	private PortalRoleDtlsService portalRoleDtlsService;
	@Autowired
	private PortalUrlDtlsService portalUrlDtlsService;
	@Autowired
	private PortalUrlRoleMappingService portalUrlRoleMappingService;
	@Autowired
	private PortalProjectDtlsService portalProjectDtlsService;
	@Autowired
	private PortalProjectTeamMappingService portalProjectTeamMappingService;
	@Autowired
	private PortalTaskWiseRoleDtlsService portalTaskWiseRoleDtlsService;
	@Autowired
	private PortalTaskWiseRoleTaskMappingService  portalTaskWiseRoleTaskMappingService;
	@Autowired
	PortalTaskDtlsService portalTaskDtlsService;
	@Autowired
	PortalTaskTeamMappingService portalTaskTeamMappingService;
	
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");


    
    private Long getCurrentLoginId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
        	LoginPrincipal loginPrincipal = (LoginPrincipal) authentication.getPrincipal();
        	return loginPrincipal.getLoginId();
        }
        return 0l; 
    }
    
	   @GetMapping("/companyClientListData")
	    public String companyClientListData() {
	    	String responseString = "[]";
	    	try {
	    		List<PortalClientDtls> list = portalClientDtlsService.getAllActiveClients(true);
	        	Map<String, Object> responseMap = new HashMap<>();
	            responseMap.put("totalClients", list.size());
	            responseMap.put("activeClients", portalClientDtlsService.countClientsByStatus(true));
	            responseMap.put("inactiveClients", portalClientDtlsService.countClientsByStatus(false));
	            responseMap.put("data", list);
	            ObjectMapper objectMapper = new ObjectMapper();
	            responseString = objectMapper.writeValueAsString(responseMap);
			} catch (Exception e) {
				e.printStackTrace();
			}
	        
	        return responseString;
	    }
	   
	   @GetMapping("/isDuplicateClientEmail")
	    public Boolean isDuplicateClientEmail(@RequestParam String email) {
	        boolean isDuplicate = portalClientDtlsService.isDuplicateClientEmail(email);
	        return isDuplicate;
	    }
	   
	   @GetMapping("/isDupicateTaskWiseRoleType")
	    public Boolean isDupicateTaskWiseRoleType(@RequestParam String roleName) {
	        boolean isDuplicate = portalTaskWiseRoleDtlsService.isDupicateTaskWiseRoleType(roleName);
	        return isDuplicate;
	    }
	   
	   @PutMapping("/companyTaskWiseRoleDelete")
	    public Boolean companyTaskWiseRoleDelete(@RequestParam Long taskWiseRoleToDelete) {
	        boolean isUpdated = false;
	        try {
	        	PortalTaskWiseRoleDtls existingTaskWiseRole = portalTaskWiseRoleDtlsService.findById(taskWiseRoleToDelete);
	        	existingTaskWiseRole.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	        	existingTaskWiseRole.setLstUpdtByLoginId(getCurrentLoginId());
	        	existingTaskWiseRole.setActiveFlag(false);
	        	portalTaskWiseRoleDtlsService.saveTaskWiseRole(existingTaskWiseRole);
	            isUpdated = true;
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return isUpdated;
	    }
	   
	   @GetMapping("/getTaskWiseRoleDetails")
	   public List<PortalTaskWiseRoleTaskMapping> getTaskWiseRoleDetails(@RequestParam Long taskWiseRoleId) {
	        List<PortalTaskWiseRoleTaskMapping> tasks = new ArrayList<>();
	        tasks = portalTaskWiseRoleTaskMappingService.findActiveTasksByRoleId(taskWiseRoleId);
	        return tasks;
	    }
	   
	@PostMapping("/companySaveClientDetails")
    public Boolean companySaveClientDetails(@RequestBody PortalClientDtls clients) {
		boolean isSaved = false;
		try {
			Timestamp currentTimestamp = new Timestamp(Calendar.getInstance().getTimeInMillis());
			clients.setActiveFlag(true);
		    clients.setCrtDt(currentTimestamp);
		    clients.setStatus(true);
		    clients.setCrtByLoginId(getCurrentLoginId());
			clients = portalClientDtlsService.saveClients(clients);
			isSaved = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
        return isSaved;
    }
	
	@PutMapping("/companyUpdateClientDetails")
    public Boolean companyUpdateClientDetails(@RequestParam Long clientId,@RequestBody PortalClientDtls clients) {
		boolean isUpdated = false;
		try {
			PortalClientDtls existingClient = portalClientDtlsService.getClientByClientId(clientId);
			if(existingClient!=null) {
				clients.setCrtDt(existingClient.getCrtDt());
				clients.setCrtByLoginId(existingClient.getCrtByLoginId());
				clients.setStatus(existingClient.getStatus());
			}
			Timestamp currentTimestamp = new Timestamp(Calendar.getInstance().getTimeInMillis());
			clients.setClientId(clientId);
			clients.setLstUpdtDt(currentTimestamp);
			clients.setLstUpdtByLoginId(getCurrentLoginId());
			clients.setActiveFlag(true);
			clients = portalClientDtlsService.saveClients(clients);
			isUpdated = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isUpdated;
    }
	
	@PutMapping("/companyChangeClientStatus")
    public Boolean companyChangeClientStatus(@RequestParam Long clientId) {
        boolean isUpdated = false;
        try {
        	PortalClientDtls existingClient = portalClientDtlsService.getClientByClientId(clientId);
        	existingClient.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        	existingClient.setLstUpdtByLoginId(getCurrentLoginId());
        	existingClient.setStatus(!existingClient.getStatus());
        	portalClientDtlsService.saveClients(existingClient);
            isUpdated = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUpdated;
    }
	
	@PutMapping("/companyDeleteClient")
    public Boolean companyDeleteClient(@RequestParam Long clientId) {
        boolean isUpdated = false;
        try {
        	PortalClientDtls existingClient = portalClientDtlsService.getClientByClientId(clientId);
        	existingClient.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        	existingClient.setLstUpdtByLoginId(getCurrentLoginId());
        	existingClient.setActiveFlag(false);
        	portalClientDtlsService.saveClients(existingClient);
            isUpdated = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUpdated;
    }
	
	
	
	@GetMapping("/companyAccessTypeData")
    public String companyAccessTypeData() {
    	String responseString = "[]";
    	try {
    		List<Map<String, Object>> coutData = portalLoginMstService.getRoleUserCounts();
    		ObjectMapper objectMapper = new ObjectMapper();
    		Map<String, Object> responseMap = new HashMap<>();
    		responseMap.put("data", coutData);
            responseString = objectMapper.writeValueAsString(responseMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return responseString;
    }
	
	@GetMapping("/companyTeamListData")
    public String companyTeamListData() {
    	String responseString = "[]";
    	try {
    		List<PortalPersonLoginDtls> companyTeam = portalPersonLoginDtlsService.getNonAdminActiveUsersWithNullClient();
    		for(PortalPersonLoginDtls portalPersonLoginDtls : companyTeam) {
    			portalPersonLoginDtls.setPersonLoginId(portalPersonLoginDtls.getLogin().getLoginId());
    		}
    		ObjectMapper objectMapper = new ObjectMapper();
            responseString = objectMapper.writeValueAsString(companyTeam);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return responseString;
    }
	
	@PostMapping("/companyCreateTeamMember")
    public Boolean companyCreateTeamMember(@RequestParam MultiValueMap<String, String> formData) {
		boolean isSaved = false;
		PortalLoginMst portalLoginMst = new PortalLoginMst();
		PortalPersonLoginDtls portalPersonLoginDtls = new PortalPersonLoginDtls();
		PortalRoleDtls portalRoleDtls = new PortalRoleDtls();
		
		try {
			portalLoginMst.setUsername(formData.getFirst("email"));
			portalLoginMst.setPassword(formData.getFirst("password"));
			portalLoginMst.setEnabled(true);
			
			portalPersonLoginDtls.setLogin(portalLoginMst);
			portalRoleDtls.setRoleId(Long.parseLong(formData.getFirst("role")));
			portalPersonLoginDtls.setRole(portalRoleDtls);
			portalPersonLoginDtls.setName(formData.getFirst("name"));
			portalPersonLoginDtls.setEmail(formData.getFirst("email"));
			portalPersonLoginDtls.setMobile(formData.getFirst("mobile"));
			portalPersonLoginDtls.setAdditionalEmail(formData.getFirst("additionalEmail"));
			portalPersonLoginDtls.setAdditionalMobile(formData.getFirst("additionalMobile"));
			portalPersonLoginDtls.setAddress(formData.getFirst("address"));
			portalPersonLoginDtls.setTypeOfEmployment(formData.getFirst("typeOfEmployment"));
			portalPersonLoginDtls.setDesignation(formData.getFirst("taskWiseRole"));
			portalPersonLoginDtls.setStatus(true);
			portalPersonLoginDtls.setExpertise(formData.getFirst("expertise"));
			portalPersonLoginDtls.setBankName(formData.getFirst("bankName"));
			portalPersonLoginDtls.setAccountHolderName(formData.getFirst("accountHolderName"));
			portalPersonLoginDtls.setBranchName(formData.getFirst("bankBranch"));
			portalPersonLoginDtls.setAccountNumber(formData.getFirst("accountNumber"));
			portalPersonLoginDtls.setIfscCode(formData.getFirst("ifscCode"));
			portalPersonLoginDtls.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			portalPersonLoginDtls.setCrtByLoginId(getCurrentLoginId());
			portalPersonLoginDtls.setActiveFlag(true);
			portalPersonLoginDtls.setCtc(formData.getFirst("ctc")!=null && formData.getFirst("ctc").length()>0 ? Long.parseLong(formData.getFirst("ctc")) : null);
			
			List<PortalTaskWiseUserTaskMapping> taskMappings = new ArrayList<>();

	        for (String key : formData.keySet()) {
	            if (key.startsWith("tasks")) { 
	                String[] taskInfo = key.split("\\.");  
	                String field = taskInfo[1]; 
	             
	                if ("taskId".equals(field)) {
	                    Long taskId = Long.valueOf(formData.getFirst(key)); 
	                    Long taskCost = Long.valueOf(formData.getFirst("tasks[" + taskId + "].cost")); 

	                    PortalTaskWiseUserTaskMapping mapping = new PortalTaskWiseUserTaskMapping();
	                    mapping.setTaskId(taskId);
	                    mapping.setTaskCost(taskCost);
	                    mapping.setActiveFlag(true);  
	                    mapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	                    mapping.setCrtByLoginId(getCurrentLoginId());
	                 
	                    taskMappings.add(mapping);
	                }
	            }
	        }

	        
			portalCommonService.saveTeamMember(portalLoginMst, portalPersonLoginDtls,taskMappings);
			
			isSaved = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
        return isSaved;
    }
	
	@PostMapping("/companyCreateAccessType")
    public Boolean companyCreateAccessType(@RequestBody Map<String, Object> request) {
		boolean isSaved = false;
		try {
			
	        String roleName = (String) request.get("roleName");
	        @SuppressWarnings("unchecked")
			List<String> permissions = (List<String>) request.get("permissions");
	        permissions.add("companyDashboard");
	        PortalRoleDtls portalRoleDtls = new PortalRoleDtls();
	        portalRoleDtls.setRoleName(roleName);
	        portalRoleDtls.setIsClientRole(false);
	        portalRoleDtls.setActiveFlag(true);
	        portalRoleDtls.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	        portalRoleDtls.setCrtByLoginId(getCurrentLoginId());
	        
	        List<PortalUrlRoleMapping> mappings = new ArrayList<>();
	        for (String permission : permissions) {
	            Optional<List<PortalUrlDtls>> optionalUrls = portalUrlDtlsService.findByPermission(permission);
	            if (optionalUrls.isPresent()) {
	                List<PortalUrlDtls> urlList = optionalUrls.get();
	                for (PortalUrlDtls url : urlList) {
	                	PortalUrlRoleMapping mapping = new PortalUrlRoleMapping();
	                	mapping.setActiveFlag(true);
	                	mapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	                	mapping.setCrtByLoginId(getCurrentLoginId());
	                    mapping.setUrlId(url.getUrlId());
	                    mappings.add(mapping);
	                }
	            }
	        }
	        portalCommonService.createNewRole(portalRoleDtls, mappings);
			isSaved = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
        return isSaved;
    }
	
	@GetMapping("/isDupicateAccessType")
    public Boolean isDupicateAccessType(@RequestParam String roleName) {
		boolean isDuplicate = false;
        try {
        	isDuplicate = portalRoleDtlsService.isDupicateAccessType(roleName);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return isDuplicate;
    }
   
	
	@GetMapping("/companyClientTeamListData")
    public String companyClientTeamListData(@RequestParam("clientId") Long clientId) {
    	String responseString = "[]";
    	try {
    		List<Map<String, String>> companyClientTeam = portalPersonLoginDtlsService.getCompanyClientTeamById(clientId);
    		ObjectMapper objectMapper = new ObjectMapper();
            responseString = objectMapper.writeValueAsString(companyClientTeam);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return responseString;
    }
	
	@PostMapping("/companyCreateClientUser")
	public String companyCreateClientUser(@RequestBody Map<String, Object> userData) {
		PortalLoginMst portalLoginMst = new PortalLoginMst();
		PortalPersonLoginDtls portalPersonLoginDtls = new PortalPersonLoginDtls();
		PortalRoleDtls portalRoleDtls = new PortalRoleDtls();
		PortalClientDtls portalClientDtls = new PortalClientDtls(); 
		
		String firstName = (String) userData.get("firstName");
        String lastName = (String) userData.get("lastName");
        String designation = (String) userData.get("designation");
        String email = (String) userData.get("email");
        String mobile = (String) userData.get("mobile");
        String password = (String) userData.get("password");
        boolean primaryUser = (Boolean) userData.get("primaryUser");
        boolean noWelcomeEmail = (Boolean) userData.get("noWelcomeEmail");
        boolean setPasswordEmail = (Boolean) userData.get("setPasswordEmail");
        String clientId = (String) userData.get("clientId");
        List<String> userPermissions = (List<String>) userData.get("userPermissions");
        userPermissions.add("companyClientDashboard");
        portalRoleDtls.setRoleName("CLIENT_USER_"+email);
        portalRoleDtls.setIsClientRole(true);
        
        portalLoginMst.setUsername(email);
		portalLoginMst.setPassword(password);
		portalLoginMst.setEnabled(true);
		
		portalPersonLoginDtls.setName(firstName + " " +lastName);
		portalPersonLoginDtls.setEmail(email);
		portalPersonLoginDtls.setMobile(mobile);
		portalPersonLoginDtls.setDesignation(designation);
		portalPersonLoginDtls.setStatus(true);
		portalPersonLoginDtls.setIsClientUser(true);
		portalPersonLoginDtls.setIsPrimaryClientUser(primaryUser);
		
		portalClientDtls.setClientId(Long.parseLong(clientId));
		portalPersonLoginDtls.setClient(portalClientDtls);
		
		List<PortalUrlRoleMapping> mappings = new ArrayList<>();
        for (String permission : userPermissions) {
            Optional<List<PortalUrlDtls>> optionalUrls = portalUrlDtlsService.findByPermission(permission);

            if (optionalUrls.isPresent()) {
                List<PortalUrlDtls> urlList = optionalUrls.get();
                for (PortalUrlDtls url : urlList) {
                	PortalUrlRoleMapping mapping = new PortalUrlRoleMapping();
                    //mapping.setRoleId(portalRoleDtls.getRoleId());
                    mapping.setUrlId(url.getUrlId());
                    mappings.add(mapping);
                }
            }
        }
        
        portalCommonService.createNewRoleAndUser(portalLoginMst, portalPersonLoginDtls, portalRoleDtls, mappings);
        
		return "Usere has been successfully saved!";
	}
	

	@GetMapping("/companyGetClientProjectListData")
    public Map<String, Object> companyGetClientProjectListData(@RequestParam("clientId") Long clientId) {
        return portalCommonService.companyGetClientProjectListData(clientId);
    }
	
	@PostMapping("/companyCreateClientProject")
	public String companyCreateClientProject(@RequestBody Map<String, Object> projectData) throws ParseException {
		PortalProjectDtls portalProjectDtls = new PortalProjectDtls();
		
		portalProjectDtls.setProjectName((String) projectData.get("projectName"));
		portalProjectDtls.setBillingType(Long.parseLong((String) projectData.get("billingType")));
		portalProjectDtls.setStatus(Long.parseLong((String) projectData.get("status")));
		portalProjectDtls.setTotalRate(Long.parseLong((String) projectData.get("totalRate")));
		portalProjectDtls.setEstimatedHours(Long.parseLong((String) projectData.get("estimatedHours")));
		portalProjectDtls.setDescription((String) projectData.get("description"));
		String startDateStr = (String) projectData.get("startDate");
        String deadlineStr = (String) projectData.get("deadline");
        
        Date startDate = parseDate(startDateStr);
        Date endDate = parseDate(deadlineStr);
		
        portalProjectDtls.setStartDate(startDate);
        portalProjectDtls.setEndDate(endDate);
		
		Long clientId = Long.parseLong((String) projectData.get("clientId")); 
		portalProjectDtls.setClientId(clientId);

		List<?> teamProjectMapping = (List<?>) projectData.get("members");
	    List<PortalProjectTeamMapping> mappings = new ArrayList<>();
	    for (Object memberIdObj : teamProjectMapping) {
	        if (memberIdObj instanceof String) {
	            String memberIdStr = (String) memberIdObj;
	            Long memberId = Long.parseLong(memberIdStr);
	            PortalProjectTeamMapping mapping = new PortalProjectTeamMapping();
	            mapping.setLoginId(memberId);
	            mappings.add(mapping);
	        } else {
	            throw new IllegalArgumentException("Expected member ID to be a String");
	        }
	    }
        
        portalCommonService.createClientProject(portalProjectDtls, mappings);
        return "Project saved successfully!";
    }
	
	
	
	
	@GetMapping("/companyGetProjectByClient")
    public String companyGetProjectByClient(@RequestParam Long clientId) throws JsonProcessingException  {
		String responseString = "[]";
		List<PortalProjectDtls> assignedProjectToClient = portalProjectDtlsService.findActiveProjectByClientId(clientId);
		ObjectMapper objectMapper = new ObjectMapper();
        responseString = objectMapper.writeValueAsString(assignedProjectToClient);
		return responseString;
    }
	
	@GetMapping({"/companyGetMembersByProject","/companyGetAllocatedMemberInProject"})
    public String getMembersByProject(@RequestParam Long projectId, @RequestParam Long clientId) throws JsonProcessingException {
		String responseString = "[]";
		List<Map<String, String>> assignedTeam = portalPersonLoginDtlsService.getCompanyProjectAssignedTeam(projectId,clientId);
		ObjectMapper objectMapper = new ObjectMapper();
        responseString = objectMapper.writeValueAsString(assignedTeam);
		return responseString;
    }
	
	
	
	
	@PostMapping({"/companyCreateClientTask","/companyCreateTask"})
	public String companyCreateClientTask(@RequestBody Map<String, Object> taskData) {
		PortalTaskDtls portalTaskDtls = new PortalTaskDtls();
		
		portalTaskDtls.setTaskName((String) taskData.get("taskName"));
		portalTaskDtls.setProjectId(Long.parseLong((String) taskData.get("projectId")));
		
		String startDateStr = (String) taskData.get("startDate");
        String deadlineStr = (String) taskData.get("deadline");
        
        Date startDate = parseDate(startDateStr);
        Date endDate = parseDate(deadlineStr);
		
        portalTaskDtls.setStartDate(startDate);
        portalTaskDtls.setEndDate(endDate);
		
        portalTaskDtls.setPriority(Long.parseLong((String) taskData.get("priority")));
        portalTaskDtls.setStatus(Long.parseLong((String) taskData.get("status")));
        portalTaskDtls.setDescription((String) taskData.get("description"));
        portalTaskDtls.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        portalTaskDtls.setCrtByLoginId(getCurrentLoginId());
        portalTaskDtls.setActiveFlag(true);
        
		List<?> teamTaskMapping = (List<?>) taskData.get("members");
	    List<PortalTaskTeamMapping> mappings = new ArrayList<>();
	    for (Object memberIdObj : teamTaskMapping) {
	        if (memberIdObj instanceof String) {
	            String memberIdStr = (String) memberIdObj;
	            Long memberId = Long.parseLong(memberIdStr);
	            PortalTaskTeamMapping mapping = new PortalTaskTeamMapping();
	            mapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	            mapping.setCrtByLoginId(getCurrentLoginId());
	            mapping.setActiveFlag(true);
	            mapping.setLoginId(memberId);
	            mappings.add(mapping);
	        } else {
	            throw new IllegalArgumentException("Expected member ID to be a String");
	        }
	    }
        
        portalCommonService.saveTask(portalTaskDtls, mappings);
        return "Task saved successfully!";
	}
	
	@PutMapping("/companyUpdateTask")
	public String companyUpdateTask(@RequestBody Map<String, Object> taskData) {
	    Long taskId = Long.parseLong(taskData.get("taskId")+"");
	    PortalTaskDtls portalTaskDtls = portalTaskDtlsService.findByTaskId(taskId);

	    // Update task details
	    portalTaskDtls.setTaskId(taskId);
	    portalTaskDtls.setTaskName((String) taskData.get("taskName"));
	    portalTaskDtls.setProjectId(Long.parseLong((String) taskData.get("projectId")));

	    String startDateStr = (String) taskData.get("startDate");
	    String deadlineStr = (String) taskData.get("deadline");

	    Date startDate = parseDate(startDateStr);
	    Date endDate = parseDate(deadlineStr);

	    portalTaskDtls.setStartDate(startDate);
	    portalTaskDtls.setEndDate(endDate);

	    portalTaskDtls.setPriority(Long.parseLong((String) taskData.get("priority")));
	    portalTaskDtls.setStatus(Long.parseLong((String) taskData.get("status")));
	    portalTaskDtls.setDescription((String) taskData.get("description"));
	    portalTaskDtls.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	    portalTaskDtls.setLstUpdtByLoginId(getCurrentLoginId());

	    // Fetch current task members from DB
	    List<PortalTaskTeamMapping> existingMappings = portalTaskTeamMappingService.findByTaskId(taskId);
	    List<Long> existingMemberIds = existingMappings.stream().map(PortalTaskTeamMapping::getLoginId).collect(Collectors.toList());

	    // New members from request
	    List<?> newMemberIds = (List<?>) taskData.get("members");
	    List<Long> newMemberIdList = newMemberIds.stream().map(memberId -> Long.parseLong((String) memberId)).collect(Collectors.toList());

	    List<PortalTaskTeamMapping> updatedMappings = new ArrayList<>();

	    // Deactivate removed members
	    for (PortalTaskTeamMapping existingMapping : existingMappings) {
	        if (!newMemberIdList.contains(existingMapping.getLoginId())) {
	            existingMapping.setActiveFlag(false);
	            existingMapping.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	            existingMapping.setLstUpdtByLoginId(getCurrentLoginId());
	            updatedMappings.add(existingMapping);
	        }
	    }

	    // Add new members
	    for (Long newMemberId : newMemberIdList) {
	        if (!existingMemberIds.contains(newMemberId)) {
	            PortalTaskTeamMapping newMapping = new PortalTaskTeamMapping();
	            newMapping.setTaskId(taskId);
	            newMapping.setLoginId(newMemberId);
	            newMapping.setActiveFlag(true);
	            newMapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	            newMapping.setCrtByLoginId(getCurrentLoginId());
	            updatedMappings.add(newMapping);
	        }
	    }

	    // Save task and member mappings
	    portalCommonService.saveTask(portalTaskDtls, updatedMappings);

	    return "Task updated successfully!";
	}


	
	@PostMapping("/companyCreateProject")
	public String companyCreateProject(@RequestBody Map<String, Object> projectData){
		try {
			PortalProjectDtls portalProjectDtls = new PortalProjectDtls();
			portalProjectDtls.setProjectName((String) projectData.get("projectName"));
			portalProjectDtls.setBillingType(Long.parseLong((String) projectData.get("billingType")));
			portalProjectDtls.setStatus(Long.parseLong((String) projectData.get("status")));
			portalProjectDtls.setTotalRate(Long.parseLong((String) projectData.get("totalRate")));
			portalProjectDtls.setEstimatedHours(Long.parseLong((String) projectData.get("estimatedHours")));
			portalProjectDtls.setDescription((String) projectData.get("description"));
			portalProjectDtls.setActiveFlag(true);
			portalProjectDtls.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			portalProjectDtls.setCrtByLoginId(getCurrentLoginId());
			String startDateStr = (String) projectData.get("startDate");
	        String deadlineStr = (String) projectData.get("deadline");
	        
	        Date startDate = parseDate(startDateStr);
	        Date endDate = parseDate(deadlineStr);
			
	        portalProjectDtls.setStartDate(startDate);
	        portalProjectDtls.setEndDate(endDate);
			
			Long clientId = Long.parseLong((String) projectData.get("clientId")); 
			portalProjectDtls.setClientId(clientId);

			List<?> teamProjectMapping = (List<?>) projectData.get("members");
		    List<PortalProjectTeamMapping> mappings = new ArrayList<>();
		    for (Object memberIdObj : teamProjectMapping) {
		        if (memberIdObj instanceof String) {
		            String memberIdStr = (String) memberIdObj;
		            Long memberId = Long.parseLong(memberIdStr);
		            PortalProjectTeamMapping mapping = new PortalProjectTeamMapping();
		            mapping.setLoginId(memberId);
		            mapping.setActiveFlag(true);
		            mapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
		            mapping.setCrtByLoginId(getCurrentLoginId());
		            mappings.add(mapping);
		        } else {
		            throw new IllegalArgumentException("Expected member ID to be a String");
		        }
		    }
	        
	        portalCommonService.createClientProject(portalProjectDtls, mappings);
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Project saved successfully!";
    }
	
	@PutMapping("/companyUpdateProject")
	public String companyUpdateProject(@RequestParam Long projectId,@RequestBody Map<String, Object> projectData){
		try {
			PortalProjectDtls portalProjectDtls = new PortalProjectDtls();
			portalProjectDtls.setProjectName((String) projectData.get("projectName"));
			portalProjectDtls.setBillingType(Long.parseLong((String) projectData.get("billingType")));
			portalProjectDtls.setStatus(Long.parseLong((String) projectData.get("status")));
			portalProjectDtls.setTotalRate(Long.parseLong((String) projectData.get("totalRate")));
			portalProjectDtls.setEstimatedHours(Long.parseLong((String) projectData.get("estimatedHours")));
			portalProjectDtls.setDescription((String) projectData.get("description"));
			portalProjectDtls.setActiveFlag(true);
			String startDateStr = (String) projectData.get("startDate");
	        String deadlineStr = (String) projectData.get("deadline");
	        
	        Date startDate = parseDate(startDateStr);
	        Date endDate = parseDate(deadlineStr);
			
	        portalProjectDtls.setStartDate(startDate);
	        portalProjectDtls.setEndDate(endDate);
			
			Long clientId = Long.parseLong((String) projectData.get("clientId")); 
			portalProjectDtls.setClientId(clientId);
			portalProjectDtls.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			portalProjectDtls.setLstUpdtByLoginId(getCurrentLoginId());
			portalProjectDtls.setProjectId(projectId);
			PortalProjectDtls existingProject = portalProjectDtlsService.findByProjectId(projectId);
			if(existingProject != null) {
				portalProjectDtls.setCrtDt(existingProject.getCrtDt());
				portalProjectDtls.setCrtByLoginId(existingProject.getCrtByLoginId());
			}

			List<?> teamProjectMapping = (List<?>) projectData.get("members");
			List<PortalProjectTeamMapping> mappings = new ArrayList<>();

			// Fetch existing mappings for the project
			List<PortalProjectTeamMapping> existingMapping = portalProjectTeamMappingService.getMappingByProjectId(projectId);

			// Set to track new member IDs from the request
			Set<Long> newMemberIds = new HashSet<>();

			//Loop through new members to add or update
			for (Object memberIdObj : teamProjectMapping) {
			    if (memberIdObj instanceof String) {
			        String memberIdStr = (String) memberIdObj;
			        Long memberId = Long.parseLong(memberIdStr);
			        newMemberIds.add(memberId); // Track the new member IDs

			        // Check if the member already exists in the existing mapping
			        boolean exists = existingMapping.stream()
			                .anyMatch(mapping -> mapping.getLoginId().equals(memberId) && mapping.getActiveFlag());

			        if (!exists) {
			            // If the member doesn't exist, create a new mapping
			            PortalProjectTeamMapping mapping = new PortalProjectTeamMapping();
			            mapping.setProjectId(projectId);
			            mapping.setLoginId(memberId);
			            mapping.setActiveFlag(true);
			            mapping.setCrtDt(new Timestamp(System.currentTimeMillis()));
			            mapping.setCrtByLoginId(getCurrentLoginId());
			            mappings.add(mapping); // Add new mapping to the list
			        }
			    } else {
			        throw new IllegalArgumentException("Expected member ID to be a String");
			    }
			}

			//Mark existing members as inactive if they are not in the new list
			for (PortalProjectTeamMapping existing : existingMapping) {
			    if (!newMemberIds.contains(existing.getLoginId())) {
			        // If the existing member is not in the new data, mark them as inactive
			        existing.setActiveFlag(false);
			        existing.setLstUpdtDt(new Timestamp(System.currentTimeMillis()));
			        existing.setLstUpdtByLoginId(getCurrentLoginId());
			        mappings.add(existing); // Add the updated (inactive) mapping to the list
			    }
			}

			// Save the new or updated mappings along with the project details
			portalCommonService.createClientProject(portalProjectDtls, mappings);

	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Project saved successfully!";
    }
	
	@GetMapping("/companyGetClientTaskListData")
	public ResponseEntity<Map<String, Object>> companyGetClientTaskListData(@RequestParam("clientId") Long clientId) {
		Map<String, Object> response = new HashMap<>();
        response.put("tasks", portalCommonService.getTasksByClient(clientId));
        return ResponseEntity.ok(response);
    }
	
	
	@GetMapping("/companyGetProjectListData")
    public Map<String, Object> companyGetProjectListData() {
        return portalCommonService.companyGetProjectListData();
    }
	
	
	@PutMapping("/companyDeleteProjectById")
	public Boolean companyDeleteProjectById(@RequestParam Long projectId) {
		boolean isDeleted = false;
		try {
			PortalProjectDtls portalProjectDtls = portalProjectDtlsService.findByProjectId(projectId);
			portalProjectDtls.setActiveFlag(false);
			portalProjectDtlsService.saveProject(portalProjectDtls);
			isDeleted = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isDeleted;
	}
	
	@PutMapping("/companyChangeMemberStatus")
    public Boolean companyChangeMemberStatus(@RequestParam Long memberLoginId) {
        boolean isUpdated = false;
        try {
        	PortalPersonLoginDtls existingMember = portalPersonLoginDtlsService.findActivePersonByLoginId(memberLoginId).get();
        	existingMember.setStatus(!existingMember.getStatus());
        	existingMember.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        	existingMember.setLstUpdtByLoginId(getCurrentLoginId());
        	portalPersonLoginDtlsService.saveUser(existingMember);
            isUpdated = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUpdated;
    }
	
	@PutMapping("/companyDeleteMemberById")
	public Boolean companyDeleteMembertById(@RequestParam Long memberLoginId) {
		boolean isDeleted = false;
		try {
			PortalPersonLoginDtls existingMember = portalPersonLoginDtlsService.findActivePersonByLoginId(memberLoginId).get();
        	existingMember.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        	existingMember.setLstUpdtByLoginId(getCurrentLoginId());
        	existingMember.setActiveFlag(false);
        	PortalLoginMst existingPortalLoginMst = portalLoginMstService.getLoginDetailsByLoginId(memberLoginId);
        	existingPortalLoginMst.setEnabled(false);
        	portalCommonService.updateLoginDetails(existingPortalLoginMst, existingMember);
			isDeleted = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isDeleted;
	}
	
	@PutMapping("/companyDeleteTaskById")
	public Boolean companyDeleteTaskById(@RequestParam Long taskToDelete) {
		boolean isDeleted = false;
		try {
			PortalTaskDtls existingTask = portalTaskDtlsService.findByTaskId(taskToDelete);
			existingTask.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			existingTask.setLstUpdtByLoginId(getCurrentLoginId());
			existingTask.setActiveFlag(false);
			portalTaskDtlsService.saveTask(existingTask);
			isDeleted = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isDeleted;
	}
	
	@PutMapping("/companyUpdateTeamMember")
    public Boolean companyUpdateTeamMember(@RequestParam Long memberLoginId,@RequestParam MultiValueMap<String, String> formData) {
		boolean isUpdated = false;
		PortalLoginMst portalLoginMst = new PortalLoginMst();
		PortalPersonLoginDtls portalPersonLoginDtls = new PortalPersonLoginDtls();
		PortalRoleDtls portalRoleDtls = new PortalRoleDtls();
		try {
			portalLoginMst.setUsername(formData.getFirst("email"));
			portalLoginMst.setEnabled(true);
			
			portalPersonLoginDtls.setLogin(portalLoginMst);
			portalRoleDtls.setRoleId(Long.parseLong(formData.getFirst("role")));
			portalPersonLoginDtls.setRole(portalRoleDtls);
			portalPersonLoginDtls.setName(formData.getFirst("name"));
			portalPersonLoginDtls.setEmail(formData.getFirst("email"));
			portalPersonLoginDtls.setMobile(formData.getFirst("mobile"));
			portalPersonLoginDtls.setAdditionalEmail(formData.getFirst("additionalEmail"));
			portalPersonLoginDtls.setAdditionalMobile(formData.getFirst("additionalMobile"));
			portalPersonLoginDtls.setAddress(formData.getFirst("address"));
			portalPersonLoginDtls.setTypeOfEmployment(formData.getFirst("typeOfEmployment"));
			portalPersonLoginDtls.setDesignation(formData.getFirst("taskWiseRole"));
			portalPersonLoginDtls.setStatus(true);
			portalPersonLoginDtls.setExpertise(formData.getFirst("expertise"));
			portalPersonLoginDtls.setBankName(formData.getFirst("bankName"));
			portalPersonLoginDtls.setAccountHolderName(formData.getFirst("accountHolderName"));
			portalPersonLoginDtls.setBranchName(formData.getFirst("bankBranch"));
			portalPersonLoginDtls.setAccountNumber(formData.getFirst("accountNumber"));
			portalPersonLoginDtls.setIfscCode(formData.getFirst("ifscCode"));
			portalPersonLoginDtls.setActiveFlag(true);
			portalPersonLoginDtls.setCtc(formData.getFirst("ctc")!=null && formData.getFirst("ctc").length()>0 ? Long.parseLong(formData.getFirst("ctc")) : null);
			
			PortalPersonLoginDtls existingMember = portalPersonLoginDtlsService.findActivePersonByLoginId(memberLoginId).get();
			
			if(existingMember != null) {
				PortalLoginMst existingPortalLoginMst = existingMember.getLogin();
				portalLoginMst.setPassword(existingPortalLoginMst.getPassword());
				portalLoginMst.setLoginId(memberLoginId);
				portalPersonLoginDtls.setCrtDt(existingMember.getCrtDt());
				portalPersonLoginDtls.setPersonId(existingMember.getPersonId());
				portalPersonLoginDtls.setCrtByLoginId(existingMember.getCrtByLoginId());
			}
			portalPersonLoginDtls.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			portalPersonLoginDtls.setLstUpdtByLoginId(getCurrentLoginId());
			List<PortalTaskWiseUserTaskMapping> taskMappings = new ArrayList<>();
			portalCommonService.saveTeamMember(portalLoginMst, portalPersonLoginDtls,taskMappings);
			
			isUpdated = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
        return isUpdated;
    }
	
	@GetMapping("/companyGetTaskListData")
	public ResponseEntity<Map<String, Object>> companyGetTaskListData() {
		Map<String, Object> response = new HashMap<>();
        response.put("tasks", portalCommonService.getAllActiveTasks());
        return ResponseEntity.ok(response);
    }
	
	@GetMapping("/getRoleAndTaskListData")
    public Map<String, Object> getRoleAndTaskListData() {
		Map<String, Object> response = new HashMap<>();
        try {
        	List<PortalTaskWiseRoleDtls> roles = portalTaskWiseRoleDtlsService.findAllActiveRoles();
            
            List<Map<String, Object>> roleAndTaskList = roles.stream().map(role -> {
                // Fetch tasks associated with each role
                List<PortalTaskWiseRoleTaskMapping> tasks = portalTaskWiseRoleTaskMappingService.findActiveTasksByRoleId(role.getTaskWiseRoleId());

                // Create a map for each role with its tasks
                Map<String, Object> roleData = new HashMap<>();
                roleData.put("id", role.getTaskWiseRoleId());
                roleData.put("taskWiseRoleName", role.getTaskWiseRoleName());
                roleData.put("taskWiseRoleTaskNameCount", tasks.size());
                roleData.put("taskWiseRoleTaskName", tasks.stream().map(PortalTaskWiseRoleTaskMapping::getTaskWiseRoleTaskName).collect(Collectors.toList()));
                
                return roleData;
            }).collect(Collectors.toList());

            
            response.put("data", roleAndTaskList);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return response;
    }
	
	@GetMapping("/companyGetRoleAndTasksById")
	public ResponseEntity<Map<String, Object>> companyGetRoleAndTasksById(@RequestParam Long taskWiseRoleId) {
		Map<String, Object> responseData = new HashMap<>();

		try {
			PortalTaskWiseRoleDtls role = portalTaskWiseRoleDtlsService.getRole(taskWiseRoleId);
			if (role != null) {
	            responseData.put("taskWiseRoleName", role.getTaskWiseRoleName());
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	        List<PortalTaskWiseRoleTaskMapping> tasks = portalTaskWiseRoleTaskMappingService.findActiveTasksByRoleId(taskWiseRoleId);

	        List<String> taskNames = tasks.stream()
                    .map(PortalTaskWiseRoleTaskMapping::getTaskWiseRoleTaskName)
                    .collect(Collectors.toList());

	        responseData.put("tasks", taskNames);
		} catch (Exception e) {
			e.printStackTrace();
		}

        return new ResponseEntity<>(responseData, HttpStatus.OK);
	}
	

	 @PostMapping("/companyCreateAddRoleAndTask")
	    public Boolean saveRoleAndTasks(@RequestBody Map<String, Object> requestData) {
		 Boolean isSaved = false;
	        try {
	            
	            String taskWiseRoleName = (String) requestData.get("taskWiseRoleName");
	            List<String> tasks = (List<String>) requestData.get("tasks");

	            PortalTaskWiseRoleDtls roleDtls = new PortalTaskWiseRoleDtls();
		        roleDtls.setTaskWiseRoleName(taskWiseRoleName);
		        roleDtls.setActiveFlag(true);
		        roleDtls.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
		        roleDtls.setCrtByLoginId(getCurrentLoginId());
	            
		        List<PortalTaskWiseRoleTaskMapping> taskMappings = new ArrayList<>();
		        for (String taskName : tasks) {
		            PortalTaskWiseRoleTaskMapping taskMapping = new PortalTaskWiseRoleTaskMapping(); 
		            taskMapping.setTaskWiseRoleTaskName(taskName);
		            taskMapping.setActiveFlag(true);
		            taskMapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis())); 
		            taskMapping.setCrtByLoginId(getCurrentLoginId()); 
		            taskMappings.add(taskMapping);
		        }
		        
	            portalCommonService.saveRoleAndTasks(roleDtls, taskMappings);
	            isSaved = true;
	            
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return isSaved;
	    }
	 
	 @PutMapping("/companyUpdateRoleAndTask")
	 public Boolean companyUpdateRoleAndTask(@RequestParam Long taskWiseRoleId, @RequestBody Map<String, Object> requestData) {
	     Boolean isSaved = false;
	     try {
	         // Get updated role name and tasks
	         String taskWiseRoleName = (String) requestData.get("taskWiseRoleName");
	         List<String> tasks = (List<String>) requestData.get("tasks");

	         // Fetch the existing role
	         PortalTaskWiseRoleDtls existingRole = portalTaskWiseRoleDtlsService.findById(taskWiseRoleId);
	         
	         // Update the role name and other details
	         existingRole.setTaskWiseRoleName(taskWiseRoleName);
	         existingRole.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	         existingRole.setLstUpdtByLoginId(getCurrentLoginId());

	         // Fetch existing tasks mapped to the role
	         List<PortalTaskWiseRoleTaskMapping> existingTasks = portalTaskWiseRoleTaskMappingService.findByTaskWiseRoleIdAndActiveFlag(taskWiseRoleId);

	         // Mark tasks not present in the new list as inactive
	         for (PortalTaskWiseRoleTaskMapping taskMapping : existingTasks) {
	             if (!tasks.contains(taskMapping.getTaskWiseRoleTaskName())) {
	                 taskMapping.setActiveFlag(false);
	                 taskMapping.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	                 taskMapping.setLstUpdtByLoginId(getCurrentLoginId());
	             }
	         }

	         // Add new tasks or update existing ones
	         for (String taskName : tasks) {
	             PortalTaskWiseRoleTaskMapping taskMapping = existingTasks.stream()
	                     .filter(t -> t.getTaskWiseRoleTaskName().equals(taskName) && t.getActiveFlag())
	                     .findFirst()
	                     .orElse(null);
	             
	             if (taskMapping == null) {
	                 // New task, create a new mapping
	                 PortalTaskWiseRoleTaskMapping newTaskMapping = new PortalTaskWiseRoleTaskMapping();
	                 newTaskMapping.setTaskWiseRoleId(taskWiseRoleId);
	                 newTaskMapping.setTaskWiseRoleTaskName(taskName);
	                 newTaskMapping.setActiveFlag(true);
	                 newTaskMapping.setCrtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	                 newTaskMapping.setCrtByLoginId(getCurrentLoginId());
	                 existingTasks.add(newTaskMapping);
	             } else {
	                 // Existing task, ensure it remains active
	                 taskMapping.setActiveFlag(true);
	                 taskMapping.setLstUpdtDt(new Timestamp(Calendar.getInstance().getTimeInMillis()));
	                 taskMapping.setLstUpdtByLoginId(getCurrentLoginId());
	             }
	         }

	         // Save updated role and task mappings
	         portalCommonService.saveRoleAndTasks(existingRole, existingTasks);
	         
	         isSaved = true;
	     } catch (Exception e) {
	         e.printStackTrace();
	     }
	     return isSaved;
	 }

	private Date parseDate(String dateStr) {
        try {
            return new Date(DATE_FORMAT.parse(dateStr).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
