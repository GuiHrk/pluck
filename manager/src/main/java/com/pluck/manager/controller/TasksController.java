package com.pluck.manager.controller;

import com.pluck.manager.entity.Tasks;
import com.pluck.manager.service.TasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TasksController {
    
    @Autowired
    private TasksService tasksService;

    @PostMapping
    public Tasks create(@RequestBody Tasks tasks){
        return tasksService.create(tasks);
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

    @GetMapping("/user/{userId}")
    public List<Tasks> getByUser(@PathVariable Long userId){
        return tasksService.getByUser(userId);
    }

    @GetMapping("/group/{groupId}")
    public List<Tasks> getByGroup(@PathVariable Long groupId){
        return tasksService.getByGroup(groupId);
    }

    @PutMapping("/{id}/status")
    public Tasks updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body){

        return tasksService.updateStatus(id, body.get("status"));
    }
}
