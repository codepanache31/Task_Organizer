package com.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.exception.ResourceNotFoundException;
import com.springboot.model.Tasks;
import com.springboot.repository.TaskRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/codePanache/v1")
public class TaskController {
	
	@Autowired
	private TaskRepository rep;

	//REST APIs:
	
		//get all tasks...modify this according to priority
		@GetMapping("/tasks")
		public List<Tasks> getAllTasks(){
			return rep.findAll();
		}
		
		//add task
		@PostMapping("/tasks")
		public Tasks createTask(@RequestBody Tasks task) {
			return rep.save(task);
		}
		
		//get employee by id
		@GetMapping("/tasks/{id}")
		public ResponseEntity<Tasks> getEmployee(@PathVariable Long id) {
			Tasks task = rep.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with id :"+ id));
			return ResponseEntity.ok(task);
		}
		
		//update employee
		@PutMapping("/tasks/{id}")
		public ResponseEntity<Tasks> updateEmployee(@PathVariable Long id, @RequestBody Tasks taskDetails){
			
			Tasks task = rep.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with id :"+ id));
			
			task.setTaskName(taskDetails.getTaskName());
			task.setDeadline(taskDetails.getDeadline());
			task.setPriority(taskDetails.getPriority());
			
			Tasks updatedTask = rep.save(task);
			return ResponseEntity.ok(updatedTask);
		}
		
		@DeleteMapping("/tasks/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			Tasks task = rep.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee doesn't exist with id :"+ id));
			rep.delete(task);
			Map<String, Boolean> response = new HashMap();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
			
		}
	
}
