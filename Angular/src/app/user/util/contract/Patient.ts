import { PATIENT_ADDRESS } from './address/patient-address';

import { getETHAddress } from '../../register/util/RegisterSupport';
import { ethers, Wallet } from 'ethers';

let contractAddress = PATIENT_ADDRESS;
let contractABI = [
    "function currentAccountID() public view returns (uint256)",
    "function registerPatientAccount(address) public",
    "function getTokenURI(uint256) public view returns(string memory)",
    "function isPatient(address) public view returns (bool)"
];

let providers = new ethers.providers.JsonRpcProvider('https://hardhat.tiramisu.localhost/');
let contract = new ethers.Contract(contractAddress, contractABI, providers);

let deployAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let deployPkey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
let signer = new Wallet(deployPkey, providers);

export async function test() {

}

export async function currentAccountID() {
    // console.log("currentAccountID in.");

    let res = await contract['currentAccountID']();
    // console.log("currentAccountID res:", res);

    // console.log("currentAccountID out.");
    return res;
}

export async function registerPatientAccount(address: string) {
    // console.log("registerMedicalAccount in.");

    let res = await contract.connect(signer)['registerPatientAccount'](address);
    // console.log("registerMedicalAccount res:", res);

    // console.log("registerMedicalAccount out.");
    return res;
}

export async function isPatient(address: string) {
    // console.log("isMedicalStaff in.");

    let res = await contract.connect(signer)['isPatient'](address);
    // console.log("isMedicalStaff res:", res);

    // console.log("isMedicalStaff out.");
    return res;
}

export async function getTokenURI(tokenID: any) {
    // console.log("getTokenURI in.");

    let res = await contract['getTokenURI'](tokenID);
    // console.log("isMedicalStaff res:", res);
    
    // console.log("getTokenURI out.");
    return res;
}