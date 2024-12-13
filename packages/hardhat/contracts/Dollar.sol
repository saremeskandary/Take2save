// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dollar is ERC20, Ownable {
    address public productContract;

    constructor() ERC20("Dollar", "USD") Ownable(msg.sender) {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function setProductContract(address _productContract) external onlyOwner {
        productContract = _productContract;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // permito que si es el contrato de producto pueda sacarle los tokens sin approve para mayor facilidad
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