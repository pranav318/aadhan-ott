import React, { useEffect, useReducer } from "react";



import "./App.scss";
import { Context } from "./Context";
import { initialState, reducer } from "../src/app/reducer";


import PagesRouter from "./app/router";

const App = () => {
  // Reduer
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("App State - ", state);
  }, [state]);

  return (
    <Context.Provider value={{ state: state, dispatch: dispatch }}>
      <PagesRouter />
    </Context.Provider>
  );
};

export default App;
