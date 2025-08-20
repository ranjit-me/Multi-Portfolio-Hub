package com.portfolio.Multi_Portfolio.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@ConditionalOnProperty(name = "aws.s3.enabled", havingValue = "false", matchIfMissing = true)
public class LocalFileService {

    @Value("${app.upload.dir:uploads/photos}")
    private String uploadDir;

    /**
     * Upload a file to local storage and return the URL
     */
    public String uploadFile(MultipartFile file, String username, String photoType) throws IOException {
        // Generate unique filename
        String fileName = generateFileName(username, photoType, file.getOriginalFilename());
        
        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Create user-specific directory
        Path userDir = uploadPath.resolve(username);
        if (!Files.exists(userDir)) {
            Files.createDirectories(userDir);
        }
        
        try {
            // Save file to local storage
            Path filePath = userDir.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Return the relative URL
            return "/" + uploadDir + "/" + username + "/" + fileName;
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to local storage: " + e.getMessage(), e);
        }
    }

    /**
     * Delete a file from local storage
     */
    public void deleteFile(String fileUrl) {
        try {
            if (fileUrl == null || fileUrl.isEmpty()) {
                return;
            }
            
            // Convert URL to file path
            if (fileUrl.startsWith("/")) {
                fileUrl = fileUrl.substring(1);
            }
            
            Path filePath = Paths.get(fileUrl);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        } catch (Exception e) {
            // Log error but don't throw exception to avoid breaking profile updates
            System.err.println("Failed to delete file from local storage: " + e.getMessage());
        }
    }

    /**
     * Generate unique filename for uploaded file
     */
    private String generateFileName(String username, String photoType, String originalFileName) {
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        
        String uniqueId = UUID.randomUUID().toString().substring(0, 8);
        return String.format("%s_%s%s", photoType, uniqueId, extension);
    }

    /**
     * Check if file type is valid for profile photos
     */
    public boolean isValidImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        
        String contentType = file.getContentType();
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                contentType.equals("image/jpg") ||
                contentType.equals("image/png") ||
                contentType.equals("image/gif") ||
                contentType.equals("image/webp")
        );
    }

    /**
     * Check if file size is within allowed limits (5MB)
     */
    public boolean isValidFileSize(MultipartFile file) {
        return file != null && file.getSize() <= 5 * 1024 * 1024; // 5MB limit
    }
}
