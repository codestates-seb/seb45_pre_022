package com.seb45_022.preproject.server.domain.comment.service;

import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.repository.CommentRepository;
import com.seb45_022.preproject.server.domain.member.repository.MemberRepository;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final AnswerService answerService;
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository,
                          AnswerService answerService,
                          MemberService memberService) {
        this.commentRepository = commentRepository;
        this.answerService = answerService;
        this.memberService = memberService;
    }

    public Comment createComment(Comment comment) {
        answerService.findVerifiedAnswer(comment.getAnswer().getAnswerId());
        comment.setMember(memberService.findVerifiedMember(comment.getMember().getMemberId()));
        comment.setCreatedAt(LocalDateTime.now());
        comment.setLastModifiedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment foundComment = findVerifiedComment(comment.getCommentId());

        verifiedCommentOwner(comment.getMember().getMemberId(), foundComment);

        foundComment.setLastModifiedAt(LocalDateTime.now());
        foundComment.setBody(comment.getBody());
        return commentRepository.save(foundComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
    public void deleteComment(long commentId, long memberId) {
        Comment foundComment = findVerifiedComment(commentId);
        verifiedCommentOwner(memberId, foundComment);
        commentRepository.delete(foundComment);
    }

    private void verifiedCommentOwner(long memberId, Comment foundComment) {
        if (memberId != foundComment.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_MEMBER);
        }
    }


}
