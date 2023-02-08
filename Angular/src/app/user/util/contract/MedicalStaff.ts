import { MEDICAL_ADDRESS } from './address/medical-address';

import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://hardhat.tiramisu.localhost/'));
let contractAddress = MEDICAL_ADDRESS;
let contractABI = [{
    "inputs": [],
    "name": "currentAccountID",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
        "inputs": [],
        "name": "registerMedicalAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            }
        ],
        "name": "getTokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isMedicalStaff",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

//let medical = new web3.eth.Contract(contractABI, contractAddress);

export function testABI(){
    console.log(contractABI);
}