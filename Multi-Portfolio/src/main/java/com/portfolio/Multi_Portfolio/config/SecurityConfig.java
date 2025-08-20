package com.portfolio.Multi_Portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Keep if you explicitly want to define it
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.portfolio.Multi_Portfolio.security.jwt.JwtAuthenticationFilter; // Import for filter ordering
import com.portfolio.Multi_Portfolio.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity // Enables Spring Security's web security support
@EnableMethodSecurity // Enables method-level security (e.g., @PreAuthorize)
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    // Defines the password encoder for hashing passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configures the AuthenticationProvider to use our UserDetailsService and PasswordEncoder
    // This bean is implicitly used by AuthenticationManager if UserDetailsService and PasswordEncoder are available
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // Exposes the AuthenticationManager as a bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Defines the JWT authentication filter as a Spring bean.
     * This allows Spring to manage its lifecycle and inject dependencies.
     */
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    // Configures the security filter chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // Enable CORS
                .csrf(csrf -> csrf.disable()) // Disable CSRF for REST APIs (JWT is stateless, so CSRF tokens are not needed)
                // Configure exception handling for unauthorized access (optional, but good practice)
                // .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless sessions for JWT
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to authentication endpoints (login, register)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Allow unauthenticated access to public profile endpoints
                        .requestMatchers("/api/profile/user/**").permitAll()
                        .requestMatchers("/api/profile/*").permitAll()
                        // Allow unauthenticated access to uploaded photos
                        .requestMatchers("/uploads/photos/**").permitAll()
                        // Allow unauthenticated access to test endpoints
                        .requestMatchers("/api/profile/photos/ping").permitAll()
                        .requestMatchers("/api/files/ping").permitAll()
                        .requestMatchers("/api/files/storage/info").permitAll()
                        // File upload endpoints require authentication
                        .requestMatchers("/api/files/**").authenticated()
                        .requestMatchers("/api/profile/photos/**").authenticated()
                        // Allow unauthenticated access to public resources (if any)
                        // .requestMatchers("/api/public/**").permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated()
                );

        // Add our custom JWT authentication filter before Spring Security's default UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
