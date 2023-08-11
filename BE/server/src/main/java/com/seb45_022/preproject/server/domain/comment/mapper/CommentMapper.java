package com.seb45_022.preproject.server.domain.comment.mapper;

import com.seb45_022.preproject.server.domain.comment.dto.CommentDto;
import com.seb45_022.preproject.server.domain.comment.entity.CommentEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface CommentMapper {

    CommentEntity commentPostDtoToComment(CommentDto.Post requestBody);

    CommentEntity commentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.Response commentToResponseDto(CommentEntity commentEntity);
}
