import { createReducer } from '../createReducer';
import { TourState, FINISH_HOME_TOUR, FINISH_STEP_TOUR } from './types';

export const initialTourState: TourState = {
  isHomeFinished: false,
  isStepFinished: false,
};

const tourReducer = createReducer(initialTourState, {
  [FINISH_HOME_TOUR]: (state: TourState) => {
    return { ...state, isHomeFinished: true };
  },
  [FINISH_STEP_TOUR]: (state: TourState) => {
    return { ...state, isStepFinished: true };
  },
});

export { tourReducer };
