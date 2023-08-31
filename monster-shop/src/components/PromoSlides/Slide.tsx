import { SlideProps } from '../../types/slideProps';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

function Slide(props: SlideProps) {
  const { className, sliderWidth, slideImg, slideText } = props;

  return (
    <li className={className}>
      <img src={slideImg} style={{ width: sliderWidth }} alt="" />
      <ColoredBtn type="button" variant="contained">
        {slideText}
      </ColoredBtn>
    </li>
  );
}

export default Slide;
