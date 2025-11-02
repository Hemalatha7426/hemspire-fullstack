package com.examly.springapp.service;

import com.examly.springapp.dto.ContactDto;
import com.examly.springapp.model.ContactMessage;
import com.examly.springapp.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    // User: Submit feedback
    public ContactDto submitFeedback(ContactDto contactDto) {
        ContactMessage message = ContactMessage.builder()
                .name(contactDto.getName())
                .email(contactDto.getEmail())
                .phoneNumber(contactDto.getPhoneNumber())
                .subject(contactDto.getSubject())
                .message(contactDto.getMessage())
                .build();

        message = contactRepository.save(message);
        return mapToDto(message);
    }

    // Admin: Get all feedback
    public List<ContactDto> getAllFeedback() {
        return contactRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    // Admin: Get feedback by ID
    public ContactDto getFeedbackById(Long id) {
        return mapToDto(contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found")));
    }

    // Admin: Delete feedback
    public void deleteFeedback(Long id) {
        contactRepository.deleteById(id);
    }

    // Admin: Search feedback by subject/title
    public List<ContactDto> searchFeedback(String keyword) {
        return contactRepository.findBySubjectContainingIgnoreCase(keyword)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ContactDto mapToDto(ContactMessage message) {
        return ContactDto.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phoneNumber(message.getPhoneNumber())
                .subject(message.getSubject())
                .message(message.getMessage())
                .build();
    }
}
