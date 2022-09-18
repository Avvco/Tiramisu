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

  addRecord(): void {
    const record = new HealthRecord(
      this.firstDate, this.recordId,
      this.firstname, this.patientName, this.birthDate, this.gender,
      this.personId, this.contactPhone, this.actionPhone, this.address, this.valid,
      this.profession, this.marriage,
      this.blood, this.drugAllergy,
      this.contactAddress, this.freePaper,
      this.newsletter, this.emailAddress,
      this.emergencyContact, this.relationship, this.emergencyContactPhone,
      this.height, this.weight, this.BMI,
      this.waistline, this.pressure, this.pulse,
      this.weightchange, this.cigarette,
      this.betel, this.alcohol, this.sport,
    );
    console.log(record);
  }

  testRecord(): void {
    console.log("Enter test mode");

    (document.getElementsByName('patientName')[0] as HTMLInputElement).value="123";

    var dataUrl= "https://spring-boot.tiramisu.localhost/forward_to_fhir/metadata";
    var xhr = new XMLHttpRequest();
    xhr.open('GET',dataUrl, true);
    xhr.send();
    xhr.onload = function(){
        var data = JSON.parse(this.responseText);
        console.log(data);
    }
    
  }

}
