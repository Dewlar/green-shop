export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const getCategoryValue = (category: string) => {
  // from: 'Outdoor plant',  to: 'outdoor-plant'
  return category.toLowerCase().replace(' ', '-');
};

export default { classNames, getCategoryValue };
