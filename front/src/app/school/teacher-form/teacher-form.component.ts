import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss'
})
export class TeacherFormComponent {

  teacherForm: FormGroup;
  classes: string[] = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  id: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService
  ){
    this.teacherForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      classAssigned: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService.getUserById(this.id, "teacher").subscribe((user: any) => {
        this.teacherForm.patchValue(user);
      });
    }
  }

  get classFormArray() {
    return this.teacherForm.get('classAssigned') as FormArray;
  }

  onClassChange(event: any) {
    const formArray: FormArray = this.classFormArray;
    const selectedClasses = event.value;

    formArray.clear();
    selectedClasses.forEach((cls: string) => {
      formArray.push(this.fb.control(cls));
    });
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      if (this.id) {
        this.userService.updateUser(this.id, this.teacherForm.value, "teacher").subscribe(() => {
          this.router.navigate(['/school']);
        });
      } else {
        this.userService.createUser(this.teacherForm.value, "teacher").subscribe(() => {
          this.router.navigate(['/school']);
        });
      }
    }
  }
}
