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
import org.springframework.data.domain.PageImpl;
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
        question.setAnswerCount(0);
        question.setViews(0);

        questionRepository.save(question);

        return question;
    }

    public Question findQuestion(long questionId){
        Question question = verifiedQuestion(questionId);

        question.setViews(question.getViews()+1);
        question.setAnswerCount(question.getAnswers().size());
        questionRepository.save(question);
        return question;
    }

    public Page<Question> findQuestions(int page, int size, String searchKeyword){
        Page<Question> questions = null;

        if(searchKeyword == null) {
            questions = questionRepository.findAll(PageRequest.of(page - 1, size));
        }else {
            questions = questionRepository.findByTitleContaining(searchKeyword,PageRequest.of(page - 1, size));
        }

        for (Question element :questions) {
            element.setAnswerCount(element.getAnswers().size());
        }
        return questions;
    }

    public Question updateQuestion(Question question) {
        Question verifiedQuestion = verifiedQuestion(question.getQuestionId());

        verifiedQuestionOwner(question.getMember().getMemberId(), verifiedQuestion);

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> verifiedQuestion.setTitle(title));
        Optional.ofNullable(question.getBody())
                .ifPresent(body -> verifiedQuestion.setBody(body));
        Optional.ofNullable(question.getTags())
                .ifPresent(tags -> verifiedQuestion.setTags(tags));
        verifiedQuestion.setLastModifiedAt(LocalDateTime.now());

        return questionRepository.save(verifiedQuestion);
    }

    public void deleteQuestion(long questionId, long memberId){
        Question verifiedQuestion = verifiedQuestion(questionId);
        verifiedQuestionOwner(memberId, verifiedQuestion);

        questionRepository.delete(verifiedQuestion);
    }

//    public void deleteQuestions(){
//        questionRepository.deleteAll();
//    }

    public Question verifiedQuestion(long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    public void verifiedQuestionOwner(long memberId, Question verifiedQuestion){
        if (memberId != verifiedQuestion.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }
}
