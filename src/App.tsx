import React from 'react';
import styles from './App.module.css';
import { HomePage } from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' render={() => <h1>Sign In</h1>} />
          <Route render={()=> <h1>404 Not Found</h1>} />
        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
