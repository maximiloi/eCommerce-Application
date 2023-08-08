import { NavLink, Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <main className="main auth">
      <div className="container">
        <div className="auth__wrap">
          <h2>Authorization</h2>
          <button type="button">
            <NavLink to="/">Back to Main</NavLink>
          </button>
          <div className="auth__btns">
            <button type="button">
              <NavLink to="/auth">Sign In</NavLink>
            </button>
            <button type="button">
              <NavLink to="/auth/register">Sign Up</NavLink>
            </button>
          </div>
          <div className="auth__content">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthPage;
