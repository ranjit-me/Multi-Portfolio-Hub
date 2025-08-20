package com.portfolio.Multi_Portfolio.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.Multi_Portfolio.model.Profile; // Added for clarity, though not strictly required by Spring Data

@Repository // Good practice to explicitly mark repositories
public interface ProfileRepository extends MongoRepository<Profile, String> {

    // Find profile by username
    Profile findByUsername(String username);
    
    // Check if profile exists by username
    boolean existsByUsername(String username);
}