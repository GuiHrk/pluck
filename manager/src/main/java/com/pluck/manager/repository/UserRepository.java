package com.pluck.manager.repository;

import com.pluck.manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
    
 // Cama responsável pela comunicação com o banco de dados, utilizando o Spring Data JPA para facilitar as operações CRUD.