import { Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div className="auth__content">
      <Outlet />
    </div>
  );
}

export default AuthPage;
