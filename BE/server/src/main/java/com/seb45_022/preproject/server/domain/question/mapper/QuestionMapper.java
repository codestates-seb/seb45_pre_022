package com.seb45_022.preproject.server.domain.question.mapper;

import com.seb45_022.preproject.server.domain.question.dto.QuestionDetailsResponseDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPatchDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPostDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface QuestionMapper {


//    default Question QuestionPostDtoToQuestion(QuestionPostDto questionPostDto){
//        Member member = new Member();
//        member.setMemberId(questionPostDto.getMemberId());
//
//        Question question = new Question();
//        question.setMember(member);
//
//        question.setBody(questionPostDto.getBody());
//        question.setTitle(questionPostDto.getTitle());
//        question.setTags(questionPostDto.getTags());
//
//        return question;
//    };
    Question QuestionPatchtDtoToQuestion(QuestionPatchDto questionPatchDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Question QuestionPostDtoToQuestion(QuestionPostDto questionPostDto);


//    default QuestionResponseDto QuestionToQuestionResponseDto(Question question){
//        QuestionResponseDto responseDto = new QuestionResponseDto();
//
//        responseDto.setQuestionId(question.getQuestionId());
//        responseDto.setMemberId(question.getMember().getMemberId());
//        responseDto.setBody(question.getBody());
//        responseDto.setTitle(question.getTitle());
//
//        responseDto.setTags(question.getTags());
//
//        return responseDto;
//    };

    @Mapping(source = "member.memberId", target = "memberId")
    QuestionResponseDto QuestionToQuestionResponseDto(Question question);

    @Mapping(source = "member.memberId", target = "memberId")
    QuestionDetailsResponseDto QuestionToQuestionDetailsResponseDto(Question question);
}
