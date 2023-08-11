package com.seb45_022.preproject.server.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {
    @Getter
    public static class Post {
        private String questionId;
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
    @AllArgsConstructor
    public static class Response {
        private long answerId;
        private String body;
        private String createdAt;
        private String lastModifiedAt;
    }

}
