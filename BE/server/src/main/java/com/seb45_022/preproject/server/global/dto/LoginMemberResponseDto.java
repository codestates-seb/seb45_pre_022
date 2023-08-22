package com.seb45_022.preproject.server.global.dto;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginMemberResponseDto {
    @ApiModelProperty(example = "1", position = 1)
    private Long memberId;

    @ApiModelProperty(example = "login@gmail.com", position = 2)
    private String email;

    @ApiModelProperty(example = "loginUser", position = 3)
    private String displayName;

    public LoginMemberResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.displayName = member.getDisplayName();
    }
}
