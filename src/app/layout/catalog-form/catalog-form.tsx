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
import { Cart, LineItem, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { classNames, formatPriceInEuro, isCart } from '../../api/helpers';
import { ICategoryData, ISortOption } from '../../api/types';
import { sizeFilters, sortOptionForCTP } from '../../constans';
import getProductsFilter from '../../api/catalog/getProductsFilter';
import getCategories from '../../api/catalog/getCategories';
import { addProductToBasket, deleteProductInBasket, getBasket } from '../../api/basket/BasketRepository';
import { useStateContext } from '../../state/state-context';
import { getCategoryValue, IPageCounter, IProductsVariant } from '../../models';
import CatalogPagination from './catalog-pagination';
import SalesImage from '../../../assets/budding-pop-pictures/sales.jpg';
import OutOfStoreImage from '../../../assets/budding-pop-pictures/cry.gif';
import { getProductsAll } from '../../api/catalog/getProductsAll';

const CatalogForm: FC<{ movedCategory: string | undefined }> = ({ movedCategory }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<IProductsVariant[] | undefined>(undefined);
  const [productId, setProductId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
  const [selectedSizeValue, setSelectedSizeValue] = useState('');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState('');
  const [selectedDiscounted, setSelectedDiscounted] = useState('');
  const [sortName, setSortName] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<string>('name.en asc');
  const [sortOptions, setSortOptions] = useState<ISortOption[]>(sortOptionForCTP);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inputSearch, setInputSearch] = useState('');
  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [pageCounter, setPageCounter] = useState<IPageCounter>({
    totalProducts: 0,
    offset: 0,
    itemsPerPage: 12,
  });
  const [version, setVersion] = useState<number>();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);

  const resetOffsetProducts = () => {
    setPageCounter((prev) => {
      return {
        ...prev,
        offset: 0,
      };
    });
  };
  const { setTotalLineItemQuantity } = useStateContext();

  const handleInputSearch = (value: string) => {
    resetOffsetProducts();
    setInputSearch(value);
  };

  const handleSizeClick = (sizeValue: string, sizeLabel: string) => {
    resetOffsetProducts();
    setSelectedSizeValue(sizeValue === '' ? '' : `variants.attributes.Size:"${sizeValue}"`);
    setSelectedSizeLabel(sizeLabel === '' ? '' : sizeLabel);
  };

  const handleCategoryClick = (categoryId: string, categoryValue: string) => {
    if (categoryValue) navigate(`/catalog/${getCategoryValue(categoryValue)}`);
    else navigate(`/catalog`);
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
    resetOffsetProducts();
    handleCategoryClick('', '');
    handleSizeClick('', '');
    setPriceRange([0, maxPrice]);
    setSelectedDiscounted('');
  };

  const handleIconBasketClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setProductId(id);
  };

  const handleRemoveProductClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    quantity: number
  ) => {
    try {
      e.preventDefault();
      setIsDisabledButton(true);
      const lineItemById = lineItems.find((item) => item.productId === id);

      if (!lineItemById) {
        toast.error('Product not found in cart.');
        return;
      }
      const response = await deleteProductInBasket({ productId: lineItemById.id, quantity });

      if (response && response.body && isCart(response.body)) {
        setVersion(response.body.version);
      }

      if (response && response.body && isCart(response.body)) {
        setTotalLineItemQuantity(response.body.totalLineItemQuantity ?? 0);
        setVersion(response.body.version);
      } else {
        setTotalLineItemQuantity(0);
      }
      setProductId('');
    } catch (error) {
      toast.error('Error removing product from cart.');
    } finally {
      setIsDisabledButton(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);

      let currentCategory: ICategoryData = {
        id: '',
        name: '',
      };
      response.forEach((category) => {
        if (getCategoryValue(category.name) === movedCategory) {
          currentCategory = { ...category };
        }
      });

      if (currentCategory.id) setSelectedCategoryId(`categories.id:subtree("${currentCategory.id}")`);
      else setSelectedCategoryId('');
      setSelectedCategoryValue(currentCategory.name === '' ? '' : currentCategory.name);

      if (location.state?.isExternal) {
        handleSizeClick('', '');
        setPriceRange([0, maxPrice]);
      }
    };

    fetchCategories().catch(() => toast.error('Error fetching categories.'));
  }, [selectedCategoryId, movedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductsAll();

      return response.body.results?.reduce((max, product) => {
        const price: number = product.variants.reduce((maxVarPrice, variant) => {
          const variantPrice = variant?.prices?.[0]?.value?.centAmount ?? 0;

          return variantPrice > maxVarPrice ? variantPrice : maxVarPrice;
        }, 0);
        return price > max ? price : max;
      }, 0);
    };

    fetchProducts()
      .then((maxPriceOfAllProduct) => {
        setMaxPrice(maxPriceOfAllProduct);
        setPriceRange([0, maxPriceOfAllProduct]);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsFilter({
        filter: [
          selectedCategoryId,
          selectedSizeValue,
          `variants.price.centAmount:range (${priceRange[0]} to ${priceRange[1]})`,
          selectedDiscounted,
        ],
        sort: [sortMethod],
        limit: pageCounter.itemsPerPage,
        offset: pageCounter.offset,
        search: inputSearch,
        markMatchingVariants: true,
      });
      const responseResult = response.body?.results;

      setPageCounter((prev) => {
        return {
          ...prev,
          totalProducts: response.body?.total || 0,
        };
      });

      const productsResult = responseResult?.map((product) => {
        const masterVariantPrice = product?.variants.filter((variant) => variant.isMatchingVariant === true);
        return {
          id: product.id,
          name: product.name.en.toString(),
          description: product.description?.en.toString() || '',
          variant: masterVariantPrice[0],
        };
      });

      if (sortName === 'Price: High to Low' && productsResult) {
        productsResult.sort((a, b) => {
          const aPrice = a?.variant?.prices?.[0]?.value.centAmount ?? 0;
          const bPrice = b?.variant?.prices?.[0]?.value.centAmount ?? 0;
          return bPrice - aPrice;
        });
      }
      if (sortName === 'Price: Low to High' && productsResult) {
        productsResult.sort((a, b) => {
          const aPrice = a?.variant?.prices?.[0]?.value.centAmount ?? 0;
          const bPrice = b?.variant?.prices?.[0]?.value.centAmount ?? 0;
          return aPrice - bPrice;
        });
      }
      setProducts(productsResult);
    };

    fetchProducts().catch(() => toast.error('Error fetching products.'));
  }, [
    selectedCategoryId,
    selectedSizeValue,
    sortMethod,
    priceRange,
    inputSearch,
    pageCounter.offset,
    selectedDiscounted,
  ]);

  useEffect(() => {
    if (!productId) return;

    const fetchProducts = async () => {
      try {
        const response: ClientResponse<Cart | ClientResult> = await addProductToBasket({
          productId,
          quantity: 1,
          variantId: 1,
        });

        if (response && response.body && isCart(response.body)) {
          setTotalLineItemQuantity(response.body.totalLineItemQuantity ?? 0);
          setVersion(response.body.version);
        } else {
          setTotalLineItemQuantity(0);
        }
      } catch (error) {
        toast.error('Error adding product to cart.');
      }
    };

    fetchProducts();
  }, [productId]);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const response: ClientResponse<Cart | ClientResult> = await getBasket();

        if (response && response.body && isCart(response.body)) {
          if (response.body.version) {
            setVersion(response.body.version);
          }

          if (response.body.lineItems) {
            setLineItems(response.body.lineItems);
          }
        }
      } catch (error) {
        console.error('Failed to fetch basket:', error);
      }
    };

    fetchBasket();
  }, [version]);

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
                    <h3 className="my-3 flow-root cursor-pointer" onClick={() => handleResetFilters()}>
                      <div className="flex w-full items-center justify-between bg-white p-4 text-sm text-gray-400">
                        <span className="font-medium text-gray-900 hover:text-green-500">Categories</span>
                      </div>
                    </h3>
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className={`mx-6 border-b border-gray-200 py-4 ${selectedCategoryValue === category.name ? 'bg-gray-50/10' : ''}`}
                        onClick={() => handleCategoryClick(category.id, category.name)}
                      >
                        <div className="flex items-center">
                          <label
                            className={`text-sm text-gray-600 cursor-pointer hover:text-green-500 ${selectedCategoryValue === category.name ? 'text-green-600 font-bold' : ''}`}
                          >
                            {category.name}
                          </label>
                        </div>
                      </div>
                    ))}

                    <h3 className="mb-3 mt-6 flow-root cursor-pointer" onClick={() => handleSizeClick('', '')}>
                      <div className="flex w-full items-center justify-between bg-white p-4 text-sm text-gray-400">
                        <span className="font-medium text-gray-900 hover:text-green-500">Size</span>
                      </div>
                    </h3>
                    {sizeFilters.map((size) => (
                      <div
                        key={size.label}
                        className={`mx-6 border-b border-gray-200 py-4 cursor-pointer ${selectedSizeLabel === size.label ? 'bg-gray-50/10' : ''}`}
                        onClick={() => handleSizeClick(size.value, size.label)}
                      >
                        <div className="flex items-center">
                          <label
                            className={`text-sm text-gray-600 cursor-pointer hover:text-green-500 ${selectedSizeLabel === size.label ? 'text-green-600 font-bold' : ''}`}
                          >
                            Pot size: {size.label}
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="price px-4 py-6">
                      <h3 className="text-sm font-medium text-gray-900">Price</h3>
                      <div className="mt-6 ml-2 flex flex-col gap-2.5">
                        <Range
                          step={100}
                          min={0}
                          max={maxPrice}
                          values={priceRange}
                          onChange={(values) => {
                            resetOffsetProducts();
                            setPriceRange(values);
                          }}
                          renderTrack={({ props, children }) => (
                            <div {...props} className="mx-2 h-1 bg-gray-200 rounded-md">
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
                    <div
                      onClick={() => {
                        resetOffsetProducts();
                        setSelectedDiscounted(`variants.prices.discounted:exists`);
                      }}
                      className="relative mt-4 px-6 h-52 cursor-pointer"
                    >
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 p-4 bg-white border-2 rounded-xl">
                        <h2 className=" text-5xl text-amber-400 font-bold">SALES!</h2>
                      </div>
                      <img
                        className="h-full w-full object-cover object-center rounded-xl border-2"
                        src={SalesImage}
                        alt="sales"
                      />
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* desktop main section */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-end border-b border-gray-200 pb-[17px] pt-3">
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
                  <div className="absolute -bottom-20 left-1 lg:-left-10 inline-flex w-32 group justify-center whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-900">
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
                <h3 className="my-3 flow-root cursor-pointer" onClick={() => handleResetFilters()}>
                  <div className="flex w-full items-center justify-between pb-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900 hover:text-green-500">Categories</span>
                  </div>
                </h3>
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className={`ml-2 border-b border-gray-200 py-4 cursor-pointer ${selectedCategoryValue === category.name ? 'bg-gray-50/10' : ''}`}
                    onClick={() => handleCategoryClick(category.id, category.name)}
                  >
                    <div className="flex items-center">
                      <label
                        className={`text-sm text-gray-600 cursor-pointer hover:text-green-500 ${selectedCategoryValue === category.name ? 'text-green-600 font-bold' : ''}`}
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                ))}

                <h3 className="mb-3 mt-6 flow-root cursor-pointer" onClick={() => handleSizeClick('', '')}>
                  <div className="flex w-full items-center justify-between py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900 hover:text-green-500">Size</span>
                  </div>
                </h3>
                {sizeFilters.map((size) => (
                  <div
                    key={size.label}
                    className={`ml-2 border-b border-gray-200 py-4 cursor-pointer ${selectedSizeLabel === size.label ? 'bg-gray-50/10' : ''}`}
                    onClick={() => handleSizeClick(size.value, size.label)}
                  >
                    <div className="flex items-center">
                      <label
                        className={`text-sm text-gray-600 cursor-pointer hover:text-green-500 ${selectedSizeLabel === size.label ? 'text-green-600 font-bold' : ''}`}
                      >
                        Pot size: {size.label}
                      </label>
                    </div>
                  </div>
                ))}

                <div className="price py-6">
                  <h3 className="text-sm font-medium text-gray-900">Price</h3>
                  <div className="mt-6 ml-2 flex flex-col gap-2.5">
                    <Range
                      step={100}
                      min={0}
                      max={maxPrice}
                      values={priceRange}
                      onChange={(values) => {
                        resetOffsetProducts();
                        setPriceRange(values);
                      }}
                      renderTrack={({ props, children }) => (
                        <div {...props} className="mx-2 h-1 bg-gray-200 rounded-md">
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
                <div
                  onClick={() => {
                    resetOffsetProducts();
                    setSelectedDiscounted(`variants.prices.discounted:exists`);
                  }}
                  className="relative mt-4 h-96 cursor-pointer"
                >
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 p-4 bg-white border-2 rounded-xl">
                    <h2 className=" text-5xl text-amber-400 font-bold">SALES!</h2>
                  </div>
                  <img
                    className="h-full w-full object-cover object-center rounded-xl border-2"
                    src={SalesImage}
                    alt="sales"
                  />
                </div>
              </form>

              <div className="lg:col-span-3">
                <div className="bg-white h-full">
                  <nav aria-label="breadcrumb" className="w-max">
                    <ol className="flex flex-wrap items-center w-full px-4 py-2 rounded-md bg-blue-gray-50 bg-opacity-60">
                      <li
                        className={`flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer hover:text-light-blue-500 ${!selectedCategoryValue && !selectedSizeLabel ? 'text-green-600' : 'text-gray-500'}`}
                      >
                        <Link
                          to="/catalog"
                          className={`${!selectedCategoryValue && !selectedSizeLabel ? 'text-green-600' : ''}`}
                          onClick={() => handleResetFilters()}
                        >
                          Category
                        </Link>
                        {selectedCategoryValue && (
                          <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
                            /
                          </span>
                        )}
                      </li>
                      {selectedCategoryValue && (
                        <li className="select-none flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 text-blue-gray-900 hover:text-light-blue-500">
                          {selectedCategoryValue}
                        </li>
                      )}
                    </ol>
                  </nav>

                  {/* product card */}
                  {products?.length === 0 ? (
                    <div className="w-full h-full flex flex-col justify-around items-center">
                      <div className="flex flex-col items-center">
                        <h3 className="text-3xl md:text-5xl font-bold text-gray-700">No results.</h3>
                        <img className="my-6" src={OutOfStoreImage} alt="product not found" />
                        <p className="text-center text-gray-500">Tips: try changing category, price range or</p>
                        <div
                          onClick={() => handleResetFilters()}
                          className="inline-block mt-4 py-3 px-8 text-white font-medium whitespace-nowrap rounded-md bg-green-600 hover:bg-green-700 cursor-pointer"
                        >
                          Reset filters
                        </div>
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 sm:pt-12 lg:max-w-7xl lg:px-8">
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
                              {product.variant?.images?.[0]?.url ? (
                                <img
                                  src={product.variant.images[0].url}
                                  alt={product.name}
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
                              {product.name}
                            </h3>

                            <div className="mt-1 flex items-center justify-between px-4 py-2">
                              {product.variant?.prices?.[0]?.discounted?.discount ? (
                                <>
                                  <p className="text-lg font-medium text-red-600">
                                    {formatPriceInEuro(product.variant.prices[0].discounted.value.centAmount)}
                                  </p>
                                  <p
                                    className="text-lg font-medium text-green-600"
                                    style={{ textDecoration: 'line-through' }}
                                  >
                                    {formatPriceInEuro(product.variant.prices[0].value.centAmount)}
                                  </p>
                                </>
                              ) : (
                                product.variant?.prices?.[0]?.value?.centAmount && (
                                  <p className="text-lg font-medium text-green-600">
                                    {formatPriceInEuro(product.variant.prices[0].value.centAmount)}
                                  </p>
                                )
                              )}
                              <button
                                disabled={isDisabledButton}
                                onClick={
                                  lineItems.find((item) => item.productId === product.id)
                                    ? (e) => handleRemoveProductClick(e, product.id, 1)
                                    : (e) => handleIconBasketClick(e, product.id)
                                }
                                className={`cursor-pointer ${lineItems.find((item) => item.productId === product.id) ? 'text-red-400' : 'text-green-600'}`}
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
                              </button>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pagination code here */}
                <CatalogPagination pageCounter={pageCounter} setPageCounter={setPageCounter} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CatalogForm;
