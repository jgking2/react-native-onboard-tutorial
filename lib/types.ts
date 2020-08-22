/**
 * Tutorial events for applications to hook into, for any custom actions.
 * Start - When the tutorial begins.
 * End - When the user stops/skips the tutorial.
 * Step - User takes a step in the tutorial
 * Complete - User completes the tutorial
 */
export type TutorialEvent = 'start' | 'end' | 'complete' | 'step';

export type Actions =
  | 'tutorial/next'
  | 'tutorial/set'
  | 'tutorial/skip'
  | 'tutorial/end'
  | 'tutorial/event'
  | 'tutorial/start';

type StepType = 'custom' | 'highlight' | 'highlightaction' | 'text';

export interface Step {
  id: string;
  text?: string;
  type?: StepType;
  /**
   * Show text in the TextOutlet, defaults to text, outletText can provide custom text.
   */
  showOutlet?: boolean;
  /**
   * Text specific to outlet, defaults to text.
   */
  outletText?: string;
}

export interface Tutorial {
  /**
   * Whether or not the tutorial is active
   */
  active: boolean;
  id: string;
  currentStep?: number;
  steps: Step[];
}

export interface TutorialState {
  activeTutorial?: Tutorial;
}

interface TutorialStepHookEvent {
  direction: 'left' | 'right';
}

export interface TutorialStepComponent {
  stepId?: string;
  skip?: boolean;
  children?: any;
  text?: string;
  onEnter: (event: TutorialStepHookEvent) => void;
  onExit: (event: TutorialStepHookEvent) => void;
}
