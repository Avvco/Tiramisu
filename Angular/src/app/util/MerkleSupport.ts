import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { utils } from "ethers";

import { GET_ALL_RECORD_API } from './APIHandler';
import { getRecordRoot, setRecordRoot, isValidRecord } from './contract/Verify';

export async function verifyAllData() {
  let tree = await calculateMerkleTree();

  if (tree == null) {
    console.log("build error");
    return false;
  }

  try {
    let onchainRoot = await getRecordRoot();
    return onchainRoot == tree.root;
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

export async function calculateMerkleTree() {
  let tree = await GET_ALL_RECORD_API()
    .then(async (res) => {
      let data = res.data.entry;
      console.log(res.data);
      if (data == null) {
        console.log("here")
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

      let tree = StandardMerkleTree.of(hashData, ["string"]);
      return tree;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return tree;
}