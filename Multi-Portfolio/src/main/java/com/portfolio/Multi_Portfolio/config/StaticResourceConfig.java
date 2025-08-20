package com.portfolio.Multi_Portfolio.config;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Serve uploaded photos from Multi-Portfolio project uploads directory
        String uploadPath = "file:Multi-Portfolio" + File.separator + "uploads" + File.separator + "photos" + File.separator;
        registry.addResourceHandler("/uploads/photos/**")
                .addResourceLocations(uploadPath);
    }
}
