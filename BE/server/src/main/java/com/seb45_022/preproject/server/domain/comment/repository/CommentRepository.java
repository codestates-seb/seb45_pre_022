package com.seb45_022.preproject.server.domain.comment.repository;

import com.seb45_022.preproject.server.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
