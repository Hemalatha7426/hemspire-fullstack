package com.examly.springapp.service;

import com.examly.springapp.dto.AudioDto;
import com.examly.springapp.model.Audio;
import com.examly.springapp.repository.AudioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AudioService {

    private final AudioRepository audioRepository;

    // Use external folder to serve files correctly
    private final String uploadDir = "uploads/audio/";

    public AudioDto addAudio(String title, String description, MultipartFile audioFile) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + audioFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        audioFile.transferTo(filePath);

        Audio audio = Audio.builder()
                .title(title)
                .description(description)
                .audioPath("/uploads/audio/" + fileName)
                .build();

        audio = audioRepository.save(audio);
        return mapToDto(audio);
    }

    public AudioDto updateAudio(Long id, String title, String description, MultipartFile audioFile) throws IOException {
        Audio audio = audioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audio not found"));

        audio.setTitle(title);
        audio.setDescription(description);

        if (audioFile != null && !audioFile.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + audioFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            audioFile.transferTo(filePath);
            audio.setAudioPath("/uploads/audio/" + fileName);
        }

        audio = audioRepository.save(audio);
        return mapToDto(audio);
    }

    public void deleteAudio(Long id) {
        audioRepository.deleteById(id);
    }

    public List<AudioDto> getAllAudio() {
        return audioRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public AudioDto getAudioById(Long id) {
        return mapToDto(audioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audio not found")));
    }

    public List<AudioDto> searchAudio(String keyword) {
        return audioRepository.findByTitleContainingIgnoreCase(keyword)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private AudioDto mapToDto(Audio audio) {
        return AudioDto.builder()
                .id(audio.getId())
                .title(audio.getTitle())
                .description(audio.getDescription())
                .audioPath(audio.getAudioPath())
                .build();
    }
}
