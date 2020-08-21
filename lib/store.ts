import {createContext} from 'react';
import {Actions, TutorialState} from './types';

export const initialState: {
  dispatch: React.Dispatch<{
    type: Actions;
    payload: any;
  }>;
  state: TutorialState;
} = {
  dispatch: () => {},
  state: {
    activeTutorial: undefined,
  },
};

console.log('trigger test');
export const store = createContext(initialState);
