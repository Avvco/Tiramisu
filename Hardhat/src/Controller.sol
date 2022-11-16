// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// This is the main building block for smart contracts.
contract Controller is Ownable{

  bytes32 recordRoot;
  bytes32 identityRoot;

  function setRecordRoot(bytes32 _recordRoot) public onlyOwner {
    recordRoot = _recordRoot;
  }

  function getRecordRoot() public onlyOwner view returns(bytes32) {
    return recordRoot;
  }

  function setIdentityRoot(bytes32 _identityRoot) public onlyOwner {
    identityRoot = _identityRoot;
  }

  function getIdentityRoot() public onlyOwner view returns(bytes32) {
    return identityRoot;
  }

  function getMerkle(bytes32 userAddress) public pure returns(bytes32) {
      bytes32 _merkle = keccak256(abi.encode(userAddress));
      return _merkle;
  } 

  function isValidRecord(bytes32[] calldata merkleProof, bytes32 userAddress) public view returns(bool) {
    bytes32 _leaf = keccak256(abi.encode(userAddress));
    return MerkleProof.verify(merkleProof, recordRoot, _leaf);
  } 

  function isValidIdentity(bytes32[] calldata merkleProof, bytes32 userAddress) public view returns(bool) {
    bytes32 _leaf = keccak256(abi.encode(userAddress));
    return MerkleProof.verify(merkleProof, identityRoot, _leaf);
  } 
}