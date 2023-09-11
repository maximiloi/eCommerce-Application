import { useState } from 'react';
import { Box } from '@mui/material';
import '../sass/pages/_cartPage.scss';
import { NavLink } from 'react-router-dom';

function CartPage() {
  const [isEmpty, setIsEmpty] = useState(true);

  return (
    <Box className="cart" sx={{ display: 'flex' }}>
      <Box
        className="cart__content"
        sx={{ flexGrow: 1, width: { sm: 'calc(100% - 200px)' }, p: 1 }}
      >
        {isEmpty && (
          <NavLink to="/catalog">
            Nothing here yet... Return to the catalog!
          </NavLink>
        )}
      </Box>
      <Box component="aside" className="cart__aside" sx={{ flexGrow: 0 }} />
    </Box>
  );
}

export default CartPage;
