import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProductProjection,
  Image,
  Price,
  DiscountedPrice,
  LocalizedString,
  Attribute,
  Cart,
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
import { getProductId } from '../../api/requests/catalog';
import { cartAddItem, cartChangeItemQuant } from '../../api/requests/cart';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setTotalQuantity, getCartItems } from '../../redux/cartCountSlice';
import './ProductPageComp.scss';

function ProductPageCard() {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  const { productId } = useParams();

  const products = useAppSelector((state) => state.cartCount.cartItems);
  const isAdded = Boolean(
    products.map((prod) => prod.productId).find((el) => el === productId)
  );
  let itemQuantity = 1;
  if (isAdded) {
    itemQuantity = products.find((item) => item.productId === productId)
      ?.quantity as number;
  }
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<Attribute[]>([]);
  const [img, setImg] = useState<Image[]>([]);
  const [prodDescription, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [itemQ, setQuantity] = useState(itemQuantity);
  const dispatch = useAppDispatch();

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

  const handleAddOrRemove = async () => {
    if (!isAdded) {
      const result = (await cartAddItem(productId as string, itemQ)) as Cart;
      dispatch(getCartItems(result.lineItems));
      if (result.totalLineItemQuantity)
        dispatch(setTotalQuantity(result.totalLineItemQuantity));
    } else {
      const itemId = products.find((item) => item.productId === productId)?.id;
      if (itemId) {
        const result = (await cartChangeItemQuant(itemId, 0)) as Cart;
        if (result.totalLineItemQuantity) {
          dispatch(setTotalQuantity(result.totalLineItemQuantity));
        }
        dispatch(getCartItems(result.lineItems));
      }
    }
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
              <Counter
                isActive={!isAdded}
                quantity={itemQ}
                setQuantity={setQuantity}
              />
              <AddToCartButton isAdded={isAdded} onClick={handleAddOrRemove} />
            </CardActions>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ProductPageCard;
