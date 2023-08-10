package com.seb45_022.preproject.server.domain.question.dto;

import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.Positive;

@Getter
public class QuestionPostDto {
    @Positive
    private long memberId;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(length = 10000, nullable = false)
    private String body;

    @Column(length = 255, nullable = false)
    private String tags;
}
