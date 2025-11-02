# Step 1: Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy Maven wrapper and pom.xml
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn

# Step 4: Download dependencies (for faster builds)
RUN ./mvnw dependency:go-offline

# Step 5: Copy project source
COPY src ./src

# Step 6: Build the application (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Step 7: Run the JAR file
CMD ["java", "-jar", "target/springapp-0.0.1-SNAPSHOT.jar"]
