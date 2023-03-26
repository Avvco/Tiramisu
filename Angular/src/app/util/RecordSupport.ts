import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { utils } from "ethers";


import { GET_ALL_RECORD_API } from './APIHandler';
import { getRecordRoot, setRecordRoot, isValidRecord } from './contract/Verify';

export async function verifySingleData(input: any) {
  let tree = await calculateMerkleTree();

  if (tree == null) {
    console.log("build error");
    return false;
  }
  try {
    let onchainRoot = await getRecordRoot();
    let hashedInput = utils.solidityKeccak256(["string"], [JSON.stringify(input)]);
    let proof = tree.getProof([hashedInput]);
    let isValid = StandardMerkleTree.verify(onchainRoot, ["string"], [hashedInput], proof);
    console.log(isValid);
    return isValid;
  }
  catch {
    console.log("died");
    return false;
  }
}

export async function verifyAllData() {
  let tree = await calculateMerkleTree();

  if (tree == null) {
    console.log("build error");
    return false;
  }

  try {
    let onchainRoot = await getRecordRoot();
    let isValid = onchainRoot == tree.root;
    console.log(isValid);
    return isValid;
  }
  catch {
    console.log("died");
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

async function calculateMerkleTree() {
  let tree = await GET_ALL_RECORD_API()
    .then(async (res) => {
      let data = res.data.entry;

      let hashData = [];
      for (let i = 0; i < data.length; i++) {
        let str = JSON.stringify(data[i]);
        let hashStr = utils.solidityKeccak256(["string"], [str]);
        hashData.push([hashStr]);
      }

      let tree = StandardMerkleTree.of(hashData, ["string"]);
      return tree;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return tree;
}