package com.seb45_022.preproject.server.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seb45_022.preproject.server.domain.answer.entity.Answer;
import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import com.seb45_022.preproject.server.domain.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 255, unique = true, nullable = false)
    private String displayName;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private MemberStatus status = MemberStatus.MEMBER_ACTIVE;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @Column(name = "create_at")
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt = LocalDateTime.now();

    public enum MemberStatus {

        MEMBER_ACTIVE("활동"),
        MEMBER_SLEEP("휴면"),
        MEMBER_QUIT("탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
    public Member(Long memberId) {
        this.memberId = memberId;
    }
}
