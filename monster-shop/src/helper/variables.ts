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

export const catalogMenuList = ['ALL', 'Funny Monsters', 'Cute Monsters', 'Scary Monsters', 'Real Monsters'];
