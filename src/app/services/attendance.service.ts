import { Attendance, Monthly } from './../interfaces/attendance';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  today: Date;
  nowYear: number;
  nowMonth: number;

  dayOfWeekStr = [ '日', '月', '火', '水', '木', '金', '土'];
  attendanceColumns: string[] = ['date', 'dayOfWeek', 'start', 'end', 'rest', 'work', 'note'];
  attendanceData: Attendance[] = [];

  monthlyColumns: string[] = ['year', 'month', 'totalDays', 'totalTime'];
  monthlyData: Monthly[] = [
    {year: 2020, month: 1, totalDays: 18, totalTime: '160:00'},
    {year: 2020, month: 2, totalDays: 20, totalTime: '170:00'},
    {year: 2020, month: 3, totalDays: 21, totalTime: '175:00'},
    {year: 2020, month: 4, totalDays: 23, totalTime: '160:00'},
    {year: 2020, month: 5, totalDays: 20, totalTime: '152:00'},
    {year: 2020, month: 6, totalDays: 21, totalTime: '180:00'},
    {year: 2020, month: 7, totalDays: 20, totalTime: '162:00'},
    {year: 2020, month: 8, totalDays: 20, totalTime: '160:00'},
    {year: 2020, month: 9, totalDays: 20, totalTime: '170:00'},
    {year: 2020, month: 10, totalDays: 20, totalTime: '180:00'},
    {year: 2020, month: 11, totalDays: 21, totalTime: '160:00'},
    {year: 2020, month: 12, totalDays: 20, totalTime: '158:00'},
  ];

  constructor() {
    this.today = new Date();
    this.setAttendanceData(0);
  }

  getAllData(): Attendance[] {
    return this.attendanceData;
  }
  setAttendanceData(shiftMonth: number) {

    this.attendanceData = [];

    this.today.setMonth(this.today.getMonth() + shiftMonth);
    const thisYear = this.today.getFullYear();
    const thisMonth = this.today.getMonth();
    const dayNum = this.getDayNum(thisYear, thisMonth + 1);

    for (let cnt = 0; cnt < dayNum; cnt++) {
      let thisDay = new Date(thisYear, thisMonth, (cnt + 1));
      this.attendanceData.push(
        {date: (thisMonth + 1) + '/' + thisDay.getDate(),
         dayOfWeek: this.dayOfWeekStr[thisDay.getDay()],
         start: '00:00',
         end: '00:00',
         rest: '00:00',
         work: '00:00',
         note: ''}
      );
    }
  }
  private getDayNum(year, month) {
    return new Date(year, month, 0).getDate();
  }

  calcWorkTime(element: Attendance) {
    let startTime = element.start.split(':').map(Number);
    let endTime = element.end.split(':').map(Number);
    let restTime = element.rest.split(':').map(Number);

    let workTime = ((endTime[0] * 60 + endTime[1]) - (startTime[0] * 60 + startTime[1]) - (restTime[0] * 60 + restTime[1]));
    let workHour = Math.floor(workTime / 60);
    let workMinute = (workTime - (workHour * 60));
    element.work = `${('0' + workHour).slice(-2)}:${('0' + workMinute).slice(-2)}`;
  }
  calcTotalWorkTime() {
    let totalMinute = 0;
    for (let element of this.attendanceData) {
      let workTimeHourMin = element.work.split(':').map(Number);
      totalMinute += (workTimeHourMin[0] * 60 + workTimeHourMin[1]);
    }
    let hour = Math.floor(totalMinute / 60);
    let minute = (totalMinute - (hour * 60));
    return `${('0' + hour).slice(-3)}:${('0' + minute).slice(-2)}`;
  }
  calcWorkingDays() {
    let workingDays = 0;
    for (let element of this.attendanceData) {
      if (element.work !== '00:00') {
        workingDays++;
      }
    }
    return workingDays;
  }
  setDefaultTime(data: Attendance) {

    this.calcWorkTime(data);

    for (let element of this.attendanceData) {
      if (element.dayOfWeek !== '土' && element.dayOfWeek !== '日') {
        element.start = data.start;
        element.end = data.end;
        element.rest = data.rest;
        element.work = data.work;
      }
    }
  }
  getMothlyData(): Monthly[] {
    return this.monthlyData;
  }
  setMonthlyData() {

  }
}
