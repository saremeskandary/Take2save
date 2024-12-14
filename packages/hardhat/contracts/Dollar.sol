// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Dollar Token Contract
 * @dev ERC20 token representing a stablecoin for payments in the Take2Save system
 * Used for product purchases and monetary transactions within the platform
 * @custom:security-contact security@take2save.com
 */
contract Dollar is ERC20, Ownable {
    /// @notice Address of product contract allowed special transfer privileges
    address public productContract;

    /**
     * @dev Constructor initializes the token with name "Dollar" and symbol "USD"
     * Mints initial supply of 10,000 tokens to the contract owner
     */
    constructor() ERC20("Dollar", "USD") Ownable(msg.sender) {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    /**
     * @notice Sets the address of the product contract
     * @dev Only callable by contract owner
     * @param _productContract Address of the product contract
     */
    function setProductContract(address _productContract) external onlyOwner {
        productContract = _productContract;
    }

    /**
     * @notice Mints new tokens to a specified address
     * @dev Only callable by contract owner
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Override transferFrom to allow product contract transfers without approval
     * @dev Used for streamlined product purchases
     * @param from Address tokens are transferred from
     * @param to Address tokens are transferred to
     * @param value Amount of tokens to transfer
     * @return bool Success of transfer operation
     */
    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        if(msg.sender == productContract) {
            _transfer(from, to, value);
            return true;
        } else {
            address spender = _msgSender();
            _spendAllowance(from, spender, value);
            _transfer(from, to, value);
            return true;
        }
    }
}