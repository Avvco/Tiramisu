import { MEDICAL_ADDRESS } from './address/medical-address';
import { PATIENT_ADDRESS } from './address/patient-address';

import { test } from '../contract/MedicalStaff'
import Web3 from 'web3';

export async function registerHealthWorker() {
    console.log("Register health worker now.");

    let res = await test();
    console.log("caller:", await test());
}

export async function registerPatient() {
    console.log("Register patient now.");

    let contractAddress = PATIENT_ADDRESS;

}