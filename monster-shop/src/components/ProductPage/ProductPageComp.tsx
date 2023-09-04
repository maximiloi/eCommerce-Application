import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProductProjection,
  Image,
  Price,
  DiscountedPrice,
  LocalizedString,
} from '@commercetools/platform-sdk';
import { Box, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { getProductId } from '../../api/requests';

import './ProductPageComp.scss';

function ProductPageCard() {
  const { productId } = useParams();
  // const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  async function fetchProductData(id: string) {
    try {
      const productResponce = (await getProductId(id)) as ProductProjection;
      setTitle(productResponce.name.en);
      setImg((productResponce.masterVariant.images as Image[])[0].url);
      setDescription((productResponce.description as LocalizedString).en);
      setPrice(
        (productResponce.masterVariant.prices as Price[])[0].value.centAmount
      );
      setDiscount(
        (
          (productResponce.masterVariant.prices as Price[])[0]
            .discounted as DiscountedPrice
        ).value.centAmount
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProductData(productId as string);
  }, [productId]);

  return (
    <div>
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
          sx={{ width: 350, height: 350 }}
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
            {title && <p className="product__title">{title}</p>}
            <div className="product__price">
              <span
                className={discount ? 'discount discount_active' : 'discount'}
              >
                {discount / 100}
              </span>
              <span className={discount ? 'price price_discounted' : 'price'}>
                {price / 100}
              </span>
            </div>
          </Box>

          <p className="product__text">{description}</p>

          {/* <div className="product__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div> */}
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
