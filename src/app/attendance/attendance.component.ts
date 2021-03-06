import { DefaultComponent } from './default/default.component';
import { MatDialog } from '@angular/material/dialog';
import { Attendance } from './../interfaces/attendance';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from './../services/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  dataSource = new MatTableDataSource(this.attendanceService.getAllData());
  displayedColumns = this.attendanceService.attendanceColumns;
  totalTime = '0:00';
  totalDays = 0;

  constructor(
    private attendanceService: AttendanceService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.update();
  }
  save() {
    this.snackbar.open('保存しました', null, {
      duration: 2000
    });
  }

  update() {
    this.totalTime = this.attendanceService.calcTotalTime();
    this.totalDays = this.attendanceService.calcTotalDays();
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
