import { useTutorial } from "./useTutorial";
import { ActiveStep } from "../types";

/**
 * Returns the current step in the tutorial
 */
export const useActiveStep = (): ActiveStep | undefined => {
  const activeTutorial = useTutorial();
  const step = activeTutorial?.steps[activeTutorial.currentStep ?? 0];
  if (!activeTutorial?.active || !step) {
    return undefined;
  }
  return {
    _index: activeTutorial?.currentStep ?? 0,
    ...step,
  } as ActiveStep;
};
