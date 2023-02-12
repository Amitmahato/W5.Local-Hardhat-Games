//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game4 {
    uint8 y = 210;

    event Winner(address winner);

    function win(uint8 x) public {
        unchecked {
            // reuqires overflowing the sum intentionally
            // since anything added to 210 without overflow won't make it 10, considering:
            // 210 + 45 = 255
            // 210 + 46 = 0
            // 210 + 47 = 1
            // .
            // .
            // .
            // 210 + (46 + 10 = 56 ) = 10
            // therefore x = 56 to win the game
            uint8 sum = x + y;
            require(sum == 10, "Incorrect argument passed in!");
        }
        emit Winner(msg.sender);
    }
}
