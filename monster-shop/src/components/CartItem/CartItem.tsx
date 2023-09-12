import { NavLink } from 'react-router-dom';
import { Box, CardContent, CardMedia, Divider, Grid } from '@mui/material';
import {
  Attribute,
  Image,
  Price,
  DiscountedPrice,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { AttributeType } from '../../types/inputProps';
import Counter from '../Counter/Counter';
import './_cartItem.scss';

function CartItem(props: Partial<ProductProjection>) {
  const { id, masterVariant, name } = props;
  const tags = masterVariant?.attributes as Attribute[];
  const img = (masterVariant?.images as Image[])[0];
  const price = (masterVariant?.prices as Price[])[0];
  let discount = 0;
  if (price.discounted) {
    const priceDiscounted = price.discounted as DiscountedPrice;
    discount =
      priceDiscounted.value.centAmount /
      10 ** priceDiscounted.value.fractionDigits;
  }

  return (
    <Grid item sx={{ width: 1, p: 0 }} className="cart-item">
      <Box className="cart-item__wrap" sx={{ display: 'flex' }}>
        <CardMedia
          component="div"
          sx={{ width: 50, height: 60, display: { xs: 'none', md: 'block' } }}
          image={img.url}
        />
        <CardContent className="cart-item__content" sx={{ flexGrow: 1, p: 1 }}>
          <NavLink className="cart-item__title" to={`/product/${id}`}>
            {name?.en}
          </NavLink>
          <div className="cart-item__tags">
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
        </CardContent>
        <div className="cart-item__price">
          <span className={discount ? 'discount discount_active' : 'discount'}>
            {discount}
          </span>
          <span className={discount ? 'price price_discounted' : 'price'}>
            {price.value.centAmount / 10 ** price.value.fractionDigits}
          </span>
        </div>
        <Box className="cart-item__counter">
          <Counter />
        </Box>
        <div className="cart-item__total-price">
          <span className={discount ? 'discount discount_active' : 'discount'}>
            {discount}
          </span>
          <span className={discount ? 'price price_discounted' : 'price'}>
            {price.value.centAmount / 10 ** price.value.fractionDigits}
          </span>
        </div>
      </Box>
      <Box className="cart-item__action">
        <span>Edit</span>
        <span>Remove</span>
      </Box>
      <Divider />
    </Grid>
  );
}

export default CartItem;
