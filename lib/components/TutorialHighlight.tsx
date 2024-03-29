import React from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";
import type { TutorialStepComponent } from "../types";
import { TutorialStep } from "./TutorialStep";

interface SharedProps {
  style?: StyleProp<ViewStyle>;
  emphasisScale?: number;
}

interface EmphasizeChildProps extends SharedProps {
  active?: boolean;
  children: any;
}

const EmphasizeChild = ({
  active,
  children,
  style,
  emphasisScale,
}: EmphasizeChildProps) => {
  const animation = React.useRef(new Animated.Value(1));
  const action = Animated.loop(
    Animated.sequence([
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation.current, {
            toValue: emphasisScale ?? 1.02,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animation.current, {
            toValue: 1.0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ),
      Animated.delay(1000),
    ])
  );

  React.useEffect(() => {
    if (active) {
      action.start();
    } else {
      action.reset();
    }
    return action.reset;
  }, [active]);
  return (
    <Animated.View
      style={[style, { transform: [{ scale: animation.current }] }]}
    >
      {children}
    </Animated.View>
  );
};

export interface TutorialHighlightProps
  extends SharedProps,
    TutorialStepComponent {
  children: any;
  skip?: boolean;
}

export const TutorialHighlight = ({
  children,
  skip = false,
  style,
  emphasisScale,
  ...rest
}: TutorialHighlightProps) => {
  return (
    <TutorialStep {...rest}>
      {(_, active) => {
        return (
          <EmphasizeChild
            style={style}
            emphasisScale={emphasisScale}
            active={active}
          >
            {children}
          </EmphasizeChild>
        );
      }}
    </TutorialStep>
  );
};
