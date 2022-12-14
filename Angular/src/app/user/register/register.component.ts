import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { POST_REGISTER_API } from '../request/api';
import { RegisterSupport } from '../blockchain/register-support';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  
  private _registerSupport: RegisterSupport = new RegisterSupport();

  register$: Observable<boolean> | undefined;
  constructor(private router: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      type: ['', Validators.required],
      userName: ['', Validators.required], 
      password: ['', Validators.required], //, Validators.pattern('^[a-zA-Z0-9-_]{5,20}')
      email: ['', [Validators.required, Validators.email]],
    })
    this.register$ = of(true);
  }
  
  get type() { return this.registerForm.get('type'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email') }

  async submit() {
    if(this.registerForm.valid){


      console.log("can register");

      let address:any = await this._registerSupport.get_account();
      let data = {
        type: this.registerForm.value.type,
        userName: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        email: this.registerForm.value.userName,
        ethAddress: address[0]
      }
      console.log(data);

      /*POST_REGISTER_API(this.registerForm.value)
        .then((res) => {
          console.log(res);
          this.router.navigate(['/user/home']);
        })
        .catch((err) => {
          console.log(err);
        });*/
    }
    else{
      console.log("died");
    }
  }

  logout() {
    this.register$ = of(false);
  }

  getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
