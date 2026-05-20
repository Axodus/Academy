import type { RewardClass, RewardGateStatus } from "../types/academy";
import { academyData } from "./academyData";
import { rewardPolicyService } from "./rewardPolicyService";

export const rewardGateService = {
  getRewardGates(courseId: string) {
    return rewardPolicyService.getRewardGates(courseId);
  },

  getRewardEvents(courseId: string) {
    return academyData.rewardUnlockEvents.filter((event) => event.courseId === courseId);
  },

  getRewardClass(courseId: string): RewardClass {
    const course = academyData.courses.find((item) => item.id === courseId);
    return course?.accessType === "paid" ? "unlocked" : "locked";
  },

  getRewardTypeLabel(courseId: string) {
    return this.getRewardClass(courseId) === "unlocked" ? "Unlocked $NEURONS" : "Locked $NEURONS";
  },

  getGateStatusAfterPok(currentStatus: RewardGateStatus, source: string, pokApproved: boolean): RewardGateStatus {
    return rewardPolicyService.getGateStatusAfterPok({ status: currentStatus, source: source as any }, pokApproved) as RewardGateStatus;
  },

  getUnlockedAmount(courseId: string) {
    return this.getRewardGates(courseId)
      .filter((gate) => gate.status === "unlocked")
      .reduce((sum, gate) => sum + gate.rewardAmount, 0);
  },

  getValidationWeight(courseId: string) {
    return rewardPolicyService.getValidationWeight(courseId);
  }
};
