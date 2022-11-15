// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// This is the main building block for smart contracts.
contract RecordVerification is Ownable{

  bytes32 merkleRoot;

  // This contract is inherit by "Ownable", so have no constructor.
  function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
    merkleRoot = _merkleRoot;
  }

  // This contract is inherit by "Ownable", so have no constructor.
  function getMerkleRoot() public onlyOwner view returns(bytes32) {
    return merkleRoot;
  }

  // signer is people who change this data
  // timestamp is  the time when change this record
  function getMerkle(bytes32 record) public pure returns(bytes32) {
      bytes32 _merkle = keccak256(abi.encode(record));
      return _merkle;
  } 

  function isValid(bytes32[] calldata merkleProof, bytes32 record) public view returns(bool) {
    bytes32 _leaf = keccak256(abi.encode(record));
    return MerkleProof.verify(merkleProof, merkleRoot, _leaf);
  } 
}