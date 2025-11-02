package com.examly.springapp.repository;

import com.examly.springapp.model.Audio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AudioRepository extends JpaRepository<Audio, Long> {
    List<Audio> findByTitleContainingIgnoreCase(String keyword);
}
