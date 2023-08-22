package com.seb45_022.preproject.server.domain.question.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionPageInfo {
    @ApiModelProperty(value = "조회할 페이지",example = "1", position = 1)
    private int page;
    @ApiModelProperty(value = "한 페이지에 조회할 질문 갯수",example = "1", position = 2)
    private int size;
    @ApiModelProperty(value = "총 질문 갯수",example = "3", position = 3)
    private int totalElements;
    @ApiModelProperty(value = "총 페이지 갯수",example = "3", position = 4)
    private int totalPages;
}
