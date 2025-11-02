package com.examly.springapp.controller;

import com.examly.springapp.dto.LoginDto;
import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.model.User;
import com.examly.springapp.security.JwtUtil;
import com.examly.springapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8081") // React app
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final com.examly.springapp.config.CustomUserDetailsService customUserDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          UserService userService, com.examly.springapp.config.CustomUserDetailsService customUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.customUserDetailsService = customUserDetailsService;
    }

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto) {
        User newUser = userService.registerUser(registerDto);
        return ResponseEntity.ok("User registered successfully: " + newUser.getEmail());
    }

    // Login API
   @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        return ResponseEntity.ok("Login Successful");

    } catch (BadCredentialsException ex) {
        return ResponseEntity.status(401).body("Invalid email or password");
    } catch (Exception e) {
        e.printStackTrace(); // log the error to console
        return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
    }
}

}
