package com.seb45_022.preproject.server.domain.member.dto;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPostResponseDto {
    @ApiModelProperty(example = "1", position = 1)
    private long memberId;

    @ApiModelProperty(example = "sample@gmail.com", position = 2)
    private String email;

    @ApiModelProperty(example = "Sample", position = 3)
    private String displayName;

    @ApiModelProperty(example = "MEMBER_ACTIVE", position = 4)
    private Member.MemberStatus status;
}
