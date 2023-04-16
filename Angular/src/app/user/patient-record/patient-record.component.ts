import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'


import { POST_RECORD_API, GET_RECORD_API, GET_LOGOUT_API } from '../../util/APIHandler';
import { getAccessToken, removeAccessToken } from 'src/app/util/UserTokenHandler';
import { verifySingleData, verifyAllData, uploadAllDataOnchain, setForm } from 'src/app/util/RecordSupport';
import { getUserName } from 'src/app/util/UserTokenHandler';
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
    // telecom: new FormGroup([
    //   new FormGroup({
    //     system: new FormControl('email'),
    //     use: new FormControl('work'),
    //     value: new FormControl('')
    //   }),
    //   new FormGroup({
    //     system: new FormControl('phone'),
    //     use: new FormControl('mobile'),
    //     value: new FormControl('')
    //   })
    // ]),

    address: new FormGroup({
      text: new FormControl(''),
    }),

    active: new FormControl('true'),

    birthDate: new FormControl(''),

  });

  constructor() { }

  async ngOnInit(): Promise<void> {
    // let user = await getUserName();
    let user = "yumeow0122"
    let res = await GET_RECORD_API(user)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(res.entry[0]);
    // let data = res.entry[0].resource;
    // setForm(data);
  }

}
