package com.seb45_022.preproject.server.domain.question.dto;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {
    @ApiModelProperty(example = "1", position = 1)
    private long questionId;

    @ApiModelProperty(example = "1", position = 2)
    private long memberId;

    @ApiModelProperty(example = "HGD", position = 3)
    private String displayName;

    @ApiModelProperty(example = "SampleQuestion", position = 4)
    private String title;

    @ApiModelProperty(example = "This is a SampleQuestion", position = 5)
    private String body;

    @ApiModelProperty(example = "[this,is,sample,tag]", position = 6)
    private List<String> tags;

}
