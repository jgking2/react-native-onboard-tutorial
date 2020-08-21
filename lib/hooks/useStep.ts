import {useTutorial} from './useTutorial';
import {Step} from '../types';

/**
 * If found returns the step, otherwise returns undefined.
 * @param stepId the identifier of the target step
 */
export const useStep = (stepId: string): Step | undefined => {
  const activeTutorial = useTutorial();
  const step = activeTutorial?.steps?.find((st) => st.id === stepId);
  return step;
};
