import { Button, ButtonProps, styled } from '@mui/material';

const ColoredBtn = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
  // variant: "contained",
}));

export default ColoredBtn;
