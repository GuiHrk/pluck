package com.pluck.manager.repository;

import org.springframework.stereotype.Repository;

import com.pluck.manager.entity.User;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {
    
 private List<User> users = new ArrayList<>();
 private Long currentId = 1L;

 public User save (User user){
    user.setId(currentId++);
    users.add(user);
    return user;
 }

 public List<User> findAll(){
    return users;
 }

 public User findById(Long id){
    return users.stream()
    .filter(u -> u.getId().equals(id))
    .findFirst()
    .orElse(null);

 }

 public void delete(Long id){
    users.removeIf(u -> u.getId().equals(id));
 }

}

//  Criação de uma espécie de "Banco de dados falso"//   List = tabela ; Save = Insert ; Find = Select


