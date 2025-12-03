FROM eclipse-temurin:21-jre

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nicht-root User erstellen
RUN useradd -ms /bin/bash appuser
USER appuser

# JAR kopieren
COPY ../../../backend/spring/target/*.jar app.jar

# Optionale Runtime-Parameter
ENV JVM_XMS=256m \
    JVM_XMX=512m \
    SPRING_PROFILES_ACTIVE=prod

# Spring Boot Standard-Port
EXPOSE 8080

# Startbefehl mit dynamischen JVM Argumenten
ENTRYPOINT ["sh", "-c", "exec java -Xms${JVM_XMS} -Xmx${JVM_XMX} -jar /app/app.jar"]
