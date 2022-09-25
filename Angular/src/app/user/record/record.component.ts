import { Component, OnInit } from '@angular/core';
import { HealthRecord } from './health-record';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  record = new FormGroup({
    recourceType: new FormControl('Patient'),

    name: new FormGroup({
      use: new FormControl('official'),
      text: new FormControl(''),
      family: new FormControl(''),
      given: new FormControl('')
    }),

    gender: new FormControl(''),

    telecom: new FormGroup({
      system: new FormControl('official'),
      value: new FormControl(''),
      use: new FormControl('mobile')
    }),

    address: new FormGroup({
      use: new FormControl('home'),
      type: new FormControl('physical'),
      text: new FormControl(''),
      line: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      postalCode: new FormControl(''),
      country: new FormControl('')
    }),
    
    active: new FormControl(''),

    birthDate: new FormControl('')
  });

  addRecord(): void {
    console.log("addRecord");
    
    console.log(this.record.value);

    var dataUrl = "https://spring-boot.tiramisu.localhost/forward_to_fhir/Patient";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', dataUrl, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    var data = JSON.stringify(this.record.value);
    xhr.send(data);
  }

  getRecord(): void {
    console.log("getRecord");

    //(document.getElementsByName('patientName')[0] as HTMLInputElement).value="123";

    var dataUrl = "https://spring-boot.tiramisu.localhost/forward_to_fhir/Patient";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.send();
    xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      console.log(data);
    }
  }

}
