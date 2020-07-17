import { DeleteReconfirmDialogComponent } from './../../delete-reconfirm-dialog/delete-reconfirm-dialog.component';
import { TaskDialog } from './../task-dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Task } from './../../interfaces/task';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  title: string;
  taskData: Task;

  constructor(
    private dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialog,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.data.new === true) {
      this.title = 'New Task';
    }
    else {
      this.title = this.data.taskData.name;
    }
    this.taskData = this.data.taskData;
  }
  onButtonClick(res: number) {
    if (res === -1) {
      const dialogRef = this.dialog.open(DeleteReconfirmDialogComponent, {
        width: '450px',
        data: this.taskData.name
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1 && result != null) {
          this.dialogRef.close({result: res, data: this.taskData});
        }
      });
    }
    else {
      this.dialogRef.close({result: res, data: this.taskData});
    }
  }
}
