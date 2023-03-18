import { isMedicalStaff } from './contract/MedicalStaff'
import { isPatient } from './contract/Patient'

import { setAccessToken, getAccessToken } from './UserTokenHandler';
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

async function sendDataToDataBase(data: any, caller: any) {
  const res = await POST_LOGIN_API(data);
  console.log(res);
  setAccessToken(res.data.token);
  console.log(getAccessToken());
  caller.router.navigate(['/user/record'])
}