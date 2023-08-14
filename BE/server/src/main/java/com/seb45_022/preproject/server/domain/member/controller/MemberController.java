package com.seb45_022.preproject.server.domain.member.controller;

import com.seb45_022.preproject.server.domain.member.dto.*;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.mapper.MemberMapper;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.dto.QuestionDetailsResponseDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.global.argu.LoginMemberId;
import com.seb45_022.preproject.server.global.dto.LoginMemberResponseDto;
import com.seb45_022.preproject.server.global.dto.SingleResponseDto;
import com.seb45_022.preproject.server.global.utils.UriCreator;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@Slf4j
@Api(tags = {"사용자 CRUD API"})
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @ApiOperation(value = "사용자 회원가입 메서드", notes = "email, password, displayName을 받아 회원정보를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "CREATED", response = SingleResponseDto.class)
    })
    @PostMapping
    public ResponseEntity postMember(@RequestBody MemberPostDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(requestBody));
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());
        return ResponseEntity.created(location).body(new SingleResponseDto<>("success create account"));
    }

    @ApiOperation(value = "사용자 정보를 수정하는 메서드", notes = "displayName또는 password를 수정하는 메서드")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = SingleResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId, @Valid @RequestBody MemberPatchDto requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>("success modify member"), HttpStatus.OK);
    }

    @ApiOperation(value = "1명의 사용자를 조회하는 메서드", notes = "memberId를 이용해 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = MemberPostResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberPostResponseDto(member)), HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 정보를 삭제하는 메서드", notes = "사용자 아이디를 사용해 정보를 삭제한다.")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @ApiResponses({
            @ApiResponse(code = 204, message = "NO CONTENT"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.removeMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>("success delete member"), HttpStatus.OK);
    }

    @ApiOperation(value = "로그인한 사용자의 정보를 조회하는 메서드", notes = "loginMemberId를 이용해 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK", response = LoginMemberResponseDto.class),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/user")
    public ResponseEntity accountUserDetails(@LoginMemberId Long loginMemberId) {
        Member findMember = memberService.findMember(loginMemberId);

        return new ResponseEntity<>(new LoginMemberResponseDto(mapper.memberToLoginMemberResponseDto(findMember)), HttpStatus.OK);
    }
}
