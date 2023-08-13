package com.seb45_022.preproject.server.global.dto;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginMemberResponseDto {
    private Long memberId;
    private String email;
    private String displayName;

    public LoginMemberResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.displayName = member.getDisplayName();
    }
}
