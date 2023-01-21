// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// This is the main building block for smart contracts.

contract MedicalStaff is Ownable, ERC721("MedicalStaff", "MS"){
  using Counters for Counters.Counter;
  Counters.Counter private _medicalAccountCounter;

  uint256 public constant MAX_SUPPLY = 10;
  uint256 public constant MAX_BALANCE = 1;

  function registerMedicalAccount()public onlyOwner{
    require(balanceOf(msg.sender) <= MAX_BALANCE, "This account already been registe.");

    _mintForRegister();
  }

  function isMedicalStaff() public view returns(bool) {
    return (balanceOf(msg.sender) == 1);
  }

  function _mintForRegister()private {
    uint256 tokenID = _medicalAccountCounter.current();
    _medicalAccountCounter.increment();
    _safeMint(msg.sender, tokenID);
  }
}