# Profile API Guide

## Overview
The Profile API is designed to manage user profiles linked to the User schema via username. After user login, all profile operations are performed using the authenticated user's username automatically.

## Authentication
All profile endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Create or Update Profile
**POST** `/api/profile`

Creates a new profile or updates an existing profile for the logged-in user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "location": "New York, USA",
  "about": "Software Developer with 5 years experience",
  "dateOfBirth": "1990-01-15",
  "experience": ["Software Engineer at TechCorp", "Junior Developer at StartupXYZ"],
  "education": ["B.S. Computer Science - University ABC", "High School Diploma"],
  "skills": ["Java", "Spring Boot", "MongoDB", "React"],
  "interests": ["Programming", "Photography", "Travel"],
  "projects": ["E-commerce Platform", "Portfolio Website", "Chat Application"],
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "achievements": ["Employee of the Month", "Published Research Paper"],
  "certifications": ["AWS Solutions Architect", "Oracle Java Certification"],
  "courses": ["Machine Learning Course", "Advanced Spring Boot"],
  "languages": ["English", "Spanish", "French"],
  "profilePhoto": "https://example.com/profile.jpg",
  "addPosition": "Senior Software Developer"
}
```

**Response:**
```json
{
  "message": "Profile saved successfully",
  "profile": {
    "userId": "uuid-here",
    "username": "authenticated-username",
    "name": "John Doe",
    // ... other profile fields
  }
}
```

### 2. Get Current User's Profile
**GET** `/api/profile`

Retrieves the profile of the currently logged-in user.

**Response:**
```json
{
  "userId": "uuid-here",
  "username": "authenticated-username",
  "name": "John Doe",
  "email": "john.doe@example.com",
  // ... other profile fields
}
```

### 3. Update Current User's Profile (Partial Update)
**PUT** `/api/profile`

Updates specific fields of the current user's profile. Only provided fields will be updated.

**Request Body Example (updating only name and skills):**
```json
{
  "name": "John Smith",
  "skills": ["Java", "Spring Boot", "MongoDB", "React", "Node.js"]
}
```

### 4. Delete Current User's Profile
**DELETE** `/api/profile`

Deletes the profile of the currently logged-in user.

**Response:**
```json
{
  "message": "Profile deleted successfully"
}
```

### 5. Check if User Has Profile
**GET** `/api/profile/exists`

Checks if the current user has created a profile.

**Response:**
```json
{
  "username": "authenticated-username",
  "hasProfile": true
}
```

### 6. Get Profile by Username (Public View)
**GET** `/api/profile/user/{username}`

Retrieves a profile by username. This can be used to view other users' profiles.

**Response:**
```json
{
  "userId": "uuid-here",
  "username": "requested-username",
  "name": "Jane Doe",
  // ... other profile fields
}
```

## Key Features

### 1. Automatic User Linking
- All profile operations automatically use the authenticated user's username
- No need to manually specify user ID or username in requests
- Profile and User schemas are linked via the `username` field

### 2. Smart Create/Update
- POST endpoint intelligently handles both creation and updates
- If user already has a profile, it updates the existing one
- If no profile exists, it creates a new one

### 3. Partial Updates
- PUT endpoint allows updating only specific fields
- Existing data is preserved for fields not included in the request
- Prevents accidental data loss

### 4. Security
- All endpoints are protected by JWT authentication
- Users can only access their own profile data (except public view)
- Username is automatically extracted from the security context

## Error Responses

### 404 - Profile Not Found
```json
{
  "message": "Profile not found. Please create a profile first."
}
```

### 400 - Bad Request
```json
{
  "error": "Failed to save profile: [error details]"
}
```

### 401 - Unauthorized
```json
{
  "error": "Authentication failed: Invalid username or password."
}
```

## Example Usage Flow

1. **User Registration/Login**: Use `/api/auth/register` or `/api/auth/login`
2. **Check Profile Existence**: GET `/api/profile/exists`
3. **Create Profile**: POST `/api/profile` with profile data
4. **View Profile**: GET `/api/profile`
5. **Update Profile**: PUT `/api/profile` with updated fields
6. **View Other Profiles**: GET `/api/profile/user/{username}`

## Data Model

The Profile model includes the following fields:
- `userId`: Unique identifier (auto-generated UUID)
- `username`: Linked to User schema (auto-set from authentication)
- `name`: User's full name
- `email`: Contact email
- `phoneNumber`: Contact phone
- `profileImageUrl`: Profile image URL
- `location`: Geographic location
- `about`: Bio/description
- `dateOfBirth`: Date of birth
- `experience`: List of work experiences
- `education`: List of educational background
- `skills`: List of technical skills
- `interests`: List of interests/hobbies
- `projects`: List of projects
- `socialLinks`: Map of social media links
- `achievements`: List of achievements
- `featured`: Featured content
- `certifications`: List of certifications
- `courses`: List of completed courses
- `languages`: List of spoken languages
- `profilePhoto`: Profile photo URL/Base64
- `addPosition`: Current position/job title

---

# Postman Testing Guide

## Setup Instructions

### Step 1: Create Postman Environment
1. Open Postman
2. Click the gear icon (⚙️) in the top right corner
3. Click "Add" to create a new environment
4. Name it "Multi-Portfolio API"
5. Add these variables:
   - **Variable**: `baseUrl` | **Value**: `http://localhost:8081`
   - **Variable**: `token` | **Value**: (leave empty - will be set after login)

