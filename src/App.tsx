import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage, DetailPage } from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={SignInPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/details/:touristRouteId' component={DetailPage} />
          <Route render={()=> <h1>404 Not Found</h1>} />
        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
