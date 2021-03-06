import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
