package com.seb45_022.preproject.server.domain.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(length = 10000, nullable = false)
    private String body;

    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
}
