import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { catalogMenuList, dummyProducts } from '../helper/variables';
import SearchBar from '../components/Searchbar/Searchbar';
import CardItem from '../components/Card/CardItem';
import '../sass/pages/_catalogPage.scss';

function CatalogPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
  useEffect(() => {
    console.log(`Make request with query - ${searchQuery}`);
  }, [searchQuery]);
  return (
    <Box className="catalog" sx={{ display: 'flex' }}>
      <Box
        component="aside"
        className="catalog__aside catalog__aside_mobile"
        sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
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
        className="catalog__aside catalog__aside_desktop"
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
      <Box
        className="catalog__content"
        sx={{ flexGrow: 1, width: { sm: 'calc(100% - 200px)' }, p: 1 }}
      >
        <SearchBar setSearchQuery={setSearchQuery} />
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {dummyProducts.map((card) => (
            <CardItem key={card.id} {...card} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default CatalogPage;
