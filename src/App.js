import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/homepage/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TshirtDetails from './components/tshirts/TshirtDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/tshirts/:id' component={TshirtDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;