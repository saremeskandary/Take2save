// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Product NFT Contract 
 * @dev Manages product listings and purchases in the Take2Save marketplace as NFTs
 * Each product purchase is represented by an NFT token
 * @custom:security-contact security@take2save.com
 */
contract Product is ERC721, ERC721Enumerable, Ownable {
    /// @notice Contract address for scoring mechanism
    address public scoreContract;

    /// @notice Contract for handling payment in stablecoin
    IERC20 public dollarContract;
    
    /// @notice Counter for token IDs
    uint256 private _nextTokenId;

    /// @notice Counter for product listings
    uint256 nextProductIndex;

    /**
     * @notice Product struct containing listing information
     * @param price Price in stablecoin
     * @param quantity Available quantity
     * @param retailAddr Address of retailer listing the product
     * @param name Product name
     * @param image Product image URI
     * @param description Product description
     * @param used Whether product has been used/redeemed
     */
    struct Sproduct {
        uint256 price;
        uint256 quantity;
        address retailAddr;
        string name;
        string image;
        string description;
        bool used;
    }

    /// @notice Mapping of product ID to product details
    mapping (uint256 => Sproduct) public products;

    /// @notice Mapping of retailer address to their product IDs
    mapping (address => uint256[]) public productsOdOwner;

    /// @notice Mapping of token ID to product characteristics 
    mapping (uint256 => Sproduct) public characteristic;

    /**
     * @dev Constructor initializes the NFT collection
     */
    constructor() ERC721("Product", "PROD") Ownable(msg.sender) {}

    /**
     * @notice Sets the dollar stablecoin contract address
     * @param _dollarContract Address of the dollar contract
     */
    function setDollarContract(IERC20 _dollarContract) public onlyOwner {
        dollarContract = _dollarContract;
    }

    /**
     * @notice Mints product NFT(s) to buyer after payment
     * @param _idOfProduct ID of product to purchase
     * @param _quantity Number of items to purchase
     */
    function safeMint(uint256 _idOfProduct, uint256 _quantity) public {
        require(products[_idOfProduct].quantity>_quantity,"No more tokens to buy");
        products[_idOfProduct].quantity -= _quantity;
        
        dollarContract.transferFrom(msg.sender, address(this), _quantity*products[_idOfProduct].price);
        
        for(uint256 i=0; i < _quantity; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(msg.sender, tokenId);
            characteristic[tokenId] = Sproduct(
                products[_idOfProduct].price,
                1,
                products[_idOfProduct].retailAddr,
                products[_idOfProduct].name,
                products[_idOfProduct].image,
                products[_idOfProduct].description,
                false
            );            
        }
    }

    /**
     * @notice Allows retailer to add a new product listing
     * @param _product Product details struct
     */
    function addNewProduct(Sproduct calldata _product) external {
        uint256 _nextProductIndex = nextProductIndex++;
        products[_nextProductIndex] = _product;
        productsOdOwner[msg.sender].push(_nextProductIndex);
    }

    /**
     * @notice Allows retailer to update product quantity
     * @param _productIndex ID of product to update
     * @param _newAmount New quantity
     */
    function changeQuantity(uint256 _productIndex, uint256 _newAmount) external {
        require(products[_productIndex].retailAddr == msg.sender, "Not the retail");
        products[_productIndex].quantity = _newAmount;
    }

    /**
     * @notice Sets the scoring contract address
     * @param _scoreContract Address of scoring contract
     */
    function setScoreContract(address _scoreContract) public onlyOwner {
        scoreContract = _scoreContract;
    }

    /**
     * @dev Modifier to restrict access to scoring contract
     */
    modifier onlyScore() {
        require(scoreContract==msg.sender,"not allowed to score");
        _;
    }

    /**
     * @notice Marks a product as used/redeemed
     * @param _productIndex ID of product to mark as used
     */
    function changeUsed(uint256 _productIndex) external onlyScore {
        characteristic[_productIndex].used = true;
    }

    /**
     * @notice Checks if a product has been used/redeemed
     * @param _tokenId Token ID to check
     * @return bool Whether product is used
     */
    function isUsed(uint256 _tokenId) public view returns (bool) {
        return characteristic[_tokenId].used;
    }

    /**
     * @notice Gets retailer address for a product
     * @param _tokenId Token ID to check
     * @return address Retailer address
     */
    function getRetailAddress(uint256 _tokenId) public view returns (address) {
        return characteristic[_tokenId].retailAddr;
    }

    // Required overrides for multiple inheritance
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}