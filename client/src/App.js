import React from 'react';
import ProtectedRoute from './components/ProtectedRoute'
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';

const App = () => (
  <div>
    <NavBar/>
    <FetchUser>
      <Switch>
        <ProtectedRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </div>
)


export default App;
