import {useTutorial} from './useTutorial';
import {Step} from '../types';

/**
 * Returns the current step in the tutorial
 */
export const useActiveStep = (): Step | undefined => {
  const activeTutorial = useTutorial();
  const step = activeTutorial?.steps[activeTutorial.currentStep ?? 0];
  //Return undefined if tutorial isn't active
  return activeTutorial?.active ? step : undefined;
};
