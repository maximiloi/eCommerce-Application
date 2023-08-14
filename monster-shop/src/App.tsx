import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Page404 from './pages/Page404';
import Header from './components/Header/Header';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
