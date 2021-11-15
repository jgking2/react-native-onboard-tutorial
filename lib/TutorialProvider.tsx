import * as React from "react";
import { Actions, TutorialState, Tutorial, TutorialEvent } from "./types";
import { store, initialState } from "./store";
import { TutorialOverlay } from "./components/TutorialOverlay";

const noop = () => {};
const { Provider } = store;

interface TutorialProviderProps {
  children: any;
  tutorial: Tutorial;
  onEvent?: (eventType: TutorialEvent, event?: any) => void;
}

const TutorialProvider = ({
  children,
  tutorial,
  onEvent = noop,
}: TutorialProviderProps) => {
  const [state, dispatch] = React.useReducer(
    React.useCallback(
      (
        state: TutorialState,
        { type, payload }: { type: Actions; payload: any }
      ) => {
        switch (type) {
          case "tutorial/set":
            return {
              activeTutorial: payload,
            };
          case "tutorial/end":
            onEvent("end");
            return {
              ...state,
              activeTutorial: {
                ...state.activeTutorial,
                active: false,
              },
            };
          case "tutorial/start":
            onEvent("start");
            return {
              activeTutorial: {
                ...state.activeTutorial,
                active: true,
              },
            };
          case "tutorial/next":
            const { activeTutorial } = state;
            const previousStep = activeTutorial?.currentStep;
            const steppingTo = activeTutorial?.currentStep + payload;
            const nextStep = activeTutorial?.steps[steppingTo];

            onEvent(nextStep ? "step" : "complete", {
              from: activeTutorial?.steps[previousStep!],
              to: nextStep,
            });
            return {
              activeTutorial: {
                ...activeTutorial,
                currentStep: steppingTo,
              },
            };
          default:
            return state;
        }
      },
      []
    ),
    {
      ...initialState.state,
      activeTutorial: tutorial,
    }
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, TutorialProvider };
