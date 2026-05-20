import type { RewardClass, RewardGateStatus } from "../types/academy";
import { academyData } from "./academyData";

export const rewardGateService = {
  getRewardGates(courseId: string) {
    return academyData.rewardGates.filter((gate) => gate.courseId === courseId);
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
    if (["lesson", "module"].includes(source)) return currentStatus;
    if (!pokApproved) return currentStatus === "unlocked" ? "unlocked" : "locked";
    return "unlocked";
  },

  getUnlockedAmount(courseId: string) {
    return this.getRewardGates(courseId)
      .filter((gate) => gate.status === "unlocked")
      .reduce((sum, gate) => sum + gate.rewardAmount, 0);
  },

  getValidationWeight(courseId: string) {
    return this.getRewardGates(courseId)
      .filter((gate) => ["quiz", "certification"].includes(gate.source))
      .reduce((sum, gate) => sum + gate.rewardPercentage, 0);
  }
};
