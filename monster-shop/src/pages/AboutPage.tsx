import { Link } from 'react-router-dom';
import { Avatar, Grid, Paper, styled, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { creators } from '../helper/variables';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f8e2a7',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function AboutPage() {
  return (
    <>
      <h2 className="about__title">About Us</h2>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {creators.map(({ name, fullName, img, path, role }) => (
            <Grid item xs={12} sm={4} md={4} key={name}>
              <Item className="about__item">
                <Avatar
                  className="about__img"
                  alt={fullName}
                  src={img}
                  sx={{ width: 150, height: 150 }}
                />
                <Link
                  className="about__link"
                  to={path}
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <GitHubIcon sx={{ mr: 1 }} />
                  <h4 className="about__title">{fullName}</h4>
                </Link>
                <p>{role}</p>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default AboutPage;
