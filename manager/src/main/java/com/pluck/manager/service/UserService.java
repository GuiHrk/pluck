package com.pluck.manager.service;

import com.pluck.manager.entity.User;
import com.pluck.manager.entity.Group;
import com.pluck.manager.repository.UserRepository;
import com.pluck.manager.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {

        if(user.getGroup() != null && user.getGroup().getId() != null){
            Long groupId = user.getGroup().getId();

            Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

            user.setGroup(group);
        }

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

    public User updateGroup(Long userId, Group group){

        if(group == null || group.getId() == null){
            throw new RuntimeException("ID do grupo é obrigatório");
        }
    
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User não encontrado"));
    
        Group existingGroup = groupRepository.findById(group.getId())
            .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
    
        user.setGroup(existingGroup);
    
        return userRepository.save(user);
    }

}
// Service : Recebe os dados ; Tomada de decisão do que realizar com eles ; Chama o repository (repositório) Onde fica a regra de negócios da aplicação.