import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { TrainingService } from './../training.service.ts.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IExercise } from './../iexercise.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent
implements
OnInit,
AfterViewInit,
OnDestroy {
  displayedColumns = [
    'date',
    'name',
    'duration',
    'calories',
    'state'
  ];
  dataSource = new MatTableDataSource<IExercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  finishedExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.finishedExercisesSubscription = this.trainingService
      .finishedExercisesChanged.subscribe(
        (pastExercises: IExercise[]) => {
          this.dataSource.data = pastExercises;
        }
      );
    this.trainingService.fetchCompletedOrCancellExerccises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.finishedExercisesSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
