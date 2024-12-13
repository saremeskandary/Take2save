// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Product is ERC721, ERC721Enumerable, Ownable {
    //address del que mintea los tokens de calificacion
    address public scoreContract;
    //address del contrato para pagar
    IERC20 public dollarContract;
    // Id of the token
    uint256 private _nextTokenId;
    //How many products do we have to iterate
    uint256 nextProductIndex;
    // info o prdocut
    struct Sproduct {
        uint256 price;
        uint256 quantity;
        address retailAddr;
        string name;
        string image;
        string description;
        bool used;
    }
    // Id of product, pointing a product. Just one for the kind
    mapping (uint256 => Sproduct) public products;
    // All Ids of products belonging to the user
    mapping (address => uint256[]) public productsOdOwner;
    // values for each tokenId
    mapping (uint256 => Sproduct) public characteristic;

    constructor() ERC721("Product", "PROD") Ownable(msg.sender) {}

    function setDollarContract(IERC20 _dollarContract) public onlyOwner {
        dollarContract = _dollarContract;
    }

    // creo una cierta cantidad de tokens del producto identificado por idOfProduct y lo pago
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

    //agrego nuevos productos
    function addNewProduct(Sproduct calldata _product) external {
        uint256 _nextProductIndex = nextProductIndex++;
        products[_nextProductIndex] = _product;
        productsOdOwner[msg.sender].push(_nextProductIndex);
    }

    function changeQuantity(uint256 _productIndex, uint256 _newAmount) external {
        require(products[_productIndex].retailAddr == msg.sender, "Not the retail");
        products[_productIndex].quantity = _newAmount;
    }


    function setScoreContract(address _scoreContract) public onlyOwner {
        scoreContract = _scoreContract;
    }

    modifier onlyScore() {
        require(scoreContract==msg.sender,"not allowed to score");
        _;
    }

    function changeUsed(uint256 _productIndex) external onlyScore {
        characteristic[_productIndex].used = true;
    }

    function isUsed(uint256 _tokenId) public view returns (bool) {
        return characteristic[_tokenId].used;
    }

    function getRetailAddress(uint256 _tokenId) public view returns (address) {
        return characteristic[_tokenId].retailAddr;
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}