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
import { Router } from '@angular/router';
@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.scss']
})

@Injectable()
export class RecordHistoryComponent implements OnInit {

  record = new FormGroup({
    resourceType: new FormControl('Observation'),

    identifier: new FormControl(''),
    effectiveDateTime: new FormControl(''),
    performer: new FormControl(''),
    code: new FormControl(''),
    method: new FormControl(''),

    // a: new FormGroup({
    //   b: new FormControl('official'),
    // }),
  });

  medication = new FormGroup({
    identifier: new FormControl(''),
    effectiveDateTime: new FormControl(''),

    a: new FormGroup({
      b: new FormControl('official'),
    }),


  });
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    let token = getAccessToken();
    console.log(token);
    if (getAccessToken() == null) {
      alert("please login first.");
      this.router.navigate(['../login']);
    }

    let user = getUserName();
    // let user = "123"
    let res = await GET_RECORD_API(user)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(res.entry[0].resource);
    let data = res.entry[0].resource;
    setForm(data);
  }

}
