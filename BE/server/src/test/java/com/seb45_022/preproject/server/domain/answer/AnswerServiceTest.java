package com.seb45_022.preproject.server.domain.answer;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.repository.AnswerRepository;
import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AnswerServiceTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionService questionService;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private AnswerService answerService;

    private static CustomAuthorityUtils customAuthorityUtils;
    private static Member testMember;
    private static Question testQuestion;
    private static Answer testAnswer;

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


        List<Answer> testAnswers = new ArrayList<>();
        List<String> testTags = Arrays.asList("test", "tag");
        LocalDateTime now = LocalDateTime.now();

        testQuestion = Question.builder()
                .questionId(1)
                .title("Test Title")
                .body("Test Body")
                .tags(testTags)
                .createdAt(now)
                .lastModifiedAt(now)
                .answerCount(1)
                .views(1)
                .member(testMember)
                .answers(testAnswers)
                .build();

        // 테스트 답변 생성
        List<Comment> testComments = new ArrayList<>();

        testAnswer = new Answer();
        testAnswer = Answer.builder()
                .answerId(1)
                .body("Test Answer Body")
                .createdAt(now)
                .lastModifiedAt(now)
                .member(testMember)
                .question(testQuestion)
                .comments(testComments)
                .build();
    }

    @Test
    @DisplayName("답변 생성 메서드")
    public void createAnswerTest() {
        when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(testAnswer);
        when(questionService.verifiedQuestion(Mockito.anyLong())).thenReturn(testQuestion);
        when(memberService.findVerifiedMember(Mockito.anyLong())).thenReturn(testMember);

        Answer createdAnswer = answerService.createAnswer(testAnswer);

        assertNotNull(createdAnswer);
        assertEquals(testAnswer.getAnswerId(), createdAnswer.getAnswerId());
        assertEquals(testAnswer.getBody(), createdAnswer.getBody());
        assertEquals(testAnswer.getCreatedAt(), createdAnswer.getCreatedAt());
        assertEquals(testAnswer.getLastModifiedAt(), createdAnswer.getLastModifiedAt());
    }

    @Test
    @DisplayName("답변 수정 메서드")
    void updateAnswerTest() {
        when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(testAnswer);
        when(answerRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testAnswer));

        Answer updatedAnswer = answerService.updateAnswer(testAnswer);

        assertNotNull(updatedAnswer);
        assertEquals(testAnswer.getAnswerId(), updatedAnswer.getAnswerId());
        assertEquals(testAnswer.getBody(), updatedAnswer.getBody());
        assertEquals(testAnswer.getCreatedAt(), updatedAnswer.getCreatedAt());
        assertEquals(testAnswer.getLastModifiedAt(), updatedAnswer.getLastModifiedAt());
    }

    @Test
    @DisplayName("답변 삭제 메서드")
    void deleteAnswerTest() {
        when(answerRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(testAnswer));

        answerService.deleteAnswer(testAnswer.getAnswerId(), testAnswer.getMember().getMemberId());

        assertDoesNotThrow(() -> answerService.deleteAnswer(testAnswer.getAnswerId(), testAnswer.getMember().getMemberId()));
    }
}


