package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 데이터베이스 쿼리 생성을 위한 JPA Query Method 인터페이스 정의
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findAllByGeneration(Integer generation, Sort sort);

    boolean existsByEmail(String email);
}
