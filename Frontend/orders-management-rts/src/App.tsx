import React, { useEffect } from "react";
import "./App.css";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "./store/hooks";
import { fetchConfigurations } from "./store/configurationsSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfigurations());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <header></header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
