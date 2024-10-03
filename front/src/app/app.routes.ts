import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'users/new', component: UserFormComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/edit/:id', component: UserFormComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
  ];