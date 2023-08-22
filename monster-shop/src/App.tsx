import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Page404 from './pages/Page404';
import Header from './components/Header/Header';
import Toast from './components/Toast/Toast';

import './App.scss';
import User from './api/user';

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
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
      <Toast />
    </>
  );
}

export default App;
