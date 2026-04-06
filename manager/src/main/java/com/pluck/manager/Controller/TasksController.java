package com.pluck.manager.controller;

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

    @GetMapping("/{id}")
    public Tasks getById(@PathVariable Long id){
        return tasksService.getById(id);
    }
    @PutMapping("/{id}")
    public Tasks update(@PathVariable Long id, @RequestBody Tasks tasks){
        return tasksService.update(id, tasks);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        tasksService.delete(id);
    }

}
