package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AudioDto {
    private Long id;
    private String title;
    private String description;
    private String audioPath;
}
