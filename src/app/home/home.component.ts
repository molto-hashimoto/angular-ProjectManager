import { Attendance } from './../interfaces/attendance';
import { AttendanceService } from './../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  now$: Observable<Date>;
  intervalList = [];
  startTime = '09:00';
  endTime = '18:00';
  restTime = '01:00';
  attendance: Attendance[];
  today: number;

  constructor(
    private attendanceService: AttendanceService
  ) {
    this.today = (new Date()).getDate() - 1;
    this.attendance = this.attendanceService.getAllData();
  }

  ngOnInit(): void {
    this.now$ = new Observable((observer) => {
      setInterval(() => {
        observer.next(new Date());
      }, 1000);
    });
  }
  save() {

  }
  calcWorkTime(element: Attendance) {
    this.attendanceService.calcWorkTime(element);
  }
  clickStampingStart () {
    const now = new Date();
    let thisHours = now.getHours();
    let thisMinutes = now.getMinutes();
    thisMinutes = (Math.floor(thisMinutes / 15) + 1) * 15;
    if (thisMinutes === 60) {
      thisHours += 1;
      thisMinutes = 0;
    }
    this.attendance[this.today].start = `${('0' + thisHours).slice(-2)}:${('0' + thisMinutes).slice(-2)}`;
    this.attendanceService.calcWorkTime(this.attendance[this.today]);
  }
  clickStampingEnd() {
    const now = new Date();
    let thisHours = now.getHours();
    let thisMinutes = now.getMinutes();
    thisMinutes = Math.floor(thisMinutes / 15) * 15;
    this.attendance[this.today].end = `${('0' + thisHours).slice(-2)}:${('0' + thisMinutes).slice(-2)}`;
    this.attendanceService.calcWorkTime(this.attendance[this.today]);
  }
}