import { IMenu } from './imenu.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import { IUser } from './iuser.model';
import { IAuthData } from './iauth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private  user: IUser;

  constructor (
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.IAppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.router.navigate(['/training']);
          this.store.dispatch(new Auth.SetAuthenticated());
        } else {
          this.user = null;
          this.router.navigate(['/login']);
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.trainingService.cancelSubscriptions();
        }
      }
    );
  }

  registerUser(authData: IAuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(
      result => {
        console.log(result);
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.store.dispatch(new UI.StopLoading());
      }
    )
    .catch(
      error => {
        console.log(error);
        this.uiService.showSnackBar(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      }
    );
  }

  login(authData: IAuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(
      result => {
        console.log(result);
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.store.dispatch(new UI.StopLoading());
      }
    )
    .catch(
      error => {
        console.log(error);
        this.uiService.showSnackBar(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      }
    );
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  getUser(): IUser {
    return {...this.user };
  }
}
