package com.seb45_022.preproject.server.domain.comment.mapper;

import com.seb45_022.preproject.server.domain.comment.dto.CommentDto;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface CommentMapper {

    @Mapping(source = "answerId", target = "answer.answerId")
    @Mapping(source = "memberId", target = "member.memberId")
    Comment commentPostDtoToComment(CommentDto.Post requestBody);

    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.Response commentToResponseDto(Comment comment);
}
