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
    @ApiModelProperty(value = "질문 번호",example = "1", position = 1)
    private long questionId;

    @ApiModelProperty(value = "작성자 memeberId",example = "1", position = 2, hidden = true)
    private long memberId;

    @ApiModelProperty(value = "작성자 displayName",example = "HGD", position = 3)
    private String displayName;

    @ApiModelProperty(value = "질문 제목",example = "SampleQuestion", position = 4)
    private String title;

    @ApiModelProperty(value = "질문 내용",example = "This is a SampleQuestion", position = 5)
    private String body;

    @ApiModelProperty(value = "질문 태그 배열",example = "[this,is,sample,tag]", position = 6)
    private List<String> tags;

    @ApiModelProperty(value = "질문에 달린 답변 갯수",example = "1", position = 7)
    private int answerCount;

    @ApiModelProperty(value = "질문 조회수",example = "1", position = 8)
    private int views;

    @ApiModelProperty(value = "질문 생성시간",example = "2023-08-01T12:34:56.123456", position = 9)
    private String createdAt;

    @ApiModelProperty(value = "질문 최종 수정시간",example = "2023-08-01T12:34:56.123456", position = 10)
    private String lastModifiedAt;
}
