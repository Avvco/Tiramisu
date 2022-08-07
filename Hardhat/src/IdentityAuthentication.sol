// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract IdentityAuthentication{

  mapping(address => mapping(int256 => int256)) attribute;

  constructor() payable {}

  function encode(int256 _personID, int256 _recordID, int256 _birthday, int256 _key) public payable returns (int256, int256, int256){

    int256 coef0 = _key;
    int256 coef1 = random();
    int256 coef2 = random();

    int256 _personIDVal = encodePolynomial(coef0, coef1, coef2, _personID);
    int256 _recordIDVal = encodePolynomial(coef0, coef1, coef2, _recordID);
    int256 _birthdayVal = encodePolynomial(coef0, coef1, coef2, _birthday);

    return (_personIDVal, _recordIDVal, _birthdayVal);
  }

  function decode(int256 _personID, int256 _recordID, int256 _birthday,
                  int256 _personIDVal, int256 _recordIDVal, int256 _birthdayVal) public payable returns(int256) {

    int256 key = decodePolynomial(_personIDVal, _personID, _recordID, _birthday) +
                 decodePolynomial(_recordIDVal, _recordID, _personID, _birthday) +
                 decodePolynomial(_birthdayVal, _birthday, _personID, _recordID);
    return key;
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