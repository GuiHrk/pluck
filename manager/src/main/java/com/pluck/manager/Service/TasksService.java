package com.pluck.manager.service;

import com.pluck.manager.entity.Tasks;
import com.pluck.manager.repository.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {

    @Autowired
    private TasksRepository tasksRepository;
    
    public Tasks createTasks(Tasks tasks){
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


}
