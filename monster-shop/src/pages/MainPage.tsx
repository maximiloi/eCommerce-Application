import { NavLink } from 'react-router-dom';

function MainPage() {
  return (
    <main className="main">
      <div className="container container__main">
        <h2>Main Page</h2>
        <button type="button">
          <NavLink to="/auth">Sign In / Sigh Up</NavLink>
        </button>
      </div>
    </main>
  );
}

export default MainPage;
