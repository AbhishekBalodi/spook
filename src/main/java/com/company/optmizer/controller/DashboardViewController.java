package com.company.optmizer.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.company.optmizer.modal.LoginPrincipal;
import com.company.optmizer.modal.PortalClientDtls;
import com.company.optmizer.modal.PortalPersonLoginDtls;
import com.company.optmizer.modal.PortalProjectDtls;
import com.company.optmizer.modal.PortalProjectTeamMapping;
import com.company.optmizer.modal.PortalRoleDtls;
import com.company.optmizer.modal.PortalTaskDtls;
import com.company.optmizer.modal.PortalTaskTeamMapping;
import com.company.optmizer.modal.PortalTaskWiseRoleDtls;
import com.company.optmizer.repository.PortalRoleDtlsRepository;
import com.company.optmizer.service.PortalClientDtlsService;
import com.company.optmizer.service.PortalPersonLoginDtlsService;
import com.company.optmizer.service.PortalProjectDtlsService;
import com.company.optmizer.service.PortalProjectTeamMappingService;
import com.company.optmizer.service.PortalTaskDtlsService;
import com.company.optmizer.service.PortalTaskTeamMappingService;
import com.company.optmizer.service.PortalTaskWiseRoleDtlsService;
import com.company.optmizer.service.PortalTaskWiseRoleTaskMappingService;

import jakarta.servlet.http.HttpSession;

/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
@Controller
public class DashboardViewController {
	
	@Autowired
	PortalRoleDtlsRepository portalRoleDtlsRepository;
	@Autowired
	private PortalClientDtlsService portalClientDtlsService;
	@Autowired
	private PortalPersonLoginDtlsService portalPersonLoginDtlsService;
	@Autowired
	private PortalProjectDtlsService portalProjectDtlsService;
	@Autowired
	PortalProjectTeamMappingService portalProjectTeamMappingService;
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	@Autowired
	private PortalTaskWiseRoleDtlsService portalTaskWiseRoleDtlsService;
	@Autowired
	private PortalTaskWiseRoleTaskMappingService  portalTaskWiseRoleTaskMappingService;
	@Autowired
	PortalTaskDtlsService portalTaskDtlsService;
	@Autowired
	PortalTaskTeamMappingService portalTaskTeamMappingService;
	@GetMapping("/login")
	public String login() {
	    return "login/login-page";
	}
	
	@GetMapping("/companyDashboard")
    public String companyDashboard(HttpSession session,Model model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		LoginPrincipal userPrincipal = (LoginPrincipal) authentication.getPrincipal();
		List<String> permissionsList = userPrincipal.getPermissions();
		model.addAttribute("name",userPrincipal.getPersonName());
		session.setAttribute("permissionsList", permissionsList);
        return "admin-dashboard/company-dasboard"; 
    }
 
