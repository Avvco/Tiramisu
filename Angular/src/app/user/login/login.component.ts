import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { setAccessToken } from '../util/UserTokenHandler';
import {POST_LOGIN_API} from '../util/APIHandler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  
  private _requestUrl: string = "https://spring-boot.tiramisu.localhost"

  login$: Observable<boolean> | undefined;
  constructor(private router: Router, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      type: ['', Validators.required],
      userName: ['', Validators.required], 
      password: ['', Validators.required], //, Validators.pattern('^[a-zA-Z0-9-_]{5,20}')
      email: ['', [Validators.required, Validators.email]]
    })
    this.login$ = of(true);
  }
  get type() { return this.loginForm.get('type'); }
  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
  get email() { return this.loginForm.get('email') }

  submit() {
    if (this.loginForm.valid) {
      localStorage.setItem('login', 'true');

      let login = this;
      POST_LOGIN_API(this.loginForm.value)
        .then((res) => {
          console.log(res);
          setAccessToken(res.data.token);
          login._routerLink(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      console.log("died");
    }
  }

  private _routerLink(status: number){
    console.log(status);
    if(status == 200){
      console.log("success");
      this.router.navigate(['/user/record']);
    }
    else{
      console.log("failed");
    }
  }
}
