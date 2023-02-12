import { MEDICAL_ADDRESS } from './address/medical-address';

import { getETHAddress } from '../../register/util/RegisterSupport';
import Web3 from 'web3';
import { ethers } from 'ethers';

let providers = new ethers.JsonRpcProvider('https://hardhat.tiramisu.localhost/');
let contractAddress = MEDICAL_ADDRESS;
let testABI = ["function currentAccountID() public view returns (uint256)",
    "function isMedicalStaff() public view returns (bool)",
    "function getTokenURI(uint256 tokenID) public view virtual returns(string memory)",
    "function registerMedicalAccount() public onlyOwner"
];

let readOnlyMethods = new ethers.Contract(contractAddress, testABI, providers);

export async function test() {
    let signer = await getETHAddress();
    let writeMethods = new ethers.Contract(contractAddress, testABI, signer); 

    console.log("in.");
    let t = await writeMethods['registerMedicalAccount']([], {from:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", to:signer});
    console.log(t)
    console.log("out.");
    return t;
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