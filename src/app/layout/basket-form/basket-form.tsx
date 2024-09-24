import React, { useEffect, useState } from 'react';
import { Cart, LineItem, DiscountCodeInfo } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {
  addDiscountCode,
  clearBasket,
  deleteProductInBasket,
  getBasket,
  removeDiscountCode,
  updateBasketQuantityProduct,
} from '../../api/basket/BasketRepository';
import { formatPriceInEuro, isCart } from '../../api/helpers';
import { useStateContext } from '../../state/state-context';

const BasketForm = () => {
  const [version, setVersion] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [discountOnTotalPrice, setDiscountOnTotalPrice] = useState<number>(0);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [inputPromoCode, setInputPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [discountCodes, setDiscountCodes] = useState<DiscountCodeInfo[]>([]);

  const { setTotalLineItemQuantity } = useStateContext();

  const handleQuantityChange = async (
    productId: string,
    currentQuantity: number,
    operation: 'increment' | 'decrement'
  ) => {
    try {
      if (currentQuantity === undefined) {
        return;
      }

      let newQuantity;
      if (operation === 'increment') {
        newQuantity = currentQuantity + 1;
      } else if (operation === 'decrement') {
        newQuantity = Math.max(currentQuantity - 1, 1);
      }

      if (newQuantity) {
        try {
          await updateBasketQuantityProduct({
            productId,
            quantity: newQuantity,
          });

          setQuantityProduct(newQuantity);
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleClearBasketClick = async () => {
    try {
      const response = await clearBasket();
      if (response && response.body && isCart(response.body)) {
        setVersion(response.body.version);
        setLineItems((response as ClientResponse<Cart>).body?.lineItems ?? []);
        setIsModalOpen(false);
        setTotalLineItemQuantity(0);
      }
    } catch (error) {
      toast.error('Error removing product from cart.');
    }
    const response = await removeDiscountCode('plant-coupon');
    if (response && response.body && isCart(response.body)) {
      setVersion(response.body.version);
    }
  };

  const handleRemoveProductClick = async (productId: string, quantity: number) => {
    try {
      const response = await deleteProductInBasket({ productId, quantity });
      if (response && response.body && isCart(response.body)) {
        setVersion(response.body.version);
        setLineItems(response.body.lineItems);
      }
    } catch (error) {
      toast.error('Error removing product from cart.');
    }
  };

  const handlePromoCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPromoValid) {
      try {
        const response: ClientResponse<Cart | ClientResult> = await addDiscountCode('plant-coupon');
        if (response && response.body && isCart(response.body)) {
          setVersion(response.body.version);
          setInputPromoCode('');
        }
      } catch (error) {
        toast.error('Error fetching');
      }
    }
  };

  const handlePromoChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputPromoCode(input);

    if (input.trim() === 'plant-coupon') {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  };

  const handleRemovePromoCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response: ClientResponse<Cart | ClientResult> = await removeDiscountCode('plant-coupon');
      if (response && response.body && isCart(response.body)) {
        setVersion(response.body.version);
        setDiscountOnTotalPrice(response.body.discountOnTotalPrice?.discountedAmount.centAmount ?? 0);
        setIsPromoValid(false);
      }
    } catch (error) {
      toast.error('Error fetching');
    }
  };

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
            setTotalLineItemQuantity(response.body.lineItems.length);
          }

          if (response.body.discountCodes) {
            setDiscountCodes(response.body.discountCodes);
          }

          if (response.body.discountOnTotalPrice) {
            setDiscountOnTotalPrice(response?.body?.discountOnTotalPrice?.discountedAmount.centAmount ?? 0);
          }

          if (response.body.totalPrice) {
            setTotalPrice(response?.body?.totalPrice?.centAmount ?? 0);
          }

          if (response.body.totalLineItemQuantity) {
            setTotalLineItemQuantity(response.body.totalLineItemQuantity ?? 0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch basket:', error);
      }
    };

    fetchBasket();
  }, [quantityProduct, version]);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
          {lineItems.length > 0 && (
            <button
              type="button"
              className="text-base whitespace-nowrap font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 float-right mb-4"
              onClick={() => setIsModalOpen(true)}
            >
              Clear Cart
            </button>
          )}
        </div>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {lineItems.length === 0 ? (
            <section className="lg:col-span-12">
              <div className="relative flex flex-col items-center text-center py-6 sm:py-10">
                <p className="text-lg font-medium text-gray-700">Your cart is empty yet.</p>
                <img className="z-10" src="./assets/budding-pop-pictures/sadness.gif" alt="empty card image" />
                <Link
                  to="/catalog"
                  className="z-20 w-full max-w-60 -mt-4 inline-block rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700"
                >
                  Start shopping
                </Link>
              </div>
            </section>
          ) : (
            <>
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {lineItems.map((product, productIdx) => (
                    <li key={product.id} className="flex py-6 sm:py-10 relative">
                      <div className="absolute right-4 top-6 sm:right-8  sm:top-8">
                        <button
                          type="button"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => handleRemoveProductClick(product.id, product.quantity)}
                        >
                          <span className="sr-only">Remove</span>
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="relative flex-shrink-0">
                        <Link to={`/product/${product.productId}`}>
                          <img
                            src={product.variant?.images?.[0]?.url || ''}
                            alt={product.name.en}
                            className="h-32 w-32 rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                          {product.variant?.attributes?.find((item) => item.name === 'Danger') ? (
                            <div className="absolute inset-0 z-10 overflow-hidden flex items-end">
                              <p className="flex-1 bg-red-600 text-base text-white text-center rounded-b-md">
                                Attention!
                              </p>
                            </div>
                          ) : null}
                        </Link>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <h3 className="text-sm pr-9">
                          <Link
                            to={`/product/${product.productId}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.name.en}
                          </Link>
                        </h3>
                        <div className="relative flex pr-4 justify-between sm:pr-0">
                          <div className="flex flex-col space-y-4">
                            <div className="mt-1 flex text-sm">
                              {(product.variant?.attributes?.find((attr) => attr.name === 'Size')?.value[0] || '') && (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                  {product.variant?.attributes?.find((attr) => attr.name === 'Size')?.value[0] || ''}
                                </p>
                              )}
                            </div>
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                              Quantity, {product.name.en}
                            </label>
                            <div className="relative flex items-center ring-1 ring-gray-300 rounded-md">
                              <button
                                type="button"
                                className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-l-md hover:bg-gray-50 ring-1 ring-gray-300 focus:ring-1 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleQuantityChange(product.id, product.quantity, 'decrement')}
                                disabled={product.quantity === 1}
                              >
                                -
                              </button>

                              <input
                                id={`quantity-${productIdx}`}
                                name={`quantity-${productIdx}`}
                                type="text"
                                value={product.quantity}
                                readOnly
                                className="relative z-10 px-2 py-0.5 sm:px-3 sm:py-1 mx-[1px] max-w-8 sm:max-w-12 text-center text-base font-medium text-gray-700 border-none focus:ring-1 focus:ring-green-500"
                              />
                              <button
                                type="button"
                                className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-r-md hover:bg-gray-50 ring-1 ring-gray-300 focus:ring-1 focus:ring-green-500"
                                onClick={() => handleQuantityChange(product.id, product.quantity, 'increment')}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="mt-auto sm:pr-9">
                            {product.variant?.prices?.[0]?.discounted?.discount ? (
                              <>
                                <p className="mt-2 text-base sm:text-lg font-medium text-red-600">
                                  {formatPriceInEuro(
                                    product.variant.prices[0].discounted.value.centAmount * product.quantity
                                  )}
                                </p>
                                <p
                                  className="mt-2 text-base sm:text-lg font-medium text-green-600"
                                  style={{ textDecoration: 'line-through' }}
                                >
                                  {formatPriceInEuro(product.variant.prices[0].value.centAmount * product.quantity)}
                                </p>
                              </>
                            ) : (
                              product.variant?.prices?.[0]?.value?.centAmount && (
                                <p className="mt-2 text-base sm:text-lg font-medium text-green-600">
                                  {formatPriceInEuro(product.variant.prices[0].value.centAmount * product.quantity)}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              {
                <section
                  aria-labelledby="summary-heading"
                  className="relative mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                >
                  <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                    Order summary
                  </h2>
                  <img
                    className="absolute w-24 h-24 right-1/2 transform translate-x-3/4 top-6"
                    src="./assets/budding-pop-pictures/shopping-list.gif"
                    alt=""
                  />

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {formatPriceInEuro((totalPrice ?? 0) + (discountOnTotalPrice ?? 0))}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="flex items-center text-sm text-gray-600">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {formatPriceInEuro(
                          lineItems.reduce((total, item) => {
                            if (item.price.discounted && item.price.discounted.value.centAmount) {
                              return total + item.price.value.centAmount - item.price.discounted.value.centAmount;
                            }
                            return total;
                          }, 0)
                        )}
                      </dd>
                    </div>
                    <div className="promo-code flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="flex text-sm text-gray-600 items-center justify-center">
                        <div className="mt-2">
                          <input
                            id="promo-code"
                            type="text"
                            value={inputPromoCode}
                            onChange={handlePromoChangeInput}
                            disabled={discountCodes.length > 0}
                            placeholder={discountCodes.length > 0 ? 'Promo code is applied' : 'Enter promo code'}
                            className="block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handlePromoCodeClick}
                            disabled={discountCodes.length > 0}
                            className={`ml-2 flex items-center justify-center w-8 h-8 rounded-full ${discountCodes.length === 0 && isPromoValid ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-700'}`}
                          >
                            ✔
                          </button>
                          <button
                            onClick={handleRemovePromoCodeClick}
                            disabled={discountCodes.length === 0}
                            className={`ml-2 flex items-center justify-center w-8 h-8 rounded-full ${discountCodes.length > 0 ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-gray-400 text-gray-700'}`}
                          >
                            ✖
                          </button>
                        </div>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 ml-2">
                        {formatPriceInEuro(discountOnTotalPrice)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">{formatPriceInEuro(totalPrice ?? 0)}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Place your order
                    </button>
                  </div>
                </section>
              }
            </>
          )}
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Are you sure you want to clear the cart?</h2>
              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleClearBasketClick}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BasketForm;
