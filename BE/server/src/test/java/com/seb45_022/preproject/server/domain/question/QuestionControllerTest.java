package com.seb45_022.preproject.server.domain.question;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPatchDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPostDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.mapper.QuestionMapper;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.dto.TokenPrincipalDto;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private QuestionService questionService;

    @Autowired
    private QuestionMapper mapper;

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
    public static void createTestJwt() {
        jwtTokenizer = new JwtTokenizer();

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", testMember.getEmail());
        claims.put("roles", testMember.getRoles());
        claims.put("displayName", testMember.getDisplayName());
        claims.put("id", testMember.getMemberId());

        String subject = testMember.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey("TESTJWTSECRETKEY1234qwerasdfzxcv");
        testJwt = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
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
    void postQuestionTest() throws Exception {
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()), null));

        List<String> testTags = Arrays.asList("test", "tag");
        QuestionPostDto postDto = new QuestionPostDto("Test Title", "Test Body", testTags);

        Question question = mapper.QuestionPostDtoToQuestion(postDto);

        given(questionService.createQuestion(Mockito.any(Question.class)))
                .willReturn(question);

        String content = gson.toJson(postDto);

        ResultActions actions=
                mockMvc.perform(
                        post(questionUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + testJwt)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.questionId").value(question.getQuestionId()))
                .andExpect(jsonPath("$.title").value(question.getTitle()))
                .andExpect(jsonPath("$.body").value(question.getBody()))
                .andExpect(jsonPath("$.tags").value(question.getTags()));
    }

    @Test
    void getQuestionTest() throws Exception {
        given(questionService.findQuestion(Mockito.any(Long.class)))
                .willReturn(testQuestion1);

        String getUrl = questionUrl + testQuestion1.getQuestionId();

        ResultActions actions=
                mockMvc.perform(
                        get(getUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                );
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(testQuestion1.getQuestionId()));
    }

    @Test
    void getQuestionsTest() throws Exception {
        Page<Question> mockQuestionPage = new PageImpl<>(Arrays.asList(testQuestion1,testQuestion2,testQuestion3));

        given(questionService.findQuestions(anyInt(), anyInt(), anyString(), anyString())).willReturn(mockQuestionPage);

        ResultActions actions = mockMvc.perform(get("/questions")
                .param("page", "1")
                .param("size", "10")
                .param("searchTitle", "Test")
                .param("searchTag", "test")
                .accept(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questions[0].questionId").value(testQuestion1.getQuestionId()))
                .andExpect(jsonPath("$.questions[1].questionId").value(testQuestion2.getQuestionId()))
                .andExpect(jsonPath("$.questions[2].questionId").value(testQuestion3.getQuestionId()));
    }

    @Test
    void patchQuestionTest() throws Exception  {
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()), null));

        List<String> testTags = Arrays.asList("test", "patch", "tag");
        QuestionPatchDto patchDto = QuestionPatchDto.builder()
                .questionId(testQuestion1.getQuestionId())
                .title("Test Patch Title")
                .memberId(testMember.getMemberId())
                .body("Test Patch Body")
                .tags(testTags)
                .build();

        Question question = mapper.QuestionPatchtDtoToQuestion(patchDto);

        given(questionService.updateQuestion(Mockito.any(Question.class)))
                .willReturn(question);

        String content = gson.toJson(patchDto);
        String patchUrl = questionUrl + patchDto.getQuestionId();

        ResultActions actions=
                mockMvc.perform(
                        patch(patchUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + testJwt)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(question.getQuestionId()))
                .andExpect(jsonPath("$.title").value(question.getTitle()))
                .andExpect(jsonPath("$.memberId").value(question.getMember().getMemberId()))
                .andExpect(jsonPath("$.body").value(question.getBody()))
                .andExpect(jsonPath("$.tags").value(question.getTags()));
    }

    @Test
    void deleteQuestionTest() throws Exception  {
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()), null));

        String deleteUrl = questionUrl + testQuestion1.getQuestionId();

        ResultActions actions=
                mockMvc.perform(
                        delete(deleteUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + testJwt)
                );

        actions
                .andExpect(status().isNoContent());
    }
}