import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
      var dataUrl = "https://spring-boot.tiramisu.localhost/login";
      var xhr = new XMLHttpRequest();
      xhr.open('POST', dataUrl, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      var data = JSON.stringify(this.loginForm.value);
  
      xhr.send(data);  
      let a = this;
      var status;
      xhr.onload = function(){
        a.routerLink(xhr.status);
      } 
    }
    //console.log("died");
  }

  routerLink(status: number){
    console.log(status);
    if(status == 200){
      console.log("success");
      this.router.navigate(['/user/record']);
    }
    else{
      console.log("failed");
    }
  }

  logout() {
    this.login$ = of(false);
  }
}
