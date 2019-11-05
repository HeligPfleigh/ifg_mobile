import { TourState, FINISH_HOME_TOUR, FINISH_STEP_TOUR } from './types';

export function finishHomeTour(tour: TourState) {
  return {
    type: FINISH_HOME_TOUR,
    payload: tour,
  };
}

export function finishStepTour(tour: TourState) {
  return {
    type: FINISH_STEP_TOUR,
    payload: tour,
  };
}
