import { NavLink } from 'react-router-dom';
import { SlideProps } from '../../types/slideProps';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

function Slide(props: SlideProps) {
  const { className, sliderWidth, slideImg, slideText, slideLink } = props;

  return (
    <li className={className}>
      <img src={slideImg} style={{ width: sliderWidth }} alt="banner" />
      {slideText && slideLink && (
        <ColoredBtn type="button" variant="contained">
          <NavLink to={slideLink}>{slideText}</NavLink>
        </ColoredBtn>
      )}
    </li>
  );
}

export default Slide;
