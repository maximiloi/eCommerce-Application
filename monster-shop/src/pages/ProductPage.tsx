import { NavLink, useParams } from 'react-router-dom';
import { Box, Breadcrumbs } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ProductPageCard from '../components/ProductPage/ProductPageComp';

function ProductPage() {
  return (
    <Box className="product" sx={{ display: 'flex', flexWrap: 'nowrap' }}>
      <Box className="product__content">
        <Breadcrumbs className="breadcrumb" aria-label="breadcrumb">
          <NavLink className="breadcrumb__item" to="/catalog">
            <AutoStoriesIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            All Monsters
          </NavLink>
          <p className="breadcrumb__item breadcrumb__item_active">
            Product Details
          </p>
        </Breadcrumbs>
        <em>id: {productId}</em>
      </Box>
    </Box>
    <div>
      <ProductPageCard />
    </div>
  );
}

export default ProductPage;
