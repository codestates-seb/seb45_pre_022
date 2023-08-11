package com.seb45_022.preproject.server.domain.question.dto;

import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {
    private long questionId;

    private long memberId;

    private String displayName;

    private String title;

    private String body;

    private List<String> tags;

}
