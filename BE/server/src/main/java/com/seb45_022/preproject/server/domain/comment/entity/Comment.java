package com.seb45_022.preproject.server.domain.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.member.entity.Member;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
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
    @JsonBackReference
    private Answer answer;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
