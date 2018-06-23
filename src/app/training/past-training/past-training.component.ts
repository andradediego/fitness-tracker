import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IExercise } from './../iexercise.model';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent
  implements
  OnInit,
  AfterViewInit {
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

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IAppState>
  ) { }

  ngOnInit() {
     this.store.select(fromTraining.getFinishedExercises).subscribe(
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

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
