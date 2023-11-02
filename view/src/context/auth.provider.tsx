import React, { createContext, useReducer } from 'react';
import { User } from './api-data.provider';

export type Auth = {
  token: string;
  refresh: string;
};

export interface AuthData {
  auth: Auth;
  user: User | null;
  version: number;
}

export enum AUTH_DATA_ACTION {
  LOAD = 'auth/load',
  SAVE = 'auth/save',
  SAVE_USER = 'auth/save/user',
  SIGNIN = 'auth/signin',
  SIGNOUT = 'auth/signout',
  UPDATE_VER = 'auth/update/version',
}

export type AuthDataAction = {
  type: string;
  auth: {
    token: string;
    refresh: string;
  };
  user: User;
  version: number;
};

export const initialState: AuthData = {
  auth: {
    token: '',
    refresh: '',
  },
  user: null,
  version: 0,
};

export const AuthContext = createContext(initialState);
export const AuthDispatchContext = createContext(new Function());

const reducer = (state: AuthData, action: AuthDataAction) => {
  switch (action.type) {
    case AUTH_DATA_ACTION.LOAD:
      !localStorage.getItem('auth') && localStorage.setItem('auth', '{}');
      return {
        auth: JSON.parse(localStorage.getItem('auth') || '{}'),
        user: state.user,
        version: state.version,
      };
    case AUTH_DATA_ACTION.SAVE:
      localStorage.setItem('auth', JSON.stringify(state.auth));
      return state;
    case AUTH_DATA_ACTION.SAVE_USER:
      return {
        ...state,
        user: action.user,
      };
    case AUTH_DATA_ACTION.SIGNIN:
      return {
        auth: action.auth,
        user: state.user,
        version: state.version,
      };
    case AUTH_DATA_ACTION.SIGNOUT:
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: '',
          refresh: '',
        }),
      );
      return {
        auth: {
          token: '',
          refresh: '',
        },
        user: null,
        version: state.version + 1,
      };
    case AUTH_DATA_ACTION.UPDATE_VER:
      return {
        auth: state.auth,
        user: state.user,
        version: state.version + 1,
      };
    default:
      return state;
  }
};

function ApiProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

export default ApiProvider;
