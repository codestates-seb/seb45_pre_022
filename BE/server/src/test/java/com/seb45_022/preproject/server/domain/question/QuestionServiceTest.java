package com.seb45_022.preproject.server.domain.question;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.repository.QuestionRepository;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;


@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {
    @Mock
    private QuestionRepository repository;

    @InjectMocks
    private QuestionService questionService;

    @Mock
    private MemberService memberService;

    private static String testJwt;
    private static JwtTokenizer jwtTokenizer;
    private static CustomAuthorityUtils customAuthorityUtils;
    private static Member testMember;
    private static List<Question> testQuestions;
    private static Question testQuestion1;
    private static Question testQuestion2;
    private static Question testQuestion3;
    private static String questionUrl = "/questions/";

    @BeforeAll
    public static void createTestMember() {
        customAuthorityUtils = new CustomAuthorityUtils();

        testMember = new Member();
        testMember.setMemberId(999L);
        testMember.setEmail("test@test.com");
        testMember.setPassword("testPassword");
        testMember.setDisplayName("testMember");

        List<String> roles = customAuthorityUtils.createRoles(testMember.getEmail());
        testMember.setRoles(roles);
    }

    @BeforeAll
    public static void createTestQuestion() {
        List<Answer> testAnswers = new ArrayList<>();
        List<String> testTags = Arrays.asList("test", "tag");
        LocalDateTime now = LocalDateTime.now();

        testQuestions = IntStream.rangeClosed(1, 3)
                .mapToObj(i -> Question.builder()
                        .questionId(i)
                        .title("Test Title")
                        .body("Test Body")
                        .tags(testTags)
                        .createdAt(now)
                        .lastModifiedAt(now)
                        .answerCount(1)
                        .views(1)
                        .member(testMember)
                        .answers(testAnswers)
                        .build())
                .collect(Collectors.toList());

        testQuestion1 = testQuestions.get(0);
        testQuestion2 = testQuestions.get(1);
        testQuestion3 = testQuestions.get(2);
    }

    @Test
    void createQuestionTest() {
        given(repository.save(Mockito.any(Question.class))).willReturn(testQuestion1);
        given(memberService.findVerifiedMember(Mockito.anyLong())).willReturn(testMember);
        testQuestion1.setMember(testMember);

        Question question = questionService.createQuestion(testQuestion1);

        assertDoesNotThrow(() -> questionService.createQuestion(testQuestion1));
        assertEquals(testQuestion1.getQuestionId(), question.getQuestionId());
        assertEquals(testQuestion1.getTitle(), question.getTitle());
        assertEquals(testQuestion1.getBody(), question.getBody());
        assertEquals(testQuestion1.getTags(), question.getTags());
    }

    @Test
    void findQuestionTest() {
        given(repository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testQuestion1));

        Question question = questionService.findQuestion(testQuestion1.getQuestionId());

        assertDoesNotThrow(() -> questionService.findQuestion(testQuestion1.getQuestionId()));
        assertEquals(testQuestion1.getQuestionId(), question.getQuestionId());
        assertEquals(testQuestion1.getTitle(), question.getTitle());
        assertEquals(testQuestion1.getBody(), question.getBody());
        assertEquals(testQuestion1.getTags(), question.getTags());
    }

    @Test
    void findQuestionsTest() {
    }

    @Test
    void updateQuestionTest() {
    }

    @Test
    void deleteQuestionTest() {
    }
}