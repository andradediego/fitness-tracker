import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from './auth.actions';

import { IMenu } from './imenu.model';

export interface IAuthState {
  isAuthenticated: boolean;
  menus: IMenu[];
}

const initialState: IAuthState = {
  isAuthenticated: false,
  menus: [
    {
      name: 'Signup',
      icon: 'face',
      router: '/signup'
    },
    {
      name: 'Login',
      icon: 'input',
      router: '/login'
    }
  ]
};

export function authReducer(
  state = initialState, action: AuthActions
  ) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        menus: [
          {
            name: 'Training',
            icon: 'fitness_center',
            router: '/training'
          }
        ]
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        menus: [
          {
            name: 'Signup',
            icon: 'face',
            router: '/signup'
          },
          {
            name: 'Login',
            icon: 'input',
            router: '/login'
          }
        ]
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: IAuthState) => state.isAuthenticated;
export const getMenu = (state: IAuthState) => state.menus;
