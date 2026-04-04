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

}
