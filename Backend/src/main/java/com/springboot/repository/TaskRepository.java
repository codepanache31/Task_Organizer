package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.model.Tasks;

@Repository
public interface TaskRepository extends JpaRepository<Tasks, Long>{

}
