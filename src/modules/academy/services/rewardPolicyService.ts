import type { RewardGate } from "../types/academy";
import { academyData } from "./academyData";

export const rewardPolicyService = {
  getRewardGates(courseId: string) {
    return academyData.rewardGates.filter((gate) => gate.courseId === courseId);
  },

  getValidationWeight(courseId: string) {
    return this.getRewardGates(courseId)
      .filter((gate) => ["quiz", "certification"].includes(gate.source))
      .reduce((sum, gate) => sum + gate.rewardPercentage, 0);
  },

  getGateStatusAfterPok(gate: Pick<RewardGate, "status" | "source">, pokApproved: boolean) {
    if (["lesson", "module"].includes(gate.source)) return gate.status;
    if (!pokApproved) return gate.status === "unlocked" ? "unlocked" : "locked";
    return "unlocked";
  },

  validateRewardClassSeparation(courseId: string) {
    const course = academyData.courses.find((item) => item.id === courseId);
    const expectedClass = course?.accessType === "paid" ? "applied" : "foundation";
    return this.getRewardGates(courseId).every((gate) => gate.rewardClass === expectedClass);
  }
};
