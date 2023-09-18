import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Page404 from './pages/Page404';
import Profile from './pages/Profile';
import Header from './components/Header/Header';
import Toast from './components/Toast/Toast';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';

import User from './api/user';
import './App.scss';

function RedirectSignIn() {
  return User.created ? <Navigate to="/" /> : <SignIn />;
}

function RedirectSignUp() {
  return User.created ? <Navigate to="/" /> : <SignUp />;
}

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<RedirectSignIn />} />
            <Route path="register" element={<RedirectSignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product">
              <Route path=":productId" element={<ProductPage />} />
            </Route>
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
      <Toast />
    </>
  );
}

export default App;
