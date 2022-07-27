// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// This is the main building block for smart contracts.

contract Merkle is Ownable{

    bytes32 merkleRoot;
    
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function isWhitelist(bytes32[] calldata _merkleProof, bytes32 _accountID) public view returns(bool) {

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _accountID));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid user.");

        if(MerkleProof.verify(_merkleProof, merkleRoot, leaf)){
            return true;
        } else{
            return false;
        }
    } 
}