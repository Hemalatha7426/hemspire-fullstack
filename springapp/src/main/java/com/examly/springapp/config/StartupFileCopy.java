package main.java.com.examly.springapp.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import java.io.*;
import java.nio.file.*;

@Component
public class StartupFileCopy {

    private static final String LOCAL_UPLOADS = "uploads";
    private static final String RENDER_UPLOADS = "/data/uploads";

    @PostConstruct
    public void copyExistingUploads() {
        try {
            File localDir = new File(LOCAL_UPLOADS);
            File renderDir = new File(RENDER_UPLOADS);

            if (localDir.exists() && localDir.isDirectory()) {
                if (!renderDir.exists()) renderDir.mkdirs();

                Files.walk(localDir.toPath())
                        .filter(Files::isRegularFile)
                        .forEach(source -> {
                            Path destination = renderDir.toPath().resolve(localDir.toPath().relativize(source));
                            try {
                                Files.createDirectories(destination.getParent());
                                Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
                                System.out.println("Copied: " + source + " -> " + destination);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        });
            } else {
                System.out.println("No local uploads found to copy.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
