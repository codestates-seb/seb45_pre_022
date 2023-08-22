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
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService) {

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

    public Page<Question> findQuestions(int page, int size, String searchTitle,String searchTag){
        Page<Question> questions = null;

        if(searchTitle != null) {
            questions = questionRepository.findByTitleContaining(searchTitle,PageRequest.of(page - 1, size));
        } else if(searchTag != null) {
            questions = questionRepository.findByTagsContaining(searchTag,PageRequest.of(page - 1, size));
        } else {
            Sort sort = Sort.by(Sort.Direction.DESC, "questionId");
            PageRequest pageRequest = PageRequest.of(page - 1, size, sort);
            questions = questionRepository.findAll(pageRequest);
        }

        for (Question element :questions) {
            element.setAnswerCount(element.getAnswers().size());
        }
        return questions;
    }

    public HashMap<String, HashMap> findDistinctTags(){
        List<Question> questions = questionRepository.findAll();
        LocalDateTime currentDateTime = LocalDateTime.now();
        Duration oneDayHours = Duration.ofHours(24);
        Duration oneWeekHours = Duration.ofHours(168);

        HashMap<String, HashMap> tag = new HashMap<>();

        for (Question QuestionElement : questions) {
            LocalDateTime createdAt = QuestionElement.getCreatedAt();

            for (String tagElement : QuestionElement.getTags()) {
                HashMap<String, Integer> allTagCountHash = tag.getOrDefault(tagElement, new HashMap<>());

                int allTagcount = allTagCountHash.getOrDefault("allTagCount",0);
                int dailyTagCount = allTagCountHash.getOrDefault("dailyTagCount", 0);
                int weeklyTagCount = allTagCountHash.getOrDefault("weeklyTagCount", 0);

                allTagcount++;
                if (Duration.between(createdAt, currentDateTime).compareTo(oneDayHours) <= 0) dailyTagCount++;
                if (Duration.between(createdAt, currentDateTime).compareTo(oneWeekHours) <= 0) weeklyTagCount++;

                allTagCountHash.put("allTagCount",allTagcount);
                allTagCountHash.put("dailyTagCount", dailyTagCount);
                allTagCountHash.put("weeklyTagCount", weeklyTagCount);

                tag.put(tagElement, allTagCountHash);
            }
        }

        HashMap<String, HashMap> tags = new HashMap<>();
        tags.put("tags",tag);
        return tags;
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

    public void deleteQuestions(){
        questionRepository.deleteAll();
    }

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
