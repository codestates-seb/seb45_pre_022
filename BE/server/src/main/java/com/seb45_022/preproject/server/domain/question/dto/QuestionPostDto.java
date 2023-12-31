package com.seb45_022.preproject.server.domain.question.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class QuestionPostDto {

    @ApiModelProperty(value = "작성자 memeberId", required = true,example = "1", position = 1, hidden = true)
    private long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    @ApiModelProperty(value = "질문 제목", required = true,example = "SampleQuestion", position =2)
    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    @ApiModelProperty(value = "질문 내용", required = true,example = "This is a SampleQuestion", position =3)
    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String body;

    @ApiModelProperty(value = "질문 태그 배열", required = false,example = "[this,is,sample,tag]", position =4)
    private List<String> tags;

    public QuestionPostDto(String title, String body, List<String> tags) {
        this.title = title;
        this.body = body;
        this.tags = tags;
    }
}
