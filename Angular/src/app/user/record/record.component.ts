import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';

import { FormSetter } from './using/form-setter';
import { POST_RECORD_API, GET_RECORD_API, GET_LOGOUT_API } from '../../util/APIHandler';
import { removeAccessToken } from 'src/app/util/UserTokenHandler';
import { verifySingleData, verifyAllData, uploadAllDataOnchain } from 'src/app/util/RecordSupport';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})

@Injectable()
export class RecordComponent implements OnInit {

  private _requestUrl: string = "https://spring-boot.tiramisu.localhost"

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

  constructor(private http: HttpClient) { }
  login$: Observable<boolean> | undefined;
  ngOnInit(): void {
    this.login$ = of(true);
  }

  async addRecord(): Promise<void> {
    console.log("addRecord");


    let isValidNow = await verifyAllData();
    if (!isValidNow) {
      return;
    }

    await POST_RECORD_API(this.record.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    uploadAllDataOnchain();
  }

  async getRecord(): Promise<void> {
    console.log("getRecord");

    let isValidNow = await verifyAllData();
    if (!isValidNow) {
      return;
    }

    let searchVal = (document.getElementById('search-value') as HTMLInputElement).value;

    GET_RECORD_API(searchVal)
      .then((res) => {
        console.log(res);
        const form_setter = new FormSetter(res.data);
        form_setter.setForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    console.log("logout");
    GET_LOGOUT_API()
      .then((res) => {
        console.log(res);
        this.login$ = of(false);
        removeAccessToken();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
