package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.Poem;

import java.util.List;

@Repository
public interface PoemRepository extends JpaRepository<Poem, Long> {
    List<Poem> findByTitleContainingIgnoreCase(String title);
}
