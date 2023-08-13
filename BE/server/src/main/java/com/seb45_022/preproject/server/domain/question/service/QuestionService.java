package com.seb45_022.preproject.server.domain.question.service;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.repository.AnswerRepository;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.repository.CommentRepository;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.repository.QuestionRepository;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService,
                           AnswerRepository answerRepository,
                           CommentRepository commentRepository) {

        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    public Question createQuestion(Question question){
        question.setMember(memberService.findVerifiedMember(question.getMember().getMemberId()));

        LocalDateTime now = LocalDateTime.now();
        question.setCreatedAt(now);
        question.setLastModifiedAt(now);

        questionRepository.save(question);

        return question;
    }

    public Question findQuestion(long questionId){
        Question question = verifiedQuestion(questionId);

        return question;
    }

    public Page<Question> findQuestions(int page, int size){
        Page<Question> questions = questionRepository.findAll(PageRequest.of(page-1,size));

        return questions;
    }

    public Question updateQuestion(Question question) {
        Question verifiedQuestion = verifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> verifiedQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> verifiedQuestion.setBody(body));
        Optional.ofNullable(question.getTags())
                .ifPresent(tags -> verifiedQuestion.setTags(tags));
        verifiedQuestion.setLastModifiedAt(LocalDateTime.now());

        return questionRepository.save(verifiedQuestion);
    }

    public void deleteQuestion(long questionId){
        Question question = verifiedQuestion(questionId);
        questionRepository.delete(question);
    }

    public void deleteQuestions(){
        questionRepository.deleteAll();
    }

    public Question verifiedQuestion(long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }
}
