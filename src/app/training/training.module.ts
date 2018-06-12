import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    FlexLayoutModule,
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [

  ],
  entryComponents: [
    StopTrainingComponent
  ]
})
export class TrainingModule {

}
