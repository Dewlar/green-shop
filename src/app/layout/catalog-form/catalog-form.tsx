import React, { FC, useEffect, useState } from 'react';
import { Range } from 'react-range';
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cart, ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { classNames, formatPriceInEuro } from '../../api/helpers';
import { ICategoryData, IClickedIconsState, ISortOption } from '../../api/types';
import { sizeFilters, sortOptionForCTP } from '../../constans';
import getProductsFilter from '../../api/catalog/getProductsFilter';
import getCategories from '../../api/catalog/getCategories';
import { addProductToBasket } from '../../api/basket/BasketRepository';
import { getCategoryValue } from '../../models';
import { useStateContext } from '../../state/state-context';

const CatalogForm: FC<{ movedCategory: string | undefined }> = ({ movedCategory }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<ProductProjection[] | undefined>(undefined);
  const [productId, setProductId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
  const [selectedSizeValue, setSelectedSizeValue] = useState('');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState('');
  const [sortName, setSortName] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<string>('name.en asc');
  const [sortOptions, setSortOptions] = useState<ISortOption[]>(sortOptionForCTP);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [inputSearch, setInputSearch] = useState('');
  const [clickedIcons, setClickedIcons] = useState<IClickedIconsState>({});
  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setTotalLineItemQuantity } = useStateContext();

  const handleInputSearch = (value: string) => {
    setInputSearch(value);
  };

  const handleSizeClick = (sizeValue: string, sizeLabel: string) => {
    setSelectedSizeValue(sizeValue === '' ? '' : `variants.attributes.Size:"${sizeValue}"`);
    setSelectedSizeLabel(sizeLabel === '' ? '' : sizeLabel);
  };

  const handleCategoryClick = (categoryId: string, categoryValue: string) => {
    // console.log('rrrrrr---->, ', movedCategory, categoryValue);
    // setSelectedCategoryId(categoryId === '' ? '' : `categories.id:subtree("${categoryId}")`);
    if (categoryValue) navigate(`/catalog/${getCategoryValue(categoryValue)}`);
    else navigate(`/catalog`);
    // else {
    //   handleCategoryClick('', '');
    //   handleSizeClick('', '');
    //   setPriceRange([0, 100000]);
    // }
    // if (location.state?.isExternal) {
    //   handleSizeClick('', '');
    //   setPriceRange([0, 100000]);
    // }
    setSelectedCategoryValue(categoryValue === '' ? '' : categoryValue);
  };

  const handleSortClick = (sortOption: ISortOption) => {
    setSortName(sortOption.name);
    setSortMethod(sortOption.method);

    const updatedSortOptions = sortOptions.map((option) => ({
      ...option,
      current: option.name === sortOption.name,
    }));
    setSortOptions(updatedSortOptions);
  };

  const handleResetFilters = () => {
    handleCategoryClick('', '');
    handleSizeClick('', '');
    setPriceRange([0, 100000]);
  };

  const handleIconBasketClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setProductId(id);
    setClickedIcons((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);

      // response.some((category) => getCategoryValue(category.name) === movedCategory);
      // if (response.some((category) => getCategoryValue(category.name) === movedCategory))
      //   console.log('aaaaaaaaaaaaaaa');
      // console.log('movedCategory', movedCategory);
      // setSelectedCategoryId('');

      let currentCategory: ICategoryData = {
        id: '',
        name: '',
      };
      response.forEach((category) => {
        if (getCategoryValue(category.name) === movedCategory) {
          // console.log('categoryID -> ', category, movedCategory);
          currentCategory = { ...category };
        }
      });
      if (currentCategory.id) setSelectedCategoryId(`categories.id:subtree("${currentCategory.id}")`);
      else setSelectedCategoryId('');
      setSelectedCategoryValue(currentCategory.name === '' ? '' : currentCategory.name);
      // console.log('useFfect start catalog', currentCategory, 'a', selectedCategoryValue);
      //
      // console.log('location -------- ', location.state?.isExternal);
      if (location.state?.isExternal) {
        handleSizeClick('', '');
        setPriceRange([0, 100000]);
      }
    };

    fetchCategories().catch(() => toast.error('Error fetching categories.'));
  }, [selectedCategoryId, movedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsFilter({
        filter: [
          selectedCategoryId,
          selectedSizeValue,
          `variants.price.centAmount:range (${priceRange[0]} to ${priceRange[1]})`,
        ],
        sort: [sortMethod],
        limit: 12,
        offset: 0,
        search: inputSearch,
      });
      const responseResult = response.body?.results;
      // console.log('actual response products:', responseResult);
      if (sortName === 'Price: High to Low' && responseResult) {
        responseResult.sort((a, b) => {
          const aPrice = a?.masterVariant?.prices?.[0]?.value.centAmount ?? 0;
          const bPrice = b?.masterVariant?.prices?.[0]?.value.centAmount ?? 0;
          return bPrice - aPrice;
        });
      }
      setProducts(
        responseResult?.filter((product) => {
          const masterVariantPrice = product?.masterVariant?.prices?.[0]?.value.centAmount ?? null;
          return masterVariantPrice !== null && masterVariantPrice >= priceRange[0];
        })
      );
    };

    fetchProducts().catch(() => toast.error('Error fetching products.'));
  }, [selectedCategoryId, selectedSizeValue, sortMethod, priceRange, inputSearch]);

  useEffect(() => {
    if (!productId) return;

    const fetchProducts = async () => {
      try {
        const response: ClientResponse<Cart | ClientResult> = await addProductToBasket({
          productId,
          quantity: 1,
          variantId: 1,
        });

        if ('body' in response && response.body && 'totalLineItemQuantity' in response.body) {
          setTotalLineItemQuantity(response.body.totalLineItemQuantity ?? 0);
        } else {
          setTotalLineItemQuantity(0);
        }
        console.log('addProductToBasket=>>>>>>>>>>>>', response);
      } catch (error) {
        toast.error('Error adding product to cart.');
      }
    };

    fetchProducts();
  }, [productId]);

  return (
    <div className="bg-white">
      <div>
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="mobile-filters relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* mobile menu */}
                  <form className="mobile-categories mt-4 border-t border-gray-200">
                    <h3 className="-my-3 flow-root cursor-pointer" onClick={() => handleResetFilters()}>
                      <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-900">Categories</span>
                      </div>
                    </h3>
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className={`border-b border-gray-200 py-6 ${selectedCategoryValue === category.name ? 'bg-gray-100' : ''}`}
                        onClick={() => handleCategoryClick(category.id, category.name)}
                      >
                        <div className="flex items-center">
                          <label
                            className={`text-sm text-gray-600 cursor-pointer ${selectedCategoryValue === category.name ? 'text-green-600' : ''}`}
                          >
                            {category.name}
                          </label>
                        </div>
                      </div>
                    ))}

                    <h3 className="-my-3 flow-root cursor-pointer" onClick={() => handleSizeClick('', '')}>
                      <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-900">Size</span>
                      </div>
                    </h3>
                    {sizeFilters.map((size) => (
                      <div
                        key={size.label}
                        className={`border-b border-gray-200 py-6 cursor-pointer ${selectedSizeLabel === size.label ? 'bg-gray-100' : ''}`}
                        onClick={() => handleSizeClick(size.value, size.label)}
                      >
                        <div className="flex items-center">
                          <label
                            className={`text-sm text-gray-600 cursor-pointer ${selectedSizeValue === size.value ? 'text-green-600' : ''}`}
                          >
                            {size.label}
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="price border-t border-gray-200 px-4 py-6">
                      <h3 className="text-sm font-medium text-gray-900">Price</h3>
                      <div className="mt-6 flex flex-col gap-2.5">
                        <Range
                          step={100}
                          min={0}
                          max={100000}
                          values={priceRange}
                          onChange={(values) => setPriceRange(values)}
                          renderTrack={({ props, children }) => (
                            <div {...props} className="h-1 bg-gray-200 rounded-md">
                              {children}
                            </div>
                          )}
                          renderThumb={({ props }) => (
                            <div
                              {...props}
                              className="h-4 w-4 bg-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            />
                          )}
                        />
                        <div className="flex justify-between text-xs">
                          <span>€{(priceRange[0] / 100).toFixed(2)}</span>
                          <span>€{(priceRange[1] / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* desktop main section */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-end border-b border-gray-200 pb-5 pt-3">
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  value={inputSearch}
                  onChange={(e) => handleInputSearch(e.target.value)}
                  onBlur={() => {
                    setInputSearch('');
                    handleCategoryClick('', '');
                  }}
                  placeholder="Search"
                  className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex relative">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-green-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>
                  <div className="absolute -bottom-20 -left-10 inline-flex w-32 group justify-center whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-900">
                    {sortName}
                  </div>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900 bg-green-100' : 'text-gray-500',
                                focus ? 'bg-green-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => handleSortClick(option)}
                            >
                              {option.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* desktop */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <h3 className="-my-3 flow-root cursor-pointer" onClick={() => handleResetFilters()}>
                  <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900">Categories</span>
                  </div>
                </h3>
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className={`border-b border-gray-200 py-6 cursor-pointer ${selectedCategoryValue === category.name ? 'bg-gray-100' : ''}`}
                    onClick={() => handleCategoryClick(category.id, category.name)}
                  >
                    <div className="flex items-center">
                      <label
                        className={`text-sm text-gray-600 cursor-pointer ${selectedCategoryValue === category.name ? 'text-green-600' : ''}`}
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}

                <h3 className="-my-3 flow-root cursor-pointer" onClick={() => handleSizeClick('', '')}>
                  <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900">Size</span>
                  </div>
                </h3>
                {sizeFilters.map((size) => (
                  <div
                    key={size.label}
                    className={`border-b border-gray-200 py-6 cursor-pointer ${selectedSizeLabel === size.label ? 'bg-gray-100' : ''}`}
                    onClick={() => handleSizeClick(size.value, size.label)}
                  >
                    <div className="flex items-center">
                      <label
                        className={`text-sm text-gray-600 cursor-pointer ${selectedSizeValue === size.value ? 'text-green-600' : ''}`}
                      >
                        {size.label}
                      </label>
                    </div>
                  </div>
                ))}

                <div className="price border-t border-gray-200 py-6">
                  <h3 className="text-sm font-medium text-gray-900">Price</h3>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <Range
                      step={100}
                      min={0}
                      max={100000}
                      values={priceRange}
                      onChange={(values) => setPriceRange(values)}
                      renderTrack={({ props, children }) => (
                        <div {...props} className="h-1 bg-gray-200 rounded-md">
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="h-4 w-4 bg-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        />
                      )}
                    />
                    <div className="flex justify-between text-xs">
                      <span>€{(priceRange[0] / 100).toFixed(2)}</span>
                      <span>€{(priceRange[1] / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </form>

              <div className="lg:col-span-3">
                <div className="bg-white">
                  <nav aria-label="breadcrumb" className="w-max">
                    <ol className="flex flex-wrap items-center w-full px-4 py-2 rounded-md bg-blue-gray-50 bg-opacity-60">
                      <li
                        className={`flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer hover:text-light-blue-500 ${!selectedCategoryValue && !selectedSizeLabel ? 'text-green-600' : 'text-gray-500'}`}
                      >
                        <Link
                          to="/catalog"
                          className={`${!selectedCategoryValue && !selectedSizeLabel ? 'text-green-600' : ''}`}
                          // onClick={() => navigate('/catalog')}
                          onClick={() => handleResetFilters()}
                        >
                          Category
                        </Link>
                        {(selectedCategoryValue || selectedSizeLabel) && (
                          <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
                            /
                          </span>
                        )}
                      </li>
                      {selectedCategoryValue && (
                        <li className="select-none flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 text-blue-gray-900 hover:text-light-blue-500">
                          {selectedCategoryValue}
                          {/* <a href="#" onClick={() => handleSizeClick('', '')}> */}
                          {/*  {selectedCategoryValue} */}
                          {/* </a> */}
                          {/* {selectedSizeLabel && ( */}
                          {/*  <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"> */}
                          {/*    / */}
                          {/*  </span> */}
                          {/* )} */}
                        </li>
                      )}
                      {/* {selectedSizeLabel && ( */}
                      {/*  <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500"> */}
                      {/*    <a */}
                      {/*      href="#" */}
                      {/*      // onClick={() => handleCategoryClick('', '')} */}
                      {/*    > */}
                      {/*      {selectedSizeLabel} */}
                      {/*    </a> */}
                      {/*  </li> */}
                      {/* )} */}
                    </ol>
                  </nav>

                  {/* product card */}
                  <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {products?.map((product) => (
                        <Link
                          key={product.id}
                          to={
                            selectedCategoryValue
                              ? `/catalog/${getCategoryValue(selectedCategoryValue)}/${product.id}`
                              : `/product/${product.id}`
                          }
                          className="group block border border-gray-100 rounded-lg shadow transition-transform hover:shadow-md"
                        >
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            {product.masterVariant?.images?.[0]?.url ? (
                              <img
                                src={product.masterVariant.images[0].url}
                                alt={product.name.en}
                                className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-500">No image available</span>
                              </div>
                            )}
                          </div>
                          <h3
                            className="mt-4 mb-2 text-lg font-bold text-center text-gray-700"
                            style={{ height: '3.3rem', overflow: 'hidden' }}
                          >
                            {product.name.en}
                          </h3>

                          <div className="mt-1 flex items-center justify-between px-4 py-2">
                            {product.masterVariant?.prices?.[0]?.discounted?.discount ? (
                              <>
                                <p className="text-lg font-medium text-red-600">
                                  {formatPriceInEuro(product.masterVariant.prices[0].discounted.value.centAmount)}
                                </p>
                                <p
                                  className="text-lg font-medium text-green-600"
                                  style={{ textDecoration: 'line-through' }}
                                >
                                  {formatPriceInEuro(product.masterVariant.prices[0].value.centAmount)}
                                </p>
                              </>
                            ) : (
                              product.masterVariant?.prices?.[0]?.value?.centAmount && (
                                <p className="text-lg font-medium text-green-600">
                                  {formatPriceInEuro(product.masterVariant.prices[0].value.centAmount)}
                                </p>
                              )
                            )}
                            <div
                              onClick={(e) => handleIconBasketClick(e, product.id)}
                              className={`cursor-pointer ${clickedIcons[product.id] ? 'pointer-events-none text-red-400' : 'text-green-600'}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                  {/* Pagination code here */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CatalogForm;
