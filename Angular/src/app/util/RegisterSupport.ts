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

    let res = await sendDataToDataBase(registerData);
    let reg = await registerMedicalAccount(userAddr);
    if (res.status == 200) {
      alert("register success.")
      component.router.navigate(['../login']);
    }
    else {
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

    let res = await sendDataToDataBase(registerData);
    let reg = await registerPatientAccount(userAddr);
    if (res.status == 200) {
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