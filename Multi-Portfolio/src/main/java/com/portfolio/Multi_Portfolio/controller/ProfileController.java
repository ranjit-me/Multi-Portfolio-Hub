package com.portfolio.Multi_Portfolio.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.Multi_Portfolio.model.Profile;
import com.portfolio.Multi_Portfolio.service.ProfileServices;

@RestController
@RequestMapping(value = "/api/profile", produces = "application/json")
public class ProfileController {
    @Autowired
    private ProfileServices service;

    // Get current user's username from security context
    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // Create or Update profile for the logged-in user
    @PostMapping
    public ResponseEntity<?> createOrUpdateProfile(@RequestBody Profile profile) {
        try {
            String username = getCurrentUsername();
            Profile savedProfile = service.createOrUpdateProfile(profile, username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile saved successfully");
            response.put("profile", savedProfile);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to save profile: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    // Get current user's profile
    @GetMapping
    public ResponseEntity<?> getCurrentUserProfile() {
        try {
            String username = getCurrentUsername();
            Optional<Profile> profile = service.getProfileByUsername(username);
            
            if (profile.isPresent()) {
                return new ResponseEntity<>(profile.get(), HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Profile not found. Please create a profile first.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve profile: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update current user's profile (partial update with all fields)
    @PutMapping
    public ResponseEntity<?> updateCurrentUserProfile(@RequestBody Profile profileUpdates) {
        try {
            String username = getCurrentUsername();
            System.out.println("=== PROFILE UPDATE DEBUG ===");
            System.out.println("Updating profile for user: " + username);
            System.out.println("Full profile object received: " + profileUpdates);
            System.out.println("Experience data: " + profileUpdates.getExperience());
            System.out.println("Experience size: " + (profileUpdates.getExperience() != null ? profileUpdates.getExperience().size() : "null"));
            System.out.println("Interests data: " + profileUpdates.getInterests());
            System.out.println("Interests size: " + (profileUpdates.getInterests() != null ? profileUpdates.getInterests().size() : "null"));
            System.out.println("SocialLinks data: " + profileUpdates.getSocialLinks());
            System.out.println("================================");
            
            Profile updatedProfile = service.updateProfile(profileUpdates, username);
            
            if (updatedProfile != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Profile updated successfully");
                response.put("profile", updatedProfile);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Profile not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to update profile: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete current user's profile
    @DeleteMapping
    public ResponseEntity<?> deleteCurrentUserProfile() {
        try {
            String username = getCurrentUsername();
            boolean deleted = service.deleteProfile(username);
            
            if (deleted) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Profile deleted successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Profile not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to delete profile: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Check if current user has a profile
    @GetMapping("/exists")
    public ResponseEntity<?> checkProfileExists() {
        try {
            String username = getCurrentUsername();
            boolean hasProfile = service.hasProfile(username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("username", username);
            response.put("hasProfile", hasProfile);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to check profile existence: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get profile by username (for viewing other users' profiles - public endpoint)
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getProfileByUsername(@PathVariable String username) {
        try {
            Optional<Profile> profile = service.getProfileByUsername(username);
            
            if (profile.isPresent()) {
                // You might want to filter sensitive information for public viewing
                return new ResponseEntity<>(profile.get(), HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Profile not found for user: " + username);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve profile: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update selected template for the logged-in user
    @PutMapping("/template")
    public ResponseEntity<?> updateSelectedTemplate(@RequestBody Map<String, String> request) {
        try {
            String username = getCurrentUsername();
            String selectedTemplate = request.get("selectedTemplate");
            
            if (selectedTemplate == null || selectedTemplate.trim().isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "selectedTemplate is required");
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
            }
            
            Profile updatedProfile = service.updateSelectedTemplate(username, selectedTemplate);
            
            if (updatedProfile != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Template updated successfully");
                response.put("selectedTemplate", selectedTemplate);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Profile not found for user: " + username);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to update template: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}