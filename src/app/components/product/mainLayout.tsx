import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ExclamationTriangleIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Attribute,
  Cart,
  Image,
  LineItem,
  Price,
  Product,
  ProductData,
  ProductVariant,
} from '@commercetools/platform-sdk';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import SliderMain from './slider/sliderLayout';
import SizeBtn from './sizeBtn';
import { addProductToBasket, deleteProductInBasket, getBasket } from '../../api/basket/BasketRepository';
import { useStateContext } from '../../state/state-context';
import { StringArrayObject } from '../../models';
import { isCart } from '../../api/helpers';

const ProductMain = (data: Product) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [showModalSlider, setModalSlider] = useState(false);

  const productData: ProductData = data?.masterData?.current;
  const price: Price[] = productData?.variants[selectedSize]?.prices || [];
  const images: Image[] = data?.masterData?.current?.masterVariant?.images || [];
  const attributes: Attribute[] = productData?.masterVariant?.attributes || [];
  const variants: ProductVariant[] = productData?.variants || [];
  const getPrice = price[0]?.value?.centAmount;
  const getDiscountPrice = price[0]?.discounted?.value?.centAmount;
  const totalPrice = `${getPrice / 100} €`;
  const isDiscount = price.length !== 0 && getDiscountPrice ? `${getDiscountPrice / 100} €` : '';
  const dangerObject = attributes.some((item) => item.name === 'Danger');
  const sizes: StringArrayObject = {
    S: ['bg-green-200', 'hover:bg-green-300'],
    M: ['bg-green-500', 'hover:bg-green-600'],
    L: ['bg-green-700', 'hover:bg-green-800'],
  };
  const getSizes = variants.map((variant: ProductVariant) => {
    const allAttributes: Attribute[] = variant?.attributes || [];
    const sizeObject = allAttributes.filter((item) => item.name === 'Size');
    if (sizeObject.length > 0) {
      const sizeValue: string = sizeObject[0].value[0];
      return { name: sizeValue, bgColor: sizes[sizeValue][0], hoverSize: sizes[sizeValue][1] };
    }
    return undefined;
  });
  const [productId, setProductId] = useState('');
  const { setTotalLineItemQuantity } = useStateContext();
  const [version, setVersion] = useState<number>();
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const handleIconBasketClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
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
    <div className="bg-white mb-8">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {productData?.masterVariant?.images && productData?.masterVariant?.images?.length === 1 ? (
              <div className="mx-auto flex justify-center h-fit">
                <img
                  className="one-img max-w-[460px]"
                  src={images[0].url}
                  onClick={() => setModalSlider(true)}
                  alt=""
                />
              </div>
            ) : (
              <SliderMain data={data} setModalSlider={setModalSlider}></SliderMain>
            )}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {productData?.name.en ? (
                  productData?.name.en
                ) : (
                  <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                )}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <div className="flex gap-8 justify-between w-fit leading-none">
                  <span
                    className={`${isDiscount ? 'line-through text-gray-300 text-lg' : 'text-gray-900 text-2xl'}  tracking-tight`}
                  >
                    {price.length !== 0 ? totalPrice : <ReactLoading type={'bars'} color={'green'}></ReactLoading>}
                  </span>
                  <span className="text-2xl tracking-tight text-gray-900 ml-0.5">
                    {price.length !== 0 ? `${isDiscount}` : ''}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700">
                  {productData?.description?.en ? (
                    productData?.description?.en
                  ) : (
                    <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                  )}
                </div>
              </div>

              <form className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">Size</h3>
                  <div className="mt-2">
                    <div className="flex items-center space-x-3">
                      {getSizes.map(
                        (size, index) =>
                          size && (
                            <div key={index}>
                              <SizeBtn
                                label={size?.name}
                                setSelectedSize={setSelectedSize}
                                color={size?.bgColor}
                                colorHover={size?.hoverSize}
                              ></SizeBtn>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex gap-3.5">
                  <button
                    type="submit"
                    disabled={isDisabledButton}
                    onClick={
                      lineItems.find((item) => item.productId === data.id)
                        ? (e) => handleRemoveProductClick(e, data.id, 1)
                        : (e) => handleIconBasketClick(e, data.id)
                    }
                    className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full 
                      ${
                        lineItems.find((item) => item.productId === data.id)
                          ? 'bg-gray-400'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                  >
                    {lineItems.find((item) => item.productId === data.id) ? 'Delete from cart' : 'Add to cart'}
                  </button>
                  {dangerObject && (
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="relative hover-container rounded-md"
                    >
                      <ExclamationTriangleIcon
                        className="animate-pulse h-full w-full max-w-[50px] text-red-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Danger</span>
                      {isHovered && (
                        <div className="block cursor-default absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-fit p-1 bg-red-600 text-white text-xs border border-gray-300 rounded shadow-lg z-50">
                          <h3 className="font-bold">Danger plant!</h3>
                          <p className="mt-1">Special conditions required!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(open ? 'text-green-600' : 'text-gray-900', 'text-sm font-medium')}
                            >
                              {`Features`}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        {attributes.map((detail, index) =>
                          detail.value === true ? (
                            <Disclosure.Panel as="div" className="prose prose-sm pb-6" key={index}>
                              <ul role="list">
                                <li key={detail.name}>{detail.name}</li>
                              </ul>
                            </Disclosure.Panel>
                          ) : null
                        )}
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      {showModalSlider ? (
        <div
          className="fixed inset-0 flex justify-center items-center px-2 backdrop-blur-sm bg-slate-700 z-50 bg-opacity-50"
          onClick={(e) => {
            if (e.target instanceof HTMLElement && e.target.classList.contains('bg-slate-700')) {
              setModalSlider(false);
            }
          }}
        >
          <div className="relative">
            <SliderMain data={data}></SliderMain>
            <button className="hidden md:block absolute -top-10 -right-10">
              <XMarkIcon
                className="h-9 w-9 text-white bg-green-600 hover:bg-green-800 cursor-pointer rounded-full"
                onClick={() => setModalSlider(false)}
              ></XMarkIcon>
            </button>
          </div>
          <button className="block md:hidden absolute top-4 right-4">
            <XMarkIcon
              className="h-9 w-9 text-white bg-green-600 hover:bg-green-800 cursor-pointer rounded-full"
              onClick={() => setModalSlider(false)}
            ></XMarkIcon>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductMain;
