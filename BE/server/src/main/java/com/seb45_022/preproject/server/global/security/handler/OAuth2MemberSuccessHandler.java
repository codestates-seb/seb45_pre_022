package com.seb45_022.preproject.server.global.security.handler;

import com.google.gson.Gson;
import com.seb45_022.preproject.server.domain.member.dto.MemberDto;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.refreshToken.entity.RefreshToken;
import com.seb45_022.preproject.server.domain.refreshToken.service.RefreshTokenService;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes().get("email");
        String displayName = (String) oAuth2User.getAttributes().get("name");

        Member member = new Member();
        member.setDisplayName(displayName);
        member.setEmail(email);
        member.setPassword("google_OAuth2");
        member.setCreateAt(LocalDateTime.now());
        member.setLastModifiedAt(LocalDateTime.now());
        Member saveMember = saveMember(member);

        List<String> authorities = customAuthorityUtils.createRoles(email);

        redirect(request, response, saveMember, authorities);
    }

    private Member saveMember(Member member) {
        return memberService.createMemberOAuth2(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {

        String accessToken = delegateAccessToken(member, authorities);
        String refreshToken = delegateRefreshToken(member);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer "+ accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setValue(refreshToken);
        refreshTokenService.addRefreshToken(refreshTokenEntity);

        getRedirectStrategy().sendRedirect(request,response,uri);

//        MemberDto.LoginResponse loginResponse = MemberDto.LoginResponse.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .memberId(member.getMemberId())
//                .displayName(member.getDisplayName())
//                .build();
//
//        String body = new Gson().toJson(loginResponse);
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(body);

//        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
//                .httpOnly(true)
//                .secure(true)
//                .maxAge(TimeUnit.MINUTES.toSeconds(30))
//                .build();
//
//        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private String delegateAccessToken(Member member, List<String> authorities){

        Map<String,Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("displayName", member.getDisplayName());
        claims.put("id", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                //.host("localhost")
                .port(3000)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
