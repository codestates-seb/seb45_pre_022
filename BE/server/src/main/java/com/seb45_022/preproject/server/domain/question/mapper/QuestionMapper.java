package com.seb45_022.preproject.server.domain.question.mapper;

import com.seb45_022.preproject.server.domain.question.dto.QuestionPatchDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPostDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface QuestionMapper {
    Question QuestionPostDtoToQuestion(QuestionPostDto questionPostDto);
    Question QuestionPatchtDtoToQuestion(QuestionPatchDto questionPatchDto);
    QuestionResponseDto QuestionToQuestionResponseDto(Question question);
}
