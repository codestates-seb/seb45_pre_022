package com.seb45_022.preproject.server.domain.answer.dto;

import com.seb45_022.preproject.server.domain.comment.dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class AnswerDto {
    @Getter
    public static class Post {
        private long questionId;

        private long memberId;

        @NotBlank(message = "답변 내용은 공백이 아니어야 합니다")
        private String body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long answerId;
        @NotBlank(message = "답변 내용은 공백이 아니어야 합니다")
        private String body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long answerId;
        private long memberId;
        private String displayName;
        private String body;
        private String createdAt;
        private String lastModifiedAt;
        private List<CommentDto.Response> comments;
    }

}
