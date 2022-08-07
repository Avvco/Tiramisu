// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract IdentityAuthentication{

  mapping(address => mapping(int256 => int256)) attribute;

  constructor() payable {}

  function encode(int256 _personID, int256 _recordID, int256 _birthday, int256 _key) public payable returns (bool){

    int256 coef0 = _key;
    int256 coef1 = random();
    int256 coef2 = random();

    attribute[msg.sender][_personID] = encodePolynomial(coef0, coef1, coef2, _personID);
    attribute[msg.sender][_recordID] = encodePolynomial(coef0, coef1, coef2, _recordID);
    attribute[msg.sender][_birthday] = encodePolynomial(coef0, coef1, coef2, _birthday);

    return true;
  }

  function decode(int256 _personID, int256 _recordID, int256 _birthday) public payable returns(int256) {

    int256 personIDVal = getAttributeVal(_personID);
    int256 recordIDVal = getAttributeVal(_recordID);
    int256 birthdayVal = getAttributeVal(_birthday);

    int256 key = decodePolynomial(personIDVal, _personID, _recordID, _birthday) +
                 decodePolynomial(recordIDVal, _recordID, _personID, _birthday) +
                 decodePolynomial(birthdayVal, _birthday, _personID, _recordID);
    return key;
  }

  function getAttributeVal(int256 _attrName) private view returns (int256){
    return attribute[msg.sender][_attrName];
  }

  function random() private view returns (int256) {
    return int256(uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 256);
  } 

  function encodePolynomial(int256 _coef0, int256 _coef1, int256 _coef2, int256 _variable) private pure returns (int256) {
    return _coef0 + _coef1 * _variable + _coef2 * _variable * _variable;
  } 

  function decodePolynomial(int256 _y, int256 _x1, int256 _x2, int256 _x3) private pure returns (int256) {
    return _y * _x2 * _x3 / ((_x1 - _x2) * (_x1 - _x3));
  } 
} 