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
  Pagination,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { ProductProjection } from '@commercetools/platform-sdk';
import { catalogMenuList } from '../helper/variables';
import SearchBar from '../components/Searchbar/Searchbar';
import CardItem from '../components/Card/CardItem';
import { getCategory, getProducts } from '../api/requests';
import Loader from '../components/Loader/Loader';
import '../sass/pages/_catalogPage.scss';

function CatalogPage() {
  const [products, setProducts] = useState([] as ProductProjection[]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const isLoaded = !!products.length;
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedCategory(index);
    console.log(getCategory());
    console.log((event.target as HTMLElement).innerText, index);
  };

  async function fetchProductsData(category: string) {
    try {
      const productsResponce = (await getProducts()) as ProductProjection[];
      const initTotalPages: number = Math.ceil(productsResponce.length / 6);
      setProducts(
        category
          ? productsResponce.filter(
              (product) => product.categories[0].id === category
            )
          : productsResponce
      );
      setTotalPages(initTotalPages);
    } catch (error) {
      console.log(error);
    }
  }

  /* TEMPORARY */
  const indexOfLastCard = page * 6;
  const indexOfFirstCard = indexOfLastCard - 6;
  const dataToShow = products.slice(indexOfFirstCard, indexOfLastCard);
  /*------------------*/

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(event.type);
  };
  useEffect(() => {
    console.log(`Make request with query - ${searchQuery}`);
    fetchProductsData(selectedCategory);
  }, [searchQuery, selectedCategory]);
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
            {Object.keys(catalogMenuList).map((key) => (
              <ListItemButton
                key={key}
                selected={
                  selectedCategory ===
                  catalogMenuList[key as keyof typeof catalogMenuList]
                }
                onClick={(event) =>
                  handleListItemClick(
                    event,
                    catalogMenuList[key as keyof typeof catalogMenuList]
                  )
                }
              >
                <ListItemText primary={key} />
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
          {Object.keys(catalogMenuList).map((key) => (
            <ListItemButton
              key={key}
              selected={
                selectedCategory ===
                catalogMenuList[key as keyof typeof catalogMenuList]
              }
              onClick={(event) =>
                handleListItemClick(
                  event,
                  catalogMenuList[key as keyof typeof catalogMenuList]
                )
              }
            >
              <ListItemText
                primary={key}
                className={
                  selectedCategory ===
                  catalogMenuList[key as keyof typeof catalogMenuList]
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
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: ['center', 'flex-start'] }}
        >
          {!isLoaded && <Loader />}
          {isLoaded &&
            dataToShow.map((card) => <CardItem key={card.id} {...card} />)}
        </Grid>
        <Box
          className="catalog__pagination"
          sx={{ p: 1, display: 'flex', justifyContent: 'center' }}
        >
          {isLoaded && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CatalogPage;
