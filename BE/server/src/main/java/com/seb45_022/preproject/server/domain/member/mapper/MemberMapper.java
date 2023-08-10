package com.seb45_022.preproject.server.domain.member.mapper;

import com.seb45_022.preproject.server.domain.member.dto.MemberDto;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post requestBody);
    Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.PostResponse memberToMemberPostResponseDto(Member member);
    MemberDto.PatchResponse memberToMemberPatchResponseDto(Member member);

}
