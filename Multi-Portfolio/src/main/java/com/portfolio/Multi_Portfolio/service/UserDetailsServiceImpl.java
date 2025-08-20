package com.portfolio.Multi_Portfolio.service;

import com.portfolio.Multi_Portfolio.model.User;
import com.portfolio.Multi_Portfolio.repository.UserRepository;
import org.slf4j.Logger; // Import Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class); // Add logger

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Attempting to load user by username: {}", username); // Log username being loaded
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.warn("User not found with username: {}", username); // Log if user not found
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
        logger.info("User found: {}", user.getUsername()); // Log if user found
        return user;
    }
}