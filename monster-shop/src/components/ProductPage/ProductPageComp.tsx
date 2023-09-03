// import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
// import ColoredBtn from '../ColoredBtn/ColoredBtn';

// type CardProps = {
//   id: string;
//   img: string;
//   title: string;
//   tags: Array<string>;
//   discount: number;
//   price: number;
// };

const product = {
  id: '1',
  title: 'Thunderfang',
  img: '/images/photo_3.jpg',
  price: 300,
  discount: 0,
  tags: ['bestseller'],
  description:
    'Thunderfang is a fierce and powerful warrior with razor-sharp teeth and lightning-fast reflexes. He is known for his bravery and loyalty to his pack, often risking his life to protect and defend them. Despite his intimidating appearance, Thunderfang has a gentle heart and is fiercely protective of those he loves.',
};

function ProductPageCard() {
  const { id, img, title, tags, discount, price, description } = product;
  // const { productId } = useParams();

  return (
    <div>
      <em>id: {id}</em>{' '}
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          bgcolor: '#f8e2a7',
          borderRadius: 5,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 350 }}
          image={img}
          alt={title}
        />
        <CardContent className="card__content" sx={{ flexGrow: 1, p: 1 }}>
          <p className="card__title">{title}</p>
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

          <div className="card__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <p className="card__text">{description}</p>
        </CardContent>
        <CardActions sx={{ pb: 2, pt: 0 }}>
          {/* <ColoredBtn size="small" variant="contained" onClick={handleClick}>
            View details
          </ColoredBtn> */}
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductPageCard;
