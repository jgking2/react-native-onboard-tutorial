import {store} from '../store';
import {useContext} from 'react';

/**
 * Returns the current active tutorial
 */
export const useTutorial = () => {
  const {state} = useContext(store);
  return state.activeTutorial;
};
