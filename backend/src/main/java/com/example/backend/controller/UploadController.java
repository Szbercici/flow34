package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;


import java.util.List;
import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;
import java.net.URI;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.nio.file.Files;




@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = "*")
public class UploadController {

    private static final Path IMAGE_DIR = Paths.get("uploads", "images");
    private static final Set<String> ALLOWED_EXT = Set.of("jpg", "jpeg", "png", "webp");

    //Create
    @PostMapping(value = "/images", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        String originalName = StringUtils.cleanPath(
                file.getOriginalFilename() == null ? "" : file.getOriginalFilename()
        );

        String ext = StringUtils.getFilenameExtension(originalName);

        if (ext == null) {
            return ResponseEntity.badRequest().body("File has no extension");
        }

        ext = ext.toLowerCase();


        if (!ALLOWED_EXT.contains(ext)) {
            return ResponseEntity.badRequest().body("Only jpg/jpeg/png/webp allowed");
        }

        // könyvtár létrehozás
        Files.createDirectories(IMAGE_DIR);

        // biztonságos, egyedi fájlnév
        String filename = UUID.randomUUID() + "." + ext;
        Path target = IMAGE_DIR.resolve(filename).normalize();

        // mentés (felülírás tiltás)
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // URL amit a frontend eltárol a product.image mezőbe
        String publicUrl = "http://localhost:8080/images/" + filename;
        return ResponseEntity.ok(publicUrl);
    }

    //DELETE
    @DeleteMapping("/images")
    public ResponseEntity<Void> deleteImageByUrl(@RequestParam("url") String imageUrl) {

        try {
            URI uri = new URI(imageUrl);
            String path = uri.getPath(); // pl: /static/images/abc.png

            if (path == null || !path.startsWith("/images/")) {
                return ResponseEntity.badRequest().build();
            }

            String filename = Paths.get(path).getFileName().toString();

            // extra védelem
            if (filename.contains("..")) {
                return ResponseEntity.badRequest().build();
            }

            Path imagePath = Paths.get("uploads", "images", filename).normalize();

            if (!Files.exists(imagePath)) {
                return ResponseEntity.notFound().build();
            }

            Files.delete(imagePath);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //get all images
    @GetMapping("/images")
    public ResponseEntity<List<String>> listImages() throws IOException {

        Path imageDir = Paths.get("uploads", "images");

        if (!Files.exists(imageDir)) {
            return ResponseEntity.ok(List.of());
        }

        List<String> images = Files.list(imageDir)
                .filter(Files::isRegularFile)
                .map(path -> "http://localhost:8080/images/" + path.getFileName())
                .toList();

        return ResponseEntity.ok(images);
    }

}
