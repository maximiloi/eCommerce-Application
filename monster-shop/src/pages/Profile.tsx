import { Box, Grid } from '@mui/material';
import User from '../api/user';

import '../sass/pages/Profile.scss';

function Profile() {
  const { data } = User;
  console.log('email: ', data?.email);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>User Profile</h2>
      <Grid container spacing={2} className="profile__wrapper">
        <Grid item>
          <h4>Personal info</h4>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
