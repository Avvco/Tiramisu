import { MEDICAL_ADDRESS } from './address/medical-address';

import { getETHAddress } from '../../register/util/RegisterSupport';
import { ethers, Wallet } from 'ethers';

let contractAddress = MEDICAL_ADDRESS;
let contractABI = [
    "function currentAccountID() public view returns (uint256)",
    "function registerMedicalAccount(address) public",
    "function getTokenURI(uint256) public view returns(string memory)",
    "function isMedicalStaff(address) public view returns (bool)"
];

let providers = new ethers.providers.JsonRpcProvider('https://hardhat.tiramisu.localhost/');
let contract = new ethers.Contract(contractAddress, contractABI, providers);

let deployAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let deployPkey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
let signer = new Wallet(deployPkey, providers);

export async function test() {
    let addr = await getETHAddress();
    addr = addr[0];
    console.log(addr);

    let cid = await currentAccountID();
    console.log("ub:", cid);

    let reg = await registerMedicalAccount(addr);
    console.log("reg:", reg);
    
    let judge = await isMedicalStaff(addr);
    console.log("jud:", judge);

    cid = await currentAccountID();
    console.log("ub:", cid.toNumber());
}

export async function currentAccountID() {
    // console.log("currentAccountID in.");

    let res = await contract['currentAccountID']();
    // console.log("currentAccountID res:", res);

    // console.log("currentAccountID out.");
    return res;
}

export async function registerMedicalAccount(address: string) {
    // console.log("registerMedicalAccount in.");

    let res = await contract.connect(signer)['registerMedicalAccount'](address);
    // console.log("registerMedicalAccount res:", res);

    // console.log("registerMedicalAccount out.");
    return res;
}
export async function isMedicalStaff(address: string) {
    // console.log("isMedicalStaff in.");

    let res = await contract.connect(signer)['isMedicalStaff'](address);
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