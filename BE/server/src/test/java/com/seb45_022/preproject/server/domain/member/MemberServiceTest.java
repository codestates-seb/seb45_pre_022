package com.seb45_022.preproject.server.domain.member;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.repository.MemberRepository;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import com.seb45_022.preproject.server.domain.question.repository.QuestionRepository;
import com.seb45_022.preproject.server.domain.question.service.QuestionService;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
    @Mock
    private MemberRepository repository;

    @InjectMocks
    private MemberService memberService;

    private static CustomAuthorityUtils customAuthorityUtils;
    private static Member testMember;
    private static PasswordEncoder passwordEncoder;

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
    public static void init(){
        customAuthorityUtils = Mockito.mock(CustomAuthorityUtils.class);
        passwordEncoder = Mockito.mock(PasswordEncoder.class);
    }


    @Test
    void createMember() {
        Member newMember = new Member();
        newMember.setEmail("new@test.com");
        newMember.setPassword("testpassword1234");

        given(repository.save(Mockito.any(Member.class))).willReturn(newMember);

        Member member = memberService.createMember(newMember);
        assertDoesNotThrow(() -> memberService.createMember(newMember));
        assertEquals(newMember, member);
    }

    @Test
    void updateMemberTest() {
        given(repository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testMember));
        given(repository.save(Mockito.any(Member.class))).willReturn(testMember);

        Member updatedMember = memberService.updateMember(testMember);

        assertDoesNotThrow(() -> memberService.updateMember(testMember));
        assertEquals(testMember,updatedMember);
    }

    @Test
    void findMemberByIdTest() {
        given(repository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testMember));

        Member findMember = memberService.findMember(testMember.getMemberId());

        assertDoesNotThrow(() -> memberService.findMember(testMember.getMemberId()));
        assertEquals(testMember,findMember);
    }

    @Test
    void findMemberByEmailTest() {
        given(repository.findByEmail(Mockito.any())).willReturn(Optional.ofNullable(testMember));

        Member findMember = memberService.findMember(testMember.getEmail());

        assertDoesNotThrow(() -> memberService.findMember(testMember.getEmail()));
        assertEquals(testMember,findMember);
    }

    @Test
    void removeMemberTest() {
        given(repository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testMember));

        memberService.removeMember(testMember.getMemberId());

        assertDoesNotThrow(() -> memberService.removeMember(testMember.getMemberId()));
    }
}