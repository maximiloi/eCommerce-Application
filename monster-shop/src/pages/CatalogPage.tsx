import { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { catalogMenuList } from '../helper/variables';
import '../sass/pages/_catalogePage.scss';

function CatalogPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    console.log((event.target as HTMLElement).innerText);
  };
  return (
    <Box className="main__wrap" sx={{ display: 'flex' }}>
      <Box
        component="aside"
        className="aside aside_mobile"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        <IconButton size="large" onClick={handleOpenMenu} color="warning">
          <AutoStoriesIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Divider />
          <List onClick={handleCloseMenu}>
            {catalogMenuList.map((item, index) => (
              <ListItemButton
                key={item}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Menu>
      </Box>
      <Box
        component="aside"
        className="aside aside_desktop"
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex', justifyContent: 'center' },
        }}
      >
        <List>
          <Divider />
          {catalogMenuList.map((item, index) => (
            <ListItemButton
              key={item}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText
                primary={item}
                className={
                  selectedIndex === index
                    ? 'category category_selected'
                    : 'category'
                }
              />
            </ListItemButton>
          ))}
          <Divider />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, width: { sm: 'calc(100% - 200px)' } }} />
    </Box>
  );
}

export default CatalogPage;
