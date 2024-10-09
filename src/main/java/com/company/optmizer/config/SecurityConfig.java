package com.company.optmizer.config;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.company.optmizer.modal.PortalRoleDtls;
import com.company.optmizer.repository.PortalRoleDtlsRepository;
import com.company.optmizer.service.MyPortalLoginDtlsService;
import com.company.optmizer.service.PortalRoleDtlsService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
/**
* @author  Ratan Sharma
* @version 1.0
* @since   2024-09-15 
*/
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public UserDetailsService userDetailsService() {
		return new MyPortalLoginDtlsService();
	}

	@Autowired
    private PortalRoleDtlsService portalRoleDtlsService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	//private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder);
		return authProvider;
	}

	@Bean
	@RefreshScope
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        List<PortalRoleDtls> roles = portalRoleDtlsService.findByActiveFlag(true);

        // Create a map of URL patterns to roles
        Map<String, List<String>> urlRoleMap = roles.stream()
            .flatMap(role -> role.getUrls().stream()
                .map(url -> Map.entry(url.getUrlPattern(), role.getRoleName())))
            .collect(Collectors.groupingBy(Map.Entry::getKey, 
                Collectors.mapping(Map.Entry::getValue, Collectors.toList())));

        http.authorizeHttpRequests(authorize -> {
                // Permit access to specific URLs
                authorize.requestMatchers("/login", "/WEB-INF/**", "/assets/**").permitAll();
                
                // Dynamically apply role-based access rules
                urlRoleMap.forEach((urlPattern, roleList) -> {
                    String[] rolesArray = roleList.toArray(new String[0]);
                    authorize.requestMatchers(urlPattern).hasAnyRole(rolesArray);
                });

                authorize.anyRequest().denyAll();
            })
            .formLogin(form -> form.loginPage("/login")
                .successHandler(new CustomAuthenticationSuccessHandler())
                .failureUrl("/login?error=true")
                .permitAll())
            .logout(logout -> logout.logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .permitAll())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        return http.build();
    }
	
	@Bean
    public ServletContextInitializer servletContextInitializer() {
        return new ServletContextInitializer() {
            @Override
            public void onStartup(ServletContext servletContext) throws ServletException {
                servletContext.setSessionTimeout(30);  // minutes
            }
        };
    }
}