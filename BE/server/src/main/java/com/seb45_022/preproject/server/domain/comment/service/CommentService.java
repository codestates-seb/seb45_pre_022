package com.seb45_022.preproject.server.domain.comment.service;

import com.seb45_022.preproject.server.domain.comment.entity.CommentEntity;
import com.seb45_022.preproject.server.domain.comment.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public CommentEntity createComment(CommentEntity comment) {
        comment.setCreatedAt(LocalDateTime.now());
        comment.setLastModifiedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public CommentEntity updateComment(CommentEntity comment) {
        CommentEntity foundComment = findVerifiedComment(comment.getCommentId());
        foundComment.setLastModifiedAt(LocalDateTime.now());
        return commentRepository.save(foundComment);
    }

    private CommentEntity findVerifiedComment(long commentId) {
        Optional<CommentEntity> optionalComment =
                commentRepository.findById(commentId);
        CommentEntity findComment =
                optionalComment.orElseThrow(() ->
                        new RuntimeException());
        return findComment;
    }
    public void deleteComment(long commentId) {
        CommentEntity foundComment = findVerifiedComment(commentId);
        commentRepository.delete(foundComment);
    }


}
