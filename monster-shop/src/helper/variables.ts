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
  { img: '/images/slide.png', text: 'Order Now' },
  { img: '/images/carlos-nunez.jpg', text: 'Order Now' },
  { img: '/images/patrick-tomasso.jpg', text: 'Order Now' },
  { img: '/images/samuel-berner.jpg', text: 'Order Now' },
];

export const navBtns = [
  { name: 'Sign In / Sign Up', path: '/auth' },
  { name: 'Catalog', path: '/catalog' },
  { name: 'Customer Profile', path: '/profile' },
  { name: 'About us', path: '/about' },
];
