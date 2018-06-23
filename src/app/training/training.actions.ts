import { Action } from '@ngrx/Store';
import { IExercise } from './iexercise.model';

export const SET_AVALIABLE_TRAININGS = 'SET_AVALIABLE_TRAININGS';
export const SET_FINISHED_TRAININGS = 'SET_FINISHED_TRAININGS';
export const START_TRAINING = 'START_TRAINING';
export const STOP_TRAINING = 'STOP_TRAINING';

export class SetAvaliableTraining implements Action {
  readonly type = SET_AVALIABLE_TRAININGS;

  constructor(public payload: IExercise[]) {}
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: IExercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  SetAvaliableTraining |
  SetFinishedTraining |
  StartTraining |
  StopTraining;
