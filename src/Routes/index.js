import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import WorkerPage from '../Components/Interface-worker';
import StartInterface from '../Components/Start-interface';

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {StartInterface} />
        <Route exact path="/postAndcategory" component= {WorkerPage} />
      </Switch>
    </BrowserRouter>
  );
