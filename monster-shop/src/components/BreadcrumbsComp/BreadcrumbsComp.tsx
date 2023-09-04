import { useCallback, useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Box, Breadcrumbs } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductId, getCategoryId } from '../../api/requests';

function BreadcrumbsComp() {
  const { productId } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  async function fetchNameCategory(id: string) {
    try {
      const categoryResponce = (await getCategoryId(id)) as ProductProjection;
      setCategory(categoryResponce.name.en);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchProductData = useCallback(async (id: string) => {
    try {
      const productResponce = (await getProductId(id)) as ProductProjection;
      setTitle(productResponce.name.en);
      await fetchNameCategory(productResponce.categories[0].id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchProductData(productId as string);
  }, [productId, fetchProductData]);

  return (
    <Box
      className="product"
      sx={{ display: 'flex', flexWrap: 'nowrap', pb: 2 }}
    >
      <Box className="product__content">
        <Breadcrumbs className="breadcrumb" aria-label="breadcrumb">
          <NavLink className="breadcrumb__item" to="/catalog">
            <AutoStoriesIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            All Monsters
          </NavLink>
          {/* <NavLink className="breadcrumb__item" to="/catalog"> */}
          <p className="breadcrumb__item">{category}</p>
          {/* </NavLink> */}
          <p className="breadcrumb__item breadcrumb__item_active">{title}</p>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}

export default BreadcrumbsComp;
