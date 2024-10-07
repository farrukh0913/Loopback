import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent {

  tabNavigate: boolean = false;
  teachersData: any = [];
  studentsData: any = [];

  constructor(private userService: UserService){ }

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchTeacher();
  }

  fetchStudents() {
    this.userService.getUsers("student").subscribe((data) => {
      this.studentsData = data;
    });
  }
  
  fetchTeacher() {
    this.userService.getUsers("teacher").subscribe((data) => {
      this.teachersData = data;
    });
  }

  deleteUser(id: string, delFor: string): void {
    this.userService.deleteUser(id, delFor).subscribe(() => {
      if (delFor === "teacher"){
        this.fetchTeacher();
        return;
      }
      this.fetchStudents();
    });
  }
}
