// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract IdentityAuthentication{
  mapping(address => mapping(uint256 => uint256)) attribute;


  constructor(){

    

  function encode(uint256 _personID, uint256 _recordID, uint256 _birthday, bytes32 _key) public returns (bool){

    uint256 coef0 = uint256(_key);
    uint256 coef1 = random() % 100;
    uint256 coef2 = random() % 100;

    uint256 _personIDHash = uint256(keccak256(abi.encode(_personID)));
    uint256 _recordIDHash = uint256(keccak256(abi.encode(_recordID)));
    uint256 _birthdayHash = uint256(keccak256(abi.encode(_birthday)));
    uint256 _addressHash  = uint256(keccak256(abi.encode(msg.sender)));

    attribute[msg.sender][_personIDHash] = encodePolynomial(coef0, coef1, coef2, _personIDHash);
    attribute[msg.sender][_recordIDHash] = encodePolynomial(coef0, coef1, coef2, _recordIDHash);
    attribute[msg.sender][_birthdayHash] = encodePolynomial(coef0, coef1, coef2, _birthdayHash);
    attribute[msg.sender][_addressHash] = encodePolynomial(coef0, coef1, coef2, _addressHash);

    return true;
  }

  function decode(uint256 _personID, uint256 _recordID, uint256 _birthday) public view returns(bytes32) {

    uint256 _personIDHash = uint256(keccak256(abi.encode(_personID)));
    uint256 _recordIDHash = uint256(keccak256(abi.encode(_recordID)));
    uint256 _birthdayHash = uint256(keccak256(abi.encode(_birthday)));

    uint _personIDVal = attribute[msg.sender][_personIDHash];
    uint _recordIDVal = attribute[msg.sender][_recordIDHash];
    uint _birthdayVal = attribute[msg.sender][_birthdayHash];

    uint _key = decodePolynomial(_personIDVal, _personIDHash, _recordIDHash, _birthdayHash) + 
                decodePolynomial(_recordIDVal, _recordIDHash, _personIDHash, _birthdayHash) + 
                decodePolynomial(_birthdayVal, _birthdayHash, _personIDHash, _recordIDHash);

      return bytes32(_key);
    }

  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
  } 

  function encodePolynomial(uint256 _coef0, uint256 _coef1, uint256 _coef2, uint256 _variable) private pure returns (uint) {
    return _coef0 + _coef1 * _variable + _coef2 * _variable * _variable;
  } 

  function decodePolynomial(uint256 _y, uint256 _x1, uint256 _x2, uint256 _x3) private pure returns (uint) {
    return _y * _x2 * _x3 / (_x1 - _x2) * (_x1 - _x3);
  } 
}