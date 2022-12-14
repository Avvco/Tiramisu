import Web3 from 'web3';
import { MetaMaskInpageProvider } from "@metamask/providers";


declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

export class RegisterSupport {
  _currentProvider: string = 'http://127.0.0.1:8545/';

  constructor() {
  }

  public async get_account() {
    if( typeof window.ethereum != 'undefined' ) {
      console.log("Already install metamask");
      try {
        const PROVIDER: any = window.ethereum;
        await PROVIDER.enable();

        let web3 = new Web3(PROVIDER);
        let address: any = web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          } else if (accounts.length == 0) {
            console.log("User is not logged in to MetaMask");
          } else {
            // Get the first account
            var account = accounts[0];
            console.log("Current account:", account);
          }
        });

        console.log(address);

        return address;
      }
      catch (error) {
        console.log("User denied");
      }
    }
    else {
      console.log("Please install metamask");
    }
  }
}
