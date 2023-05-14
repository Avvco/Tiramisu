import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'


import { POST_RECORD_API, GET_RECORD_API } from '../../util/APIHandler';
import { set_record } from 'src/app/util/RecordSupport';
import { uploadAllDataOnchain } from 'src/app/util/MerkleSupport';
import { verify_data } from 'src/app/util/VerifySupport';


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

  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  async addRecord(): Promise<void> {
    console.log("addRecord");

    // await uploadAllDataOnchain(); //for renew

    await verify_data();

    let res = await POST_RECORD_API(this.record.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error:")
        console.log(err);
      });

    await uploadAllDataOnchain();
  }

  async getRecord(): Promise<void> {
    console.log("getRecord");

    verify_data();

    let searchVal = (document.getElementById('search-value') as HTMLInputElement).value;

    let res = await GET_RECORD_API(searchVal)
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

  // logout() {
  //   console.log("logout");
  //   GET_LOGOUT_API()
  //     .then((res) => {
  //       console.log(res);
  //       this.login$ = of(false);
  //       removeAccessToken();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
