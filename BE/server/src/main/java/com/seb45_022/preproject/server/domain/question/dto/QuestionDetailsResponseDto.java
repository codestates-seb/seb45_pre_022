package com.seb45_022.preproject.server.domain.question.dto;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerDto;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDetailsResponseDto {
    private long questionId;

    private long memberId;

    private String displayName;

    private String title;

    private String body;

    private List<String> tags;

    private List<AnswerDto.Response> answers;
}
