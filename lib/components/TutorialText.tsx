import React from "react";
import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TutorialStep } from "./TutorialStep";
import type { TutorialStepComponent } from "../types";

interface TutorialTextBlockProps {
  visible?: boolean;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

interface TutorialTextProps
  extends TutorialTextBlockProps,
    TutorialStepComponent {}

const TutorialTextBlock = ({
  visible,
  text,
  containerStyle,
  textStyle,
}: TutorialTextBlockProps) => {
  const animation = React.useRef(new Animated.Value(0));
  const transform = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });
  const scale = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  React.useEffect(() => {
    let toValue = visible ? 1 : 0;
    Animated.timing(animation.current, {
      toValue,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animation.current, visible]);
  return (
    <Animated.View
      style={[
        defaultStyles.container,
        containerStyle,
        {
          opacity: animation.current,
          transform: [{ translateY: transform }, { scale: scale }],
        },
      ]}
    >
      <Text style={[defaultStyles.text, textStyle]}>{text}</Text>
    </Animated.View>
  );
};

export const TutorialText = ({
  children,
  text,
  containerStyle,
  textStyle,
  ...props
}: TutorialTextProps) => {
  return (
    <TutorialStep {...props}>
      {(stepText, active) => {
        return (
          <>
            <View
              accessibilityLabel={active ? text ?? stepText : ""}
              pointerEvents={"none"}
              style={{
                zIndex: 200,
                flexDirection: "row",
                justifyContent: "center",
                overflow: "visible",
              }}
            >
              <TutorialTextBlock
                text={text ?? stepText}
                visible={active}
                textStyle={textStyle}
                containerStyle={containerStyle}
              />
            </View>
            {children}
          </>
        );
      }}
    </TutorialStep>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    position: "absolute",
    zIndex: 20,
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  text: {
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
