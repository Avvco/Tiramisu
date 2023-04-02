import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { setAccessToken } from '../util/UserTokenHandler';
import { POST_LOGIN_API } from '../util/APIHandler';
import { getETHAddress } from '../util/contract/address/userAddress';

import { loginHealthWorker, loginPatient } from '../util/LoginSupport';

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
  constructor(private router: Router, private fb: FormBuilder) {

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

  register() {
    this.router.navigate(['register']);
}

  async submit() {
    if (this.loginForm.valid) {
      // localStorage.setItem('login', 'true');

      // let address: any = await getETHAddress();
      // let data = {
      //   type: this.loginForm.value.type,
      //   userName: this.loginForm.value.userName,
      //   password: this.loginForm.value.password,
      //   email: this.loginForm.value.email,
      //   ethAddress: address[0]
      // }

      // if (data.type == "HEALTH_WORKER") {
      //   await loginHealthWorker(data, this);
      // }
      // else {
      //   await loginPatient(data, this);
      // }
      this.router.navigate(['../user/record']);
    }
    else {
      alert("Username or password is incorrect");
      console.log("died");
    }
  }
}
