package com.seb45_022.preproject.server.domain.answer.service;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
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

    public Answer createAnswer(Answer answer) {
        answer.setCreatedAt(LocalDateTime.now());
        answer.setLastModifiedAt(LocalDateTime.now());

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer foundAnswer = findVerifiedAnswer(answer.getAnswerId());
        foundAnswer.setLastModifiedAt(LocalDateTime.now());
        return answerRepository.save(foundAnswer);
    }

    //TODO BusinessLogicException클래스 및 ExceptionCode enum 구현 예정
    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                new RuntimeException());
        return findAnswer;
    }
    public void deleteAnswer(long answerId) {
        Answer foundAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(foundAnswer);
    }
}
