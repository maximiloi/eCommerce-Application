// import { useParams } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

import './ProductPageComp.scss';

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
        <CardContent className="product__content" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p className="product__title">{title}</p>
            <div className="product__price">
              <span
                className={discount ? 'discount discount_active' : 'discount'}
              >
                {discount}
              </span>
              <span className={discount ? 'price price_discounted' : 'price'}>
                {price}
              </span>
            </div>
          </Box>

          <p className="product__text">{description}</p>

          <div className="product__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <CardActions sx={{ pb: 2, pt: 0 }}>
            <ColoredBtn size="small" variant="contained">
              Add Cart
            </ColoredBtn>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPageCard;
