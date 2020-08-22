import * as React from "react";
import { useStepListener } from "../hooks";
import { TutorialStepComponent, Step } from "../types";

export interface TutorialStepProps extends TutorialStepComponent {
  children: (text: string | undefined, active: boolean) => any;
  visible?: boolean;
}
export const TutorialStep = ({
  children,
  text,
  stepId,
  skip = false,
  onEnter = () => {},
  onExit = () => {},
}: TutorialStepProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const [step, setStep] = React.useState<Step | undefined>(undefined);
  useStepListener((current, previous) => {
    if (current?.id === stepId) {
      setIsActive(true);
      setStep(current);
      onEnter({ direction: "left" });
    }
    if (previous?.id === stepId) {
      setIsActive(false);
      setStep(undefined);
      onExit({ direction: "right" });
    }
  });

  return <>{children(text ?? step?.text, isActive)}</>;
};
