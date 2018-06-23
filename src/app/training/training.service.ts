import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IExercise } from './iexercise.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.IAppState>
  ) { }

  fetchAvaliableExercises() {
    this.store.dispatch(new UI.StartLoading());
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
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvaliableTraining(exercises));
        },
        (error) => {
          this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
          this.store.dispatch(new UI.StopLoading());
        }
      )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(
      (ex: IExercise) => {
        this.addDataToDatabase(
          {
            ...ex,
            date: new Date(),
            state: 'completed'
          }
        );
        this.store.dispatch(new Training.StopTraining());
      }
    );
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(
      (ex: IExercise) => {
        this.addDataToDatabase(
          {
            ...ex,
            duration: ex.duration * (progress / 100),
            calories: ex.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
          }
        );
        this.store.dispatch(new Training.StopTraining());
      }
    );
  }

  fetchCompletedOrCancellExerccises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: IExercise[]) => {
          this.store.dispatch(new Training.SetFinishedTraining(exercises));
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
