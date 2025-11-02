package com.examly.springapp.controller;

import com.examly.springapp.dto.AudioDto;
import com.examly.springapp.service.AudioService;
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
@RequestMapping("/api/audio")
@RequiredArgsConstructor
@Tag(name = "Audio API", description = "Operations related to audio files")
public class AudioController {

    private final AudioService audioService;

    @Operation(summary = "Add new audio")
    @PostMapping(value = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AudioDto> addAudio(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("audio") MultipartFile audioFile) throws IOException {
        return ResponseEntity.ok(audioService.addAudio(title, description, audioFile));
    }

    @Operation(summary = "Update audio")
    @PutMapping(value = "/admin/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AudioDto> updateAudio(
            @PathVariable Long id,
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart(value = "audio", required = false) MultipartFile audioFile) throws IOException {
        return ResponseEntity.ok(audioService.updateAudio(id, title, description, audioFile));
    }

    @Operation(summary = "Delete audio")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteAudio(@PathVariable Long id) {
        audioService.deleteAudio(id);
        return ResponseEntity.ok("Audio deleted successfully");
    }

    @Operation(summary = "Get all audio files")
    @GetMapping
    public ResponseEntity<List<AudioDto>> getAllAudio() {
        return ResponseEntity.ok(audioService.getAllAudio());
    }

    @Operation(summary = "Get audio by ID")
    @GetMapping("/{id}")
    public ResponseEntity<AudioDto> getAudio(@PathVariable Long id) {
        return ResponseEntity.ok(audioService.getAudioById(id));
    }

    @Operation(summary = "Search audio by title")
    @GetMapping("/search")
    public ResponseEntity<List<AudioDto>> searchAudio(@RequestParam String keyword) {
        return ResponseEntity.ok(audioService.searchAudio(keyword));
    }
}
