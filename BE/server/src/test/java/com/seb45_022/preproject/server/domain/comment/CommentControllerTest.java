package com.seb45_022.preproject.server.domain.comment;


import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.answer.service.AnswerService;
import com.seb45_022.preproject.server.domain.comment.dto.CommentPostDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.comment.service.CommentService;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @Autowired
    private Gson gson;

    private String jwt;
    private JwtTokenizer jwtTokenizer;
    private CustomAuthorityUtils customAuthorityUtils;

    @BeforeEach
    public void setupJwt() {
        // JWT 토큰 생성 및 설정
        customAuthorityUtils = new CustomAuthorityUtils();
        jwtTokenizer = new JwtTokenizer();

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", "user");
        claims.put("roles", Collections.singletonList("ROLE_USER"));
        claims.put("displayName", "User");
        claims.put("id", 1);

        String subject = "email@email.com";
        Date expiration = new Date(System.currentTimeMillis() + 3600000); // 1 hour expiration
        String base64EncodedSecretKey = this.jwtTokenizer.base64EncodedSecretKey("JWTSECRET123123123JWTSECRETJWTSECRET123123");
        this.jwt = this.jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    @Test
    public void postCommentTest() throws Exception {
        // Given
        CommentPostDto commentPostDto = new CommentPostDto(1,1,"댓글 내용");
        String content = gson.toJson(commentPostDto);
        Comment comment = new Comment();

        when(commentService.createComment(any(Comment.class))).thenReturn(comment);

        // When
        URI uri = UriComponentsBuilder.newInstance().path("/comments").build().toUri();


        // Then
    }
}

