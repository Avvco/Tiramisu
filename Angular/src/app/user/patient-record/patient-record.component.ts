import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'


import { POST_RECORD_API, GET_RECORD_API, GET_LOGOUT_API } from '../../util/APIHandler';
import { removeAccessToken } from 'src/app/util/UserTokenHandler';
import { verifySingleData, verifyAllData, uploadAllDataOnchain } from 'src/app/util/RecordSupport';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})

@Injectable()
export class PatientRecordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
