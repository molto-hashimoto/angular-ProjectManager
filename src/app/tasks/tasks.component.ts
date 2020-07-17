import { Project } from './../interfaces/project';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from './../services/task.service';
import { Task } from './../interfaces/task';
import { ProjectService } from './../services/project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  project_no: number;
  project_data: Project;
  isShowCompleted: boolean = false;

  dataSource = new MatTableDataSource([]);
  displayedColumns = this.taskService.taskColumns;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.route.paramMap.subscribe(map => {
      this.project_no = +map.get('no');
      this.project_data = this.projectService.getProject(this.project_no);
      this.dataSource.data = this.taskService.getNotCompletedData(this.project_no);
    });
  }
  private setDataSource() {
    if (this.isShowCompleted === true) {
      this.dataSource.data = this.taskService.getTasks(this.project_no);
    }
    else {
      this.dataSource.data = this.taskService.getNotCompletedData(this.project_no);
    }
  }
  showCompletedChanged() {
    this.setDataSource();
  }
  addTask(): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '600px',
      data: {new: true, taskData: this.taskService.getNewTask(this.project_no, this.dataSource.data)}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result === 1 && result != null) {
        this.taskService.addTask(result.data);
        this.projectService.addTask(this.project_no);
        this.setDataSource();
      }
    });
  }
  onClicktaskName(taskData: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '600px',
      data: {new: false, taskData: this.taskService.getTask(taskData.project_no, taskData.no)}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.result === 1) {
          this.taskService.setTask(result.data);
        }
        else if (result.result === -1) {
          this.taskService.delTask(result.data);
          this.projectService.delTask(this.project_no);
        }
        else {}
        this.setDataSource();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
