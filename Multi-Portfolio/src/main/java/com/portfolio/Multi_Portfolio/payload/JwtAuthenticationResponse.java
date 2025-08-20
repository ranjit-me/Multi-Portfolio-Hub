package com.portfolio.Multi_Portfolio.payload;

/**
 * DTO for sending JWT authentication response to the client.
 * Contains the access token and token type.
 */
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer"; // Default token type

    // Constructor to initialize with the access token
    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
