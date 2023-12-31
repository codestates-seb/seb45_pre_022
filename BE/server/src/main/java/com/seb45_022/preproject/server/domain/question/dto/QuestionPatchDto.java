package com.seb45_022.preproject.server.domain.question.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionPatchDto {
    @ApiModelProperty(value = "수정할 questionId",example = "1", position = 1, hidden = true)
    private long questionId;

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }


    @ApiModelProperty(value = "사용자 memberId",example = "1", position = 2, hidden = true)
    private long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    @ApiModelProperty(value = "수정할 질문 제목",example = "SampleQuestion", position = 3)
    @Column(length = 500, nullable = false)
    private String title;

    @ApiModelProperty(value = "수정할 질문 내용",example = "This is a SampleQuestion", position = 4)
    @Column(length = 10000, nullable = false)
    private String body;

    @ApiModelProperty(value = "수정할 질문 태그 배열",example = "[this,is,sample,tag]", position = 5)
    @Column(length = 255, nullable = false)
    private List<String> tags;
}
