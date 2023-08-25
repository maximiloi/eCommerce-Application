import { Box, Grid } from '@mui/material';
import PersonalInfo from '../components/PersonalInfo/PersonalInfo';

import '../sass/pages/Profile.scss';

function Profile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>User Profile</h2>
      <Grid container spacing={2} className="profile__wrapper">
        <Grid item>
          <h4>Personal info</h4>
          <PersonalInfo />
          <h4>Shipping address</h4>
          <h4>Billing address</h4>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
