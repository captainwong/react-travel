import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { Navigate } from 'react-router-dom';
import { useSelector, useAppDispatch } from './redux/hooks';
import { getShoppingCart } from './redux/shoppingCart/slice';


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
  const jwt = useSelector(s => s.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

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
          <Route path='/shoppingCart'
            element={ 
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route path='/placeOrder'
            element={ 
              <PrivateRoute>
                <PlaceOrderPage />
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
