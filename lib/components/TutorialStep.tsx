import * as React from "react";
import { useStepListener, useStep } from "../hooks";
import { TutorialStepComponent, Step } from "../types";

export interface TutorialStepProps extends TutorialStepComponent {
  children: (text: string | undefined, active: boolean) => any;
  visible?: boolean;
}
export const TutorialStep = ({
  children,
  text,
  stepId,
  onEnter = () => {},
  onExit = () => {},
}: TutorialStepProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const step = useStep(stepId!);
  useStepListener((current, previous) => {
    let direction: "backward" | "forward" =
      (current?._index ?? 0) >= (previous?._index ?? 0)
        ? "forward"
        : "backward";
    if (current?.id === stepId && !!stepId) {
      setIsActive(true);
      onEnter({ direction, step });
    }
    if (previous?.id === stepId && !!stepId) {
      setIsActive(false);
      onExit({ direction, step });
    }
  });

  return <>{children(text ?? step?.text, isActive)}</>;
};
