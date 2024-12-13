// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;
import "@openzeppelin/contracts/access/Ownable.sol";

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IERC20 {
    function mint(address to, uint256 amount) external;
}

    struct Sproduct {
        uint256 price;
        uint256 quantity;
        address retailAddr;
        string name;
        string image;
        string description;
        bool used;
    }

interface iProductContract{
    function characteristic(uint256) external returns(Sproduct memory);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeMint(uint256 _idOfProduct, uint256 _quantity) external;
    function addNewProduct(Sproduct calldata _product) external;
    function changeQuantity(uint256 _productIndex, uint256 _newAmount) external;
    function setScoreContract(address _scoreContract) external;
    function changeUsed(uint256 _productIndex) external;
    function isUsed(uint256 _tokenId) external view returns (bool);
    function getRetailAddress(uint256 _tokenId) external view returns (address);
}

contract Score is Ownable{

    iProductContract public productContract;
    IERC20 public speedContract;
    IERC20 public qualContract;
    IERC20 public atteContract;

    constructor() Ownable(msg.sender) { }

    function setContracts(IERC20 _speedContract,IERC20 _qualContract, IERC20 _atteContract) external onlyOwner {
        speedContract = _speedContract;
        qualContract = _qualContract;
        atteContract = _atteContract;
    }

    function setProductContract(iProductContract _productContract) external  onlyOwner {
        productContract = _productContract;
    }

    function score(uint _qual, uint _spd, uint _atte, uint tokenId) external  {
        //_mint(to, amount);
        address to = productContract.getRetailAddress(tokenId);
        require(productContract.ownerOf(tokenId)==msg.sender,"not the token owner");
        require(!productContract.isUsed(tokenId),"already qualified");
        //marcar como calificado
        productContract.changeUsed(tokenId);
        speedContract.mint(to,_spd);
        qualContract.mint(to,_qual);
        atteContract.mint(to,_atte);
    }
}