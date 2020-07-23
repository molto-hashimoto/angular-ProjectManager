import { DefaultComponent } from './default/default.component';
import { MatDialog } from '@angular/material/dialog';
import { Attendance } from './../interfaces/attendance';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from './../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  dataSource = new MatTableDataSource(this.attendanceService.getAllData());
  displayedColumns = this.attendanceService.attendanceColumns;
  totalWorkTime = '00:00';
  totalWorkingDays = 0;

  constructor(
    private attendanceService: AttendanceService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  save() { }

  click_monthly() {
    this.router.navigate(['/attendance/monthly']);
  }
  click_chart() {
    this.router.navigate(['/attendance/chart']);
  }

  update() {
    this.totalWorkTime = this.attendanceService.calcTotalWorkTime();
    this.totalWorkingDays = this.attendanceService.calcWorkingDays();
  }

  shiftMonth(shift: number) {
    this.attendanceService.setAttendanceData(shift);
    this.dataSource.data = this.attendanceService.getAllData();
    this.update();
  }
  calcWorkTime(element: Attendance) {
    this.attendanceService.calcWorkTime(element);
    this.update();
  }
  openDefaultDialog() {
    const dialogRef = this.dialog.open(DefaultComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result === 1 && result != null) {
        this.attendanceService.setDefaultTime(result.data);
        this.update();
      }
    });
  }
}
