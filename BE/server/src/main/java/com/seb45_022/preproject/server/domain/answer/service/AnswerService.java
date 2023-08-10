package com.seb45_022.preproject.server.domain.answer.service;

import com.seb45_022.preproject.server.domain.answer.entity.AnswerEntity;
import com.seb45_022.preproject.server.domain.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {

    //TODO MemberRepository, MemberService, QuestionService 들어올 예정
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public AnswerEntity createAnswer(AnswerEntity answer) {
        answer.setCreatedAt(LocalDateTime.now());
        answer.setLastModifiedAt(LocalDateTime.now());

        return answerRepository.save(answer);
    }

    public AnswerEntity updateAnswer(AnswerEntity answer) {
        AnswerEntity foundAnswer = findAnswer(answer.getAnswerId());
        foundAnswer.setLastModifiedAt(LocalDateTime.now());
        return answerRepository.save(foundAnswer);
    }

    //TODO BusinessLogicException클래스 및 ExceptionCode enum 구현 예정
    private AnswerEntity findAnswer(long answerId) {
        Optional<AnswerEntity> optionalAnswer =
                answerRepository.findById(answerId);
        return optionalAnswer.orElseThrow(() ->
                new RuntimeException());
    }
    public void deleteAnswer(long answerId) {
        AnswerEntity foundAnswer = findAnswer(answerId);
        answerRepository.delete(foundAnswer);
    }
}
