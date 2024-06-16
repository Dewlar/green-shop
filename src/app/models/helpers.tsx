export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const getCategoryValue = (category: string) => {
  // from: 'Outdoor plant',  to: 'outdoor-plant'
  return category.toLowerCase().replace(' ', '-');
};

export const getArrayWithPaginationNumber = (currentPage: number, totalPageCount: number) => {
  const paginationPageNumbers: number[] = [];
  if (currentPage > 3 && currentPage <= totalPageCount - 3) {
    paginationPageNumbers.push(1, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPageCount);
  } else if (currentPage === 1) {
    paginationPageNumbers.push(1, 2, 3, 0, totalPageCount);
  } else if (currentPage === 2 || currentPage === 3) {
    paginationPageNumbers.push(1, 2, 3, 4, 0, totalPageCount);
  } else if (currentPage === totalPageCount - 2 || currentPage === totalPageCount - 1) {
    paginationPageNumbers.push(1, 0, totalPageCount - 3, totalPageCount - 2, totalPageCount - 1, totalPageCount);
  } else if (currentPage === totalPageCount) {
    paginationPageNumbers.push(1, 0, totalPageCount - 2, totalPageCount - 1, totalPageCount);
  }

  return paginationPageNumbers;
};

export default { classNames, getCategoryValue };
