import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../task';
import { CLICKED } from '../list-task/clicked';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  signUpForm!: FormGroup;
  task!:Task;

  constructor(private frmBuilder: FormBuilder, private  taskService: TaskService, private router: Router) {
    this.signUpForm= frmBuilder.group({
      taskName:['',Validators.required],
      deadline:['',Validators.required],
      priority:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(signUpForm: any){
    this.task= new Task(signUpForm.controls.taskName.value, signUpForm.controls.deadline.value, signUpForm.controls.priority.value);
    console.log(this.task);
    this.saveTask();
  }

  saveTask(){
    this.taskService.createTask(this.task).subscribe(data =>{
      console.log(data);
      this.goToTaskList();
      CLICKED.push(false);
    });
  }

  goToTaskList(){
    this.router.navigate(['/list']);
  }

  close(){
    this.router.navigate(['/list']);
  }

  get fName(){
    return this.signUpForm.get('fName');
  }

}
