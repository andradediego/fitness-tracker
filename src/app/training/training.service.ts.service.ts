import { Subject } from 'rxjs/Subject';

import { Injectable } from '@angular/core';
import { IExercise } from './iexercise.model';

@Injectable()
export class TrainingService {
  private avaliableExercises: IExercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  exerciseChange = new Subject<IExercise>();

  private runningExercise: IExercise;
  private exercises: IExercise[] = [];

  constructor() { }

  getExercises(): IExercise[]  {
    return [ ...this.avaliableExercises ];
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avaliableExercises.find(
      ex => ex.id === selectedId
    );

    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      }
    );

    this.runningExercise  = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {

    this.exercises.push(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      }
    );

    this.runningExercise  = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancellExerccises() {
    return [ ...this.exercises ];
  }

}
