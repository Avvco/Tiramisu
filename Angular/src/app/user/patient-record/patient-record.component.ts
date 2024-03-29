import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'
import { Router } from '@angular/router';

import { GET_RECORD_API } from '../../util/APIHandler';
import { set_record } from 'src/app/util/RecordSupport';
import { getUserName, getAccessToken, removeAccessToken } from 'src/app/util/UserTokenController';
import { verify_data } from 'src/app/util/VerifySupport';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})

@Injectable()
export class PatientRecordComponent implements OnInit {

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
      system: new FormControl('email'),
      use: new FormControl('home'),
      value: new FormControl('')
    }),

    address: new FormGroup({
      text: new FormControl(''),
    }),

    active: new FormControl('true'),

    birthDate: new FormControl(''),
  });

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    verify_data();

    let user = getUserName();
    let res = await GET_RECORD_API(user)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err);
      });

    let size = res.entry.length;
    let data = res.entry[0].resource;
    set_record(data);
  }

}
