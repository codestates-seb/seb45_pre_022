package com.seb45_022.preproject.server.domain.member;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.member.dto.MemberPatchDto;
import com.seb45_022.preproject.server.domain.member.dto.MemberPostDto;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.mapper.MemberMapper;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                );

        actions
                .andExpect(status().isOk());
    }
}