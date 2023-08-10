package com.seb45_022.preproject.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "댓글 내용은 공백이 아니어야 합니다")
        private String body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        @NotBlank(message = "댓글 내용은 공백이 아니어야 합니다")
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String body;
        private String createdAt;
        private String lastModifiedAt;
    }
}
