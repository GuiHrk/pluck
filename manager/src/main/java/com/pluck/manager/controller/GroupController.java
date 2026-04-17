package com.pluck.manager.controller;

import com.pluck.manager.entity.Group;
import com.pluck.manager.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public Group create(@RequestBody Group group){
        return groupService.create(group);
    }

    @GetMapping
    public List<Group> list(){
        return groupService.list();
    }

}
