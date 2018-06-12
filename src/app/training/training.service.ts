import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { IExercise } from './iexercise.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  private avaliableExercises: IExercise[] = [];
  private runningExercise: IExercise;
  private fbSubs: Subscription[] = [];

  exerciseChange = new Subject<IExercise>();
  exercisesChanged = new Subject<IExercise[]>();
  finishedExercisesChanged = new Subject<IExercise[]>();

  constructor(
    private db: AngularFirestore,
    private uiService: UIService) { }

  fetchAvaliableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
      .collection('avaliableExercises')
      .snapshotChanges()
      .pipe(map(
        docArray => {
          return docArray.map(
            doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              } as IExercise;
            }
          );
      }))
      .subscribe(
        (exercises: IExercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.avaliableExercises = exercises;
          this.exercisesChanged.next([...this.avaliableExercises]);
        },
        (error) => {
          this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
          this.uiService.loadingStateChanged.next(false);
          this.exercisesChanged.next(null);
        }
      )
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avaliableExercises.find(
      ex => ex.id === selectedId
    );

    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase(
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

    this.addDataToDatabase(
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

  fetchCompletedOrCancellExerccises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: IExercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        }
      ));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(
      sub => sub.unsubscribe()
    );
  }

  private addDataToDatabase(exercise: IExercise): void {
    this.db.collection('finishedExercises')
    .add(exercise);
  }
}
