package com.seb45_022.preproject.server.domain.refreshToken.repository;

import com.seb45_022.preproject.server.domain.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByValue(String value);
}