import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './ui/Dashboard';
import Search from './ui/Search';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Search}/> 
        </Switch>
    </BrowserRouter>
);
}

export default App;
