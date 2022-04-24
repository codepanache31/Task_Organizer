import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../task';
import { CLICKED } from './clicked';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  taskArr:Task[]=[];  //javascript array
  deletedTasks:Task[]=[];
  // isChecked:boolean = false;
  checkId!:number;
  isFirst:boolean=true;

  isPriority:boolean[]=[];

  isClicked:boolean[]= CLICKED;

  // isClicked:boolean[]=[];

  myClass!:string[];
  

  constructor(private taskService: TaskService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.taskService.getTaskList().subscribe(data =>{
      this.taskArr=data;
      console.log(JSON.stringify(this.taskArr));
      
    });
    if(this.isFirst){
      for(let i=0; i<this.taskArr.length; i++){
        this.isClicked[i]=false;
        this.isPriority[i]=false;
        console.log(i);
      }
      this.isFirst=false;
    }
    
    // this.getTasks();

  }


  private getTasks(){
    this.taskService.getTaskList().subscribe(data =>{
      this.taskArr=data;
      // console.log(JSON.stringify(this.taskArr));
    });
  }
  //   console.log('in getTasks');
    
  // }

  updateTask(id:number){
    this.router.navigate(['update', id]);
  }

  deleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(data =>{ 
    });
    this.getTasks();
  }

  // onCheckBox(id:number){
  //   this.isChecked = !this.isChecked;
  //   this.checkId=id;
  // }

  // toggle(){
  //   this.isClicked = !this.isClicked;
  //   // this.getClass(this.clicked);
  // }

  // getClass() {
  //   let flag = this.isClicked;
  //   let cssClass;
  //   if(flag==false){
  //     cssClass = {'unclicked':true}
  //   }else{
  //     cssClass = {'clicked':true}
  //   }
  //   return cssClass;
  // }

  myClick(i:number){
    this.isClicked[i] = !this.isClicked[i];
    this.isPriority[i] = !this.isPriority[i];
    this.ngOnInit();
    console.log('in myClick'+i);
  }

  // append(){
  //   for(let i=0; i<this.isClicked.length; i++){
  //     CLICKED.push(this.isClicked[i]);
  //   }
  //   this.router.navigate(['add']);
  // }


  // employeeDetails(id:number){
  //   this.router.navigate(['employee-details', id]);
  // }


}
