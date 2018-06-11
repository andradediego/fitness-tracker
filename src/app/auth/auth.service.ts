import { IMenu } from './imenu.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from './iuser.model';
import { IAuthData } from './iauth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { TrainingService } from '../training/training.service.ts.service';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  public displayMenu = new Subject<IMenu[]>();
  private isAuthenticated = false;
  private  user: IUser;
  private menus: IMenu[] = [
    {
      name: 'Signup',
      icon: 'face',
      router: '/signup',
      auth: false
    },
    {
      name: 'Login',
      icon: 'input',
      router: '/login',
      auth: false
    },
    {
      name: 'Training',
      icon: 'fitness_center',
      router: '/training',
      auth: true
    }
  ];

  constructor (
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  firstAcess() {
    this.displayMenu.next(this.updateMenu());
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.router.navigate(['/training']);
          this.isAuthenticated = true;
          this.displayMenu.next(this.updateMenu());
          this.authChange.next(this.isAuthenticated);
        } else {
          this.user = null;
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
          this.authChange.next(this.isAuthenticated);
          this.displayMenu.next(this.updateMenu());
          this.trainingService.cancelSubscriptions();
        }
      }
    );
  }

  registerUser(authData: IAuthData): void {
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
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  login(authData: IAuthData): void {
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
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  getUser(): IUser {
    return {...this.user };
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private updateMenu(): IMenu[] {
    return this.menus.filter(
      (element, index, array) => {
        console.log(element.auth);
        return element.auth === this.isAuthenticated;
      }
    );
  }
}
