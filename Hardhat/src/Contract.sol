// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

// This is the main building block for smart contracts.

contract Merkle {

    bytes32 merkleRoot;

    function setSaleMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function isWhitelist(bytes32[] calldata _merkleProof, bytes32 _accountID) public view returns(bool) {

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _accountID));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid user.");

        return true;
    } 
}