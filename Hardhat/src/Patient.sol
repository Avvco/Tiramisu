// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// This is the main building block for smart contracts.

contract Patient is Ownable, ERC721("MedicalStaff", "MS") {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _patientAccountCounter;

    uint256 public constant MAX_SUPPLY = 10;
    uint256 public constant MAX_BALANCE = 1;

    string private constant BASE_URI = "https://ipfs.io/ipfs/QmUSSvL9VwFkA97pSYcPzg5PMxUtDD6DMaSGzAnzUmgquy/";
    string private constant BASE_Extension = ".json";

    mapping (uint256 => string) _tokenURIs;

    function currentAccountID() public view returns (uint256) {
        return _patientAccountCounter.current();
    }

    function registerPatientAccount() public onlyOwner {
        require(
            balanceOf(msg.sender) < MAX_BALANCE,
            "This account already been registe."
        );

        _mintForRegister();
    }

    function getTokenURI(uint256 tokenID) public view virtual returns(string memory){
        require(_exists(tokenID), "ERC721Metadata: URI query for nonexistent token.");

        string memory tokenURI = _tokenURIs[tokenID];

        if(bytes(BASE_URI).length == 0)
            return tokenURI;

        if(bytes(tokenURI).length > 0)
            return string(abi.encodePacked(BASE_URI, tokenURI));
        
        return string(abi.encodePacked(BASE_URI, tokenID.toString(), BASE_Extension));
    }

    function isPatient() public view returns (bool) {
        return (balanceOf(msg.sender) == 1);
    }

    function _mintForRegister() private {
        uint256 tokenID = currentAccountID();
        _patientAccountCounter.increment();
        _safeMint(msg.sender, tokenID);
    }
}
