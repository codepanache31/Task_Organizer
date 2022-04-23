package com.springboot.model;

//import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="tasks")
public class Tasks {
	
	@Id
	@GeneratedValue(generator="task_seq")
	@SequenceGenerator(name="task_seq",sequenceName="task_seq", allocationSize=1)
	private long id;
	
	@Column(name="task_name")
	private String taskName;
	
	@Column(name="deadline")
	private String deadline;
	
	@Column(name="priority")
	private String priority;

	public Tasks() {
		super();
	}

	public Tasks(String taskName, String deadline, String priority) {
		super();
		this.taskName = taskName;
		this.deadline = deadline;
		this.priority = priority;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}
	
	
	
}
