import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of} from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';

import { FormSetter } from './using/form-setter';
import { tokenHandler } from './using/token-handler';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})

@Injectable()
export class RecordComponent implements OnInit {

  constructor(private http: HttpClient) { }
  login$: Observable<boolean> | undefined;
  ngOnInit(): void {
    this.login$ = of(true);
  }

  record = new FormGroup({
    resourceType: new FormControl('Patient'),

    identifier: new FormGroup({
      use: new FormControl('official'),
      type: new FormControl('Student ID'),
      value: new FormControl('')
    }),

    name: new FormGroup({
      use: new FormControl('official'),
      family: new FormControl(''),
      given: new FormControl('')
    }),

    gender: new FormControl(''),

    telecom: new FormGroup({
      system: new FormControl('phone'),
      use: new FormControl('mobile'),
      value: new FormControl('')
    }),

    address: new FormGroup({
      use: new FormControl('home'),
      type: new FormControl('physical'),
      city: new FormControl(''),
      district: new FormControl('小港區'),
      line: new FormControl('大馬路999號'),
      postalCode: new FormControl('812'),
      country: new FormControl('TW')
    }),
    
    active: new FormControl('true'),

    birthDate: new FormControl('')
  });

  addRecord(): void {
    console.log("addRecord");

    var dataUrl = "https://spring-boot.tiramisu.localhost/forward_to_fhir/Patient";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', dataUrl, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify(this.record.value);

    let _tokenHandler = new tokenHandler();
    let _token = _tokenHandler.getAccessToken();

    if(_token != null){
      xhr.setRequestHeader('Authorization', _token);
    }
    else{
      console.log("token is null");
    }

    console.log(data);

    xhr.send(data);
  }

  getRecord(): void {
    console.log("getRecord");
    var searchVal = (document.getElementById('search-value') as HTMLInputElement).value;

    var requestUrl = "https://spring-boot.tiramisu.localhost/forward_to_fhir/Patient?identifier=";
    var dataUrl = requestUrl + searchVal;

    console.log(dataUrl);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);

    let _tokenHandler = new tokenHandler();
    let _token = _tokenHandler.getAccessToken();

    if(_token != null){
      xhr.setRequestHeader('Authorization', _token);
    }
    else{
      console.log("token is null");
    }
    
    xhr.send();
    
    xhr.onload = function () {      
      var data = JSON.parse(this.responseText);

      const setter = new FormSetter(data);
      setter.setForm();
    }

  }
  logout() {

    console.log("logout");
    /*var requestUrl = "https://spring-boot.tiramisu.localhost/logout";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl, true);
    xhr.send();*/

    this.login$ = of(false);

  }
}
