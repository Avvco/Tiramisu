import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  login$: Observable<boolean> | undefined;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identitybox: [1],
      username: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      password: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      email: ['']
    })
    this.login$ = of(true);
  }
  get identitybox() { return this.loginForm.get('identitybox');}
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  get email() { return this.loginForm.get('email') }
  submit() {
    this.router.navigate(['/user/record']);
  }
  logout() {
    this.login$ = of(false);
}
}
