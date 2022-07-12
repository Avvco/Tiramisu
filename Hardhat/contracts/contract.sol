// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Whitelist{

    // Address of contract's owner.
    address owner;

    // Receive an address and return ture if it's whitelist.
    mapping(address => bool) whitelistAddress;

    constructor(){
        // Set the contract's owner to minter.
        owner = msg.sender; 
    }

    // Send the message "Permission denied." if the request isn't from the contract owner.
    modifier onlyOwner{
        require(msg.sender == owner, "Permission denied.");
        _;
    }
    modifier isWhitelist(address inputAddress){
        require(whitelistAddress[inputAddress], "You need to be whitelisted.");
        _;
    }

    // Add an address to the whitelist and this function only owner can use.
    function addUser(address inputAddress) public onlyOwner{
        whitelistAddress[inputAddress] = true;
    }

    // Del an address to the whitelist and this function only owner can use.
    function delUser(address inputAddress) public onlyOwner{
        whitelistAddress[inputAddress] = false;
    }

    // If the address is whitelisted return true, else false.
    function verifyUser(address inputAddress) public view returns(bool) {
        return whitelistAddress[inputAddress];
    }   
}