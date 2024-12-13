// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Speed is ERC20, Ownable {

    address public certificationContract;

    constructor()
        ERC20("Speed", "SPD")
        Ownable(msg.sender)
    {}

    function setCertificationContract(address _certificationContract) external onlyOwner {
        certificationContract = _certificationContract;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

        // permito que si es el contrato de producto pueda sacarle los tokens sin approve para mayor facilidad
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