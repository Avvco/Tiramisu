import { promises as fsPromises } from 'fs';
import * as path from 'path';

let basePath: string = "./address/";

export async function saveFrontendFiles(contractKey:string, contractAddress: string) {
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

