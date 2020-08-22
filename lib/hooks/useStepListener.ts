import { useRef, useEffect } from "react";
import { ActiveStep } from "../types";
import { useActiveStep } from "./useActiveStep";

/**
 * Triggers when a step is taken in the tutorial.
 * @param onStep A function that is invoked when a step is taken
 */
export const useStepListener = (
  onStep: (current?: ActiveStep, previous?: ActiveStep) => void
) => {
  const currentStep = useActiveStep();
  const previousStep = useRef<ActiveStep>();
  useEffect(() => {
    if (currentStep?.id !== previousStep.current?.id) {
      onStep(currentStep, previousStep.current);
      previousStep.current = currentStep;
    }
  }, [currentStep, onStep]);
};
