import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';
import { Directive, ElementRef, Input } from '@angular/core'
import { Router } from '@angular/router';


import { add_observation, add_medication } from 'src/app/util/HistorySupport';
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
    observation : new FormGroup({
      resourceType: new FormControl('Observation'),
      identifier: new FormControl(''),

      effectiveDateTime: new FormControl(''), // when to visit
      performer: new FormControl(''), // which staff
      code: new FormControl(''), // what problem
      method: new FormControl(''), // how to handle
    }),

    medication : new FormGroup({
      resourceType: new FormControl('Medication'),
      identifier: new FormControl(''),

      code: new FormControl(''), // medication name
      marketingAuthorizationHolder: new FormControl(''), // medication production
      totalVolume: new FormControl(''), // total medication
      definition: new FormControl(''), // how to use
      batch: new FormGroup({
        lotNumber: new FormControl(''), // give day
      }),
    })
  });

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {

  }

  async search_patient_history(): Promise<void> {
    let searchVal = (document.getElementById('search-value') as HTMLInputElement).value;
    console.log(searchVal);
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
}
