import { store } from "../store";
import { useContext, useCallback } from "react";

export const useNextTutorialStep = () => {
  const { dispatch } = useContext(store);
  return useCallback(
    (numSteps: number = 1) => {
      if (typeof numSteps !== "number") {
        numSteps = 1;
      }
      dispatch({
        type: "tutorial/next",
        payload: numSteps,
      });
    },
    [dispatch]
  );
};

export const useEndTutorial = () => {
  const { dispatch } = useContext(store);
  return useCallback(() => {
    dispatch({
      type: "tutorial/end",
      payload: undefined,
    });
  }, [dispatch]);
};

export const useStartTutorial = () => {
  const { dispatch } = useContext(store);
  return useCallback(
    (tutorialId: string) => {
      dispatch({
        type: "tutorial/start",
        payload: tutorialId,
      });
    },
    [dispatch]
  );
};
