import React, {useState} from 'react';
import {useStepListener} from '../hooks';
import {TutorialStepComponent, Step as TSD} from '../types';

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
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState<TSD | undefined>(undefined);
  useStepListener((current, previous) => {
    console.log(current, stepId);
    if (current?.id === stepId) {
      setIsActive(true);
      setStep(current);
      onEnter({direction: 'left'});
    }
    if (previous?.id === stepId) {
      setIsActive(false);
      setStep(undefined);
      onExit({direction: 'right'});
    }
  });

  return <>{children(text ?? step?.text, isActive)}</>;
};
