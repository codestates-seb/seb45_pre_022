package com.seb45_022.preproject.server.global.security.Controller;

import com.seb45_022.preproject.server.global.security.dto.LoginDto;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@Api(tags = "로그인/로그아웃 API")
public class AuthController {

    @ApiOperation(value = "로그인 메서드", notes = "username(email)과 password로 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(value = "/auth/login")
    public void createUser(@RequestBody LoginDto loginDto) {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }

    @ApiOperation(value = "구글 OAuth2 로그인 메서드", notes = "구글 OAuth2 로그인을 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @PostMapping("/oauth2/authorization/google")
    public void OAuth2LoginAPI() {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }

    @ApiOperation(value = "로그아웃 메서드", notes = "로그아웃을한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/members/logout")
    public void LogoutAPI() {
        throw new IllegalStateException("스웨거용 mockController입니다.");
    }
}

