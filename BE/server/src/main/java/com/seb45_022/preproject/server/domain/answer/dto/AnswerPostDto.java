package com.seb45_022.preproject.server.domain.answer.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor // test 하기 위해 생성함
public class AnswerPostDto {
    @ApiModelProperty(example = "1", position = 1)
    private long questionId;

    @ApiModelProperty(example = "1", position = 2, hidden = true)
    private long memberId;

    @ApiModelProperty(example = "SampleAnswer", position = 3)
    @NotBlank(message = "답변 내용은 공백이 아니어야 합니다")
    private String body;


    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
