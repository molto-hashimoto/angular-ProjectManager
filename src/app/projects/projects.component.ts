import { TaskService } from './../services/task.service';
import { TasksComponent } from './../tasks/tasks.component';
import { Project } from './../interfaces/project';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectService } from './../services/project.service';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  dataSource = new MatTableDataSource(this.projectService.getNotCompletedData());
  displayedColumns = this.projectService.projectColumns;
  isShowCompleted = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
  private setDataSource() {
    if (this.isShowCompleted === true) {
      this.dataSource.data = this.projectService.getAllData();
    }
    else {
      this.dataSource.data = this.projectService.getNotCompletedData();
    }
  }
  showCompletedChanged() {
    this.setDataSource();
  }
  addProject(): void {
    const dialogRef = this.dialog.open(ProjectDetailComponent, {
      width: '600px',
      data: {new: true, projectData: this.projectService.getNewProject()}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result === 1 && result != null) {
        this.projectService.addProject(result.data);
        this.setDataSource();
      }
    });
  }
  onClickProjectName(projectData: Project) {
    const dialogRef = this.dialog.open(ProjectDetailComponent, {
      width: '600px',
      data: {new: false, projectData: this.projectService.getProject(projectData.no)}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.result === 1) {
          this.projectService.setProject(result.data);
        }
        else if (result.result === -1) {
          this.projectService.delProject(result.data);
          this.taskService.delProjectTask(result.data.no);
        }
        else {}
        this.setDataSource();
      }
    });
  }
  onClickProjectTask(no: number) {
    this.router.navigate(['/tasks/' + String(no)]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
