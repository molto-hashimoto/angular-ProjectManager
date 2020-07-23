import { Attendance } from './../../interfaces/attendance';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  defaultData: Attendance = {
    date: '',
    dayOfWeek: '',
    start: '00:00',
    end: '00:00',
    rest: '00:00',
    work: '00:00',
    note: ''
  };

  constructor(
    private dialogRef: MatDialogRef<DefaultComponent>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }
  onButtonClick(res: number) {
    this.dialogRef.close({result: res, data: this.defaultData});
  }
}
