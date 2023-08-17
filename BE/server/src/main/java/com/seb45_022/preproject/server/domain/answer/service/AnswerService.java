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
        Answer foundAnswer = findVerifiedAnswer(answer.getAnswerId());

        verifiedAnswerOwner(answer.getMember().getMemberId(), foundAnswer);
        foundAnswer.setLastModifiedAt(LocalDateTime.now());
        foundAnswer.setBody(answer.getBody());
        return answerRepository.save(foundAnswer);
    }
    public void deleteAnswer(long answerId, long memberId) {
        Answer foundAnswer = findVerifiedAnswer(answerId);
        verifiedAnswerOwner(memberId, foundAnswer);

        answerRepository.delete(foundAnswer);
    }


    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
    private void verifiedAnswerOwner(long memberId, Answer foundAnswer) {
        if (memberId != foundAnswer.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
}
