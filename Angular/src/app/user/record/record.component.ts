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

    console.log(data);

    xhr.send(data);
  }

  getRecord(): void {
    //(document.getElementsByName('patientName')[0] as HTMLInputElement).value="123";

    console.log("getRecord");
    var searchVal = (document.getElementsByName('search-value')[0] as HTMLInputElement).value;

    var requestUrl = "https://fhir.tiramisu.localhost/fhir/Patient?identifier=";
    var dataUrl = requestUrl + searchVal;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.send();
    xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      console.log(data);

      console.log(data.entry[0].resource.identifier[0].value);

      console.log(data.entry[0].resource.identifier[0].value);
      (document.getElementsByName('identifier-value')[0] as HTMLInputElement).value=data.entry[0].resource.identifier[0].value;
    
      console.log(data.entry[0].resource.name[0].family);
      (document.getElementsByName('name-family')[0] as HTMLInputElement).value=data.entry[0].resource.name[0].family;
      
      console.log(data.entry[0].resource.name[0].given);
      (document.getElementsByName('name-given')[0] as HTMLInputElement).value=data.entry[0].resource.name[0].given;

      console.log(data.entry[0].resource.gender);
      if(data.entry[0].resource.gender == "male"){
        (document.getElementsByName('gender-male')[0] as HTMLInputElement).checked=true;
      }
      else{
        (document.getElementsByName('gender-female')[0] as HTMLInputElement).checked=true;
      }

      console.log(data.entry[0].resource.telecom[0].value);
      (document.getElementsByName('telecom-value')[0] as HTMLInputElement).value=data.entry[0].resource.telecom[0].value;

      console.log(data.entry[0].resource.address[0].city);
      (document.getElementsByName('address-city')[0] as HTMLInputElement).value=data.entry[0].resource.address[0].city;

      console.log(data.entry[0].resource.birthDate);
      (document.getElementsByName('birthDate')[0] as HTMLInputElement).value=data.entry[0].resource.birthDate;

    }
  }

}
