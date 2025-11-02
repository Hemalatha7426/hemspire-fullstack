package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String subject;
    private String message;
}
