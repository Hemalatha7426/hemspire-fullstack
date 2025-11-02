#!/bin/bash

# --- Hemspire Application Configuration ---

# Database settings from your properties
DATABASE_NAME="hemspire_db"
DB_USER="root"
DB_PASS="root"

# Project output directory
# (You can change this path if you want)
OUTPUT_DIR="/home/coder/project/workspace/hemspire_poem_application/springapp"

# --- Setup Steps ---

echo "Creating database (if it doesn't exist)..."
# Create database
mysql -u ${DB_USER} -p${DB_PASS} -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed or MySQL not available. Proceeding..."

echo "Generating Spring Boot project..."
# Generate Spring Boot project using Spring CLI
# Added 'security' for your AuthController and security config
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Hemspire Poem Application" \
  --description="Spring Boot backend for Hemspire Poem Application" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql,lombok,security \
  --build=maven \
  ${OUTPUT_DIR}

# Wait for project generation to complete
sleep 5

echo "Configuring application.properties..."
# Add your specific Hemspire configuration to application.properties
mkdir -p ${OUTPUT_DIR}/src/main/resources
cat > "${OUTPUT_DIR}/src/main/resources/application.properties" << EOL
# --- Database Configuration ---
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# --- JWT Security Configuration ---
app.jwtSecret=my_super_secret_key_which_is_long_enough_1234567890
app.jwtExpirationMs=86400000

# --- File Upload Configuration ---
# Allow large video uploads
spring.servlet.multipart.max-file-size=200MB
spring.servlet.multipart.max-request-size=200MB

# --- Static Resource Handling ---
# Serve files from the external 'uploads' directory
spring.web.resources.static-locations=classpath:/static/,file:uploads/

# --- Misc ---
spring.main.allow-bean-definition-overriding=true
EOL

echo "Creating package structure..."
# Create package structure based on your controllers/services
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/model
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/controller
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/service
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/repository
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/exception
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/dto
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/config
mkdir -p ${OUTPUT_DIR}/src/main/java/com/examly/springapp/security

echo "Writing main application file..."
# Write the HemspireApplication.java file
cat > "${OUTPUT_DIR}/src/main/java/com/examly/springapp/HemspireApplication.java" << EOL
package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HemspireApplication {
    public static void main(String[] args) { 
        SpringApplication.run(HemspireApplication.class, args);
    }
}
EOL

echo "Adding JWT and OpenAPI (Swagger) dependencies to pom.xml..."
# Add dependencies for JWT (required for security) and OpenAPI (for your @Tag annotations)
sed -i '/<\/dependencies>/i \
    \
    <dependency> \
      <groupId>io.jsonwebtoken</groupId> \
      <artifactId>jjwt-api</artifactId> \
      <version>0.11.5</version> \
    </dependency> \
    <dependency> \
      <groupId>io.jsonwebtoken</groupId> \
      <artifactId>jjwt-impl</artifactId> \
      <version>0.11.5</version> \
      <scope>runtime</scope> \
    </dependency> \
    <dependency> \
      <groupId>io.jsonwebtoken</groupId> \
      <artifactId>jjwt-jackson</artifactId> \
      <version>0.11.5</version> \
      <scope>runtime</scope> \
    </dependency> \
    \
    \
    <dependency> \
      <groupId>org.springdoc</groupId> \
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId> \
      <version>2.5.0</version> \
    </dependency>' ${OUTPUT_DIR}/pom.xml

echo "--- Project Setup Complete ---"
echo "Project created at: ${OUTPUT_DIR}"
echo "Database: ${DATABASE_NAME}"