package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PoemDto {
    private Long id;
    private String title;
    private String description;
    private String imagePath; // URL for user to view/download
}
