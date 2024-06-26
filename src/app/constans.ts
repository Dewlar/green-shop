import { ISortOption } from './api/types';

export interface IProductCategories {
  id: string;
  name: string;
}

export const categoryFilters = [
  {
    name: 'Category',
    value: 'indoor-plants',
    label: 'Indoor plants',
    id: '8adc3358-2e20-41ac-80db-85d4e23ebbf9',
    checked: false,
  },
  {
    name: 'Category',
    value: 'outdoor-plants',
    label: 'Outdoor plants',
    id: 'c2175cba-15d8-4a65-a3d8-16b0b28e89b1',
    checked: false,
  },
  {
    name: 'Category',
    value: 'fantasy-plants',
    label: 'Fantasy plants',
    id: '20129382-a6a2-459f-85de-6b41b18ef120',
    checked: false,
  },
];

export const sizeFilters = [
  {
    name: 'Size',
    value: 'S',
    label: 'S',
    id: '',
    checked: false,
  },
  {
    name: 'Size',
    value: 'M',
    label: 'M',
    id: '',
    checked: false,
  },
  {
    name: 'Size',
    value: 'L',
    label: 'L',
    id: '',
    checked: false,
  },
];

export const sortOptionForCTP: ISortOption[] = [
  { name: 'Price: High to Low', href: '#', current: false, method: 'price desc' },
  { name: 'Price: Low to High', href: '#', current: false, method: 'price asc' },
  { name: 'Sort method: A-Z', href: '#', current: false, method: 'name.en asc' },
  { name: 'Sort method: Z-A', href: '#', current: false, method: 'name.en desc' },
];
