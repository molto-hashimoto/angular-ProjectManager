import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-reconfirm-dialog',
  templateUrl: './delete-reconfirm-dialog.component.html',
  styleUrls: ['./delete-reconfirm-dialog.component.scss']
})
export class DeleteReconfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteReconfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public target_name: string
  ) { }

  ngOnInit(): void {
  }
  onButtonClick(res: number): void {
    this.dialogRef.close(res);
  }
}
