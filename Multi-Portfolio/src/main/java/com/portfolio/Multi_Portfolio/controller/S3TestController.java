package com.portfolio.Multi_Portfolio.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.Multi_Portfolio.service.S3Service;

@RestController
@RequestMapping("/api/test")
@ConditionalOnProperty(name = "aws.s3.enabled", havingValue = "true", matchIfMissing = false)
public class S3TestController {

    @Autowired
    private S3Service s3Service;

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "S3 Test Controller is working!");
        response.put("status", "ok");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/aws-credentials")
    public ResponseEntity<Map<String, String>> testAwsCredentials() {
        Map<String, String> response = new HashMap<>();
        try {
            // Simple S3 operation to test credentials
            s3Service.getS3Client().listBuckets();
            response.put("status", "success");
            response.put("message", "AWS credentials are working");
            response.put("bucketName", s3Service.getS3BucketName());
            response.put("region", s3Service.getS3Region());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "AWS credentials failed: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> testUpload(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Simple test upload using the S3Service
            String photoUrl = s3Service.uploadFile(file, "testuser", "profile");
            
            response.put("message", "File uploaded successfully!");
            response.put("url", photoUrl);
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            response.put("error", "Upload failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
