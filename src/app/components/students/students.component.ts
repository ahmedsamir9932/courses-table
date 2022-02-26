import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/students.model';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { DeleteStudentsComponent } from './delete-students/delete-students.component';
import { UpdateStudentsComponent } from './update-students/update-students.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  courses$: Observable<Course[]>;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  course: any;
  filteredString: string = 'all';

  constructor(private coursesService: CoursesService, private studentsService: StudentsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getAllCourses();
    this.studentsService.getStudents().subscribe(res => {
      this.getAllStudents();
    })
  }
  
  getAllStudents() {
    if(this.filteredString == 'all') {
      this.students = this.filteredStudents = this.studentsService.getAllStudents();
    } else {
      this.filterStudents(this.filteredString);
    }
  }

  filterByCourse(event: MatSelectChange) {
    this.filteredString = event.value;
    if(event.value == 'all') {
      this.filteredStudents = this.students;
    } else {
      this.filterStudents(event.value);
    }
  }

  filterStudents(filterStr: string) {
    this.filteredStudents = this.students.filter(el => {
      return el.coursesId.includes(filterStr);
    })
  }

  addStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '65%';
    const addDialog = this.dialog.open(UpdateStudentsComponent, dialogConfig);
    addDialog.afterClosed().subscribe(result => {
      this.getAllStudents();
    })
  }

  editStudent(student: Student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '65%';
    dialogConfig.data = {
      student: student
    }
    const editDialog =  this.dialog.open(UpdateStudentsComponent, dialogConfig);
    editDialog.afterClosed().subscribe(res => {
      this.getAllStudents();
    })
  }

  deleteStudent(studentId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    const deleteDialog =  this.dialog.open(DeleteStudentsComponent, dialogConfig);
    deleteDialog.afterClosed().subscribe(res => {
      if(!res) return;
      if(res.event == 'delete') {
        this.studentsService.deleteStudent(studentId);
        this.getAllStudents();
      }
    })
  }

}
