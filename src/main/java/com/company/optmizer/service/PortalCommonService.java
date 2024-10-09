package com.company.optmizer.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.scope.refresh.RefreshScope;
import org.springframework.stereotype.Service;

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
import com.company.optmizer.modal.PortalUrlRoleMapping;
import com.company.optmizer.repository.PortalClientDtlsRepository;
import com.company.optmizer.repository.PortalTaskDtlsRepository;
import com.company.optmizer.repository.PortalTaskTeamMappingRepository;

import jakarta.transaction.Transactional;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
@Service
public class PortalCommonService {
	 @Autowired
	    private PortalLoginMstService portalLoginMstService;

	    @Autowired
	    private PortalPersonLoginDtlsService portalPersonLoginDtlsService;
	    @Autowired
		PortalRoleDtlsService portalRoleDtlsService;
	    @Autowired
		PortalUrlRoleMappingService portalUrlRoleMappingService;
	    @Autowired
	    PortalProjectDtlsService portalProjectDtlsService;
	    @Autowired
	    PortalProjectTeamMappingService portalProjectTeamMappingService;
	    @Autowired
	    PortalTaskDtlsService portalTaskDtlsService;
	    @Autowired
	    PortalTaskTeamMappingService portalTaskTeamMappingService;
	    @Autowired
	    private PortalClientDtlsService portalClientDtlsService;
	    @Autowired
		PortalTaskWiseRoleDtlsService portalTaskWiseRoleDtlsService;
		@Autowired
		PortalTaskWiseRoleTaskMappingService  portalTaskWiseRoleTaskMappingService;
		@Autowired
		PortalTaskWiseUserTaskMappingService  portalTaskWiseUserTaskMappingService;
	    @Autowired
	    private RefreshScope refreshScope;  
	    

	    @Transactional
	    public void saveTeamMember(PortalLoginMst portalLoginMst, PortalPersonLoginDtls portalPersonLoginDtls, List<PortalTaskWiseUserTaskMapping> portalTaskWiseUserTaskMappingList) {
	        portalLoginMst = portalLoginMstService.saveUser(portalLoginMst);

	        portalPersonLoginDtls.setLogin(portalLoginMst);
	        portalPersonLoginDtlsService.saveUser(portalPersonLoginDtls);
	        
	        for (PortalTaskWiseUserTaskMapping mapping : portalTaskWiseUserTaskMappingList) {
                mapping.setLoginId(portalLoginMst.getLoginId());
            }
	        portalTaskWiseUserTaskMappingService.saveAll(portalTaskWiseUserTaskMappingList);
	    }
	    
	    @Transactional
	    public void createNewRole(PortalRoleDtls portalRoleDtls, List<PortalUrlRoleMapping> mappings) {
	    	portalRoleDtlsService.saveRole(portalRoleDtls);
	    	portalRoleDtls = portalRoleDtlsService.saveRole(portalRoleDtls);
	    	for (PortalUrlRoleMapping mapping : mappings) {
                mapping.setRoleId(portalRoleDtls.getRoleId());
            }
	    	mappings = portalUrlRoleMappingService.saveAll(mappings);
	    	refreshScope.refreshAll(); 
	    }
	    
	    @Transactional
	    public void updateLoginDetails(PortalLoginMst portalLoginMst, PortalPersonLoginDtls portalPersonLoginDtls) {
	    	portalLoginMstService.saveUser(portalLoginMst);
	    	portalPersonLoginDtlsService.saveUser(portalPersonLoginDtls);
	    }
	    
