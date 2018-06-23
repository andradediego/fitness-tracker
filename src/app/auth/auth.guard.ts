import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromRoot.IAppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store
      .select(fromRoot.getIsAuthenticated)
      .pipe(take(1));
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store
      .select(fromRoot.getIsAuthenticated)
      .pipe(take(1));
  }
}
