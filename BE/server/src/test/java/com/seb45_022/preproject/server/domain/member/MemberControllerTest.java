package com.seb45_022.preproject.server.domain.member;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.member.dto.MemberPatchDto;
import com.seb45_022.preproject.server.domain.member.dto.MemberPostDto;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.mapper.MemberMapper;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.entity.Question;
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

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @Autowired
    private MemberMapper mapper;

    private static CustomAuthorityUtils customAuthorityUtils;
    private static Member testMember;
    private static String memberUrl = "/members/";
    private static JwtTokenizer jwtTokenizer;
    private static String testJwt;

    @BeforeAll
    public static void createTestMember() {
        customAuthorityUtils = new CustomAuthorityUtils();

        testMember = new Member();
        testMember.setMemberId(999L);
        testMember.setEmail("test@test.com");
        testMember.setPassword("testPassword1234");
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

    @BeforeEach
    public void createAuthenrication(){
        Collection<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(testMember.getRoles());
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                new TokenPrincipalDto(testMember.getMemberId(), testMember.getEmail()), null, authorities));
    }

    @Test
    void postMemberTest() throws Exception {
        MemberPostDto memberPostDto = new MemberPostDto();
        memberPostDto.setEmail(testMember.getEmail());
        memberPostDto.setPassword(testMember.getPassword());
        memberPostDto.setDisplayName(testMember.getDisplayName());

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setMemberId(testMember.getMemberId());

        given(memberService.createMember(Mockito.any(Member.class)))
                .willReturn(member);

        String content = gson.toJson(memberPostDto);

        ResultActions actions=
                mockMvc.perform(
                        post(memberUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated());

    }

    @Test
    void patchMemberTest() throws Exception  {
        MemberPatchDto memberPatchDto = new MemberPatchDto(
                testMember.getMemberId(),"PatchDisplayName","PatchPassword1234");

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);

        given(memberService.updateMember(Mockito.any(Member.class)))
                .willReturn(member);

        String content = gson.toJson(memberPatchDto);
        String patchUrl = memberUrl + memberPatchDto.getMemberId();

        ResultActions actions=
                mockMvc.perform(
                        patch(patchUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk());
    }

    @Test
    void getMemberTest() throws Exception  {
        given(memberService.findMember(Mockito.any(Long.class)))
                .willReturn(testMember);

        String getUrl = memberUrl + "user";

        ResultActions actions=
                mockMvc.perform(
                        get(getUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + testJwt)
                );

        actions
                .andExpect(status().isOk());
    }

    @Test
    void deleteMemberTest() throws Exception  {
        String deleteUrl = memberUrl + testMember.getMemberId();

        ResultActions actions=
                mockMvc.perform(
                        delete(deleteUrl)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .header("Authorization", "Bearer " + testJwt)
                );

        actions
                .andExpect(status().isOk());
    }
}