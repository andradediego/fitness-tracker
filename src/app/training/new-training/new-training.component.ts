import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from './../training.service.ts.service';
import { Subscription } from 'rxjs';
import { IExercise } from './../iexercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: IExercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService
    .exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.trainingService.fetchAvaliableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }
}
