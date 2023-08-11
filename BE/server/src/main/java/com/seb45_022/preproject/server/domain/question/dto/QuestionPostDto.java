package com.seb45_022.preproject.server.domain.question.dto;

import lombok.Getter;

import javax.persistence.Column;

@Getter
public class QuestionPostDto {
    private String title;

    private String body;

    private String tags;

    private long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
