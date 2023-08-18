package com.seb45_022.preproject.server.global.security.utils;

import com.seb45_022.preproject.server.global.dto.TokenPrincipalDto;
import com.seb45_022.preproject.server.global.security.jwt.JwtTokenizer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class JwtUtils {
    public Long getMemberId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TokenPrincipalDto castedPrincipal = (TokenPrincipalDto) principal;
        return castedPrincipal.getId();
    }
}
