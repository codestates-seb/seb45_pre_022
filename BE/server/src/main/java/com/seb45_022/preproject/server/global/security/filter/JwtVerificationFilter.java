package com.seb45_022.preproject.server.global.security.filter;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.member.service.MemberService;
import com.seb45_022.preproject.server.domain.refreshToken.service.RefreshTokenService;
import com.seb45_022.preproject.server.global.dto.TokenPrincipalDto;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import com.seb45_022.preproject.server.global.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;


    // 필터 적용 결정
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // 필터 기능 수행
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifiJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            // accessToken 만료시 백엔드에서 accessToken 재발급 처리
//            Member member = memberService.findMember(ee.getClaims().get("sub").toString());
//            String refreshToken = refreshTokenService.findRefreshToken(member).toString();
//            if (refreshToken != null) {
//
//                Map<String, Object> claims = new HashMap<>();
//                claims.put("username", member.getEmail());
//                claims.put("roles", member.getRoles());
//                claims.put("id", member.getMemberId());
//
//                String subject = member.getEmail();
//                Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//                String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
//
//                String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//                response.setHeader("Authorization", "Bearer" + accessToken);
//            }
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    // JWT의 유효성을 검증한 뒤 클레임 정보를 반환
    private Map<String, Object> verifiJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer", "");
        String base64EncodedSecretKey = jwtTokenizer.base64EncodedSecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }

    // 사용자 권한 정보 설정
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String email = (String) claims.get("username");
        Long memberId = Long.valueOf((Integer) claims.get("id"));
        Collection<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(new TokenPrincipalDto(memberId, email), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
