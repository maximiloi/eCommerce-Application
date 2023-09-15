import { NavLink } from 'react-router-dom';
import {
  Box,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Attribute,
  Image,
  DiscountedPrice,
  LineItem,
  Cart,
} from '@commercetools/platform-sdk';
import { AttributeType, CartItemProps } from '../../types/inputProps';
import calculatePrice from '../../helper/calculatePrice';
import { cartChangeItemQuant } from '../../api/requests/cart';
import Counter from '../Counter/Counter';
import './_cartItem.scss';

function CartItem(props: LineItem & CartItemProps) {
  const {
    id,
    productId,
    name,
    variant,
    price,
    quantity,
    totalPrice,
    setTotalQuantity,
  } = props;
  const tags = variant?.attributes as Attribute[];
  const img = (variant?.images as Image[])[0];
  const priceEach = calculatePrice(price);
  let discount = 0;
  if (price.discounted) {
    const priceDiscounted = price.discounted as DiscountedPrice;
    discount = calculatePrice(priceDiscounted);
  }

  const deleteFromCart = async () => {
    const result = (await cartChangeItemQuant(id, 0)) as Cart;
    if (result.totalLineItemQuantity)
      setTotalQuantity(result.totalLineItemQuantity);
  };

  return (
    <Grid item sx={{ width: 1, p: 0 }} className="cart-item">
      <Box
        className="cart-item__wrap"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box className="cart-item__inner cart-item__inner--start">
          <IconButton
            aria-label="delete"
            sx={{ height: 40, mr: 1 }}
            onClick={deleteFromCart}
          >
            <DeleteIcon />
          </IconButton>
          <CardMedia
            component="div"
            sx={{ width: 50, height: 60, display: { xs: 'none', md: 'block' } }}
            image={img.url}
          />
          <CardContent
            className="cart-item__content"
            sx={{ flexGrow: 1, p: 1 }}
          >
            <NavLink className="cart-item__title" to={`/product/${productId}`}>
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
        </Box>
        <Box className="cart-item__inner">
          <div className="cart-item__price cart-item__box">
            <span
              className={discount ? 'discount discount_active' : 'discount'}
            >
              {discount}
            </span>
            <span className={discount ? 'price price_discounted' : 'price'}>
              {priceEach}
            </span>
          </div>
          <Box className="cart-item__counter  cart-item__box cart-item__box--center">
            <Counter quantity={quantity} />
          </Box>
          <div className="cart-item__total-price  cart-item__box cart-item__box--center">
            <span className="price">
              {totalPrice.centAmount / 10 ** totalPrice.fractionDigits}
            </span>
          </div>
        </Box>
      </Box>
      <Divider />
    </Grid>
  );
}

export default CartItem;