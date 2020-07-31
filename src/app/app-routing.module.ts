import { HomeComponent } from './home/home.component';
import { ChartComponent } from './attendance/chart/chart.component';
import { MonthlyComponent } from './attendance/monthly/monthly.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'tasks/:no',
    component: TasksComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'attendance/monthly',
    component: MonthlyComponent
  },
  {
    path: 'attendance/chart',
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
