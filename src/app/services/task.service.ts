import { Task } from './../interfaces/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskColumns: string[] = ['no', 'name', 'status', 'operator', 'start', 'end'];
  taskData: Task[] = [
    {no: 2, name: 'cooding', project_no: 1, status: 'New', operator: 'hashimoto', start: new Date(), end: new Date(), note: ''},
    {no: 1, name: 'design', project_no: 1, status: 'Completed', operator: 'hashimoto', start: new Date(), end: new Date(), note: ''},
    {no: 2, name: 'design', project_no: 3, status: 'Working', operator: 'hashimoto', start: new Date(), end: new Date(), note: ''},
    {no: 1, name: 'design', project_no: 3, status: 'Working', operator: 'hashimoto', start: new Date(), end: new Date(), note: ''},
  ];

  constructor() { }

  getTasks(project_no: number): Task[] {
    return this.taskData.filter((data) => {
      return (data.project_no === project_no);
    });
  }
  getNotCompletedData(project_no: number): Task[] {
    return this.taskData.filter((data) => {
      return (data.project_no === project_no && data.status !== 'Completed');
    });
  }
  getNewTask(prjNo: number, tasks: Task[]): Task {
    let lastNo: number;
    const noList = tasks.map((data) => {
      return data.no;
    });
    if (noList.length === 0) {
      lastNo = 0;
    }
    else {
      lastNo = Math.max.apply(null, noList);
    }
    return {
      no: lastNo + 1,
      name: '',
      project_no: prjNo,
      status: 'New',
      operator: '',
      start: new Date(),
      end: new Date(),
      note: ''
    };
  }
  getTask(prjNo: number, no: number) {
    const target = this.taskData.find((data) => {
      return (data.no === no && data.project_no === prjNo);
    });
    return Object.assign({}, target);
  }
  setTask(taskData: Task) {
    const idx = this.taskData.findIndex((data) => {
      return (data.no === taskData.no && data.project_no === taskData.project_no);
    });
    this.taskData[idx] = taskData;
  }
  addTask(taskData: Task) {
    this.taskData.unshift(taskData);
  }
  delTask(taskData: Task) {
    const idx = this.taskData.findIndex((data) => {
      return (data.no === taskData.no && data.project_no === taskData.project_no);
    });
    this.taskData.splice(idx, 1);
  }
  delProjectTask(prjNo: number) {
    const maxCnt = this.taskData.length;
    for (let cnt = 0; cnt < maxCnt; cnt++) {
      const idx = this.taskData.findIndex((data) => {
        return (data.project_no === prjNo);
      });
      if (idx === -1) {
        break;
      }
      else {
        this.taskData.splice(idx, 1);
      }
    }
  }
}
