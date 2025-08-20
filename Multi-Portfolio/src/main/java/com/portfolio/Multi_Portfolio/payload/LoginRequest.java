package com.portfolio.Multi_Portfolio.payload;

/**
 * DTO for handling user login and registration requests.
 * Contains username, email, and password fields.
 */
public class LoginRequest {
    private String username;
    private String email;
    private String password;

    // Default constructor
    public LoginRequest() {
    }

    // Constructor with fields
    public LoginRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
