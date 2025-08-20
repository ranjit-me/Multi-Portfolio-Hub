package com.portfolio.Multi_Portfolio.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portfolio.Multi_Portfolio.model.Profile;
import com.portfolio.Multi_Portfolio.repository.ProfileRepository;

@Service
public class ProfileServices {
    @Autowired
    private ProfileRepository repository;

    // Create or Update profile for a specific user
    public Profile createOrUpdateProfile(Profile profile, String username) {
        // Set the username to link with User schema
        profile.setUsername(username);
        
        // Check if profile already exists for this user
        Profile existingProfile = repository.findByUsername(username);
        if (existingProfile != null) {
            // Update existing profile
            profile.setUserId(existingProfile.getUserId()); // Keep the same userId
            return repository.save(profile);
        } else {
            // Create new profile
            if (profile.getUserId() == null || profile.getUserId().isEmpty()) {
                profile.setUserId(UUID.randomUUID().toString());
            }
            return repository.save(profile);
        }
    }

    // Get profile by username
    public Optional<Profile> getProfileByUsername(String username) {
        Profile profile = repository.findByUsername(username);
        return Optional.ofNullable(profile);
    }

    // Update profile for a specific user  
    public Profile updateProfile(Profile profileUpdates, String username) {
        Profile existingProfile = repository.findByUsername(username);
        if (existingProfile != null) {
            // Ensure the username is preserved and linked to User schema
            profileUpdates.setUsername(username);
            // Keep the same userId for the existing profile
            if (existingProfile.getUserId() != null) {
                profileUpdates.setUserId(existingProfile.getUserId());
            }
            // Save the updated profile
            return repository.save(profileUpdates);
        }
        return null;
    }

    // Delete profile for a specific user
    public boolean deleteProfile(String username) {
        Profile existingProfile = repository.findByUsername(username);
        if (existingProfile != null) {
            repository.delete(existingProfile);
            return true;
        }
        return false;
    }

    // Check if user has a profile
    public boolean hasProfile(String username) {
        return repository.existsByUsername(username);
    }

    // Update only the selected template for a specific user
    public Profile updateSelectedTemplate(String username, String selectedTemplate) {
        Profile existingProfile = repository.findByUsername(username);
        if (existingProfile != null) {
            existingProfile.setSelectedTemplate(selectedTemplate);
            return repository.save(existingProfile);
        }
        return null;
    }

    // Legacy method for backward compatibility
    public Profile addProfile(Profile profile){
        // Using the full UUID for a more robust unique identifier
        // MongoDB can also auto-generate the _id if not explicitly set
        if (profile.getUserId() == null || profile.getUserId().isEmpty()) {
            profile.setUserId(UUID.randomUUID().toString());
        }
        return repository.save(profile);
    }
}