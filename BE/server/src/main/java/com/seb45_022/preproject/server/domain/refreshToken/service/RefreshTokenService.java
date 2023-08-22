package com.seb45_022.preproject.server.domain.refreshToken.service;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.refreshToken.entity.RefreshToken;
import com.seb45_022.preproject.server.domain.refreshToken.repository.RefreshTokenRepository;
import com.seb45_022.preproject.server.global.exception.businessLogic.BusinessLogicException;
import com.seb45_022.preproject.server.global.exception.code.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public RefreshToken addRefreshToken(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public void deleteRefreshToken(String refreshToken) {
        refreshTokenRepository.findByValue(refreshToken).ifPresent(refreshTokenRepository::delete);
    }

    @Transactional(readOnly = true)
    public Optional<RefreshToken> findRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByValue(refreshToken);
    }

    @Transactional(readOnly = true)
    public RefreshToken findRefreshToken(Member member) {
        return refreshTokenRepository.findByMember(member).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }
}