package com.portfolio.Multi_Portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections; // For returning an empty list

@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;
    private String username;
    private String email;
    private String password; // This should store the ENCODED password

    // Constructors
    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


    // --- UserDetails Interface Implementations ---

    /**
     * Returns the authorities granted to the user.
     * Since you want to remove role-related code, this will return an empty collection.
     * If you later decide to implement role-based authorization, you would add roles here.
     *
     * @return An empty collection of GrantedAuthority objects.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // No roles/authorities assigned
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Always true for now, unless you implement account expiration logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Always true for now, unless you implement account locking logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Always true for now, unless you implement credential expiration logic
    }

    @Override
    public boolean isEnabled() {
        return true; // Always true for now, unless you implement account enabling/disabling logic
    }
}
