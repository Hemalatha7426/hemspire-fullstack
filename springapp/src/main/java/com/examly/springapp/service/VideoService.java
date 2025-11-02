package com.examly.springapp.service;

import com.examly.springapp.dto.VideoDto;
import com.examly.springapp.model.Video;
import com.examly.springapp.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final String uploadDir = "uploads/videos/";

    public VideoDto addVideo(String title, String description, MultipartFile videoFile) throws IOException {
        String cleanFileName = System.currentTimeMillis() + "_" + videoFile.getOriginalFilename().replaceAll("\\s+", "_");
        Path filePath = Paths.get(uploadDir + cleanFileName);
        Files.createDirectories(filePath.getParent());
        videoFile.transferTo(filePath);

        Video video = Video.builder()
                .title(title)
                .description(description)
                .videoPath("/uploads/videos/" + cleanFileName)
                .build();

        videoRepository.save(video);
        return mapToDto(video);
    }

    public VideoDto updateVideo(Long id, String title, String description, MultipartFile videoFile) throws IOException {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found"));
        video.setTitle(title);
        video.setDescription(description);

        if (videoFile != null && !videoFile.isEmpty()) {
            String cleanFileName = System.currentTimeMillis() + "_" + videoFile.getOriginalFilename().replaceAll("\\s+", "_");
            Path filePath = Paths.get(uploadDir + cleanFileName);
            Files.createDirectories(filePath.getParent());
            videoFile.transferTo(filePath);
            video.setVideoPath("/uploads/videos/" + cleanFileName);
        }

        videoRepository.save(video);
        return mapToDto(video);
    }

    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }

    public List<VideoDto> getAllVideos() {
        return videoRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public VideoDto getVideoById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found"));
        return mapToDto(video);
    }

    public List<VideoDto> searchVideos(String keyword) {
        return videoRepository.findByTitleContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private VideoDto mapToDto(Video video) {
        return VideoDto.builder()
                .id(video.getId())
                .title(video.getTitle())
                .description(video.getDescription())
                .videoPath(video.getVideoPath())
                .build();
    }
}
