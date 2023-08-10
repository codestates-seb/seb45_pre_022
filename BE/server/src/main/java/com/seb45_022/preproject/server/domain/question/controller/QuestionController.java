package com.seb45_022.preproject.server.domain.question.controller;

import com.seb45_022.preproject.server.domain.question.dto.QuestionPatchDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPostDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.mapper.QuestionMapper;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.dto.AllDataDto;
import com.seb45_022.preproject.server.global.dto.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionMapper mapper;
    private final QuestionService service;

    public QuestionController(QuestionMapper mapper, QuestionService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionPostDto questionPostDto){
        Question question = mapper.QuestionPostDtoToQuestion(questionPostDto);
        service.createQuestion(question);

        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(question);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{question_id}")
    public ResponseEntity getQuestion(@PathVariable("question_id") @Positive long questionId){
        Question question = service.findQuestion(questionId);

        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(question);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam("page") int page,
                                       @RequestParam("size") int size){

        Page<Question> questionsPage = service.findQuestions(page, size);
        PageInfo pageInfo = new PageInfo(page, size, (int) questionsPage.getTotalElements(),questionsPage.getTotalPages());

        List<Question> questions = questionsPage.getContent();
        List<QuestionResponseDto> response =
                        questions.stream()
                        .map(question -> mapper.QuestionToQuestionResponseDto(question))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new AllDataDto(response, pageInfo),HttpStatus.OK);
    }

    @PatchMapping("/{question_id}")
    public ResponseEntity patchQuestion(@PathVariable("question_id") @Positive long questionId,
                                        @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.setId(questionId);
        Question question = mapper.QuestionPatchtDtoToQuestion(questionPatchDto);
        Question updatedQuestion = service.updateQuestion(question);
        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(updatedQuestion);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{question_id}")
    public void deleteQuestion(@PathVariable("question_id") @Positive long questionId){
        service.deleteQuestion(questionId);
    }

    @DeleteMapping
    public void deleteQuestions(){
        service.deleteQuestions();
    }
}
