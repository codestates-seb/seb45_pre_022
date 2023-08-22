package com.seb45_022.preproject.server.domain.member.dto;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPatchResponseDto {
    private long memberId;
    private String displayName;
    private String password;
    private Member.MemberStatus status;
}
