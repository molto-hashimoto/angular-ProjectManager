import { DeleteReconfirmDialogComponent } from './../../delete-reconfirm-dialog/delete-reconfirm-dialog.component';
import { ProjectDialog } from './../project-dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../interfaces/project';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  title: string;
  projectData: Project;
  constructor(
    private dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDialog,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    if (this.data.new === true) {
      this.title = 'New Project';
    }
    else {
      this.title = this.data.projectData.name;
    }
    this.projectData = this.data.projectData;
  }
  onButtonClick(res: number) {
    if (res === -1) {
      const dialogRef = this.dialog.open(DeleteReconfirmDialogComponent, {
        width: '450px',
        data: this.projectData.name
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1 && result != null) {
          this.dialogRef.close({result: res, data: this.projectData});
        }
      });
    }
    else {
      this.dialogRef.close({result: res, data: this.projectData});
    }
  }
}
