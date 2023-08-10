package com.seb45_022.preproject.server.domain.answer.repository;

import com.seb45_022.preproject.server.domain.answer.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<AnswerEntity,Long> {
}
