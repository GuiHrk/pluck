package com.pluck.manager.service;

import com.pluck.manager.entity.User;
import com.pluck.manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        return userRepository.save(user);
    }

    public List<User> list() {
        return userRepository.findAll();
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User login(String email, String password){
        
        User user = userRepository.findByEmail(email);
        
        if(user == null){
            throw new  RuntimeException("Usuário não encontrado");
        }
        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Senha inválida");
        }
        return user;
    }
}
// Service : Recebe os dados ; Tomada de decisão do que realizar com eles ; Chama o repository (repositório)