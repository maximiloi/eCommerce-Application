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
import { getProductsFilter } from '../api/requests/catalog';
import { SortOptionType } from '../types/inputProps';
import SearchBar from '../components/Searchbar/Searchbar';
import Sort from '../components/Sort/Sort';
import SortMobile from '../components/Sort/SortMobile';
import CardItem from '../components/Card/CardItem';
import Loader from '../components/Loader/Loader';
import '../sass/pages/_catalogPage.scss';

function CatalogPage() {
  const [products, setProducts] = useState([] as ProductProjection[]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOptionType>({
    field: 'name.en',
    type: 'asc',
  });
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const isLoaded = !!products.length;
  const indexOfLastCard = page * 6;
  const indexOfFirstCard = indexOfLastCard - 6;
  const dataToShow = products.slice(indexOfFirstCard, indexOfLastCard);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = (index: string) => {
    setSelectedCategory(index);
  };

  async function fetchProductsData(
    category: string,
    search: string,
    sort: SortOptionType
  ) {
    try {
      const productsResponce = (await getProductsFilter(
        `categories${category ? `.id:"${category}"` : `:exists`}`,
        search ? `"${search}"` : '',
        `${sort.field} ${sort.type}`
      )) as ProductProjection[];
      const initTotalPages: number = Math.ceil(productsResponce.length / 6);
      setProducts(productsResponce);
      setTotalPages(initTotalPages);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.stopPropagation();
    setPage(value);
  };
  useEffect(() => {
    fetchProductsData(selectedCategory, searchQuery, sortOption);
  }, [searchQuery, selectedCategory, sortOption]);
  return (
    <Box className="catalog" sx={{ display: 'flex' }}>
      <Box
        component="aside"
        className="catalog__aside catalog__aside_mobile"
        sx={{
          flexGrow: 0,
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
        }}
      >
        <IconButton size="large" onClick={handleOpenMenu} color="warning">
          <AutoStoriesIcon />
        </IconButton>
        <SortMobile setSortOption={setSortOption} />
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
                onClick={() =>
                  handleListItemClick(
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
              onClick={() =>
                handleListItemClick(
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchBar setSearchQuery={setSearchQuery} />
          <Sort setSortOption={setSortOption} />
        </Box>
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
