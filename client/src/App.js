import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ButtonAppBar from './commons/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
