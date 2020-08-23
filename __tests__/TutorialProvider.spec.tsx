import "react-native";
import React from "react";
import { TutorialProvider } from "../lib/TutorialProvider";
import { render, fireEvent } from "@testing-library/react-native";
import { Tutorial } from "../lib/types";
import { View, Text } from "react-native";
import {
  TutorialText,
  TutorialControls,
  TutorialHighlight,
  TutorialTextOutlet,
} from "../lib";

describe("TutorialProvider", () => {
  test("All the things", async () => {
    const nextButtonText = "Next_test";
    const backButtonText = "Back_test";

    const tutorial: Tutorial = {
      id: "hmm",
      active: true,
      currentStep: 0,
      steps: [
        {
          id: "first",
          text: "First!",
          type: "text",
        },
        {
          id: "second",
          outletText: "Outlet active!",
          showOutlet: true,
        },
      ],
    };
    const onEvent = jest.fn();

    const onEnter = jest.fn();
    const onExit = jest.fn();

    const onEnterHighlight = jest.fn();
    const onExitHighlight = jest.fn();

    const { getByText, queryByText, getByA11yLabel, queryByA11yLabel } = render(
      <TutorialProvider tutorial={tutorial} onEvent={onEvent}>
        <View>
          <TutorialTextOutlet />
          <TutorialText stepId={"first"} onExit={onExit} onEnter={onEnter}>
            <Text>Step One!</Text>
          </TutorialText>
          {/* @ts-ignore */}
          <TutorialHighlight
            stepId={"second"}
            onEnter={onEnterHighlight}
            onExit={onExitHighlight}
          >
            <Text>Step Dos!</Text>
          </TutorialHighlight>
          <TutorialControls
            backText={backButtonText}
            nextText={nextButtonText}
          ></TutorialControls>
        </View>
      </TutorialProvider>
    );

    const backButton = getByText(backButtonText);
    const continueButton = getByText(nextButtonText);
    const matches = await getByA11yLabel("First!");
    expect(matches).toBeDefined();
    expect(onEnter).toBeCalledTimes(1);
    expect(onExit).toBeCalledTimes(0);
    expect(onEnter).toBeCalledWith({
      direction: "forward",
      step: tutorial.steps[0],
    });
    fireEvent.press(continueButton);
    expect(onExit).toBeCalledWith({
      direction: "forward",
      step: tutorial.steps[0],
    });
    expect(onEvent).toBeCalledTimes(1);
    expect(onEnter).toBeCalledTimes(1);
    expect(onExit).toBeCalledTimes(1);
    //Initial tag disappears.
    const shouldBeUndefined = await queryByA11yLabel("First!");
    expect(shouldBeUndefined).toBeNull();

    //Let's check on the second step - should show up in the outlet.
    expect(onEnterHighlight).toBeCalledTimes(1);
    const secondStep = await getByText(tutorial.steps[1].outletText!);
    expect(secondStep).toBeDefined();
    //Alrightlet's go back.
    fireEvent.press(backButton);
    expect(onEnter).toBeCalledWith({
      direction: "backward",
      step: tutorial.steps[0],
    });
    expect(onEvent).toBeCalledTimes(2);
    expect(onExitHighlight).toBeCalledTimes(1);
    expect(onExitHighlight).toBeCalledWith({
      direction: "backward",
      step: tutorial.steps[1],
    });
    expect(onEnter).toBeCalledTimes(2);

    const outlet = await queryByText(tutorial.steps[1].outletText!);
    expect(outlet).toBeNull();
  });
});
