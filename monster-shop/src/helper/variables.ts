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
type CreatorType = {
  name: string;
  fullName: string;
  img: string;
  path: string;
  role: string;
  text: string[];
};

export const creators: CreatorType[] = [
  {
    name: '/tatsiana',
    path: 'https://github.com/tbandelikova',
    fullName: 'Tatsiana Bandelikova',
    img: 'https://avatars.githubusercontent.com/u/93816022?v=4',
    role: 'Team Member, React-Redux Programming',
    text: [
      'Technology Stack:',
      'Utilized a variety of technologies and libraries to build the project, including React, react-router-dom for routing, react-hook-forms for form handling, react-redux and redux toolkit for state management, MUI material for UI components, Sass for styling, and Typescript for static typing.',
      'Code Quality:',
      'Maintained code quality by checking the codebase with ESLint, a popular linting tool that enforces coding standards and identifies potential errors or code smells.Formatted the code using Prettier, an opinionated code formatter that ensures consistent code styling throughout the project.',
      'Project Folder Structure and README File:',
      'Set up the project folder structure to ensure organization and maintainability.This involved dividing the code into logical modules and components, following best practices and industry standards.Created a comprehensive README file that provided an overview of the project, installation instructions, dependencies, and any other relevant information.This document served as a guide for other team members and potential contributors.',
      'Routing with Browser Router and Header Navigation:',
      'You implemented routing using the React Router library(react-router-dom).This allowed for smooth navigation within the app, ensuring that each page has its own URL and could be easily accessed and bookmarked by users.',
      'Built the header component with navigation, which provided users with a consistent and intuitive way to navigate through different sections of the website.This included links to the main page, catalog, cart, and so one.',
      'Main Page with Aside Menu and Slider:',
      'Contributed to the creation of the main page, which served as the landing page for the website.This page featured an aside menu with navigation buttons, which duplicate header navigation. ',
      'Built a slider component that was used throughout the website to display promotional banners and highlight featured products.This added visual appeal and allowed for effective marketing and product promotion.',
      'Catalog Page with Product Cards:',
      'Created the catalog page, where users could browse through a selection of products.Aside menu provides options to select products by categories.Each product displays as a card, containing key information such as an image, title, price, and any other relevant details.Enabled users to sort products on the catalog page by name and price.This functionality allowed users to find products based on their preferences and facilitated a seamless shopping experience.',
      'Implemented pagination functionality with MUI Material, ensuring that the product list could be divided into multiple pages to enhance performance and usability. ',
      'Users could click on these cards to view the detailed product page or add them to cart.',
      'Detailed Product Page:',
      'I collaborated with my team to develop the detailed product page, which provided a comprehensive view of a specific product.This involved coding and styling the layout, displaying additional images, descriptions, reviews, and any other relevant information to help users make informed purchasing decisions.',
      'Cart Page:',
      'Built the cart page, where users could review the products they had added to their cart.This page displayed the product details, quantities, prices, and provided options for users to update or remove items from their cart and to apply or remove promotional codes.One at a time.User can see both the original price and the discounted price after applying the promo code.',
      'Implemented a basket icon in the header, displaying the quantity of products in the cart.This provided users with a visual indicator of their cart&apos;s contents and allowed for quick access to the cart page.',
      'Cart Item component was made in collaboration with Maxim, it displays individual items within the cart, including the product image, title with link to detailed product page, price per each and total, quantity and counter to increase/decrease quantity.',
    ],
  },
  {
    name: '/gleb',
    path: 'https://github.com/gruntovgd',
    fullName: 'Gleb Gruntov',
    img: 'https://avatars.githubusercontent.com/u/113110967?v=4',
    role: 'Team Member, Commercetools Api Programming',
    text: [
      'Frontend Developer, who has come a long way from stage 0 to the present moment, almost alive. Almost without stumbling. Worked on all aspects of integrating commercetools API, request processing, interaction between different application components, as well as resolving type-related issues. Actively participated in discussions and problem-solving sessions with other project members, contributing to building future plans.',
    ],
  },
  {
    name: '/maxim',
    path: 'https://github.com/maximiloi',
    fullName: 'Maxim Iloi',
    img: 'https://avatars.githubusercontent.com/u/29151316?v=4',
    role: 'Team Lead, Content create',
    text: [
      'I develop responsive mobile-first websites (also with attention to semantic layout) for more than 3 years. I have experience of commercial development as a team member. I have excellent experience in HTML and CSS. Im profound in reading and fixing peers code. My current work includes integrating JQuery plugins and also adapting vanilla JavaScript code on different projects.My hobbies are collecting vinyl, playing and popularising flag - football in Saint Petersburg.',
      '- Creating and customizing a board on ClickUp for project management.',
      '- Setting up a project on VIte using React, Sass and Typescript.',
      '- Creating a customization file for eslint, prettier and husky to ensure code quality.',
      '- Developing Sign In and Sign Up pages using React - Hook - Form.Creating files for validating passwords and date of birth.',
      '- Connecting the react - toastify library to the store project to display notifications.',
      '- Creating an attractive interface for the Profile page.',
      '- Generating images and descriptions for monsters in our store.Integrating this information into the commerce tools system.',
      '- Creating an attractive interface for the product details page and displaying relevant information from commerce tools.',
      '- Creating attributes for products in commerce tools.',
      '- Implementing a system of promo codes for products.',
      '- Helping Tatiana with the layout of the shopping cart list component.',
      '- Creating an image to be used in the slider on the front page.',
    ],
  },
];
