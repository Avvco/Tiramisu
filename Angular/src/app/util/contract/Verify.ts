import { VERIFIER_ADDRESS } from './address/verifierAddress';

import { getETHAddress } from './address/userAddress';
import { ethers, Wallet } from 'ethers';

let contractAddress = VERIFIER_ADDRESS;
let contractABI = [
    "function setRecordRoot(bytes32) public",
    "function getRecordRoot() public view returns(bytes32)",
    "function isValidRecord(bytes32[] calldata, bytes32) public view returns(bool)",
];

let providers = new ethers.providers.JsonRpcProvider('https://hardhat.tiramisu.localhost/');
let contract = new ethers.Contract(contractAddress, contractABI, providers);

let deployAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let deployPkey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
let signer = new Wallet(deployPkey, providers);

export async function test() {

}

export async function getRecordRoot() {
    // console.log("currentAccountID in.");

    let res = await contract.connect(signer)['getRecordRoot']();
    // console.log("currentAccountID res:", res);

    // console.log("currentAccountID out.");
    return res;
}

export async function setRecordRoot(root: string) {
    // console.log("registerMedicalAccount in.");

    let res = await contract.connect(signer)['setRecordRoot'](root);
    // console.log("registerMedicalAccount res:", res);

    // console.log("registerMedicalAccount out.");
    return res;
}

export async function isValidRecord(merkleProof: string[], curData: string) {
    // console.log("isMedicalStaff in.");

    let res = await contract.connect(signer)['isValidRecord'](merkleProof, curData);
    // console.log("isMedicalStaff res:", res);

    // console.log("isMedicalStaff out.");
    return res;
}