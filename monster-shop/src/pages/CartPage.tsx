import { useEffect, useState } from 'react';
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
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { getCarts } from '../api/requests/cart';
import PromoCodeBar from '../components/PromoCodeBar/PromoCodeBar';
import ColoredBtn from '../components/ColoredBtn/ColoredBtn';
import Loader from '../components/Loader/Loader';
import CartItem from '../components/CartItem/CartItem';
import '../sass/pages/_cartPage.scss';

function CartPage() {
  const [products, setProducts] = useState<LineItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProducts, setIsProducts] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState<string>('');

  async function fetchCart() {
    try {
      setIsLoaded(false);
      const cartResponce = (await getCarts()) as Cart[];
      const cart = cartResponce[0];
      setIsProducts(!!cart.lineItems.length);
      setProducts(cart.lineItems);
      setTotalQuantity(cart.totalLineItemQuantity || 0);
      setTotalPrice(
        cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits
      );
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box
      className="cart"
      sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Box
        className="cart__content"
        sx={{ flexGrow: 1, width: { md: 'calc(100% - 200px)' }, p: 2 }}
      >
        {isLoaded && !isProducts ? (
          <NavLink to="/catalog" className="cart__link">
            Nothing here yet... Return to the catalog!
          </NavLink>
        ) : (
          <Grid container spacing={2}>
            {!isLoaded && <Loader />}
            {isProducts &&
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
        <PromoCodeBar promoCode={promoCode} setPromoCode={setPromoCode} />
        <Table className="cart__calculate" size="small">
          <TableBody>
            <TableRow>
              <TableCell>Shipping cost</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell align="right">-0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">0</TableCell>
            </TableRow>
            <TableRow className="total">
              <TableCell>Total</TableCell>
              <TableCell align="right">{totalPrice}</TableCell>
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
          >
            Clear Shopping Cart
          </ColoredBtn>
        </Box>
      </Box>
    </Box>
  );
}

export default CartPage;