	    @Transactional
	    public void createNewRoleAndUser(PortalLoginMst portalLoginMst, PortalPersonLoginDtls portalPersonLoginDtls , PortalRoleDtls portalRoleDtls, List<PortalUrlRoleMapping> mappings) {
	    	portalRoleDtls = portalRoleDtlsService.saveRole(portalRoleDtls);
	    	
	    	portalLoginMst = portalLoginMstService.saveUser(portalLoginMst);
	    	
	    	portalPersonLoginDtls.setLogin(portalLoginMst);
	    	portalPersonLoginDtls.setRole(portalRoleDtls);
	    	
	    	portalPersonLoginDtls = portalPersonLoginDtlsService.saveUser(portalPersonLoginDtls);
	    	
	    	for (PortalUrlRoleMapping mapping : mappings) {
                mapping.setRoleId(portalRoleDtls.getRoleId());
            }
	    	mappings = portalUrlRoleMappingService.saveAll(mappings);
	    	refreshScope.refreshAll(); 
	    }
	    
	    @Transactional
	    public void createClientProject(PortalProjectDtls portalProjectDtls, List<PortalProjectTeamMapping> mappings ) {
	    	portalProjectDtls = portalProjectDtlsService.saveProject(portalProjectDtls);
	    	for (PortalProjectTeamMapping mapping : mappings) {
                mapping.setProjectId(portalProjectDtls.getProjectId());
            }
	    	portalProjectTeamMappingService.saveAll(mappings);
	    }
	    
	    public Map<String, Object> companyGetClientProjectListData(Long clientId) {
	        List<PortalProjectDtls> projects = portalProjectDtlsService.findByClientId(clientId);
	        List<PortalProjectTeamMapping> mappings = portalProjectTeamMappingService.findAll();
	        //List<PortalPersonLoginDtls> persons = portalPersonLoginDtlsService.findAll();

	        // Aggregate status summary
	        Map<String, Integer> statusSummary = new HashMap<>();
	        statusSummary.put("noStarted", (int) projects.stream().filter(p -> p.getStatus() == 1).count());
	        statusSummary.put("inProgress", (int) projects.stream().filter(p -> p.getStatus() == 2).count());
	        statusSummary.put("onHold", (int) projects.stream().filter(p -> p.getStatus() == 3).count());
	        statusSummary.put("cancelled", (int) projects.stream().filter(p -> p.getStatus() == 4).count());
	        statusSummary.put("completed", (int) projects.stream().filter(p -> p.getStatus() == 5).count());

	     // Prepare project details
	        List<Map<String, Object>> projectsList = projects.stream().map(project -> {
	            Map<String, Object> projectMap = new HashMap<>();
	            projectMap.put("name", project.getProjectName());
	            projectMap.put("startDate", project.getStartDate().toString()); // Format the date as required
	            projectMap.put("deadline", project.getEndDate().toString()); // Format the date as required

	            List<String> members = mappings.stream()
	                    .filter(mapping -> mapping.getProjectId().equals(project.getProjectId()))
	                    .map(mapping -> {
	                        PortalPersonLoginDtls person = portalPersonLoginDtlsService.findById(mapping.getLoginId()).orElse(new PortalPersonLoginDtls());
	                        return getInitials(person.getName());
	                    })
	                    .collect(Collectors.toList());
	            projectMap.put("members", members);

	            
	            projectMap.put("statusClass", getStatusClass(project.getStatus()));
	            projectMap.put("status", getStatusLabel(project.getStatus()));

	            return projectMap;
	        }).collect(Collectors.toList());

	        Map<String, Object> response = new HashMap<>();
	        response.put("statusSummary", statusSummary);
	        response.put("projects", projectsList);

	        return response;
	    }
	    
