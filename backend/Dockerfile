# Stage 1: Build the Spring Boot application
FROM openjdk:17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Download project dependencies to cache them in Docker
RUN ["jlink", "--compress=2", "--no-header-files", "--no-man-pages", "--add-modules", "java.base", "--output", "/opt/jdk"]

# Copy the source code and build the application
COPY src ./src
RUN ./mvnw package -DskipTests

# Stage 2: Create a smaller image for running the application
FROM openjdk:17-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file built in Stage 1
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar ./app.jar

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
