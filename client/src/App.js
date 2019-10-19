import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import { fetchUser } from './store/actions';

import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { ButtonAppBar } from './commons/Header';
import { HomePage } from './components/HomePage';
import { UserPage } from './components/UserPage';

function App() {
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ButtonAppBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/user/:id" component={UserPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
