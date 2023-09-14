import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProductProjection,
  Image,
  Price,
  DiscountedPrice,
  LocalizedString,
  Attribute,
} from '@commercetools/platform-sdk';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Slider from '../PromoSlides/Slider';
import Counter from '../Counter/Counter';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import Loader from '../Loader/Loader';
import { AttributeType } from '../../types/inputProps';
import './ProductPageComp.scss';
import { getProductId } from '../../api/requests/catalog';

function ProductPageCard() {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  const { productId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<Attribute[]>([]);
  const [img, setImg] = useState<Image[]>([]);
  const [prodDescription, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  async function fetchProductData(id: string) {
    try {
      const productResponce = (await getProductId(id)) as ProductProjection;
      const { name, masterVariant, description } = productResponce;
      if (productResponce) setIsLoaded(true);
      setTitle(name.en);
      setTags(masterVariant.attributes as Attribute[]);
      setImg(masterVariant.images as Image[]);
      setDescription((description as LocalizedString).en);
      setPrice((masterVariant.prices as Price[])[0].value.centAmount);
      setDiscount(
        ((masterVariant.prices as Price[])[0].discounted as DiscountedPrice)
          ?.value.centAmount
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddToCart = () => {
    console.log(`Add monster ${productId} to the cart`);
    setIsAdded(!isAdded);
  };

  useEffect(() => {
    fetchProductData(productId as string);
  }, [productId]);

  return (
    <>
      {!isLoaded && <Loader />}
      {isLoaded && (
        <Card
          className="product__card"
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', md: 'flex-start' },
            flexDirection: isTabletOrSmaller ? 'column' : 'row',
            maxWidth: isTabletOrSmaller ? '500px' : '100%',
            margin: '0 auto',
            bgcolor: '#f8e2a7',
            borderRadius: 5,
            width: { md: 800 },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: 350,
              height: 350,
              p: { xs: 1, sm: 3, md: 1 },
            }}
          >
            <Slider images={img} />
          </Box>
          <CardContent className="product__content" sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {title && <p className="product__title">{title}</p>}
              <div className="product__price">
                <span
                  className={discount ? 'discount discount_active' : 'discount'}
                >
                  {discount / 100}
                </span>
                <span className={discount ? 'price price_discounted' : 'price'}>
                  {price / 100}
                </span>
              </div>
            </Box>

            <p className="product__text">{prodDescription}</p>
            <div className="product__tags">
              {tags.map((tag) => (
                <div key={tag.name}>
                  {tag.value.map((el: AttributeType) => (
                    <span key={el.key} className="tag">
                      {el.label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <CardActions sx={{ pb: 2, pt: 0, justifyContent: 'space-evenly' }}>
              <Counter quantity={1} />
              <AddToCartButton isAdded={isAdded} onClick={handleAddToCart} />
            </CardActions>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ProductPageCard;
