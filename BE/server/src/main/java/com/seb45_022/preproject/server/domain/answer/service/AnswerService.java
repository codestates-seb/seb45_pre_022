package com.seb45_022.preproject.server.domain.answer.service;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.repository.AnswerRepository;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {

    //TODO MemberRepository, MemberService, QuestionService 들어올 예정
    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final MemberService memberService;

    public AnswerService(AnswerRepository answerRepository,
                         QuestionService questionService,
                         MemberService memberService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    public Answer createAnswer(Answer answer) {
        questionService.verifiedQuestion(answer.getQuestion().getQuestionId());
        memberService.findVerifiedMember(answer.getMember().getMemberId());

        answer.setCreatedAt(LocalDateTime.now());
        answer.setLastModifiedAt(LocalDateTime.now());

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        questionService.verifiedQuestion(answer.getQuestion().getQuestionId());
        memberService.findVerifiedMember(answer.getMember().getMemberId());

        Answer foundAnswer = findVerifiedAnswer(answer.getAnswerId());
        foundAnswer.setLastModifiedAt(LocalDateTime.now());
        return answerRepository.save(foundAnswer);
    }
    public void deleteAnswer(long answerId) {
        Answer foundAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(foundAnswer);
    }

    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
