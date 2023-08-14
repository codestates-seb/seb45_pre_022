package com.seb45_022.preproject.server.domain.answer.dto;

import com.seb45_022.preproject.server.domain.comment.dto.CommentResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponseDto {
    @ApiModelProperty(example = "1", position = 1)
    private long answerId;

    @ApiModelProperty(example = "1", position = 2)
    private long memberId;

    @ApiModelProperty(example = "HGD", position = 3)
    private String displayName;

    @ApiModelProperty(example = "This is a SampleAnswer", position = 4)
    private String body;

    @ApiModelProperty(example = "yyyy-mm-ddThh-mm-ss.SSS", position = 5)
    private String createdAt;

    @ApiModelProperty(example = "yyyy-mm-ddThh-mm-ss.SSS", position = 6)
    private String lastModifiedAt;

    @ApiModelProperty(position = 7)
    private List<CommentResponseDto> comments;
}
