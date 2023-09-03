import { useParams } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { getProductsId } from '../../api/requests';

import './ProductPageComp.scss';

function ProductPageCard() {
  const { productId } = useParams();

  getProductsId(productId)
    .then((response) => {
      const productsResponse = response;
      console.log('productsResponse: ', productsResponse);
      // Ваш код, который использует productsResponse
    })
    .catch((error) => {
      console.log('Ошибка при получении данных: ', error);
    });

  const { id, img, title, tags, discount, price, description } =
    productsResponce;

  return (
    <div>
      <em>id: {id}</em>{' '}
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          bgcolor: '#f8e2a7',
          borderRadius: 5,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 350 }}
          image={img}
          alt={title}
        />
        <CardContent className="product__content" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p className="product__title">{title}</p>
            <div className="product__price">
              <span
                className={discount ? 'discount discount_active' : 'discount'}
              >
                {discount}
              </span>
              <span className={discount ? 'price price_discounted' : 'price'}>
                {price}
              </span>
            </div>
          </Box>

          <p className="product__text">{description}</p>

          <div className="product__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <CardActions sx={{ pb: 2, pt: 0 }}>
            <ColoredBtn size="small" variant="contained">
              Add Cart
            </ColoredBtn>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPageCard;
