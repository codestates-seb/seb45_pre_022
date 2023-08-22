package com.seb45_022.preproject.server.domain.question.mapper;

import com.seb45_022.preproject.server.domain.answer.dto.AnswerResponseDto;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.comment.dto.CommentResponseDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.question.dto.QuestionDetailsResponseDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPatchDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionPostDto;
import com.seb45_022.preproject.server.domain.question.dto.QuestionResponseDto;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface QuestionMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    Question QuestionPatchtDtoToQuestion(QuestionPatchDto questionPatchDto);

    @Mapping(source = "memberId", target = "member.memberId")
    Question QuestionPostDtoToQuestion(QuestionPostDto questionPostDto);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.displayName", target = "displayName")
    QuestionResponseDto QuestionToQuestionResponseDto(Question question);

    default QuestionDetailsResponseDto QuestionToQuestionDetailsResponseDto(Question question) {
        QuestionDetailsResponseDto questionDetailsResponseDto = new QuestionDetailsResponseDto();

        questionDetailsResponseDto.setQuestionId(question.getQuestionId());
        questionDetailsResponseDto.setMemberId(question.getMember().getMemberId());
        questionDetailsResponseDto.setDisplayName(question.getMember().getDisplayName());
        questionDetailsResponseDto.setTitle(question.getTitle());
        questionDetailsResponseDto.setBody(question.getBody());
        questionDetailsResponseDto.setTags(question.getTags());
        questionDetailsResponseDto.setViews(question.getViews());
        questionDetailsResponseDto.setAnswerCount(question.getAnswerCount());
        questionDetailsResponseDto.setCreatedAt(String.valueOf(question.getCreatedAt()));
        questionDetailsResponseDto.setLastModifiedAt(String.valueOf(question.getLastModifiedAt()));

        List<AnswerResponseDto> answerResponseList = mapAnswersToResponseList(question.getAnswers());
        questionDetailsResponseDto.setAnswers(answerResponseList);

        return questionDetailsResponseDto;
    }

    private static List<AnswerResponseDto> mapAnswersToResponseList(List<Answer> answers) {
        return answers.stream()
                .map(QuestionMapper::mapAnswerToResponse)
                .collect(Collectors.toList());
    }

    private static AnswerResponseDto mapAnswerToResponse(Answer answer) {
        AnswerResponseDto response = new AnswerResponseDto();
        response.setAnswerId(answer.getAnswerId());
        response.setMemberId(answer.getMember().getMemberId());
        response.setDisplayName(answer.getMember().getDisplayName());
        response.setBody(answer.getBody());
        response.setCreatedAt(String.valueOf(answer.getCreatedAt()));
        response.setLastModifiedAt(String.valueOf(answer.getLastModifiedAt()));

        List<CommentResponseDto> commentResponseList = answer.getComments().stream()
                .map(QuestionMapper::mapCommentToResponse)
                .collect(Collectors.toList());

        response.setComments(commentResponseList);
        return response;
    }

    private static CommentResponseDto mapCommentToResponse(Comment comment) {
        CommentResponseDto cResponse = new CommentResponseDto();
        cResponse.setCommentId(comment.getCommentId());
        cResponse.setMemberId(comment.getMember().getMemberId());
        cResponse.setDisplayName(comment.getMember().getDisplayName());
        cResponse.setBody(comment.getBody());
        cResponse.setCreatedAt(String.valueOf(comment.getCreatedAt()));
        cResponse.setLastModifiedAt(String.valueOf(comment.getLastModifiedAt()));
        return cResponse;
    }
}
