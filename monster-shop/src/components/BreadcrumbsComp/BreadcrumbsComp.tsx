import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Box, Breadcrumbs } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProductId } from '../../api/requests';

function BreadcrumbsComp() {
  const { productId } = useParams();
  const [title, setTitle] = useState('');

  async function fetchProductData(id: string) {
    try {
      const productResponce = (await getProductId(id)) as ProductProjection;
      setTitle(productResponce.name.en);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProductData(productId as string);
  }, [productId]);

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
          <p className="breadcrumb__item breadcrumb__item_active">{title}</p>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}

export default BreadcrumbsComp;
