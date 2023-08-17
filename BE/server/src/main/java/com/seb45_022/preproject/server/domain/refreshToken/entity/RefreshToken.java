package com.seb45_022.preproject.server.domain.refreshToken.entity;

import com.seb45_022.preproject.server.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "refresh_token")
@NoArgsConstructor
@Getter
@Setter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(name = "REFRESH_TOKEN", nullable = false)
    private String value;
}
