import { useRef, useEffect } from "react";
import { Step } from "../types";
import { useActiveStep } from "./useActiveStep";

/**
 * Triggers when a step is taken in the tutorial.
 * @param onStep A function that is invoked when a step is taken
 */
export const useStepListener = (
  onStep: (current?: Step, previous?: Step) => void
) => {
  const currentStep = useActiveStep();
  const previousStep = useRef<Step>();
  useEffect(() => {
    if (currentStep?.id !== previousStep.current?.id) {
      onStep(currentStep, previousStep.current);
      previousStep.current = currentStep;
    }
  }, [currentStep, onStep]);
};
