import React, { useContext } from "react";
import { AuthContext, AuthActionType } from "../context/Auth.context";

const Body: React.FC = () => {
  const { name, age, loaded, dispatch } = useContext(AuthContext);

  if (!loaded) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <button onClick={() => dispatch({ type: AuthActionType.LOGOUT })}>
        로그아웃
      </button>
    </div>
  );
};

export default Body;
