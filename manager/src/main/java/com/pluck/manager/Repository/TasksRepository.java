package com.pluck.manager.repository;

import com.pluck.manager.entity.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TasksRepository extends JpaRepository<Tasks, Long>{

    List<Tasks> findByUser_Id(Long userId);
    List<Tasks> findByGroup_Id(Long groupId);

}