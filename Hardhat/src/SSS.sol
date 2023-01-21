// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract SSS{

  mapping(address => mapping(int256 => int256)) attribute;

  constructor() {}

  function encode(int256 _attr0, int256 _attr1, int256 _attr2, int256 _key) public payable returns (int256, int256, int256){

    int256 _coef0 = _key;
    int256 _coef1 = _random();
    int256 _coef2 = _random();

    int256 _attrVal0 = _encodePolynomial(_coef0, _coef1, _coef2, _attr0);
    int256 _attrVal1 = _encodePolynomial(_coef0, _coef1, _coef2, _attr1);
    int256 _attrVal2 = _encodePolynomial(_coef0, _coef1, _coef2, _attr2);

    return (_attrVal0, _attrVal1, _attrVal2);
  }

  function decode(int256 _attr0, int256 _attr1, int256 _attr2,
                  int256 _attrVal0, int256 _attrVal1, int256 _attrVal2) public payable returns(int256) {

    int256 _key = _decodePolynomial(_attrVal0, _attr0, _attr1, _attr2) +
                  _decodePolynomial(_attrVal1, _attr1, _attr0, _attr2) +
                  _decodePolynomial(_attrVal2, _attr2, _attr0, _attr1);
    return _key;
  }

  function _random() private view returns (int256) {
    return int256(uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 256);
  } 

  function _encodePolynomial(int256 _coef0, int256 _coef1, int256 _coef2, int256 _variable) private pure returns (int256) {
    return _coef0 + _coef1 * _variable + _coef2 * _variable * _variable;
  } 

  function _decodePolynomial(int256 _y, int256 _x1, int256 _x2, int256 _x3) private pure returns (int256) {
    return _y * _x2 * _x3 / ((_x1 - _x2) * (_x1 - _x3));
  }
}