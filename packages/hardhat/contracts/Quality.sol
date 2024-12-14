// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Quality Token Contract
 * @dev ERC20 token representing quality metrics in the Take2Save system
 * Quality tokens are earned by retailers based on product quality ratings
 * @custom:security-contact security@take2save.com
 */
contract Quality is ERC20, Ownable {
    /// @notice Address of certification contract allowed to transfer tokens
    address public certificationContract;

    /**
     * @dev Constructor initializes the token with name "Calidad" and symbol "QUAL"
     */
    constructor()
        ERC20("Calidad", "QUAL")
        Ownable(msg.sender)
    {}

    /**
     * @notice Sets the address of the certification contract
     * @dev Only callable by contract owner
     * @param _certificationContract Address of the certification contract
     */
    function setCertificationContract(address _certificationContract) external onlyOwner {
        certificationContract = _certificationContract;
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
     * @notice Override decimals to 0 for whole number token amounts
     * @return uint8 Number of decimals (0)
     */
    function decimals() public pure override returns (uint8) {
        return 0;
    }

    /**
     * @notice Override transferFrom to allow certification contract transfers without approval
     * @param from Address tokens are transferred from
     * @param to Address tokens are transferred to
     * @param value Amount of tokens to transfer
     * @return bool Success of transfer operation
     */
    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        if(msg.sender == certificationContract) {
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