//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";

contract Game3 {
    uint8 y = 210;

    event Winner(address winner);

    function win(uint8 x) public {
        // `unchecked` - means don't throw any error and let the value in sum overflow
        // which means if sum = 45 + 210 = 255, which is within the range of uint8
        // but when sum = 46 + 210 = 256 = 255 + 1 = 0, after 255 increments 1 more to loop back to 0
        // if sum = 210 + 47 = ... = 1, and so on
        // if `unchecked` wasn't used anything for x greater than 45 would revert the transaction with an error:
        // `reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)`
        unchecked {
            uint8 sum = x + y;
            console.log("Sum: ", sum);
            require(sum == 255, "Incorrect argument passed in!");
        }
        emit Winner(msg.sender);
    }
}
