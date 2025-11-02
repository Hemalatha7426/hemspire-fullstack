package com.examly.springapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.examly.springapp.dto.PoemDto;
import com.examly.springapp.model.Poem;
import com.examly.springapp.repository.PoemRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoemService {

    private final PoemRepository poemRepository;
    private final String uploadDir = "uploads/images/"; // ✅ outside src folder

    // Add new poem
    public PoemDto addPoem(String title, String description, MultipartFile imageFile) throws IOException {
        String cleanFileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename().replaceAll("\\s+", "_");
        Path filePath = Paths.get(uploadDir + cleanFileName);
        Files.createDirectories(filePath.getParent());
        imageFile.transferTo(filePath);

        Poem poem = Poem.builder()
                .title(title)
                .description(description)
                .imagePath("/uploads/images/" + cleanFileName)
                .build();

        poemRepository.save(poem);
        return mapToDto(poem);
    }

    // Update poem
    public PoemDto updatePoem(Long id, String title, String description, MultipartFile imageFile) throws IOException {
        Poem poem = poemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poem not found"));

        poem.setTitle(title);
        poem.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            String cleanFileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename().replaceAll("\\s+", "_");
            Path filePath = Paths.get(uploadDir + cleanFileName);
            Files.createDirectories(filePath.getParent());
            imageFile.transferTo(filePath);
            poem.setImagePath("/uploads/images/" + cleanFileName);
        }

        poemRepository.save(poem);
        return mapToDto(poem);
    }

    // Delete poem
    public void deletePoem(Long id) {
        poemRepository.deleteById(id);
    }

    // Get all poems
    public List<PoemDto> getAllPoems() {
        return poemRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Get poem by ID
    public PoemDto getPoemById(Long id) {
        Poem poem = poemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poem not found"));
        return mapToDto(poem);
    }

    // Search poems
    public List<PoemDto> searchPoems(String keyword) {
        return poemRepository.findByTitleContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // Convert Entity → DTO
    private PoemDto mapToDto(Poem poem) {
        return PoemDto.builder()
                .id(poem.getId())
                .title(poem.getTitle())
                .description(poem.getDescription())
                .imagePath(poem.getImagePath())
                .build();
    }
}
