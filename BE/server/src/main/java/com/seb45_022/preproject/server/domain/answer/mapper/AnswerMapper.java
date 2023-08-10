package com.seb45_022.preproject.server.domain.answer.mapper;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerDto;
import com.seb45_022.preproject.server.domain.answer.entity.AnswerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface AnswerMapper {

    AnswerEntity answerPostDtoToAnswer(AnswerDto.Post requestBody);

    AnswerEntity answerPatchDtoToAnswer(AnswerDto.Patch requestBody);

    AnswerDto.Response answerToResponseDto(AnswerEntity answerEntity);
}
