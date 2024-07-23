// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {GovernanceToken} from "../src/GovernanceToken.sol";
import {CreateGovernanceToken} from "../src/CreateGovernanceToken.sol";
import {UserSide} from "../src/UserSide.sol";

contract DeployContracts is Script {
    uint256 public constant INITIAL_SUPPLY = 1000000 ether;
    string public constant TOKEN_NAME = "Developer Token";
    string public constant TOKEN_SYMBOL = "DTK";

    function run()
        external
        returns (GovernanceToken, CreateGovernanceToken, UserSide)
    {
        vm.startBroadcast();
        GovernanceToken governanceToken = new GovernanceToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            INITIAL_SUPPLY
        );
        CreateGovernanceToken createGovernanceToken = new CreateGovernanceToken();
        UserSide userSide = new UserSide();
        vm.stopBroadcast();
        return (governanceToken, createGovernanceToken, userSide);
    }
}
