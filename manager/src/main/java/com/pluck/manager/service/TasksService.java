package com.pluck.manager.service;

import com.pluck.manager.entity.User;
import com.pluck.manager.entity.Tasks;
import com.pluck.manager.repository.TasksRepository;
import com.pluck.manager.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {

  
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TasksRepository tasksRepository;

    public Tasks create(Tasks tasks){

        if (tasks.getUser() == null || tasks.getUser().getId() == null) {
            throw new RuntimeException("User é obrigatório");
        }
    
        if(tasks.getStatus() == null){
            tasks.setStatus("PENDENTENTE");
        }

        Long userId = tasks.getUser().getId();
    
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User não encontrado"));
    
        tasks.setUser(user);
    
        return tasksRepository.save(tasks);
    }

    public List<Tasks> list(){
        return tasksRepository.findAll();
    }

    public Tasks getById(Long id){
        return tasksRepository.findById(id).orElse(null);
    }

    public Tasks update(Long id, Tasks tasks){
        Tasks existing = tasksRepository.findById(id).orElse(null);

        if (existing != null){
            existing.setTitle(tasks.getTitle());
            existing.setDescription(tasks.getDescription());
            existing.setStatus(tasks.getStatus());
            return tasksRepository.save(existing);
        }
        return null;
    }

    public void delete(Long id){
        tasksRepository.deleteById(id);
    }

    public List<Tasks> getByUser(Long userId){
        return tasksRepository.findByUser_Id(userId);
    }

    public List<Tasks> getByGroup(Long groupId){
        return tasksRepository.findByGroup_Id(groupId);
    }

}
