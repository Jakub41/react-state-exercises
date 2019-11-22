import React from "react";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Main from "./Pages/main/Main";
import DetailBook from "./Pages/book/Detail";
function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:asin" component={DetailBook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
