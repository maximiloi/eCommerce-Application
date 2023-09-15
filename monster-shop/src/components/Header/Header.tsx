import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  Button,
  MenuItem,
  Typography,
  Tooltip,
  Container,
  Avatar,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../Logo/Logo';
import { pages, settings } from '../../helper/variables';
import { useAppSelector } from '../../redux/hooks';
import User from '../../api/user';
import './Header.scss';

function Header() {
  const count = useAppSelector((state) => state.cartCount.quantity);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  let userTitle = User.created ? User.data?.firstName : 'Log in now';
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (User.created) setAnchorElUser(event.currentTarget);
    else navigate('/auth');
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLParagraphElement;
    if (target.textContent === 'Logout') {
      User.logout();
      userTitle = 'Log in now';
      navigate('/');
    }
    if (target.textContent === 'Profile') {
      navigate('/profile');
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="transparent" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, order: -1 }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path}>{page.name}</NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', justifyContent: 'end' },
              marginRight: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to={page.path}>{page.name}</NavLink>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, ml: 3 }}>
            <Tooltip title={userTitle}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {User.created ? (
                  <Avatar
                    sx={{ bgcolor: '#c32b1d', width: 35, height: 35 }}
                    alt={`${User.data?.firstName}`}
                    src=".jpg"
                  />
                ) : (
                  <AccountCircleIcon fontSize="large" color="warning" />
                )}
              </IconButton>
            </Tooltip>
            <IconButton onClick={() => navigate('/cart')} sx={{ p: 0 }}>
              <Badge
                color="error"
                sx={{ color: '#c32b1d' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={count}
              >
                <ShoppingCartIcon fontSize="large" color="warning" />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
