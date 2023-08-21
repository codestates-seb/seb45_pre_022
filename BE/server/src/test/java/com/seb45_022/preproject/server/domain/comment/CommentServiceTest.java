package com.seb45_022.preproject.server.domain.comment;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.repository.CommentRepository;
import com.seb45_022.preproject.server.domain.comment.service.CommentService;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {
    @Mock
    private CommentRepository commentRepository;

    @Mock
    private AnswerService answerService;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private CommentService commentService;

    private static CustomAuthorityUtils customAuthorityUtils;
    private static Member testMember;
    private static Answer testAnswer;
    private static Comment testComment;

    @BeforeAll
    public static void createTestData() {
        // 테스트 멤버 생성
        customAuthorityUtils = new CustomAuthorityUtils();

        testMember = new Member();
        testMember.setMemberId(999L);
        testMember.setEmail("test@test.com");
        testMember.setPassword("test1234");
        testMember.setDisplayName("testMember");

        List<String> roles = customAuthorityUtils.createRoles(testMember.getEmail());
        testMember.setRoles(roles);

        // 테스트 답변 생성
        List<Comment> testComments = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        testAnswer = new Answer();
        testAnswer = Answer.builder()
                .answerId(1)
                .body("Test Answer Body")
                .createdAt(now)
                .lastModifiedAt(now)
                .member(testMember)
                .comments(testComments)
                .build();

        // 테스트 댓글 생성
        testComment = Comment.builder()
                .commentId(1)
                .body("Test Comment Body")
                .createdAt(now)
                .lastModifiedAt(now)
                .answer(testAnswer)
                .member(testMember)
                .build();

    }
    @Test
    @DisplayName("댓글 생성 메서드")
    public void createCommentTest() {
        when(commentRepository.save(Mockito.any(Comment.class))).thenReturn(testComment);
        when(answerService.findVerifiedAnswer(Mockito.anyLong())).thenReturn(testAnswer);
        when(memberService.findVerifiedMember(Mockito.anyLong())).thenReturn(testMember);

        Comment createdComment = commentService.createComment(testComment);

        assertNotNull(createdComment);
        assertEquals(testComment.getCommentId(), createdComment.getCommentId());
        assertEquals(testComment.getBody(), createdComment.getBody());
        assertEquals(testComment.getCreatedAt(), createdComment.getCreatedAt());
        assertEquals(testComment.getLastModifiedAt(), createdComment.getLastModifiedAt());

    }
    @Test
    @DisplayName("댓글 수정 메서드")
    void updateCommentTest() {
        when(commentRepository.save(Mockito.any(Comment.class))).thenReturn(testComment);
        when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testComment));

        Comment updateComment = commentService.updateComment(testComment);

        assertNotNull(updateComment);
        assertEquals(testComment.getCommentId(), updateComment.getCommentId());
        assertEquals(testComment.getBody(), updateComment.getBody());
        assertEquals(testComment.getCreatedAt(), updateComment.getCreatedAt());
        assertEquals(testComment.getLastModifiedAt(), updateComment.getLastModifiedAt());

    }
    @Test
    @DisplayName("댓글 삭제 메서드")
    void deleteCommentTest() {
        when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testComment));

        commentService.deleteComment(testComment.getCommentId(), testComment.getMember().getMemberId());

        assertDoesNotThrow(() -> commentService.deleteComment(testComment.getCommentId(), testComment.getMember().getMemberId()));
    }
}

