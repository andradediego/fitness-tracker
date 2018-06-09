import { IMenu } from './imenu.model';
import { Injectable } from '@angular/core';

import { IUser } from './iuser.model';
import { IAuthData } from './iauth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  public displayMenu = new Subject<IMenu[]>();

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

  constructor (private router: Router) {}

  firstAcess() {
    this.displayMenu.next(this.updateMenu());
  }

  registerUser(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };

    this.authSuccessfully();
  }

  login(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };

    this.authSuccessfully();
  }

  logout(): void {
    this.user = null;

    this.authChange.next(this.isAuth());
    this.displayMenu.next(this.updateMenu());
    this.router.navigate(['/login']);
  }

  getUser(): IUser {
    return {...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(this.isAuth());
    this.router.navigate(['/training']);
    this.displayMenu.next(this.updateMenu());
  }

  private updateMenu(): IMenu[] {
    return this.menus.filter(
      (element, index, array) => {
        console.log(element.auth);
        return element.auth === this.isAuth();
      }
    );
  }
}
