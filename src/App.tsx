import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage, DetailPage, SearchPage } from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/details/:touristRouteId' element={<DetailPage />} />
          <Route path='/search/' element={<SearchPage />} >
            <Route path=':keywords' element={<SearchPage />} />
          </Route>
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