### Step 2: Create Collection
1. Click "New" → "Collection"
2. Name it "Multi-Portfolio Profile API"
3. Save it for organizing all your requests

## Authentication Setup

### 1. Register New User
**Create a new request in your collection:**

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/auth/register`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "username": "johndoe123",
    "password": "securePassword123"
  }
  ```
- **Expected Response**:
  ```json
  {
    "message": "User registered successfully",
    "username": "johndoe123"
  }
  ```

### 2. Login to Get JWT Token
**Create a new request:**

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "username": "johndoe123",
    "password": "securePassword123"
  }
  ```
- **Expected Response**:
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huZG9lMTIzIiwiaWF0IjoxNzIyMDY2MDAwLCJleHAiOjE3MjIxNTI0MDB9.xyz...",
    "tokenType": "Bearer",
    "username": "johndoe123",
    "redirectUrl": "localhost:8080/johndoe123",
    "hasProfile": true,
    "profile": {
      "userId": "uuid-here",
      "username": "johndoe123",
      "name": "John Doe",
      "email": "john.doe@example.com"
      // ... other profile fields if profile exists
    }
  }
  ```

**Note**: If the user doesn't have a profile yet, the response will include:
```json
{
  "accessToken": "jwt-token-here",
  "tokenType": "Bearer", 
  "username": "johndoe123",
  "redirectUrl": "localhost:8080/johndoe123",
  "hasProfile": false,
  "profile": null
}
```

**🔥 Important**: Copy the `accessToken` value - you'll need it for all profile requests!

### 🚀 Auto-Save Token Script (Highly Recommended)

Follow these steps to automatically save the JWT token to your environment:

**Step 1**: In your login request, click on the **"Tests"** tab (next to Body tab)

**Step 2**: Copy and paste this exact JavaScript code into the Tests editor:
```javascript
if (pm.response.code === 200) {
    const responseJson = pm.response.json();
    pm.environment.set("token", responseJson.accessToken);
    console.log("✅ Token saved to environment variable");
    
    // Show login info
    console.log("Username:", responseJson.username);
    console.log("Redirect URL:", responseJson.redirectUrl);
    console.log("Has Profile:", responseJson.hasProfile);
    
    if (responseJson.hasProfile && responseJson.profile) {
        console.log("Profile Name:", responseJson.profile.name || "N/A");
        console.log("Profile Email:", responseJson.profile.email || "N/A");
    } else {
        console.log("No profile found - user should create one");
    }
    
    console.log("Token expires in 24 hours");
} else {
    console.log("❌ Login failed - Token not saved");
    console.log("Response:", pm.response.text());
}
```

**Step 3**: Save the request (`Ctrl + S`)

**Step 4**: Test it by sending the login request

**What happens**:
- ✅ If login succeeds (200 OK): Token automatically saved to `{{token}}` variable
- ❌ If login fails: Error message shown in console
- 📝 Console messages help you debug issues

**Verify it worked**:
1. After successful login, go to Environment settings (⚙️ gear icon)
2. Click on "Multi-Portfolio API" environment  
3. The `token` variable should now have a long JWT value
4. Open Postman Console (`View` → `Show Postman Console`) to see the success message

## Profile API Testing

### Authorization Setup for All Profile Requests
For **ALL** profile endpoints, add this header:
- **Key**: `Authorization`
- **Value**: `Bearer {{token}}`

### 1. Check Profile Existence
- **Method**: `GET`
- **URL**: `{{baseUrl}}/api/profile/exists`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```
- **Expected Response**:
  ```json
  {
    "username": "johndoe123",
    "hasProfile": false
  }
  ```

### 2. Create New Profile
- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/profile`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {{token}}
  ```
- **Body** (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1-555-123-4567",
    "location": "San Francisco, CA",
    "about": "Full-stack developer with 5+ years experience in modern web technologies",
    "dateOfBirth": "1990-05-15",
    "experience": [
      "Senior Software Engineer at TechCorp (2022-Present)",
      "Software Engineer at StartupXYZ (2020-2022)",
      "Junior Developer at WebSolutions (2019-2020)"
    ],
    "education": [
      "M.S. Computer Science - Stanford University (2019)",
      "B.S. Software Engineering - UC Berkeley (2017)"
    ],
    "skills": [
      "Java", "Spring Boot", "MongoDB", "React", "Node.js", 
      "Docker", "AWS", "Microservices", "REST APIs"
    ],
    "interests": [
      "Machine Learning", "Open Source", "Photography", 
      "Hiking", "Tech Blogging"
    ],
    "projects": [
      "E-commerce Platform - Full-stack web application",
      "Portfolio Website - Personal portfolio with blog",
      "Chat Application - Real-time messaging app"
    ],
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "twitter": "https://twitter.com/johndoe",
      "portfolio": "https://johndoe.dev"
    },
    "achievements": [
      "Employee of the Month - March 2023",
      "Published Research Paper on Microservices",
      "Speaker at TechConf 2023"
    ],
    "certifications": [
      "AWS Solutions Architect Associate",
      "Oracle Java SE 11 Developer",
      "MongoDB Certified Developer"
    ],
    "courses": [
      "Advanced Spring Boot Masterclass",
      "Machine Learning Specialization - Coursera",
      "System Design Interview Course"
    ],
    "languages": ["English", "Spanish", "French"],
    "profilePhoto": "https://example.com/profiles/johndoe.jpg",
    "addPosition": "Senior Full-Stack Developer"
  }
  ```
