package com.seb45_022.preproject.server.domain.answer.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor

public class AnswerPatchDto {
    @ApiModelProperty(example = "1", position = 1, hidden = true)
    private long answerId;

    @ApiModelProperty(example = "1", position = 2, hidden = true)
    private long memberId;

    @ApiModelProperty(example = "SampleAnswer", position = 3)
    @NotBlank(message = "답변 내용은 공백이 아니어야 합니다")
    private String body;

}
