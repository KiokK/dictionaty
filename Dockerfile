FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY . .

# Use the built JAR file to create a final image
FROM gradle:jdk17-alpine
WORKDIR /app
COPY /build/libs/dictionary-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

EXPOSE 8082
