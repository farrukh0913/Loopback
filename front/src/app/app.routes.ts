import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { SchoolListComponent } from './school/school-list/school-list.component';
import { StudentFormComponent } from './school/student-form/student-form.component';
import { TeacherFormComponent } from './school/teacher-form/teacher-form.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'users/new', component: UserFormComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/edit/:id', component: UserFormComponent },
    { path: 'school', component: SchoolListComponent },
    { path: 'student/new', component: StudentFormComponent },
    { path: 'student/edit/:id', component: StudentFormComponent },
    { path: 'teacher/new', component: TeacherFormComponent },
    { path: 'teacher/edit/:id', component: TeacherFormComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
  ];