package com.seb45_022.preproject.server.domain.answer.mapper;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerPatchDto;
import com.seb45_022.preproject.server.domain.answer.dto.AnswerPostDto;
import com.seb45_022.preproject.server.domain.answer.dto.AnswerResponseDto;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")

public interface AnswerMapper {

    @Mapping(source = "questionId", target = "question.questionId")
    @Mapping(source = "memberId", target = "member.memberId")
    Answer answerPostDtoToAnswer(AnswerPostDto requestBody);

    @Mapping(source = "memberId", target = "member.memberId")
    Answer answerPatchDtoToAnswer(AnswerPatchDto requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.displayName", target = "displayName")
    AnswerResponseDto answerToResponseDto(Answer answer);
}
