import { MerkleTree } from 'merkletreejs'
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

import SHA256 from 'crypto-js/sha256';
import { ethers } from 'ethers';

import { GET_ALL_RECORD_API } from './APIHandler';
import { getRecordRoot, setRecordRoot, isValidRecord } from './contract/Verify';

export async function verifySingleMerkleData(input: any) {
    GET_ALL_RECORD_API()
        .then(async (res) => {
            let data = res.data.entry;
            const tree = StandardMerkleTree.of(data, ["address", "uint256"]);
            console.log(tree);
            
            // let hashedData = data.map((d: string | CryptoJS.lib.WordArray) => SHA256(d).toString());
            // let merkleTree = new MerkleTree(hashedData, SHA256);

            // let hashedInput = '0x' + SHA256(input).toString();
            // let proof = merkleTree.getProof(hashedInput);
            // let proof1 = merkleTree.getProof(hashedData[0]);
            // console.log(proof);
            // console.log(proof1);
            // let proofStrings = proof.map((p: any) => p.position + p.data.toString('hex'));
            // proofStrings = proofStrings.map((p: string) => p.replace('left', '0x'));

            // console.log(proofStrings);

            // let isValid = await isValidRecord(proofStrings, hashedInput);
            // console.log(isValid);
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}

export async function verifyAllMerkleData() {
    GET_ALL_RECORD_API()
        .then(async (res) => {
            let data = res.data.entry;
            let hashedData = data.map((d: string | CryptoJS.lib.WordArray) => SHA256(d).toString());
            let merkleTree = new MerkleTree(hashedData, SHA256);
            let curRoot = '0x' + merkleTree.getRoot().toString('hex');
            let onchainRoot = await getRecordRoot();

            console.log(data);
            return curRoot == onchainRoot;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}

export async function saveAllMerkleData() {
    GET_ALL_RECORD_API()
        .then(async (res) => {
            let data = res.data.entry;
            let hashedData = data.map((d: string | CryptoJS.lib.WordArray) => '0x' + SHA256(d).toString());
            let merkleTree = new MerkleTree(hashedData, SHA256);
            let curRoot = '0x' + merkleTree.getRoot().toString('hex');
            console.log(curRoot);
            await setRecordRoot(curRoot);
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}

export async function saveSingleMerkleData(data: any) {
    GET_ALL_RECORD_API()
        .then(async (res) => {
            let data = res.data.entry;
            let hashedData = data.map((d: string | CryptoJS.lib.WordArray) => SHA256(d).toString());
            let merkleTree = new MerkleTree(hashedData, SHA256);
            let curRoot = '0x' + merkleTree.getRoot().toString('hex');
            console.log(curRoot);
            await setRecordRoot(curRoot);
        })

        .catch((err) => {
            console.log(err);
            return false;
        });
}