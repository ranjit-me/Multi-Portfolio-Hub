package com.portfolio.Multi_Portfolio.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.Multi_Portfolio.service.FileUploadService;

/**
 * Unified File Upload Controller that handles both S3 and Local storage
 * with JWT authentication integration
 */
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    /**
     * Health check endpoint
     */
    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "File upload service is running");
        response.put("storageType", fileUploadService.getCurrentStorageType());
        response.put("s3Available", fileUploadService.isS3Available());
        response.put("localStorageAvailable", fileUploadService.isLocalFileServiceAvailable());
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    /**
     * Upload profile photo
     */
    @PostMapping("/upload/profile-photo")
    public ResponseEntity<Map<String, Object>> uploadProfilePhoto(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate authentication
            String username = getCurrentUsername();
            if (username == null) {
                response.put("success", false);
                response.put("error", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            System.out.println("Profile photo upload request from user: " + username);

            // Upload file
            String fileUrl = fileUploadService.uploadProfilePhoto(file);

            response.put("success", true);
            response.put("message", "Profile photo uploaded successfully");
            response.put("fileUrl", fileUrl);
            response.put("filename", file.getOriginalFilename());
            response.put("size", file.getSize());
            response.put("storageType", fileUploadService.getCurrentStorageType());

            return ResponseEntity.ok(response);

        } catch (SecurityException e) {
            System.err.println("Authentication error: " + e.getMessage());
            response.put("success", false);
            response.put("error", "Authentication required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        } catch (Exception e) {
            System.err.println("Upload error: " + e.getMessage());
            e.printStackTrace();
            response.put("success", false);
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Upload any file with custom path
     */
    @PostMapping("/upload/{path}")
    public ResponseEntity<Map<String, Object>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String path) {
        
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate authentication
            String username = getCurrentUsername();
            if (username == null) {
                response.put("success", false);
                response.put("error", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            System.out.println("File upload request from user: " + username + ", path: " + path);

            // Upload file
            String fileUrl = fileUploadService.uploadFile(file, path);

            response.put("success", true);
            response.put("message", "File uploaded successfully");
            response.put("fileUrl", fileUrl);
            response.put("filename", file.getOriginalFilename());
            response.put("size", file.getSize());
            response.put("path", path);
            response.put("storageType", fileUploadService.getCurrentStorageType());

            return ResponseEntity.ok(response);

        } catch (SecurityException e) {
            System.err.println("Authentication error: " + e.getMessage());
            response.put("success", false);
            response.put("error", "Authentication required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        } catch (Exception e) {
            System.err.println("Upload error: " + e.getMessage());
            e.printStackTrace();
            response.put("success", false);
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // ======================================
    // MEDICAL PORTFOLIO PHOTO UPLOAD ENDPOINTS
    // ======================================

    /**
     * Upload certification photos
     */
    @PostMapping("/upload/certification-photo")
    public ResponseEntity<Map<String, Object>> uploadCertificationPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "certification");
    }

    /**
     * Upload education photos
     */
    @PostMapping("/upload/education-photo")
    public ResponseEntity<Map<String, Object>> uploadEducationPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "education");
    }

    /**
     * Upload internship photos
     */
    @PostMapping("/upload/internship-photo")
    public ResponseEntity<Map<String, Object>> uploadInternshipPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "internship");
    }

    /**
     * Upload project photos
     */
    @PostMapping("/upload/project-photo")
    public ResponseEntity<Map<String, Object>> uploadProjectPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "project");
    }

    /**
     * Upload publication photos
     */
    @PostMapping("/upload/publication-photo")
    public ResponseEntity<Map<String, Object>> uploadPublicationPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "publication");
    }

    /**
     * Upload conference photos
     */
    @PostMapping("/upload/conference-photo")
    public ResponseEntity<Map<String, Object>> uploadConferencePhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "conference");
    }

    /**
     * Upload achievement photos
     */
    @PostMapping("/upload/achievement-photo")
    public ResponseEntity<Map<String, Object>> uploadAchievementPhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "achievement");
    }

    /**
     * Upload medical experience photos
     */
    @PostMapping("/upload/medical-experience-photo")
    public ResponseEntity<Map<String, Object>> uploadMedicalExperiencePhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "medical-experience");
    }

    /**
     * Upload engineering experience photos
     */
    @PostMapping("/upload/engineering-experience-photo")
    public ResponseEntity<Map<String, Object>> uploadEngineeringExperiencePhoto(@RequestParam("file") MultipartFile file) {
        return uploadMedicalPortfolioPhoto(file, "engineering-experience");
    }

    /**
     * Common method for medical portfolio photo uploads
     */
    private ResponseEntity<Map<String, Object>> uploadMedicalPortfolioPhoto(MultipartFile file, String photoType) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate authentication
            String username = getCurrentUsername();
            if (username == null) {
                response.put("success", false);
                response.put("error", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            System.out.println("Medical portfolio photo upload request from user: " + username + ", type: " + photoType);

            // Upload file with medical portfolio specific path
            String fileUrl = fileUploadService.uploadMedicalPortfolioPhoto(file, photoType);

            response.put("success", true);
            response.put("message", photoType + " photo uploaded successfully");
            response.put("fileUrl", fileUrl);
            response.put("filename", file.getOriginalFilename());
            response.put("size", file.getSize());
            response.put("photoType", photoType);
            response.put("storageType", fileUploadService.getCurrentStorageType());

            return ResponseEntity.ok(response);

        } catch (SecurityException e) {
            System.err.println("Authentication error: " + e.getMessage());
            response.put("success", false);
            response.put("error", "Authentication required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        } catch (Exception e) {
            System.err.println("Upload error: " + e.getMessage());
            e.printStackTrace();
            response.put("success", false);
            response.put("error", "Failed to upload " + photoType + " photo: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Delete a file
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteFile(@RequestParam String fileUrl) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate authentication
            String username = getCurrentUsername();
            if (username == null) {
                response.put("success", false);
                response.put("error", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            System.out.println("File deletion request from user: " + username + ", file: " + fileUrl);

            // Delete file
            fileUploadService.deleteFile(fileUrl);

            response.put("success", true);
            response.put("message", "File deleted successfully");
            response.put("fileUrl", fileUrl);

            return ResponseEntity.ok(response);

        } catch (SecurityException e) {
            System.err.println("Authentication error: " + e.getMessage());
            response.put("success", false);
            response.put("error", "Authentication required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

        } catch (Exception e) {
            System.err.println("Deletion error: " + e.getMessage());
            response.put("success", false);
            response.put("error", "Failed to delete file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Get current storage configuration
     */
    @GetMapping("/storage/info")
    public ResponseEntity<Map<String, Object>> getStorageInfo() {
        Map<String, Object> response = new HashMap<>();

        try {
            response.put("success", true);
            response.put("currentStorageType", fileUploadService.getCurrentStorageType());
            response.put("s3Available", fileUploadService.isS3Available());
            response.put("localStorageAvailable", fileUploadService.isLocalFileServiceAvailable());
            response.put("maxFileSize", "10MB");
            response.put("allowedExtensions", "jpg, jpeg, png, gif, webp, bmp");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Failed to get storage info: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Get current authenticated username from JWT
     */
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() 
            && !"anonymousUser".equals(authentication.getName())) {
            return authentication.getName();
        }
        return null;
    }
}
