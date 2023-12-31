package com.seb45_022.preproject.server.domain.refreshToken.contorller;

import com.seb45_022.preproject.server.domain.member.dto.MemberDto;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.question.dto.QuestionDetailsResponseDto;
import com.seb45_022.preproject.server.domain.refreshToken.service.RefreshTokenService;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/refreshToken")
@RequiredArgsConstructor
@Slf4j
@Api(tags = {"토큰 재발급 API"})
public class RefreshTokenController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @ApiOperation(value = "엑세스토큰을 재발급하는 메서드", notes = "요청헤더에 리프래시토큰을 넣으면 엑세스토큰을 재발급해서 돌려준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Internal Sever Error"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 401, message = "Unauthorized")
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping // refreshToken으로 accessToken 재발급
    public ResponseEntity requestRefresh(@RequestHeader("Refresh") String requestHeader) {
        refreshTokenService.findRefreshToken(requestHeader).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));

        Claims refreshClaims = jwtTokenizer.parseRefreshToken(requestHeader);
        Member member = memberService.findMember(refreshClaims.get("sub").toString());

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("displayName", member.getDisplayName());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer" + accessToken);

        MemberDto.LoginResponse loginResponse = MemberDto.LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(requestHeader)
                .memberId(member.getMemberId())
                .displayName(member.getDisplayName())
                .build();

        return ResponseEntity.ok().headers(headers).body(loginResponse);
    }
}
