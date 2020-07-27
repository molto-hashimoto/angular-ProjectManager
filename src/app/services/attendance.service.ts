import { Attendance, Monthly } from './../interfaces/attendance';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  thisYear: number;
  today: Date;

  dayOfWeekStr = [ '日', '月', '火', '水', '木', '金', '土'];
  attendanceColumns: string[] = ['date', 'dayOfWeek', 'start', 'end', 'rest', 'work', 'note'];
  attendanceData: Attendance[] = [];

  monthlyColumns: string[] = ['year', 'month', 'totalDays', 'totalTime'];
  monthlyData: Monthly[] = [
    {year: 2020, month: 1, totalDays: 18, totalTime: '160:00'},
    {year: 2020, month: 2, totalDays: 20, totalTime: '170:15'},
    {year: 2020, month: 3, totalDays: 21, totalTime: '175:00'},
    {year: 2020, month: 4, totalDays: 23, totalTime: '160:30'},
    {year: 2020, month: 5, totalDays: 18, totalTime: '152:00'},
    {year: 2020, month: 6, totalDays: 21, totalTime: '180:00'},
    {year: 2020, month: 7, totalDays: 20, totalTime: '162:45'},
    {year: 2020, month: 8, totalDays: 20, totalTime: '160:00'},
    {year: 2020, month: 9, totalDays: 20, totalTime: '170:00'},
    {year: 2020, month: 10, totalDays: 20, totalTime: '180:00'},
    {year: 2020, month: 11, totalDays: 21, totalTime: '160:00'},
    {year: 2020, month: 12, totalDays: 20, totalTime: '158:00'},
  ];

  constructor() {
    this.today = new Date();
    this.setAttendanceData(0);

    this.thisYear = this.today.getFullYear();
// ダミーデータを表示するためコメントアウト
//    this.setMonthlyData(0);
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

    // DBから該当年月のデータを取得 無かった場合は以下で初期化

    for (let cnt = 0; cnt < dayNum; cnt++) {
      const thisDay = new Date(thisYear, thisMonth, (cnt + 1));
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
    const startTime = element.start.split(':').map(Number);
    const endTime = element.end.split(':').map(Number);
    const restTime = element.rest.split(':').map(Number);

    let workTime = ((endTime[0] * 60 + endTime[1]) - (startTime[0] * 60 + startTime[1]) - (restTime[0] * 60 + restTime[1]));
    if (workTime < 0) {
      workTime += (24 * 60);
    }
    const workHour = Math.floor(workTime / 60);
    const workMinute = (workTime - (workHour * 60));
    element.work = `${('0' + workHour).slice(-2)}:${('0' + workMinute).slice(-2)}`;
  }
  calcTotalTime() {
    let totalMinute = 0;
    for (const element of this.attendanceData) {
      const workTimeHourMin = element.work.split(':').map(Number);
      totalMinute += (workTimeHourMin[0] * 60 + workTimeHourMin[1]);
    }
    const hour = Math.floor(totalMinute / 60);
    const minute = (totalMinute - (hour * 60));
    return `${hour}:${('0' + minute).slice(-2)}`;
  }
  calcTotalDays() {
    let workingDays = 0;
    for (const element of this.attendanceData) {
      if (element.work !== '00:00') {
        workingDays++;
      }
    }
    return workingDays;
  }
  setDefaultTime(data: Attendance) {

    this.calcWorkTime(data);

    for (const element of this.attendanceData) {
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
  setMonthlyData(shiftYear: number) {
    this.thisYear += shiftYear;
    this.monthlyData = [];

    // DBから該当年のデータを取得

    for (let cnt = 1; cnt <= 12; cnt++) {
      this.monthlyData.push(
        { year: this.thisYear,
          month: cnt,
          totalDays: 0,
          totalTime: '00:00'
        });
    }
  }
  calcYearlyTotal() {
    let total = {time: '00:00', days: 0};
    let totalMinute = 0;

    for (const element of this.monthlyData) {
      const workTimeHourMin = element.totalTime.split(':').map(Number);
      totalMinute += (workTimeHourMin[0] * 60 + workTimeHourMin[1]);
      total.days += element.totalDays;
    }
    const hour = Math.floor(totalMinute / 60);
    const minute = (totalMinute - (hour * 60));
    total.time =  `${hour}:${('0' + minute).slice(-2)}`;
    return total;
  }
}
