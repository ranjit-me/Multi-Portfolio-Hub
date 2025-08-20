package com.portfolio.Multi_Portfolio.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.Multi_Portfolio.model.Profile;

/**
 * Comprehensive file upload service that handles both S3 and local storage
 * with JWT authentication integration
 */
@Service
public class FileUploadService {

    @Autowired(required = false)
    private S3Service s3Service;

    @Autowired(required = false)
    private LocalFileService localFileService;

    @Autowired
    private ProfileServices profileServices;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "jpg", "jpeg", "png", "gif", "webp", "bmp"
    );

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /**
     * Upload profile photo with automatic storage selection (S3 or local)
     */
    public String uploadProfilePhoto(MultipartFile file) throws IOException {
        // Validate file
        validateFile(file);

        // Get current authenticated user
        String username = getCurrentUsername();
        if (username == null) {
            throw new SecurityException("User not authenticated");
        }

        // Get user profile for cleanup of old photos
        Optional<Profile> profileOpt = profileServices.getProfileByUsername(username);

        String fileUrl;
        String oldPhotoUrl = null;

        if (profileOpt.isPresent()) {
            oldPhotoUrl = profileOpt.get().getProfilePhoto();
        }

        // Upload based on available service
        if (s3Service != null) {
            fileUrl = s3Service.uploadFile(file, username, "profile");
            // Delete old photo from S3 if exists
            if (oldPhotoUrl != null && !oldPhotoUrl.isEmpty()) {
                s3Service.deleteFile(oldPhotoUrl);
            }
        } else if (localFileService != null) {
            fileUrl = localFileService.uploadFile(file, username, "profile");
            // Delete old photo from local storage if exists
            if (oldPhotoUrl != null && !oldPhotoUrl.isEmpty()) {
                localFileService.deleteFile(oldPhotoUrl);
            }
        } else {
            throw new RuntimeException("No file upload service available");
        }

        // Update profile with new photo URL
        updateProfilePhoto(username, fileUrl);

        return fileUrl;
    }

    /**
     * Upload any file with custom path
     */
    public String uploadFile(MultipartFile file, String customPath) throws IOException {
        validateFile(file);

        String username = getCurrentUsername();
        if (username == null) {
            throw new SecurityException("User not authenticated");
        }

        if (s3Service != null) {
            return s3Service.uploadFile(file, username, customPath);
        } else if (localFileService != null) {
            return localFileService.uploadFile(file, username, customPath);
        } else {
            throw new RuntimeException("No file upload service available");
        }
    }

    /**
     * Upload medical portfolio photo with specific categorization
     */
    public String uploadMedicalPortfolioPhoto(MultipartFile file, String photoType) throws IOException {
        // Validate file
        validateFile(file);

        // Get current authenticated user
        String username = getCurrentUsername();
        if (username == null) {
            throw new SecurityException("User not authenticated");
        }

        // Validate photo type
        List<String> allowedPhotoTypes = Arrays.asList(
            "certification", "education", "internship", "project", "publication", 
            "conference", "achievement", "medical-experience", "engineering-experience"
        );
        
        if (!allowedPhotoTypes.contains(photoType)) {
            throw new IllegalArgumentException("Invalid photo type: " + photoType + 
                ". Allowed types: " + String.join(", ", allowedPhotoTypes));
        }

        String fileUrl;
        
        // Upload based on available service with medical portfolio specific path
        if (s3Service != null) {
            fileUrl = s3Service.uploadFile(file, username, "medical-portfolio/" + photoType);
        } else if (localFileService != null) {
            fileUrl = localFileService.uploadFile(file, username, "medical-portfolio/" + photoType);
        } else {
            throw new RuntimeException("No file upload service available");
        }

        System.out.println("Medical portfolio photo uploaded: " + fileUrl + " for user: " + username + ", type: " + photoType);
        
        return fileUrl;
    }

    /**
     * Delete a file
     */
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        if (s3Service != null) {
            s3Service.deleteFile(fileUrl);
        } else if (localFileService != null) {
            localFileService.deleteFile(fileUrl);
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

    /**
     * Validate uploaded file
     */
    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds maximum allowed size of 10MB");
        }

        // Check file extension
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IllegalArgumentException("File must have a valid name");
        }

        String extension = getFileExtension(originalFilename).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("File type not allowed. Allowed types: " + 
                String.join(", ", ALLOWED_EXTENSIONS));
        }

        // Check content type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }
    }

    /**
     * Get file extension from filename
     */
    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    /**
     * Update profile photo URL in database
     */
    private void updateProfilePhoto(String username, String photoUrl) {
        try {
            Optional<Profile> profileOpt = profileServices.getProfileByUsername(username);
            if (profileOpt.isPresent()) {
                Profile profile = profileOpt.get();
                profile.setProfilePhoto(photoUrl);
                profileServices.updateProfile(profile, username);
            } else {
                // Create new profile if doesn't exist
                Profile newProfile = new Profile();
                newProfile.setUsername(username);
                newProfile.setProfilePhoto(photoUrl);
                profileServices.createOrUpdateProfile(newProfile, username);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to update profile photo URL in database", e);
        }
    }

    /**
     * Check if S3 service is available
     */
    public boolean isS3Available() {
        return s3Service != null;
    }

    /**
     * Check if local file service is available
     */
    public boolean isLocalFileServiceAvailable() {
        return localFileService != null;
    }

    /**
     * Get current storage type being used
     */
    public String getCurrentStorageType() {
        if (s3Service != null) {
            return "S3";
        } else if (localFileService != null) {
            return "Local";
        } else {
            return "None";
        }
    }
}
