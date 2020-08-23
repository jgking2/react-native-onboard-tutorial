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
  FlatList,
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
import {styles} from './styles';

declare const global: {HermesInternal: null | {}};

const tutorial: Tutorial = {
  id: 'onlyone',
  active: true,
  currentStep: 0,
  steps: [
    {
      id: 'stepone',
      text: 'Tutorial Step One, take a look at this!',
    },
    {
      id: 'steptwo',
      text:
        'Notice the area below is emphasized!\nCurrently we provide a throb highlight, but its possible to bake your own!',
      showOutlet: true,
    },
    {
      id: 'third',
      text:
        "Use the onEnter, and onExit to do whatever\nyou'd like as a user navigates too\nand from the step!",
    },
    {
      id: 'fourth',
      text: `Use any style you'd like on the steps!`,
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
          ref={scrollView}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <TutorialTextOutlet
            containerStyle={{padding: 20, backgroundColor: '#eee'}}
            textProps={{style: {fontWeight: '600'}}}
          />
          {/* <View style={styles.body}> */}
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
          <TutorialHighlight
            onEnter={({direction}) => {
              if (direction === 'forward') {
                scrollView.current?.scrollTo({y: 40});
              }
            }}
            emphasisScale={1.05}
            stepId={'steptwo'}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
          </TutorialHighlight>
          <TutorialText
            stepId={'third'}
            onEnter={({direction}) => {
              if (direction === 'forward') {
                scrollView.current?.scrollTo({y: 80});
              }
            }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
          </TutorialText>
          <TutorialText
            stepId={'fourth'}
            containerStyle={{backgroundColor: 'red'}}
            textStyle={{
              fontWeight: '800',
              fontSize: 24,
              fontFamily: 'Times New Roman',
              color: '#fff',
            }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
          </TutorialText>
          <View style={styles.body}>
            <LearnMoreLinks />
          </View>
          {/* </View> */}
        </ScrollView>
        <TutorialControls containerStyle={{position: 'absolute', bottom: 20}} />
      </SafeAreaView>
    </>
  );
};

export default () => {
  return (
    <TutorialProvider
      tutorial={tutorial}
      onEvent={(event, data) => {
        if (event === 'complete') {
          Alert.alert('Add hooks to tutorial events!');
        }
      }}>
      <App />
    </TutorialProvider>
  );
};
