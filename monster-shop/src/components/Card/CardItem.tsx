import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import {
  Attribute,
  Image,
  ProductProjection,
  Price,
  PriceTier,
} from '@commercetools/platform-sdk';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import './_cardItem.scss';

function CardItem(props: ProductProjection) {
  const { id, masterVariant, name } = props;
  const tags = masterVariant.attributes as Attribute[];
  const img = (masterVariant.images as Image[])[0];
  const price = (masterVariant.prices as Price[])[0];
  let discount = 0;
  if (price.tiers) {
    const priceTiers = (price.tiers as PriceTier[])[0];
    discount =
      priceTiers.value.centAmount / 10 ** priceTiers.value.fractionDigits;
  }
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
        <CardMedia component="div" sx={{ pt: '100%' }} image={img.url} />
        <CardContent className="card__content" sx={{ flexGrow: 1, p: 1 }}>
          <p className="card__title">{name.en}</p>
          <div className="card__tags">
            {tags.map((tag) => (
              <span key={tag.value} className="tag">
                {tag.value}
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
              {price.value.centAmount / 10 ** price.value.fractionDigits}
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
