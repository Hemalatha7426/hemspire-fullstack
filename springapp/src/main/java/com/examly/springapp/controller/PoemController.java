package com.examly.springapp.controller;

import com.examly.springapp.dto.PoemDto;
import com.examly.springapp.service.PoemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/poems")
@RequiredArgsConstructor
@Tag(name = "Poem API", description = "Operations related to poems")
public class PoemController {

    private final PoemService poemService;

    // Add Poem (Admin)
    @Operation(summary = "Add new poem")
    @PostMapping(value = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PoemDto> addPoem(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("image") MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(poemService.addPoem(title, description, imageFile));
    }

    // Update Poem (Admin)
    @Operation(summary = "Update poem")
    @PutMapping(value = "/admin/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PoemDto> updatePoem(
            @PathVariable Long id,
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(poemService.updatePoem(id, title, description, imageFile));
    }

    // Delete Poem
    @Operation(summary = "Delete poem")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deletePoem(@PathVariable Long id) {
        poemService.deletePoem(id);
        return ResponseEntity.ok("Poem deleted successfully");
    }

    // Get all poems
    @Operation(summary = "Get all poems")
    @GetMapping
    public ResponseEntity<List<PoemDto>> getAllPoems() {
        return ResponseEntity.ok(poemService.getAllPoems());
    }

    // Get poem by ID
    @Operation(summary = "Get poem by ID")
    @GetMapping("/{id}")
    public ResponseEntity<PoemDto> getPoem(@PathVariable Long id) {
        return ResponseEntity.ok(poemService.getPoemById(id));
    }

    // Search poems
    @Operation(summary = "Search poems by title")
    @GetMapping("/search")
    public ResponseEntity<List<PoemDto>> searchPoems(@RequestParam String keyword) {
        return ResponseEntity.ok(poemService.searchPoems(keyword));
    }
}
