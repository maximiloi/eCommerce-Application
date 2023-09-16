import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  setTotalQuantity,
  getCartItems,
  getDiscountedAmount,
} from '../redux/cartCountSlice';
import { cartClear, getCarts } from '../api/requests/cart';
import PromoCodeBar from '../components/PromoCodeBar/PromoCodeBar';
import ColoredBtn from '../components/ColoredBtn/ColoredBtn';
import Loader from '../components/Loader/Loader';
import CartItem from '../components/CartItem/CartItem';
import '../sass/pages/_cartPage.scss';

function CartPage() {
  const products = useAppSelector((state) => state.cartCount.cartItems);
  const totalQuantity = useAppSelector((state) => state.cartCount.quantity);
  const discountAmount = useAppSelector(
    (state) => state.cartCount.discountAmount
  );
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProducts, setIsProducts] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      setIsLoaded(false);
      const cartResponce = (await getCarts()) as Cart[];
      const cart = cartResponce[0];
      if (cart) {
        setIsProducts(!!cart.lineItems.length);
        dispatch(getCartItems(cart.lineItems || []));
        dispatch(setTotalQuantity(cart.totalLineItemQuantity || 0));
        dispatch(getDiscountedAmount(cart.lineItems));
        setTotalPrice(
          cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits
        );
      }
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const handleClearCart = useCallback(async () => {
    try {
      const responce = (await cartClear()) as Cart;
      setIsProducts(false);
      dispatch(getCartItems(responce.lineItems));
      dispatch(setTotalQuantity(responce.totalLineItemQuantity || 0));
      dispatch(getDiscountedAmount([]));
      setTotalPrice(0);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, totalQuantity, discountAmount]);

  return (
    <Box
      className="cart"
      sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Box
        className="cart__content"
        sx={{ flexGrow: 1, width: { md: 'calc(100% - 200px)' }, p: 2 }}
      >
        {!isProducts ? (
          <NavLink to="/catalog" className="cart__link">
            Nothing here yet... Return to the catalog!
          </NavLink>
        ) : (
          <Grid container spacing={2}>
            {!isLoaded && <Loader />}
            {isProducts &&
              isLoaded &&
              products.map((card) => <CartItem key={card.id} {...card} />)}
            <Grid item sx={{ width: 1 }} className="cart-item cart-item_total">
              <Box
                className="cart-item__wrap"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Box>
                  <p>{`${totalQuantity} Items`}</p>
                </Box>
                <Box>
                  <p className="price">{totalPrice}</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Box component="aside" className="cart__aside" sx={{ flexGrow: 1 }}>
        <h4 className="cart__subtitle">Enter promo code</h4>
        <PromoCodeBar />
        <Table className="cart__calculate" size="small">
          <TableBody>
            <TableRow>
              <TableCell>Shipping cost</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Before discount</TableCell>
              <TableCell align="right">
                {(totalPrice + discountAmount).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow className="calculate-discount">
              <TableCell>Discount</TableCell>
              <TableCell align="right">{discountAmount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow className="total">
              <TableCell>Total</TableCell>
              <TableCell align="right">{totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className="cart__action">
          <Button className="btn order" fullWidth type="button">
            Order monsters
          </Button>
          <span className="divider">Or</span>
          <ColoredBtn
            type="button"
            variant="contained"
            fullWidth
            disabled={false}
            onClick={handleClearCart}
          >
            Clear Shopping Cart
          </ColoredBtn>
        </Box>
      </Box>
    </Box>
  );
}

export default CartPage;
