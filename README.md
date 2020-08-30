# Getting Started

```sh
npm i react-native-onboard-tutorial
```

## Demo

<img src="docs/demo.gif" width="200" />

# Usage

### Create Tutorial Object

> You can take a look at the example App if you'd prefer to just see the code!

First, determine the steps you'd like to highlight. From there, create a tutorial state that'll be used in conjunction with Components to highlight portions of the App.

```ts
//Sample tutorial
export const tutorial = {
  id: "tutorial",
  active: true,
  currentStep: 0,
  steps: [
    {
      // Used to link the step to components
      id: "stepone",
      text: "Step one text!",
    },
    {
      id: "steptwo",
      text: "Outlet Text!",
      //Used to show text in the <TutorialTextOutlet /> component
      showOutlet: true,
    },
    //...more steps if desired
  ],
};
```

### Provide the tutorial to the App

Next, let's add a provider around the boundary of the App that needs the explanation, if unsure put it at the root!

```tsx
import { TutorialProvider } from 'react-native-text-outlet';
import { tutorial } from './appTutorial';

export const App = () => {
    return (
        <TutorialProvider tutorial={tutorial}>
           <RestOfTheApp />
        </TutorialProvider>
    )
```

# TODO

- Document!
