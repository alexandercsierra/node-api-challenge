import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import ProjectList from './components/ProjectList'
import ActionList from './components/ActionList'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path='/'><Home/></Route>
      <Route path='/projects'><ProjectList/></Route>
      <Route path='/actions'><ActionList/></Route>
    </div>
  );
}

export default App;
