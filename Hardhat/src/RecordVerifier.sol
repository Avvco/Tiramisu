// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// This is the main building block for smart contracts.

contract RecordVerifier is Ownable{

  bytes32 recordRoot;

  function setRecordRoot(bytes32 _recordRoot) public onlyOwner {
    recordRoot = _recordRoot;
  }

  function getRecordRoot() public onlyOwner view returns(bytes32) {
    return recordRoot;
  }

  function getMerkle(bytes32 userAddress) public pure returns(bytes32) {
      bytes32 _merkle = keccak256(abi.encode(userAddress));
      return _merkle;
  } 

  function isValidRecord(bytes32[] calldata merkleProof, bytes32 _leaf) public view returns(bool) {
    return MerkleProof.verify(merkleProof, recordRoot, _leaf);
  } 
}