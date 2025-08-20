package com.portfolio.Multi_Portfolio.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // Import Logger
import org.springframework.security.authentication.AuthenticationManager; // Import LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.Multi_Portfolio.model.Profile;
import com.portfolio.Multi_Portfolio.model.User;
import com.portfolio.Multi_Portfolio.payload.LoginRequest;
import com.portfolio.Multi_Portfolio.security.jwt.JwtTokenProvider;
import com.portfolio.Multi_Portfolio.service.ProfileServices;
import com.portfolio.Multi_Portfolio.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class); // Add logger

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileServices profileServices;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody LoginRequest signUpRequest) {
        try {
            // Validate that email is provided for registration
            if (signUpRequest.getEmail() == null || signUpRequest.getEmail().trim().isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Email is required for registration");
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
            }
            
            // Register the user with provided email
            User user = userService.registerNewUser(
                    signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    signUpRequest.getPassword()
            );
            
            // Create an empty profile for the new user with proper username linkage
            try {
                Profile emptyProfile = new Profile();
                // Set username from User schema - this is the key linkage requirement
                emptyProfile.setUsername(user.getUsername());
                
                // Save the empty profile using the service which handles the username linkage
                Profile savedProfile = profileServices.createOrUpdateProfile(emptyProfile, user.getUsername());
                logger.info("Empty profile created successfully for user: {} with email: {}", 
                    user.getUsername(), user.getEmail());
                
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User registered successfully with profile");
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("profileCreated", true);
                return ResponseEntity.ok(response);
                
            } catch (Exception profileException) {
                logger.error("Failed to create profile for user {}: {}", user.getUsername(), profileException.getMessage());
                profileException.printStackTrace(); // Print full stack trace for debugging
                
                // Still return success for user registration, but indicate profile creation failed  
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User registered successfully, but profile creation failed");
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("profileCreated", false);
                response.put("profileError", profileException.getMessage());
                return ResponseEntity.ok(response);
            }
            
        } catch (Exception e) {
            logger.error("Registration failed for user {}: {}", signUpRequest.getUsername(), e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for username: {}", loginRequest.getUsername()); // Log login attempt
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            logger.info("User {} logged in successfully. JWT generated.", loginRequest.getUsername()); // Log success
            
            // Create response with both token and username for routing
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", jwt);
            response.put("tokenType", "Bearer");
            response.put("username", loginRequest.getUsername());
            response.put("redirectUrl", "localhost:8080/" + loginRequest.getUsername());
            
            // Fetch and include profile data if exists
            try {
                Object profileData = profileServices.getProfileByUsername(loginRequest.getUsername());
                response.put("profile", profileData);
                response.put("hasProfile", true);
                logger.info("Profile data included for user: {}", loginRequest.getUsername());
            } catch (Exception profileEx) {
                response.put("profile", null);
                response.put("hasProfile", false);
                logger.info("No profile found for user: {}", loginRequest.getUsername());
            }
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Authentication failed for user {}: {}", loginRequest.getUsername(), e.getMessage()); // Log failure
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Authentication failed: Invalid username or password.");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }
}