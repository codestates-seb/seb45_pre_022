package com.seb45_022.preproject.server.domain.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
public class MemberPatchDto {
    @ApiModelProperty(example = "1", position = 1)
    private long memberId;

    @ApiModelProperty(example = "Sample2", position = 2)
    @Pattern(regexp = "^[a-zA-Z가-헿0-9]{4,}$", message = "4자 이상부터 가능하며 특수 문자가 없어야 합니다.")
    private String displayName;

    @ApiModelProperty(example = "Sample123", position = 3)
    @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
    private String password;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

}

