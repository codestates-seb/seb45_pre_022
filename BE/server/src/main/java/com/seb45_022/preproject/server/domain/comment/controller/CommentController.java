package com.seb45_022.preproject.server.domain.comment.controller;

import com.seb45_022.preproject.server.domain.comment.dto.CommentDto;
import com.seb45_022.preproject.server.domain.comment.entity.CommentEntity;
import com.seb45_022.preproject.server.domain.comment.mapper.CommentMapper;
import com.seb45_022.preproject.server.domain.comment.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/comments")
@Validated
@Slf4j
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 댓글 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody) {
        CommentEntity createComment = commentService.createComment(mapper.commentPostDtoToComment(requestBody));
        CommentDto.Response response = mapper.commentToResponseDto(createComment);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                      @Valid @RequestBody CommentDto.Patch requestBody) {
        requestBody.setCommentId(commentId);
        CommentEntity comment = mapper.commentPatchDtoToComment(requestBody);
        CommentDto.Response response = mapper.commentToResponseDto(commentService.updateComment(comment));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id")@Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
