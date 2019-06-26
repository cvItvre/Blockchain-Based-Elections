import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import RegisterElection from './pages/registerElection';
import Votar from './pages/votar';
import Home from './pages/home';


const routes = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registerelection" component={RegisterElection} />
      <Route exact path="/vote/:id" component={Votar} />
    </Switch>
  </BrowserRouter>

);

export default routes;