	    public List<Map<String, Object>> getTasksByClient(Long clientId) {
	        List<Map<String, Object>> taskList = new ArrayList<>();

	        // Fetch all projects for the client using the custom query
	        List<PortalProjectDtls> projects = portalClientDtlsService.findProjectsByClientId(clientId);

	        for (PortalProjectDtls project : projects) {
	            // Fetch tasks by project ID
	            List<PortalTaskDtls> tasks = portalTaskDtlsService.findTasksByProjectId(project.getProjectId());

	            for (PortalTaskDtls task : tasks) {
	                Map<String, Object> taskJson = new HashMap<>();
	                taskJson.put("name", task.getTaskName());
	                taskJson.put("startDate", task.getStartDate());
	                taskJson.put("deadline", task.getEndDate());

	                // Fetch team member names for the task using the custom query
	                List<String> members = portalTaskTeamMappingService.findMemberNamesByTaskId(task.getTaskId());
	                List<String> initials = members.stream()
	                	    .map(this::getInitials) // Use the getInitials method for each member name
	                	    .collect(Collectors.toList());

	                	taskJson.put("members", initials);

	                taskJson.put("status", getStatusLabel(task.getStatus()));
	                taskJson.put("statusClass", getStatusClass(task.getStatus()));
	                taskJson.put("priorityClass", getPriorityLabel(task.getPriority()));

	                taskList.add(taskJson);
	            }
	        }
	        return taskList;
	    }
	    
	    public List<Map<String, Object>> getAllActiveTasks() {
	    	List<Map<String, Object>> taskList = new ArrayList<>();

	    	// Fetch all active projects
	    	List<PortalProjectDtls> projects = portalProjectDtlsService.getAllActiveProjects();

	    	for (PortalProjectDtls project : projects) {
	    	    // Fetch all active tasks for each project
	    	    List<PortalTaskDtls> tasks = portalTaskDtlsService.findAllActiveTasksByProjectId(project.getProjectId());

	    	    for (PortalTaskDtls task : tasks) {
	    	        Map<String, Object> taskJson = new HashMap<>();
	    	        taskJson.put("taskId", task.getTaskId());
	    	        taskJson.put("projectId", task.getProjectId());
	    	        taskJson.put("clientId", project.getClientId());
	    	        taskJson.put("name", task.getTaskName());
	    	        taskJson.put("startDate", task.getStartDate());
	    	        taskJson.put("deadline", task.getEndDate());

	    	        // Fetch active team member names for the task
	    	        List<String> members = portalTaskTeamMappingService.findMemberNamesByTaskId(task.getTaskId());
	    	        List<String> initials = members.stream()
	    	                .map(this::getInitials) // Use the getInitials method for each member name
	    	                .collect(Collectors.toList());

	    	        taskJson.put("members", initials);
	    	        taskJson.put("status", getStatusLabel(task.getStatus()));
	    	        taskJson.put("statusClass", getStatusClass(task.getStatus()));
	    	        taskJson.put("priorityClass", getPriorityLabel(task.getPriority()));

	    	        taskList.add(taskJson);
	    	    }
	    	}

	    	return taskList;

	    }
	    
	    @Transactional
	    public void saveTask(PortalTaskDtls portalTaskDtls, List<PortalTaskTeamMapping> mappings ) {
	    	portalTaskDtls = portalTaskDtlsService.saveTask(portalTaskDtls);
	    	for (PortalTaskTeamMapping mapping : mappings) {
                mapping.setTaskId(portalTaskDtls.getTaskId());
            }
	    	portalTaskTeamMappingService.saveAll(mappings);
	    }
	    @Transactional
	    public void saveRoleAndTasks(PortalTaskWiseRoleDtls portalTaskWiseRoleDtls, List<PortalTaskWiseRoleTaskMapping> portalTaskWiseRoleTaskMapping) {
	    	portalTaskWiseRoleDtls = portalTaskWiseRoleDtlsService.saveTaskWiseRole(portalTaskWiseRoleDtls);
	    	
	    	for(PortalTaskWiseRoleTaskMapping mappings : portalTaskWiseRoleTaskMapping) {
	    		mappings.setTaskWiseRoleId(portalTaskWiseRoleDtls.getTaskWiseRoleId());
	    	}
	    	portalTaskWiseRoleTaskMappingService.saveAll(portalTaskWiseRoleTaskMapping);
	    	
	    }
	    
