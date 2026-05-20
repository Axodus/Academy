// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {LockedNeuronsVault} from "./LockedNeuronsVault.sol";
import {PoKMinter} from "./PoKMinter.sol";

contract UnauthorizedCaller {
    function credit(LockedNeuronsVault vault, address account, uint256 amount, bytes32 reason) external {
        vault.credit(account, amount, reason);
    }

    function recordValidation(PoKMinter minter, address student, bytes32 courseId, uint16 scoreBps, uint256 rewardAmount, bytes32 proofHash) external {
        minter.recordValidation(student, courseId, scoreBps, rewardAmount, proofHash);
    }
}

contract AcademyHardeningTest {
    LockedNeuronsVault vault;
    PoKMinter minter;
    UnauthorizedCaller unauthorized;

    address student = address(0xBEEF);
    bytes32 courseId = keccak256("course-constitutional-onboarding");
    bytes32 policyHash = keccak256("policy-v1");
    bytes32 proofHash = keccak256("proof-v1");

    function setUp() public {
        vault = new LockedNeuronsVault(address(this));
        minter = new PoKMinter(address(this), address(vault));
        unauthorized = new UnauthorizedCaller();
        vault.setIssuer(address(minter), true);
        minter.setCoursePolicy(courseId, PoKMinter.RewardClass.Locked, 320, 8000, policyHash);
    }

    function test_ValidPoKRewardClaimCreditsLockedVault() public {
        minter.recordValidation(student, courseId, 9100, 160, proofHash);

        (uint256 totalCredited, uint256 spent, uint256 availableBalance) = vault.balanceOf(student);
        require(totalCredited == 160, "locked total mismatch");
        require(spent == 0, "spent should be zero");
        require(availableBalance == 160, "available mismatch");
    }

    function test_ReplayProofRejected() public {
        minter.recordValidation(student, courseId, 9100, 160, proofHash);

        try minter.recordValidation(address(0xCAFE), courseId, 9100, 160, proofHash) {
            revert("proof replay should fail");
        } catch {}
    }

    function test_DoubleValidationRejected() public {
        minter.recordValidation(student, courseId, 9100, 160, proofHash);

        try minter.recordValidation(student, courseId, 9200, 160, keccak256("proof-v2")) {
            revert("double validation should fail");
        } catch {}
    }

    function test_UnauthorizedCallerRejected() public {
        try unauthorized.recordValidation(minter, student, courseId, 9100, 160, proofHash) {
            revert("unauthorized validation should fail");
        } catch {}

        try unauthorized.credit(vault, student, 1, proofHash) {
            revert("unauthorized credit should fail");
        } catch {}
    }

    function test_RewardCapEnforced() public {
        try minter.recordValidation(student, courseId, 9100, 321, proofHash) {
            revert("reward cap should fail");
        } catch {}
    }

    function test_InternalSpendFlow() public {
        minter.recordValidation(student, courseId, 9100, 160, proofHash);
        vault.spend(student, 40, keccak256("marketplace-voucher"));

        (, uint256 spent, uint256 availableBalance) = vault.balanceOf(student);
        require(spent == 40, "spent mismatch");
        require(availableBalance == 120, "available after spend mismatch");
    }
}
