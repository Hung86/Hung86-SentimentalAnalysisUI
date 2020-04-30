import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './ui/Dashboard';
import Classify from './ui/Classify';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Classify}/> 
        </Switch>
    </BrowserRouter>
);
}

export default App;
