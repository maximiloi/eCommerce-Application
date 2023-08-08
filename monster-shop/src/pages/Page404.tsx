import { NavLink } from 'react-router-dom';

function Page404() {
  return (
    <main className="main">
      <div className="container">
        <div className="not-found">404</div>
        <button type="button">
          <NavLink to="/">Back to Main</NavLink>
        </button>
      </div>
    </main>
  );
}

export default Page404;
