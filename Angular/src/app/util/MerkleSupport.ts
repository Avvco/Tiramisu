import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { utils } from "ethers";

import { GET_ALL_MEDICATIO_API, GET_ALL_OBSERVATION_API, GET_ALL_RECORD_API } from './APIHandler';
import { getRecordRoot, setRecordRoot, isValidRecord } from './contract/Verify';

export async function verifyAllData() {
  try {
    const [tree, onchainRoot] = await Promise.all([calculateMerkleTree(), getRecordRoot()]);

    if (!tree) {
      console.log("build error");
      return false;
    }

    return onchainRoot === tree.root;
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
}

export async function uploadAllDataOnchain() {
  let tree = await calculateMerkleTree();

  if (tree == null) {
    console.log("build error");
  }
  else {
    await setRecordRoot(tree.root);
    console.log(tree.root);
  }
}

export async function calculateMerkleTree() {
  let tree;
  let data = await get_all_data();

  if (data == null) {
    let hashData = [["0"]];
    let tree = StandardMerkleTree.of(hashData, ["string"]);
    return tree;
  }

  let hashData = [];
  for (let i = 0; i < data.length; i++) {
    //let str = JSON.stringify(data[i]) + "error"; //force create invalid data
    let str = JSON.stringify(data[i]);
    let hashStr = utils.solidityKeccak256(["string"], [str]);
    hashData.push([hashStr]);
  }

  tree = StandardMerkleTree.of(hashData, ["string"]);
  return tree;
}

async function get_all_data() {
  try {
    const [recordResponse, observationResponse, medicationResponse] = await Promise.all([
      GET_ALL_RECORD_API(),
      GET_ALL_OBSERVATION_API(),
      GET_ALL_MEDICATIO_API(),
    ]);

    let record = recordResponse.data.entry;
    let observation = observationResponse.data.entry;
    let medication = medicationResponse.data.entry;

    let data = record.concat(observation, medication);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}