package com.seb45_022.preproject.server.domain.question.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
public class QuestionPatchDto {
    @Positive
    private long questionId;

    @ApiModelProperty(value = "사용자 memberId",example = "1", position = 1)
    @Positive
    private long memberId;

    @ApiModelProperty(value = "수정할 질문 제목",example = "SampleQuestion", position = 2)
    @Column(length = 500, nullable = false)
    private String title;

    @ApiModelProperty(value = "수정할 질문 내용",example = "This is a SampleQuestion", position = 3)
    @Column(length = 10000, nullable = false)
    private String body;

    @ApiModelProperty(value = "수정할 질문 태그 배열",example = "[this,is,sample,tag]", position = 4)
    @Column(length = 255, nullable = false)
    private List<String> tags;
}
