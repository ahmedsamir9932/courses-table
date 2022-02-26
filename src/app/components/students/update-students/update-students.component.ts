import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/students.model';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-update-students',
  templateUrl: './update-students.component.html',
  styleUrls: ['./update-students.component.css']
})
export class UpdateStudentsComponent implements OnInit {

  courses$: Observable<Course[]>;
  editMode: boolean = false;
  studentForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<UpdateStudentsComponent>,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.editMode = this.data?.student ? true : false;
    console.log(this.editMode);
    
    this.courses$ = this.coursesService.getAllCourses();
    this.initForm();
  }

  initForm() {
    let studentName = '';
    let studentGrade = '';
    let coursesId = [];
    if(this.editMode) {
      studentName = this.data.student.name;
      studentGrade = this.data.student.grade;
      coursesId = this.data.student.coursesId;
    }
    this.studentForm = this.fb.group({
      'name': [studentName, [Validators.required, Validators.maxLength(20)]],
      'grade': [studentGrade, [Validators.required, Validators.maxLength(40)]],
      'coursesId': [coursesId, [Validators.required]]
    })
  }

  submitForm() {
    let stdForm = this.studentForm.value;
    let student: Student = {
      studentId: this.editMode ? this.data.student.studentId : Math.round(Math.random() * 999),
      ...stdForm
    }
    if(this.editMode) {
      this.studentsService.updateStudent(this.data.student.studentId, student);
    } else {
      this.studentsService.addStudent(student);
    }
    this.dialogRef.close();
  }







  onNoClick() {
    this.dialogRef.close()
  }

}
