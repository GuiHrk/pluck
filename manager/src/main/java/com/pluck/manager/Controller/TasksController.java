package com.pluck.manager.controller;

import com.pluck.manager.entity.Group;
import com.pluck.manager.entity.Tasks;
import com.pluck.manager.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TasksController {
    
    @Autowired
    private TasksService tasksService;

    @PostMapping
    public Tasks create(@RequestBody Tasks tasks){
        return tasksService.createTasks(tasks);
    }

    @GetMapping
    public List<Tasks> list(){
        return tasksService.list();
    }

}
