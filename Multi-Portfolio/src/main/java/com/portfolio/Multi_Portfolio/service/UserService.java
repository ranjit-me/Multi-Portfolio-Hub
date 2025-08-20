package com.portfolio.Multi_Portfolio.service;

import com.portfolio.Multi_Portfolio.model.User;
import com.portfolio.Multi_Portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Used for encoding passwords

    public User registerNewUser(String username, String email, String password) throws Exception {
        if (userRepository.existsByUsername(username)) {
            throw new Exception("Username already taken!");
        }
        if (userRepository.existsByEmail(email)) {
            throw new Exception("Email already in use!");
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password)); // Encode password

        // Removed role-related code as requested:
        // Set<String> roles = new HashSet<>();
        // roles.add("ROLE_USER"); // Assign default role
        // newUser.setRoles(roles);

        return userRepository.save(newUser);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
