package com.seb45_022.preproject.server.domain.question.controller;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.question.dto.*;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.mapper.QuestionMapper;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.security.utils.JwtUtils;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

//@CrossOrigin
@Validated
@Slf4j
@RestController
@RequestMapping("/questions")
@Api(tags = {"질문 CRUD API"})
public class QuestionController {
    private final QuestionMapper mapper;
    private final QuestionService service;
    private final JwtUtils jwtUtils;

    public QuestionController(QuestionMapper mapper, QuestionService service, JwtUtils jwtUtils) {
        this.mapper = mapper;
        this.service = service;
        this.jwtUtils = jwtUtils;
    }

    @ApiOperation(value = "질문을 등록하는 메서드", notes = "<b style=\"font-size: 18px;\"> JWT(필수) </b>  JWT(필수) 질문 제목, 질문 내용, 질문 태그(선택)을 사용해서 질문을 생성한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created", response = QuestionResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error")
    })
    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionPostDto questionPostDto, HttpServletRequest request){
        questionPostDto.setMemberId(jwtUtils.getMemberId(jwtUtils.getClaims(request)));

        Question question = mapper.QuestionPostDtoToQuestion(questionPostDto);

        service.createQuestion(question);

        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(question);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @ApiOperation(value = "하나의 질문을 조회하는 메서드", notes = "한개의 질문과, 질문에 달린 답변들, 답변에달린 댓글들을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = QuestionDetailsResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/{question_id}")
    public ResponseEntity getQuestion(@PathVariable("question_id") @Positive long questionId, HttpServletRequest request){
        Question question = service.findQuestion(questionId);
        QuestionDetailsResponseDto response = mapper.QuestionToQuestionDetailsResponseDto(question);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "메인페이지에서 질문을 조회하거나 검색하는 메서드", notes = "page와 한페이지에 표시할 질문의 갯수, 검색할 제목(선택)을 param으로 여러개의 질문을 조회하는 메서드")
    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "page", value = "조회 페이지", required = true, dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "한 페이지에 조회하는 글의 갯수", required = true, dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "search", value = "검색 키워드", required = false, dataType = "String", paramType = "query")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = QuestionMultiResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam("page") @Positive int page,
                                       @RequestParam("size") @Positive int size,
                                       @RequestParam(value = "search",required = false) String searchKeyword){

        Page<Question> questionsPage = service.findQuestions(page, size, searchKeyword);
        QuestionPageInfo pageInfo = new QuestionPageInfo(page, size, (int) questionsPage.getTotalElements(),questionsPage.getTotalPages());

        List<Question> questions = questionsPage.getContent();
        List<QuestionResponseDto> response =
                questions.stream()
                        .map(question -> mapper.QuestionToQuestionResponseDto(question))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new QuestionMultiResponseDto(response, pageInfo),HttpStatus.OK);
    }

    @ApiOperation(value = "하나의 질문을 수정하는 메서드", notes = "<b style=\"font-size: 18px;\"> JWT(필수) </b>  질문 제목, 질문 내용, 질문 태그를 수정하는 메서드")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = QuestionResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PatchMapping("/{question_id}")
    public ResponseEntity patchQuestion(@PathVariable("question_id") @Positive long questionId,
                                        @RequestBody QuestionPatchDto questionPatchDto, HttpServletRequest request){
        questionPatchDto.setMemberId(jwtUtils.getMemberId(jwtUtils.getClaims(request)));
        questionPatchDto.setQuestionId(questionId);

        Question question = mapper.QuestionPatchtDtoToQuestion(questionPatchDto);
        Question updatedQuestion = service.updateQuestion(question);
        QuestionResponseDto response = mapper.QuestionToQuestionResponseDto(updatedQuestion);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "하나의 질문을 삭제하는 메서드", notes = "<b style=\"font-size: 18px;\"> JWT(필수) </b> 게시글을 삭제하는 메서드")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @ApiResponses({
            @ApiResponse(code = 204, message = "NO CONTENT"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @DeleteMapping("/{question_id}")
    public HttpStatus deleteQuestion(@PathVariable("question_id") @Positive long questionId, HttpServletRequest request){

        long memberId = jwtUtils.getMemberId(jwtUtils.getClaims(request));
        service.deleteQuestion(questionId, memberId);

        return HttpStatus.NO_CONTENT;

    }

//    @ApiOperation(value = "모든 질문을 삭제하는 메서드", notes = "모든 질문을 삭제하는 메서드")
//    @ApiResponses({
//            @ApiResponse(code = 204, message = "NO CONTENT"),
//            @ApiResponse(code = 500, message = "Internal Sever Error"),
//            @ApiResponse(code = 404, message = "Not Found"),
//    })
//    @ResponseStatus(value = HttpStatus.NO_CONTENT)
//    @DeleteMapping
//    public HttpStatus deleteQuestions(){
//        service.deleteQuestions();
//        return HttpStatus.NO_CONTENT;
//    }
}