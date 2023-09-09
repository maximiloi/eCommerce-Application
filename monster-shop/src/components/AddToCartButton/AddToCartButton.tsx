import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddToCart } from '../../types/btnProps';

const CustomBtn = styled(Button)<ButtonProps>(() => ({
  color: '#f0c349',
  backgroundColor: '#0E0F10',
  '&:hover': {
    backgroundColor: grey[900],
  },
}));

function AddToCartButton({
  isAdded,
  text = 'Add to cart',
  onClick,
}: AddToCart) {
  return (
    <CustomBtn
      type="button"
      variant="contained"
      size="small"
      disabled={isAdded}
      endIcon={<ShoppingCartIcon />}
      onClick={onClick}
    >
      {text}
    </CustomBtn>
  );
}

export default AddToCartButton;
