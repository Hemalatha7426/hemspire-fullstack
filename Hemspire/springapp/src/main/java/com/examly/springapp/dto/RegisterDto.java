package com.examly.springapp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String name;
    private String email;
    private String password;
    private String role; // "ADMIN" or "USER"
}
