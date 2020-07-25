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

  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  shift_year(shitf: number) {
    this.attendanceService.setMonthlyData(shitf);
    this.dataSource.data = this.attendanceService.getMothlyData();
  }
  click_Daily() {
    this.router.navigate(['/attendance']);
  }
  click_Chart() {
    this.router.navigate(['/attendance/chart'])
  }

}
