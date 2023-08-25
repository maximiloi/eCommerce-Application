import { NavLink } from 'react-router-dom';
import User from '../api/user';

import '../sass/pages/Profile.scss';

function Profile() {
  const { data } = User;
  console.log('email: ', data?.email);

  return (
    <>
      <h2>User Profile</h2>
      <NavLink to="/">Back to Start Page</NavLink>
    </>
  );
}

export default Profile;
