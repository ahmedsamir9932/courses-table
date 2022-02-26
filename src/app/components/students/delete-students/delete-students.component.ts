import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-students',
  templateUrl: './delete-students.component.html',
  styleUrls: ['./delete-students.component.css']
})
export class DeleteStudentsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteStudentsComponent>) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.dialogRef.close({
      event: 'delete'
    })
  }

  close() {
    this.dialogRef.close();
  }

}
