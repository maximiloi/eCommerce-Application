import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import './_cardItem.scss';

type CardProps = {
  img: string;
  title: string;
  tags: Array<string>;
  discount: number;
  price: number;
};

function CardItem(props: CardProps) {
  const { img, title, tags, discount, price } = props;
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
              {discount}&#x1FA78;
            </span>
            <span className={discount ? 'price price_discounted' : 'price'}>
              {price}&#x1FA78;
            </span>
          </div>
        </CardContent>
        <CardActions sx={{ pb: 2, pt: 0 }}>
          <ColoredBtn size="small" variant="contained">
            View details
          </ColoredBtn>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;
