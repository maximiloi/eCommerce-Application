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

export const catalogMenuList = {
  ALL: '',
  'Funny Monsters': '470126d4-b800-4c84-8a58-16d1dcfe5f42',
  'Cute Monsters': '822afbb3-711c-4fd5-8336-7b2147c1d174',
  'Scary Monsters': '3bb278f1-4669-46a6-b158-a97edb6d77a2',
  'Real Monsters': 'a69edcea-705d-45b1-9b9c-a0fe977998e1',
};

export const creators = [
  {
    name: '/tatsiana',
    path: 'https://github.com/tbandelikova',
    fullName: 'Tatsiana Bandelikova',
    img: 'https://avatars.githubusercontent.com/u/93816022?v=4',
    role: 'React programming',
  },
  {
    name: '/gleb',
    path: 'https://github.com/gruntovgd',
    fullName: 'Gleb Gruntov',
    img: 'https://avatars.githubusercontent.com/u/113110967?v=4',
    role: 'Commercetools Api programming',
  },
  {
    name: '/maxim',
    path: 'https://github.com/maximiloi',
    fullName: 'Maxim Iloi',
    img: 'https://avatars.githubusercontent.com/u/29151316?v=4',
    role: 'Content create',
  },
];
