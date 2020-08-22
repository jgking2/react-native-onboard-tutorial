/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Pressable,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  TutorialProvider,
  Tutorial,
  TutorialText,
  useNextTutorialStep,
  TutorialHighlight,
  TutorialTextOutlet,
  TutorialControls,
} from 'react-native-onboard-tutorial';

declare const global: {HermesInternal: null | {}};

const tutorial: Tutorial = {
  id: 'onlyone',
  active: true,
  currentStep: 0,
  steps: [
    {
      id: 'stepone',
      text: 'React Native!!!',
    },
    {
      id: 'steptwo',
      text: 'Throb!!',
      showOutlet: true,
    },
  ],
};

const App = () => {
  const scrollView = useRef<ScrollView>();
  const nextStep = useNextTutorialStep();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <TutorialTextOutlet />
          <View style={styles.body}>
            <TutorialText
              stepId={'stepone'}
              onExit={console.log}
              onEnter={console.log}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.tsx</Text> to change
                  this screen and then come back to see your edits.
                </Text>
              </View>
            </TutorialText>
            <TutorialHighlight emphasisScale={1.2} stepId={'steptwo'}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
            </TutorialHighlight>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
        <TutorialControls containerStyle={{position: 'absolute', bottom: 20}} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default () => {
  return (
    <TutorialProvider
      tutorial={tutorial}
      onEvent={(event, data) => {
        if (event === 'complete') {
          Alert.alert('Thank you for completing the tutorial!');
        }
      }}>
      <App />
    </TutorialProvider>
  );
};
