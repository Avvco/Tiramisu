import { registerMedicalAccount, isMedicalStaff } from './contract/MedicalStaff'
import { registerPatientAccount, isPatient } from './contract/Patient'

import { POST_REGISTER_API } from './APIHandler';


export async function registerHealthWorker(registerData: any, component: any) {
  try {
    console.log("Register health worker now.");
    let userAddr = registerData.ethAddress;
    let isStaff = await isMedicalStaff(userAddr);

    if (isStaff) {
      alert("Register health worker failed.")
      return;
    }
    let reg = await registerMedicalAccount(userAddr);
    let res = await sendDataToDataBase(registerData);
    if (res.status == 204) {
      alert("register success.")
      component.router.navigate(['../login']);
    }
    else {
      console.log(res.status)
      alert("Register health worker failed.")
    }
  }
  catch (err) {
    console.log(err);
    throw new Error("Login health worker failed.");
  }
}

export async function registerPatient(registerData: any, component: any) {
  try {
    console.log("Register health worker now.");
    let userAddr = registerData.ethAddress;
    let _isPatient = await isPatient(userAddr);

    if (_isPatient) {
      alert("Register patient failed.")
      return;
    }
    
    let reg = await registerPatientAccount(userAddr);
    let res = await sendDataToDataBase(registerData);
    if (res.status == 204) {
      alert("register success.")
      component.router.navigate(['../login']);
    }
    else {
      alert("Register patient failed.")
    }
  }
  catch (err) {
    console.log(err);
    throw new Error("Login patient failed.");
  }
}

async function sendDataToDataBase(data: any) {
  const res = await POST_REGISTER_API(data);
  return res;
}