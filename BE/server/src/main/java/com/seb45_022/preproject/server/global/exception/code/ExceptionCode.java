package com.seb45_022.preproject.server.global.exception.code;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다."),
    MEMBER_EXISTS(409, "존재하는 회원입니다."),
    MEMBER_NOT_MODIFY(400, "수정권한이 없습니다."),
    INVALID_EMAIL_FORMAT(400, "이메일 형식에 맞지 않습니다."),
    INVALID_PASSWORD_FORMAT(400, "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다."),
    NOT_IMPLEMENTATION(501, "구현되지 않은 기능입니다."),
    INVALID_MEMBER_STATUS(400, "잘못된 회원 상태입니다."),
    QUESTION_NOT_FOUND(404, "존재하지 않는 게시글 입니다." ),
    ANSWER_NOT_FOUND(404, "존재하지 않는 답변 입니다." ),
    COMMENT_NOT_FOUND(404, "존재하지 않는 답변 입니다."),
    NOT_ALLOW_MEMBER(401, "올바른 회원이 아닙니다."),
    TOKEN_NOT_FOUND(404, "존재하지 토큰이 아닙니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
