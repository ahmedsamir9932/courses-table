import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';



@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get<Course[]>('../assets/courses.json');
  }
}
