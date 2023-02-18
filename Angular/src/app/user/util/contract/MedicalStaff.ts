import { MEDICAL_ADDRESS } from './address/medical-address';

import { getETHAddress } from '../../register/util/RegisterSupport';
import Web3 from 'web3';
import { ethers, Wallet } from 'ethers';

let providers = new ethers.JsonRpcProvider('https://hardhat.tiramisu.localhost/');

let contractAddress = MEDICAL_ADDRESS;
let contractABI = [
    "function currentAccountID() public view returns (uint256)",
    "function registerMedicalAccount(address) public onlyOwner",
    "function getTokenURI(uint256) public view virtual returns(string memory)",
    "function isMedicalStaff(address) public view returns (bool)"
];


let readOnlyMethods = new ethers.Contract(contractAddress, contractABI, providers);

// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

let deployAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let deployPkey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export async function test() {
    console.log("in.");

    let signer = new Wallet(deployPkey, providers);
    let contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    // console.log("res:", res);
    console.log("out.");

    // let register = await getETHAddress();
    // let signer = new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', providers);

    // let writeMethods = new ethers.Contract(contractAddress, contractABI, signer);


    // console.log("in.");
    // let t = await writeMethods['registerMedicalAccount'](register);
    // console.log(t)
    // console.log("out.");
    // return t;
}

export async function currentAccountID() {
    console.log("in.");

    let res = await readOnlyMethods['currentAccountID']();

    console.log("res:", res);
    console.log("out.");
    return res;
}

export async function isMedicalStaff() {
    console.log("in.");

    let res = await readOnlyMethods['isMedicalStaff']();

    console.log("res:", res);
    console.log("out.");
    return res;
}

export async function getTokenURI(tokenID: any) {
    console.log("in.");

    let res = await readOnlyMethods['getTokenURI'](tokenID);

    console.log("res:", res);
    console.log("out.");
    return res;
}