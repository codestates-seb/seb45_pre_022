package com.seb45_022.preproject.server.domain.comment.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class CommentPatchDto {
    @ApiModelProperty(example = "1", position = 1, hidden = true)
    private long commentId;

    @ApiModelProperty(example = "SampleComment", position = 2)
    @NotBlank(message = "댓글 내용은 공백이 아니어야 합니다")
    private String body;

    private Long memberId;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
