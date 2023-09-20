import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './_Counter.scss';

type CounterProps = {
  isActive?: boolean;
  quantity: number;
  setQuantity?: (value: React.SetStateAction<number>) => void;
  changeItemQuant?: (newQuantity: number) => Promise<void>;
};

function Counter({
  isActive = true,
  quantity,
  setQuantity,
  changeItemQuant,
}: CounterProps) {
  const [count, setCount] = useState(quantity);

  const handleCount = (number: number) => {
    if (changeItemQuant) {
      changeItemQuant(number);
    }
    if (setQuantity) {
      setQuantity(number);
    }
    setCount(number);
  };
  return (
    <Box className="counter" sx={{ display: 'flex' }}>
      <Button
        aria-label="reduce"
        disabled={!isActive}
        onClick={() => handleCount(Math.max(count - 1, 1))}
      >
        <Remove fontSize="small" />
      </Button>
      <div className="counter__amount">{count}</div>
      <Button
        aria-label="increase"
        disabled={!isActive}
        onClick={() => handleCount(count + 1)}
      >
        <Add fontSize="small" />
      </Button>
    </Box>
  );
}

export default Counter;
