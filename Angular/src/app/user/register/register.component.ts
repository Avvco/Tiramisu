import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
      type: ['', Validators.required],
      userName: ['', Validators.required], 
      password: ['', Validators.required], //, Validators.pattern('^[a-zA-Z0-9-_]{5,20}')
      email: ['', [Validators.required, Validators.email]]
    })
    this.register$ = of(true);
  }
  get type() { return this.registerForm.get('type'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email') }

  submit() {
    if (this.registerForm.valid) {
      console.log("can register");

      var dataUrl = "https://spring-boot.tiramisu.localhost/register";
      var xhr = new XMLHttpRequest();
      xhr.open('POST', dataUrl, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      var data = this.getFormData(this.registerForm.value);
  
      console.log(data);
  
      xhr.send(this.registerForm.value);      
      //this.router.navigate(['/user/home']);
    }
    //console.log("died");
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
