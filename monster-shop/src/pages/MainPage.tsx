import { NavLink } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <h2>Main Page</h2>
      <button type="button">
        <NavLink to="/auth">Sign In / Sigh Up</NavLink>
      </button>
    </>
  );
}

export default MainPage;
