import { Component } from '@angular/core';
import { HealthRecord } from './health-record';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  firstDate = '';
  recordId = '';

  patientName = '';
  birthDate = '';
  gender = '';

  personId = '';
  contactPhone = '';
  actionPhone = '';

  profession = '';
  marriage = '';

  blood  = '';
  drugAllergy = '';

  contactAddress = '';
  freePaper = '';

  newsletter =  '';
  emailAddress = '';

  emergencyContact = '';
  relationship = '';
  emergencyContactPhone = '';

  addRecord(): void {
    const record = new HealthRecord(
     this.firstDate, this.recordId,
     this.patientName, this.birthDate, this.gender,
     this.personId, this.contactPhone, this.actionPhone,
     this.profession, this.marriage,
     this.blood, this.drugAllergy,
     this.contactAddress, this.freePaper,
     this.newsletter, this.emailAddress,
     this.emergencyContact, this.relationship, this.emergencyContactPhone
   );
   console.log(record);
  }

  testRecord(): void{
    console.log("Enter test mode");
    /*
    var dataUrl= "https://spring-boot.tiramisu.localhost/forward_to_fhir/metadata";
    var xhr = new XMLHttpRequest();
    xhr.open('GET',dataUrl, true);
    xhr.send();
    xhr.onload = function(){
        var data = JSON.parse(this.responseText);
        console.log(data);
    }
    */
  }
}