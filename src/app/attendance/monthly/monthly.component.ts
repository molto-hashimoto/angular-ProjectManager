import { AttendanceService } from './../../services/attendance.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {

  dataSource = new MatTableDataSource(this.attendanceService.getMothlyData());
  displayedColumns = this.attendanceService.monthlyColumns;
  totalTime = '0:00';
  totalDays = 0;

  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.update();
  }
  update() {
    this.dataSource.data = this.attendanceService.getMothlyData();
    const total = this.attendanceService.calcYearlyTotal();
    this.totalTime = total.time;
    this.totalDays = total.days;
  }
  shift_year(shitf: number) {
    this.attendanceService.setMonthlyData(shitf);
    this.update();
  }
  click_Daily() {
    this.router.navigate(['/attendance']);
  }
  click_Monthly() {
    this.router.navigate(['/attendance/monthly']);
  }
  click_Chart() {
    this.router.navigate(['/attendance/chart'])
  }

}
