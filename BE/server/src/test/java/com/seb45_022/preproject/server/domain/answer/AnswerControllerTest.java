package com.seb45_022.preproject.server.domain.answer;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.answer.dto.AnswerPatchDto;
import com.seb45_022.preproject.server.domain.answer.dto.AnswerPostDto;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.mapper.AnswerMapper;
import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.global.dto.TokenPrincipalDto;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnswerService service;

    @Autowired
    private AnswerMapper mapper;

    @Autowired
    private Gson gson;

    private static Member testMember;
    private static String testJwt;
    private static JwtTokenizer jwtTokenizer;
    private static CustomAuthorityUtils customAuthorityUtils;

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
    public static void setupJwt() {
        // JWT 토큰 생성 및 설정
        customAuthorityUtils = new CustomAuthorityUtils();
        jwtTokenizer = new JwtTokenizer();

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", "user");
        claims.put("roles", Collections.singletonList("USER"));
        claims.put("displayName", "User");
        claims.put("id", 1);

        String subject = "email@email.com";
        Date expiration = new Date(System.currentTimeMillis() + 3600000); // 1 hour expiration
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey("JWTSECRET123123123JWTSECRETJWTSECRET123123");
        testJwt = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    @BeforeAll
    public static void createTestAnswer() {
        List<Comment> testComments = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        Answer.builder()
                .answerId(1)
                .body("Test Answer Body")
                .createdAt(now)
                .lastModifiedAt(now)
                .member(testMember)
                .comments(testComments)
                .build();
    }

    @BeforeEach
    public void createAuthorities() {
        Collection<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(testMember.getRoles());
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()),null,authorities));
    }
    @Test
    public void postAnswerTest() throws Exception {
        // Given
        AnswerPostDto answerPostDto = new AnswerPostDto(1, 1, "답변 내용");
        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);

        given(service.createAnswer(Mockito.any(Answer.class))).willReturn(answer);

        String content = gson.toJson(answerPostDto);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/answers").build().toUri();

        ResultActions actions = mockMvc.perform(
                post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
                        .content(content)
        );

        // Then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.answerId").value(answer.getAnswerId()))
                .andExpect(jsonPath("$.memberId").value(answer.getMember().getMemberId()))
                .andExpect(jsonPath("$.displayName").value(answer.getMember().getDisplayName()))
                .andExpect(jsonPath("$.body").value(answer.getBody()))
                .andExpect(jsonPath("$.createdAt").value(answer.getCreatedAt()))
                .andExpect(jsonPath("$.lastModifiedAt").value(answer.getLastModifiedAt()))
                .andExpect(jsonPath("$.comments").value(answer.getComments()));
    }

    @Test
    public void patchAnswerTest() throws Exception {
        // Given
        AnswerPatchDto answerPatchDto = new AnswerPatchDto(1, 1, "수정할 답변 내용");
        Answer answer = mapper.answerPatchDtoToAnswer(answerPatchDto);

        given(service.updateAnswer(Mockito.any(Answer.class))).willReturn(answer);

        String content = gson.toJson(answerPatchDto);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/answers/{answer-id}")
                .buildAndExpand(1).toUri();

        ResultActions actions = mockMvc.perform(
                patch(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
                        .content(content)
        );

        // Then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.answerId").value(answer.getAnswerId()))
                .andExpect(jsonPath("$.memberId").value(answer.getMember().getMemberId()))
                .andExpect(jsonPath("$.displayName").value(answer.getMember().getDisplayName()))
                .andExpect(jsonPath("$.body").value(answer.getBody()))
                .andExpect(jsonPath("$.createdAt").value(answer.getCreatedAt()))
                .andExpect(jsonPath("$.lastModifiedAt").value(answer.getLastModifiedAt()))
                .andExpect(jsonPath("$.comments").value(answer.getComments()));
    }

    @Test
    public void deleteAnswer() throws Exception {
        // Given
        Answer answer = new Answer();
        answer.setAnswerId(1L);

        when(service.createAnswer(any(Answer.class))).thenReturn(answer);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/answers/{answer-id}").buildAndExpand(answer.getAnswerId()).toUri();

        ResultActions actions = mockMvc.perform(
                delete(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
        );

        // Then
        actions.andExpect(status().isNoContent());
    }
}
