import React, { createContext, useReducer, Dispatch, useEffect } from "react";

interface AuthState {
  name: string | null;
  age: number | null;
  loaded: boolean;
  dispatch: Dispatch<AuthAction>;
}

export type AuthAction =
  | {
      type: AuthActionType.LOGIN;
      user: { name: string; age: number };
    }
  | { type: AuthActionType.LOGOUT };

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT"
}

const defaultValue: AuthState = {
  name: null,
  age: null,
  loaded: false,
  dispatch: () => {}
};
const AuthContext = createContext(defaultValue);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        name: action.user.name,
        age: action.user.age,
        loaded: true
      };
    case AuthActionType.LOGOUT:
      localStorage.clear();
      return { ...state, name: null, age: null, loaded: true };
    default:
      return state;
  }
};

const AuthProvider: React.FC = props => {
  const [state, dispatch] = useReducer(authReducer, defaultValue);
  const user = { name: "인우", age: 28 };

  useEffect(() => {
    console.log("유저 확인");
    const loginToken = localStorage.getItem("user");
    if (loginToken) {
      // 로그인
      setTimeout(() => {
        console.log("로그인");
        dispatch({ type: AuthActionType.LOGIN, user: user });
      }, 2000);
    } else {
      // 로그아웃
      console.log("로그아웃");
      dispatch({ type: AuthActionType.LOGOUT });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
