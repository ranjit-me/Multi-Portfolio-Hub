package com.portfolio.Multi_Portfolio.security.jwt;

import com.portfolio.Multi_Portfolio.service.UserDetailsServiceImpl; // Your UserDetailsService
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Custom filter to process JWT tokens in incoming requests.
 * It extends OncePerRequestFilter to ensure it's executed only once per request.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    // Autowire JwtTokenProvider to handle token operations
    @Autowired
    private JwtTokenProvider tokenProvider;

    // Autowire UserDetailsServiceImpl to load user details
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Performs the actual filtering logic.
     * Extracts JWT from the request, validates it, and sets authentication in SecurityContext.
     *
     * @param request The HttpServletRequest.
     * @param response The HttpServletResponse.
     * @param filterChain The FilterChain to proceed with.
     * @throws ServletException If a servlet-specific error occurs.
     * @throws IOException If an I/O error occurs.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // Get JWT from the request's Authorization header
            String jwt = getJwtFromRequest(request);

            // Validate the JWT and set authentication if valid
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // Extract username from JWT
                String username = tokenProvider.getUsernameFromJWT(jwt);

                // Load user details by username
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Create an authentication object
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication in the SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }

    /**
     * Extracts the JWT token from the Authorization header of the request.
     * Expects the format: "Bearer <token>".
     *
     * @param request The HttpServletRequest.
     * @return The JWT token string, or null if not found or not in expected format.
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Check if the Authorization header is present and starts with "Bearer "
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            return bearerToken.substring(7);
        }
        return null;
    }
}
