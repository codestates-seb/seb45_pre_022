package com.seb45_022.preproject.server.domain.question.service;

import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.repository.QuestionRepository;
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

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){

        question.setCreatedAt(LocalDateTime.now());
        question.setLastModifiedAt(LocalDateTime.now());
        questionRepository.save(question);

        return question;
    }

    public Question findQuestion(long questionId){
        return verifiedQuestion(questionId);
    }

    public Page<Question> findQuestions(int page, int size){
        Page<Question> questions = questionRepository.findAll(PageRequest.of(page-1,size));

        return questions;
    }

    public Question updateQuestion(Question question) {
        Question verifiedQuestion = verifiedQuestion(question.getId());

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
        Question question = optionalQuestion.orElseThrow(() -> new RuntimeException());

        return question;
    }
}
