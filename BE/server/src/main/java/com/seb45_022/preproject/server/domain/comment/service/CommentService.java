package com.seb45_022.preproject.server.domain.comment.service;

import com.seb45_022.preproject.server.domain.comment.entity.Comment;
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

    public Comment createComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        comment.setLastModifiedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment foundComment = findVerifiedComment(comment.getCommentId());
        foundComment.setLastModifiedAt(LocalDateTime.now());
        return commentRepository.save(foundComment);
    }

    private Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new RuntimeException());
        return findComment;
    }
    public void deleteComment(long commentId) {
        Comment foundComment = findVerifiedComment(commentId);
        commentRepository.delete(foundComment);
    }


}
