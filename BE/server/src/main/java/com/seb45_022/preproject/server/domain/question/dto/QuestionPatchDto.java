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
    @ApiModelProperty(example = "1", position = 1)
    @Positive
    private long questionId;

    @ApiModelProperty(example = "1", position = 2)
    @Positive
    private long memberId;

    @ApiModelProperty(example = "SampleQuestion", position = 3)
    @Column(length = 500, nullable = false)
    private String title;

    @ApiModelProperty(example = "This is a SampleQuestion", position = 5)
    @Column(length = 10000, nullable = false)
    private String body;

    @ApiModelProperty(example = "[this,is,sample,tag]", position = 6)
    @Column(length = 255, nullable = false)
    private List<String> tags;
}
