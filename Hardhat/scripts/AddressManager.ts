import { promises as fsPromises } from 'fs';
import * as path from 'path';

let basePath: string = "./address/";

export async function saveContractAddress(contractKey:string, contractAddress: string) {
    console.log("Start save.")
    
    let storePath: string = basePath + contractKey + "-address.ts";
    console.log(storePath);
    console.log(contractKey);
    console.log(contractAddress);
    
    let variableName;
    if(contractKey == "medical"){
        variableName = "MEDICAL_ADDRESS";
    }
    else if(contractKey == "patient"){
        variableName = "PATIENT_ADDRESS";
    }
    else{
        variableName = "VERIFIER_ADDRESS";
    }

    let data = "export const " + variableName + " = \"" + contractAddress + "\"";
    fsPromises.writeFile(
        storePath,
        data
    );

    console.log("End.")
}

export async function getContractAddress(contract: string) {
    let path = basePath + contract + "-address.txt";
    fsPromises.readFile(path)
    .then(function(result) {
      console.log(""+result);
      return result;
    })
    .catch(function(error) {
       console.log(error);
    })
}

