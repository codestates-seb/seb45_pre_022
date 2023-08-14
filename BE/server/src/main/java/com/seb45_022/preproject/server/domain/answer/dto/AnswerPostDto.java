package com.seb45_022.preproject.server.domain.answer.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {
    @ApiModelProperty(example = "1", position = 1)
    private long questionId;

    @ApiModelProperty(example = "1", position = 2)
    private long memberId;

    @ApiModelProperty(example = "SampleAnswer", position = 3)
    @NotBlank(message = "답변 내용은 공백이 아니어야 합니다")
    private String body;

}
