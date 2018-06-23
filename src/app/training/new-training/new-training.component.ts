import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { IExercise } from './../iexercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  exercises$: Observable<IExercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IAppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvaliableExercises);

    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }
}
