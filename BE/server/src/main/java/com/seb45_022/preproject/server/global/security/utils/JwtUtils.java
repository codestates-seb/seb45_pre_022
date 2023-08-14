package com.seb45_022.preproject.server.global.security.utils;

import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class JwtUtils {
    private final JwtTokenizer tokenizer;

    public JwtUtils(JwtTokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    public Long getMemberId(Map<String, Object> claims){
        Long memberId = Long.valueOf((Integer) claims.get("id"));

        return memberId;
    }

    public  Map<String, Object> getClaims(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer", "");
        String base64EncodedSecretKey = tokenizer.base64EncodedSecretKey(tokenizer.getSecretKey());
        Map<String, Object> claims = tokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}
