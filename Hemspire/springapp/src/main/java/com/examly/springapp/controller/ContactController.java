package com.examly.springapp.controller;

import com.examly.springapp.dto.ContactDto;
import com.examly.springapp.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact API", description = "Submit and manage contact/feedback messages")
public class ContactController {

    private final ContactService contactService;

    // User: Submit feedback
    @Operation(summary = "Submit feedback or contact message")
    @PostMapping("/submit")
    public ResponseEntity<ContactDto> submitFeedback(@RequestBody ContactDto contactDto) {
        return ResponseEntity.ok(contactService.submitFeedback(contactDto));
    }

    // Admin: Get all feedback
    @Operation(summary = "Get all feedback messages (Admin only)")
    @GetMapping("/admin")
    public ResponseEntity<List<ContactDto>> getAllFeedback() {
        return ResponseEntity.ok(contactService.getAllFeedback());
    }

    // Admin: Get feedback by ID
    @Operation(summary = "Get feedback by ID (Admin only)")
    @GetMapping("/admin/{id}")
    public ResponseEntity<ContactDto> getFeedback(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getFeedbackById(id));
    }

    // Admin: Delete feedback
    @Operation(summary = "Delete feedback (Admin only)")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
        contactService.deleteFeedback(id);
        return ResponseEntity.ok("Feedback deleted successfully");
    }

    // Admin: Search feedback by subject
    @Operation(summary = "Search feedback by subject (Admin only)")
    @GetMapping("/admin/search")
    public ResponseEntity<List<ContactDto>> searchFeedback(@RequestParam String keyword) {
        return ResponseEntity.ok(contactService.searchFeedback(keyword));
    }
}
