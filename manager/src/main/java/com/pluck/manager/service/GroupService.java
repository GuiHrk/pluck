package com.pluck.manager.service;

import com.pluck.manager.entity.Group;
import com.pluck.manager.repository.GroupRepository;
import com.pluck.manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GroupService {
    
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;


    public Group create(Group group){
        return groupRepository.save(group);
    }

    public List<Group> list(){
        return groupRepository.findAll();
    }

    @Transactional
    public void delete(Long id) {
     
        if(!groupRepository.existsById(id)){
            throw new RuntimeException("Grupo não encontrado");
        }

        //remoção de vinculo de usuário  (FK)
        userRepository.removeGroupFromUsers(id);

        //Deletar o grupo
        groupRepository.deleteById(id); 

    }
}
