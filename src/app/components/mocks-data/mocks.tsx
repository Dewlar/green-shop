const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];
const isLoggedIn = false;
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
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
    { name: 'Your account', href: '/login' },
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
    name: 'plant 1',
    color: 'Natural',
    price: '$75',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 2,
    name: 'Plant 2',
    color: 'Natural',
    price: '$75',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 3,
    name: 'Plant 3',
    color: 'Natural',
    price: '$75',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 4,
    name: 'Plant 4',
    color: 'Natural',
    price: '$75',
    href: '/catalog',
    imageSrc: './assets/products/preview-plant.jpg',
    imageAlt: 'Hand stitched, orange leather long wallet.',
  },
  {
    id: 5,
    name: 'Plant 5',
    color: 'Natural',
    price: '$75',
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

export default { footerNavigation, trendingProducts, currencies, collections, navigation, policies, isLoggedIn };
