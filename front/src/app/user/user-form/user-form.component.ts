import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  userForm: FormGroup;
  id: string | null = null;
  subjects: string[] = ["english", "math", "urdu", "islamyat"];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cnic: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((user: any) => {
        this.userForm.patchValue(user);
      });
    }
  }

  get subjectFormArray() {
    return this.userForm.get('subject') as FormArray;
  }

  // Update FormArray based on user selection
  onSubjectChange(event: any) {
    const formArray: FormArray = this.subjectFormArray;
    const selectedSubjects = event.value;

    formArray.clear();
    selectedSubjects.forEach((subject: string) => {
      formArray.push(this.fb.control(subject));
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.id) {
        this.userService.updateUser(this.id, this.userForm.value).subscribe(() => {
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.createUser(this.userForm.value).subscribe(() => {
          this.router.navigate(['/users']);
        });
      }
    }
  }
}
