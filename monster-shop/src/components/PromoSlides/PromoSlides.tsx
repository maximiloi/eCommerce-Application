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
    setCount(count === 0 ? promo.length - 1 : count - 1);
  }, [count]);
  const nextSlide = useCallback(() => {
    setCount(count === promo.length - 1 ? 0 : count + 1);
  }, [count]);

  useEffect(() => {
    const changeSlideWidth = () => {
      setSliderWidth((window.innerWidth / 3) * 2);
    };
    window.addEventListener('resize', changeSlideWidth);
    const autoSlide = setInterval(nextSlide, 3500);
    return () => {
      window.removeEventListener('resize', changeSlideWidth);
      clearInterval(autoSlide);
    };
  }, [nextSlide]);

  return (
    <Box
      className="slider"
      sx={{ width: sliderWidth, boxShadow: 3, borderRadius: 3 }}
    >
      <List className="slides" sx={{ p: 0 }}>
        {promo.map((slide, index) => (
          <Slide
            className={index === count ? 'slide slide_active' : 'slide'}
            key={slide.id}
            // sliderWidth={sliderWidth}
            slideImg={slide.img}
            slideText={slide.text}
            slideLink={slide.path}
          />
        ))}
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
