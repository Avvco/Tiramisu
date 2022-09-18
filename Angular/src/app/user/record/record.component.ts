import { Component, OnInit } from '@angular/core';
import { HealthRecord } from './health-record';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }
  /*
    firstDate = '';
    recordId = '';
  
    firstname = '';
    patientName = '';
    birthDate = '';
    gender = '';
  
    personId = '';
    contactPhone = '';
    actionPhone = '';
    address = '';
    valid = '';
  
    profession = '';
    marriage = '';
  
    blood = '';
    drugAllergy = '';
  
    contactAddress = '';
    freePaper = '';
  
    newsletter = '';
    emailAddress = '';
  
    emergencyContact = '';
    relationship = '';
    emergencyContactPhone = '';
  
    height = '';
    weight = '';
    BMI = '';
  
    waistline = '';
    pressure = '';
    pulse = '';
  
    weightchange = '';
    cigarette = '';
  
    betel = '';
    alcohol = '';
    sport = '';
  */
  recordId = '';
  firstname = '';
  lastname = '';
  gender = '';

  contactPhone = '';
  contactAddress = '';

  active = '';
  birthDate = '';

  addRecord(): void {
    console.log("addRecord");
    var flag = this.active=="true"?true:false;
    const record = new HealthRecord(
      this.recordId,
      this.firstname, this.lastname,
      this.gender,
      this.contactPhone, this.contactAddress,
      flag, this.birthDate
    );

    console.log(record);
    console.log(flag);

    var dataUrl = "https://spring-boot.tiramisu.localhost/forward_to_fhir/Patient";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', dataUrl, true);
    var data = JSON.stringify(record);
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
