package com.seb45_022.preproject.server.domain.comment;


import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.comment.dto.CommentPatchDto;
import com.seb45_022.preproject.server.domain.comment.dto.CommentPostDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.mapper.CommentMapper;
import com.seb45_022.preproject.server.domain.comment.service.CommentService;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.global.dto.TokenPrincipalDto;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
public class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService service;

    @Autowired
    private CommentMapper mapper;

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
        LocalDateTime now = LocalDateTime.now();

        Comment.builder()
                .commentId(1)
                .body("Test Comment Body")
                .createdAt(now)
                .lastModifiedAt(now)
                .member(testMember)
                .build();
    }

    @BeforeEach
    public void createAuthorities() {
        Collection<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(testMember.getRoles());
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()),null,authorities));
    }

    @Test
    public void postCommentTest() throws Exception {
        // Given
        CommentPostDto commentPostDto = new CommentPostDto(1,1,"댓글 내용");
        Comment comment = mapper.commentPostDtoToComment(commentPostDto);

        given(service.createComment(any(Comment.class))).willReturn(comment);

        String content = gson.toJson(commentPostDto);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/comments").build().toUri();

        ResultActions actions = mockMvc.perform(
                post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
                        .content(content)
        );

        // Then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.commentId").value(comment.getCommentId()))
                .andExpect(jsonPath("$.memberId").value(comment.getMember().getMemberId()))
                .andExpect(jsonPath("$.displayName").value(comment.getMember().getDisplayName()))
                .andExpect(jsonPath("$.body").value(comment.getBody()))
                .andExpect(jsonPath("$.createdAt").value(comment.getCreatedAt()))
                .andExpect(jsonPath("$.lastModifiedAt").value(comment.getLastModifiedAt()));
    }

    @Test
    public void patchCommentTest() throws Exception {
        // Given
        CommentPatchDto commentPatchDto = new CommentPatchDto(1,"수정할 댓글 내용", 1L);
        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);

        given(service.updateComment(any(Comment.class))).willReturn(comment);

        String content = gson.toJson(commentPatchDto);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/comments/{comment-id}")
                .buildAndExpand(1).toUri();

        ResultActions actions = mockMvc.perform(
                patch(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
                        .content(content)
        );

        // Then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.commentId").value(comment.getCommentId()))
                .andExpect(jsonPath("$.memberId").value(comment.getMember().getMemberId()))
                .andExpect(jsonPath("$.displayName").value(comment.getMember().getDisplayName()))
                .andExpect(jsonPath("$.body").value(comment.getBody()))
                .andExpect(jsonPath("$.createdAt").value(comment.getCreatedAt()))
                .andExpect(jsonPath("$.lastModifiedAt").value(comment.getLastModifiedAt()));
    }

    @Test
    public void deleteComment() throws Exception {
        // Given
        Comment comment = new Comment();
        comment.setCommentId(1L);

        when(service.createComment(any(Comment.class))).thenReturn(comment);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/comments/{comment-id}").buildAndExpand(comment.getCommentId()).toUri();
        ResultActions actions = mockMvc.perform(
                delete(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + testJwt)
        );

        // Then
        actions.andExpect(status().isNoContent());
    }
}

