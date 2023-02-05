import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { POST_REGISTER_API } from '../util/APIHandler';
import { getETHAddress } from './util/RegisterSupport';
import { registerHealthWorker, registerPatient } from '../util/contract/ContractSupportRegister';
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
    if (this.registerForm.valid) {
      let address: any = await getETHAddress();
      
      let data = {
        type: this.registerForm.value.type,
        userName: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        ethAddress: address[0]
      }

      if(data.type == "HEALTH_WORKER"){
        await registerHealthWorker();
      }
      else{
        await registerPatient();
      }
      
      // POST_REGISTER_API(data)
      //   .then((res) => {
      //     console.log(res);
      //     this.router.navigate(['/user/home']);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
    else {
      console.log("died");
    }
  }

  logout() {
    this.register$ = of(false);
  }
}
