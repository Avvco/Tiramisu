import { isMedicalStaff } from './contract/MedicalStaff'
import { isPatient } from './contract/Patient'

import { setAccessToken } from './UserTokenHandler';
import { POST_LOGIN_API } from './APIHandler';


export async function loginHealthWorker(data: any, caller: any) {
  console.log("Login health worker now.");
  let userAddr = data.ethAddress;
  let isStaff = await isMedicalStaff(userAddr);

  if (isStaff) {
    sendDataToDataBase(data, caller);
  }
  else {
    console.log("This accout haven't been register.")
  }
}

export async function loginPatient(data: any, caller: any) {
  console.log("Login patient now.");
  let userAddr = data.ethAddress;
  let _isPatient = await isPatient(userAddr);


  if (_isPatient) {
    sendDataToDataBase(data, caller);
  }
  else {
    console.log("This accout haven't been register.")
  }

}

function sendDataToDataBase(data: any, caller: any) {
  POST_LOGIN_API(caller.loginForm.value)
    .then((res) => {
      console.log(res);
      setAccessToken(res.data.token);
      _routerLink(res.status, caller);
    })
    .catch((err) => {
      console.log(err);
    });
}

function _routerLink(status: number, caller: any) {
  console.log(status);
  if (status == 200) {
    console.log("success");
    caller.router.navigate(['/user/record']);
  }
  else {
    console.log("failed");
  }
}