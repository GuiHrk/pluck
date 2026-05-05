package com.pluck.manager.repository;

import com.pluck.manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

@Modifying
    @Query("UPDATE User u SET u.group = null WHERE u.group.id = :groupId")
    void removeGroupFromUsers(@Param("groupId") Long groupId);

    User findByEmail(String email);
}
    


 // Camada responsável pela comunicação com o banco de dados, utilizando o Spring Data JPA para facilitar as operações CRUD.