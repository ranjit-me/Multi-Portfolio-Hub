package com.portfolio.Multi_Portfolio.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "profile")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    @Id
    private String userId;

    // Profile Type (doctor/engineer)
    private String profileType; // "doctor" or "engineer"

    // Template Selection
    private String selectedTemplate; // "default", "cardiologist", "orthopedic-surgeon", etc.

    // Header Section
    private String fullName;
     private String username;
    private String professionalTitle;
    private String phoneNumber;
    private String professionalEmail;
    private String dob;
    private String location;
    private String position;
    private String profilePhoto;
    private String address; // Optional
    private String linkedInOrWebsite;

    // Licenses & Certifications
    private List<Certification> certifications;

    // Education
    private List<Education> education;

    // Internships / Residency / Fellowship
    private List<Internship> internships;

    // Projects
    private List<Project> projects;

    // Research & Publications
    private List<Publication> publications;

    // Conferences & CME
    private List<Conference> conferences;

    // Skills & Languages
    private List<String> skills;
    private List<String> languages;

    // Awards / Achievements
    private List<Achievement> achievements;

    // Medical Experience
    private List<MedicalExperience> medicalExperience;

    // Professional Memberships
    private List<String> professionalMemberships;

    // Engineering Experience (Optional)
    private List<EngineeringExperience> engineeringExperiences;
    
    // Legacy/Additional fields for backward compatibility
    private List<Experience> experience; // Generic work experience
    private List<String> interests; // Interests and hobbies
    private SocialLinks socialLinks; // Social media links
}

// ------------------------------------------
// Nested Classes With Photo Lists

@Data
@AllArgsConstructor
@NoArgsConstructor
class Certification {
    private String name;
    private String authority;
    private String issueDate;
    private List<String> certPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Education {
    private String degree;
    private String university;
    private String startDate;
    private String endDate;
    private String yearOfPassing;
    private String grade;
    private String description;
    private String honors;
    private List<String> eduPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Internship {
    private String hospitalName;
    private String department;
    private String duration;
    private String issueDate;
    private String keyLearnings;
    private List<String> internshipPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Project {
    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private String technologies;
    private String role;
    private String projectUrl;
    private String githubUrl;
    private List<String> projectPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Publication {
    private String title;
    private String publisher;
    private String publicationDate;
    private String author;
    private String publicationUrl;
    private String description;
    private List<String> publicationPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Conference {
    private String name;
    private String role; // Attended or Presented
    private String date;
    private List<String> conferencePhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Achievement {
    private String title;
    private String associatedWith;
    private String issuer;
    private String issueDate;
    private String description;
    private List<String> achievementPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class MedicalExperience {
    private String jobTitle;
    private String hospitalName;
    private String startDate;
    private String endDate;
    private String responsibilities;
    private List<String> medicalExpPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class EngineeringExperience {
    private String projectName;
    private String description;
    private String startDate;
    private String endDate;
    private String location;
    private String projectLink;
    private List<String> enggExpPhotos;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Experience {
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private String location;
    private String description;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class SocialLinks {
    private String linkedin;
    private String github;
    private String twitter;
    private String website;
}
