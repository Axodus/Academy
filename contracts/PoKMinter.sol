// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {OwnableLite} from "./OwnableLite.sol";
import {LockedNeuronsVault} from "./LockedNeuronsVault.sol";

contract PoKMinter is OwnableLite {
    enum RewardClass {
        Locked,
        Unlocked
    }

    struct CoursePolicy {
        bool active;
        RewardClass rewardClass;
        uint256 maxReward;
        uint16 passingScoreBps;
        bytes32 policyHash;
    }

    struct Validation {
        bool approved;
        uint16 scoreBps;
        uint256 rewardAmount;
        RewardClass rewardClass;
        bytes32 proofHash;
        uint256 validatedAt;
    }

    LockedNeuronsVault public immutable lockedVault;
    mapping(address => bool) public validators;
    mapping(bytes32 => CoursePolicy) public coursePolicies;
    mapping(address => mapping(bytes32 => Validation)) public validations;
    mapping(bytes32 => bool) public proofHashUsed;

    event ValidatorUpdated(address indexed validator, bool enabled);
    event CoursePolicySet(bytes32 indexed courseId, bool active, RewardClass rewardClass, uint256 maxReward, uint16 passingScoreBps, bytes32 policyHash);
    event ProofOfKnowledgeValidated(address indexed student, bytes32 indexed courseId, bool approved, uint16 scoreBps, uint256 rewardAmount, RewardClass rewardClass, bytes32 proofHash);

    modifier onlyValidator() {
        require(validators[msg.sender] || msg.sender == owner, "POK_NOT_VALIDATOR");
        _;
    }

    constructor(address initialOwner, address lockedVaultAddress) OwnableLite(initialOwner) {
        require(lockedVaultAddress != address(0), "POK_ZERO_VAULT");
        lockedVault = LockedNeuronsVault(lockedVaultAddress);
    }

    function setValidator(address validator, bool enabled) external onlyOwner {
        require(validator != address(0), "POK_ZERO_VALIDATOR");
        validators[validator] = enabled;
        emit ValidatorUpdated(validator, enabled);
    }

    function setCoursePolicy(bytes32 courseId, RewardClass rewardClass, uint256 maxReward, uint16 passingScoreBps, bytes32 policyHash) external onlyOwner {
        require(courseId != bytes32(0), "POK_ZERO_COURSE");
        require(passingScoreBps <= 10000, "POK_BAD_THRESHOLD");
        coursePolicies[courseId] = CoursePolicy({
            active: true,
            rewardClass: rewardClass,
            maxReward: maxReward,
            passingScoreBps: passingScoreBps,
            policyHash: policyHash
        });
        emit CoursePolicySet(courseId, true, rewardClass, maxReward, passingScoreBps, policyHash);
    }

    function setCoursePolicyActive(bytes32 courseId, bool active) external onlyOwner {
        CoursePolicy storage policy = coursePolicies[courseId];
        require(policy.policyHash != bytes32(0), "POK_POLICY_NOT_FOUND");
        policy.active = active;
        emit CoursePolicySet(courseId, active, policy.rewardClass, policy.maxReward, policy.passingScoreBps, policy.policyHash);
    }

    function recordValidation(address student, bytes32 courseId, uint16 scoreBps, uint256 rewardAmount, bytes32 proofHash) external onlyValidator {
        require(student != address(0), "POK_ZERO_STUDENT");
        require(proofHash != bytes32(0), "POK_ZERO_PROOF");
        CoursePolicy memory policy = coursePolicies[courseId];
        require(policy.active, "POK_POLICY_INACTIVE");
        require(scoreBps <= 10000, "POK_BAD_SCORE");
        require(rewardAmount <= policy.maxReward, "POK_REWARD_EXCEEDS_POLICY");
        require(validations[student][courseId].validatedAt == 0, "POK_ALREADY_VALIDATED");
        require(!proofHashUsed[proofHash], "POK_PROOF_REPLAY");

        bool approved = scoreBps >= policy.passingScoreBps;
        uint256 releasedAmount = approved ? rewardAmount : 0;
        proofHashUsed[proofHash] = true;

        validations[student][courseId] = Validation({
            approved: approved,
            scoreBps: scoreBps,
            rewardAmount: releasedAmount,
            rewardClass: policy.rewardClass,
            proofHash: proofHash,
            validatedAt: block.timestamp
        });

        if (approved && policy.rewardClass == RewardClass.Locked && releasedAmount > 0) {
            lockedVault.credit(student, releasedAmount, proofHash);
        }

        emit ProofOfKnowledgeValidated(student, courseId, approved, scoreBps, releasedAmount, policy.rewardClass, proofHash);
    }
}
