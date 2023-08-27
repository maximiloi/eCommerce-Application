import { useCallback, useEffect, useState } from 'react';
import { Box, IconButton, List } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { promo } from '../../helper/variables';
import Slide from './Slide';
import './_PromoSlides.scss';

function PromoSlides() {
  const initialWidth = (window.innerWidth / 3) * 2;
  const [sliderWidth, setSliderWidth] = useState(initialWidth);
  const [count, setCount] = useState(0);

  const prevSlide = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
    } else if (count === 0) {
      setCount(promo.length - 1);
    }
  }, [count]);
  const nextSlide = useCallback(() => {
    if (count < promo.length - 1) {
      setCount(count + 1);
    } else if (count === promo.length - 1) {
      setCount(0);
    }
  }, [count]);

  useEffect(() => {
    const changeSlideWidth = () => {
      setSliderWidth((window.innerWidth / 3) * 2);
    };
    window.addEventListener('resize', changeSlideWidth);
    const autoSlide = setInterval(() => nextSlide, 3000);
    return () => {
      window.removeEventListener('resize', changeSlideWidth);
      clearInterval(autoSlide);
    };
  }, [count, nextSlide]);

  return (
    <Box
      className="slider"
      sx={{ width: sliderWidth, boxShadow: 3, borderRadius: 3 }}
    >
      <List className="slides" sx={{ p: 0 }}>
        <Slide
          sliderWidth={sliderWidth}
          slideImg={promo[count].img}
          slideText={promo[count].text}
        />
      </List>
      <IconButton className="prev" onClick={prevSlide}>
        <KeyboardArrowLeft fontSize="large" />
      </IconButton>
      <IconButton className="next" onClick={nextSlide}>
        <KeyboardArrowRight fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default PromoSlides;
