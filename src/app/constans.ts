import { sortByNameAZ, sortByNameZA, sortByPriceSortHighToLow, sortByPriceSortLowToHigh } from './api/helpers';
import { ISortOption } from './api/types';

export const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'indoor-plants', label: 'Indoor plants', checked: false },
      { value: 'outdoor-plants', label: 'Outdoor plants', checked: false },
      { value: 'fantasy-plants', label: 'Fantasy plants', checked: true },
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

export const sortOptionsDefault: ISortOption[] = [
  { name: 'Price: High to Low', href: '#', current: false, sortFunc: sortByPriceSortHighToLow },
  { name: 'Price: Low to High', href: '#', current: false, sortFunc: sortByPriceSortLowToHigh },
  { name: 'A-Z', href: '#', current: false, sortFunc: sortByNameAZ },
  { name: 'Z-A', href: '#', current: false, sortFunc: sortByNameZA },
];
