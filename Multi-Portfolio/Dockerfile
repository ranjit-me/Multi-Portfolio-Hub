# Multi-stage Dockerfile for Spring Boot application

# Build stage
FROM maven:3.9.6-eclipse-temurin-21 as build

WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Fix Java version compatibility (Java 24 -> Java 21)
RUN sed -i 's/<java.version>24<\/java.version>/<java.version>21<\/java.version>/g' pom.xml && \
    sed -i 's/<source>24<\/source>/<source>21<\/source>/g' pom.xml && \
    sed -i 's/<target>24<\/target>/<target>21<\/target>/g' pom.xml

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Create uploads directory and set permissions
RUN mkdir -p /app/uploads/photos && \
    chown -R appuser:appgroup /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership of the JAR file
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/actuator/health || exit 1

# Set JVM options for containerized environment
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Run the application
CMD sh -c "java $JAVA_OPTS -jar app.jar"
