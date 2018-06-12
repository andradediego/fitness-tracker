import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { firebaseCredentials } from './firebase-credentials';
import { UIService } from './shared/ui.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFirestoreModule,
    AuthModule
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
