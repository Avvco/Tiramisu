import { isMedicalStaff } from './contract/MedicalStaff'
import { isPatient } from './contract/Patient'

import { setAccessToken, getAccessToken, setUserName } from './UserTokenHandler';
import { POST_LOGIN_API } from './APIHandler';
import { error } from 'jquery';

export async function loginHealthWorker(loginData: any, component: any) {
  try {
    console.log("Login health worker now.");
    let userAddr = loginData.ethAddress;
    let isStaff = await isMedicalStaff(userAddr);

    if (isStaff) {
      let res = await sendDataToDataBase(loginData);
      if (res.status === 200) {
        alert("Login patient success.")
        component.router.navigate(['../user/record']);
      }
      else {
        alert("Login health worker error.");
      }
    }
    else {
      alert("This account hasn't been registered.");
    }
  }
  catch (err) {
    console.error(err);
    throw new Error("Login health worker failed.");
  }
}

export async function loginPatient(loginData: any, component: any) {
  try {
    console.log("Login patient now.");
    let userAddr = loginData.ethAddress;
    let _isPatient = await isPatient(userAddr);

    if (_isPatient) {
      let res = await sendDataToDataBase(loginData);
      if (res.status === 200) {
        alert("Login patient success.")
        //setUserName(loginData.userName);
        component.router.navigate(['../user/patient-record']);
      }
      else {
        alert("Login patient error.");
      }
    }
    else {
      alert("This account hasn't been registered.");
    }
  }
  catch (err) {
    console.error(err);
    throw new Error("Login health worker failed.");
  }
}

// export async function loginHealthWorker(data: any, caller: any) {
//   console.log("Login health worker now.");
//   let userAddr = data.ethAddress;
//   let isStaff = await isMedicalStaff(userAddr);

//   if (isStaff) {
//     let res = sendDataToDataBase(data, caller);
//     if ((await res).status == 200) {
//       caller.router.navigate(['../user/record']);
//     }
//     else {
//       console.log("login health worker error.");
//     }
//   }
//   else {
//     console.log("This accout haven't been register.")
//   }
// }

// export async function loginPatient(data: any, caller: any) {
//   console.log("Login patient now.");

//   try {
//     let userAddr = data.ethAddress;
//     let _isPatient = await isPatient(userAddr);

//     if (_isPatient) {
//       sendDataToDataBase(data);
//     }
//     else {
//       console.log("This accout haven't been register.")
//     }
//   }
//   catch {
//     console.log("error")
//   }
// }

async function sendDataToDataBase(data: any) {
  const res = await POST_LOGIN_API(data);
  console.log(res);
  setAccessToken(res.data.token);
  console.log(getAccessToken());
  return res
}