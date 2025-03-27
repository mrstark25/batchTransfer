// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract BatchTransfer is Ownable, ReentrancyGuard {
    event BatchETHTransfer(address indexed sender, uint256 totalAmount, uint256 successCount);
    event BatchERC20Transfer(address indexed sender, address token, uint256 totalAmount, uint256 successCount);

    constructor() Ownable(msg.sender) {}

   
    function batchTransferETH(address[] calldata recipients, uint256[] calldata amounts) external payable onlyOwner nonReentrant {
        require(recipients.length == amounts.length, "Mismatched input arrays");
        uint256 successCount = 0;
        uint256 totalAmount = 0;
        
        for (uint256 i = 0; i < recipients.length; i++) {
            totalAmount += amounts[i];
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            if (success) {
                successCount++;
            }
        }
        require(totalAmount <= msg.value, "Insufficient ETH sent");
        emit BatchETHTransfer(msg.sender, totalAmount, successCount);
    }


    function batchTransferERC20(address token, address[] calldata recipients, uint256[] calldata amounts) external onlyOwner nonReentrant {
        require(recipients.length == amounts.length, "Mismatched input arrays");
        uint256 successCount = 0;
        uint256 totalAmount = 0;
        
        for (uint256 i = 0; i < recipients.length; i++) {
            totalAmount += amounts[i];
            bool success = IERC20(token).transferFrom(msg.sender, recipients[i], amounts[i]);
            if (success) {
                successCount++;
            }
        }
        emit BatchERC20Transfer(msg.sender, token, totalAmount, successCount);
    }

    receive() external payable {}
}
