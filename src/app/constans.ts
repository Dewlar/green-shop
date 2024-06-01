import { ISortOption } from './api/types';

export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'indoor-plants', label: 'Indoor plants', id: '8adc3358-2e20-41ac-80db-85d4e23ebbf9', checked: false },
      { value: 'outdoor-plants', label: 'Outdoor plants', id: 'c2175cba-15d8-4a65-a3d8-16b0b28e89b1', checked: false },
      { value: 'fantasy-plants', label: 'Fantasy plants', id: '20129382-a6a2-459f-85de-6b41b18ef120', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 's', label: 'S', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'm', label: 'M', checked: false },
    ],
  },
];

export const sortOptionForCTP: ISortOption[] = [
  { name: 'Price: High to Low', href: '#', current: false, method: 'price asc' },
  { name: 'Price: Low to High', href: '#', current: false, method: 'price desc' },
  { name: 'A-Z', href: '#', current: false, method: 'name.en asc' },
  { name: 'Z-A', href: '#', current: false, method: 'name.en desc' },
];
