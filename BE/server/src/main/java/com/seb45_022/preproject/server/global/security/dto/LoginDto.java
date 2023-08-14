package com.seb45_022.preproject.server.global.security.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginDto {
    @ApiModelProperty(value = "유저 아이디(이메일)",example = "exaple@email.com", position = 1)
    private String username;
    @ApiModelProperty(value = "비밀번호",example = "password1234", position = 2)
    private String password;
}
