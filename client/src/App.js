import React from "react";
import ReactDOM from "react-dom"
import './App.css';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Main from './Main';
import FinalData from './FinalData';


function App() {
  return (
    <BrowserRouter basename='http://localhost:3000'>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/loggedin' component={FinalData} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
