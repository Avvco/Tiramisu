import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  register$: Observable<boolean> | undefined;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      identitybox: ['', Validators.required],
      username: ['', Validators.required], 
      password: ['', Validators.required], //, Validators.pattern('^[a-zA-Z0-9-_]{5,20}')
      email: ['', [Validators.required, Validators.email]]
    })
    this.register$ = of(true);
  }
  get identitybox() { return this.registerForm.get('identitybox'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email') }
  submit() {
    if (this.registerForm.valid) {
      console.log("success");
      this.router.navigate(['/user/record']);
    }
    console.log("died");
  }
  logout() {
    this.register$ = of(false);
  }
}
