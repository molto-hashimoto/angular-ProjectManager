import { Project } from './../interfaces/project';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectColumns: string[] = ['no', 'name', 'status', 'operator', 'partner'];
  projectData: Project[] = [
    {no: 4, name: 'DNavi', task: 0, status: 'New', operator: 'hashimoto', partner: 'AAA', note: ''},
    {no: 3, name: 'DP', task: 2, status: 'Working', operator: 'hashimoto', partner: 'BBB', note: ''},
    {no: 2, name: 'AI', task: 0, status: 'Completed', operator: 'hashimoto', partner: 'CCCC', note: ''},
    {no: 1, name: 'IoT', task: 2, status: 'Working', operator: 'hashimoto', partner: 'DDD', note: ''},
  ];

  constructor() { }

  getAllData(): Project[] {
    return this.projectData;
  }
  getNotCompletedData(): Project[] {
    return this.projectData.filter((data) => {
      return (data.status !== 'Completed');
    });
  }
  getNewProject(): Project {
    let lastNo: number;
    const noList = this.projectData.map((data) => {
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
      task: 0,
      status: 'New',
      operator: '',
      partner: '',
      note: ''
    }
  }
  getProject(no: number): Project {
    let target = this.projectData.find((data) => {
      return (data.no === no);
    });
    return Object.assign({}, target);
  }
  setProject(projectData: Project) {
    const idx = this.projectData.findIndex((data) => {
      return (data.no === projectData.no);
    });
    this.projectData[idx] = projectData;
  }
  addProject(projectData: Project) {
    this.projectData.unshift(projectData);
  }
  delProject(projectData: Project) {
    const idx = this.projectData.findIndex((data) => {
      return (data.no === projectData.no);
    });
    this.projectData.splice(idx, 1);
  }
  addTask(project_no: number) {
    let target = this.projectData.find((data) => {
      return (data.no === project_no);
    });
    target.task++;
  }
  delTask(project_no: number) {
    let target = this.projectData.find((data) => {
      return (data.no === project_no);
    });
    target.task--;
  }
}
