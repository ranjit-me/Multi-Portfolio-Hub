# Portfolio Backend (Spring Boot)

This is the backend API for the Multi-Portfolio project built with Spring Boot, MongoDB, and JWT authentication.

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Maven 3.6+
- MongoDB Atlas account (or local MongoDB)
- Docker (for containerized deployment)

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Multi-Portfolio

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB and JWT settings

# Run the application
./mvnw spring-boot:run
```

### Docker Deployment

```bash
# Build Docker image
./build-backend.sh
# or on Windows
./build-backend.cmd

# Run container
docker run -d -p 8081:8081 --name portfolio-backend portfolio-backend
```

## 📁 Project Structure

```
src/main/java/com/portfolio/Multi_Portfolio/
├── controller/        # REST API controllers
├── model/            # Entity models
├── repository/       # Data access layer
├── service/          # Business logic
├── security/         # JWT and security config
├── config/           # Application configuration
└── payload/          # Request/Response DTOs
```

## 🛠️ Built With

- **Spring Boot 3.5.3** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data MongoDB** - Database integration
- **JWT** - Token-based authentication
- **Maven** - Dependency management
- **Docker** - Containerization

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
MONGODB_DATABASE=portfolio

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# File Upload
UPLOAD_DIR=/app/uploads/photos

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080

# AWS S3 (Optional)
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
```

## 🗄️ Database

The application uses MongoDB Atlas with the following collections:
- `users` - User authentication data
- `profiles` - User profile information
- `photos` - Photo metadata and storage info

## 🔐 Authentication

- JWT-based authentication
- User registration and login endpoints
- Protected routes with role-based access
- Password encryption with BCrypt

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profile Management
- `GET /api/profile/{username}` - Get user profile
- `PUT /api/profile/{username}` - Update profile
- `POST /api/profile/photos/profile` - Upload profile photo
- `POST /api/profile/photos/professional` - Upload professional photos

### Health Check
- `GET /actuator/health` - Application health status

## 🐳 Docker

The application includes:
- Multi-stage Dockerfile for optimized builds
- Automatic Java version compatibility fixes
- Security-focused container setup
- Health checks and monitoring

## 🚀 Deployment

The application can be deployed using:
- Docker containers
- Docker Compose (with frontend)
- Cloud platforms (AWS, GCP, Azure)
- Traditional application servers

## 🔧 Configuration Profiles

- `default` - Local development
- `docker` - Containerized deployment
- `production` - Production environment

## 📊 Monitoring

- Spring Boot Actuator endpoints
- Health checks
- Application metrics
- Custom logging configuration
