import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface IAppState {
  ui: fromUI.IUIState;
  auth: fromAuth.IAuthState;
}

export const reducers: ActionReducerMap<IAppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

export const getUIState
  = createFeatureSelector<fromUI.IUIState>('ui');
export const getIsLoading
  = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState
  = createFeatureSelector<fromAuth.IAuthState>('auth');
export const getIsAuthenticated
  = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getMenu
  = createSelector(getAuthState, fromAuth.getMenu);
