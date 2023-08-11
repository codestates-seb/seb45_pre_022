package com.seb45_022.preproject.server.domain.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(length = 10000, nullable = false)
    private String body;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;
}
