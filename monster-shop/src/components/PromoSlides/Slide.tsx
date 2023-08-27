import { ListItem } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

type SlideProps = {
  sliderWidth: number;
  slideImg: string;
  slideText: string;
};

function Slide(props: SlideProps) {
  const { sliderWidth, slideImg, slideText } = props;

  return (
    <ListItem className="slide" sx={{ width: sliderWidth, p: 0 }}>
      <img src={slideImg} alt="" />
      <ColoredBtn type="button" variant="contained">
        {slideText}
      </ColoredBtn>
    </ListItem>
  );
}

export default Slide;
