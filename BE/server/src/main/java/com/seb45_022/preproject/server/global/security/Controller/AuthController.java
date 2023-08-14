package com.seb45_022.preproject.server.global.security.Controller;

import com.seb45_022.preproject.server.global.security.dto.LoginDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@Api(tags = {"로그인/로그아웃 API"})
public class AuthController {

    @ApiOperation(value = "로그인 메서드", notes = "username과 password로 로그인을 한다")
    @PostMapping("/auth/login")
    public void LoginAPI(LoginDto loginDto) {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }

    @ApiOperation(value = "구글 OAuth2 로그인 메서드", notes = "구글 OAuth2 로그인을 한다")
    @PostMapping("/oauth2/authorization/google")
    public void OAuth2LoginAPI() {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }

    @ApiOperation(value = "로그아웃 메서드", notes = "로그아웃을한다")
    @PostMapping("/members/logout")
    public void LogoutAPI() {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }
}
