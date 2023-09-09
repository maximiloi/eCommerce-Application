import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import {
  Attribute,
  Image,
  ProductProjection,
  Price,
  DiscountedPrice,
} from '@commercetools/platform-sdk';
import { AttributeType } from '../../types/inputProps';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import './_cardItem.scss';

function CardItem(props: ProductProjection) {
  const { id, masterVariant, name } = props;
  const [isAdded, setIsAdded] = useState(false);
  const tags = masterVariant.attributes as Attribute[];
  const img = (masterVariant.images as Image[])[0];
  const price = (masterVariant.prices as Price[])[0];
  let discount = 0;
  if (price.discounted) {
    const priceDiscounted = price.discounted as DiscountedPrice;
    discount =
      priceDiscounted.value.centAmount /
      10 ** priceDiscounted.value.fractionDigits;
  }
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  const handleAddToCart = () => {
    console.log(`Add monster ${id} to the cart`);
    setIsAdded(true);
  };
  return (
    <Grid item xs={9} sm={4} md={4}>
      <Card
        className="card"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f8e2a7',
          borderRadius: 3,
        }}
      >
        <CardMedia component="div" sx={{ pt: '100%' }} image={img.url} />
        <CardContent className="card__content" sx={{ flexGrow: 1, p: 1 }}>
          <p className="card__title">{name.en}</p>
          <div className="card__tags">
            {tags.map((tag) => (
              <div key={tag.name}>
                {tag.value.map((el: AttributeType) => (
                  <span key={el.key} className="tag">
                    {el.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="card__price">
            <span
              className={discount ? 'discount discount_active' : 'discount'}
            >
              {discount}
            </span>
            <span className={discount ? 'price price_discounted' : 'price'}>
              {price.value.centAmount / 10 ** price.value.fractionDigits}
            </span>
          </div>
        </CardContent>
        <CardActions sx={{ pb: 2, pt: 0 }}>
          <ColoredBtn size="small" variant="contained" onClick={handleClick}>
            View details
          </ColoredBtn>
          <AddToCartButton isAdded={isAdded} onClick={handleAddToCart} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;
