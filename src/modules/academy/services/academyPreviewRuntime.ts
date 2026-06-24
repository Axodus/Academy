import { academyData } from "./academyData";
import type { RuntimePreviewMetadata } from "../types/academy";

function isNonProductionRuntime() {
  return (process.env.NODE_ENV ?? "development") !== "production";
}

function isPreviewMutationFlagEnabled() {
  return process.env.ACADEMY_LOCAL_PREVIEW_MUTATION === "true";
}

export function getAcademyPreviewRuntime(): RuntimePreviewMetadata {
  return {
    authority: "mock-local",
    outputAuthority: "preview-only",
    nonAuthoritative: true,
    production: false,
    execution: "gated",
    previewMutation: isNonProductionRuntime() && isPreviewMutationFlagEnabled() ? "enabled-local-only" : "disabled",
    certificateAuthority: "not-issued",
    rewardAuthority: "non-monetary-preview"
  };
}

export function getAcademyPreviewMutationGate() {
  const runtime = getAcademyPreviewRuntime();
  const runtimeNonProduction = isNonProductionRuntime();
  const previewFlagEnabled = isPreviewMutationFlagEnabled();

  return {
    allowed: runtime.previewMutation === "enabled-local-only",
    runtime,
    conditions: {
      runtimeNonProduction,
      previewFlagEnabled,
      persistenceLocalOnly: academyData.boundary.productionSensitiveGates.productionPersistenceEnabled === false,
      externalProvidersCalled: false,
      walletSigningPerformed: false,
      contractWritesPerformed: false,
      financialActionPerformed: false
    }
  };
}
