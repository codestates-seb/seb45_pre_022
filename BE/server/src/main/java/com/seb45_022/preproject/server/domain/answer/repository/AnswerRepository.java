package com.seb45_022.preproject.server.domain.answer.repository;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {

    List<Answer> findByQuestion_QuestionId(long id);
}
