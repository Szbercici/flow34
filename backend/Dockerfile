FROM eclipse-temurin:21-jdk

WORKDIR /app

# Maven wrapper és pom átmásolása
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Dependency-k előzetes letöltése (gyorsabb build!)
RUN ./mvnw dependency:go-offline

# Forráskód átmásolása
COPY src ./src

# Build (tesztek átugrásával)
RUN ./mvnw package -DskipTests

# Spring Boot 8080-as port
EXPOSE 8080

# Futattás
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
