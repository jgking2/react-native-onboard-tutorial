import React from "react";
import { StyleSheet, View } from "react-native";
import { useActiveStep } from "../hooks";

export const TutorialOverlay = () => {
  const step = useActiveStep();
  if (!step?.showOverlay) {
    return null;
  }
  return <View style={styles.overlay} />;
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    zIndex: 50,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
