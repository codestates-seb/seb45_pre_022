package com.seb45_022.preproject.server.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Enumerated(value = EnumType.STRING)
    @Column(length = 255, nullable = false)
    private MemberStatus status = MemberStatus.MEMBER_ACTIVE;

//    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
//    private List<Question> questions = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
//    private List<Answer> answers = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
//    private List<Comment> comments = new ArrayList<>();

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt;

    public enum MemberStatus {

        MEMBER_ACTIVE("활동"),
        MEMBER_SLEEP("휴면"),
        MEMBER_QUIT("탈퇴");

        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
