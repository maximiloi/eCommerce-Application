import { NavLink } from 'react-router-dom';

import '../sass/pages/Page404.scss';

function Page404() {
  return (
    <>
      <h2 className="not-found">Page Not Found</h2>
      <div className="ghost">
        <div className="eye" />
        <div className="eye two" />

        <div className="mouth">
          <div className="tonge" />
        </div>

        <div className="corner" />
        <div className="corner two" />
        <div className="corner three" />
        <div className="corner four" />

        <div className="over" />
        <div className="over two" />
        <div className="over three" />
        <div className="over four" />

        <div className="shadow" />
      </div>
      <div className="ghost__link">
        <NavLink to="/">Back to Start Page</NavLink>
      </div>
    </>
  );
}

export default Page404;
