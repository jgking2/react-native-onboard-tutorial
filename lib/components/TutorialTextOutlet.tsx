import React from "react";
import {
  ViewStyle,
  StyleProp,
  View,
  Text,
  TextProps,
  StyleSheet,
} from "react-native";
import { useActiveStep } from "../hooks";
import type { Step } from "../types";

const alwaysTrue = () => true;

export interface TutorialTextOutletProps<T> {
  /**
   * Optional component for a custom Text component
   */
  TextComponent?: React.ComponentClass<T>;
  /**
   * Props to pass to the
   */
  textProps?: T;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Fine grain control over visibility based on step
   */
  stepFilter?: (step?: Step) => boolean;
}

export const TutorialTextOutlet = ({
  textProps,
  containerStyle,
  stepFilter = alwaysTrue,
  TextComponent = Text,
}: TutorialTextOutletProps<TextProps>) => {
  const activeStep = useActiveStep();

  const shouldDisplay = React.useMemo(() => {
    let filterIncludesOutlet = stepFilter(activeStep);
    let validDisplay = activeStep?.showOutlet ?? false;
    return validDisplay && filterIncludesOutlet;
  }, [stepFilter, activeStep]);

  const text = activeStep?.outletText ?? activeStep?.text;

  if (shouldDisplay) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TextComponent {...textProps}>{text}</TextComponent>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
