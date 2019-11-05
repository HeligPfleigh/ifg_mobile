import { FINISH_HOME_TOUR, FINISH_STEP_TOUR } from './types';

export function finishHomeTour() {
  return {
    type: FINISH_HOME_TOUR,
  };
}

export function finishStepTour() {
  return {
    type: FINISH_STEP_TOUR,
  };
}
