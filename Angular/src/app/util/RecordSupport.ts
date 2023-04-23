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

export async function setForm(data: any) {
  console.log(data);

  //console.log(data.identifier);
  (document.getElementById('identifier-value') as HTMLInputElement).value = data.identifier[0].value;

  //console.log(data.name[0].family);
  (document.getElementById('name-family') as HTMLInputElement).value = data.name[0].family;

  //console.log(data.name[0].given);
  (document.getElementById('name-given') as HTMLInputElement).value = data.name[0].given;

  //console.log(data.gender);
  if (data.gender == "male") {
    (document.getElementById('gender-male') as HTMLInputElement).checked = true;
  }
  else {
    (document.getElementById('gender-female') as HTMLInputElement).checked = true;
  }

  console.log(data.telecom[0].value);
  (document.getElementById('telecom-value') as HTMLInputElement).value = data.telecom[0].value

  console.log(data.address[0].text);
  (document.getElementById('address-city') as HTMLInputElement).value = data.address[0].text;

  //console.log(data.birthDate);
  (document.getElementById('birthDate') as HTMLInputElement).value = data.birthDate;
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
        //let str = JSON.stringify(data[i]) + "error";
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