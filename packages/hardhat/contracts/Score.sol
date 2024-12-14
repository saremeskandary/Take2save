// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Score Contract
 * @dev Manages scoring and token distribution for retailer performance metrics
 * @custom:security-contact security@take2save.com
 */
contract Score is Ownable {
    /// @notice Interface for product contract interactions
    iProductContract public productContract;
    /// @notice Token contract for speed metrics
    IMintableToken public speedContract;
    /// @notice Token contract for quality metrics
    IMintableToken public qualContract;
    /// @notice Token contract for attention metrics
    IMintableToken public atteContract;

    constructor() Ownable(msg.sender) { }

    /**
     * @notice Sets addresses for scoring token contracts
     * @dev Only callable by contract owner
     * @param _speedContract Speed token contract address
     * @param _qualContract Quality token contract address
     * @param _atteContract Attention token contract address
     */
    function setContracts(
        IMintableToken _speedContract,
        IMintableToken _qualContract, 
        IMintableToken _atteContract
    ) external onlyOwner {
        speedContract = _speedContract;
        qualContract = _qualContract;
        atteContract = _atteContract;
    }

    /**
     * @notice Sets the product contract address
     * @dev Only callable by contract owner
     * @param _productContract Product contract address
     */
    function setProductContract(iProductContract _productContract) external onlyOwner {
        productContract = _productContract;
    }

    /**
     * @notice Submit scores for a product purchase
     * @param _qual Quality score
     * @param _spd Speed score
     * @param _atte Attention score
     * @param tokenId Product NFT token ID being scored
     */
    function score(uint _qual, uint _spd, uint _atte, uint tokenId) external {
        address to = productContract.getRetailAddress(tokenId);
        require(productContract.ownerOf(tokenId)==msg.sender,"not the token owner");
        require(!productContract.isUsed(tokenId),"already qualified");
        
        productContract.changeUsed(tokenId);
        speedContract.mint(to, _spd);
        qualContract.mint(to, _qual);
        atteContract.mint(to, _atte);
    }
}

/**
 * @title IMintableToken Interface
 * @dev Interface for ERC20 tokens with minting capability
 */
interface IMintableToken is IERC20 {
    /// @notice Mints new tokens to a specified address
    /// @param to Address to receive tokens
    /// @param amount Amount of tokens to mint
    function mint(address to, uint256 amount) external;
}

/// @dev Interface for product contract functions
interface iProductContract {
    /// @notice Gets product characteristics
    function characteristic(uint256) external returns(Sproduct memory);
    /// @notice Gets NFT owner
    function ownerOf(uint256 _tokenId) external view returns (address);
    /// @notice Mints new product NFTs
    function safeMint(uint256 _idOfProduct, uint256 _quantity) external;
    /// @notice Adds new product listing
    function addNewProduct(Sproduct calldata _product) external;
    /// @notice Updates product quantity
    function changeQuantity(uint256 _productIndex, uint256 _newAmount) external;
    /// @notice Sets scoring contract
    function setScoreContract(address _scoreContract) external;
    /// @notice Marks product as used
    function changeUsed(uint256 _productIndex) external;
    /// @notice Checks if product is used
    function isUsed(uint256 _tokenId) external view returns (bool);
    /// @notice Gets retailer address
    function getRetailAddress(uint256 _tokenId) external view returns (address);
}

/// @dev Product struct used by interface
struct Sproduct {
    uint256 price;
    uint256 quantity;
    address retailAddr;
    string name;
    string image;
    string description;
    bool used;
}