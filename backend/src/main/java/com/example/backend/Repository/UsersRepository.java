package com.example.backend.Repository;

import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Projection.UsersProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsersRepository extends JpaRepository<User, UUID> {
    Optional<User> findByPhone(String phone);
//        @Query(value = """
//            select r.created_at, r.updated_at, u.id,  username from users u
//            inner join users_roles ur on u.id = ur.user_id
//            inner join role r on r.id = ur.roles_id
//            where role_name=:role
//            """,nativeQuery = true)
//    User findByRoles(List<Role> roles);

    List<User> findAllByUsernameContainingIgnoreCase(String username);

   User findAllByRolesIn(List<Role> role);
}
