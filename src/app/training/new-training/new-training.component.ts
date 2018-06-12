import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { IExercise } from './../iexercise.model';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: IExercise[];
  exerciseSubscription: Subscription;
  private loadingSubs: Subscription;
  private isLoading = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.exerciseSubscription = this.trainingService
    .exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }
}
