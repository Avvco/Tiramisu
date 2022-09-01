// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// This is the main building block for smart contracts.
contract TamperResistance is Ownable{

  bytes32 merkleRoot;

  // This contract is inherit by "Ownable", so have no constructor.
  function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
    merkleRoot = _merkleRoot;
  }

  // signer is people who change this data
  // timestamp is  the time when change this record
  function getMerkle(bytes32 _signer, bytes32 _timestamp) public pure returns(bytes32) {
      bytes32 _merkle = keccak256(abi.encodePacked(_signer, _timestamp));
      return _merkle;
  } 

  function isTamper(bytes32[] calldata _merkleProof, bytes32 _signer, bytes32 _timestamp) public view returns(bool) {
    bytes32 leaf = keccak256(abi.encodePacked(_signer, _timestamp));

    if(MerkleProof.verify(_merkleProof, merkleRoot, leaf)){
      return false;
    } else{
      return true;
    }
  } 
}