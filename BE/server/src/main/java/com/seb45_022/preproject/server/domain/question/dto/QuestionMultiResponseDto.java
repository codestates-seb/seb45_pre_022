package com.seb45_022.preproject.server.domain.question.dto;

import com.seb45_022.preproject.server.global.dto.PageInfo;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class QuestionMultiResponseDto {
    @ApiModelProperty(position = 1)
    private List<QuestionResponseDto> questions;

    @ApiModelProperty(position = 2)
    private QuestionPageInfo pageInfo;

    public QuestionMultiResponseDto(List<QuestionResponseDto> questionResponseDtos, QuestionPageInfo pageInfo) {
        this.questions = questionResponseDtos;
        this.pageInfo = pageInfo;
    }
}
