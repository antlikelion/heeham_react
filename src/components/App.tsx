import React from "react";
import { AuthProvider } from "../context/Auth.context";
import Body from "./Body";

const App: React.FC = () => {
  return (
    <div className="App">
      앱임
      <AuthProvider>
        <Body />
      </AuthProvider>
    </div>
  );
};

export default App;
