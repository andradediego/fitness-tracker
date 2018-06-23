import { createFeatureSelector, createSelector } from '@ngrx/Store';

import {
  TrainingActions,
  SET_AVALIABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions';

import { IExercise } from './iexercise.model';
import * as fromRoot from '../app.reducer';

export interface ITrainingState {
  avaliableExercises: IExercise[];
  finishedExercises: IExercise[];
  activeTraining: IExercise;
}

export interface IAppState extends fromRoot.IAppState {
  training: ITrainingState;
}

const initialState: ITrainingState = {
  avaliableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(
  state = initialState,
  action: TrainingActions
) {
  switch (action.type) {
    case SET_AVALIABLE_TRAININGS:
      return {
        ...state,
        avaliableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.avaliableExercises.find(
          ex => ex.id === action.payload
        )}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}

export const getTrainingState =
  createFeatureSelector<ITrainingState>('training');

export const getAvaliableExercises =
  createSelector(getTrainingState, (state: ITrainingState) => state.avaliableExercises);
export const getFinishedExercises =
  createSelector(getTrainingState, (state: ITrainingState) => state.finishedExercises);
export const getActiveTraining =
  createSelector(getTrainingState, (state: ITrainingState) => state.activeTraining);
export const getIsTraining =
  createSelector(getTrainingState, (state: ITrainingState) => state.activeTraining !== null);
