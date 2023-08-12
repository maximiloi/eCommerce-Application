import { NavLink, Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div className="auth">
      <h2>Authorization</h2>
      <button type="button" className="btn">
        <NavLink to="/">Back to Main</NavLink>
      </button>
      <div className="auth__btns">
        <button type="button" className="link">
          <NavLink to="/auth">Sign In</NavLink>
        </button>
        <button type="button" className="link">
          <NavLink to="/auth/register">Sign Up</NavLink>
        </button>
      </div>
      <div className="auth__content">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthPage;
