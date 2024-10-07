import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {

  studentForm: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ){
    this.studentForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      class: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService.getUserById(this.id, "student").subscribe((user: any) => {
        this.studentForm.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.id) {
        this.userService.updateUser(this.id, this.studentForm.value, "student").subscribe(() => {
          this.router.navigate(['/school']);
        });
      } else {
        this.userService.createUser(this.studentForm.value, "student").subscribe(() => {
          this.router.navigate(['/school']);
        });
      }
    }
  }
}
