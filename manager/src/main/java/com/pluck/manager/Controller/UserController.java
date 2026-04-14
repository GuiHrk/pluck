package com.pluck.manager.controller;

import com.pluck.manager.entity.User;
import com.pluck.manager.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;  


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    //Create
    @PostMapping
    public User create(@RequestBody User user){
        return userService.create(user);
    }
    //Read All
    @GetMapping
    public List<User> list(){
        return userService.list();
    }
    //Read By Id
    @GetMapping("/{id}")
    public User get(@PathVariable Long id){
        return userService.getById(id);
    }
    //Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user.getEmail(), user.getPassword());
    }

}
