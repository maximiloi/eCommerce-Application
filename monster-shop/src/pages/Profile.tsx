import { Box, Grid } from '@mui/material';
import PersonalInfo from '../components/PersonalInfo/PersonalInfo';
import ShippingAddress from '../components/ShippingAddress/ShippingAddress';

import '../sass/pages/Profile.scss';

function Profile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>User Profile</h2>
      <Grid container spacing={2} className="profile__wrapper">
        <Grid item>
          <h4>Personal info</h4>
          <PersonalInfo />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <h4>Shipping address</h4>
              <ShippingAddress />
            </Grid>
            <Grid item xs={12} md={6}>
              <h4>Billing address</h4>
              <ShippingAddress />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
