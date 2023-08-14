package com.seb45_022.preproject.server.domain.member.mapper;

import com.seb45_022.preproject.server.domain.member.dto.*;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto requestBody);
    Member memberPatchDtoToMember(MemberPatchDto requestBody);
    Member memberToLoginMemberResponseDto(Member member);
    MemberPostResponseDto memberToMemberPostResponseDto(Member member);
    MemberPatchResponseDto memberToMemberPatchResponseDto(Member member);

}
