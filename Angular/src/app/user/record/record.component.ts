import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of} from "rxjs";
import { FormGroup, FormControl } from '@angular/forms';

import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256';

import { FormSetter } from './using/form-setter';
import { POST_RECORD_API, GET_RECORD_API, GET_LOGOUT_API } from '../../util/APIHandler';
import { removeAccessToken } from 'src/app/util/UserTokenHandler';

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

  addRecord(): void {
    console.log("addRecord");

    const data = ['data1', 'data2', 'data3', 'data4'];
    const _data = ['data5', 'data6'];

    const hashedData = data.map(d => SHA256(d).toString());
    const baddData = _data.map(d => SHA256(d).toString());

    const merkleTree = new MerkleTree(hashedData, SHA256);
    const rootHash = merkleTree.getRoot().toString('hex');
    const proof0 = merkleTree.getProof(hashedData[0]);
    const proof1 = merkleTree.getProof(hashedData[1]);
    const proof2 = merkleTree.getProof(hashedData[2]);
    const proof3 = merkleTree.getProof(baddData[0]);

    console.log('Root hash:', rootHash);
    console.log('Proof0:', proof0);
    console.log('Proof1:', proof1);
    console.log('Proof2:', proof2);
    console.log(merkleTree.verify(proof3, baddData[0], rootHash)) // true
    console.log(merkleTree.verify(proof0, hashedData[0], rootHash)) // true


    // const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
    // const badTree = new MerkleTree(badLeaves, SHA256)
    // const badLeaf = SHA256('x')
    // const badProof = badTree.getProof(badLeaf)
    // console.log(badTree.verify(badProof, badLeaf, root)) // false

    // POST_RECORD_API(this.record.value)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  getRecord(): void {
    console.log("getRecord");
    let searchVal = (document.getElementById('search-value') as HTMLInputElement).value;

    GET_RECORD_API(searchVal)
    .then((res) => {
      console.log(res);
      console.log("in set?")
      const form_setter = new FormSetter(res.data);
      console.log("end constructor")
      form_setter.setForm();
      console.log("set end")
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
