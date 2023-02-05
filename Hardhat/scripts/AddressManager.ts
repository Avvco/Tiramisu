import { promises as fsPromises } from 'fs';
import * as path from 'path';

let basePath: string = "./address/";

export async function saveContractAddress(contractKey:string, contractAddress: string) {
    console.log("Start store.")
    
    let storePath: string = basePath + contractKey + "-address.txt";
    console.log(storePath);

    let data: string = contractKey + ":" + contractAddress;
    fsPromises.writeFile(
        storePath,
        contractAddress
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

