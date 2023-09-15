import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './_Counter.scss';

type CounterProps = {
  quantity: number;
};

function Counter({ quantity }: CounterProps) {
  const [count, setCount] = useState(quantity);
  return (
    <Box className="counter" sx={{ display: 'flex' }}>
      <Button
        aria-label="reduce"
        onClick={() => {
          setCount(Math.max(count - 1, 1));
        }}
      >
        <Remove fontSize="small" />
      </Button>
      <div className="counter__amount">{count}</div>
      <Button
        aria-label="increase"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <Add fontSize="small" />
      </Button>
    </Box>
  );
}

export default Counter;