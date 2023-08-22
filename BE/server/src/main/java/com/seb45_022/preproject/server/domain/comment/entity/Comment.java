package com.seb45_022.preproject.server.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(length = 10000, nullable = false)
    private String body;

    private LocalDateTime createdAt;

    private LocalDateTime lastModifiedAt;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
