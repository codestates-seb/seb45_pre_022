package com.seb45_022.preproject.server.domain.question.dto;

import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class QuestionPostDto {
    @NotBlank(message = "작성자는 공백이 아니어야 합니다.")
    private long memberId;

    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String body;

    private List<String> tags;
}
