import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import './_cardItem.scss';

type CardProps = {
  id: string;
  img: string;
  title: string;
  tags: Array<string>;
  discount: number;
  price: number;
};

function CardItem(props: CardProps) {
  const { id, img, title, tags, discount, price } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <Grid item xs={9} sm={4} md={4}>
      <Card
        className="card"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f8e2a7',
          borderRadius: 3,
        }}
      >
        <CardMedia component="div" sx={{ pt: '100%' }} image={img} />
        <CardContent className="card__content" sx={{ flexGrow: 1, p: 1 }}>
          <p className="card__title">{title}</p>
          <div className="card__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="card__price">
            <span
              className={discount ? 'discount discount_active' : 'discount'}
            >
              {discount}
            </span>
            <span className={discount ? 'price price_discounted' : 'price'}>
              {price}
            </span>
          </div>
        </CardContent>
        <CardActions sx={{ pb: 2, pt: 0 }}>
          <ColoredBtn size="small" variant="contained" onClick={handleClick}>
            View details
          </ColoredBtn>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;