- **Expected Response**:
  ```json
  {
    "message": "Profile saved successfully",
    "profile": {
      "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "username": "johndoe123",
      "name": "John Doe",
      // ... other profile fields
    }
  }
  ```

### 3. Get Current User's Profile
- **Method**: `GET`
- **URL**: `{{baseUrl}}/api/profile`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```
- **Expected Response**: Complete profile object with all fields

### 4. Update Profile (Partial Update)
- **Method**: `PUT`
- **URL**: `{{baseUrl}}/api/profile`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {{token}}
  ```
- **Body** (raw JSON - only fields you want to update):
  ```json
  {
    "name": "John Smith Doe",
    "skills": [
      "Java", "Spring Boot", "MongoDB", "React", "Node.js", 
      "Docker", "AWS", "Kubernetes", "GraphQL", "TypeScript"
    ],
    "addPosition": "Lead Software Architect",
    "experience": [
      "Lead Software Architect at TechCorp (2024-Present)",
      "Senior Software Engineer at TechCorp (2022-2024)",
      "Software Engineer at StartupXYZ (2020-2022)"
    ]
  }
  ```

### 5. View Another User's Profile (Public)
- **Method**: `GET`
- **URL**: `{{baseUrl}}/api/profile/user/johndoe123`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```

### 6. Delete Profile
- **Method**: `DELETE`
- **URL**: `{{baseUrl}}/api/profile`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```
- **Expected Response**:
  ```json
  {
    "message": "Profile deleted successfully"
  }
  ```

## Testing Scenarios

### ✅ Happy Path Testing
1. Register user → Login → Check profile exists (should be false)
2. Create profile → Check profile exists (should be true)
3. Get profile → Verify all fields are saved correctly
4. Update specific fields → Get profile → Verify only updated fields changed
5. View public profile → Verify data matches

### ❌ Error Testing
1. **Missing Token**: Remove Authorization header → Expect 401 Unauthorized
2. **Invalid Token**: Use fake token → Expect 401 Unauthorized
3. **Expired Token**: Use old token → Expect 401 Unauthorized
4. **Invalid JSON**: Send malformed JSON → Expect 400 Bad Request
5. **Get Non-existent Profile**: Try to get profile that doesn't exist → Expect 404

### 🔍 Expected Status Codes
- **200 OK**: Successful GET/PUT/DELETE requests
- **201 Created**: Successful POST (profile creation)
- **400 Bad Request**: Invalid request data/JSON
- **401 Unauthorized**: Missing or invalid JWT token
- **404 Not Found**: Profile doesn't exist
- **500 Internal Server Error**: Server-side error

## Postman Collection Export/Import

### Export Collection
1. Right-click your collection → "Export"
2. Choose "Collection v2.1" format
3. Save the JSON file

### Import Collection
1. Click "Import" in Postman
2. Upload the exported JSON file
3. Collection will be imported with all requests

## Advanced Testing Tips

### 1. Environment Variables Usage
- Use `{{baseUrl}}` instead of hardcoding URLs
- Use `{{token}}` for authorization headers
- Create different environments (dev, staging, prod)

### 2. Automated Testing with Scripts
Add this to "Tests" tab for profile creation:
```javascript
pm.test("Profile created successfully", function () {
    pm.response.to.have.status(201);
    pm.expect(pm.response.json().message).to.eql("Profile saved successfully");
});

pm.test("Profile has correct username", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.profile.username).to.exist;
});
```

### 3. Data Validation Tests
```javascript
pm.test("Profile contains all required fields", function () {
    const profile = pm.response.json();
    pm.expect(profile).to.have.property('userId');
    pm.expect(profile).to.have.property('username');
    pm.expect(profile).to.have.property('name');
    pm.expect(profile).to.have.property('email');
});
```

### 4. Token Refresh Handling
If tokens expire (24 hours), you'll need to:
1. Run the login request again
2. Copy the new token
3. Update the environment variable

---

## Quick Reference

### Base URL
```
http://localhost:8081
```

### Headers Template
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Profile Endpoints
- `GET /api/profile/exists` - Check if profile exists
- `POST /api/profile` - Create/update profile
- `GET /api/profile` - Get current user's profile
- `PUT /api/profile` - Update profile (partial)
- `DELETE /api/profile` - Delete profile
- `GET /api/profile/user/{username}` - Get public profile

**Remember**: Always ensure your Spring Boot application is running on `http://localhost:8081` before testing!
