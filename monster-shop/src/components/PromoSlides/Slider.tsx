import { useCallback, useEffect, useState } from 'react';
import { Box, IconButton, List, Modal } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Image } from '@commercetools/platform-sdk';
import Slide from './Slide';
import './_PromoSlides.scss';

function Slider(props: { images: Image[] }) {
  const { images } = props;
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const prevSlide = useCallback(() => {
    setCount(count === 0 ? images.length - 1 : count - 1);
  }, [count, images.length]);
  const nextSlide = useCallback(() => {
    setCount(count === images.length - 1 ? 0 : count + 1);
  }, [count, images.length]);

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 3500);
    return () => {
      clearInterval(autoSlide);
    };
  }, [nextSlide]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        className="slider"
        sx={{ width: 350, boxShadow: 3, borderRadius: 3 }}
      >
        <List className="slides" sx={{ p: 0 }} onClick={handleModalOpen}>
          {images.map((slide, index) => (
            <Slide
              className={index === count ? 'slide slide_active' : 'slide'}
              key={slide.url}
              sliderWidth={350}
              slideImg={slide.url}
              slideText={undefined}
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
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="slider-modal-title"
        aria-describedby="slider-modal-description"
      >
        <Box
          className="slider slider-popup"
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <List className="slides" sx={{ p: 0 }}>
            {images.map((slide, index) => (
              <Slide
                className={index === count ? 'slide slide_active' : 'slide'}
                key={slide.url}
                slideImg={slide.url}
                slideText={undefined}
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
      </Modal>
    </>
  );
}

export default Slider;
