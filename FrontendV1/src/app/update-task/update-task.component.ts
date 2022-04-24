import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  signUpForm!: FormGroup;
  task!:Task;
  id!:number;

  constructor(private frmBuilder: FormBuilder, private  taskService: TaskService, private router: Router, private route:ActivatedRoute) {
    this.signUpForm= frmBuilder.group({
      taskName:['',Validators.required],
      deadline:['',Validators.required],
      priority:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.taskService.getTaskById(this.id).subscribe(data => {
      console.log(data)
      this.task = data;
    });
  }

  onSubmit(signUpForm: any){
    this.task= new Task(signUpForm.controls.taskName.value, signUpForm.controls.deadline.value, signUpForm.controls.priority.value);
    console.log(this.task);
    this.taskService.updateTask(this.id,this.task).subscribe(data =>{
      console.log(data);
      this.goToTaskList();
    });
  }

  goToTaskList(){
    this.router.navigate(['/list']);
  }

  close(){
    this.router.navigate(['/list']);
  }

  
 
}
