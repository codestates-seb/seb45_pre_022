package com.seb45_022.preproject.server.domain.question.repository;

import com.seb45_022.preproject.server.domain.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByOrderByCreatedAtDesc(Question question, Pageable pageable);
}
