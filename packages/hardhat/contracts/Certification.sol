// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Certification is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint constant public MIN_SCORE = 10;

    mapping (string => string) public kind;
    mapping (string => IERC20) public scoreContract;

    constructor()
        ERC721("Certification", "CERT")
        Ownable(msg.sender)
    {}

    function setKind(string calldata _qualityCID,string calldata _attentionCID,string calldata _speedCID) external onlyOwner {
        kind["qualityCID"] = _qualityCID;
        kind["attentionCID"] = _attentionCID;
        kind["speedCID"] = _speedCID;
    }

    function setContracts(IERC20 _speedContract,IERC20 _qualContract, IERC20 _atteContract) external onlyOwner {
        scoreContract["qualityCID"] = _qualContract;
        scoreContract["attentionCID"] = _atteContract;
        scoreContract["speedCID"] = _speedContract;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(string memory _scoreKind) public {
        IERC20 _scoreContract = scoreContract[_scoreKind];
        string memory uri = kind[_scoreKind];
        address to = msg.sender;

        _scoreContract.transferFrom(msg.sender, address(this), MIN_SCORE);

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}