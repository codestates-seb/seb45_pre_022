package com.seb45_022.preproject.server.domain.comment.mapper;

import com.seb45_022.preproject.server.domain.comment.dto.CommentPatchDto;
import com.seb45_022.preproject.server.domain.comment.dto.CommentPostDto;
import com.seb45_022.preproject.server.domain.comment.dto.CommentResponseDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface CommentMapper {

    @Mapping(source = "answerId", target = "answer.answerId")
    @Mapping(source = "memberId", target = "member.memberId")
    Comment commentPostDtoToComment(CommentPostDto requestBody);

    Comment commentPatchDtoToComment(CommentPatchDto requestBody);
    CommentResponseDto commentToResponseDto(Comment comment);
}
