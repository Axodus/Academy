import { describe, expect, it } from "vitest";
import { getCourseAction, getCurrentLearningRecord, getLearningState, getPathStages, getUpcomingUnlocks } from "../src/modules/academy/services/academyUi";

describe("Academy presentation selectors", () => {
  it("maps fixture enrollments to actionable learning states", () => {
    expect(getLearningState("course-constitutional-onboarding")).toBe("continue");
    expect(getLearningState("course-marketplace-activation")).toBe("completed-preview");
    expect(getLearningState("course-pok-certification")).toBe("review-required");
  });

  it("selects the most advanced active incomplete course", () => {
    expect(getCurrentLearningRecord()?.course.id).toBe("course-constitutional-onboarding");
    expect(getCourseAction("course-constitutional-onboarding").label).toBe("Continue");
  });

  it("derives milestones and unlocks only from existing fixture records", () => {
    expect(getPathStages("path-governance-operator").map((stage) => stage.course.id)).toEqual([
      "course-constitutional-onboarding",
      "course-governance-risk",
      "course-pok-certification"
    ]);
    expect(getUpcomingUnlocks()).toHaveLength(4);
    expect(getUpcomingUnlocks().every((item) => item.description.length > 0)).toBe(true);
  });
});
