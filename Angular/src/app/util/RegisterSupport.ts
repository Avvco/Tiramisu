import { registerMedicalAccount, isMedicalStaff } from './contract/MedicalStaff'
import { registerPatientAccount, isPatient } from './contract/Patient'

import { POST_REGISTER_API } from './APIHandler';


export async function registerHealthWorker(data: any, caller: any) {
  console.log("Register health worker now.");
  let userAddr = data.ethAddress;
  let isStaff = await isMedicalStaff(userAddr);

  console.log("TEST:", data)

  if (!isStaff) {
    sendDataToDataBase(data, caller);
    let reg = await registerMedicalAccount(userAddr);
  }
  else {
    console.log("This accout have been use.")
  }
}

export async function registerPatient(data: any, caller: any) {
  console.log("Register patient now.");
  let userAddr = data.ethAddress;

  let _isPatient = await isPatient(userAddr);

  if (!_isPatient) {
    sendDataToDataBase(data, caller);
    let reg = await registerPatientAccount(userAddr);
  }
  else {
    console.log("This accout have been use.")
  }

}

function sendDataToDataBase(data: any, caller: any) {
  POST_REGISTER_API(data)
    .then((res) => {
      console.log(res);
      caller.router.navigate(['/user/home']);
    })
    .catch((err) => {
      console.log(err);
    });
}