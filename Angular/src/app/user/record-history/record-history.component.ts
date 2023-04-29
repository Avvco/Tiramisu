import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'
import { Router } from '@angular/router';


import { add_observation, add_medication } from 'src/app/util/HistorySupport';
import { get_hitory_list, get_history } from 'src/app/util/HistorySupport';

import { POST_RECORD_API, GET_RECORD_API, GET_LOGOUT_API } from '../../util/APIHandler';
import { getAccessToken, removeAccessToken } from 'src/app/util/UserTokenHandler';
import { verifySingleData, verifyAllData, uploadAllDataOnchain, setForm } from 'src/app/util/RecordSupport';
import { getUserName } from 'src/app/util/UserTokenHandler';
@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.scss']
})

@Injectable()
export class RecordHistoryComponent implements OnInit {

  history = new FormGroup({
    observation: new FormGroup({
      resourceType: new FormControl('Observation'),
      identifier: new FormGroup({
        use: new FormControl(''),
        value: new FormControl(''), // give day
      }),

      code: new FormGroup({
        text: new FormControl(''), // what problem
      }),

      performer: new FormGroup({
        display: new FormControl(''), // which staff
      }),

      method: new FormGroup({
        text: new FormControl(''),
      }),

      effectiveDateTime: new FormControl(''), // when to visit      
    }),

    medication: new FormGroup({
      resourceType: new FormControl('Medication'),
      identifier: new FormGroup({
        use: new FormControl(''),
        value: new FormControl(''), // give day
      }),

      code: new FormGroup({
        coding: new FormGroup({
          display: new FormControl('') // medication use
        }),
        text: new FormControl('') // medication name
      }),
      totalVolume: new FormGroup({ // how to use
        value: new FormControl(''), // medication use
        unit: new FormControl('mg'), // medication use
        code: new FormControl('mg')

      }),
    })
  });

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {

  }

  async search_patient_history(): Promise<void> {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_hitory_list(pateintID, this);

      alert("search success.");
    }
    catch (err) {
      alert("search fail.");
    }
  }

  async add_history() {
    try {
      let med = this.history.value.medication;
      let obs = this.history.value.observation;

      add_observation(obs);
      add_medication(med);

      alert("add success.");
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h0() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 0, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h1() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 1, this);
    }
    catch (err) {
    }
  }

  async get_h2() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 2, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h3() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 3, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h4() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 4, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h5() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 5, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h6() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 6, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h7() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 7, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h8() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 8, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }

  async get_h9() {
    try {
      let pateintID = (document.getElementById('search-value') as HTMLInputElement).value;
      get_history(pateintID, 9, this);
    }
    catch (err) {
      alert("add fail.");
    }
  }
}