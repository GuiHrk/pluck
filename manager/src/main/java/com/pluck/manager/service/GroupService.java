package com.pluck.manager.service;

import com.pluck.manager.entity.Group;
import com.pluck.manager.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    
    @Autowired
    private GroupRepository groupRepository;

    public Group create(Group group){
        return groupRepository.save(group);
    }

    public List<Group> list(){
        return groupRepository.findAll();
    }
}
