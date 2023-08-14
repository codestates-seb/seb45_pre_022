package com.seb45_022.preproject.server.domain.comment.controller;

import com.seb45_022.preproject.server.domain.comment.dto.CommentPatchDto;
import com.seb45_022.preproject.server.domain.comment.dto.CommentPostDto;
import com.seb45_022.preproject.server.domain.comment.dto.CommentResponseDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.mapper.CommentMapper;
import com.seb45_022.preproject.server.domain.comment.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@RequestMapping("/comments")
@Validated
@Slf4j
@Api(tags = {"댓글 CRUD API"})
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 댓글 등록
    @ApiOperation(value = "댓글을 등록하는 메서드", notes = "answerId, memberId, body를 사용해서 질문을 생성한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created", response = CommentResponseDto.class)
    })
    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto requestBody) {
        Comment createComment = commentService.createComment(mapper.commentPostDtoToComment(requestBody));
        CommentResponseDto response = mapper.commentToResponseDto(createComment);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 댓글 수정
    @ApiOperation(value = "하나의 댓글을 수정하는 메서드", notes = "commentId, body를 이용해 댓글을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = CommentResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                      @Valid @RequestBody CommentPatchDto requestBody) {
        requestBody.setCommentId(commentId);
        Comment comment = mapper.commentPatchDtoToComment(requestBody);
        CommentResponseDto response = mapper.commentToResponseDto(commentService.updateComment(comment));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 댓글 삭제
    @ApiOperation(value = "하나의 댓글을 삭제하는 메서드", notes = "commentId를 이용해 댓글을 삭제한다")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @ApiResponses({
            @ApiResponse(code = 204, message = "NO CONTENT"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id")@Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
