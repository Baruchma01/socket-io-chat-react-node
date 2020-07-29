import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from './containers/Join/Join';
import Chat from './containers/Chat/Chat';
import classes from './App.css';

function App() {
  return (
    <Router>
    <div className={classes.App}>
    <Route exact path="/" component={Join} />
      <Switch>
      <Route exact path="/chat" component={Chat} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