    @GetMapping("/companyClientDashboard")
    public String companyClientDashboard(HttpSession session,Model model) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		LoginPrincipal userPrincipal = (LoginPrincipal) authentication.getPrincipal();
		List<String> permissionsList = userPrincipal.getPermissions();
		model.addAttribute("name",userPrincipal.getPersonName());
		session.setAttribute("permissionsList", permissionsList);
        return "others-dashboard/company-client-dashboard";
    }
    
    @GetMapping("/companyClientListTable")
    public String companyClientListTable() {
        return "admin-dashboard/clients/admin-client-list";
    }
    
    @GetMapping("/companyGetClientDetailsById")
    public String companyGetClientDetailsById(@RequestParam("companyId") Long companyId,Model model) {
    	try {
    		Optional<PortalClientDtls> clientOptional = portalClientDtlsService.getCompanyById(companyId);
    		PortalClientDtls clients = clientOptional.get();
    		model.addAttribute("action","createClient");
    		model.addAttribute("portalClientDtls",clients);
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        return "admin-dashboard/clients/add-client";
    }
    
    @GetMapping("/companyGetClientProfileById")
    public String companyGetClientProfileById(@RequestParam("companyId") Long companyId,Model model) {
    	try {
    		Optional<PortalClientDtls> clientOptional = portalClientDtlsService.getCompanyById(companyId);
    		PortalClientDtls clients = clientOptional.get();
    		model.addAttribute("action","createClient");
    		model.addAttribute("portalClientDtls",clients);
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        return "admin-dashboard/clients/client-profile/client-profile";
    }
    
    @GetMapping("/companyAccessTypeListTable")
    public String companyAccessTypeListTable() {
        return "admin-dashboard/access-type/access-type-list";
    }
   
    
    @GetMapping("/companyTeamListTable")
    public String companyTeamListTable() {
        return "admin-dashboard/team/admin-team-list";
    }
    
    @GetMapping("/companyOpenAddTeamMemberPage")
    public String companyOpenAddTeamMemberPage(Model model) {
    	List<PortalRoleDtls> roles = portalRoleDtlsRepository.findByActiveFlag(true);
    	List<PortalTaskWiseRoleDtls> taskWiseRoles = portalTaskWiseRoleDtlsService.findAllActiveRoles();
    	model.addAttribute("roles", roles);
    	model.addAttribute("taskWiseRoles", taskWiseRoles);
        return "admin-dashboard/team/add-team-member";
    }
    
    @GetMapping("/companyOpenAddAccessTypePage")
    public String companyOpenAddAccessTypePage() {
        return "admin-dashboard/access-type/add-access-type";
    }
    
    @GetMapping("/companyOpenAddClientPage")
    public String companyOpenAddClientPage(Model model) {
    	model.addAttribute("action","createClient");
        return "admin-dashboard/clients/add-client";
    }
    
    @GetMapping("/companyGetClientDetailsPage")
    public String companyGetClientDetailsPage() {
        return "admin-dashboard/clients/client-profile/main-client-profile";
    }
    
    @GetMapping("/companyGetClientDetails")
    public String companyGetClientDetails() {
        return "admin-dashboard/clients/client-profile/client-profile";
    }
    
    @GetMapping("/companyGetClientUserProfileList")
    public String companyGetClientUserProfileList() {
        return "admin-dashboard/clients/client-user-profile/client-user-list";
    }
    
    @GetMapping("/companyAddClientUserPage")
    public String companyAddClientUserPage() {
        return "admin-dashboard/clients/client-user-profile/add-client-user";
    }
    
    @GetMapping("/companyGetClientProjectList")
    public String companyGetClientProjectList() {
        return "admin-dashboard/clients/client-project/client-project-list";
    }
    
    @GetMapping("/companyProjectListTable")
    public String companyProjectListTable() {  
        return "admin-dashboard/project/admin-project-list";
    }
    
    
    
    @GetMapping("/companyAddClientProjectPage")
    public String companyAddClientProjectPage(Model model) {
    	List<PortalPersonLoginDtls> companyTeam = portalPersonLoginDtlsService.getCompanyTeam();
    	model.addAttribute("members", companyTeam);
        return "admin-dashboard/clients/client-project/add-client-project";
    }
    
    @GetMapping("/companyGetClientTaskList")
    public String companyGetClientTaskList() {
        return "admin-dashboard/clients/client-task/client-task-list";
    }
    
    @GetMapping("/companyAddProjectPage")
    public String companyAddProjectPage(Model model) {
    	List<PortalPersonLoginDtls> companyTeam = portalPersonLoginDtlsService.getNonAdminActiveUsersWithNullClient();
    	List<PortalClientDtls> clientList = portalClientDtlsService.getAllActiveClients(true);
    	model.addAttribute("members", companyTeam);
    	model.addAttribute("clientList", clientList);
        return "admin-dashboard/project/admin-add-project";
    }
    
    @GetMapping("/companyFetchprojectDetailsById")
    public String companyFetchprojectDetailsById(Model model,@RequestParam("projectId") Long projectId) {
    	List<PortalPersonLoginDtls> companyTeam = portalPersonLoginDtlsService.getNonAdminActiveUsersWithNullClient();
    	List<PortalClientDtls> clientList = portalClientDtlsService.getAllActiveClients(true);
    	PortalProjectDtls portalProjectDtls = portalProjectDtlsService.findByProjectId(projectId);
    	List<PortalProjectTeamMapping> mappedTeam =  portalProjectTeamMappingService.getMappingByProjectId(projectId);
    	model.addAttribute("members", companyTeam);
    	model.addAttribute("projectDtls", portalProjectDtls);
    	model.addAttribute("clientList", clientList);
    	model.addAttribute("mappedTeam", mappedTeam);
        return "admin-dashboard/project/admin-add-project";
    }
    
    @GetMapping("/companyGetMemberDetailsById")
    public String companyGetMemberDetailsById(Model model,@RequestParam("memberLoginId") Long memberLoginId) {
    	PortalPersonLoginDtls existingMember = portalPersonLoginDtlsService.findActivePersonByLoginId(memberLoginId).get();
    	List<PortalRoleDtls> roles = portalRoleDtlsRepository.findByActiveFlag(true);
    	List<PortalTaskWiseRoleDtls> taskWiseRoles = portalTaskWiseRoleDtlsService.findAllActiveRoles();
    	model.addAttribute("taskWiseRoles", taskWiseRoles);
    	model.addAttribute("roles", roles);
    	model.addAttribute("memberDetails", existingMember);
    	model.addAttribute("updateFlag", true);
    	return "admin-dashboard/team/add-team-member";
    }
    
    @GetMapping("/companyTaskListTable")
    public String companyTaskListTable() {
        return "admin-dashboard/task/admin-task-list";
    }
    
    @GetMapping("/companyAddTaskPage")
    public String companyAddTaskPage(Model model) {
    	List<PortalClientDtls> clientList = portalClientDtlsService.getAllActiveClients(true);
    	model.addAttribute("clientList", clientList);
        return "admin-dashboard/task/admin-add-task";
    }
    
    @GetMapping("/getRoleAndTaskTable")
    public String getRoleAndTaskTable() {
        return "admin-dashboard/role-and-task/role-and-task-list";
    }
    
    @GetMapping("/companyOpenAddRoleAndTaskPage")
    public String companyOpenAddRoleAndTaskPage() {
        return "admin-dashboard/role-and-task/add-role-and-task";
    }
    
    @GetMapping("/getCompanyTaskDetailsByTaskId")
    public String getCompanyTaskDetailsByTaskId(Model model, @RequestParam("taskId") Long taskId , @RequestParam("clientId") Long clientId , @RequestParam("projectId") Long projectId) {
    	List<PortalClientDtls> clientList = portalClientDtlsService.getAllActiveClients(true);
    	model.addAttribute("clientList", clientList);
    	PortalTaskDtls taskDtls = portalTaskDtlsService.findByTaskId(taskId);
    	model.addAttribute("taskDtls", taskDtls);
    	model.addAttribute("clientId", clientId);
    	model.addAttribute("projectId", projectId);
    	List<PortalProjectDtls> assignedProjectToClient = portalProjectDtlsService.findActiveProjectByClientId(clientId);
    	model.addAttribute("assignedProjectToClient", assignedProjectToClient);
    	List<Map<String, String>> assignedTeam = portalPersonLoginDtlsService.getCompanyProjectAssignedTeam(projectId,clientId);
    	model.addAttribute("assignedTeam", assignedTeam);
    	List<PortalTaskTeamMapping> mappedTeam = portalTaskTeamMappingService.findTeamMembersByTaskId(taskId);
    	model.addAttribute("mappedTeam", mappedTeam);
    	return "admin-dashboard/task/admin-add-task";
    }
    
    
    
    
    
    
    
    
    
    
    
    @GetMapping("/companyAddClientTaskPage")
    public String companyAddClientTaskPage(Model model,@RequestParam("clientId") Long clientId) {
    	//List<PortalPersonLoginDtls> assignedTeam = portalPersonLoginDtlsService.getCompanyProjectAssignedTeam(clientId);
    	List<PortalProjectDtls> assignedProjects = portalProjectDtlsService.findByClientId(clientId);
    	model.addAttribute("assignedProjects", assignedProjects);
        return "admin-dashboard/clients/client-task/add-client-task";
    }
    
    
	
}
