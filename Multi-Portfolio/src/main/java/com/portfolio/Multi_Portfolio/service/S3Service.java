package com.portfolio.Multi_Portfolio.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@ConditionalOnProperty(name = "aws.s3.enabled", havingValue = "true", matchIfMissing = false)
public class S3Service {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private String s3BucketName;

    @Value("${aws.s3.region:ap-south-1}")
    private String s3Region;

    // Getter methods for testing
    public S3Client getS3Client() {
        return s3Client;
    }

    public String getS3BucketName() {
        return s3BucketName;
    }

    public String getS3Region() {
        return s3Region;
    }

    /**
     * Upload a file to S3 and return the URL
     */
    public String uploadFile(MultipartFile file, String username, String photoType) throws IOException {
        // Generate unique filename
        String fileName = generateFileName(username, photoType, file.getOriginalFilename());
        
        try {
            // Upload file to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(s3BucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            
            // Return the public URL
            return generateFileUrl(fileName);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3: " + e.getMessage(), e);
        }
    }

    /**
     * Delete a file from S3
     */
    public void deleteFile(String fileUrl) {
        try {
            // Extract filename from URL
            String fileName = extractFileNameFromUrl(fileUrl);
            
            if (fileName != null && !fileName.isEmpty()) {
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(s3BucketName)
                        .key(fileName)
                        .build();

                s3Client.deleteObject(deleteObjectRequest);
            }
        } catch (Exception e) {
            // Log error but don't throw exception to avoid breaking profile updates
            System.err.println("Failed to delete file from S3: " + e.getMessage());
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
        return String.format("profiles/%s/%s_%s%s", username, photoType, uniqueId, extension);
    }

    /**
     * Generate public URL for uploaded file
     */
    private String generateFileUrl(String fileName) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", 
                s3BucketName, s3Region, fileName);
    }

    /**
     * Extract filename from S3 URL
     */
    private String extractFileNameFromUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return null;
        }
        
        try {
            // Extract filename from URL like: https://bucket.s3.region.amazonaws.com/filename
            if (fileUrl.contains("amazonaws.com/")) {
                return fileUrl.substring(fileUrl.lastIndexOf("amazonaws.com/") + 14);
            }
        } catch (Exception e) {
            System.err.println("Failed to extract filename from URL: " + fileUrl);
        }
        
        return null;
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
