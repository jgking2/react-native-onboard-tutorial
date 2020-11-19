import * as React from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Text,
  View,
  Alert,
  TextProps,
} from "react-native";
import {
  useNextTutorialStep,
  useEndTutorial,
  useTutorial,
  useActiveStep,
} from "../hooks";

interface TutorialControlsProps {
  backText?: string;
  backStyle?: StyleProp<ViewStyle>;
  backTextProps?: TextProps;
  nextText?: string;
  nextStyle?: StyleProp<ViewStyle>;
  nextTextProps?: TextProps;
  skipText?: string;
  skipStyle?: StyleProp<ViewStyle>;
  skipTextProps?: TextProps;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TutorialControls = ({
  backText = "Back",
  backTextProps = {},
  backStyle,
  nextText = "Next",
  nextTextProps = {},
  nextStyle,
  skipText = "Skip",
  skipTextProps = {},
  skipStyle,
  containerStyle,
}: TutorialControlsProps) => {
  const tutorial = useTutorial();
  const currentStep = useActiveStep();
  const takeStep = useNextTutorialStep();
  const endTutorial = useEndTutorial();

  const confirmThenEnd = React.useCallback(() => {
    Alert.alert("Cancel tutorial", "Are you sure?", [
      { text: "Yep!", onPress: endTutorial, style: "destructive" },
      { text: "Nevermind", onPress: () => {}, style: "cancel" },
    ]);
  }, [endTutorial]);
  const stepForward = React.useCallback(() => {
    takeStep();
  }, [takeStep]);

  const stepBack = React.useCallback(() => {
    //Prevent ending the tutorial
    if (tutorial?.currentStep) {
      takeStep(-1);
    }
  }, [takeStep, tutorial?.currentStep]);
  if (!tutorial?.active || !currentStep) return null;
  return (
    <View style={[defaultStyles.container, containerStyle]}>
      <TouchableOpacity
        style={[defaultStyles.button, backStyle]}
        disabled={!tutorial.currentStep}
        onPress={stepBack}
      >
        <Text {...backTextProps}>{backText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[defaultStyles.button, nextStyle]}
        onPress={stepForward}
      >
        <Text {...nextTextProps}>{nextText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[defaultStyles.button, skipStyle]}
        onPress={confirmThenEnd}
      >
        <Text {...skipTextProps}>{skipText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(256,256,256,.9)",
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  button: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
