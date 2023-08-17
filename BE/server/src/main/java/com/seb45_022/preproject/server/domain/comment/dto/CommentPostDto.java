package com.seb45_022.preproject.server.domain.comment.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class CommentPostDto {

    @ApiModelProperty(example = "1", position = 1)
    @Positive
    private long answerId;

    @ApiModelProperty(example = "1", position = 2, hidden = true)
    private long memberId;

    @ApiModelProperty(example = "SampleComment", position = 3)
    @NotBlank(message = "댓글 내용은 공백이 아니어야 합니다")
    private String body;

    public void serMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
