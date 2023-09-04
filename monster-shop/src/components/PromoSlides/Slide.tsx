import { SlideProps } from '../../types/slideProps';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

function Slide(props: SlideProps) {
  const { className, sliderWidth, slideImg, slideText } = props;

  return (
    <li className={className}>
      <img src={slideImg} style={{ width: sliderWidth }} alt="" />
      {slideText && (
        <ColoredBtn type="button" variant="contained">
          {slideText}
        </ColoredBtn>
      )}
    </li>
  );
}

export default Slide;
