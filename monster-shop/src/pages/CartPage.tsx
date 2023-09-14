import { useState } from 'react';
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
import { ProductProjection } from '@commercetools/platform-sdk';
import PromoCodeBar from '../components/PromoCodeBar/PromoCodeBar';
import ColoredBtn from '../components/ColoredBtn/ColoredBtn';
import Loader from '../components/Loader/Loader';
import CartItem from '../components/CartItem/CartItem';
import '../sass/pages/_cartPage.scss';

function CartPage() {
  const [products] = useState<ProductProjection[]>([]); // setProducts
  const [isEmpty] = useState(false); // setIsEmpty
  const [promoCode, setPromoCode] = useState<string>('');
  const isLoaded = !!products.length;
  console.log(promoCode);
  return (
    <Box
      className="cart"
      sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
    >
      <Box
        className="cart__content"
        sx={{ flexGrow: 1, width: { sm: 'calc(100% - 200px)' }, p: 1 }}
      >
        {isEmpty ? (
          <NavLink to="/catalog" className="cart__link">
            Nothing here yet... Return to the catalog!
          </NavLink>
        ) : (
          <Grid container spacing={2}>
            {!isLoaded && <Loader />}
            {isLoaded &&
              !isEmpty &&
              products.map((card) => <CartItem key={card.id} {...card} />)}
          </Grid>
        )}
      </Box>
      <Box component="aside" className="cart__aside" sx={{ flexGrow: 1 }}>
        <h4 className="cart__subtitle">Enter promo code</h4>
        <PromoCodeBar setPromoCode={setPromoCode} />
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
              <TableCell align="right">0</TableCell>
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
