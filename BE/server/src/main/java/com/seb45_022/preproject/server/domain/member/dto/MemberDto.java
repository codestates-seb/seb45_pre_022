package com.seb45_022.preproject.server.domain.member.dto;


import com.seb45_022.preproject.server.domain.member.entity.Member;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {

    @Getter
    @Setter
    public static class Post {

        @NotBlank
        @Email(message = "이메일 형식에 맞지 않습니다.")
        private String email;

        @NotBlank
        @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
        private String password;

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z가-헿0-9]{4,}$", message = "4자 이상부터 가능하며 특수 문자가 없어야 합니다.")
        private String displayName;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Login {

        @NotBlank
        @Email(message = "이메일 형식에 맞지 않습니다.")
        private String email;

        @NotBlank
        @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @Pattern(regexp = "^[a-zA-Z가-헿0-9]{4,}$", message = "4자 이상부터 가능하며 특수 문자가 없어야 합니다.")
        private String displayName;

        @Pattern(regexp = "(?=.*\\d)(?=.*[a-zA-ZS]).{8,}", message = "영어와 숫자를 최소 1개 포함하여 8자 이상이어야합니다.")
        private String password;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class PostResponse {
        private long memberId;
        private String email;
        private String displayName;
        private Member.MemberStatus status;
    }

    @AllArgsConstructor
    @Getter
    public static class PatchResponse {
        private long memberId;
        private String displayName;
        private String password;
        private Member.MemberStatus status;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginResponse {
        private String accessToken;
        private String refreshToken;
        private Long memberId;
        private String displayName;
    }
}
