package com.examly.springapp.controller;

import com.examly.springapp.dto.VideoDto;
import com.examly.springapp.service.VideoService;
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
@RequestMapping("/api/videos")
@RequiredArgsConstructor
@Tag(name = "Video API", description = "Operations related to video poems")
public class VideoController {

    private final VideoService videoService;

    @Operation(summary = "Add new video poem")
    @PostMapping(value = "/admin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VideoDto> addVideo(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("video") MultipartFile videoFile) throws IOException {
        return ResponseEntity.ok(videoService.addVideo(title, description, videoFile));
    }

    @Operation(summary = "Update video poem")
    @PutMapping(value = "/admin/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<VideoDto> updateVideo(
            @PathVariable Long id,
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart(value = "video", required = false) MultipartFile videoFile) throws IOException {
        return ResponseEntity.ok(videoService.updateVideo(id, title, description, videoFile));
    }

    @Operation(summary = "Delete video poem")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.ok("Video deleted successfully");
    }

    @Operation(summary = "Get all videos")
    @GetMapping
    public ResponseEntity<List<VideoDto>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    @Operation(summary = "Search videos by title")
    @GetMapping("/search")
    public ResponseEntity<List<VideoDto>> searchVideos(@RequestParam String keyword) {
        return ResponseEntity.ok(videoService.searchVideos(keyword));
    }
}
