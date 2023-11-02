import React, { createContext, useReducer } from 'react';

export enum USER_ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  gender: string;
  birth: Date;
  role: USER_ROLES;
  signed_in: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  last_sign_in: Date;
  fail_sign_in_count: number;
};
export type Board = {
  id: number;
  title: string;
  content: string;
  author: number;
  sequence: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
};

export enum API_DATA_ACTION {
  LOAD_USER = 'user/load',
  LOAD_BOARD = 'board/load',
  UPDATE_VER = 'api-data/version/update',
}

export type ApiDataAction = {
  type: API_DATA_ACTION;
  board: Board[];
  user: User[];
};

export interface ApiData {
  user: User[];
  board: Board[];
  version: number;
}

export const initialState: ApiData = {
  user: [],
  board: [],
  version: 0,
};

export const ApiDataContext = createContext({ ...initialState });
export const ApiDataDispatchContext = createContext(new Function());

const reducer = (state: ApiData, action: ApiDataAction) => {
  switch (action.type) {
    case API_DATA_ACTION.LOAD_USER:
      return {
        user: action.user,
        board: state.board,
        version: state.version,
      };
    case API_DATA_ACTION.LOAD_BOARD:
      return {
        user: state.user,
        board: action.board,
        version: state.version,
      };
    case API_DATA_ACTION.UPDATE_VER:
      return {
        user: state.user,
        board: state.board,
        version: state.version + 1,
      };
    default:
      return state;
  }
};

function ApiDataProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApiDataDispatchContext.Provider value={dispatch}>
      <ApiDataContext.Provider value={state}>
        {children}
      </ApiDataContext.Provider>
    </ApiDataDispatchContext.Provider>
  );
}

export default ApiDataProvider;