	    public Map<String, Object> companyGetProjectListData() {
	        List<PortalProjectDtls> projects = portalProjectDtlsService.getAllActiveProjects();
	        List<PortalProjectTeamMapping> mappings = portalProjectTeamMappingService.findByActiveFlagTrue();

	        // Aggregate status summary
	        Map<String, Integer> statusSummary = new HashMap<>();
	        statusSummary.put("noStarted", (int) projects.stream().filter(p -> p.getStatus() == 1).count());
	        statusSummary.put("inProgress", (int) projects.stream().filter(p -> p.getStatus() == 2).count());
	        statusSummary.put("onHold", (int) projects.stream().filter(p -> p.getStatus() == 3).count());
	        statusSummary.put("cancelled", (int) projects.stream().filter(p -> p.getStatus() == 4).count());
	        statusSummary.put("completed", (int) projects.stream().filter(p -> p.getStatus() == 5).count());

	     // Prepare project details
	        List<Map<String, Object>> projectsList = projects.stream().map(project -> {
	            Map<String, Object> projectMap = new HashMap<>();
	            projectMap.put("projectId", project.getProjectId());
	            projectMap.put("name", project.getProjectName());
	            projectMap.put("startDate", project.getStartDate().toString()); // Format the date as required
	            projectMap.put("deadline", project.getEndDate().toString()); // Format the date as required

	            List<String> members = mappings.stream()
	            	    .filter(mapping -> mapping.getProjectId().equals(project.getProjectId()))
	            	    .map(mapping -> {
	            	        // Fetch only active and enabled persons based on loginId
	            	        PortalPersonLoginDtls person = portalPersonLoginDtlsService.findPersonByLoginId(mapping.getLoginId())
	            	            .orElse(null); // Return null if not found
	            	        
	            	        // Check if person is not null before processing
	            	        return person != null ? getInitials(person.getName()) : null;
	            	    })
	            	    .filter(Objects::nonNull) // Filter out any nulls
	            	    .collect(Collectors.toList());

	            	projectMap.put("members", members);

	           
	            projectMap.put("statusClass", getStatusClass(project.getStatus()));
	            projectMap.put("status", getStatusLabel(project.getStatus()));

	            return projectMap;
	        }).collect(Collectors.toList());

	        Map<String, Object> response = new HashMap<>();
	        response.put("statusSummary", statusSummary);
	        response.put("projects", projectsList);

	        return response;
	    }
	    
	    private String getInitials(String fullName) {
	        if (fullName == null || fullName.isEmpty()) {
	            return "";
	        }

	        String[] names = fullName.split("\\s+");
	        StringBuilder initials = new StringBuilder();

	        // Add initials from the first and last names
	        for (String name : names) {
	            if (!name.isEmpty()) {
	                initials.append(name.substring(0, 1).toUpperCase());
	            }
	        }

	        return initials.toString();
	    }
	    
	    private String getStatusLabel(Long status) {
	        // Assuming status values and labels
	        switch (status.intValue()) {
	            case 1:
	                return "No Started";
	            case 2:
	                return "In Progress";
	            case 3:
	                return "On Hold";
	            case 4:
	                return "Cancelled";
	            case 5:
	                return "Completed";
	            default:
	                return "Unknown";
	        }
	    }

	    private String getStatusClass(Long status) {
	        switch (status.intValue()) {
		        case 1:
	                return "no-started";
	            case 2:
	                return "in-progress";
	            case 3:
	                return "on-hold";
	            case 4:
	                return "cancelled";
	            case 5:
	                return "completed";
	            default:
	                return "Unknown";
	        }
	    }

	    private String getPriorityLabel(Long priority) {
		    	switch (priority.intValue()) {
	            case 1:
	                return "Urgent";
	            case 2:
	                return "High";
	            case 3:
	                return "Medium";
	            case 4:
	                return "Low";
	            default:
	                return "Unknown";
        }
	    }
}
