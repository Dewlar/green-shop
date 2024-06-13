const isLoggedIn = false;
const navigation = {
  pages: [
    { name: 'Catalog', href: '/catalog' },
    { name: 'About', href: '/about' },
  ],
};
const collections = [
  {
    name: 'Indoor plants',
    href: '/catalog',
    imageSrc: './assets/products/indoor.jpg',
    imageAlt: 'Indoor plants',
  },
  {
    name: 'Outdoor plants',
    href: '/catalog',
    imageSrc: './assets/products/outdoor.jpg',
    imageAlt: 'Outdoor plants',
  },
  {
    name: 'Fantasy plants',
    href: '/catalog',
    imageSrc: './assets/products/fantasy.jpg',
    imageAlt: 'Fantasy plants',
  },
];

const footerNavigation = {
  products: [
    { name: 'Plants 1', href: '/catalog' },
    { name: 'Plants 2', href: '/catalog' },
    { name: 'Plants 3', href: '/catalog' },
  ],
  categories: [
    { name: 'Indor plants', href: '/catalog' },
    { name: 'Outdor plants', href: '/catalog' },
  ],
  pages: [
    { name: 'Catalog', href: '/catalog' },
    { name: 'About us', href: '/about' },
    { name: 'Registration', href: '/signup' },
    { name: 'Your account', href: '' },
  ],
  follow: [
    { name: 'Dewlar', href: 'https://github.com/Dewlar' },
    { name: 'Annsinkevich47', href: 'https://github.com/annsinkevich47' },
    { name: 'Letanatol', href: 'https://github.com/letanatol' },
  ],
};

const trendingProducts = [
  {
    id: 1,
    name: 'Plant 1',
    color: 'Plant',
    price: '$12',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 2,
    name: 'Plant 2',
    color: 'Plant',
    price: '$36',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 3,
    name: 'Plant 3',
    color: 'Plant',
    price: '$54',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 4,
    name: 'Plant 4',
    color: 'Plant',
    price: '$22',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 5,
    name: 'Plant 5',
    color: 'Plant',
    price: '$16',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
];
const policies = [
  {
    name: '30-Day guarantee',
    imageUrl: './assets/policies/guarantee.png',
    description:
      'All plants are guaranteed for 30 days after arrival, if they are still in their original nursery pot.',
  },
  {
    name: 'Fast shipping',
    imageUrl: './assets/policies/shipping.png',
    description: 'Fast shipping on all orders.',
  },
  {
    name: 'Care guide',
    imageUrl: './assets/policies/guide.png',
    description: 'Care guide included with each order.',
  },
];

export default { footerNavigation, trendingProducts, collections, navigation, policies, isLoggedIn };
