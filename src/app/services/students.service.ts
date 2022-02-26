import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Student } from '../models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  students: Student[] = [];

  constructor(private http: HttpClient) {}

  
  getStudents() {
    return this.http.get<Student[]>('../assets/students.json').pipe(tap(res => {
      this.students = res;
    }))
  }

  getAllStudents() {
    return this.students;
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  updateStudent(studentId: any, newStudent: Student) {
    let index = this.students.findIndex(el => {
      return el.studentId == studentId;
    });
    this.students[index] = newStudent;
  }

  deleteStudent(studentId: any) {
    let index = this.students.findIndex(el => {
      return el.studentId == studentId;
    });
    this.students.splice(index, 1);
  }
}
