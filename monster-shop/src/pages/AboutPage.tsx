import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Paper, styled, Box, Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GitHubIcon from '@mui/icons-material/GitHub';
import { creators } from '../helper/variables';
import ModalProfile from '../components/ModalProfile/ModalProfile';
import Footer from '../components/Footer/Footer';

import RSSLogo from '../assets/icons/logo_rs_text.svg';

type ModalProfileProps = {
  onClose?: () => void;
  fullName: string;
  textCreatorArray: string[];
};

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
  const [selectedCreator, setSelectedCreator] =
    useState<ModalProfileProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickReadMore = (creator: ModalProfileProps) => {
    setSelectedCreator(creator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h2 className="about__title">About Us</h2>

      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12 }}>
          <Grid item xs={12}>
            <Item
              style={{ textAlign: 'left', alignItems: 'flex-start' }}
              className="about__text"
            >
              <p>
                As part of the Frontends, Inc. team working on the Monster Shop
                e-commerce project, we created a store to sell monsters.
              </p>
              <p>
                Using the ClickUp board feature, we organized and tracked tasks
                together. Our team leader created a project folder divided into
                sprints that had columns representing workflow steps such as
                &quot;To Do&quot;, &quot;In Progress&quot;, &quot;Review&quot;,
                and &quot;Complete&quot;. As we worked together on the project,
                we had productive discussions about the functionality of the
                application, implementation of various technical requirements,
                component styling, and the best approach to handling requests to
                commercial tools. We actively participated in these discussions
                in voice chats on our team&apos;s Discord channel and Telegram
                chat. Each of us left valuable comments on GitHub pull requests
                during the code review process. Together we successfully
                implemented quality features for the Monster Shop e-commerce
                platform.
              </p>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {creators.map(({ name, fullName, img, path, role, text }) => (
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
                <Button
                  variant="text"
                  startIcon={<AutoStoriesIcon />}
                  onClick={() =>
                    handleClickReadMore({ fullName, textCreatorArray: text })
                  }
                >
                  Read More
                </Button>
                {isModalOpen &&
                  selectedCreator &&
                  selectedCreator.fullName === fullName && (
                    <ModalProfile
                      key={name}
                      onClose={handleCloseModal}
                      fullName={selectedCreator.fullName}
                      textCreatorArray={selectedCreator.textCreatorArray}
                    />
                  )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="https://rs.school/index.html" target="_blank">
          <img
            src={RSSLogo}
            alt="Rss logo"
            style={{
              padding: '10px',
            }}
          />
        </Link>
      </Box>
      <Footer />
    </>
  );
}

export default AboutPage;
