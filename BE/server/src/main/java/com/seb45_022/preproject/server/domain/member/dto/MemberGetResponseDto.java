package com.seb45_022.preproject.server.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberGetResponseDto {
    private String email;
    private String displayName;
    private Long totalQuestions;
    private Long totalAnswers;

}
