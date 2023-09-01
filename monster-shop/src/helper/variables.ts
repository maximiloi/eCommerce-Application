export const countries = [
  { value: 'BY', label: 'Belarus' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'PL', label: 'Poland' },
  { value: 'RU', label: 'Russia' },
];

export const SignUpDefaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  dateOfBirth: undefined,
  shippingStreet: '',
  shippingCity: '',
  shippingPostalCode: '',
  shippingCountry: '',
  shippingDefaultAddress: false,
  addressMatches: false,
  billingStreet: '',
  billingCity: '',
  billingPostalCode: '',
  billingCountry: '',
  billingDefaultAddress: false,
};

export const addressShip = [
  'shippingStreet',
  'shippingCity',
  'shippingPostalCode',
  'shippingCountry',
];

export const addressBill = [
  'billingStreet',
  'billingCity',
  'billingPostalCode',
  'billingCountry',
];

export const promo = [
  { id: 0, img: '/images/slide.png', text: 'Order Now - 1' },
  { id: 1, img: '/images/carlos-nunez.jpg', text: 'Order Now - 2' },
  { id: 2, img: '/images/patrick-tomasso.jpg', text: 'Order Now - 3' },
  { id: 3, img: '/images/samuel-berner.jpg', text: 'Order Now - 4' },
];

export const pages = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'About us', path: '/about' },
  { name: 'Sign In', path: '/auth' },
  { name: 'Sign Up', path: '/register' },
];

export const settings = ['Profile', 'Logout'];

export const navBtns = [
  { name: 'Sign In / Sign Up', path: '/auth' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Customer Profile', path: '/profile' },
  { name: 'About us', path: '/about' },
];

export const catalogMenuList = [
  'ALL',
  'Funny Monsters',
  'Cute Monsters',
  'Scary Monsters',
  'Real Monsters',
];

export const dummyProducts = [
  {
    id: 1,
    title: 'Babadook',
    img: '/images/photo_1.jpg',
    price: 300,
    discount: 0,
    tags: ['bestseller'],
  },
  {
    id: 2,
    title: 'Jkjsdghsf',
    img: '/images/photo_2.jpg',
    price: 200,
    discount: 0,
    tags: [],
  },
  {
    id: 3,
    title: 'Jkfslfjdlg',
    img: '/images/photo_3.jpg',
    price: 500,
    discount: 0,
    tags: ['new'],
  },
  {
    id: 4,
    title: 'Hkfjf ndkfhk',
    img: '/images/photo_4.jpg',
    price: 1000,
    discount: 990,
    tags: ['bestseller', 'sale'],
  },
  {
    id: 5,
    title: 'Gslfafs cjmvg',
    img: '/images/slide.png',
    price: 3150,
    discount: 3000,
    tags: ['bestseller', 'sale'],
  },
  {
    id: 6,
    title: 'Gkkkfdglsh jshd',
    img: '/images/patrick-tomasso.jpg',
    price: 3630,
    discount: 0,
    tags: ['bestseller'],
  },
  {
    id: 7,
    title: 'Hkfbncbv fdkf',
    img: '/images/samuel-berner.jpg',
    price: 1300,
    discount: 0,
    tags: ['new'],
  },
  {
    id: 8,
    title: 'Hkdsjkd jfdh',
    img: '/images/carlos-nunez.jpg',
    price: 350,
    discount: 0,
    tags: ['new'],
  },
  {
    id: 9,
    title: 'Hkl kfjkdfhd',
    img: '/images/slide.png',
    price: 200,
    discount: 0,
    tags: ['bestseller'],
  },
  {
    id: 10,
    title: 'Hfldkoeu fdfh',
    img: '/images/patrick-tomasso.jpg',
    price: 2200,
    discount: 2000,
    tags: ['bestseller', 'sale'],
  },
  {
    id: 11,
    title: 'IIndsbfjhf',
    img: '/images/samuel-berner.jpg',
    price: 100,
    discount: 0,
    tags: ['bestseller'],
  },
];
