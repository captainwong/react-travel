import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage, DetailPage, SearchPage, ShoppingCartPage } from './pages';
import { Navigate } from 'react-router-dom';
import { useSelector } from './redux/hooks';

interface PropsType {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PropsType> = ({ children }) => {
  const token = useSelector(s => s.user.token);
  return (
    <>
      {
        token ? children : <Navigate to='/signin' />
      }
    </>
  );
}

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
          <Route path='shoppingCart'
            element={ 
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
